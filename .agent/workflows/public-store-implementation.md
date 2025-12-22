---
description: Transform website into Thingiverse-like public STL marketplace
---

# Public Store Implementation Plan

## Overview
Transform the 3D printing service website into a marketplace where users can upload STL files with images, descriptions, and set prices - similar to Thingiverse.

## Phase 1: Git Branch Setup
// turbo
1. Create a new Git branch called `public-store`
```bash
cd /home/ahmad/Downloads/projects/3dprintjordan/zaccord
git checkout -b public-store
git push -u origin public-store
```

## Phase 2: Database Schema Changes

### New Tables to Create

#### 1. `public_store_items` Table
```sql
CREATE TABLE `public_store_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `stl_file_path` varchar(255) NOT NULL,
  `stl_file_size` bigint NOT NULL,
  `thumbnail_image` varchar(255) NOT NULL,
  `gallery_images` text,
  `tags` varchar(500),
  `downloads_count` int(11) DEFAULT 0,
  `views_count` int(11) DEFAULT 0,
  `rating_average` decimal(3,2) DEFAULT 0.00,
  `rating_count` int(11) DEFAULT 0,
  `is_approved` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('draft','pending','approved','rejected') DEFAULT 'draft',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`),
  KEY `category` (`category`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 2. `public_store_purchases` Table
```sql
CREATE TABLE `public_store_purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `buyer_user_id` int(11) NOT NULL,
  `seller_user_id` int(11) NOT NULL,
  `price_paid` decimal(10,2) NOT NULL,
  `transaction_id` varchar(255),
  `download_count` int(11) DEFAULT 0,
  `purchase_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `buyer_user_id` (`buyer_user_id`),
  KEY `seller_user_id` (`seller_user_id`),
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`buyer_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`seller_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3. `public_store_reviews` Table
```sql
CREATE TABLE `public_store_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(1) NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `review_text` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `user_id` (`user_id`),
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4. `public_store_categories` Table
```sql
CREATE TABLE `public_store_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(255),
  `parent_id` int(11) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 5. Update `users` Table
```sql
ALTER TABLE `users` 
ADD COLUMN `display_name` varchar(100) DEFAULT NULL,
ADD COLUMN `bio` text DEFAULT NULL,
ADD COLUMN `profile_image` varchar(255) DEFAULT NULL,
ADD COLUMN `is_seller` tinyint(1) DEFAULT 0,
ADD COLUMN `seller_rating` decimal(3,2) DEFAULT 0.00,
ADD COLUMN `total_sales` int(11) DEFAULT 0,
ADD COLUMN `wallet_balance` decimal(10,2) DEFAULT 0.00;
```

## Phase 3: File Structure

### Create New Directories
```bash
mkdir -p /home/ahmad/Downloads/projects/3dprintjordan/zaccord/public_store_uploads/stl
mkdir -p /home/ahmad/Downloads/projects/3dprintjordan/zaccord/public_store_uploads/images
mkdir -p /home/ahmad/Downloads/projects/3dprintjordan/zaccord/public_store_uploads/thumbnails
```

### New Frontend Pages
1. `/public-store.html` - Browse all items
2. `/public-store-item.html` - Individual item page
3. `/upload-design.html` - Upload new STL design
4. `/seller-dashboard.html` - Manage your uploads
5. `/buyer-purchases.html` - View purchased items

### New Backend API Endpoints (in app.js)
1. `POST /api/public-store/upload` - Upload new design
2. `GET /api/public-store/items` - List all items (with filters)
3. `GET /api/public-store/item/:id` - Get single item details
4. `PUT /api/public-store/item/:id` - Update item
5. `DELETE /api/public-store/item/:id` - Delete item
6. `POST /api/public-store/purchase/:id` - Purchase item
7. `GET /api/public-store/download/:id` - Download purchased STL
8. `POST /api/public-store/review/:id` - Add review
9. `GET /api/public-store/seller/dashboard` - Seller stats
10. `GET /api/public-store/buyer/purchases` - Buyer's purchases

## Phase 4: Features to Implement

### User Features
- [x] User registration/login (already exists)
- [ ] Seller profile setup
- [ ] Upload STL files with drag-and-drop
- [ ] Upload multiple product images
- [ ] Set pricing
- [ ] Add descriptions and tags
- [ ] View analytics (views, downloads, sales)
- [ ] Manage listings (edit, delete, draft)

### Buyer Features
- [ ] Browse marketplace
- [ ] Search and filter by category, price, rating
- [ ] View item details with 3D preview
- [ ] Purchase items
- [ ] Download purchased STL files
- [ ] Leave reviews and ratings
- [ ] View purchase history

### Admin Features
- [ ] Approve/reject submissions
- [ ] Feature items
- [ ] Manage categories
- [ ] View platform statistics
- [ ] Handle disputes

## Phase 5: Security Considerations

1. **File Upload Security**
   - Validate STL file format
   - Limit file size (e.g., 50MB max)
   - Scan for malware
   - Store files outside web root

2. **Payment Security**
   - Integrate payment gateway (Stripe, PayPal, or local Jordanian payment)
   - Secure transaction handling
   - Escrow system for seller payouts

3. **Access Control**
   - Only buyers can download purchased files
   - Only sellers can edit their own items
   - Admin approval workflow

## Phase 6: Implementation Steps

### Step 1: Database Migration
```bash
# Create migration SQL file
# Run migration on local database
# Test with sample data
```

### Step 2: Backend API Development
```javascript
// Implement multer for file uploads
// Create API routes
// Add authentication middleware
// Implement business logic
```

### Step 3: Frontend Development
```html
<!-- Create upload form with image preview -->
<!-- Build marketplace grid/list view -->
<!-- Implement 3D STL viewer (Three.js) -->
<!-- Create seller dashboard -->
```

### Step 4: Testing
- Test file uploads
- Test purchase flow
- Test download restrictions
- Test payment integration
- Security testing

### Step 5: Deployment
```bash
# Merge to master after testing
# Deploy to production
# Monitor for issues
```

## Phase 7: Revenue Model

1. **Commission-based**: Take 10-15% of each sale
2. **Subscription**: Premium seller accounts
3. **Featured listings**: Pay to promote items
4. **Print-on-demand**: Offer printing services for uploaded designs

## Technologies Needed

### Frontend
- Three.js or STL Viewer for 3D preview
- Dropzone.js for file uploads
- Image cropping library
- Star rating component

### Backend
- Multer for file handling
- Sharp for image processing
- Payment gateway SDK
- Email notifications (Nodemailer)

### Storage
- Local filesystem or cloud storage (AWS S3, Cloudinary)

## Timeline Estimate

- Week 1: Database setup + Git branch
- Week 2: Backend API development
- Week 3: Frontend pages (upload, browse)
- Week 4: Payment integration + testing
- Week 5: Polish, security review, deployment

## Next Steps

1. Review and approve this plan
2. Create the `public-store` git branch
3. Create database migration file
4. Start with upload functionality
5. Build marketplace browsing
6. Integrate payments
7. Test and deploy

---

**Note**: This is a major feature addition. Consider starting with an MVP (Minimum Viable Product) that includes:
- Basic upload functionality
- Simple marketplace listing
- Manual payment (bank transfer) before integrating payment gateway
- Admin approval workflow
