document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    
    // Función para validar el correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar el formulario
    function validateForm() {
        let isValid = true;
        
        // Validar nombre
        const nombre = document.getElementById('nombre');
        const nombreError = document.getElementById('nombreError');
        if (nombre.value.trim() === '') {
            nombre.classList.add('form-invalid');
            nombreError.style.display = 'block';
            isValid = false;
        } else {
            nombre.classList.remove('form-invalid');
            nombreError.style.display = 'none';
        }
        
        // Validar correo
        const correo = document.getElementById('correo');
        const correoError = document.getElementById('correoError');
        if (correo.value.trim() === '' || !isValidEmail(correo.value)) {
            correo.classList.add('form-invalid');
            correoError.style.display = 'block';
            isValid = false;
        } else {
            correo.classList.remove('form-invalid');
            correoError.style.display = 'none';
        }
        
        // Validar asunto
        const asunto = document.getElementById('asunto');
        const asuntoError = document.getElementById('asuntoError');
        if (asunto.value.trim() === '') {
            asunto.classList.add('form-invalid');
            asuntoError.style.display = 'block';
            isValid = false;
        } else {
            asunto.classList.remove('form-invalid');
            asuntoError.style.display = 'none';
        }
        
        // Validar mensaje
        const mensaje = document.getElementById('mensaje');
        const mensajeError = document.getElementById('mensajeError');
        if (mensaje.value.trim() === '') {
            mensaje.classList.add('form-invalid');
            mensajeError.style.display = 'block';
            isValid = false;
        } else {
            mensaje.classList.remove('form-invalid');
            mensajeError.style.display = 'none';
        }
        
        return isValid;
    }
    
    // Reemplaza la simulación de envío con esta función real
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ocultar alertas anteriores
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';
        
        if (validateForm()) {
            const formData = new FormData(form);
            const submitBtn = document.getElementById('submitBtn');
            
            // Deshabilitar el botón durante el envío
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Envío real al backend PHP
            fetch('procesar-formulario.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    successAlert.style.display = 'block';
                    form.reset();
                } else {
                    errorAlert.textContent = data.message || 'Ocurrió un error al enviar el mensaje.';
                    errorAlert.style.display = 'block';
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVIAR';
            })
            .catch(error => {
                errorAlert.textContent = 'Error de conexión. Por favor, inténtalo de nuevo.';
                errorAlert.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVIAR';
            });
        }
    });
});