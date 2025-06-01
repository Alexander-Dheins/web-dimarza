// =========================================
// SISTEMA INTEGRADO DE GESTIÓN (SIG) - DOCUMENTACIÓN INTERNA
// Archivo: police.js
// Funcionalidad: Explorador de documentos estilo Windows
// =========================================

// Estructura de datos que simula el sistema de archivos
const sigFileSystem = {
    'root': {
        type: 'folder',
        name: 'Documentación SIG',
        children: {
            'politicas': {
                type: 'folder',
                name: 'Políticas',
                icon: 'fas fa-shield-alt',
                children: {
                    'calidad': {
                        type: 'folder',
                        name: 'Política de Calidad',
                        children: {
                            'manual_calidad.pdf': {
                                type: 'file',
                                name: 'Manual de Política de Calidad ISO 9001.pdf',
                                size: '2.4 MB',
                                modified: '15/02/2025'
                            },
                            'procedimiento_control.pdf': {
                                type: 'file',
                                name: 'Procedimiento de Control de Calidad.pdf',
                                size: '1.8 MB',
                                modified: '12/02/2025'
                            },
                            'objetivos_calidad.xlsx': {
                                type: 'file',
                                name: 'Objetivos de Calidad 2025.xlsx',
                                size: '945 KB',
                                modified: '10/02/2025'
                            },
                            'matriz_riesgos.doc': {
                                type: 'file',
                                name: 'Matriz de Riesgos de Calidad.doc',
                                size: '1.2 MB',
                                modified: '08/02/2025'
                            }
                        }
                    },
                    'seguridad': {
                        type: 'folder',
                        name: 'Política de Seguridad y Salud',
                        children: {
                            'politica_sst.pdf': {
                                type: 'file',
                                name: 'Política de Seguridad Ocupacional.pdf',
                                size: '1.9 MB',
                                modified: '18/02/2025'
                            },
                            'manual_sst.pdf': {
                                type: 'file',
                                name: 'Manual del Sistema de SST.pdf',
                                size: '3.2 MB',
                                modified: '16/02/2025'
                            },
                            'plan_seguridad.doc': {
                                type: 'file',
                                name: 'Plan Anual de Seguridad.doc',
                                size: '2.1 MB',
                                modified: '14/02/2025'
                            },
                            'registro_capacitaciones.xlsx': {
                                type: 'file',
                                name: 'Registro de Capacitaciones SST.xlsx',
                                size: '896 KB',
                                modified: '12/02/2025'
                            }
                        }
                    },
                    'ambiental': {
                        type: 'folder',
                        name: 'Política Medioambiental',
                        children: {
                            'sistema_ambiental.pdf': {
                                type: 'file',
                                name: 'Sistema de Gestión Ambiental.pdf',
                                size: '2.7 MB',
                                modified: '20/02/2025'
                            },
                            'plan_ambiental.pdf': {
                                type: 'file',
                                name: 'Plan de Manejo Ambiental.pdf',
                                size: '1.6 MB',
                                modified: '17/02/2025'
                            },
                            'monitoreo_ambiental.xlsx': {
                                type: 'file',
                                name: 'Monitoreo Ambiental 2025.xlsx',
                                size: '1.1 MB',
                                modified: '15/02/2025'
                            },
                            'procedimientos_emergencia.doc': {
                                type: 'file',
                                name: 'Procedimientos de Emergencia Ambiental.doc',
                                size: '890 KB',
                                modified: '13/02/2025'
                            }
                        }
                    },
                    'antisoborno': {
                        type: 'folder',
                        name: 'Política Anti-Soborno',
                        children: {
                            'manual_antisoborno.pdf': {
                                type: 'file',
                                name: 'Manual Anti-Soborno ISO 37001.pdf',
                                size: '2.2 MB',
                                modified: '19/02/2025'
                            },
                            'codigo_conducta.pdf': {
                                type: 'file',
                                name: 'Código de Conducta Ética.pdf',
                                size: '1.4 MB',
                                modified: '15/02/2025'
                            },
                            'evaluacion_riesgos.xlsx': {
                                type: 'file',
                                name: 'Evaluación de Riesgos de Soborno.xlsx',
                                size: '756 KB',
                                modified: '13/02/2025'
                            },
                            'registro_debida_diligencia.doc': {
                                type: 'file',
                                name: 'Registro de Debida Diligencia.doc',
                                size: '980 KB',
                                modified: '11/02/2025'
                            }
                        }
                    }
                }
            },
            'documentos_sig': {
                type: 'folder',
                name: 'Documentos Generales del SIG',
                icon: 'fas fa-file-alt',
                children: {
                    'manual_sig.pdf': {
                        type: 'file',
                        name: 'Manual del Sistema Integrado de Gestión.pdf',
                        size: '4.8 MB',
                        modified: '21/02/2025'
                    },
                    'objetivos_metas.xlsx': {
                        type: 'file',
                        name: 'Objetivos y Metas 2025.xlsx',
                        size: '1.3 MB',
                        modified: '20/02/2025'
                    },
                    'programas_gestion.doc': {
                        type: 'file',
                        name: 'Programas de Gestión.doc',
                        size: '2.9 MB',
                        modified: '18/02/2025'
                    },
                    'matriz_legal.xlsx': {
                        type: 'file',
                        name: 'Matriz de Requisitos Legales.xlsx',
                        size: '1.8 MB',
                        modified: '16/02/2025'
                    }
                }
            },
            'gestion_procesos': {
                type: 'folder',
                name: 'Gestión por Procesos',
                icon: 'fas fa-sitemap',
                children: {
                    'mapa_procesos.pdf': {
                        type: 'file',
                        name: 'Mapa de Procesos.pdf',
                        size: '3.1 MB',
                        modified: '19/02/2025'
                    },
                    'procesos_estrategicos.doc': {
                        type: 'file',
                        name: 'Procesos Estratégicos.doc',
                        size: '2.3 MB',
                        modified: '17/02/2025'
                    },
                    'procesos_operativos.doc': {
                        type: 'file',
                        name: 'Procesos Operativos.doc',
                        size: '2.8 MB',
                        modified: '16/02/2025'
                    },
                    'caracterizacion_procesos.xlsx': {
                        type: 'file',
                        name: 'Caracterización de Procesos.xlsx',
                        size: '2.1 MB',
                        modified: '14/02/2025'
                    }
                }
            },
            'indicadores': {
                type: 'folder',
                name: 'Indicadores de Gestión',
                icon: 'fas fa-chart-bar',
                children: {
                    'indicadores_estrategicos.xlsx': {
                        type: 'file',
                        name: 'Indicadores Estratégicos.xlsx',
                        size: '1.7 MB',
                        modified: '21/02/2025'
                    },
                    'indicadores_produccion.xlsx': {
                        type: 'file',
                        name: 'Indicadores de Producción.xlsx',
                        size: '2.1 MB',
                        modified: '20/02/2025'
                    },
                    'dashboard_indicadores.pdf': {
                        type: 'file',
                        name: 'Dashboard de Indicadores.pdf',
                        size: '3.4 MB',
                        modified: '19/02/2025'
                    },
                    'analisis_tendencias.doc': {
                        type: 'file',
                        name: 'Análisis de Tendencias.doc',
                        size: '1.9 MB',
                        modified: '17/02/2025'
                    }
                }
            },
            'procedimientos': {
                type: 'folder',
                name: 'Procedimientos Internos',
                icon: 'fas fa-cogs',
                children: {
                    'gestion_direccion': {
                        type: 'folder',
                        name: 'Gestión y Alta Dirección',
                        children: {
                            'proc_planificacion.pdf': {
                                type: 'file',
                                name: 'Procedimiento de Planificación Estratégica.pdf',
                                size: '2.2 MB',
                                modified: '18/02/2025'
                            },
                            'proc_revision.doc': {
                                type: 'file',
                                name: 'Procedimiento de Revisión por la Dirección.doc',
                                size: '1.8 MB',
                                modified: '17/02/2025'
                            },
                            'formato_actas.xlsx': {
                                type: 'file',
                                name: 'Formato de Actas de Reunión.xlsx',
                                size: '456 KB',
                                modified: '15/02/2025'
                            }
                        }
                    },
                    'gestion_administrativa': {
                        type: 'folder',
                        name: 'Gestión Administrativa',
                        children: {
                            'proc_compras.pdf': {
                                type: 'file',
                                name: 'Procedimiento de Compras.pdf',
                                size: '2.4 MB',
                                modified: '16/02/2025'
                            },
                            'proc_inventarios.doc': {
                                type: 'file',
                                name: 'Procedimiento de Control de Inventarios.doc',
                                size: '1.9 MB',
                                modified: '15/02/2025'
                            },
                            'evaluacion_proveedores.xlsx': {
                                type: 'file',
                                name: 'Evaluación de Proveedores.xlsx',
                                size: '1.1 MB',
                                modified: '13/02/2025'
                            },
                            'control_gastos.xlsx': {
                                type: 'file',
                                name: 'Control de Gastos Administrativos.xlsx',
                                size: '782 KB',
                                modified: '11/02/2025'
                            }
                        }
                    },
                    'gestion_personal': {
                        type: 'folder',
                        name: 'Gestión de Personal',
                        children: {
                            'proc_seleccion.pdf': {
                                type: 'file',
                                name: 'Procedimiento de Selección de Personal.pdf',
                                size: '2.0 MB',
                                modified: '14/02/2025'
                            },
                            'proc_capacitacion.doc': {
                                type: 'file',
                                name: 'Procedimiento de Capacitación.doc',
                                size: '1.7 MB',
                                modified: '13/02/2025'
                            },
                            'evaluacion_desempeño.xlsx': {
                                type: 'file',
                                name: 'Evaluación de Desempeño.xlsx',
                                size: '945 KB',
                                modified: '12/02/2025'
                            },
                            'plan_capacitacion.doc': {
                                type: 'file',
                                name: 'Plan Anual de Capacitación.doc',
                                size: '1.3 MB',
                                modified: '10/02/2025'
                            }
                        }
                    }
                }
            }
        }
    }
};

