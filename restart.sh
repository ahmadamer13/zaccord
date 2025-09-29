#!/usr/bin/env bash
set -euo pipefail

# Simple helper to stop any process listening on PORT and start the app.
# Usage:
#   PORT=5000 SESSION_SECRET=... ./restart.sh
#   ./restart.sh            # uses defaults: PORT=5000, generates SESSION_SECRET

PORT="${PORT:-5000}"
LOG_FILE="${LOG_FILE:-server.log}"
PID_FILE="${PID_FILE:-server.pid}"

# Source nvm if available and use Node 12 (project tested on v12)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  source "$HOME/.nvm/nvm.sh"
  nvm use 12 >/dev/null
fi

# Ensure we have a session secret
if [ -z "${SESSION_SECRET:-}" ]; then
  if command -v openssl >/dev/null 2>&1; then
    export SESSION_SECRET="$(openssl rand -hex 16)"
  else
    # Fallback generator if openssl is missing
    export SESSION_SECRET="$(date +%s%N | sha256sum | cut -c1-32)"
  fi
fi

echo "Using PORT=$PORT"

echo "Stopping any process on port $PORT (if any)..."
if command -v lsof >/dev/null 2>&1; then
  PIDS=$(lsof -t -i :"$PORT" || true)
  if [ -n "$PIDS" ]; then
    kill $PIDS || true
    sleep 1
    # Force kill if still present
    PIDS=$(lsof -t -i :"$PORT" || true)
    if [ -n "$PIDS" ]; then
      kill -9 $PIDS || true
    fi
  fi
fi

echo "Starting server... (logs: $LOG_FILE)"
nohup node app.js >"$LOG_FILE" 2>&1 &
NEW_PID=$!
echo "$NEW_PID" > "$PID_FILE"
echo "Started node app.js with PID $NEW_PID"

# Wait up to 30s for port to listen, then HTTP check
WAIT_SECS=30
for i in $(seq 1 "$WAIT_SECS"); do
  if command -v lsof >/dev/null 2>&1 && lsof -i :"$PORT" >/dev/null 2>&1; then
    echo "Port $PORT is now listening."
    break
  fi
  sleep 1
  if ! kill -0 "$NEW_PID" 2>/dev/null; then
    echo "Process $NEW_PID exited prematurely. Showing last 100 log lines:" >&2
    tail -n 100 "$LOG_FILE" || true
    exit 1
  fi
  if [ "$i" -eq "$WAIT_SECS" ]; then
    echo "Warning: Port $PORT not listening after ${WAIT_SECS}s. Recent logs:" >&2
    tail -n 100 "$LOG_FILE" || true
    exit 1
  fi
done

# Optional quick HTTP check (non-fatal)
if command -v curl >/dev/null 2>&1; then
  CURL_OUT=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}" || true)
  echo "HTTP check on / returned status: ${CURL_OUT}"
fi

exit 0
