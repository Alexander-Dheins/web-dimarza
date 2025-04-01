<?php
// Configuración de cabeceras para evitar problemas de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del formulario
    $nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : '';
    $correo = isset($_POST['correo']) ? filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL) : '';
    $asunto = isset($_POST['asunto']) ? htmlspecialchars($_POST['asunto']) : '';
    $mensaje = isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : '';
    
    // Validación básica
    if (empty($nombre) || empty($correo) || empty($asunto) || empty($mensaje)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
        exit;
    }
    
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'El correo electrónico no es válido']);
        exit;
    }
    
    // Configuración del correo
    $destinatario = "tucorreo@ejemplo.com"; // ¡CAMBIA ESTO POR TU CORREO!
    $asuntoEmail = "Nuevo mensaje de contacto: $asunto";
    
    // Construir el cuerpo del correo
    $cuerpoEmail = "Has recibido un nuevo mensaje desde el formulario de contacto.\n\n";
    $cuerpoEmail .= "Nombre: $nombre\n";
    $cuerpoEmail .= "Correo: $correo\n";
    $cuerpoEmail .= "Asunto: $asunto\n\n";
    $cuerpoEmail .= "Mensaje:\n$mensaje\n";
    
    // Cabeceras del correo
    $cabeceras = "From: $correo\r\n";
    $cabeceras .= "Reply-To: $correo\r\n";
    
    // Enviar el correo
    $envioExitoso = mail($destinatario, $asuntoEmail, $cuerpoEmail, $cabeceras);
    
    // Devolver respuesta
    if ($envioExitoso) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje']);
    }
} else {
    // No es una petición POST
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>