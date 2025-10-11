#!/usr/bin/env bash
set -euo pipefail

# Simple one-command deploy: commit+push local changes, then pull+restart on server.
#
# Usage:
#   scripts/deploy.sh "Your commit message"
#   BRANCH=master REMOTE=root@172.245.138.214 scripts/deploy.sh "Update copy"
#
# Config (override via env):
BRANCH="${BRANCH:-master}"
REMOTE="${REMOTE:-root@172.245.138.214}"
SERVICE="${SERVICE:-zaccord}"
APP_DIR="${APP_DIR:-/srv/zaccord}"
APP_USER="${APP_USER:-zaccord}"

commit_msg="${1:-}"

echo "==> Deploying branch ${BRANCH} to ${REMOTE} (${APP_DIR}), service ${SERVICE}"

# Ensure we are in a git repo root
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository" >&2
  exit 1
fi

# Stage and commit if there are changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add -A
  if [ -z "${commit_msg}" ]; then
    commit_msg="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
  fi
  echo "==> Committing: ${commit_msg}"
  git commit -m "${commit_msg}"
else
  echo "==> No local changes to commit"
fi

echo "==> Pulling latest from origin/${BRANCH} (rebase)"
git pull --rebase origin "${BRANCH}" || true

echo "==> Pushing to origin/${BRANCH}"
git push origin "${BRANCH}"

echo "==> Connecting to ${REMOTE} to update and restart ${SERVICE}"

# Try key-based auth first (no prompt). If it fails, retry allowing password prompt.
if ssh -o BatchMode=yes -o ConnectTimeout=10 "${REMOTE}" true 2>/dev/null; then
  SSH_OPTS=(-o BatchMode=yes)
else
  echo "-> Key auth failed or unavailable. Will prompt for password (if required)."
  SSH_OPTS=()
fi

ssh "${SSH_OPTS[@]}" "${REMOTE}" bash -lc "set -euo pipefail
  echo '-> Connected as ' \
    \"\
    \\$(whoami)@\\$(hostname)\
    \" ' (uid=' \
    \"\
    \\$(id -u)\
    \" ')'

  # Determine sudo prefix for privileged operations
  if [ \"\$(id -u)\" -ne 0 ]; then
    SUDO=sudo
  else
    SUDO=
  fi

  echo '-> Updating code in ${APP_DIR} as ${APP_USER}'
  if [ ! -d '${APP_DIR}/.git' ]; then
    echo 'Error: ${APP_DIR} is not a git repo. Clone your repo there first.' >&2
    exit 2
  fi

  # If current user is root, use sudo -u APP_USER for git/npm; if already APP_USER, skip sudo -u.
  CUR_USER=\"\$(whoami)\"
  if [ \"$CUR_USER\" = \"${APP_USER}\" ]; then
    RUN_AS_APP="bash -lc"
  else
    RUN_AS_APP=\"sudo -u '${APP_USER}' bash -lc\"
  fi

  eval \"\${RUN_AS_APP} 'cd "${APP_DIR}" && git fetch --all && git reset --hard origin/${BRANCH} && (npm ci --omit=dev || true)'\"

  echo '-> Restarting service ${SERVICE}'
  \"$SUDO\" systemctl daemon-reload || true
  \"$SUDO\" systemctl restart '${SERVICE}'
  sleep 1
  if \"$SUDO\" systemctl is-active --quiet '${SERVICE}'; then
    echo '-> ${SERVICE} is active'
  else
    echo '-> ${SERVICE} failed to start, recent logs:'
    \"$SUDO\" journalctl -u '${SERVICE}' -n 100 --no-pager || true
    exit 3
  fi
"

echo "==> Deploy complete"
