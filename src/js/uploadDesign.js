// Upload Design Frontend Logic
(function () {
    'use strict';

    // DOM Elements
    const uploadForm = document.getElementById('uploadForm');
    const stlDropZone = document.getElementById('stlDropZone');
    const stlFileInput = document.getElementById('stlFile');
    const stlFileInfo = document.getElementById('stlFileInfo');
    const imagesInput = document.getElementById('images');
    const addImagesBtn = document.getElementById('addImagesBtn');
    const imagesPreview = document.getElementById('imagesPreview');
    const descriptionTextarea = document.getElementById('description');
    const descCount = document.getElementById('descCount');
    const categorySelect = document.getElementById('category');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const submitBtn = document.getElementById('submitBtn');
    const uploadModal = document.getElementById('uploadModal');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    let selectedSTL = null;
    let selectedImages = [];

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        loadCategories();
        setupEventListeners();
    }

    function setupEventListeners() {
        // STL file drag & drop
        stlDropZone.addEventListener('click', () => stlFileInput.click());
        stlDropZone.addEventListener('dragover', handleDragOver);
        stlDropZone.addEventListener('drop', handleSTLDrop);
        stlFileInput.addEventListener('change', handleSTLSelect);

        // Images
        addImagesBtn.addEventListener('click', () => imagesInput.click());
        imagesInput.addEventListener('change', handleImagesSelect);

        // Description character count
        descriptionTextarea.addEventListener('input', updateDescCount);

        // Form submission
        uploadForm.addEventListener('submit', handleSubmit);
        saveDraftBtn.addEventListener('click', () => handleSubmit(null, true));

        // Remove file button
        document.querySelector('.remove-file-btn')?.addEventListener('click', removeSTLFile);
    }

    async function loadCategories() {
        try {
            const response = await fetch('/api/public-store/categories');
            const categories = await response.json();

            categorySelect.innerHTML = '<option value="">Select a category</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.slug;
                option.textContent = cat.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
            showNotification('Failed to load categories', 'error');
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        stlDropZone.classList.add('drag-over');
    }

    function handleSTLDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        stlDropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.name.toLowerCase().endsWith('.stl')) {
                setSTLFile(file);
            } else {
                showNotification('Please select an STL file', 'error');
            }
        }
    }

    function handleSTLSelect(e) {
        const file = e.target.files[0];
        if (file) {
            setSTLFile(file);
        }
    }

    function setSTLFile(file) {
        // Validate file size (50MB max)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification('STL file must be less than 50MB', 'error');
            return;
        }

        selectedSTL = file;

        // Update UI
        stlDropZone.style.display = 'none';
        stlFileInfo.style.display = 'flex';
        stlFileInfo.querySelector('.file-name').textContent = file.name;
        stlFileInfo.querySelector('.file-size').textContent = formatFileSize(file.size);
    }

    function removeSTLFile() {
        selectedSTL = null;
        stlFileInput.value = '';
        stlDropZone.style.display = 'flex';
        stlFileInfo.style.display = 'none';
    }

    function handleImagesSelect(e) {
        const files = Array.from(e.target.files);

        // Validate number of images
        if (selectedImages.length + files.length > 5) {
            showNotification('Maximum 5 images allowed', 'error');
            return;
        }

        // Validate each file
        for (const file of files) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                showNotification(`${file.name} is not an image`, 'error');
                continue;
            }

            // Check file size (5MB max)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                showNotification(`${file.name} is too large (max 5MB)`, 'error');
                continue;
            }

            selectedImages.push(file);
            addImagePreview(file);
        }

        // Reset input
        imagesInput.value = '';
    }

    function addImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-image-btn" data-index="${selectedImages.length - 1}">×</button>
                ${selectedImages.length === 1 ? '<span class="thumbnail-badge">Thumbnail</span>' : ''}
            `;

            preview.querySelector('.remove-image-btn').addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                removeImage(index, preview);
            });

            imagesPreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }

    function removeImage(index, previewElement) {
        selectedImages.splice(index, 1);
        previewElement.remove();

        // Update indices
        document.querySelectorAll('.remove-image-btn').forEach((btn, i) => {
            btn.dataset.index = i;
        });

        // Update thumbnail badge
        document.querySelectorAll('.thumbnail-badge').forEach(badge => badge.remove());
        const firstPreview = imagesPreview.querySelector('.image-preview-item');
        if (firstPreview && selectedImages.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'thumbnail-badge';
            badge.textContent = 'Thumbnail';
            firstPreview.appendChild(badge);
        }
    }

    function updateDescCount() {
        const count = descriptionTextarea.value.length;
        descCount.textContent = count;

        if (count > 2000) {
            descCount.style.color = 'red';
            descriptionTextarea.value = descriptionTextarea.value.substring(0, 2000);
        } else {
            descCount.style.color = '';
        }
    }

    async function handleSubmit(e, isDraft = false) {
        if (e) e.preventDefault();

        // Validate form
        if (!selectedSTL) {
            showNotification('Please select an STL file', 'error');
            return;
        }

        if (selectedImages.length === 0) {
            showNotification('Please add at least one image', 'error');
            return;
        }

        const formData = new FormData(uploadForm);

        // Add STL file
        formData.append('stlFile', selectedSTL);

        // Add images
        selectedImages.forEach((image, index) => {
            formData.append('images', image);
        });

        // Set status
        formData.append('status', isDraft ? 'draft' : 'pending');

        // Show upload modal
        showUploadModal();

        try {
            const xhr = new XMLHttpRequest();

            // Track upload progress
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    updateProgress(percentComplete, 'Uploading files...');
                }
            });

            xhr.addEventListener('load', () => {
                hideUploadModal();

                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showNotification(
                        isDraft ? 'Design saved as draft' : 'Design submitted for review!',
                        'success'
                    );

                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = '/seller-dashboard.html';
                    }, 2000);
                } else {
                    const error = JSON.parse(xhr.responseText);
                    showNotification(error.error || 'Upload failed', 'error');
                }
            });

            xhr.addEventListener('error', () => {
                hideUploadModal();
                showNotification('Upload failed. Please try again.', 'error');
            });

            xhr.open('POST', '/api/public-store/upload');
            xhr.send(formData);

        } catch (error) {
            hideUploadModal();
            console.error('Upload error:', error);
            showNotification('Upload failed. Please try again.', 'error');
        }
    }

    function showUploadModal() {
        uploadModal.style.display = 'flex';
        updateProgress(0, 'Preparing upload...');
    }

    function hideUploadModal() {
        uploadModal.style.display = 'none';
    }

    function updateProgress(percent, text) {
        progressFill.style.width = percent + '%';
        progressText.textContent = text;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#FF6B35' : '#06D6A0'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
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

// Add CSS for image previews
const style = document.createElement('style');
style.textContent = `
    .images-preview {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .image-preview-item {
        position: relative;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid var(--border-color);
    }

    .image-preview-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .remove-image-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 107, 53, 0.9);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }

    .remove-image-btn:hover {
        background: #FF6B35;
        transform: scale(1.1);
    }

    .thumbnail-badge {
        position: absolute;
        bottom: 8px;
        left: 8px;
        background: rgba(0, 78, 137, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
    }

    .modal-content h3 {
        margin: 0 0 1rem 0;
        color: var(--text-dark);
    }

    .progress-bar {
        width: 100%;
        height: 30px;
        background: var(--bg-light);
        border-radius: 15px;
        overflow: hidden;
        margin: 1rem 0;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
