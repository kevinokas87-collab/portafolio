document.addEventListener('DOMContentLoaded', () => {
    const parallaxBg = document.getElementById('parallax-projects-bg');
    const parallaxSection = document.getElementById('parallax-projects');
    const projectsSection = document.getElementById('proyectos');

    window.addEventListener('scroll', () => {
    if (!parallaxSection) return;
    const rect = parallaxSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const speed = 0.3;  desplazamiento
      const yPos = (window.scrollY - parallaxSection.offsetTop) * speed;
      parallaxBg.style.transform = translate3d(0, $(yPos), 0);
    }
  });
        
})

    

    