#!/usr/bin/env bash
set -euo pipefail

# Simple helper to set up and run the app locally.
# - Installs node deps
# - Ensures database exists (optional quick check)
# - Starts the server

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
DB_HOST=${DB_HOST:-127.0.0.1}
DB_USER=${DB_USER:-zaccordlocalhost}
DB_PASS=${DB_PASS:-abc}
DB_NAME=${DB_NAME:-3d}
NODE_CMD=${NODE_CMD:-node}
# Default app port (app.js uses process.env.PORT || 5000)
PORT=${PORT:-5000}

echo "[1/3] Installing npm dependencies..."
cd "$PROJECT_DIR"
npm install

echo "[2/3] Checking database connectivity (optional)..."
if command -v mysql >/dev/null 2>&1; then
  if mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASS" -e "USE \`$DB_NAME\`;" >/dev/null 2>&1; then
    echo "  - Database '$DB_NAME' accessible as $DB_USER@$DB_HOST"
  else
    echo "  ! Could not access database '$DB_NAME' with provided creds."
    echo "    Update src/js/includes/connConstants.js or export DB_* env vars and re-run."
  fi
else
  echo "  - 'mysql' client not found; skipping DB check."
fi

echo "[3/3] Preparing to start server on port $PORT..."

# If a previous run left a PID file, try to stop it gracefully
if [ -f server.pid ]; then
  OLD_PID="$(cat server.pid || true)"
  if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "  - Found previous server PID ($OLD_PID), stopping it..."
    kill "$OLD_PID" || true
    sleep 1
    if kill -0 "$OLD_PID" 2>/dev/null; then
      echo "  - Force killing PID $OLD_PID..."
      kill -9 "$OLD_PID" || true
    fi
  fi
fi

# Detect any process listening on the target PORT
if command -v lsof >/dev/null 2>&1; then
  PIDS_ON_PORT=$(lsof -t -i :"$PORT" || true)
  if [ -n "$PIDS_ON_PORT" ]; then
    echo "  ! Detected process(es) using port $PORT: $PIDS_ON_PORT"
    if [ "${KILL_PORT:-0}" = "1" ]; then
      echo "  - KILL_PORT=1 set; terminating offending processes..."
      kill $PIDS_ON_PORT || true
      sleep 1
      PIDS_ON_PORT=$(lsof -t -i :"$PORT" || true)
      if [ -n "$PIDS_ON_PORT" ]; then
        echo "  - Force killing remaining: $PIDS_ON_PORT"
        kill -9 $PIDS_ON_PORT || true
      fi
    else
      echo "    To auto-kill them, re-run with: KILL_PORT=1 $0"
      echo "    Or choose a different port: PORT=5001 $0"
      exit 1
    fi
  fi
fi

echo "Starting server on port $PORT..."
export PORT
if [ -f package.json ] && jq -er '.scripts.start' package.json >/dev/null 2>&1; then
  npm start
else
  "$NODE_CMD" app.js &
  echo $! > server.pid
  wait $!
fi
