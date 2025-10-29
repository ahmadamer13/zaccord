#!/usr/bin/env bash
set -euo pipefail

# Enable Hibernate on Ubuntu (with swapfile)
# - Ensures swapfile size >= RAM
# - Configures initramfs resume + GRUB resume parameters (with offset)
# - Adds PolicyKit rule to allow hibernation
# - Safe and idempotent; backs up edited files
#
# Notes:
# - Supports ext4/xfs root filesystems. btrfs swapfile requires special handling and is not supported here.
# - Does not automatically reboot; prompts at the end.
#
# Usage: sudo scripts/enable-hibernate.sh [--swap-size <GiB>] [--no-polkit]
#   --swap-size: override desired swap size in GiB (default: RAM size)
#   --no-polkit: skip adding polkit rule (if you manage it elsewhere)

need_root() {
  if [[ $EUID -ne 0 ]]; then
    echo "This script must run as root (use sudo)." >&2
    exit 1
  fi
}

log() { echo "[+] $*"; }
warn() { echo "[!] $*" >&2; }
die() { echo "[x] $*" >&2; exit 1; }

backup_file() {
  local f="$1"
  [[ -f "$f" ]] || return 0
  if [[ ! -f "${f}.bak" ]]; then
    cp -a "$f" "${f}.bak"
  fi
}

parse_args() {
  SWAP_SIZE_GIB=""
  ADD_POLKIT=1
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --swap-size)
        [[ $# -ge 2 ]] || die "--swap-size requires a value in GiB"
        SWAP_SIZE_GIB="$2"; shift 2;;
      --no-polkit)
        ADD_POLKIT=0; shift;;
      -h|--help)
        cat <<EOF
Usage: sudo $0 [--swap-size <GiB>] [--no-polkit]

--swap-size <GiB>  Override desired swap size (GiB). Default = RAM size.
--no-polkit        Skip adding PolicyKit rule to allow hibernation.
EOF
        exit 0;;
      *) die "Unknown option: $1";;
    esac
  done
}

check_fs() {
  local rootfs
  rootfs=$(findmnt -n -o FSTYPE /)
  case "$rootfs" in
    ext4|xfs)
      log "Root filesystem: $rootfs (supported)";;
    btrfs)
      die "Root filesystem is btrfs. Swapfile for hibernation on btrfs needs special handling; aborting.";;
    *)
      warn "Root filesystem $rootfs is untested. Proceeding, but swapfile offset may not work."
      ;;
  esac
}

mem_bytes() {
  awk '/MemTotal:/ {print $2 * 1024}' /proc/meminfo
}

swap_bytes_current() {
  # Sum all active swap areas
  local total=0
  while read -r _ NAME TYPE SIZE USED PRIO; do
    if [[ "$NAME" == NAME ]]; then continue; fi
    [[ -n "$SIZE" ]] || continue
    total=$(( total + SIZE ))
  done < <(swapon --show --bytes 2>/dev/null || true)
  echo "$total"
}

ensure_swapfile() {
  local desired_bytes="$1"
  local swapfile="/swapfile"

  mkdir -p /

  local current_bytes
  current_bytes=$(swap_bytes_current)
  if (( current_bytes >= desired_bytes )); then
    log "Swap already >= desired (current: $current_bytes bytes)"
    return 0
  fi

  log "Ensuring swapfile at $swapfile with size >= $desired_bytes bytes"
  swapoff -a || true

  # Create or resize swapfile
  if ! fallocate -l "$desired_bytes" "$swapfile" 2>/dev/null; then
    warn "fallocate failed; falling back to dd (this can take a while)"
    local count=$(( (desired_bytes + 1048575) / 1048576 ))
    dd if=/dev/zero of="$swapfile" bs=1M count="$count" status=progress
  fi

  chmod 600 "$swapfile"
  mkswap "$swapfile" >/dev/null
  swapon "$swapfile"

  # Ensure fstab entry
  if ! grep -qsE '^/swapfile\s+none\s+swap\s' /etc/fstab; then
    log "Adding /swapfile to /etc/fstab"
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
  else
    log "/etc/fstab already contains /swapfile entry"
  fi
}

