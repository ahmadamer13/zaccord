#!/usr/bin/env bash
set -euo pipefail

if [ $# -eq 0 ]; then
  echo "Usage: $0 <commit message>"
  exit 1
fi

commit_message="$*"

git add -A
git commit -m "$commit_message"
git push origin HEAD
