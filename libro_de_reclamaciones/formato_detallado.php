<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formato Detallado</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        header {
            background: #333;
            color: #fff;
            padding-top: 30px;
            min-height: 70px;
            border-bottom: #0779e4 3px solid;
        }
        header a {
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 16px;
        }
        .main-content {
            background: #fff;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Formato Detallado</h1>
        </div>
    </header>

    <div class="container main-content">
        <h2>Detalles del Formato</h2>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $nombre = htmlspecialchars($_POST['nombre']);
            $apellido = htmlspecialchars($_POST['apellido']);
            $dni = htmlspecialchars($_POST['dni']);
            $domicilio = htmlspecialchars($_POST['domicilio']);
            $telefono = htmlspecialchars($_POST['telefono']);
            $correo = htmlspecialchars($_POST['email']);
            $reclamo = htmlspecialchars($_POST['reclamo']);

            echo "<p><strong>Nombres y Apellidos:</strong> $nombre $apellido</p>";
            echo "<p><strong>DNI:</strong> $dni</p>";
            echo "<p><strong>Domicilio:</strong> $domicilio</p>";
            echo "<p><strong>Teléfono:</strong> $telefono</p>";
            echo "<p><strong>Correo Electrónico:</strong> $correo</p>";
            echo "<p><strong>Reclamo:</strong> $reclamo</p>";
        } else {
            echo "<p>No se han enviado datos del formulario.</p>";
        }
        ?>
    </div>

    <footer class="footer">
        <p>&copy; 2023 Formato Detallado. Todos los derechos reservados.</p>
    </footer>
</body>
</html>