<?php 
// Iniciar sesión y verificar si el usuario está logueado
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}

// Incluir el archivo de conexión
include "../conexion.php";

// Realizar la consulta para obtener los datos de los reclamos
$query = "SELECT * FROM reclamos";
$result = mysqli_query($connection, $query);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Reclamaciones - Dashboard</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">


    <link rel="stylesheet" type="text/css" href="../css/util.css">
</head>
<body>
<div class="container">
    <div class="dashboard-header">
        <!-- Código PHP para mostrar el nombre de usuario -->
        <p class="welcome-message"><?php echo "Bienvenido " . $_SESSION['username']; ?></p>

        <!-- Botón de Logout -->
        <a href="./logout.php" class="logout-btn">Salir</a>
    </div>

    <!-- Aquí puedes agregar el resto de tu contenido -->
</div>
<div class="container mt-5">
    <h2>Dashboard de Reclamaciones</h2>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>DNI</th>
                <th>Nombre Completo</th>
                <th>Domicilio</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Reclamo</th>
                <th>Solicitud</th>
                <th>Archivo</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Verificar si hay resultados
            if (mysqli_num_rows($result) > 0) {
                // Mostrar los datos de los reclamos
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>
                            <td>" . $row['dni'] . "</td>
                            <td>" . $row['nombres_completos'] . "</td>
                            <td>" . $row['domicilio'] . "</td>
                            <td>" . $row['telefono'] . "</td>
                            <td>" . $row['correo'] . "</td>
                            <td>" . $row['reclamo'] . "</td>
                            <td>" . $row['solicitud'] . "</td>
                            <td><a href='" . $row['archivo'] . "' target='_blank'>Ver archivo</a></td>
                          </tr>";
                }
            } else {
                echo "<tr><td colspan='8'>No hay reclamaciones registradas</td></tr>";
            }

            // Cerrar la conexión
            mysqli_close($connection);
            ?>
        </tbody>
    </table>
</div>

<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>

</body>
</html>