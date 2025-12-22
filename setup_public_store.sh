#!/bin/bash

# Public Store Setup Script
# Run this to set up the marketplace on your local machine

echo "========================================="
echo "  Public Store Marketplace Setup"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if we're on the right branch
echo -e "${YELLOW}Step 1: Checking Git branch...${NC}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "public-store" ]; then
    echo -e "${YELLOW}Switching to public-store branch...${NC}"
    git checkout public-store
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to switch to public-store branch${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ On public-store branch${NC}"
echo ""

# Step 2: Create upload directories
echo -e "${YELLOW}Step 2: Creating upload directories...${NC}"
mkdir -p public_store_uploads/stl
mkdir -p public_store_uploads/images
mkdir -p public_store_uploads/thumbnails
chmod -R 755 public_store_uploads
echo -e "${GREEN}✓ Upload directories created${NC}"
echo ""

# Step 3: Run database migration
echo -e "${YELLOW}Step 3: Database migration${NC}"
echo "Please enter your MySQL credentials:"
read -p "MySQL username: " DB_USER
read -sp "MySQL password: " DB_PASS
echo ""
read -p "Database name: " DB_NAME

echo "Running migration..."
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < migrations/001_public_store_schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database migration completed successfully${NC}"
else
    echo -e "${RED}✗ Database migration failed${NC}"
    echo "You can run it manually with:"
    echo "mysql -u $DB_USER -p $DB_NAME < migrations/001_public_store_schema.sql"
fi
echo ""

# Step 4: Check if server is running
echo -e "${YELLOW}Step 4: Checking server status...${NC}"
if pgrep -f "run_local.sh" > /dev/null; then
    echo -e "${GREEN}✓ Server is already running${NC}"
else
    echo -e "${YELLOW}Server is not running. Starting it now...${NC}"
    ./run_local.sh &
    sleep 3
    echo -e "${GREEN}✓ Server started${NC}"
fi
echo ""

# Step 5: Display access URLs
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Setup Complete! 🎉${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "You can now access the public store at:"
echo ""
echo -e "${YELLOW}📦 Browse Marketplace:${NC}"
echo "   http://localhost:8080/public-store.html"
echo ""
echo -e "${YELLOW}📤 Upload Design:${NC}"
echo "   http://localhost:8080/upload-design.html"
echo ""
echo -e "${YELLOW}🏠 Main Website:${NC}"
echo "   http://localhost:8080"
echo ""
echo -e "${YELLOW}📊 API Endpoints:${NC}"
echo "   GET  http://localhost:8080/api/public-store/categories"
echo "   GET  http://localhost:8080/api/public-store/items"
echo "   GET  http://localhost:8080/api/public-store/stats"
echo "   POST http://localhost:8080/api/public-store/upload"
echo ""
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Open your browser and visit the URLs above"
echo "2. Create an account or log in"
echo "3. Try uploading a design!"
echo ""
echo "To stop the server, run: pkill -f run_local.sh"
echo ""
