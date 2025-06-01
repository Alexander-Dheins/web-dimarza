

(function ($) {
    "use strict";



  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    // Eliminamos la función duplicada de cambio de archivo
    // $('#file_1').on('change',function(){
    //     $('#inputval').text( $(this).val());
    // });

})(jQuery);

//Permite el ingreso de solo letras en un campo
function sololetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";
    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }
    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false;
    }
}
//Permite el ingreso de solo numeros en un campo
function solonumeros(e) {
    key= e.keyCode || e.which;
    teclado= String.fromCharCode(key);
    numeros= "0123456789"; 
    especiales="8-37-38-46"; 
    teclado_especial=false;
    for (var i in especiales) {
        if(key==especiales[i]){
            teclado_especial=true;
        }
    }
    if (numeros.indexOf(teclado)==-1 &&  !teclado_especial) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    $('[data-toggle="tooltip"]').tooltip();
    
    const formButtons = document.querySelectorAll('.form-type-btn');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.querySelector('input[name="apellido"]');
    const dniInput = document.getElementById('dni');
    const domicilioInput = document.getElementById('domicilio');
    const firmaContainer = document.querySelector('.signature-pad-container').parentElement;
    const firmaLabel = document.querySelector('label[for="signature"]');
    const canvas = document.getElementById('signaturePad');
    const signaturePad = new SignaturePad(canvas);
    
    // Función para validar el formulario
    $('.validate-form').on('submit', function(e) {
        if (document.querySelector('.form-type-btn[data-form="anonymous"]').classList.contains('active')) {
            // Si está en modo anónimo, no validar la firma
            return true;
        }
        // Continuar con la validación normal para el modo no anónimo
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    });
    
    formButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            formButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            if(this.dataset.form === 'anonymous') {
                // Modo anónimo
                nombreInput.value = 'Anónimo';
                apellidoInput.value = 'Anónimo';
                dniInput.value = '00000000';
                domicilioInput.value = 'No especificado';
                
                nombreInput.readOnly = true;
                apellidoInput.readOnly = true;
                dniInput.readOnly = true;
                domicilioInput.readOnly = true;

                // Ocultar y deshabilitar el campo de firma
                firmaContainer.style.display = 'none';
                firmaLabel.style.display = 'none';
                canvas.style.pointerEvents = 'none';
                
                // Remover completamente la validación de firma
                firmaContainer.classList.remove('validate-input');
                if(canvas.hasAttribute('required')) {
                    canvas.removeAttribute('required');
                }
            } else {
                // Modo normal
                nombreInput.value = '';
                apellidoInput.value = '';
                dniInput.value = '';
                domicilioInput.value = '';
                
                nombreInput.readOnly = false;
                apellidoInput.readOnly = false;
                dniInput.readOnly = false;
                domicilioInput.readOnly = false;

                // Mostrar y habilitar el campo de firma
                firmaContainer.style.display = 'block';
                firmaLabel.style.display = 'block';
                canvas.style.pointerEvents = 'auto';
                signaturePad.on();
                
                // Restaurar la validación de firma
                firmaContainer.classList.add('validate-input');
                canvas.setAttribute('required', 'required');
            }
        });
    });
});

enviando = false; //Obligaremos a entrar el if en el primer submit
    
function checkSubmit() {
    if (!enviando) {
        enviando= true;
        return true;
    } 
    else {
        //Si llega hasta aca significa que pulsaron 2 veces el boton submit
        alert("El formulario ya se esta enviando");
        return false;
    }
}


// Manejo de archivos mejorado
$(document).ready(function() {
    const fileInput = $('#file_1');
    const fileNameDisplay = $('#inputval');
    const dragArea = $('.drag-area');
    const header = dragArea.find('.header');
    const defaultText = 'Arrastra archivos a cualquier lugar para subirlos';
    
    // Crear el contenedor de información del archivo con botón para eliminar
    const fileInfo = $('<div class="file-info">' +
        '<div class="file-name-display"></div>' +
        '<button type="button" class="remove-file" title="Eliminar archivo">' +
        '<i class="fa fa-times"></i>' +
        '</button>' +
        '</div>');
    
    // Agregar el contenedor después del área de arrastre
    dragArea.after(fileInfo);

    // Manejar cambio de archivo
    fileInput.on('change', function(e) {
        const file = this.files[0];
        if (file) {
            // Mostrar nombre del archivo en ambos lugares
            const fileName = file.name;
            fileInfo.find('.file-name-display').text(fileName);
            fileInfo.addClass('visible');
            header.text('Archivo seleccionado:');
            
            // Actualizar también el texto original
            fileNameDisplay.text(fileName);
        } else {
            resetFileInput();
        }
    });

    // Manejar clic en botón de eliminar
    fileInfo.find('.remove-file').on('click', function() {
        resetFileInput();
    });

    // Función para resetear el input de archivo
    function resetFileInput() {
        fileInput.val('');
        fileInfo.removeClass('visible');
        fileInfo.find('.file-name-display').text('');
        header.text(defaultText);
        fileNameDisplay.text('Ningún archivo seleccionado');
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('file_1');
    const fileNameDisplay = document.getElementById('inputval');
    const removeFileButton = document.getElementById('removeFileButton');

    // Evitar el comportamiento por defecto de arrastrar y soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Añadir y quitar clases para efectos visuales
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('active'), false);
    });

    // Manejar el evento de soltar
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

        if (files.length > 0) {
            const file = files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                fileInput.files = files; // Asignar los archivos al input
                fileNameDisplay.textContent = file.name;
                removeFileButton.style.display = 'inline'; // Mostrar el botón de eliminar
            } else {
                alert('Tipo de archivo no permitido. Por favor, seleccione un archivo .pdf, .doc, .docx, .jpg, .jpeg, .png');
            }
        }
    }

    // Manejar el cambio de archivo desde el input
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            removeFileButton.style.display = 'inline'; // Mostrar el botón de eliminar
        } else {
            fileNameDisplay.textContent = 'Ningún archivo seleccionado';
            removeFileButton.style.display = 'none'; // Ocultar el botón de eliminar
        }
    });

    // Manejar el clic en el botón de eliminar
    removeFileButton.addEventListener('click', function() {
        fileInput.value = ''; // Limpiar el input de archivo
        fileNameDisplay.textContent = 'Ningún archivo seleccionado';
        removeFileButton.style.display = 'none'; // Ocultar el botón de eliminar
    });
});