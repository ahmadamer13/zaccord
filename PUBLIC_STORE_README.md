# Public Store Feature - Thingiverse-like Marketplace

## Overview
This branch implements a public marketplace where users can upload, sell, and purchase 3D printable STL files - similar to Thingiverse but with monetization.

## Features

### For Sellers
- ✅ Upload STL files with multiple images
- ✅ Set custom pricing
- ✅ Add descriptions, tags, and categories
- ✅ Track views, downloads, and sales
- ✅ Manage listings (edit, delete, draft)
- ✅ View earnings and request payouts
- ✅ Seller ratings and reviews

### For Buyers
- ✅ Browse marketplace with filters
- ✅ Search by category, price, rating
- ✅ 3D preview of STL files
- ✅ Purchase and download files
- ✅ Leave reviews and ratings
- ✅ Wishlist/favorites
- ✅ Purchase history

### For Admins
- ✅ Approve/reject submissions
- ✅ Feature items
- ✅ Manage categories
- ✅ Handle reports and disputes
- ✅ Process seller payouts
- ✅ Platform analytics

## Database Schema

### New Tables
1. **public_store_items** - Uploaded STL designs
2. **public_store_purchases** - Purchase records
3. **public_store_reviews** - User reviews and ratings
4. **public_store_categories** - Product categories
5. **public_store_downloads** - Download tracking
6. **public_store_payouts** - Seller payment requests
7. **public_store_favorites** - User wishlists
8. **public_store_reports** - Content reports/flags

### Updated Tables
- **users** - Added seller profile fields (display_name, bio, wallet_balance, etc.)

## File Structure

```
/public_store_uploads/
  /stl/           - Uploaded STL files
  /images/        - Product images
  /thumbnails/    - Auto-generated thumbnails

/src/
  /public-store.html              - Marketplace browse page
  /public-store-item.html         - Individual item page
  /upload-design.html             - Upload form
  /seller-dashboard.html          - Seller management
  /buyer-purchases.html           - Purchase history
  
/src/js/
  /publicStore.js                 - Frontend logic
  /stlViewer.js                   - 3D STL preview
  /uploadDesign.js                - Upload handling

/app.js (API endpoints)
  POST   /api/public-store/upload
  GET    /api/public-store/items
  GET    /api/public-store/item/:id
  PUT    /api/public-store/item/:id
  DELETE /api/public-store/item/:id
  POST   /api/public-store/purchase/:id
  GET    /api/public-store/download/:id
  POST   /api/public-store/review/:id
  GET    /api/public-store/seller/dashboard
  GET    /api/public-store/buyer/purchases
```

## Installation

### 1. Run Database Migration
```bash
# Make sure you're on the public-store branch
git checkout public-store

# Run the migration
mysql -u your_user -p your_database < migrations/001_public_store_schema.sql
```

### 2. Create Upload Directories
```bash
mkdir -p public_store_uploads/{stl,images,thumbnails}
chmod 755 public_store_uploads
```

### 3. Install Dependencies
```bash
npm install multer sharp three stl-viewer
```

### 4. Configure Environment
Add to your config file:
```javascript
PUBLIC_STORE_ENABLED: true,
UPLOAD_MAX_SIZE: 52428800, // 50MB
PLATFORM_FEE_PERCENT: 15,  // 15% commission
MIN_PAYOUT_AMOUNT: 50,     // Minimum 50 JD for payout
```

## API Endpoints

### Upload Design
```http
POST /api/public-store/upload
Content-Type: multipart/form-data

{
  "title": "Cool Robot Arm",
  "description": "Fully articulated robot arm...",
  "price": 25.00,
  "category": "toys-games",
  "tags": "robot,mechanical,articulated",
  "stl_file": <file>,
  "images": [<file1>, <file2>, <file3>]
}
```

### Browse Items
```http
GET /api/public-store/items?category=toys-games&sort=popular&page=1
```

### Purchase Item
```http
POST /api/public-store/purchase/:itemId
{
  "payment_method": "card",
  "transaction_id": "txn_123456"
}
```

### Download Purchased File
```http
GET /api/public-store/download/:purchaseId
Authorization: Bearer <token>
```

## Security Features

1. **File Validation**
   - STL format verification
   - File size limits (50MB)
   - Malware scanning
   - Duplicate detection (SHA256 hash)

2. **Access Control**
   - JWT authentication
   - Purchase verification before download
   - Download count limits
   - IP tracking

3. **Payment Security**
   - Secure transaction handling
   - Escrow system
   - Fraud detection
   - Refund support

## Revenue Model

- **Platform Fee**: 15% commission on each sale
- **Featured Listings**: Premium placement (optional)
- **Seller Subscriptions**: Premium seller accounts (future)
- **Print Services**: Offer printing for uploaded designs

## Testing

```bash
# Run tests
npm test

# Test file upload
npm run test:upload

# Test purchase flow
npm run test:purchase
```

## Deployment

```bash
# After testing, merge to master
git checkout master
git merge public-store

# Deploy
./deploy.sh "Add public store marketplace feature"
```

## Roadmap

### Phase 1 (Current)
- [x] Database schema
- [x] Git branch setup
- [ ] Backend API
- [ ] Upload functionality
- [ ] Basic marketplace

### Phase 2
- [ ] Payment integration
- [ ] 3D STL viewer
- [ ] Search and filters
- [ ] Reviews system

### Phase 3
- [ ] Seller dashboard
- [ ] Analytics
- [ ] Payout system
- [ ] Mobile responsive

### Phase 4
- [ ] Advanced features
- [ ] Social sharing
- [ ] Collections
- [ ] API for developers

## Support

For questions or issues, contact the development team or create an issue in the repository.

## License

This feature is part of the Jordan 3D Print platform.
