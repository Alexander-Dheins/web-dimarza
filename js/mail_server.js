const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
    service: 'outlook', // O usa otro servicio: 'outlook', 'yahoo', etc.
    auth: {
        user: 'tucorreo@gmail.com', // CAMBIA ESTO
        pass: 'tucontraseña'         // CAMBIA ESTO (usa contraseñas de aplicación para Gmail)
    }
});

// Ruta para procesar el formulario
app.post('/enviar-formulario', async (req, res) => {
    try {
        const { nombre, correo, asunto, mensaje } = req.body;
        
        // Validación básica
        if (!nombre || !correo || !asunto || !mensaje) {
            return res.status(400).json({ 
                success: false, 
                message: 'Todos los campos son obligatorios' 
            });
        }
        
        // Configuración del correo
        const mailOptions = {
            from: correo,
            to: 'tucorreo@gmail.com', // CAMBIA ESTO
            subject: `Nuevo mensaje de contacto: ${asunto}`,
            text: `
                Has recibido un nuevo mensaje desde el formulario de contacto.
                
                Nombre: ${nombre}
                Correo: ${correo}
                Asunto: ${asunto}
                
                Mensaje:
                ${mensaje}
            `
        };
        
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true, 
            message: 'Mensaje enviado correctamente' 
        });
        
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al enviar el mensaje' 
        });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});