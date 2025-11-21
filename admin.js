// Admin dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        alert('Anda harus login sebagai admin!');
        window.location.href = 'login.html';
        return;
    }

    // Set admin name
    const adminName = localStorage.getItem('adminUsername') || 'Admin';
    document.getElementById('admin-name').textContent = adminName;

    // Load aspirations data
    loadAspirations();

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        alert('Logout berhasil!');
        window.location.href = 'index.html';
    });

    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', loadAspirations);

    function loadAspirations() {
        const aspirations = getAspirationsFromStorage();
        displayAspirations(aspirations);
        updateStatistics(aspirations);
    }

    function getAspirationsFromStorage() {
        return JSON.parse(localStorage.getItem('mpk_aspirations')) || [];
    }

    function displayAspirations(aspirations) {
        const container = document.getElementById('admin-aspiration-list');
        
        if (aspirations.length === 0) {
            container.innerHTML = '<div class="no-data">Belum ada aspirasi yang diajukan.</div>';
            return;
        }

        // Sort by newest first
        aspirations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        container.innerHTML = aspirations.map((aspiration, index) => `
            <div class="aspiration-card admin-card">
                <div class="card-header">
                    <span class="category ${aspiration.category}">${getCategoryLabel(aspiration.category)}</span>
                    <span class="status ${aspiration.status || 'pending'}">${getStatusLabel(aspiration.status)}</span>
                </div>
                <h3 class="card-title">${aspiration.title}</h3>
                <p class="card-desc">${aspiration.description}</p>
                
                <div class="admin-actions">
                    <select class="status-select" data-index="${index}">
                        <option value="pending" ${aspiration.status === 'pending' ? 'selected' : ''}>Menunggu</option>
                        <option value="reviewed" ${aspiration.status === 'reviewed' ? 'selected' : ''}>Ditinjau</option>
                        <option value="in_progress" ${aspiration.status === 'in_progress' ? 'selected' : ''}>Diproses</option>
                        <option value="completed" ${aspiration.status === 'completed' ? 'selected' : ''}>Selesai</option>
                        <option value="rejected" ${aspiration.status === 'rejected' ? 'selected' : ''}>Ditolak</option>
                    </select>
                    <button class="btn-small btn-danger" onclick="deleteAspiration(${index})">Hapus</button>
                </div>
                
                <div class="card-meta">
                    <span class="date">${formatDate(aspiration.timestamp)}</span>
                    <span class="urgency ${aspiration.urgency || 'medium'}">${getUrgencyLabel(aspiration.urgency)}</span>
                </div>
            </div>
        `).join('');

        // Add event listeners to status selects
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                updateAspirationStatus(this.dataset.index, this.value);
            });
        });
    }

    function updateAspirationStatus(index, newStatus) {
        const aspirations = getAspirationsFromStorage();
        aspirations[index].status = newStatus;
        aspirations[index].updatedAt = new Date().toISOString();
        
        localStorage.setItem('mpk_aspirations', JSON.stringify(aspirations));
        loadAspirations(); // Refresh display
        
        alert(`Status aspirasi berhasil diubah menjadi: ${getStatusLabel(newStatus)}`);
    }

    function updateStatistics(aspirations) {
        document.getElementById('total-aspirations').textContent = aspirations.length;
        document.getElementById('pending-aspirations').textContent = 
            aspirations.filter(a => !a.status || a.status === 'pending').length;
        document.getElementById('processed-aspirations').textContent = 
            aspirations.filter(a => a.status === 'completed').length;
    }

    // Utility functions
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

// Global function for delete button
function deleteAspiration(index) {
    if (confirm('Apakah Anda yakin ingin menghapus aspirasi ini?')) {
        const aspirations = JSON.parse(localStorage.getItem('mpk_aspirations')) || [];
        aspirations.splice(index, 1);
        localStorage.setItem('mpk_aspirations', JSON.stringify(aspirations));
        
        // Refresh display
        document.querySelector('#refresh-btn').click();
    }
}
