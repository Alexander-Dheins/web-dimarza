<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set('America/Lima'); // Ajusta esto a tu zona horaria correcta
//Realizara todo esto solo si existe un metodo POST
if(!empty($_POST)) {
    //Se llama al archivo conexion.php
    include "conexion.php";
    //Obtenemos los valores de todos los campos
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $nombres_completos = $nombre." ".$apellido;
    $dni = $_POST['dni'];
    $domicilio = $_POST['domicilio'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['email'];
    $reclamo = $_POST['reclamo'];
    //Obtenemos los datos del archivo que se ha cargado
    $foto=$_FILES['filename']['name'];
    //Este if es ya que subir un archivo no es un campo obligatorio por lo que si la varible foto es vacia no debe copiar en la carpeta imagenes, si no lo colocamos este if saldra un error
    if(strlen($foto) > 0 ){
        //Obtenemos la ruta del archivo
        $ruta=$_FILES['filename']['tmp_name'];
        $destino="imagenes_documentos/".$foto;
        //El archivo que se envia se coloca en la carptea images_documento que tenemos en el proyecto
        copy($ruta, $destino);
    }
    //Si foto es vacio en la base de datos se guarda la varible destino con el valor de Sin archivo
    else {
        $destino = "Sin archivo";
    }
    
    //Genera número aleatorio para la solicitud
    $aleatorio = rand(1,99999999);
    //Consultamos que el numero de solicitud no exista
    $query = mysqli_query($connection,"SELECT * FROM reclamos WHERE solicitud ='$aleatorio'");
    $result = mysqli_fetch_array($query);
    if($result > 0) {
        while ($result > 0) {
            //Generamos otro número aleatorio si es que el aleatorio anterior ya esta en la base de datos
            $aleatorio = rand(1,99999999);
            $query = mysqli_query($connection,"SELECT * FROM reclamos WHERE solicitud ='$aleatorio'");
            $result = mysqli_fetch_array($query);
        }
        //Cuando sale de este while la variable result es 0
    }
    //Por lo que va a entrar a este if
    if($result <= 0) {
        // Procesar la firma si existe
        $firma_ruta = '';
        if (!empty($_POST['signature'])) {
            $firma = $_POST['signature'];
            $firma_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $firma));
            $firma_nombre = 'firma_' . time() . '.png';
            $firma_ruta = "imagenes_documentos/" . $firma_nombre; // Guardamos en la misma carpeta que los documentos
            file_put_contents($firma_ruta, $firma_data);
        }

        //Inserta los valores a la base de datos sin incluir la firma
        $query_insert = mysqli_query($connection, "INSERT INTO reclamos(dni,nombres_completos,domicilio,telefono,correo,reclamo,solicitud,archivo) VALUES('$dni','$nombres_completos','$domicilio','$telefono','$correo','$reclamo','$aleatorio','$destino')");
        
        if($query_insert){
            try {
                // Crear el PDF formal
                require 'fpdf/fpdf.php';
                $pdf = new FPDF();
                $pdf->AddPage();
                
                // Encabezado del PDF
                $pdf->SetFont('Arial', 'B', 16);
                $pdf->Cell(0, 10, 'FORMATO DE HOJA DE RECLAMACIÓN DEL LIBRO DE RECLAMACIONES', 0, 1, 'C');
                $pdf->SetFont('Arial', '', 12);
                $pdf->Ln(10);
                
                // Información de la empresa
                $pdf->Cell(0, 10, 'MUNICIPALIDAD DISTRITAL DE PUEBLO NUEVO - CHINCHA - R.U.C. N° 20147676574', 0, 1);
                $pdf->Cell(0, 10, 'AVENIDA OSCAR R. BENAVIDES N° 699 - PUEBLO NUEVO - CHINCHA', 0, 1);
                
                // Datos del usuario
                $pdf->Ln(10);
                $pdf->SetFont('Arial', 'B', 12);
                $pdf->Cell(0, 10, 'I. IDENTIFICACIÓN DEL USUARIO', 0, 1);
                $pdf->SetFont('Arial', '', 12);
                $pdf->Cell(0, 10, 'Nombres y Apellidos: ' . $nombres_completos, 0, 1);
                $pdf->Cell(0, 10, 'DNI: ' . $dni, 0, 1);
                $pdf->Cell(0, 10, 'Domicilio: ' . $domicilio, 0, 1);
                $pdf->Cell(0, 10, 'Teléfono: ' . $telefono, 0, 1);
                $pdf->Cell(0, 10, 'Correo electrónico: ' . $correo, 0, 1);
                
                // Detalles del reclamo
                $pdf->Ln(10);
                $pdf->SetFont('Arial', 'B', 12);
                $pdf->Cell(0, 10, 'II. IDENTIFICACIÓN DE LA ATENCIÓN BRINDADA', 0, 1);
                $pdf->SetFont('Arial', '', 12);
                $pdf->Cell(0, 10, 'DESCRIPCIÓN:', 0, 1);
                $pdf->MultiCell(0, 10, $reclamo);
                
                // Guardar el PDF
                $pdf_nombre = 'reclamo_' . $aleatorio . '.pdf';
                $ruta_pdf = 'reclamos_pdf/' . $pdf_nombre;
                $pdf->Output('F', $ruta_pdf); // Guardar el PDF en el servidor
                
                // Configurar el correo
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'net1003.webcloud.es';
                $mail->SMTPAuth = true;
                $mail->Username = 'reclamos@dimarza.com';
                $mail->Password = '=ASg7IutCwrk';
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;
                $mail->CharSet = 'UTF-8';
                
                // Desactivamos el debug
                $mail->SMTPDebug = 0;
                
                $mail->setFrom('reclamos@dimarza.com', 'Libro de reclamaciones');
                $mail->addAddress($correo); // Dirección del cliente
                $mail->addCC('reclamos@dimarza.com'); // Agregar copia para el administrador
                $mail->Subject = 'Seguimiento de reclamos - Dimarza';
                
				// Adjuntar el archivo PDF generado
				if (file_exists($ruta_pdf)) {
					$mail->addAttachment($ruta_pdf, $pdf_nombre);
				}

				// Adjuntar el archivo si existe
				if(strlen($foto) > 0) {
					$mail->addAttachment($destino, $foto);
				}

				// Adjuntar la firma como imagen
				if (!empty($firma_ruta) && file_exists($firma_ruta)) {
					$mail->addAttachment($firma_ruta, 'firma_' . $dni . '.png');
				}
                // Adjuntar el archivo si existe
                if(strlen($foto) > 0) {
                    $mail->addAttachment($destino, $foto);
                }
                
                // Adjuntar la firma como imagen
                if (!empty($firma_ruta) && file_exists($firma_ruta)) {
                    $mail->addAttachment($firma_ruta, 'firma_' . $dni . '.png');
                }
                $mail->isHTML(true); // Habilitamos HTML en el correo
                
                $mensaje = '
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; }
                        .header { background-color: #d31908; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background-color: #f9f9f9; }
                        .info-row { margin: 10px 0; }
                        .label { font-weight: bold; color: #003366; }
                        .footer { background-color: #d31908; color: white; padding: 10px; text-align: center; font-size: 12px; }
                        .reclamo-box { background-color: #fff; padding: 15px; border-left: 4px solid #003366; margin: 10px 0; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Libro de Reclamaciones</h2>
                    </div>
                    <div class="content">
                        <div class="info-row">
                            <span class="label">Nombres y Apellidos:</span> ' . $nombres_completos . '
                        </div>
                        <div class="info-row">
                            <span class="label">Número de documento de identidad:</span> ' . $dni . '
                        </div>
                        <div class="info-row">
                            <span class="label">Domicilio:</span> ' . $domicilio . '
                        </div>
                        <div class="info-row">
                            <span class="label">Correo electrónico:</span> ' . $correo . '
                        </div>
                        <div class="info-row">
                            <span class="label">Teléfono:</span> ' . $telefono . '
                        </div>
                        <div class="info-row">
                            <span class="label">Número de solicitud:</span> ' . $aleatorio . '
                        </div>
                        <div class="reclamo-box">
                            <span class="label">Mensaje del Reclamo:</span><br>
                            ' . nl2br($reclamo) . '
                        </div>

                    </div>
                    <div class="footer">
                        Enviado el ' . date('d/m/Y', strtotime('now')) . '<br>
                        Este es un correo automático, por favor no responder directamente a esta dirección.
                    </div>
                </body>
                </html>';
                
                $mail->Body = $mensaje;
                $mail->AltBody = strip_tags(str_replace(['<br>', '</div>'], ["\n", "\n"], $mensaje));

                if($mail->send()) {
                    $alert = "CORRECTO : Reclamo registrado en la base de datos - lexpy.dev.";
                } else {
                    $alert = "ERROR : No se pudo enviar el correo. Error: " . $mail->ErrorInfo;
                }
            } catch (Exception $e) {
                $alert = "ERROR : No se pudo procesar el reclamo. " . $e->getMessage();
                error_log("Error en el proceso de reclamo: " . $e->getMessage());
            }
        } else {
            $alert = "ERROR : Reclamo no registrado.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<title>Libro de reclamaciones</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->
	<link rel="icon" type="image/png" href="images/icondmz.png"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	
	
<!--===============================================================================================-->
</head>
<body>


	<div class="container-contact100">
		<div class="wrap-contact100">
			
			<form class="contact100-form validate-form" action="" method="POST" 
			autocomplete="off" enctype="multipart/form-data">
				<div class="title-container">
					<div class="logo-container">
						<img src="images/icondmz.png" alt="Logo" class="form-logo">
					</div>
					<span class="contact100-form-title">
						Libro de reclamaciones
					</span>
				</div>
				<div class="form-type-selector">
                    <div class="form-type-option">
                        <button type="button" class="form-type-btn active" data-form="normal">
                            <span class="btn-text">Todos los datos</span>
                        </button>
                        <i class="fa fa-info-circle info-icon" data-toggle="tooltip" data-placement="right" 
                           title="Esta opción requiere completar todos los campos personales y la firma digital para un seguimiento completo de su reclamo."></i>
                    </div>
                    <div class="form-type-option">
                        <button type="button" class="form-type-btn" data-form="anonymous">
                            <span class="btn-text">Anónima</span>
                        </button>
                        <i class="fa fa-info-circle info-icon" data-toggle="tooltip" data-placement="right" 
                           title="Esta opción permite enviar su reclamo de forma anónima. Los campos personales se rellenarán automáticamente y la firma no será necesaria. Sin embargo tome en cuenta que el reclamo en este modo sera analizado detenidamente para evitar suplantacion de informacion."></i>
                    </div>
                </div>
				
				
				<div class="alert" id="mensaje"><?php echo isset($alert) ?  $alert : '';?></div>
				<label class="label-input100" for="nombres">Nombres Completos *</label>
				<div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input id="nombre" class="input100" type="text" name="nombre" placeholder="Nombres" maxlength="25" onkeypress="return sololetras(event)" onpaste="return false">
					<span class="focus-input100"></span>
				</div>
				<div class="wrap-input100 rs2-wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input class="input100" type="text" name="apellido" placeholder="Apellidos" maxlength="25" onkeypress="return sololetras(event)" onpaste="return false">
					<span class="focus-input100"></span>
				</div>

				<label class="label-input100" for="dni">Documento de Indentidad *</label>
				<div class="wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input id="dni" class="input100" type="text" name="dni" placeholder="Ej. 12345678" maxlength="8" onkeypress="return solonumeros(event)" onpaste="return false">
					<span class="focus-input100"></span>
				</div>
				
				<label class="label-input100" for="domicilio">Domicilio *</label>
				<div class="wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input id="domicilio" class="input100" type="text" name="domicilio" placeholder="Ej. Calle abc" maxlength="50">
					<span class="focus-input100"></span>
				</div>

				<label class="label-input100" for="email">Correo Electrónico *</label>
				<div class="wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input id="email" class="input100" type="text" name="email" placeholder="Ej. example@email.com" maxlength="50">
					<span class="focus-input100"></span>
				</div>

				<label class="label-input100" for="telefono">Teléfono *</label>
				<div class="wrap-input100 validate-input" data-validate="Campo obligatorio">
					<input id="telefono" class="input100" type="text" name="telefono" placeholder="Ej. 987654321" maxlength="9" onkeypress="return solonumeros(event)" onpaste="return false">
					<span class="focus-input100"></span>
				</div>

				<label class="label-input100" for="reclamo">Reclamo *</label>
				<div class="wrap-input100 validate-input" data-validate="Campo obligatorio">
					<textarea id="reclamo" class="input100" name="reclamo" placeholder="Escribe tu reclamo aquí..." maxlength="200"></textarea>
					<span class="focus-input100"></span>
				</div>

				<label class="label-input100" for="archivo">Adjuntar documento(Opcional)</label>
				<div class="wrap-input100 validate-input">
				    <div class="file-upload-area">
				        <div class="file-upload-icon">
				            <i class="fa fa-download"></i>
				        </div>
				        <div class="file-message">Arrastra archivos a cualquier lugar para subirlos</div>
				        <div class="file-select">
							<button type="button" class="file-select-button" onclick="document.getElementById('file_1').click()">Seleccionar archivo</button>
							<span id="inputval">Ningún archivo seleccionado</span>
							<button type="button" id="removeFileButton" style="display: none;">X</button>
						</div>
				        <div class="file-message">Archivos soportados: PDF, JPEG, PNG o Word - Máx. 5MB</div>
				        <input id="file_1" class="upload-input" type="file" name="filename" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" hidden>
				    </div>
				</div>

                <label class="label-input100" for="signature">Firma Digital *</label>
                <div class="wrap-input100 validate-input" data-validate="La firma es obligatoria">
                    <div class="signature-pad-container">
                        <canvas id="signaturePad" class="signature-pad"></canvas>
                        <div class="signature-pad-buttons">
                            <button type="button" class="btn-clear-signature" id="clearSignature">Limpiar Firma</button>
                        </div>
                        <input type="hidden" name="signature" id="signatureInput">
                    </div>
                </div>

                <div class="privacy-policy-container">
				    <label class="privacy-checkbox-label">
				        <input type="checkbox" id="privacyCheck" name="privacy_accepted" required>
				        <span class="checkbox-text">He leído y acepto las <a href="#" class="policy-link" data-toggle="modal" data-target="#privacyModal">políticas de privacidad y tratamiento de datos</a></span>
				    </label>
				</div>

				<div class="container-contact100-form-btn">
					<button class="contact100-form-btn">
						Enviar
					</button>
				</div>

				<div class="container-contact100-form-btn">
					<a href="login/index.php" class="contact100-form-btn">
						Ver libro de reclamaciones
					</a>
				</div>
			</form>
		</div>
	</div>



	<div id="dropDownSelect1"></div>

<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
	<script>
		$(".selection-2").select2({
			minimumResultsForSearch: 20,
			dropdownParent: $('#dropDownSelect1')
		});
	</script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-23581568-13');
	</script>
	<script>
		//Este if sirve para que el formulario no se reenvie cuando damos f5 -->
		if ( window.history.replaceState ) {
        	window.history.replaceState( null, null, window.location.href );
    	}
	</script>
	<script>
	const dropArea = document.querySelector(".drag-area");
	const input = dropArea.querySelector(".upload");

	dropArea.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropArea.classList.add("active");
	});

	dropArea.addEventListener("dragleave", () => {
		dropArea.classList.remove("active");
	});

	dropArea.addEventListener("drop", (e) => {
		e.preventDefault();
		input.files = e.dataTransfer.files;
		dropArea.classList.remove("active");
	});
	</script>
</body>
</html>

<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signaturePad');
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)'
    });

    // Hacer el canvas responsivo
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Limpiar firma
    document.getElementById('clearSignature').addEventListener('click', function() {
        signaturePad.clear();
    });

    // Antes de enviar el formulario, convertir la firma a imagen
    document.querySelector('form').addEventListener('submit', function(e) {
        if (signaturePad.isEmpty()) {
            e.preventDefault();
            alert('Por favor, dibuje su firma');
            return false;
        }
        
        const signatureData = signaturePad.toDataURL();
        document.getElementById('signatureInput').value = signatureData;
    });
});
</script>
</body>
</html>

