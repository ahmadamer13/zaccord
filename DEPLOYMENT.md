# Deployment Guide

## Quick Deployment

To deploy your changes to the production server, simply run:

```bash
./deploy.sh "Your commit message here"
```

### Example:
```bash
./deploy.sh "Fixed bug in product page1"
./deploy.sh "Added new feature to cart"
./deploy.sh "Updated styling for mobile devices"
```

## What the Script Does

The deployment script automates the entire deployment process:

1. **Local Git Operations:**
   - Checks for uncommitted changes
   - Adds all modified files to git
   - Commits with your provided message
   - Pulls latest changes from GitHub (with rebase)
   - Pushes changes to GitHub

2. **Server Deployment:**
   - Connects to your VPS server
   - Navigates to `/srv/zaccord`
   - Resets any local changes on the server
   - Pulls the latest code from GitHub
   - Fixes database configuration for production
   - Restarts the application service
   - Shows the service status

## Manual Deployment

If you prefer to deploy manually, follow these steps:

### 1. Push Changes to GitHub
```bash
git add -A
git commit -m "Your commit message"
git pull --rebase origin master
git push origin master
```

### 2. Deploy to Server
```bash
ssh root@172.245.138.214
cd /srv/zaccord
git reset --hard HEAD
git clean -fd
git pull origin master
sed -i 's/jordan3dprintlocalhost/zaccordlocalhost/g' src/js/includes/connConstants.js
systemctl restart zaccord
systemctl status zaccord
exit
```

## Configuration

The deployment script uses these default settings:

- **Remote Host:** 172.245.138.214
- **Remote User:** root
- **Remote Directory:** /srv/zaccord
- **Service Name:** zaccord
- **Branch:** master

To change these settings, edit the configuration section at the top of `deploy.sh`:

```bash
REMOTE_HOST="172.245.138.214"
REMOTE_USER="root"
REMOTE_DIR="/srv/zaccord"
SERVICE_NAME="zaccord"
BRANCH="master"
```

## Troubleshooting

### SSH Password Prompt
If you're prompted for a password every time, consider setting up SSH key authentication:

```bash
ssh-copy-id root@172.245.138.214
```

### Deployment Failed
If deployment fails, check:
1. Your internet connection
2. SSH access to the server
3. Git repository status
4. Server logs: `ssh root@172.245.138.214 "journalctl -u zaccord -n 50"`

### Service Not Starting
Check the service logs:
```bash
ssh root@172.245.138.214 "journalctl -u zaccord -n 100 --no-pager"
```

## Important Notes

1. **Database Configuration:** The script automatically fixes the database user from `jordan3dprintlocalhost` to `zaccordlocalhost` on the production server. This is necessary because the production database uses a different user than your local development environment.

2. **Service Name:** The systemd service is still named `zaccord`. If you want to rename it to `jordan3dprint`, you'll need to update the service configuration on the server.

3. **Always Test Locally First:** Before deploying, make sure your changes work correctly in your local environment by running `./run_local.sh`.

## Quick Commands

```bash
# Deploy with a commit message
./deploy.sh "Updated product catalog"

# Check server status
ssh root@172.245.138.214 "systemctl status zaccord"

# View server logs
ssh root@172.245.138.214 "journalctl -u zaccord -n 50 --no-pager"

# Restart service manually
ssh root@172.245.138.214 "systemctl restart zaccord"
```
