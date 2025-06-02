// Cargar variables de entorno PRIMERO
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
const requestIp = require('request-ip');

const app = express();
const PORT = process.env.PORT || 3000; // ← NUEVO PUERTO

// Lista negra de IPs (puedes agregar IPs problemáticas)
const blockedIPs = new Set([
    // Agregar IPs bloqueadas aquí
    // '192.168.1.100'
]);

// Función para registrar intentos (en producción usar una base de datos)
const submissionLog = new Map();

// Middlewares de seguridad
app.use(cors({
    origin: [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8080',
        'http://localhost/web_dimarza',
        'http://localhost/web_dimarza/',
        'https://dimarza.com',
        'null'  // Agregar este origen para permitir solicitudes desde archivos locales
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Rate limiting para prevenir spam
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 3, // máximo 3 intentos por IP en 15 minutos
    message: {
        success: false,
        message: 'Demasiados intentos de contacto. Intenta nuevamente en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware para obtener IP del cliente
app.use(requestIp.mw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static('public'));

// Configuración del transportador de correo para Dimarza
const transporter = nodemailer.createTransport({
    host: 'mail.dimarza.com',
    port: 465, // Puerto SSL
    secure: true, // true para puerto 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Configuración alternativa para puerto 587 (TLS)
const transporterAlternative = nodemailer.createTransport({
    host: 'mail.dimarza.com',
    port: 587, // Puerto TLS
    secure: false, // false para puerto 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Funciones de validación anti-spam
function validateInput(data) {
    const errors = [];
    
    // Validar nombre
    if (!data.nombre || data.nombre.trim().length < 2) {
        errors.push('Nombre inválido');
    }
    
    // Validar email con regex más estricto
    if (!data.correo || !validator.isEmail(data.correo)) {
        errors.push('Correo electrónico inválido');
    }
    
    // Validar dominio del email (evitar dominios temporales)
    const emailDomain = data.correo.split('@')[1];
    const tempDomains = [
        '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
        'mailinator.com', 'throwaway.email', 'temp-mail.org'
    ];
    
    if (tempDomains.includes(emailDomain)) {
        errors.push('No se permiten correos temporales');
    }
    
    // Validar teléfono si se proporciona
    if (data.telefono && !validator.isMobilePhone(data.telefono.replace(/[\s\-\(\)]/g, ''), 'any')) {
        errors.push('Número de teléfono inválido');
    }
    
    // Validar asunto
    if (!data.asunto || data.asunto.trim().length < 5) {
        errors.push('Asunto muy corto');
    }
    
    // Validar mensaje
    if (!data.mensaje || data.mensaje.trim().length < 10) {
        errors.push('Mensaje muy corto');
    }
    
    // Detectar contenido spam en el mensaje
    const spamKeywords = [
        'viagra', 'casino', 'lottery', 'winner', 'urgent', 'million',
        'bitcoin', 'cryptocurrency', 'investment', 'loan', 'credit'
    ];
    
    const messageContent = data.mensaje.toLowerCase();
    const spamDetected = spamKeywords.some(keyword => messageContent.includes(keyword));
    
    if (spamDetected) {
        errors.push('Contenido no permitido detectado');
    }
    
    // Verificar longitud máxima para prevenir ataques
    if (data.mensaje.length > 2000) {
        errors.push('Mensaje demasiado largo');
    }
    
    return errors;
}

function isValidIP(ip) {
    // Validar que la IP no sea localhost o redes privadas (para producción)
    const privateNetworks = [
        '127.0.0.1', '::1', '0.0.0.0',
        /^10\./, /^172\.(1[6-9]|2[0-9]|3[01])\./, /^192\.168\./
    ];
    
    if (!ip || ip === 'undefined' || ip === 'null') {
        return false;
    }
    
    // En desarrollo, permitir IPs locales
    if (process.env.NODE_ENV === 'development') {
        return true;
    }
    
    // En producción, rechazar IPs privadas
    return !privateNetworks.some(pattern => {
        if (typeof pattern === 'string') {
            return ip === pattern;
        }
        return pattern.test(ip);
    });
}

// Verificar si la IP está en lista negra
function isIPBlocked(ip) {
    return blockedIPs.has(ip);
}

function logSubmission(ip, email) {
    const key = `${ip}:${email}`;
    const now = Date.now();
    
    if (!submissionLog.has(key)) {
        submissionLog.set(key, []);
    }
    
    const submissions = submissionLog.get(key);
    
    // Limpiar envíos antiguos (más de 1 hora)
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentSubmissions = submissions.filter(time => time > oneHourAgo);
    
    recentSubmissions.push(now);
    submissionLog.set(key, recentSubmissions);
    
    return recentSubmissions.length;
}

// Verificar si hay demasiados envíos desde la misma IP/email
function hasTooManySubmissions(ip, email) {
    const submissions = logSubmission(ip, email);
    return submissions > 5; // Máximo 5 envíos por hora por IP/email
}

// Ruta principal para procesar el formulario
app.post('/enviar-formulario', contactLimiter, async (req, res) => {
    try {
        const clientIP = req.clientIp || req.ip;
        
        // Verificar IP bloqueada
        if (isIPBlocked(clientIP)) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado'
            });
        }
        
        // Verificar demasiados envíos
        if (hasTooManySubmissions(clientIP, req.body.correo)) {
            return res.status(429).json({
                success: false,
                message: 'Demasiados envíos. Intenta más tarde.'
            });
        }
        
        const {
            nombre,
            correo,
            telefono,
            asunto,
            mensaje,
            userIP,
            policyAccept
        } = req.body;
        
        // DEBUG: Imprimir todos los datos recibidos
        console.log('📝 Datos recibidos del formulario:', {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            asunto: asunto,
            mensaje: mensaje?.substring(0, 50) + '...',
            userIP: userIP,
            policyAccept: policyAccept,
            policyAcceptType: typeof policyAccept,
            allBodyKeys: Object.keys(req.body)
        });

        // Verificar que se aceptaron las políticas - VALIDACIÓN MEJORADA
        const isPolicyAccepted = policyAccept === 'on' || 
                                policyAccept === 'true' || 
                                policyAccept === true || 
                                policyAccept === '1' ||
                                (req.body.policyAccept && req.body.policyAccept === 'on');

        console.log('🔍 Validación de políticas:', {
            policyAccept: policyAccept,
            isPolicyAccepted: isPolicyAccepted,
            checkboxValue: req.body.policyAccept
        });

        if (!isPolicyAccepted) {
            console.log('❌ Políticas no aceptadas:', {
                received: policyAccept,
                type: typeof policyAccept,
                bodyKeys: Object.keys(req.body)
            });
            
            return res.status(400).json({
                success: false,
                message: 'Debe aceptar las políticas de privacidad'
            });
        }
        
        // Validar todos los campos
        const validationErrors = validateInput({
            nombre,
            correo,
            telefono,
            asunto,
            mensaje
        });
        
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Errores de validación: ${validationErrors.join(', ')}`
            });
        }
        
        // Sanitizar datos
        const sanitizedData = {
            nombre: validator.escape(nombre.trim()),
            correo: validator.normalizeEmail(correo.trim()),
            telefono: telefono ? validator.escape(telefono.trim()) : '',
            asunto: validator.escape(asunto.trim()),
            mensaje: validator.escape(mensaje.trim()),
            clientIP: clientIP,
            userIP: userIP || 'No disponible',
            timestamp: new Date().toLocaleString('es-PE', {
                timeZone: 'America/Lima'
            })
        };
        
        // Configuración del correo principal para la empresa
        const mailToCompany = {
            from: `"Formulario Web Dimarza" <${process.env.EMAIL_USER}>`,
            to: 'contacto@dimarza.com', // Correo principal
            cc: 'prueba@dimarza.com', // Copia a correo de prueba
            subject: `[CONTACTO WEB] ${sanitizedData.asunto}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; }
                        .header { background: #b91f1f; color: white; padding: 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 20px; }
                        .info-row { margin: 10px 0; padding: 15px; background: white; border-left: 4px solid #b91f1f; border-radius: 4px; }
                        .label { font-weight: bold; color: #b91f1f; display: inline-block; min-width: 100px; }
                        .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #ddd; }
                        .ip-info { background: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 5px; font-size: 13px; border: 1px solid #ffeaa7; }
                        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>📧 Nuevo Mensaje de Contacto</h2>
                            <p>Formulario Web - Dimarza</p>
                        </div>
                        <div class="content">
                            <div class="info-row">
                                <span class="label">👤 Nombre:</span> ${sanitizedData.nombre}
                            </div>
                            <div class="info-row">
                                <span class="label">📧 Correo:</span> 
                                <a href="mailto:${sanitizedData.correo}" style="color: #b91f1f;">${sanitizedData.correo}</a>
                            </div>
                            ${sanitizedData.telefono ? `
                            <div class="info-row">
                                <span class="label">📞 Teléfono:</span> 
                                <a href="tel:${sanitizedData.telefono}" style="color: #b91f1f;">${sanitizedData.telefono}</a>
                            </div>
                            ` : ''}
                            <div class="info-row">
                                <span class="label">📝 Asunto:</span> ${sanitizedData.asunto}
                            </div>
                            <div class="info-row">
                                <span class="label">📅 Fecha:</span> ${sanitizedData.timestamp}
                            </div>
                            <div class="message-box">
                                <div class="label" style="display: block; margin-bottom: 10px;">💬 Mensaje:</div>
                                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.mensaje.replace(/\n/g, '<br>')}</p>
                            </div>
                            <div class="ip-info">
                                <strong>🔍 Información técnica:</strong><br>
                                <strong>IP del cliente:</strong> ${sanitizedData.clientIP}<br>
                                <strong>IP reportada:</strong> ${sanitizedData.userIP}<br>
                                <strong>User Agent:</strong> ${req.get('User-Agent') || 'No disponible'}
                            </div>
                        </div>
                        <div class="footer">
                            <p><strong>Dimarza</strong> - Sistema de Contacto Web<br>
                            Mza. D Lote. 4 Parque Industrial I Etapa - Cerro Colorado</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                NUEVO MENSAJE DE CONTACTO - DIMARZA
                ===================================
                
                Nombre: ${sanitizedData.nombre}
                Correo: ${sanitizedData.correo}
                ${sanitizedData.telefono ? `Teléfono: ${sanitizedData.telefono}\n` : ''}
                Asunto: ${sanitizedData.asunto}
                Fecha: ${sanitizedData.timestamp}
                
                MENSAJE:
                ${sanitizedData.mensaje}
                
                ---
                INFORMACIÓN TÉCNICA:
                IP del cliente: ${sanitizedData.clientIP}
                IP reportada: ${sanitizedData.userIP}
                User Agent: ${req.get('User-Agent') || 'No disponible'}
                
                ---
                Dimarza - Sistema de Contacto Web
            `
        };
        
        // Configuración del correo de confirmación para el usuario
        const mailToUser = {
            from: `"Dimarza - Confirmación" <${process.env.EMAIL_USER}>`,
            to: sanitizedData.correo,
            subject: '✅ Confirmación de recepción - Dimarza',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; }
                        .header { background: #b91f1f; color: white; padding: 30px 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 30px 20px; }
                        .summary-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #b91f1f; }
                        .contact-info { background: #e8f4f8; padding: 20px; margin: 20px 0; border-radius: 8px; }
                        .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 13px; }
                        .button { background: #b91f1f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>¡Gracias por contactarnos!</h2>
                            <p>Hemos recibido tu mensaje correctamente</p>
                        </div>
                        <div class="content">
                            <p>Estimado/a <strong>${sanitizedData.nombre}</strong>,</p>
                            
                            <p>Queremos agradecerte por contactarte con <strong>Dimarza</strong>. Tu mensaje es muy importante para nosotros.</p>
                            
                            <div class="summary-box">
                                <h3 style="color: #b91f1f; margin-top: 0;">📋 Resumen de tu consulta:</h3>
                                <p><strong>Asunto:</strong> ${sanitizedData.asunto}</p>
                                <p><strong>Fecha de envío:</strong> ${sanitizedData.timestamp}</p>
                                <p><strong>Número de referencia:</strong> DMZ-${Date.now().toString().slice(-6)}</p>
                            </div>
                            
                            <p><strong>⏰ Tiempo de respuesta:</strong><br>
                            Nuestro equipo especializado revisará tu mensaje y te responderemos en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
                            
                            <div class="contact-info">
                                <h3 style="color: #b91f1f; margin-top: 0;">📞 ¿Necesitas contactarnos urgentemente?</h3>
                                <p><strong>Teléfono:</strong> <a href="tel:+51987654321" style="color: #b91f1f;">(+51) 987654321</a></p>
                                <p><strong>Email:</strong> <a href="mailto:contacto@dimarza.com" style="color: #b91f1f;">contacto@dimarza.com</a></p>
                                <p><strong>Dirección:</strong> Mza. D Lote. 4 Parque Industrial I Etapa - Cerro Colorado</p>
                                <a href="https://dimarza.com" class="button">Visitar nuestro sitio web</a>
                            </div>
                            
                            <p>Saludos cordiales,<br>
                            <strong>Equipo Dimarza</strong><br>
                            <em>Comprometidos con la excelencia en servicios mineros</em></p>
                        </div>
                        <div class="footer">
                            <p><strong>Dimarza</strong> | Servicios Mineros de Calidad<br>
                            Mza. D Lote. 4 Parque Industrial I Etapa - Cerro Colorado<br><br>
                            <small>Este es un email automático de confirmación. Por favor no responder a este correo.<br>
                            Para nuevas consultas, utiliza nuestro formulario web o escribe a contacto@dimarza.com</small></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        // Intentar enviar con el transportador principal (puerto 465)
        let emailSent = false;
        let transporterUsed = 'principal';
        
        try {
            await transporter.sendMail(mailToCompany);
            await transporter.sendMail(mailToUser);
            emailSent = true;
        } catch (error) {
            console.warn('Error con transportador principal (465), intentando alternativo (587):', error.message);
            
            try {
                await transporterAlternative.sendMail(mailToCompany);
                await transporterAlternative.sendMail(mailToUser);
                emailSent = true;
                transporterUsed = 'alternativo';
            } catch (error2) {
                console.error('Error con ambos transportadores:', error2);
                throw error2;
            }
        }
        
        if (emailSent) {
            // Log exitoso
            console.log(`✅ Formulario enviado exitosamente:`);
            console.log(`   📧 Desde: ${sanitizedData.correo}`);
            console.log(`   🌐 IP: ${clientIP}`);
            console.log(`   🚀 Transportador: ${transporterUsed}`);
            
            res.status(200).json({
                success: true,
                message: 'Mensaje enviado correctamente. Te contactaremos pronto.'
            });
        } else {
            throw new Error('No se pudo enviar el email');
        }
        
    } catch (error) {
        console.error('❌ Error al enviar formulario:', error);
        
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor. Inténtalo más tarde.'
        });
    }
});

// Ruta para verificar el estado del servidor
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        emailConfig: {
            host: 'mail.dimarza.com',
            user: process.env.EMAIL_USER,
            secure: true
        }
    });
});

// Ruta para obtener IP pública (alternativa)
app.get('/api/ip', (req, res) => {
    const clientIP = req.clientIp || req.ip;
    res.json({ ip: clientIP });
});

// Ruta de prueba
app.get('/test-email', async (req, res) => {
    try {
        // Configuración de prueba del email
        const testMailOptions = {
            from: process.env.EMAIL_USER || 'contacto@dimarza.com',
            to: process.env.EMAIL_USER || 'contacto@dimarza.com', // envía a sí mismo para prueba
            subject: 'Prueba de Correo - Dimarza',
            text: 'Este es un correo de prueba del servidor de Dimarza.',
            html: '<h1>Prueba de Correo</h1><p>Este es un correo de prueba del servidor de Dimarza.</p>'
        };

        // Intentar enviar el correo
        await transporter.sendMail(testMailOptions);
        
        res.json({
            success: true,
            message: 'Correo de prueba enviado exitosamente'
        });
    } catch (error) {
        console.error('Error en prueba de correo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar correo de prueba',
            error: error.message
        });
    }
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Dimarza ejecutándose en http://localhost:${PORT}`);
    console.log(`📧 Configuración de email: ${process.env.EMAIL_USER}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Monitoreo: http://localhost:${PORT}/health`);
    
    // Verificar configuración de email al iniciar
    transporter.verify((error, success) => {
        if (error) {
            console.log('❌ Error en configuración de email (puerto 465):', error.message);
            console.log('🔄 Verificando configuración alternativa (puerto 587)...');
            
            transporterAlternative.verify((error2, success2) => {
                if (error2) {
                    console.log('❌ Error en configuración alternativa (puerto 587):', error2.message);
                    console.log('⚠️  Verifica las credenciales en el archivo .env');
                } else {
                    console.log('✅ Servidor de email alternativo (587) configurado correctamente');
                }
            });
        } else {
            console.log('✅ Servidor de email principal (465) configurado correctamente');
        }
    });
});