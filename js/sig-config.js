// =========================================
// CONFIGURACIÓN DEL SISTEMA SIG
// Archivo: sig-config.js
// =========================================

// Configuración de rutas de documentos
const SIG_CONFIG = {
    // Ruta base donde están almacenados los documentos
    BASE_PATH: '/public/documentos_sig/',
    
    // Mapeo de categorías a carpetas del servidor
    CATEGORY_FOLDERS: {
        'politicas': 'politicas',
        'documentos_generales': 'documentos_generales',
        'gestion_procesos': 'gestion_procesos',
        'indicadores': 'indicadores_gestion',
        'procedimientos': 'procedimientos_internos',
        'gestion_direccion': 'procedimientos_internos/gestion_direccion',
        'gestion_administrativa': 'procedimientos_internos/gestion_administrativa',
        'gestion_personal': 'procedimientos_internos/gestion_personal',
        'calidad': 'politicas/calidad',
        'seguridad': 'politicas/seguridad',
        'ambiental': 'politicas/ambiental',
        'antisoborno': 'politicas/antisoborno'
    },
    
    // Configuración de comportamiento
    SETTINGS: {
        OPEN_IN_NEW_TAB: true,
        SHOW_MODAL_ON_POPUP_BLOCK: true,
        MESSAGE_DURATION: 3000,
        CLEAN_FILE_NAMES: true,
        // Tipos de archivos permitidos
        ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
    }
};

// =========================================
// ESTRUCTURA DE CARPETAS RECOMENDADA EN EL SERVIDOR
// =========================================

/*
Tu servidor debería tener esta estructura de carpetas:

public/
├── documentos_sig/
│   ├── politicas/
│   │   ├── calidad/
│   │   │   ├── manual_de_política_de_calidad_iso_9001.pdf
│   │   │   ├── procedimiento_de_control_de_calidad.pdf
│   │   │   ├── objetivos_de_calidad_2025.xlsx
│   │   │   └── matriz_de_riesgos_de_calidad.doc
│   │   ├── seguridad/
│   │   │   ├── política_de_seguridad_ocupacional.pdf
│   │   │   ├── manual_del_sistema_de_sst.pdf
│   │   │   ├── plan_anual_de_seguridad.doc
│   │   │   └── registro_de_capacitaciones_sst.xlsx
│   │   ├── ambiental/
│   │   │   ├── sistema_de_gestión_ambiental.pdf
│   │   │   ├── plan_de_manejo_ambiental.pdf
│   │   │   ├── monitoreo_ambiental_2025.xlsx
│   │   │   └── procedimientos_de_emergencia_ambiental.doc
│   │   └── antisoborno/
│   │       ├── manual_anti-soborno_iso_37001.pdf
│   │       ├── código_de_conducta_ética.pdf
│   │       ├── evaluación_de_riesgos_de_soborno.xlsx
│   │       └── registro_de_debida_diligencia.doc
│   ├── documentos_generales/
│   │   ├── manual_del_sistema_integrado_de_gestión.pdf
│   │   ├── objetivos_y_metas_2025.xlsx
│   │   ├── programas_de_gestión.doc
│   │   └── matriz_de_requisitos_legales.xlsx
│   ├── gestion_procesos/
│   │   ├── mapa_de_procesos.pdf
│   │   ├── procesos_estratégicos.doc
│   │   ├── procesos_operativos.doc
│   │   └── caracterización_de_procesos.xlsx
│   ├── indicadores_gestion/
│   │   ├── indicadores_estratégicos.xlsx
│   │   ├── indicadores_de_producción.xlsx
│   │   ├── dashboard_de_indicadores.pdf
│   │   └── análisis_de_tendencias.doc
│   └── procedimientos_internos/
│       ├── gestion_direccion/
│       │   ├── procedimiento_de_planificación_estratégica.pdf
│       │   ├── procedimiento_de_revisión_por_la_dirección.doc
│       │   └── formato_de_actas_de_reunión.xlsx
│       ├── gestion_administrativa/
│       │   ├── procedimiento_de_compras.pdf
│       │   ├── procedimiento_de_control_de_inventarios.doc
│       │   ├── evaluación_de_proveedores.xlsx
│       │   └── control_de_gastos_administrativos.xlsx
│       └── gestion_personal/
│           ├── procedimiento_de_selección_de_personal.pdf
│           ├── procedimiento_de_capacitación.doc
│           ├── evaluación_de_desempeño.xlsx
│           └── plan_anual_de_capacitación.doc
*/

