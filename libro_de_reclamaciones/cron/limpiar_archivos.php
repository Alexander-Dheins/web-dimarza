<?php
require_once dirname(__DIR__) . '/config/upload_config.php';
require_once dirname(__DIR__) . '/conexion.php';

// Obtener archivos antiguos
$tiempo_limite = time() - MAX_FILE_AGE;

// Limpiar archivos físicos
$archivos = glob(UPLOAD_PATH . '/*');
foreach ($archivos as $archivo) {
    if (filemtime($archivo) < $tiempo_limite) {
        // Verificar si el archivo existe en la base de datos
        $nombre_archivo = basename($archivo);
        $query = mysqli_query($connection, "SELECT id FROM reclamos WHERE archivo = '$nombre_archivo'");
        
        if (mysqli_num_rows($query) == 0) {
            unlink($archivo);
        }
    }
}

// Limpiar registros sin archivo
mysqli_query($connection, "UPDATE reclamos SET archivo = 'Sin archivo' WHERE archivo != 'Sin archivo' AND archivo NOT IN (SELECT archivo FROM (SELECT archivo FROM reclamos WHERE archivo != 'Sin archivo') AS temp)");