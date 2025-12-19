#!/bin/bash

# Deployment script for Jordan3DPrint
# Usage: ./deploy.sh "Your commit message"

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REMOTE_HOST="172.245.138.214"
REMOTE_USER="root"
REMOTE_DIR="/srv/zaccord"
SERVICE_NAME="zaccord"
BRANCH="master"

# Function to print colored messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if commit message is provided
if [ -z "$1" ]; then
    print_error "Please provide a commit message"
    echo "Usage: ./deploy.sh \"Your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

print_info "Starting deployment process..."
echo ""

# Step 1: Check for uncommitted changes
print_info "Checking for uncommitted changes..."
if ! git diff-index --quiet HEAD --; then
    print_info "Found uncommitted changes. Adding all files..."
    git add -A
    print_success "Files added to staging"
else
    print_info "No uncommitted changes found"
fi

# Step 2: Commit changes
print_info "Committing changes..."
if git commit -m "$COMMIT_MESSAGE" 2>/dev/null; then
    print_success "Changes committed: $COMMIT_MESSAGE"
else
    print_warning "Nothing to commit or commit failed"
fi

# Step 3: Pull latest changes (rebase)
print_info "Pulling latest changes from remote..."
if git pull --rebase origin $BRANCH; then
    print_success "Successfully pulled and rebased"
else
    print_error "Failed to pull changes. Please resolve conflicts manually."
    exit 1
fi

# Step 4: Push to remote repository
print_info "Pushing changes to GitHub..."
if git push origin $BRANCH; then
    print_success "Changes pushed to GitHub"
else
    print_error "Failed to push changes"
    exit 1
fi

echo ""
print_info "Deploying to production server..."
echo ""

# Step 5: Deploy to VPS
print_info "Connecting to $REMOTE_USER@$REMOTE_HOST..."

ssh $REMOTE_USER@$REMOTE_HOST << EOF
    set -e
    
    echo "📦 Navigating to application directory..."
    cd $REMOTE_DIR
    
    echo "🔄 Resetting local changes..."
    git reset --hard HEAD
    git clean -fd
    
    echo "⬇️  Pulling latest changes..."
    git pull origin $BRANCH
    
    echo "🔧 Fixing database connection for production..."
    sed -i 's/jordan3dprintlocalhost/zaccordlocalhost/g' src/js/includes/connConstants.js
    
    echo "🔄 Restarting service..."
    systemctl restart $SERVICE_NAME
    
    echo "⏳ Waiting for service to start..."
    sleep 3
    
    echo "✅ Checking service status..."
    systemctl status $SERVICE_NAME --no-pager -l
EOF

if [ $? -eq 0 ]; then
    echo ""
    print_success "========================================="
    print_success "  Deployment completed successfully! 🚀"
    print_success "========================================="
    echo ""
    print_info "Your changes are now live on the server!"
    print_info "Server: http://$REMOTE_HOST"
else
    echo ""
    print_error "========================================="
    print_error "  Deployment failed! ❌"
    print_error "========================================="
    echo ""
    print_error "Please check the error messages above and try again."
    exit 1
fi
