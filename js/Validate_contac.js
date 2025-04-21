  // Se ejecuta cuando el formulario es enviado
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Ocultar cualquier alerta antes de nuevo envío
    document.getElementById("successAlert").style.display = "none";
    document.getElementById("errorAlert").style.display = "none";

    // Crear un objeto FormData para recolectar todos los datos del formulario
    var formData = new FormData(this);

    // Usar AJAX para enviar los datos al archivo PHP que procesará el formulario
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "procesar_formulario.php", true); // URL donde se procesará el formulario (archivo PHP)

    // Cuando la solicitud se complete, manejar la respuesta
    xhr.onload = function() {
      if (xhr.status === 200) { // Si la respuesta es exitosa (código 200)
        if (xhr.responseText.includes('Mensaje enviado con éxito')) {
          document.getElementById("successAlert").style.display = "block"; // Mostrar alerta de éxito
        } else {
          document.getElementById("errorAlert").style.display = "block"; // Mostrar alerta de error
        }
      } else {
        // Si hubo algún error en la solicitud AJAX
        document.getElementById("errorAlert").style.display = "block"; // Mostrar alerta de error
      }
    };

    // Enviar la solicitud con los datos del formulario
    xhr.send(formData);
  });