// Variables globales con prefijo
let sigCurrentPath = ['root'];
let sigCurrentView = 'list';
let sigSearchResults = null;

// =========================================
// FUNCIONES PRINCIPALES
// =========================================

// Inicializar la aplicación
function sigInitializeApp() {
    console.log('Initializing SIG app...');
    console.log('SIG FileSystem structure:', sigFileSystem);
    console.log('Root children:', Object.keys(sigFileSystem.root.children));
    
    sigRenderNavigationTree();
    sigRenderContent();
    sigUpdateBreadcrumb();
}

// Renderizar el árbol de navegación
function sigRenderNavigationTree() {
    const navTree = document.getElementById('sigNavigationTree');
    if (!navTree) return;
    
    const rootChildren = sigFileSystem.root.children;

    let html = '';
    for (const [key, item] of Object.entries(rootChildren)) {
        if (item.type === 'folder') {
            const icon = item.icon || 'fas fa-folder';
            const isActive = sigCurrentPath.length > 1 && sigCurrentPath[1] === key ? 'active' : '';
            html += `
                <div class="sig-nav-item ${isActive}" onclick="sigNavigateTo(['root', '${key}'])">
                    <i class="${icon}"></i>
                    ${item.name}
                </div>
            `;
        }
    }

    navTree.innerHTML = html;
}

