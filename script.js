document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-phone');
    const passwordStep = document.getElementById('step2');
    const step1 = document.getElementById('step1');
    const arrowIcon = document.querySelector('.input-container i');
    const form = document.getElementById('sign-in');
    const submitBtn = document.querySelector('.submit-btn');

    // Click en flecha → mostrar password
    arrowIcon.addEventListener('click', function(e) {
        e.preventDefault();
        if (emailInput.value.trim()) {
            showPasswordStep();
        } else {
            emailInput.focus();
            emailInput.placeholder = 'Please enter your email or phone';
            setTimeout(() => {
                emailInput.placeholder = 'Email or Phone Number';
            }, 2000);
        }
    });

    // Enter en email → mostrar password
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && emailInput.value.trim()) {
            showPasswordStep();
        }
    });

    // Función mostrar paso password
    function showPasswordStep() {
        step1.style.display = 'none';
        passwordStep.style.display = 'flex';
        passwordStep.classList.add('active');
        setTimeout(() => {
            document.getElementById('password').focus();
        }, 400);
    }

    // Submit form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('password-confirm').value;
        
        if (password && password === confirmPassword) {
            // Simular login exitoso
            alert('✅ Login successful! Welcome to iCloud.');
            // Aquí puedes redirigir: window.location.href = 'dashboard.html';
        } else {
            alert('❌ Passwords do not match. Please try again.');
            document.getElementById('password').focus();
        }
    });

    // Links funcionales
    document.querySelector('.forgot-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('🔒 Password reset link would open here');
    });

    document.querySelector('.create-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('➕ Apple ID creation page would open here');
    });
});
