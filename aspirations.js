// Public aspirations page
document.addEventListener('DOMContentLoaded', function() {
    loadAspirations();
    
    // Filter functionality
    document.getElementById('category-filter').addEventListener('change', loadAspirations);
    document.getElementById('status-filter').addEventListener('change', loadAspirations);

    function loadAspirations() {
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        
        const aspirations = getAspirationsFromStorage();
        const filteredAspirations = filterAspirations(aspirations, categoryFilter, statusFilter);
        
        displayAspirations(filteredAspirations);
    }

    function getAspirationsFromStorage() {
        return JSON.parse(localStorage.getItem('mpk_aspirations')) || [];
    }

    function filterAspirations(aspirations, category, status) {
        return aspirations.filter(aspiration => {
            const categoryMatch = !category || aspiration.category === category;
            const statusMatch = !status || aspiration.status === status;
            return categoryMatch && statusMatch;
        });
    }

    function displayAspirations(aspirations) {
        const container = document.getElementById('public-aspiration-list');
        
        if (aspirations.length === 0) {
            container.innerHTML = '<div class="no-data">Tidak ada aspirasi yang sesuai dengan filter.</div>';
            return;
        }

        // Sort by newest first
        aspirations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        container.innerHTML = aspirations.map(aspiration => `
            <div class="aspiration-card">
                <div class="card-header">
                    <span class="category ${aspiration.category}">${getCategoryLabel(aspiration.category)}</span>
                    <span class="status ${aspiration.status || 'pending'}">${getStatusLabel(aspiration.status)}</span>
                </div>
                <h3 class="card-title">${aspiration.title}</h3>
                <p class="card-desc">${aspiration.description}</p>
                <div class="card-meta">
                    <span class="date">${formatDate(aspiration.timestamp)}</span>
                    <span class="urgency ${aspiration.urgency || 'medium'}">Prioritas: ${getUrgencyLabel(aspiration.urgency)}</span>
                </div>
            </div>
        `).join('');
    }

    // Utility functions (same as admin.js)
    function getCategoryLabel(category) {
        const categories = {
            'academic': 'Akademik',
            'facility': 'Fasilitas',
            'extracurricular': 'Ekstrakurikuler',
            'event': 'Kegiatan',
            'health': 'Kesehatan',
            'other': 'Lainnya'
        };
        return categories[category] || 'Lainnya';
    }

    function getStatusLabel(status) {
        const statuses = {
            'pending': 'Menunggu',
            'reviewed': 'Ditinjau',
            'in_progress': 'Diproses',
            'completed': 'Selesai',
            'rejected': 'Ditolak'
        };
        return statuses[status] || 'Menunggu';
    }

    function getUrgencyLabel(urgency) {
        const urgencies = {
            'low': 'Rendah',
            'medium': 'Sedang',
            'high': 'Tinggi'
        };
        return urgencies[urgency] || 'Sedang';
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
});
