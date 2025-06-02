/* =============================================
   FORMULARIO DE CONTACTO DIMARZA - JAVASCRIPT
   Archivo: dmz-contact.js
   Incluir este script al final del body en Contacto.html
============================================= */

// Variables globales
let ipObtained = false;

// Obtener IP del usuario
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('userIP').textContent = data.ip;
        ipObtained = true;
    } catch (error) {
        console.warn('Error obteniendo IP:', error);
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
    if (!phone) return true; // Campo opcional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateName(name) {
    // Verificar que no contenga números o caracteres especiales excesivos
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
        
        setTimeout(() => {
            statusElement.classList.remove('dmz-show');
        }, 5000);
    }
}

// Validación completa del formulario
function validateForm() {
    let isValid = true;
    
    // Limpiar validaciones previas
    ['name', 'email', 'phone', 'subject', 'message'].forEach(clearValidation);
    const policyError = document.getElementById('policyError');
    if (policyError) policyError.classList.remove('dmz-show');

    // Obtener valores
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const policyAccept = document.getElementById('policyAccept').checked;

    // Validar nombre
    if (!name) {
        showError('name', 'El nombre es requerido');
        isValid = false;
    } else if (!validateName(name)) {
        showError('name', 'Ingrese un nombre válido (solo letras y espacios)');
        isValid = false;
    } else if (name.length < 2 || name.length > 50) {
        showError('name', 'El nombre debe tener entre 2 y 50 caracteres');
        isValid = false;
    } else {
        showSuccess('name');
    }

    // Validar email
    if (!email) {
        showError('email', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Ingrese un correo electrónico válido');
        isValid = false;
    } else {
        showSuccess('email');
    }

    // Validar teléfono (opcional)
    if (phone && !validatePhone(phone)) {
        showError('phone', 'Ingrese un número de teléfono válido');
        isValid = false;
    } else if (phone) {
        showSuccess('phone');
    }

    // Validar asunto
    if (!subject) {
        showError('subject', 'El asunto es requerido');
        isValid = false;
    } else if (subject.length < 5 || subject.length > 100) {
        showError('subject', 'El asunto debe tener entre 5 y 100 caracteres');
        isValid = false;
    } else if (isSpamContent(subject)) {
        showError('subject', 'El asunto contiene contenido no permitido');
        isValid = false;
    } else {
        showSuccess('subject');
    }

    // Validar mensaje
    if (!message) {
        showError('message', 'El mensaje es requerido');
        isValid = false;
    } else if (message.length < 10 || message.length > 2000) {
        showError('message', 'El mensaje debe tener entre 10 y 2000 caracteres');
        isValid = false;
    } else if (isSpamContent(message)) {
        showError('message', 'El mensaje contiene contenido no permitido');
        isValid = false;
    } else {
        showSuccess('message');
    }

    // Validar políticas
    if (!policyAccept) {
        if (policyError) {
            policyError.textContent = 'Debe aceptar las políticas de privacidad';
            policyError.classList.add('dmz-show');
        }
        isValid = false;
    }

    return isValid;
}

// Manejo del envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        showStatusMessage('Por favor, corrija los errores antes de enviar', 'error');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;

    // Mostrar loading
    submitBtn.classList.add('dmz-loading');
    submitBtn.disabled = true;

    try {
        // Preparar datos del formulario
        const formData = new FormData(document.getElementById('contactForm'));
        const userIP = document.getElementById('userIP').textContent;
        formData.append('userIP', userIP);        // Enviar formulario
        const response = await fetch('http://localhost:3000/enviar-formulario', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showStatusMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            document.getElementById('contactForm').reset();
            ['name', 'email', 'phone', 'subject', 'message'].forEach(clearValidation);
            
            // Limpiar checkbox de políticas
            const policyError = document.getElementById('policyError');
            if (policyError) policyError.classList.remove('dmz-show');
            
        } else {
            showStatusMessage(result.message || 'Error al enviar el mensaje', 'error');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        showStatusMessage('Error de conexión. Verifique su internet e inténtelo nuevamente.', 'error');
    } finally {
        // Quitar loading
        submitBtn.classList.remove('dmz-loading');
        submitBtn.disabled = false;
    }
}

// Validación en tiempo real
function setupRealTimeValidation() {
    // Email validation
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

    // Phone validation
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

    // Name validation
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

    // Subject validation
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

    // Message validation
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
}

// Modal de políticas
function openPolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
}

function closePolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
}

// Cerrar modal al hacer click fuera
function setupModalEvents() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closePolicyModal();
            }
        });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePolicyModal();
        }
    });
}

// Limitar caracteres en tiempo real
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

// Prevenir envío múltiple
function preventMultipleSubmits() {
    const form = document.getElementById('contactForm');
    let isSubmitting = false;
    
    if (form) {
        form.addEventListener('submit', function(event) {
            if (isSubmitting) {
                event.preventDefault();
                return;
            }
            
            isSubmitting = true;
            handleFormSubmit(event);
            
            // Reset flag después de 5 segundos
            setTimeout(() => {
                isSubmitting = false;
            }, 5000);
        });
    }
}

// Inicialización
function initContactForm() {
    // Obtener IP del usuario
    getUserIP();
    
    // Configurar validación en tiempo real
    setupRealTimeValidation();
    
    // Configurar eventos del modal
    setupModalEvents();
    
    // Configurar límites de caracteres
    setupCharacterLimits();
    
    // Prevenir envíos múltiples
    preventMultipleSubmits();
    
    console.log('Formulario de contacto Dimarza inicializado correctamente');
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

