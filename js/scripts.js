// Custom JavaScript for Actor Portfolio using Bootstrap 5

document.addEventListener('DOMContentLoaded', function () {

  // Detect Firefox for scroll behavior workaround
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  // Smooth scroll for anchor links - Firefox Focus compatible
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = this.getAttribute('href');

      // Handle scroll to top
      if (target === '#page-top' || target === '#') {
        e.preventDefault();

        if (isFirefox) {
          // Firefox workaround: Temporarily disable smooth scroll behavior
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
        } else {
          // For other browsers, use smooth scrolling
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }

        return false;
      }

      // Handle other anchor links
      if (target !== '#') {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = element.offsetTop - navbarHeight;

          try {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } catch (e) {
            window.scrollTo(0, targetPosition);
          }
        }
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
