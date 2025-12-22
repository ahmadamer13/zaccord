-- Migration: Public Store Feature
-- Description: Add tables and columns for user-uploaded STL marketplace
-- Date: 2025-12-22

-- =====================================================
-- 1. CREATE PUBLIC STORE ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stl_file_path` varchar(255) NOT NULL,
  `stl_file_size` bigint NOT NULL,
  `stl_file_hash` varchar(64) DEFAULT NULL COMMENT 'SHA256 hash for duplicate detection',
  `thumbnail_image` varchar(255) NOT NULL,
  `gallery_images` text COMMENT 'JSON array of image paths',
  `tags` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `downloads_count` int(11) DEFAULT 0,
  `views_count` int(11) DEFAULT 0,
  `rating_average` decimal(3,2) DEFAULT 0.00,
  `rating_count` int(11) DEFAULT 0,
  `is_approved` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('draft','pending','approved','rejected') DEFAULT 'draft',
  `rejection_reason` text DEFAULT NULL,
  `print_time_estimate` int(11) DEFAULT NULL COMMENT 'Estimated print time in minutes',
  `material_estimate` decimal(8,2) DEFAULT NULL COMMENT 'Estimated material in grams',
  `dimensions` varchar(100) DEFAULT NULL COMMENT 'X x Y x Z dimensions in mm',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`),
  KEY `category` (`category`),
  KEY `is_approved` (`is_approved`),
  KEY `created_at` (`created_at`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. CREATE PUBLIC STORE PURCHASES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `buyer_user_id` int(11) NOT NULL,
  `seller_user_id` int(11) NOT NULL,
  `price_paid` decimal(10,2) NOT NULL,
  `platform_fee` decimal(10,2) DEFAULT 0.00 COMMENT 'Platform commission',
  `seller_payout` decimal(10,2) NOT NULL COMMENT 'Amount paid to seller',
  `transaction_id` varchar(255) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `download_count` int(11) DEFAULT 0,
  `max_downloads` int(11) DEFAULT 5 COMMENT 'Maximum allowed downloads',
  `purchase_date` datetime NOT NULL,
  `download_expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `buyer_user_id` (`buyer_user_id`),
  KEY `seller_user_id` (`seller_user_id`),
  KEY `payment_status` (`payment_status`),
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`buyer_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`seller_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. CREATE PUBLIC STORE REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL COMMENT 'Link to purchase for verified reviews',
  `rating` tinyint(1) NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `review_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified_purchase` tinyint(1) DEFAULT 0,
  `helpful_count` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `user_id` (`user_id`),
  KEY `purchase_id` (`purchase_id`),
  UNIQUE KEY `unique_user_item_review` (`item_id`, `user_id`),
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`purchase_id`) REFERENCES `public_store_purchases`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. CREATE PUBLIC STORE CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `parent_id` (`parent_id`),
  KEY `display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. INSERT DEFAULT CATEGORIES
-- =====================================================
INSERT INTO `public_store_categories` (`name`, `slug`, `description`, `display_order`) VALUES
('Home & Garden', 'home-garden', '3D models for home decoration and garden accessories', 1),
('Toys & Games', 'toys-games', 'Fun toys, board game pieces, and gaming accessories', 2),
('Tools & Parts', 'tools-parts', 'Functional tools, replacement parts, and mechanical components', 3),
('Art & Sculpture', 'art-sculpture', 'Artistic models, sculptures, and decorative pieces', 4),
('Fashion & Jewelry', 'fashion-jewelry', 'Wearable items, jewelry, and fashion accessories', 5),
('Electronics', 'electronics', 'Cases, mounts, and accessories for electronics', 6),
('Automotive', 'automotive', 'Car parts, accessories, and modifications', 7),
('Educational', 'educational', 'Learning tools, anatomical models, and educational aids', 8),
('Miniatures', 'miniatures', 'Scale models, figurines, and miniature replicas', 9),
('Other', 'other', 'Miscellaneous 3D printable designs', 10);

-- =====================================================
-- 6. UPDATE USERS TABLE FOR SELLER FEATURES
-- =====================================================
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `display_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `profile_image` varchar(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `is_seller` tinyint(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS `seller_rating` decimal(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS `total_sales` int(11) DEFAULT 0,
ADD COLUMN IF NOT EXISTS `wallet_balance` decimal(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS `bank_account` varchar(255) DEFAULT NULL COMMENT 'Encrypted bank details for payouts',
ADD COLUMN IF NOT EXISTS `seller_approved_at` datetime DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `seller_status` enum('pending','approved','suspended') DEFAULT 'pending';

-- =====================================================
-- 7. CREATE DOWNLOAD LOGS TABLE (for security/tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_downloads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `download_date` datetime NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  FOREIGN KEY (`purchase_id`) REFERENCES `public_store_purchases`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. CREATE SELLER PAYOUTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_payouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','failed') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_reference` varchar(255) DEFAULT NULL,
  `requested_at` datetime NOT NULL,
  `processed_at` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seller_user_id` (`seller_user_id`),
  KEY `status` (`status`),
  FOREIGN KEY (`seller_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. CREATE FAVORITES/WISHLIST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `added_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_item_favorite` (`user_id`, `item_id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. CREATE REPORTS/FLAGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `public_store_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `reporter_user_id` int(11) NOT NULL,
  `reason` enum('copyright','inappropriate','spam','quality','other') NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','reviewed','resolved','dismissed') DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `reported_at` datetime NOT NULL,
  `resolved_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `reporter_user_id` (`reporter_user_id`),
  KEY `status` (`status`),
  FOREIGN KEY (`item_id`) REFERENCES `public_store_items`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reporter_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_items_approved_created ON public_store_items(is_approved, created_at DESC);
CREATE INDEX idx_items_category_approved ON public_store_items(category, is_approved);
CREATE INDEX idx_items_price ON public_store_items(price);
CREATE INDEX idx_purchases_date ON public_store_purchases(purchase_date DESC);
CREATE INDEX idx_reviews_rating ON public_store_reviews(rating);

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
