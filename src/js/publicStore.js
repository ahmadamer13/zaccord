// Public Store Frontend Logic
(function () {
    'use strict';

    // State
    let currentPage = 1;
    let currentFilters = {
        search: '',
        category: '',
        priceRange: '',
        sort: 'newest'
    };
    let viewMode = 'grid'; // 'grid' or 'list'

    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const itemsGrid = document.getElementById('itemsGrid');
    const pagination = document.getElementById('pagination');

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        loadCategories();
        loadItems();
        loadStats();
        setupEventListeners();
    }

    function setupEventListeners() {
        // Search
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        // Filters
        categoryFilter.addEventListener('change', handleFilterChange);
        priceFilter.addEventListener('change', handleFilterChange);
        sortFilter.addEventListener('change', handleFilterChange);

        // View toggle
        gridViewBtn.addEventListener('click', () => setViewMode('grid'));
        listViewBtn.addEventListener('click', () => setViewMode('list'));
    }

    function handleSearch() {
        currentFilters.search = searchInput.value.trim();
        currentPage = 1;
        loadItems();
    }

    function handleFilterChange() {
        currentFilters.category = categoryFilter.value;
        currentFilters.priceRange = priceFilter.value;
        currentFilters.sort = sortFilter.value;
        currentPage = 1;
        loadItems();
    }

    function setViewMode(mode) {
        viewMode = mode;

        if (mode === 'grid') {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            itemsGrid.classList.remove('list-view');
        } else {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            itemsGrid.classList.add('list-view');
        }
    }

    async function loadCategories() {
        try {
            const response = await fetch('/api/public-store/categories');
            const categories = await response.json();

            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.slug;
                option.textContent = cat.name;
                categoryFilter.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async function loadItems() {
        try {
            // Show loading state
            itemsGrid.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Loading designs...</p>
                </div>
            `;

            // Build query string
            const params = new URLSearchParams({
                page: currentPage,
                limit: 12,
                ...currentFilters
            });

            const response = await fetch(`/api/public-store/items?${params}`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                renderItems(data.items);
                renderPagination(data.pagination);
            } else {
                showEmptyState();
            }
        } catch (error) {
            console.error('Error loading items:', error);
            showError();
        }
    }

    function renderItems(items) {
        itemsGrid.innerHTML = items.map(item => createItemCard(item)).join('');

        // Add click handlers
        document.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.icon-btn')) {
                    window.location.href = `/public-store-item.html?id=${card.dataset.itemId}`;
                }
            });
        });

        // Add favorite handlers
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn.dataset.itemId);
            });
        });
    }

    function createItemCard(item) {
        const rating = item.rating_average || 0;
        const ratingStars = '⭐'.repeat(Math.round(rating));

        return `
            <div class="item-card" data-item-id="${item.id}">
                <img src="${item.thumbnail_image}" alt="${escapeHtml(item.title)}" class="item-image" loading="lazy">
                <div class="item-content">
                    <div class="item-header">
                        <h3 class="item-title">${escapeHtml(item.title)}</h3>
                        <span class="item-price">${item.price} JD</span>
                    </div>
                    <p class="item-description">${escapeHtml(item.description)}</p>
                    <div class="item-meta">
                        <span class="item-rating" title="${rating.toFixed(1)} stars">
                            ${ratingStars} ${rating.toFixed(1)}
                        </span>
                        <span>👁️ ${formatNumber(item.views_count)}</span>
                        <span>⬇️ ${formatNumber(item.downloads_count)}</span>
                    </div>
                    <div class="item-footer">
                        <div class="item-seller">
                            <img src="${item.seller_avatar || '/images/default-avatar.png'}" alt="${escapeHtml(item.seller_name)}" class="seller-avatar">
                            <span>${escapeHtml(item.seller_name)}</span>
                        </div>
                        <div class="item-actions">
                            <button class="icon-btn favorite-btn" data-item-id="${item.id}" title="Add to favorites">
                                ❤️
                            </button>
                            <button class="icon-btn share-btn" title="Share">
                                🔗
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPagination(pagination) {
        if (!pagination || pagination.totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        const { currentPage: page, totalPages } = pagination;
        let html = '';

        // Previous button
        html += `
            <button ${page === 1 ? 'disabled' : ''} onclick="goToPage(${page - 1})">
                ← Previous
            </button>
        `;

        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            html += `<button onclick="goToPage(1)">1</button>`;
            if (startPage > 2) html += `<span>...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="${i === page ? 'active' : ''}" onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<span>...</span>`;
            html += `<button onclick="goToPage(${totalPages})">${totalPages}</button>`;
        }

        // Next button
        html += `
            <button ${page === totalPages ? 'disabled' : ''} onclick="goToPage(${page + 1})">
                Next →
            </button>
        `;

        pagination.innerHTML = html;
    }

    window.goToPage = function (page) {
        currentPage = page;
        loadItems();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function showEmptyState() {
        itemsGrid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3>No designs found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
    }

    function showError() {
        itemsGrid.innerHTML = `
            <div class="empty-state">
                <h3>Oops! Something went wrong</h3>
                <p>Please try again later</p>
                <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
            </div>
        `;
    }

    async function loadStats() {
        try {
            const response = await fetch('/api/public-store/stats');
            const stats = await response.json();

            document.getElementById('totalDesigns').textContent = formatNumber(stats.totalDesigns || 0);
            document.getElementById('totalCreators').textContent = formatNumber(stats.totalCreators || 0);
            document.getElementById('totalDownloads').textContent = formatNumber(stats.totalDownloads || 0);
            document.getElementById('avgRating').textContent = (stats.avgRating || 0).toFixed(1);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async function toggleFavorite(itemId) {
        try {
            const response = await fetch(`/api/public-store/favorite/${itemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (response.ok) {
                const btn = document.querySelector(`.favorite-btn[data-item-id="${itemId}"]`);
                btn.classList.toggle('favorited');
                showNotification('Added to favorites!');
            } else if (response.status === 401) {
                window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    // Utility functions
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function getAuthToken() {
        return localStorage.getItem('authToken') || '';
    }

    function showNotification(message) {
        // Simple notification - can be enhanced
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-hover);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

})();
