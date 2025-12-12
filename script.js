// ===== NAVEGACIÓN ENTRE PESTAÑAS =====
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Función para cambiar de pestaña
    function switchTab(targetId) {
        // Remover clase active de todos los enlaces y contenidos
        navLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Añadir clase active al enlace y contenido correspondiente
        const activeLink = document.querySelector(`[data-tab="${targetId}"]`);
        const activeContent = document.getElementById(targetId);
        
        if (activeLink && activeContent) {
            activeLink.classList.add('active');
            activeContent.classList.add('active');
            
            // Scroll suave al inicio de la sección
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Añadir event listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Actualizar URL sin recargar la página
            history.pushState(null, '', `#${targetTab}`);
        });
    });
    
    // Manejar navegación con botones del navegador (atrás/adelante)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash);
        } else {
            switchTab('acceso');
        }
    });
    
    // Cargar la pestaña correcta al cargar la página
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        switchTab(initialHash);
    }
    
    // ===== SIMULADOR DE PUNTUACIÓN =====
    const calcularBtn = document.getElementById('calcular-btn');
    const resultadoSimulador = document.getElementById('resultado-simulador');
    
    if (calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            // Obtener valores de los inputs
            const mesesSNS = parseFloat(document.getElementById('meses-sns').value) || 0;
            const mesesOtros = parseFloat(document.getElementById('meses-otros').value) || 0;
            const mesesPrivado = parseFloat(document.getElementById('meses-privado').value) || 0;
            const creditosOrdinarios = parseFloat(document.getElementById('creditos-ordinarios').value) || 0;
            const creditosECTS = parseFloat(document.getElementById('creditos-ects').value) || 0;
            const ejerciciosOposicion = parseFloat(document.getElementById('ejercicios-oposicion').value) || 0;
            
            // Calcular puntuaciones
            const puntosExperiencia = (mesesSNS * 0.30) + (mesesOtros * 0.25) + (mesesPrivado * 0.10);
            const puntosFormacion = (creditosOrdinarios * 0.20) + (creditosECTS * 0.50);
            const puntosOposicion = Math.min(ejerciciosOposicion, 3) * 5; // Máximo 3 ejercicios
            const puntosTotal = puntosExperiencia + puntosFormacion + puntosOposicion;
            
            // Mostrar resultados
            document.getElementById('puntos-experiencia').textContent = puntosExperiencia.toFixed(2);
            document.getElementById('puntos-formacion').textContent = puntosFormacion.toFixed(2);
            document.getElementById('puntos-oposicion').textContent = puntosOposicion.toFixed(2);
            document.getElementById('puntos-total').textContent = puntosTotal.toFixed(2);
            
            // Mostrar el contenedor de resultados con animación
            resultadoSimulador.style.display = 'block';
            resultadoSimulador.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Añadir efecto visual al resultado
            resultadoSimulador.style.animation = 'none';
            setTimeout(() => {
                resultadoSimulador.style.animation = 'fadeIn 0.5s ease-in';
            }, 10);
        });
    }
    
    // ===== VALIDACIÓN DE INPUTS =====
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Asegurar que no se ingresen valores negativos
            if (this.value < 0) {
                this.value = 0;
            }
            
            // Validar el máximo para ejercicios de oposición
            if (this.id === 'ejercicios-oposicion' && this.value > 3) {
                this.value = 3;
            }
        });
    });
    
    // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si no es un enlace de navegación principal
            if (!this.classList.contains('nav-link') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== HIGHLIGHT DE INFORMACIÓN IMPORTANTE =====
    // Añadir efecto de resaltado a elementos con clase "highlight"
    const highlightElements = document.querySelectorAll('.highlight');
    
    highlightElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===== TOOLTIPS PARA TABLAS =====
    // Añadir información adicional al pasar el mouse sobre las filas de las tablas
    const tableRows = document.querySelectorAll('.baremo-table tbody tr, .sanciones-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // ===== ANIMACIÓN DE ENTRADA PARA CARDS =====
    // Observador de intersección para animar cards cuando entran en el viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // ===== BOTÓN VOLVER ARRIBA =====
    // Crear botón de volver arriba dinámicamente
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary, #0066cc);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Funcionalidad del botón
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--color-primary-dark, #004d99)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--color-primary, #0066cc)';
        this.style.transform = 'scale(1)';
    });
    
    // ===== ALMACENAMIENTO LOCAL PARA EL SIMULADOR =====
    // Guardar valores del simulador en localStorage
    const simulatorInputs = document.querySelectorAll('.simulator-form input[type="number"]');
    
    // Cargar valores guardados al iniciar
    simulatorInputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;
        }
        
        // Guardar valores cuando cambien
        input.addEventListener('change', function() {
            localStorage.setItem(this.id, this.value);
        });
    });
    
    // Añadir botón para limpiar el simulador
    if (calcularBtn) {
        const limpiarBtn = document.createElement('button');
        limpiarBtn.textContent = 'Limpiar Formulario';
        limpiarBtn.className = 'btn-primary';
        limpiarBtn.style.marginTop = '10px';
        limpiarBtn.style.backgroundColor = '#6c757d';
        
        limpiarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Limpiar todos los inputs
            simulatorInputs.forEach(input => {
                input.value = 0;
                localStorage.removeItem(input.id);
            });
            
            // Ocultar resultados
            resultadoSimulador.style.display = 'none';
        });
        
        calcularBtn.parentNode.insertBefore(limpiarBtn, calcularBtn.nextSibling);
    }
    
    // ===== ACCESIBILIDAD: NAVEGACIÓN POR TECLADO =====
    // Mejorar la navegación por teclado en las pestañas
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % navLinks.length;
                navLinks[newIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[newIndex].focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                navLinks[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                navLinks[navLinks.length - 1].focus();
            }
        });
    });
    
    // ===== IMPRESIÓN OPTIMIZADA =====
    // Expandir todas las secciones antes de imprimir
    window.addEventListener('beforeprint', function() {
        tabContents.forEach(content => {
            content.classList.add('active');
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Restaurar el estado original después de imprimir
        const currentHash = window.location.hash.substring(1) || 'acceso';
        switchTab(currentHash);
    });
    
    // ===== MENSAJES DE AYUDA CONTEXTUALES =====
    // Añadir tooltips informativos a elementos específicos
    const tooltipElements = [
        {
            selector: '#ejercicios-oposicion',
            message: 'Máximo 3 ejercicios (15 puntos)'
        }
    ];
    
    tooltipElements.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.setAttribute('title', item.message);
        }
    });
    
    // ===== DETECCIÓN DE CAMBIOS EN FORMULARIO =====
    // Alertar si hay cambios sin calcular en el simulador
    let formChanged = false;
    
    simulatorInputs.forEach(input => {
        input.addEventListener('input', function() {
            formChanged = true;
        });
    });
    
    if (calcularBtn) {
        calcularBtn.addEventListener('click', function() {
            formChanged = false;
        });
    }
    
    // Advertir al cambiar de pestaña si hay cambios sin calcular
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (formChanged && !confirm('Tienes cambios sin calcular en el simulador. ¿Deseas continuar sin calcular?')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    });
    
    // ===== ESTADÍSTICAS DE USO (OPCIONAL) =====
    // Contador de visitas a cada pestaña (solo en sesión actual)
    const tabStats = {
        acceso: 0,
        puntuacion: 0,
        llamamientos: 0,
        penalizaciones: 0
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            if (tabStats[tab] !== undefined) {
                tabStats[tab]++;
            }
        });
    });
    
    // Registrar visita inicial
    const initialTab = window.location.hash.substring(1) || 'acceso';
    if (tabStats[initialTab] !== undefined) {
        tabStats[initialTab]++;
    }
    
    // ===== MODO OSCURO (OPCIONAL - COMENTADO) =====
    /*
    // Descomentar para activar el modo oscuro
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #343a40;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    */
    
    console.log('Guía Rápida BAPE SACYL - Sistema inicializado correctamente');
});