compute_swapfile_offset() {
  local swapfile="/swapfile"
  # filefrag -v output varies; seek the first extent line (index 0:)
  local off
  off=$(filefrag -v "$swapfile" 2>/dev/null | awk '$1=="0:" {print $4}' | sed 's/\.\.$//' || true)
  if [[ -z "$off" ]]; then
    # Some versions print with a header; try a different parse
    off=$(filefrag -v "$swapfile" 2>/dev/null | awk '/^ *0:/ {print $4}' | sed 's/\.\.$//' || true)
  fi
  echo "$off"
}

configure_resume() {
  local swapfile="/swapfile"
  local offset
  offset=$(compute_swapfile_offset)
  [[ -n "$offset" ]] || die "Could not determine swapfile physical offset. Ensure filesystem supports non-fragmented swapfile."

  log "Swapfile physical offset: $offset"

  mkdir -p /etc/initramfs-tools/conf.d
  backup_file /etc/initramfs-tools/conf.d/resume
  cat > /etc/initramfs-tools/conf.d/resume <<EOF
RESUME=$swapfile
RESUME_OFFSET=$offset
EOF

  # Update GRUB cmdline
  backup_file /etc/default/grub
  local current
  current=$(grep -E '^GRUB_CMDLINE_LINUX_DEFAULT=' /etc/default/grub | sed 's/^GRUB_CMDLINE_LINUX_DEFAULT=//')
  local new_entry="resume=$swapfile resume_offset=$offset"

  if grep -qE '\bresume(=|_)' /etc/default/grub; then
    # Replace existing resume-related params
    sed -i -E "s/\bresume(=|_)[^\" ]+//g; s/  +/ /g" /etc/default/grub
  fi

  # Append our resume args inside the quotes
  sed -i -E "s/^(GRUB_CMDLINE_LINUX_DEFAULT=\"*)(.*)(\"*)$/\1\2 ${new_entry}\3/" /etc/default/grub
}

add_polkit_rule() {
  local rules="/etc/polkit-1/rules.d/99-enable-hibernate.rules"
  backup_file "$rules"
  cat > "$rules" <<'EOF'
polkit.addRule(function(action, subject) {
  if ((action.id == "org.freedesktop.upower.hibernate" ||
       action.id == "org.freedesktop.login1.hibernate") &&
      subject.isInGroup("sudo")) {
    return polkit.Result.YES;
  }
});
EOF
  log "PolicyKit rule written to $rules"
}

rebuild_boot() {
  log "Updating initramfs"
  update-initramfs -u
  log "Updating GRUB"
  update-grub
}

main() {
  need_root
  parse_args "$@"
  check_fs

  local RAM_BYTES
  RAM_BYTES=$(mem_bytes)
  [[ -n "$RAM_BYTES" ]] || die "Failed to detect RAM"

  local DESIRED_BYTES
  if [[ -n "${SWAP_SIZE_GIB}" ]]; then
    DESIRED_BYTES=$(( SWAP_SIZE_GIB * 1024 * 1024 * 1024 ))
  else
    DESIRED_BYTES=$RAM_BYTES
  fi
  log "RAM detected: $(( RAM_BYTES / 1024 / 1024 )) MiB; desired swap: $(( DESIRED_BYTES / 1024 / 1024 )) MiB"

  ensure_swapfile "$DESIRED_BYTES"
  configure_resume
  if [[ "$ADD_POLKIT" -eq 1 ]]; then
    add_polkit_rule
  else
    log "Skipping PolicyKit setup as requested"
  fi
  rebuild_boot

  echo
  log "Done. Validate with: grep -i hibern /sys/power/state (should include 'disk')"
  log "Test hibernate (saves session and powers off): systemctl hibernate"
  log "If resume fails, check: cat /proc/cmdline; dmesg -T | grep -i resume"
}

main "$@"

