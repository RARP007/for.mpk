// Form handling dengan penyimpanan data
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aspiration-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            id: generateId(),
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            urgency: document.querySelector('input[name="urgency"]:checked')?.value || 'medium',
            timestamp: new Date().toISOString(),
            status: 'pending' // default status
        };
        
        // Simple validation
        if (!formData.title || !formData.category || !formData.description) {
            alert('Harap isi semua field yang wajib diisi!');
            return;
        }
        
        // Save to localStorage
        saveAspirationToStorage(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengajukan...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Aspirasi berhasil diajukan! Terima kasih.');
            window.location.href = 'aspirations.html';
        }, 1500);
    });
});

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveAspirationToStorage(aspirationData) {
    const existingAspirations = JSON.parse(localStorage.getItem('mpk_aspirations')) || [];
    existingAspirations.push(aspirationData);
    localStorage.setItem('mpk_aspirations', JSON.stringify(existingAspirations));
}
