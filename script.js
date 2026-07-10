/* ========== NAVBAR SCROLL EFFECT ========== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

/* ========== MOBILE MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ========== ACTIVE NAV LINK ========== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ========== THEME TOGGLE ========== */
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ========== SKILL BAR ANIMATION ========== */
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50;
    if (isVisible && fill.style.width === '0px') {
      const targetWidth = fill.dataset.width;
      fill.style.width = targetWidth + '%';
    }
  });
}

// Check on scroll
window.addEventListener('scroll', animateSkillBars);
// Check on load
window.addEventListener('load', animateSkillBars);

/* ========== COUNTER ANIMATION ========== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50;
    
    if (isVisible && !counter.dataset.animated) {
      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.target);
      let current = 0;
      const increment = Math.ceil(target / 60);
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counter.textContent = current + (target === 7 ? '+' : '');
      }, 30);
    }
  });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

/* ========== FADE IN ON SCROLL ========== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.querySelectorAll('.section-header, .about-text, .about-image, .timeline-item, .project-card, .contact-content')
  .forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

/* ========== COPYRIGHT YEAR ========== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ========== PARALLAX SPHERE ========== */
document.addEventListener('mousemove', (e) => {
  const sphere = document.querySelector('.gradient-sphere');
  if (!sphere) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  sphere.style.transform = `translate(${x}px, ${y}px)`;
});
