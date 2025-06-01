<?php
	include "conexion.php";
	include "./login/data.php";
	$nombre = $_POST['nombre'];
	$apellido = $_POST['apellido'];
	$nombres_completos = $nombre." ".$apellido;
	$dni = $_POST['dni'];
	$domicilio = $_POST['domicilio'];
	$telefono = $_POST['telefono'];
	$correo = $_POST['email'];
	$reclamo = $_POST['reclamo'];
	$foto=$_FILES['filename']['name'];
    $ruta=$_FILES['filename']['tmp_name'];
    $destino="imagenes_documentos/".$foto;
    copy($ruta, $destino);
	$aleatorio = rand(1,99999999);
	$query = mysqli_query($connection,"SELECT * FROM reclamos WHERE solicitud ='$aleatorio'");
    $result = mysqli_fetch_array($query);
    if($result > 0) {
    	while ($result > 0) {
    		$aleatorio = rand(1,99999999);
			$query = mysqli_query($connection,"SELECT * FROM reclamos WHERE solicitud ='$aleatorio'");
			$result = mysqli_fetch_array($query);
    	}
    }
    else {
		$query_insert = mysqli_query($connection, "INSERT INTO reclamos VALUES('$dni','$nombres_completos','$domicilio','$telefono','$correo','$reclamo','$aleatorio','$destino')");
		if($query_insert){
			$query_solicitud = mysqli_query($connection,"SELECT solicitud FROM reclamos WHERE dni ='$dni'");
			$solicitud = mysqli_fetch_array($query_solicitud);
			$header = 'From: ' . $correo . "\r\n" .
					   'Reply-To: ' . $correo . "\r\n" .
					   'X-Mailer: PHP/' . phpversion();
			$header = 'From: alexandercodegunistall@gmail.com' . "\r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/plain";
			$mensaje = "Contenido de la forma Libro de Reclamaciones." . "\r\n";
			$mensaje .= "Nombres y Apellidos: " . $nombres_completos . "\r\n";
			$mensaje .= "Número de documento de identidad: " . $dni . "\r\n";
			$mensaje .= "domicilio: " . $domicilio . "\r\n";
			$mensaje .= "Correo electrónico: " . $correo . "\r\n";
			$mensaje .= "Mensaje: " . $reclamo . "\r\n";
			$mensaje .= "Telefono: " . $telefono . "\r\n";
			$mensaje .= "Número de solicitud: " . $solicitud['solicitud'] . "\r\n";
			$mensaje .= "Enviado el " . date('d/m/Y', time());
			$asunto = 'Libro de Reclamaciones Gobierno Regional Piura';
			mail($correo, $asunto, utf8_decode($mensaje), $header);
			header("Location:index.html");
		}
	}
?>	

