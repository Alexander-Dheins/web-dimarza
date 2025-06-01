<?php
// filepath: c:\xampp\htdocs\TRABAJO_FINAL\conexion.php

$host = "localhost";
$user = "root";
$password = "";
$database = "dblibrore";

$connection = mysqli_connect($host, $user, $password, $database);

if (!$connection) {
    die("Error en la conexión: " . mysqli_connect_error());
}
?>