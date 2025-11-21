// Simple admin login system
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // Hardcoded admin credentials (in real app, this would be from backend)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'mpk2024'
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Save login state to localStorage
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            
            alert('Login berhasil! Redirecting ke dashboard...');
            window.location.href = 'admin.html';
        } else {
            alert('Username atau password salah!');
        }
    });

    // Redirect if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = 'admin.html';
    }
});
