<?php
// Conexión a la base de datos
$host = 'localhost';  // Dirección del servidor MySQL
$dbname = 'contactos'; // Nombre de la base de datos
$username = 'root';    // Usuario de MySQL
$password = '';        // Contraseña de MySQL

// Crear la conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se envió el formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los valores del formulario
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];

    // Preparar la consulta SQL para insertar los datos en la tabla
    $sql = "INSERT INTO formulario_contacto (nombre, correo, asunto, mensaje)
            VALUES ('$nombre', '$correo', '$asunto', '$mensaje')";

    if ($conn->query($sql) === TRUE) {
        echo "Mensaje enviado con éxito"; // Esta es la respuesta que se maneja en el JS
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
