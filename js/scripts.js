// Custom JavaScript for Actor Portfolio using Bootstrap 5

document.addEventListener('DOMContentLoaded', function () {

  // Detect Firefox Focus specifically
  // iOS: FxiOS token, Android/macOS: Focus token
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent/Firefox
  const userAgent = navigator.userAgent;
  const isFirefoxFocus = userAgent.includes('FxiOS') || userAgent.includes('Focus');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target !== '#' && target !== '#page-top') {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } else if (target === '#page-top' || target === '#') {
        e.preventDefault();

        if (isFirefoxFocus) {
          // Firefox Focus workaround: Temporarily disable smooth scroll behavior
          // See: https://github.com/nuxt/nuxt/pull/25817
          const html = document.documentElement;
          const originalBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';

          // Wait for browser repaint before scrolling
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // Restore smooth scroll behavior after scrolling
            requestAnimationFrame(() => {
              html.style.scrollBehavior = originalBehavior;
            });
          });
        }

        // For all other browsers, use smooth scrolling
        window.scrollTo({
          top: 0,
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