<footer class="footer-container">
    <div class="footer-content">
        <div class="footer-section">
            <h3>SOBRE NOSOTROS</h3>
            <img src="images/logodmz.png" alt="Logo" class="footer-logo">
            <p>En Dimarza, nos dedicamos a ofrecer servicios mineros de alta calidad, abarcando desde la exploración inicial hasta la producción y el cierre de minas. Con más de 10 años de experiencia en la industria.</p>
            <div class="social-icons">
                <a href="https://www.facebook.com/dimarzasac"><i class="fa fa-facebook"></i></a>
                <a href="https://www.linkedin.com/company/dimarza"><i class="fa fa-linkedin"></i></a>
                <a href="https://www.instagram.com/dimarza_corporacion/"><i class="fa fa-instagram"></i></a>
                <a href="https://github.com/Alexander-Dheins"><i class="fa fa-github"></i></a>
            </div>
        </div>
        <div class="footer-section">
            <h3>HORAS LABORALES</h3>
            <p>Trabajamos los 6 días de la semana en oficina, excepto los días festivos importantes.</p>
            <div class="schedule">
                <p>Lunes - Viernes: 8:00 - 17:30</p>
                <p>Sábados: 7:40 - 13:00</p>
                <p>Domingos: Cerrado</p>
            </div>
        </div>
        <div class="footer-section designer-section">
            <div class="designer-header">
                <h3>WEB DESINGNER BY</h3>
            </div>
            <div class="designer-content">
                <img src="images/lexpydev.png" alt="Desarrollador" class="footer-book">
                <div class="web-link">
                    <a href="https://lexpy.dev" class="designer-link heartbeat">lexpy.dev</a>
                    <i class="fa fa-globe web-icon"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="copyright-info text-center">
              <span>Copyright &copy; <script>
                  document.write(new Date().getFullYear())
                </script>,Developed by <a href="https://github.com/Alexander-Dheins">Alexander Dheins</a></span>
            </div>
    </div>
</footer>

<!-- Modal de Políticas de Privacidad -->
<div class="modal fade" id="privacyModal" tabindex="-1" role="dialog" aria-labelledby="privacyModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="privacyModalLabel">Políticas de Privacidad y Tratamiento de Datos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h6>1. Información que Recopilamos</h6>
                <p>Recopilamos la siguiente información personal:</p>
                <ul>
                    <li>Nombre y apellidos</li>
                    <li>Número de DNI</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Domicilio</li>
                </ul>

                <h6>2. Uso de la Información</h6>
                <p>La información recopilada será utilizada para:</p>
                <ul>
                    <li>Procesar y dar seguimiento a su reclamo</li>
                    <li>Comunicarnos con usted sobre el estado de su reclamo</li>
                    <li>Cumplir con las regulaciones legales aplicables</li>
                </ul>

                <h6>3. Protección de Datos</h6>
                <p>Sus datos personales serán tratados con total confidencialidad y se implementarán medidas de seguridad adecuadas para proteger su información.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
