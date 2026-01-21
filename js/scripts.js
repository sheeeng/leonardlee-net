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

  // Let it snow effect
  createSnowfall();
});

// Snowfall Animation
function createSnowfall() {
  const container = document.createElement('div');
  container.id = 'snowContainer';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  let snowflakes = [];
  let animationId;

  function Snowflake() {
    this.element = document.createElement('i');
    this.element.className = 'fa-solid fa-snowflake';
    this.element.style.position = 'absolute';
    this.element.style.color = '#ffffff';
    this.element.style.pointerEvents = 'none';

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * -window.innerHeight;
    this.size = Math.random() * 15 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.6 + 0.4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;

    this.element.style.fontSize = this.size + 'px';
    this.element.style.opacity = this.opacity;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = `rotate(${this.rotation}deg)`;

    container.appendChild(this.element);
  }

  Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += this.wind;
    this.rotation += this.rotationSpeed;

    // Reset snowflake when it goes off screen
    if (this.y > window.innerHeight) {
      this.y = -20;
      this.x = Math.random() * window.innerWidth;
    }

    if (this.x > window.innerWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = window.innerWidth;
    }

    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = `rotate(${this.rotation}deg)`;
  };

  function initSnowflakes() {
    // Clear existing snowflakes
    snowflakes.forEach(snowflake => {
      if (snowflake.element.parentNode) {
        snowflake.element.parentNode.removeChild(snowflake.element);
      }
    });

    const numberOfSnowflakes = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    snowflakes = [];
    for (let i = 0; i < numberOfSnowflakes; i++) {
      snowflakes.push(new Snowflake());
    }
  }

  function animate() {
    snowflakes.forEach(snowflake => {
      snowflake.update();
    });

    animationId = requestAnimationFrame(animate);
  }

  initSnowflakes();

  // Start with snow disabled
  container.style.display = 'none';

  // Handle window resize
  window.addEventListener('resize', function () {
    initSnowflakes();
  });

  // Toggle function
  function toggleSnow() {
    if (container.style.display === 'none') {
      container.style.display = 'block';
      animate();
      return true;
    } else {
      container.style.display = 'none';
      cancelAnimationFrame(animationId);
      return false;
    }
  }

  // Toggle button in footer
  const toggleButton = document.getElementById('snowToggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      const isSnowing = toggleSnow();
      const icon = this.querySelector('i');
      if (isSnowing) {
        this.classList.add('active');
        icon.style.animation = 'spin 2s linear infinite';
      } else {
        this.classList.remove('active');
        icon.style.animation = 'none';
      }
    });
    // Set initial state to inactive
    toggleButton.classList.remove('active');
    toggleButton.querySelector('i').style.animation = 'none';
  }

  // Optional: Toggle snow on/off with a keyboard shortcut (Ctrl/Cmd + Shift + S)
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
      const isSnowing = toggleSnow();
      const toggleButton = document.getElementById('snowToggle');
      if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        if (isSnowing) {
          toggleButton.classList.add('active');
          icon.style.animation = 'spin 2s linear infinite';
        } else {
          toggleButton.classList.remove('active');
          icon.style.animation = 'none';
        }
      }
    }
  });
}