// Navegar a una ruta específica
function sigNavigateTo(path) {
    console.log('SIG Navigating to:', path);
    
    if (path === 'root') {
        sigCurrentPath = ['root'];
    } else if (Array.isArray(path)) {
        sigCurrentPath = [...path];
    } else if (typeof path === 'string') {
        sigCurrentPath = ['root', path];
    }

    console.log('SIG Current path set to:', sigCurrentPath);
    
    sigSearchResults = null;
    sigRenderNavigationTree();
    sigRenderContent();
    sigUpdateBreadcrumb();
}

// =========================================
// FUNCIONES DE RENDERIZADO
// =========================================

// Renderizar el contenido principal
function sigRenderContent() {
    const contentArea = document.getElementById('sigContentArea');
    const contentTitle = document.getElementById('sigContentTitle');
    
    if (!contentArea || !contentTitle) return;

    // Mostrar loading
    contentArea.innerHTML = `
        <div class="sig-loading">
            <i class="fas fa-spinner"></i>
            <p>Cargando contenido...</p>
        </div>
    `;

    // Simular delay de carga
    setTimeout(() => {
        const currentFolder = sigGetCurrentFolder();
        
        if (!currentFolder) {
            sigShowEmptyState('Carpeta no encontrada');
            return;
        }

        // Actualizar título
        contentTitle.textContent = currentFolder.name || 'Documentación SIG';

        // Renderizar contenido según la vista actual
        if (sigSearchResults) {
            sigRenderSearchResults();
        } else if (sigCurrentView === 'grid') {
            sigRenderGridView(currentFolder);
        } else {
            sigRenderListView(currentFolder);
        }
    }, 300);
}

