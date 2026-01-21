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
  const canvas = document.createElement('canvas');
  canvas.id = 'snowCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let snowflakes = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.6 + 0.4;
  }

  Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += this.wind;

    // Reset snowflake when it goes off screen
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }

    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    }
  };

  Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  };

  function initSnowflakes() {
    const numberOfSnowflakes = Math.floor((canvas.width * canvas.height) / 10000);
    snowflakes = [];
    for (let i = 0; i < numberOfSnowflakes; i++) {
      snowflakes.push(new Snowflake());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
      snowflake.update();
      snowflake.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  initSnowflakes();

  // Start with snow disabled
  canvas.style.display = 'none';

  // Handle window resize
  window.addEventListener('resize', function () {
    resizeCanvas();
    initSnowflakes();
  });

  // Toggle function
  function toggleSnow() {
    if (canvas.style.display === 'none') {
      canvas.style.display = 'block';
      animate();
      return true;
    } else {
      canvas.style.display = 'none';
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
