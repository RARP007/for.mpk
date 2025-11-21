// Simple form handling for now
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aspiration-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value
        };
        
        // Simple validation
        if (!formData.title || !formData.category || !formData.description) {
            alert('Harap isi semua field yang wajib diisi!');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengajukan...';
        submitBtn.disabled = true;
        
        // Simulate API call (nanti bisa diganti dengan real backend)
        setTimeout(() => {
            console.log('Data yang diajukan:', formData);
            alert('Aspirasi berhasil diajukan! Terima kasih.');
            window.location.href = 'index.html';
        }, 1500);
    });
});
