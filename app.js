document.addEventListener("DOMContentLoaded", function() {
 
  // ANIMACIONES DE APARICIÓN (SCROLL)
  const elementosAnimar = document.querySelectorAll('.animar-scroll');
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  elementosAnimar.forEach(elemento => { observador.observe(elemento); });

  //CARRUSEL INFINITO DE TECNOLOGÍAS
  const track = document.getElementById('track-tecnologias');
  if(track) {

    track.innerHTML += track.innerHTML; 
    let posicion = 0;
    
    function moverCarrusel() {
      posicion -= 1; // Velocidad del carrusel

      if (Math.abs(posicion) >= track.scrollWidth / 2) { 
        posicion = 0; 
      }
      track.style.transform = `translateX(${posicion}px)`;
      requestAnimationFrame(moverCarrusel);
    }
    
    moverCarrusel();
    

    track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  }

  //VENTANAS EMERGENTES
  const btnDescargarCv = document.getElementById('btn-descargar-cv');
  const modalCv = document.getElementById('modal-cv');
  const btnCerrarCv = document.getElementById('cerrar-cv');

  const btnLeerBlog = document.getElementById('btn-leer-blog');
  const modalBlog = document.getElementById('modal-blog');
  const btnCerrarBlog = document.getElementById('cerrar-blog');

  // Acción para el CV 
  if(btnDescargarCv) {
    btnDescargarCv.addEventListener('click', function(e) {
      e.preventDefault();
      
      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = 'assets/CV_Joyce_Martinez.pdf';
      enlaceDescarga.download = 'CV_Joyce_Martinez.pdf';
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
      
      
      modalCv.classList.add('mostrar');
    });
  }

  // Acción para abrir el Blog
  if(btnLeerBlog) {
    btnLeerBlog.addEventListener('click', function(e) {
      e.preventDefault();
      modalBlog.classList.add('mostrar');
    });
  }

  
  if(btnCerrarCv) btnCerrarCv.addEventListener('click', () => modalCv.classList.remove('mostrar'));
  if(btnCerrarBlog) btnCerrarBlog.addEventListener('click', () => modalBlog.classList.remove('mostrar'));
  
  
  window.addEventListener('click', function(e) {
    if (e.target === modalCv) modalCv.classList.remove('mostrar');
    if (e.target === modalBlog) modalBlog.classList.remove('mostrar');
  });

  //FORMULARIO DE CONTACTO
  
  const formulario = document.querySelector('.formulario-contacto');
  
  if(formulario) {
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btnSubmit = formulario.querySelector('button[type="submit"]');
      const textoOriginal = btnSubmit.textContent;
      
      
      btnSubmit.textContent = '¡Mensaje Enviado! ✓';
      btnSubmit.style.backgroundColor = '#6B7A63'; 
      btnSubmit.style.borderColor = '#6B7A63';
      
      formulario.reset(); 
      
     
      setTimeout(() => {
        btnSubmit.textContent = textoOriginal;
        btnSubmit.style.backgroundColor = ''; 
        btnSubmit.style.borderColor = '';
      }, 3000);
    });
  }

  // DINÁMICO DEL MENÚ
  const secciones = document.querySelectorAll('section');
  const enlacesNav = document.querySelectorAll('.enlaces-nav a');

  window.addEventListener('scroll', () => {
    let seccionActual = '';

    
    secciones.forEach(seccion => {
      const seccionTop = seccion.offsetTop;
      if (scrollY >= (seccionTop - 150)) { 
        seccionActual = seccion.getAttribute('id');
      }
    });

    
    enlacesNav.forEach(enlace => {
      enlace.classList.remove('activo');
      if (enlace.getAttribute('href').includes(seccionActual)) {
        enlace.classList.add('activo');
      }
    });
  });

});