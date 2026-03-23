<script>
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-phone');
    const arrowIcon = document.querySelector('.bx-right-arrow-circle');
    const passwordField = document.getElementById('passwordField');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('sign-in');
    
    let loginAttempts = 0;
    const maxAttempts = 2;
    
    // Mostrar password
    const showPassword = () => {
        if (emailInput.value.trim()) {
            passwordField.classList.add('show');
            submitBtn.classList.add('show');
            setTimeout(() => {
                passwordInput.focus();
                passwordInput.select();
            }, 250);
        } else {
            emailInput.focus();
            showError('Enter your email or phone number');
        }
    };
    
    // Eventos
    arrowIcon.addEventListener('click', showPassword);
    
    emailInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && emailInput.value.trim()) {
            e.preventDefault();
            showPassword();
        }
    });
    
    // Ocultar si borra email
    emailInput.addEventListener('input', () => {
        if (!emailInput.value.trim()) {
            passwordField.classList.remove('show');
            submitBtn.classList.remove('show');
            passwordInput.value = '';
            errorMsg.classList.remove('show');
        }
    });
    
    // Submit
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email) {
            showError('Please enter your email or phone number');
            emailInput.focus();
            return;
        }
        
        if (!password) {
            showError('Please enter your password');
            passwordInput.focus();
            return;
        }
        
        loginAttempts++;
        
        if (loginAttempts < maxAttempts) {
            showError('Incorrect password. Try again.');
            passwordInput.value = '';
            passwordInput.focus();
        } else {
            // Éxito
            errorMsg.textContent = 'Signing in...';
            errorMsg.style.background = '#007AFF';
            errorMsg.classList.add('show');
            submitBtn.disabled = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        }
    });
    
    passwordInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.background = '#ff3b30';
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
});
</script>