// =========================================
// FUNCIÓN PARA PERSONALIZAR RUTAS
// =========================================

// Si quieres personalizar las rutas, puedes modificar esta función
function customizeDocumentPath(documentName, currentPath) {
    // Ejemplo: Si tienes una estructura diferente
    
    // Opción 1: Rutas absolutas específicas
    const customPaths = {
        'Manual de Política de Calidad ISO 9001.pdf': '/docs/policies/quality_manual.pdf',
        'Procedimiento de Compras.pdf': '/docs/procedures/purchasing.pdf'
        // ... más rutas personalizadas
    };
    
    if (customPaths[documentName]) {
        return customPaths[documentName];
    }
    
    // Opción 2: Usar configuración por defecto
    return null; // Esto hará que use la función por defecto
}

// Función para obtener la ruta completa de un documento
function getDocumentFullPath(documentName, category) {
    const basePath = SIG_CONFIG.BASE_PATH;
    const categoryFolder = SIG_CONFIG.CATEGORY_FOLDERS[category] || category;
    
    // Si hay una ruta personalizada, usarla
    const customPath = customizeDocumentPath(documentName, categoryFolder);
    if (customPath) return customPath;
    
    // Si no, construir la ruta basada en la estructura por defecto
    return `${basePath}${categoryFolder}/${documentName}`;
}

// Función para verificar si un archivo existe
async function checkFileExists(filePath) {
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error verificando archivo:', error);
        return false;
    }
}

// =========================================
// CONFIGURACIÓN APACHE/NGINX (OPCIONAL)
// =========================================

/*
APACHE (.htaccess en la carpeta documentos_sig/):

# Permitir acceso a archivos PDF, DOC, XLSX
<FilesMatch "\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$">
    Header set Content-Disposition inline
    Header set X-Content-Type-Options nosniff
</FilesMatch>

# Configurar tipos MIME
AddType application/pdf .pdf
AddType application/msword .doc
AddType application/vnd.openxmlformats-officedocument.wordprocessingml.document .docx
AddType application/vnd.ms-excel .xls
AddType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet .xlsx

NGINX:
location /documentos_sig/ {
    add_header Content-Disposition inline;
    add_header X-Content-Type-Options nosniff;
    
    location ~* \.(pdf|doc|docx|xls|xlsx|ppt|pptx)$ {
        expires 1h;
        add_header Cache-Control "public, immutable";
    }
}
*/

// =========================================
// FUNCIONES DE UTILIDAD PARA ADMINISTRADOR
// =========================================

// Función para generar lista de archivos necesarios
function generateFileList() {
    const files = [];
    
    function extractFiles(folder, path = []) {
        if (folder.children) {
            for (const [key, item] of Object.entries(folder.children)) {
                if (item.type === 'file') {
                    files.push({
                        name: item.name,
                        path: path.join('/'),
                        category: path[0] || 'root',
                        subcategory: path[1] || null,
                        size: item.size,
                        modified: item.modified
                    });
                } else if (item.type === 'folder') {
                    extractFiles(item, [...path, key]);
                }
            }
        }
    }
    
    // Si tienes acceso a sigFileSystem
    if (typeof sigFileSystem !== 'undefined') {
        extractFiles(sigFileSystem.root);
    }
    
    return files;
}

// Función para verificar archivos faltantes (usar en consola)
function checkMissingFiles() {
    const files = generateFileList();
    const results = [];
    
    files.forEach(file => {
        const path = sigGetDocumentPath ? sigGetDocumentPath(file.name, ['root', file.category, file.subcategory].filter(Boolean)) : null;
        if (path) {
            results.push({
                file: file.name,
                expectedPath: path,
                category: file.category,
                subcategory: file.subcategory
            });
        }
    });
    
    console.table(results);
    return results;
}

// Exportar configuración si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SIG_CONFIG;
}