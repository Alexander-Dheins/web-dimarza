<?php
// Configuración de carga de archivos
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB máximo
define('ALLOWED_TYPES', [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
define('MAX_FILE_AGE', 30 * 24 * 60 * 60); // 30 días en segundos
define('UPLOAD_PATH', dirname(__DIR__) . '/archivos_privados');

// Crear directorio si no existe
if (!file_exists(UPLOAD_PATH)) {
    mkdir(UPLOAD_PATH, 0755, true);
}