// Simple JavaScript for interactive elements

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Simulate loading state
        const originalText = this.textContent;
        this.textContent = 'Memuat...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
        
        // In real implementation, remove this and handle actual form navigation
        e.preventDefault();
    });
});

// Simple aspiration card click handler
document.querySelectorAll('.aspiration-card').forEach(card => {
    card.addEventListener('click', function() {
        // In real implementation, navigate to aspiration detail page
        console.log('Navigating to aspiration detail:', this.querySelector('.card-title').textContent);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});
