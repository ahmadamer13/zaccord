# 🚀 Quick Start Guide - Public Store Marketplace

## Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
cd /home/ahmad/Downloads/projects/3dprintjordan/zaccord
./setup_public_store.sh
```

This will:
1. Switch to the `public-store` branch
2. Create upload directories
3. Run the database migration
4. Start the server (if not running)
5. Show you the URLs to access

---

## Option 2: Manual Setup

### Step 1: Switch to Public Store Branch
```bash
cd /home/ahmad/Downloads/projects/3dprintjordan/zaccord
git checkout public-store
```

### Step 2: Create Upload Directories
```bash
mkdir -p public_store_uploads/stl
mkdir -p public_store_uploads/images
mkdir -p public_store_uploads/thumbnails
chmod -R 755 public_store_uploads
```

### Step 3: Run Database Migration
```bash
# Replace with your actual credentials
mysql -u your_username -p your_database < migrations/001_public_store_schema.sql
```

When prompted, enter your MySQL password.

### Step 4: Start the Server (if not running)
```bash
./run_local.sh
```

---

## 🌐 Access the Marketplace

Once setup is complete, open your browser and visit:

### **Browse Marketplace**
```
http://localhost:8080/public-store.html
```

### **Upload Design**
```
http://localhost:8080/upload-design.html
```

### **Main Website**
```
http://localhost:8080
```

---

## 📝 How to Use

### **For Sellers (Upload Designs):**

1. **Create an account or log in**
   - Visit: http://localhost:8080/register.html
   - Or login: http://localhost:8080/login.html

2. **Upload your design**
   - Go to: http://localhost:8080/upload-design.html
   - Fill in the form:
     - **Title**: Name of your design
     - **Description**: Detailed description
     - **Price**: Set price in JD (or 0 for free)
     - **Category**: Choose from dropdown
     - **Tags**: Comma-separated keywords
   - **Upload STL file**: Drag & drop or click to browse
   - **Upload images**: Add 1-5 product images
   - Click **"Submit for Review"**

3. **Your design will be pending approval**
   - Admin needs to approve it first
   - Once approved, it will appear in the marketplace

### **For Buyers (Browse Designs):**

1. **Browse the marketplace**
   - Visit: http://localhost:8080/public-store.html

2. **Search and filter**
   - Use the search bar to find designs
   - Filter by category
   - Filter by price range
   - Sort by: newest, popular, rating, price

3. **View designs**
   - Click on any design card to see details
   - Add to favorites (heart icon)
   - Share designs

---

## 🔧 Testing the API

You can test the API endpoints using curl or your browser:

### Get Categories
```bash
curl http://localhost:8080/api/public-store/categories
```

### Get All Items
```bash
curl http://localhost:8080/api/public-store/items
```

### Get Items with Filters
```bash
curl "http://localhost:8080/api/public-store/items?category=toys-games&sort=popular&page=1"
```

### Get Platform Stats
```bash
curl http://localhost:8080/api/public-store/stats
```

---

## 🐛 Troubleshooting

### Server not running?
```bash
./run_local.sh
```

### Database migration failed?
Make sure your MySQL credentials are correct and the database exists:
```bash
mysql -u your_username -p
# Then in MySQL:
SHOW DATABASES;
USE your_database_name;
```

### Upload directories not created?
```bash
mkdir -p public_store_uploads/{stl,images,thumbnails}
chmod -R 755 public_store_uploads
```

### Can't access the pages?
Make sure you're on the `public-store` branch:
```bash
git branch
# Should show: * public-store

# If not:
git checkout public-store
```

---

## 📊 Default Categories

The marketplace comes with 10 pre-populated categories:

1. **Home & Garden** - Home decoration and garden accessories
2. **Toys & Games** - Fun toys and gaming accessories
3. **Tools & Parts** - Functional tools and mechanical components
4. **Art & Sculpture** - Artistic models and decorative pieces
5. **Fashion & Jewelry** - Wearable items and accessories
6. **Electronics** - Cases, mounts, and electronics accessories
7. **Automotive** - Car parts and modifications
8. **Educational** - Learning tools and educational aids
9. **Miniatures** - Scale models and figurines
10. **Other** - Miscellaneous designs

---

## 🎯 Next Steps

After testing locally:

1. **Test the upload functionality**
   - Upload a sample STL file
   - Add images
   - Check if it appears in the database

2. **Test browsing**
   - Search for items
   - Filter by category
   - Test pagination

3. **Deploy to production**
   ```bash
   git checkout master
   git merge public-store
   ./deploy.sh "Add public store marketplace"
   ```

---

## 📞 Need Help?

- Check `PUBLIC_STORE_README.md` for detailed documentation
- Check `PUBLIC_STORE_COMPLETE.md` for implementation details
- Check `.agent/workflows/public-store-implementation.md` for the full plan

---

**Enjoy your new marketplace! 🎉**