// Obtener la carpeta actual basada en el path
function sigGetCurrentFolder() {
    console.log('Getting SIG current folder for path:', sigCurrentPath);
    
    let current = sigFileSystem;
    
    for (let i = 0; i < sigCurrentPath.length; i++) {
        const segment = sigCurrentPath[i];
        console.log(`Looking for SIG segment: "${segment}"`);
        
        if (i === 0 && segment === 'root') {
            // Para el primer segmento 'root', tomar directamente el objeto root
            current = current.root;
            console.log(`Found SIG root:`, current);
        } else {
            // Para los demás segmentos, buscar en children
            if (current.children && current.children[segment]) {
                current = current.children[segment];
                console.log(`Found SIG segment "${segment}":`, current);
            } else {
                console.error(`SIG Segment not found: "${segment}"`);
                console.log('Available SIG children:', current.children ? Object.keys(current.children) : 'No children');
                return null;
            }
        }
    }
    
    console.log('Final SIG current folder:', current);
    return current;
}

// Renderizar vista de lista
function sigRenderListView(folder) {
    const contentArea = document.getElementById('sigContentArea');
    if (!contentArea) return;
    
    if (!folder.children || Object.keys(folder.children).length === 0) {
        sigShowEmptyState('Esta carpeta está vacía');
        return;
    }

    let html = '<div class="sig-list-view">';
    
    for (const [key, item] of Object.entries(folder.children)) {
        let icon = 'fas fa-folder';
        let itemClass = 'sig-folder-item';
        
        // Determinar el icono según el tipo de archivo
        if (item.type === 'file') {
            itemClass = 'sig-file-item';
            const extension = item.name.split('.').pop().toLowerCase();
            switch(extension) {
                case 'pdf':
                    icon = 'fas fa-file-pdf';
                    break;
                case 'xlsx':
                case 'xls':
                    icon = 'fas fa-file-excel';
                    break;
                case 'doc':
                case 'docx':
                    icon = 'fas fa-file-word';
                    break;
                case 'ppt':
                case 'pptx':
                    icon = 'fas fa-file-powerpoint';
                    break;
                default:
                    icon = 'fas fa-file';
            }
        }
        
        const onClick = item.type === 'folder' ? `sigOpenFolder('${key}')` : '';
        
        html += `
            <div class="${itemClass}" ${onClick ? `onclick="${onClick}"` : ''}>
                <div class="sig-item-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="sig-item-info">
                    <div class="sig-item-name">${item.name}</div>
                    <div class="sig-item-details">
                        ${item.type === 'file' ? 
                            `Tamaño: ${item.size} • Modificado: ${item.modified}` : 
                            `${Object.keys(item.children || {}).length} elementos`
                        }
                    </div>
                </div>
                <div class="sig-item-actions">
                    ${item.type === 'file' ? `
                        <button class="sig-action-btn" onclick="sigViewDocument('${item.name}')">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="sig-action-btn download" onclick="sigDownloadDocument('${item.name}')">
                            <i class="fas fa-download"></i> Descargar
                        </button>
                    ` : `
                        <button class="sig-action-btn" onclick="sigOpenFolder('${key}')">
                            <i class="fas fa-folder-open"></i> Abrir
                        </button>
                    `}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    contentArea.innerHTML = html;
}

// Renderizar vista de cuadrícula
function sigRenderGridView(folder) {
    const contentArea = document.getElementById('sigContentArea');
    if (!contentArea) return;
    
    if (!folder.children || Object.keys(folder.children).length === 0) {
        sigShowEmptyState('Esta carpeta está vacía');
        return;
    }

    let html = '<div class="sig-grid-view">';
    
    for (const [key, item] of Object.entries(folder.children)) {
        const icon = item.type === 'folder' ? 'fas fa-folder' : 'fas fa-file-pdf';
        const itemClass = item.type === 'folder' ? 'folder' : 'file';
        const onClick = item.type === 'folder' ? `sigOpenFolder('${key}')` : `sigViewDocument('${item.name}')`;
        
        html += `
            <div class="sig-grid-item ${itemClass}" onclick="${onClick}">
                <div class="sig-grid-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="sig-grid-name">${item.name}</div>
            </div>
        `;
    }
    
    html += '</div>';
    contentArea.innerHTML = html;
}

// Mostrar estado vacío
function sigShowEmptyState(message) {
    const contentArea = document.getElementById('sigContentArea');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="sig-empty-state">
            <i class="fas fa-folder-open"></i>
            <h3>${message}</h3>
            <p>No hay elementos para mostrar en esta ubicación.</p>
        </div>
    `;
}

// =========================================
// FUNCIONES DE NAVEGACIÓN
// =========================================

// Abrir carpeta
function sigOpenFolder(folderKey) {
    console.log('Opening SIG folder:', folderKey);
    console.log('SIG Current path before:', sigCurrentPath);
    
    const newPath = [...sigCurrentPath, folderKey];
    console.log('SIG New path will be:', newPath);
    
    sigNavigateTo(newPath);
}

// Cambiar vista
function sigSetView(viewType) {
    sigCurrentView = viewType;
    
    // Actualizar botones de vista
    document.querySelectorAll('.sig-view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Encontrar el botón que fue clickeado y marcarlo como activo
    const clickedBtn = event.target.closest('.sig-view-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    sigRenderContent();
}

// Actualizar breadcrumb
function sigUpdateBreadcrumb() {
    const breadcrumbPath = document.getElementById('sigBreadcrumbPath');
    if (!breadcrumbPath) return;
    
    let html = `
        <span class="sig-breadcrumb-item" onclick="sigNavigateTo('root')">
            <i class="fas fa-home"></i> Inicio
        </span>
    `;

    if (sigCurrentPath.length > 1) {
        let currentFolder = sigFileSystem.root;
        for (let i = 1; i < sigCurrentPath.length; i++) {
            const segment = sigCurrentPath[i];
            
            if (currentFolder.children && currentFolder.children[segment]) {
                currentFolder = currentFolder.children[segment];
                const pathUpToSegment = sigCurrentPath.slice(0, i + 1);
                html += `
                    <span class="sig-breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>
                    <span class="sig-breadcrumb-item" onclick="sigNavigateTo(${JSON.stringify(pathUpToSegment)})">
                        ${currentFolder.name}
                    </span>
                `;
            }
        }
    }

    breadcrumbPath.innerHTML = html;
}

// =========================================
// FUNCIONES DE BÚSQUEDA
// =========================================

// Función de búsqueda
function sigPerformSearch() {
    const searchInput = document.getElementById('sigSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Por favor ingresa un término de búsqueda');
        return;
    }

    // Realizar búsqueda en toda la estructura
    sigSearchResults = sigSearchInFileSystem(sigFileSystem.root, searchTerm, []);
    
    // Mostrar resultados
    if (sigSearchResults.length > 0) {
        const contentTitle = document.getElementById('sigContentTitle');
        if (contentTitle) {
            contentTitle.textContent = `Resultados de búsqueda: "${searchTerm}"`;
        }
        sigRenderSearchResults();
    } else {
        sigShowEmptyState(`No se encontraron resultados para "${searchTerm}"`);
        const contentTitle = document.getElementById('sigContentTitle');
        if (contentTitle) {
            contentTitle.textContent = `Sin resultados para "${searchTerm}"`;
        }
    }
}

// Buscar en el sistema de archivos
function sigSearchInFileSystem(folder, searchTerm, currentPath) {
    let results = [];
    
    if (folder.children) {
        for (const [key, item] of Object.entries(folder.children)) {
            const itemPath = [...currentPath, key];
            
            // Verificar si el nombre coincide con el término de búsqueda
            if (item.name.toLowerCase().includes(searchTerm)) {
                results.push({
                    ...item,
                    key: key,
                    path: itemPath,
                    pathString: itemPath.join(' > ')
                });
            }
            
            // Buscar recursivamente en subcarpetas
            if (item.type === 'folder') {
                const subResults = sigSearchInFileSystem(item, searchTerm, itemPath);
                results = results.concat(subResults);
            }
        }
    }
    
    return results;
}

// Renderizar resultados de búsqueda
function sigRenderSearchResults() {
    const contentArea = document.getElementById('sigContentArea');
    if (!contentArea) return;
    
    if (!sigSearchResults || sigSearchResults.length === 0) {
        sigShowEmptyState('No se encontraron resultados');
        return;
    }

    let html = '<div class="sig-list-view">';
    
    sigSearchResults.forEach(item => {
        const icon = item.type === 'folder' ? 'fas fa-folder' : 'fas fa-file-pdf';
        const itemClass = item.type === 'folder' ? 'sig-folder-item' : 'sig-file-item';
        
        html += `
            <div class="${itemClass}">
                <div class="sig-item-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="sig-item-info">
                    <div class="sig-item-name">${item.name}</div>
                    <div class="sig-item-details">
                        Ubicación: ${item.pathString.replace(item.key, '')} • 
                        ${item.type === 'file' ? 
                            `Tamaño: ${item.size} • Modificado: ${item.modified}` : 
                            'Carpeta'
                        }
                    </div>
                </div>
                <div class="sig-item-actions">
                    ${item.type === 'file' ? `
                        <button class="sig-action-btn" onclick="sigViewDocument('${item.name}')">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="sig-action-btn download" onclick="sigDownloadDocument('${item.name}')">
                            <i class="fas fa-download"></i> Descargar
                        </button>
                    ` : `
                        <button class="sig-action-btn" onclick="sigNavigateToPath(${JSON.stringify(item.path)})">
                            <i class="fas fa-folder-open"></i> Ir a carpeta
                        </button>
                    `}
                    <button class="sig-action-btn" onclick="sigClearSearch()">
                        <i class="fas fa-times"></i> Limpiar búsqueda
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contentArea.innerHTML = html;
}

// Navegar a una ruta específica desde los resultados de búsqueda
function sigNavigateToPath(path) {
    sigSearchResults = null;
    sigNavigateTo(path.slice(0, -1)); // Navegar a la carpeta padre
}

// Limpiar búsqueda
function sigClearSearch() {
    sigSearchResults = null;
    const searchInput = document.getElementById('sigSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    sigNavigateTo('root');
}

// =========================================
// FUNCIONES DE DOCUMENTOS
// =========================================

// Ver documento
function sigViewDocument(documentName) {
    // Simular apertura de documento
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <h3 style="color: #113683; margin-bottom: 20px;">
                <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                Documento
            </h3>
            <p style="margin-bottom: 20px; color: #666;">${documentName}</p>
            <p style="margin-bottom: 25px; font-size: 14px; color: #999;">
                En un sistema real, aquí se abriría el visor de PDF o se descargaría el archivo.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="sigDownloadDocument('${documentName}')" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">
                    <i class="fas fa-download"></i> Descargar
                </button>
                <button onclick="this.closest('div').remove()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Descargar documento
function sigDownloadDocument(documentName) {
    // Simular descarga
    const link = document.createElement('a');
    link.href = '#';
    link.download = documentName + '.pdf';
    
    // Mostrar mensaje de descarga
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    message.innerHTML = `
        <i class="fas fa-download"></i> Iniciando descarga de: ${documentName}
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(100%)';
        message.style.transition = 'all 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// =========================================
// FUNCIONES DE ESTADÍSTICAS
// =========================================

// Actualizar estadísticas del SIG
function sigUpdateStatistics() {
    // Contar documentos y carpetas recursivamente
    const stats = sigCountItems(sigFileSystem.root);
    
    const totalDocs = document.getElementById('sigTotalDocs');
    const totalPolicies = document.getElementById('sigTotalPolicies');
    const totalProcedures = document.getElementById('sigTotalProcedures');
    
    if (totalDocs) totalDocs.textContent = stats.files;
    if (totalPolicies) totalPolicies.textContent = stats.policies;
    if (totalProcedures) totalProcedures.textContent = stats.procedures;
}

// Contar elementos en el sistema de archivos
function sigCountItems(folder, path = []) {
    let stats = {
        files: 0,
        folders: 0,
        policies: 0,
        procedures: 0
    };
    
    if (folder.children) {
        for (const [key, item] of Object.entries(folder.children)) {
            if (item.type === 'file') {
                stats.files++;
                
                // Categorizar por tipo
                if (path.includes('politicas')) {
                    stats.policies++;
                } else if (path.includes('procedimientos')) {
                    stats.procedures++;
                }
            } else if (item.type === 'folder') {
                stats.folders++;
                const subStats = sigCountItems(item, [...path, key]);
                stats.files += subStats.files;
                stats.folders += subStats.folders;
                stats.policies += subStats.policies;
                stats.procedures += subStats.procedures;
            }
        }
    }
    
    return stats;
}

// =========================================
// EVENT LISTENERS Y INICIALIZACIÓN
// =========================================

// Manejar teclas de navegación
function sigInitializeKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Cerrar modals
            const modals = document.querySelectorAll('[style*="position: fixed"]');
            modals.forEach(modal => modal.remove());
        }
        
        if (e.key === 'Enter' && e.target.id === 'sigSearchInput') {
            e.preventDefault();
            sigPerformSearch();
        }
        
        if (e.key === 'Backspace' && e.ctrlKey) {
            // Navegar hacia atrás
            if (sigCurrentPath.length > 1) {
                const parentPath = sigCurrentPath.slice(0, -1);
                sigNavigateTo(parentPath);
            }
        }
    });
}

// Inicializar eventos de búsqueda
function sigInitializeSearchEvents() {
    const searchInput = document.getElementById('sigSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sigPerformSearch();
            }
        });
    }
}

