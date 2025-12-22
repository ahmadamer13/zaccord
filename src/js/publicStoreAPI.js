// Public Store API Routes
// Handles all marketplace functionality for user-uploaded STL files

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const formidable = require('formidable');

// Configuration
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'public_store_uploads');
const STL_DIR = path.join(UPLOAD_DIR, 'stl');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');
const THUMBNAILS_DIR = path.join(UPLOAD_DIR, 'thumbnails');
const MAX_STL_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5;
const PLATFORM_FEE_PERCENT = 15;

// Ensure upload directories exist
[UPLOAD_DIR, STL_DIR, IMAGES_DIR, THUMBNAILS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

/**
 * Get all categories
 */
async function getCategories(conn) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, name, slug, description, icon FROM public_store_categories WHERE is_active = 1 ORDER BY display_order';
        conn.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

/**
 * Get marketplace items with filters
 */
async function getItems(conn, filters = {}) {
    return new Promise((resolve, reject) => {
        const {
            page = 1,
            limit = 12,
            search = '',
            category = '',
            priceRange = '',
            sort = 'newest'
        } = filters;

        const offset = (page - 1) * limit;
        let whereConditions = ['i.is_approved = 1', 'i.status = "approved"'];
        let queryParams = [];

        // Search filter
        if (search) {
            whereConditions.push('(i.title LIKE ? OR i.description LIKE ? OR i.tags LIKE ?)');
            const searchTerm = `%${search}%`;
            queryParams.push(searchTerm, searchTerm, searchTerm);
        }

        // Category filter
        if (category) {
            whereConditions.push('i.category = ?');
            queryParams.push(category);
        }

        // Price range filter
        if (priceRange) {
            if (priceRange === '0-10') {
                whereConditions.push('i.price < 10');
            } else if (priceRange === '10-25') {
                whereConditions.push('i.price BETWEEN 10 AND 25');
            } else if (priceRange === '25-50') {
                whereConditions.push('i.price BETWEEN 25 AND 50');
            } else if (priceRange === '50+') {
                whereConditions.push('i.price >= 50');
            }
        }

        // Sort order
        let orderBy = 'i.created_at DESC'; // Default: newest
        if (sort === 'popular') {
            orderBy = 'i.views_count DESC, i.downloads_count DESC';
        } else if (sort === 'rating') {
            orderBy = 'i.rating_average DESC, i.rating_count DESC';
        } else if (sort === 'price-low') {
            orderBy = 'i.price ASC';
        } else if (sort === 'price-high') {
            orderBy = 'i.price DESC';
        }

        const whereClause = whereConditions.join(' AND ');

        // Get total count
        const countQuery = `SELECT COUNT(*) as total FROM public_store_items i WHERE ${whereClause}`;
        conn.query(countQuery, queryParams, (err, countResult) => {
            if (err) {
                reject(err);
                return;
            }

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / limit);

            // Get items
            const itemsQuery = `
                SELECT 
                    i.*,
                    u.display_name as seller_name,
                    u.profile_image as seller_avatar
                FROM public_store_items i
                LEFT JOIN users u ON i.user_id = u.id
                WHERE ${whereClause}
                ORDER BY ${orderBy}
                LIMIT ? OFFSET ?
            `;

            queryParams.push(parseInt(limit), parseInt(offset));

            conn.query(itemsQuery, queryParams, (err, items) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        items,
                        pagination: {
                            currentPage: parseInt(page),
                            totalPages,
                            totalItems: total,
                            itemsPerPage: parseInt(limit)
                        }
                    });
                }
            });
        });
    });
}

/**
 * Get single item details
 */
