/* =============================================
   FORMULARIO DE CONTACTO DIMARZA - VERSIÓN CORREGIDA
   Archivo: dmz-contact.js
============================================= */

// Variables globales
let ipObtained = false;

// Configuración del servidor
const SERVER_CONFIG = {
    baseUrl: 'http://localhost:3000',
    endpoints: {
        form: '/enviar-formulario',
        health: '/health',
        ip: '/api/ip'
    }
};

// Función de logging mejorada
function log(message, data = null, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '🔍';
    
    console.log(`${prefix} [${timestamp}] ${message}`);
    if (data) {
        console.log('📊 Datos:', data);
    }
}

// Verificar conectividad con el servidor
async function checkServerConnection() {
    try {
        log('Verificando conexión con el servidor...', { url: SERVER_CONFIG.baseUrl });
        
        const response = await fetch(`${SERVER_CONFIG.baseUrl}${SERVER_CONFIG.endpoints.health}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            log('Respuesta no es JSON', { contentType, text: text.substring(0, 200) }, 'error');
            throw new Error('Respuesta del servidor no es JSON válido');
        }
        
        const data = await response.json();
        log('Servidor conectado correctamente', data, 'success');
        return true;
        
    } catch (error) {
        log('Error de conectividad con el servidor', {
            error: error.message,
            serverUrl: SERVER_CONFIG.baseUrl,
            suggestion: 'Verifica que mail_server.js esté corriendo en puerto 3000'
        }, 'error');
        
        showStatusMessage(`No se puede conectar con el servidor. Verifica que esté ejecutándose en ${SERVER_CONFIG.baseUrl}`, 'error');
        return false;
    }
}

// Obtener IP del usuario
async function getUserIP() {
    try {
        log('Obteniendo IP del usuario...');
        
        try {
            const response = await fetch(`${SERVER_CONFIG.baseUrl}${SERVER_CONFIG.endpoints.ip}`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('userIP').textContent = data.ip;
                ipObtained = true;
                log('IP obtenida desde servidor local', { ip: data.ip }, 'success');
                return;
            }
        } catch (error) {
            log('Error obteniendo IP desde servidor local, intentando servicio externo...', error);
        }
        
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('userIP').textContent = data.ip;
        ipObtained = true;
        log('IP obtenida desde servicio externo', { ip: data.ip }, 'success');
    } catch (error) {
        log('Error obteniendo IP', error, 'error');
        document.getElementById('userIP').textContent = 'No disponible';
        ipObtained = false;
    }
}

// Validaciones
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    if (!phone) return true;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateName(name) {
    const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

function isSpamContent(text) {
    const spamKeywords = [
        'viagra', 'casino', 'lottery', 'winner', 'urgent', 'million',
        'bitcoin', 'cryptocurrency', 'investment', 'loan', 'credit card',
        'make money', 'click here', 'free money', 'guaranteed'
    ];
    
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
}

// Funciones de UI
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.add('dmz-error');
        field.classList.remove('dmz-success');
        errorElement.textContent = message;
        errorElement.classList.add('dmz-show');
    }
}

function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.remove('dmz-error');
        field.classList.add('dmz-success');
        errorElement.classList.remove('dmz-show');
    }
}

function clearValidation(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.remove('dmz-error', 'dmz-success');
        errorElement.classList.remove('dmz-show');
    }
}

function showStatusMessage(message, type) {
    const statusElement = document.getElementById('statusMessage');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `dmz-status-message dmz-${type} dmz-show`;
        
        log(`Status mostrado al usuario: ${message}`, { type });
        
        setTimeout(() => {
            statusElement.classList.remove('dmz-show');
        }, 5000);
    }
}

// Validación completa del formulario
function validateForm() {
    log('Iniciando validación del formulario...');
    let isValid = true;
    
    ['name', 'email', 'phone', 'subject', 'message'].forEach(clearValidation);
    const policyError = document.getElementById('policyError');
    if (policyError) policyError.classList.remove('dmz-show');

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        policyAccept: document.getElementById('policyAccept').checked
    };
    
    log('Datos del formulario obtenidos', formData);

    if (!formData.name) {
        showError('name', 'El nombre es requerido');
        isValid = false;
    } else if (!validateName(formData.name)) {
        showError('name', 'Ingrese un nombre válido (solo letras y espacios)');
        isValid = false;
    } else if (formData.name.length < 2 || formData.name.length > 50) {
        showError('name', 'El nombre debe tener entre 2 y 50 caracteres');
        isValid = false;
    } else {
        showSuccess('name');
    }

    if (!formData.email) {
        showError('email', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!validateEmail(formData.email)) {
        showError('email', 'Ingrese un correo electrónico válido');
        isValid = false;
    } else {
        showSuccess('email');
    }

    if (formData.phone && !validatePhone(formData.phone)) {
        showError('phone', 'Ingrese un número de teléfono válido');
        isValid = false;
    } else if (formData.phone) {
        showSuccess('phone');
    }

    if (!formData.subject) {
        showError('subject', 'El asunto es requerido');
        isValid = false;
    } else if (formData.subject.length < 5 || formData.subject.length > 100) {
        showError('subject', 'El asunto debe tener entre 5 y 100 caracteres');
        isValid = false;
    } else if (isSpamContent(formData.subject)) {
        showError('subject', 'El asunto contiene contenido no permitido');
        isValid = false;
    } else {
        showSuccess('subject');
    }

    if (!formData.message) {
        showError('message', 'El mensaje es requerido');
        isValid = false;
    } else if (formData.message.length < 10 || formData.message.length > 2000) {
        showError('message', 'El mensaje debe tener entre 10 y 2000 caracteres');
        isValid = false;
    } else if (isSpamContent(formData.message)) {
        showError('message', 'El mensaje contiene contenido no permitido');
        isValid = false;
    } else {
        showSuccess('message');
    }

    if (!formData.policyAccept) {
        if (policyError) {
            policyError.textContent = 'Debe aceptar las políticas de privacidad';
            policyError.classList.add('dmz-show');
        }
        isValid = false;
    }

    log(`Validación completada. Resultado: ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    return isValid;
}

// Manejo del envío del formulario - VERSIÓN CORREGIDA
async function handleFormSubmit(event) {
    event.preventDefault();
    log('🚀 Iniciando envío del formulario...');
    
    const serverConnected = await checkServerConnection();
    if (!serverConnected) {
        log('Cancelando envío: servidor no disponible', null, 'error');
        return;
    }
    
    if (!validateForm()) {
        log('Cancelando envío: validación falló', null, 'error');
        showStatusMessage('Por favor, corrija los errores antes de enviar', 'error');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
        log('Error: botón de envío no encontrado', null, 'error');
        return;
    }

    submitBtn.classList.add('dmz-loading');
    submitBtn.disabled = true;
    log('UI actualizada: mostrando loading...');

    try {
        const nombre = document.getElementById('name').value.trim();
        const correo = document.getElementById('email').value.trim();
        const telefono = document.getElementById('phone').value.trim();
        const asunto = document.getElementById('subject').value.trim();
        const mensaje = document.getElementById('message').value.trim();
        const userIP = document.getElementById('userIP').textContent;
        const policyCheckbox = document.getElementById('policyAccept');
        
        log('🔍 Estado del checkbox:', {
            checked: policyCheckbox.checked,
            value: policyCheckbox.value,
            name: policyCheckbox.name
        });
        
        if (!policyCheckbox.checked) {
            log('❌ Checkbox NO marcado');
            showStatusMessage('Debe aceptar las políticas de privacidad', 'error');
            submitBtn.classList.remove('dmz-loading');
            submitBtn.disabled = false;
            return;
        }
        
        const requestData = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            asunto: asunto,
            mensaje: mensaje,
            userIP: userIP,
            policyAccept: 'on'
        };
        
        log('✅ Checkbox marcado, enviando datos como JSON');
        log('Preparando envío...', {
            url: `${SERVER_CONFIG.baseUrl}${SERVER_CONFIG.endpoints.form}`,
            userIP: userIP,
            dataKeys: Object.keys(requestData)
        });

        console.log('📤 Datos finales a enviar:');
        console.log(requestData);

        const response = await fetch(`${SERVER_CONFIG.baseUrl}${SERVER_CONFIG.endpoints.form}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        log('Respuesta recibida', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            contentType: response.headers.get('content-type')
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            log('Respuesta no es JSON', { contentType, text: text.substring(0, 200) }, 'error');
            throw new Error('El servidor no devolvió JSON válido');
        }

        const result = await response.json();
        log('Datos de respuesta parseados', result);

        if (response.ok && result.success) {
            log('✅ Formulario enviado exitosamente!', result, 'success');
            showStatusMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            document.getElementById('contactForm').reset();
            ['name', 'email', 'phone', 'subject', 'message'].forEach(clearValidation);
            
            const policyError = document.getElementById('policyError');
            if (policyError) policyError.classList.remove('dmz-show');
            
        } else {
            log('❌ Error en la respuesta del servidor', result, 'error');
            showStatusMessage(result.message || 'Error al enviar el mensaje', 'error');
        }
    } catch (error) {
        log('❌ Error de conexión fatal', {
            error: error.message,
            name: error.name,
            stack: error.stack
        }, 'error');
        
        if (error.message.includes('JSON')) {
            showStatusMessage('Error de comunicación con el servidor. Verifica que el servidor de correo esté corriendo correctamente.', 'error');
        } else {
            showStatusMessage('Error de conexión. Verifique su internet e inténtelo nuevamente.', 'error');
        }
    } finally {
        submitBtn.classList.remove('dmz-loading');
        submitBtn.disabled = false;
        log('UI restaurada: loading removido');
    }
}

// Configuración de validación en tiempo real
function setupRealTimeValidation() {
    log('Configurando validación en tiempo real...');
    
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                showError('email', 'Ingrese un correo electrónico válido');
            } else if (email) {
                showSuccess('email');
            }
        });
    }

    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            const phone = this.value.trim();
            if (phone && !validatePhone(phone)) {
                showError('phone', 'Ingrese un número de teléfono válido');
            } else if (phone) {
                showSuccess('phone');
            }
        });
    }

    const nameField = document.getElementById('name');
    if (nameField) {
        nameField.addEventListener('blur', function() {
            const name = this.value.trim();
            if (name && !validateName(name)) {
                showError('name', 'Ingrese un nombre válido (solo letras y espacios)');
            } else if (name && name.length >= 2) {
                showSuccess('name');
            }
        });
    }

    const subjectField = document.getElementById('subject');
    if (subjectField) {
        subjectField.addEventListener('blur', function() {
            const subject = this.value.trim();
            if (subject && (subject.length < 5 || isSpamContent(subject))) {
                showError('subject', 'Asunto muy corto o contiene contenido no permitido');
            } else if (subject && subject.length >= 5) {
                showSuccess('subject');
            }
        });
    }

    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('blur', function() {
            const message = this.value.trim();
            if (message && (message.length < 10 || isSpamContent(message))) {
                showError('message', 'Mensaje muy corto o contiene contenido no permitido');
            } else if (message && message.length >= 10) {
                showSuccess('message');
            }
        });
    }
    
    log('Validación en tiempo real configurada', null, 'success');
}

// Modal de políticas
function openPolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupModalEvents() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closePolicyModal();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePolicyModal();
        }
    });
}

function setupCharacterLimits() {
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (subjectField) {
        subjectField.addEventListener('input', function() {
            if (this.value.length > 100) {
                this.value = this.value.substring(0, 100);
                showError('subject', 'Máximo 100 caracteres permitidos');
            }
        });
    }
    
    if (messageField) {
        messageField.addEventListener('input', function() {
            if (this.value.length > 2000) {
                this.value = this.value.substring(0, 2000);
                showError('message', 'Máximo 2000 caracteres permitidos');
            }
        });
    }
}

function preventMultipleSubmits() {
    const form = document.getElementById('contactForm');
    let isSubmitting = false;
    
    if (form) {
        form.addEventListener('submit', function(event) {
            if (isSubmitting) {
                event.preventDefault();
                log('Envío bloqueado: ya hay uno en proceso');
                return;
            }
            
            isSubmitting = true;
            handleFormSubmit(event);
            
            setTimeout(() => {
                isSubmitting = false;
            }, 5000);
        });
    }
}

// Inicialización
async function initContactForm() {
    log('🚀 Inicializando formulario de contacto Dimarza (puerto 3000)...');
    
    await checkServerConnection();
    await getUserIP();
    setupRealTimeValidation();
    setupModalEvents();
    setupCharacterLimits();
    preventMultipleSubmits();
    
    log('✅ Formulario de contacto Dimarza inicializado correctamente', null, 'success');
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}

// Hacer funciones globales para uso en onclick
window.openPolicyModal = openPolicyModal;
window.closePolicyModal = closePolicyModal;
window.checkServerConnection = checkServerConnection;