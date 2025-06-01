document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#menuIzqOpciones a');
    const contentSections = document.querySelectorAll('.content-section');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Obtener el id de la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostrar la sección seleccionada
            const selectedSection = document.getElementById(`${sectionId}-content`);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }
        });
    });
});