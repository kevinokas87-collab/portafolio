document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ========== Menú hamburguesa ========== */
    const header = document.querySelector('.header');
    const botonMenu = document.getElementById('hamburguesa');
    const menu = document.getElementById('nav-menu');
    const iconoMenu = botonMenu ? botonMenu.querySelector('.hamburguesa-icono') : null;
    const consultaMovil = window.matchMedia('(max-width: 768px)');

    if (botonMenu && menu) {
        const estaAbierto = () => menu.classList.contains('active');

        const cambiarMenu = (abrir) => {
            menu.classList.toggle('active', abrir);
            botonMenu.setAttribute('aria-expanded', String(abrir));
            botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
            if (iconoMenu) {
                iconoMenu.textContent = abrir ? '\u2715' : '\u2630'; // ✕ / ☰
            }
        };

        botonMenu.addEventListener('click', () => cambiarMenu(!estaAbierto()));

        // Cerrar al tocar un enlace del menú
        menu.querySelectorAll('a').forEach((enlace) => {
            enlace.addEventListener('click', () => cambiarMenu(false));
        });

        // Cerrar con la tecla Escape y devolver el foco al botón
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && estaAbierto()) {
                cambiarMenu(false);
                botonMenu.focus();
            }
        });

        // Cerrar al hacer clic fuera del header
        document.addEventListener('click', (evento) => {
            if (estaAbierto() && header && !header.contains(evento.target)) {
                cambiarMenu(false);
            }
        });

        // Al pasar a pantalla de PC, dejar el menú en estado cerrado
        consultaMovil.addEventListener('change', () => cambiarMenu(false));
    }

    /* ========== Efecto parallax ========== */
    const parallaxBg = document.getElementById('parallax-projects-bg');
    const parallaxSection = document.getElementById('parallax-projects');

    if (parallaxBg && parallaxSection && !prefersReducedMotion) {
        const VELOCIDAD = 0.18;      // qué tanto "se queda atrás" la imagen respecto al scroll
        let visible = false;
        let pendiente = false;

        const actualizar = () => {
            pendiente = false;

            const rect = parallaxSection.getBoundingClientRect();
            // Distancia entre el centro de la sección y el centro de la pantalla
            const desfase = rect.top + rect.height / 2 - window.innerHeight / 2;
            // La imagen tiene 20% extra arriba y abajo: no se puede mover más que eso
            const maximo = rect.height * 0.2;
            const y = Math.max(-maximo, Math.min(maximo, -desfase * VELOCIDAD));

            parallaxBg.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        };

        const pedirActualizacion = () => {
            if (visible && !pendiente) {
                pendiente = true;
                requestAnimationFrame(actualizar);
            }
        };

        // Solo se calcula mientras la sección está en pantalla
        const observador = new IntersectionObserver((entradas) => {
            visible = entradas[0].isIntersecting;
            pedirActualizacion();
        }, { rootMargin: '100px 0px' });

        observador.observe(parallaxSection);
        window.addEventListener('scroll', pedirActualizacion, { passive: true });
        window.addEventListener('resize', pedirActualizacion);
    }

    /* ========== Aparición de la sección de proyectos ========== */
    const contenedorProyectos = document.querySelector('.project-container');

    if (contenedorProyectos) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            return; // sin animación: el contenido queda visible
        }

        contenedorProyectos.classList.add('reveal');

        const observadorProyectos = new IntersectionObserver((entradas, obs) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                    obs.unobserve(entrada.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px' });

        observadorProyectos.observe(contenedorProyectos);
    }
});