async function getItemById(conn, itemId, userId = null) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                i.*,
                u.display_name as seller_name,
                u.profile_image as seller_avatar,
                u.seller_rating,
                u.total_sales,
                (SELECT COUNT(*) FROM public_store_favorites WHERE item_id = i.id AND user_id = ?) as is_favorited
            FROM public_store_items i
            LEFT JOIN users u ON i.user_id = u.id
            WHERE i.id = ? AND i.is_approved = 1 AND i.status = 'approved'
        `;

        conn.query(query, [userId || 0, itemId], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                reject(new Error('Item not found'));
            } else {
                // Increment view count
                conn.query('UPDATE public_store_items SET views_count = views_count + 1 WHERE id = ?', [itemId]);

                // Get reviews
                const reviewsQuery = `
                    SELECT 
                        r.*,
                        u.display_name as user_name,
                        u.profile_image as user_avatar
                    FROM public_store_reviews r
                    LEFT JOIN users u ON r.user_id = u.id
                    WHERE r.item_id = ?
                    ORDER BY r.created_at DESC
                    LIMIT 10
                `;

                conn.query(reviewsQuery, [itemId], (err, reviews) => {
                    const item = results[0];
                    item.reviews = reviews || [];
                    resolve(item);
                });
            }
        });
    });
}

/**
 * Upload new design
 */
async function uploadDesign(conn, req, userId) {
    return new Promise((resolve, reject) => {
        if (!userId) {
            reject(new Error('User must be logged in'));
            return;
        }

        const form = new formidable.IncomingForm();
        form.uploadDir = UPLOAD_DIR;
        form.keepExtensions = true;
        form.maxFileSize = MAX_STL_SIZE;
        form.multiples = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                // Validate required fields
                const { title, description, price, category } = fields;
                if (!title || !description || price === undefined || !category) {
                    reject(new Error('Missing required fields'));
                    return;
                }

                // Validate STL file
                if (!files.stlFile) {
                    reject(new Error('STL file is required'));
                    return;
                }

                // Validate images
                const imageFiles = Array.isArray(files.images) ? files.images : (files.images ? [files.images] : []);
                if (imageFiles.length === 0) {
                    reject(new Error('At least one image is required'));
                    return;
                }

                if (imageFiles.length > MAX_IMAGES) {
                    reject(new Error(`Maximum ${MAX_IMAGES} images allowed`));
                    return;
                }

                // Process STL file
                const stlFile = files.stlFile;
                const stlHash = await calculateFileHash(stlFile.path);
                const stlFileName = `${Date.now()}_${stlHash.substring(0, 8)}.stl`;
                const stlPath = path.join(STL_DIR, stlFileName);

                // Move STL file
                fs.renameSync(stlFile.path, stlPath);
                const stlSize = fs.statSync(stlPath).size;

                // Process images
                const imageNames = [];
                for (let i = 0; i < imageFiles.length; i++) {
                    const imageFile = imageFiles[i];
                    const ext = path.extname(imageFile.name);
                    const imageName = `${Date.now()}_${i}${ext}`;
                    const imagePath = path.join(IMAGES_DIR, imageName);
                    fs.renameSync(imageFile.path, imagePath);
                    imageNames.push(imageName);
                }

                // First image is thumbnail
                const thumbnailImage = imageNames[0];

                // Insert into database
                const insertQuery = `
                    INSERT INTO public_store_items (
                        user_id, title, description, price, category,
                        stl_file_path, stl_file_size, stl_file_hash,
                        thumbnail_image, gallery_images, tags,
                        dimensions, print_time_estimate, material_estimate,
                        status, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())
                `;

                const params = [
                    userId,
                    title,
                    description,
                    parseFloat(price),
                    category,
                    stlFileName,
                    stlSize,
                    stlHash,
                    thumbnailImage,
                    JSON.stringify(imageNames),
                    fields.tags || '',
                    fields.dimensions || null,
                    fields.printTime ? parseInt(fields.printTime) * 60 : null, // Convert to minutes
                    fields.material ? parseInt(fields.material) : null
                ];

                conn.query(insertQuery, params, (err, result) => {
                    if (err) {
                        // Clean up uploaded files on error
                        fs.unlinkSync(stlPath);
                        imageNames.forEach(img => {
                            const imgPath = path.join(IMAGES_DIR, img);
                            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
                        });
                        reject(err);
                    } else {
                        resolve({
                            success: true,
                            itemId: result.insertId,
                            message: 'Design uploaded successfully and pending approval'
                        });
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    });
}

/**
 * Calculate SHA256 hash of file
 */
function calculateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', data => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

/**
 * Get platform statistics
 */
async function getStats(conn) {
    return new Promise((resolve, reject) => {
        const queries = [
            'SELECT COUNT(*) as totalDesigns FROM public_store_items WHERE is_approved = 1',
            'SELECT COUNT(DISTINCT user_id) as totalCreators FROM public_store_items WHERE is_approved = 1',
            'SELECT SUM(downloads_count) as totalDownloads FROM public_store_items',
            'SELECT AVG(rating_average) as avgRating FROM public_store_items WHERE rating_count > 0'
        ];

        Promise.all(queries.map(q => new Promise((res, rej) => {
            conn.query(q, (err, result) => {
                if (err) rej(err);
                else res(result[0]);
            });
        }))).then(results => {
            resolve({
                totalDesigns: results[0].totalDesigns || 0,
                totalCreators: results[1].totalCreators || 0,
                totalDownloads: results[2].totalDownloads || 0,
                avgRating: results[3].avgRating || 0
            });
        }).catch(reject);
    });
}

/**
 * Toggle favorite
 */
async function toggleFavorite(conn, userId, itemId) {
    return new Promise((resolve, reject) => {
        if (!userId) {
            reject(new Error('User must be logged in'));
            return;
        }

        // Check if already favorited
        const checkQuery = 'SELECT id FROM public_store_favorites WHERE user_id = ? AND item_id = ?';
        conn.query(checkQuery, [userId, itemId], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {
                // Remove favorite
                const deleteQuery = 'DELETE FROM public_store_favorites WHERE user_id = ? AND item_id = ?';
                conn.query(deleteQuery, [userId, itemId], (err) => {
                    if (err) reject(err);
                    else resolve({ favorited: false });
                });
            } else {
                // Add favorite
                const insertQuery = 'INSERT INTO public_store_favorites (user_id, item_id, added_at) VALUES (?, ?, NOW())';
                conn.query(insertQuery, [userId, itemId], (err) => {
                    if (err) reject(err);
                    else resolve({ favorited: true });
                });
            }
        });
    });
}

module.exports = {
    getCategories,
    getItems,
    getItemById,
    uploadDesign,
    getStats,
    toggleFavorite,
    UPLOAD_DIR,
    STL_DIR,
    IMAGES_DIR,
    THUMBNAILS_DIR
};
