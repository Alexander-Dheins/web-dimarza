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
                    'politica_seguridad_salud_oc': {
                        type: 'folder',
                        name: '1. POLÍTICA DE SEGURIDAD Y SALUD OC',
                        children: {
                            'politica_seguridad_salud_oc.pdf': {
                                type: 'file',
                                name: 'Política de Seguridad y Salud Ocupacional.pdf',
                                size: '2.1 MB',
                                modified: '5/8/2025'
                            },
                            'procedimiento_sso.doc': {
                                type: 'file',
                                name: 'Procedimiento de SSO.doc',
                                size: '1.8 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_medio_ambiente': {
                        type: 'folder',
                        name: '2. POLÍTICA DE MEDIO AMBIENTE',
                        children: {
                            'politica_medio_ambiente.pdf': {
                                type: 'file',
                                name: 'Política de Medio Ambiente.pdf',
                                size: '1.8 MB',
                                modified: '5/8/2025'
                            },
                            'manual_ambiental.doc': {
                                type: 'file',
                                name: 'Manual de Gestión Ambiental.doc',
                                size: '2.2 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_calidad': {
                        type: 'folder',
                        name: '3. POLÍTICA DE CALIDAD',
                        children: {
                            'politica_calidad.pdf': {
                                type: 'file',
                                name: 'Política de Calidad.pdf',
                                size: '1.9 MB',
                                modified: '5/8/2025'
                            },
                            'manual_calidad.doc': {
                                type: 'file',
                                name: 'Manual de Calidad ISO 9001.doc',
                                size: '3.1 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_responsabilidad_social': {
                        type: 'folder',
                        name: '4. POLÍTICA DE RESPONSABILIDAD SOCIAL',
                        children: {
                            'politica_responsabilidad_social.pdf': {
                                type: 'file',
                                name: 'Política de Responsabilidad Social.pdf',
                                size: '2.2 MB',
                                modified: '5/8/2025'
                            },
                            'plan_responsabilidad_social.doc': {
                                type: 'file',
                                name: 'Plan de Responsabilidad Social.doc',
                                size: '1.9 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_alcohol_drogas': {
                        type: 'folder',
                        name: '5. POLÍTICA DE ALCOHOL Y DROGAS',
                        children: {
                            'politica_alcohol_drogas.pdf': {
                                type: 'file',
                                name: 'Política de Alcohol y Drogas.pdf',
                                size: '1.7 MB',
                                modified: '5/8/2025'
                            },
                            'procedimiento_control_sustancias.doc': {
                                type: 'file',
                                name: 'Procedimiento de Control de Sustancias.doc',
                                size: '1.5 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_anticorrupcion': {
                        type: 'folder',
                        name: '6. POLÍTICA DE ANTICORRUPCIÓN',
                        children: {
                            'politica_anticorrupcion.pdf': {
                                type: 'file',
                                name: 'Política de Anticorrupción.pdf',
                                size: '2.0 MB',
                                modified: '5/8/2025'
                            },
                            'codigo_etica.doc': {
                                type: 'file',
                                name: 'Código de Ética.doc',
                                size: '1.8 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_negativa_responsable': {
                        type: 'folder',
                        name: '7. POLÍTICA DE NEGATIVA RESPONSABLE',
                        children: {
                            'politica_negativa_responsable.pdf': {
                                type: 'file',
                                name: 'Política de Negativa Responsable.pdf',
                                size: '1.6 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_relaciones_comunitarias': {
                        type: 'folder',
                        name: '8. POLÍTICA DE RELACIONES COMUNITARIAS',
                        children: {
                            'politica_relaciones_comunitarias.pdf': {
                                type: 'file',
                                name: 'Política de Relaciones Comunitarias.pdf',
                                size: '2.3 MB',
                                modified: '5/8/2025'
                            },
                            'plan_relaciones_comunitarias.doc': {
                                type: 'file',
                                name: 'Plan de Relaciones Comunitarias.doc',
                                size: '2.1 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_derechos_abierta': {
                        type: 'folder',
                        name: '9. POLÍTICA DE DERECHOS ABIERTA',
                        children: {
                            'politica_derechos_abierta.pdf': {
                                type: 'file',
                                name: 'Política de Derechos Abierta.pdf',
                                size: '1.9 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_prevencion_accidentes': {
                        type: 'folder',
                        name: '10. POLÍTICA DE PREVENCIÓN DE ACCIDENTES',
                        children: {
                            'politica_prevencion_accidentes.pdf': {
                                type: 'file',
                                name: 'Política de Prevención de Accidentes.pdf',
                                size: '2.1 MB',
                                modified: '5/8/2025'
                            },
                            'procedimiento_investigacion_accidentes.doc': {
                                type: 'file',
                                name: 'Procedimiento de Investigación de Accidentes.doc',
                                size: '1.7 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_prevencion_sanciones': {
                        type: 'folder',
                        name: '11. POLÍTICA DE PREVENCIÓN Y SANCIONES',
                        children: {
                            'politica_prevencion_sanciones.pdf': {
                                type: 'file',
                                name: 'Política de Prevención y Sanciones.pdf',
                                size: '1.8 MB',
                                modified: '5/8/2025'
                            },
                            'reglamento_disciplinario.doc': {
                                type: 'file',
                                name: 'Reglamento Disciplinario.doc',
                                size: '2.0 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_respuesta_emergencias': {
                        type: 'folder',
                        name: '12. POLÍTICA DE RESPUESTA A EMERGENCIAS',
                        children: {
                            'politica_respuesta_emergencias.pdf': {
                                type: 'file',
                                name: 'Política de Respuesta a Emergencias.pdf',
                                size: '2.4 MB',
                                modified: '5/8/2025'
                            },
                            'plan_emergencias.doc': {
                                type: 'file',
                                name: 'Plan de Emergencias.doc',
                                size: '3.1 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_respuesta_emergencias_del': {
                        type: 'folder',
                        name: '13. POLÍTICA DE RESPUESTA A EMERGENCIAS DEL',
                        children: {
                            'politica_respuesta_emergencias_del.pdf': {
                                type: 'file',
                                name: 'Política de Respuesta a Emergencias DEL.pdf',
                                size: '2.2 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_prevencion_enfermedades': {
                        type: 'folder',
                        name: '14. POLÍTICA PREVENCIÓN DE ENFERMEDADES',
                        children: {
                            'politica_prevencion_enfermedades.pdf': {
                                type: 'file',
                                name: 'Política Prevención de Enfermedades.pdf',
                                size: '1.9 MB',
                                modified: '5/8/2025'
                            },
                            'plan_salud_ocupacional.doc': {
                                type: 'file',
                                name: 'Plan de Salud Ocupacional.doc',
                                size: '2.3 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_derechos_humanos': {
                        type: 'folder',
                        name: '15. POLÍTICA DERECHOS HUMANOS',
                        children: {
                            'politica_derechos_humanos.pdf': {
                                type: 'file',
                                name: 'Política Derechos Humanos.pdf',
                                size: '2.0 MB',
                                modified: '5/8/2025'
                            },
                            'manual_derechos_humanos.doc': {
                                type: 'file',
                                name: 'Manual de Derechos Humanos.doc',
                                size: '1.8 MB',
                                modified: '5/8/2025'
                            }
                        }
                    },
                    'politica_diversidad_inclusion': {
                        type: 'folder',
                        name: '16. POLÍTICA DE DIVERSIDAD E INCLUSIÓN',
                        children: {
                            'politica_diversidad_inclusion.pdf': {
                                type: 'file',
                                name: 'Política de Diversidad e Inclusión.pdf',
                                size: '1.7 MB',
                                modified: '5/8/2025'
                            },
                            'programa_diversidad.doc': {
                                type: 'file',
                                name: 'Programa de Diversidad.doc',
                                size: '1.6 MB',
                                modified: '5/8/2025'
                            }
                        }
                    }
                }
            },
            /*'documentos_sig': {
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
            },*/
            /*'gestion_procesos': {
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
            },*/
            /*'indicadores': {
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
            },*/
            /*'procedimientos': {
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
            }*/
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
        const onClick = item.type === 'folder' ? `sigOpenFolder('${key}')` : `sigViewDocument('${item.name}', event)`;
        
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

// Función para obtener la ruta del documento según la categoría
function sigGetDocumentPath(documentName, currentPath = sigCurrentPath) {
    console.log('Building path for:', documentName);
    console.log('Current path:', currentPath);
    
    // Ruta base donde están los documentos en tu servidor
    const basePath = '/public/documentos_sig';
    
    // Mapeo directo basado en tu estructura real
    const categoryFolders = {
        'politica_seguridad_salud_oc': 'politicas/1_politica_seguridad_salud_oc',
        'politica_medio_ambiente': 'politicas/2_politica_medio_ambiente',
        'politica_calidad': 'politicas/3_politica_calidad',
        'politica_responsabilidad_social': 'politicas/4_politica_responsabilidad_social',
        'politica_alcohol_drogas': 'politicas/5_politica_alcohol_drogas',
        'politica_anticorrupcion': 'politicas/6_politica_anticorrupcion',
        'politica_negativa_responsable': 'politicas/7_politica_negativa_responsable',
        'politica_relaciones_comunitarias': 'politicas/8_politica_relaciones_comunitarias',
        'politica_derechos_abierta': 'politicas/9_politica_derechos_abierta',
        'politica_prevencion_accidentes': 'politicas/10_politica_prevencion_accidentes',
        'politica_prevencion_sanciones': 'politicas/11_politica_prevencion_sanciones',
        'politica_respuesta_emergencias': 'politicas/12_politica_respuesta_emergencias',
        'politica_respuesta_emergencias_del': 'politicas/13_politica_respuesta_emergencias_del',
        'politica_prevencion_enfermedades': 'politicas/14_politica_prevencion_enfermedades',
        'politica_derechos_humanos': 'politicas/15_politica_derechos_humanos',
        'politica_diversidad_inclusion': 'politicas/16_politica_diversidad_inclusion',
        'documentos_sig': 'documentos_generales',
        'gestion_procesos': 'gestion_procesos',
        'indicadores': 'indicadores_gestion',
        'procedimientos': 'procedimientos_internos',
        'gestion_direccion': 'procedimientos_internos/gestion_direccion',
        'gestion_administrativa': 'procedimientos_internos/gestion_administrativa',
        'gestion_personal': 'procedimientos_internos/gestion_personal'
    };

    // Construir la ruta basada en el path actual
    let folderPath = 'documentos_generales'; // Carpeta base por defecto
    
    if (currentPath.length > 2) {
        // Estamos dentro de una subcarpeta específica (ej: dentro de una política)
        const subCategory = currentPath[2];
        folderPath = categoryFolders[subCategory] || 'otros';
    } else if (currentPath.length > 1) {
        // Estamos en la categoría principal
        const mainCategory = currentPath[1];
        folderPath = categoryFolders[mainCategory] || 'otros';
    }

    // Mapeo de nombres de archivos a nombres reales en el servidor
    const fileMapping = {
        // Política 1 - Seguridad y Salud Ocupacional
        'Política de Seguridad y Salud Ocupacional.pdf': 'política_de_seguridad_y_salud_ocupacional.pdf',
        'Procedimiento de SSO.doc': 'procedimiento_de_sso.doc',
        
        // Política 2 - Medio Ambiente
        'Política de Medio Ambiente.pdf': 'política_de_medio_ambiente.pdf',
        'Manual de Gestión Ambiental.doc': 'manual_de_gestión_ambiental.doc',
        
        // Política 3 - Calidad
        'Política de Calidad.pdf': 'política_de_calidad.pdf',
        'Manual de Calidad ISO 9001.doc': 'manual_de_calidad_iso_9001.doc',
        
        // Política 4 - Responsabilidad Social
        'Política de Responsabilidad Social.pdf': 'política_de_responsabilidad_social.pdf',
        'Plan de Responsabilidad Social.doc': 'plan_de_responsabilidad_social.doc',
        
        // Política 5 - Alcohol y Drogas
        'Política de Alcohol y Drogas.pdf': 'política_de_alcohol_y_drogas.pdf',
        'Procedimiento de Control de Sustancias.doc': 'procedimiento_de_control_de_sustancias.doc',
        
        // Política 6 - Anticorrupción
        'Política de Anticorrupción.pdf': 'política_de_anticorrupción.pdf',
        'Código de Ética.doc': 'código_de_ética.doc',
        
        // Política 7 - Negativa Responsable
        'Política de Negativa Responsable.pdf': 'política_de_negativa_responsable.pdf',
        
        // Política 8 - Relaciones Comunitarias
        'Política de Relaciones Comunitarias.pdf': 'política_de_relaciones_comunitarias.pdf',
        'Plan de Relaciones Comunitarias.doc': 'plan_de_relaciones_comunitarias.doc',
        
        // Política 9 - Derechos Abierta
        'Política de Derechos Abierta.pdf': 'política_de_derechos_abierta.pdf',
        
        // Política 10 - Prevención de Accidentes
        'Política de Prevención de Accidentes.pdf': 'política_de_prevención_de_accidentes.pdf',
        'Procedimiento de Investigación de Accidentes.doc': 'procedimiento_de_investigación_de_accidentes.doc',
        
        // Política 11 - Prevención y Sanciones
        'Política de Prevención y Sanciones.pdf': 'política_de_prevención_y_sanciones.pdf',
        'Reglamento Disciplinario.doc': 'reglamento_disciplinario.doc',
        
        // Política 12 - Respuesta a Emergencias
        'Política de Respuesta a Emergencias.pdf': 'política_de_respuesta_a_emergencias.pdf',
        'Plan de Emergencias.doc': 'plan_de_emergencias.doc',
        
        // Política 13 - Respuesta a Emergencias DEL
        'Política de Respuesta a Emergencias DEL.pdf': 'política_de_respuesta_a_emergencias_del.pdf',
        
        // Política 14 - Prevención de Enfermedades
        'Política Prevención de Enfermedades.pdf': 'política_prevención_de_enfermedades.pdf',
        'Plan de Salud Ocupacional.doc': 'plan_de_salud_ocupacional.doc',
        
        // Política 15 - Derechos Humanos
        'Política Derechos Humanos.pdf': 'política_derechos_humanos.pdf',
        'Manual de Derechos Humanos.doc': 'manual_de_derechos_humanos.doc',
        
        // Política 16 - Diversidad e Inclusión
        'Política de Diversidad e Inclusión.pdf': 'política_de_diversidad_e_inclusión.pdf',
        'Programa de Diversidad.doc': 'programa_de_diversidad.doc'
    };

    // Obtener el nombre real del archivo
    const realFileName = fileMapping[documentName] || documentName.replace(/\s+/g, '_').toLowerCase();
    
    // Construir la ruta completa
    const fullPath = `${basePath}/${folderPath}/${realFileName}`;
    
    console.log('Generated path:', fullPath);
    return fullPath;
}

// Ver documento - Abrir en nueva pestaña
function sigViewDocument(documentName, event) {
    // Prevenir propagación del evento si se llamó desde un click
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const documentPath = sigGetDocumentPath(documentName);
    
    console.log('=== DEBUG VIEW DOCUMENT ===');
    console.log('Document name:', documentName);
    console.log('Current path:', sigCurrentPath);
    console.log('Generated path:', documentPath);
    console.log('============================');
    
    // Verificar si el archivo existe antes de intentar abrirlo
    fetch(documentPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ File exists, opening...');
                // Abrir en nueva pestaña
                const newWindow = window.open(documentPath, '_blank');
                
                // Verificar si se pudo abrir la ventana (bloqueador de popups)
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    // Si no se puede abrir en nueva pestaña, mostrar modal con opciones
                    sigShowDocumentModal(documentName, documentPath);
                } else {
                    // Mostrar mensaje de confirmación
                    sigShowMessage(`Abriendo documento: ${documentName}`, 'success');
                }
            } else {
                console.log('❌ File not found:', response.status);
                sigShowMessage(`Error: Documento no encontrado en el servidor`, 'error');
                sigShowDocumentModal(documentName, documentPath);
            }
        })
        .catch(error => {
            console.log('❌ Error checking file:', error);
            sigShowMessage(`Error al verificar el documento`, 'error');
            sigShowDocumentModal(documentName, documentPath);
        });
}

// Descargar documento - Descarga real
function sigDownloadDocument(documentName, event) {
    // Prevenir propagación del evento si se llamó desde un click
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const documentPath = sigGetDocumentPath(documentName);
    
    console.log('=== DEBUG DOWNLOAD DOCUMENT ===');
    console.log('Document name:', documentName);
    console.log('Current path:', sigCurrentPath);
    console.log('Generated path:', documentPath);
    console.log('===============================');
    
    // Verificar si el archivo existe antes de intentar descargarlo
    fetch(documentPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ File exists, starting download...');
                
                // Crear elemento de descarga
                const link = document.createElement('a');
                link.href = documentPath;
                link.download = documentName; // Nombre sugerido para la descarga
                link.style.display = 'none';
                
                // Agregar al DOM temporalmente
                document.body.appendChild(link);
                
                // Simular click para iniciar descarga
                link.click();
                
                // Remover del DOM
                document.body.removeChild(link);
                
                // Mostrar mensaje de confirmación
                sigShowMessage(`Iniciando descarga: ${documentName}`, 'download');
            } else {
                console.log('❌ File not found for download:', response.status);
                sigShowMessage(`Error: Documento no encontrado en el servidor`, 'error');
            }
        })
        .catch(error => {
            console.log('❌ Error checking file for download:', error);
            sigShowMessage(`Error al verificar el documento para descarga`, 'error');
        });
}

// Modal mejorado para visualización de documentos
function sigShowDocumentModal(documentName, documentPath) {
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
            max-width: 600px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <h3 style="color: #113683; margin-bottom: 20px;">
                <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                Visualizar Documento
            </h3>
            <p style="margin-bottom: 20px; color: #666; font-weight: bold;">${documentName}</p>
            <p style="margin-bottom: 25px; font-size: 14px; color: #999;">
                Ruta del documento: ${documentPath}
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="window.open('${documentPath}', '_blank'); this.closest('[style*=\"position: fixed\"]').remove();" style="
                    background: #113683;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 5px;
                ">
                    <i class="fas fa-external-link-alt"></i> Abrir en Nueva Pestaña
                </button>
                <button onclick="sigDownloadDocument('${documentName}'); this.closest('[style*=\"position: fixed\"]').remove();" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 5px;
                ">
                    <i class="fas fa-download"></i> Descargar
                </button>
                <button onclick="navigator.clipboard.writeText('${documentPath}'); sigShowMessage('Ruta copiada al portapapeles', 'info');" style="
                    background: #17a2b8;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 5px;
                ">
                    <i class="fas fa-copy"></i> Copiar Ruta
                </button>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 5px;
                ">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; font-size: 12px; color: #666;">
                <strong>Nota:</strong> Si el documento no se abre, verifica que la ruta del archivo sea correcta en tu servidor.
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

// Función mejorada para mostrar mensajes
function sigShowMessage(message, type = 'info', duration = 3000) {
    const colors = {
        'success': '#28a745',
        'download': '#28a745', 
        'info': '#17a2b8',
        'warning': '#ffc107',
        'error': '#dc3545'
    };

    const icons = {
        'success': 'fas fa-check-circle',
        'download': 'fas fa-download',
        'info': 'fas fa-info-circle', 
        'warning': 'fas fa-exclamation-triangle',
        'error': 'fas fa-times-circle'
    };
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10001;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    messageDiv.innerHTML = `
        <i class="${icons[type] || icons.info}" style="margin-right: 8px;"></i>
        ${message}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        messageDiv.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, duration);
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

// Función para verificar todas las rutas de documentos
function sigCheckAllDocumentPaths() {
    console.log('=== VERIFICACIÓN DE RUTAS DE DOCUMENTOS ===');
    
    function checkFolder(folder, path = []) {
        if (folder.children) {
            for (const [key, item] of Object.entries(folder.children)) {
                if (item.type === 'file') {
                    // Simular la ruta actual para este archivo
                    const testPath = ['root', ...path, key];
                    const originalPath = sigCurrentPath;
                    sigCurrentPath = testPath;
                    
                    const documentPath = sigGetDocumentPath(item.name);
                    
                    console.log('---');
                    console.log('Archivo:', item.name);
                    console.log('Ruta simulada:', testPath);
                    console.log('URL generada:', documentPath);
                    
                    // Restaurar ruta original
                    sigCurrentPath = originalPath;
                } else if (item.type === 'folder') {
                    checkFolder(item, [...path, key]);
                }
            }
        }
    }
    
    checkFolder(sigFileSystem.root);
    console.log('=== FIN VERIFICACIÓN ===');
}

// Función para verificar un archivo específico
function sigTestDocumentPath(documentName, pathArray) {
    const originalPath = sigCurrentPath;
    sigCurrentPath = pathArray;
    
    const documentPath = sigGetDocumentPath(documentName);
    
    console.log('=== TEST DOCUMENTO ESPECÍFICO ===');
    console.log('Documento:', documentName);
    console.log('Path usado:', pathArray);
    console.log('URL generada:', documentPath);
    console.log('================================');
    
    sigCurrentPath = originalPath;
    return documentPath;
}

// Solo para desarrollo - remover en producción
if (typeof console !== 'undefined') {
    console.log('SIG Police.js cargado correctamente');
    console.log('Funciones disponibles:');
    console.log('- sigNavigateTo(path): Navegar a una ruta');
    console.log('- sigSearchFor(term): Buscar documentos');
    console.log('- sigShowSystemInfo(): Mostrar información del sistema');
    console.log('- sigGetCurrentState(): Obtener estado actual');
    console.log('- sigCheckAllDocumentPaths(): Verificar todas las rutas');
    console.log('- sigTestDocumentPath(name, path): Probar ruta específica');
    
    // Ejemplos de uso para debugging
    console.log('\n=== EJEMPLOS DE USO PARA DEBUG ===');
    console.log('sigTestDocumentPath("Política de Calidad.pdf", ["root", "politicas", "politica_calidad"])');
    console.log('sigCheckAllDocumentPaths()');
}