// Inicializar drag and drop (simulado)
function sigInitializeDragDrop() {
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        alert('Funcionalidad de arrastrar y soltar: En un sistema real, aquí se cargarían los archivos al SIG.');
    });
}

// =========================================
// FUNCIONES DE UTILIDAD
// =========================================

// Exportar estructura de carpetas (opcional)
function sigExportStructure() {
    const structure = JSON.stringify(sigFileSystem, null, 2);
    const blob = new Blob([structure], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estructura_sig.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Mostrar información del sistema
function sigShowSystemInfo() {
    const stats = sigCountItems(sigFileSystem.root);
    console.log('=== SISTEMA SIG - INFORMACIÓN ===');
    console.log('Total de archivos:', stats.files);
    console.log('Total de carpetas:', stats.folders);
    console.log('Políticas:', stats.policies);
    console.log('Procedimientos:', stats.procedures);
    console.log('Ruta actual:', sigCurrentPath.join(' > '));
    console.log('Vista actual:', sigCurrentView);
}

// =========================================
// INICIALIZACIÓN PRINCIPAL
// =========================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('SIG DOM loaded, initializing app...');
    
    // Verificar si los elementos necesarios existen
    const requiredElements = [
        'sigNavigationTree',
        'sigContentArea',
        'sigContentTitle',
        'sigBreadcrumbPath',
        'sigSearchInput'
    ];
    
    let allElementsPresent = true;
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`SIG: Elemento requerido no encontrado: ${id}`);
            allElementsPresent = false;
        }
    });
    
    if (allElementsPresent) {
        // Inicializar aplicación
        sigInitializeApp();
        
        // Inicializar eventos
        sigInitializeKeyboardEvents();
        sigInitializeSearchEvents();
        sigInitializeDragDrop();
        
        // Actualizar estadísticas
        sigUpdateStatistics();
        
        console.log('SIG: Sistema inicializado correctamente');
        console.log('SIG: Para ver información del sistema, ejecuta: sigShowSystemInfo()');
    } else {
        console.error('SIG: No se puede inicializar, faltan elementos HTML requeridos');
    }
});

