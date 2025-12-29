// Custom JavaScript for Actor Portfolio using Bootstrap 5

document.addEventListener('DOMContentLoaded', function () {

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');

      // Scroll to top for #page-top or empty #
      if (target === '#page-top' || target === '#') {
        // Force scroll to absolute top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        window.scrollTo(0, 0); // Fallback
        return;
      }

      // Scroll to specific section
      const element = document.querySelector(target);
      if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
  });

  // Close responsive navbar on link click
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });

  // Initialize Bootstrap ScrollSpy
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '.navbar',
    offset: 70
  });

  // Auto-play carousel when modal opens
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('shown.bs.modal', function () {
      const carousel = this.querySelector('.carousel');
      if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
          interval: 3000,
          ride: 'carousel'
        });
      }
    });
  });
});