// =========================================
// FUNCIONES GLOBALES ADICIONALES (OPCIONAL)
// =========================================

// Función para integración con otros sistemas
function sigGetCurrentState() {
    return {
        currentPath: sigCurrentPath,
        currentView: sigCurrentView,
        searchResults: sigSearchResults,
        totalFiles: sigCountItems(sigFileSystem.root).files
    };
}

// Función para navegar programáticamente
function sigNavigateToFolder(folderPath) {
    if (typeof folderPath === 'string') {
        folderPath = folderPath.split('/');
    }
    
    if (folderPath[0] !== 'root') {
        folderPath.unshift('root');
    }
    
    sigNavigateTo(folderPath);
}

// Función para buscar programáticamente
function sigSearchFor(term) {
    const searchInput = document.getElementById('sigSearchInput');
    if (searchInput) {
        searchInput.value = term;
        sigPerformSearch();
    }
}

// =========================================
// DEBUGGING Y DESARROLLO
// =========================================

// Solo para desarrollo - remover en producción
if (typeof console !== 'undefined') {
    console.log('SIG Police.js cargado correctamente');
    console.log('Funciones disponibles:');
    console.log('- sigNavigateTo(path): Navegar a una ruta');
    console.log('- sigSearchFor(term): Buscar documentos');
    console.log('- sigShowSystemInfo(): Mostrar información del sistema');
    console.log('- sigGetCurrentState(): Obtener estado actual');
}