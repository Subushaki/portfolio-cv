// ========== DOM ELEMENTS ==========
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');
const cursorGlow = document.getElementById('cursorGlow');
const projectCards = document.querySelectorAll('.project-card');
const animateElements = document.querySelectorAll('.animate-on-scroll');

// ========== NAVBAR SCROLL EFFECT ==========
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Add/remove scrolled class
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide scroll to top
  if (scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  lastScrollY = scrollY;
});

// ========== MOBILE MENU ==========
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  
  // Animate hamburger
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== SCROLL TO TOP ==========
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== PROJECT ACCORDION ==========
projectCards.forEach(card => {
  const header = card.querySelector('.project-header');
  const detail = card.querySelector('.project-detail');

  header.addEventListener('click', () => {
    const isActive = card.classList.contains('active');

    // Close all other cards
    projectCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('active');
        const otherDetail = otherCard.querySelector('.project-detail');
        otherDetail.style.maxHeight = '0';
      }
    });

    // Toggle current card
    if (isActive) {
      card.classList.remove('active');
      detail.style.maxHeight = '0';
    } else {
      card.classList.add('active');
      detail.style.maxHeight = detail.scrollHeight + 'px';
      
      // Scroll into view after animation
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  });
});

// ========== SCROLL ANIMATIONS (Intersection Observer) ==========
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after animating
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ========== CURSOR GLOW EFFECT ==========
let cursorX = 0;
let cursorY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursorGlow() {
  // Smooth following
  glowX += (cursorX - glowX) * 0.08;
  glowY += (cursorY - glowY) * 0.08;

  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';

  requestAnimationFrame(animateCursorGlow);
}

animateCursorGlow();

// Hide glow on mobile
if ('ontouchstart' in window) {
  cursorGlow.style.display = 'none';
}

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========
const sections = document.querySelectorAll('section[id], .hero');
const navLinksAll = document.querySelectorAll('.navbar-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id') || 'hero';
    }
  });

  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text-primary)';
    }
  });
});

// ========== TYPING EFFECT FOR HERO (subtle) ==========
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
  const text = heroGreeting.textContent;
  heroGreeting.textContent = '';
  heroGreeting.style.opacity = '1';

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroGreeting.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 60);
    }
  }

  // Start typing after a delay
  setTimeout(typeWriter, 800);
}

// ========== PARALLAX ON HERO TAGS ==========
const heroTags = document.querySelector('.hero-tags');
if (heroTags) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroTags.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  });
}

// ========== STAGGER ANIMATION FOR SKILL ITEMS ==========
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 50);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-group').forEach(group => {
  skillObserver.observe(group);
});

// ========== STAT COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const match = text.match(/^(\d+)/);
      
      if (match) {
        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current + suffix;
        }, 40);
      }
      
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

console.log('🚀 Portfolio sitesi başarıyla yüklendi!');

// ========== THEME & TOOLTIP TOGGLE ==========
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeTooltip = document.getElementById('themeTooltip');
const closeThemeTooltip = document.getElementById('closeThemeTooltip');

if (themeToggleBtn) {
  const updateThemeButton = (theme) => {
    themeToggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  };

  const currentTheme = localStorage.getItem('theme') || 'light';
  updateThemeButton(currentTheme);

  // Function to dismiss tooltip
  const dismissTooltip = () => {
    if (themeTooltip) {
      themeTooltip.classList.remove('show');
    }
    localStorage.setItem('theme-tooltip-closed', 'true');
  };

  // Show tooltip with a slight delay if not closed before
  const isTooltipClosed = localStorage.getItem('theme-tooltip-closed') === 'true';
  if (!isTooltipClosed && themeTooltip) {
    setTimeout(() => {
      // Check again in case they clicked the theme toggle during the delay
      if (localStorage.getItem('theme-tooltip-closed') !== 'true') {
        themeTooltip.classList.add('show');
      }
    }, 1500);
  }

  // Bind tooltip close button
  if (closeThemeTooltip) {
    closeThemeTooltip.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissTooltip();
    });
  }

  // Bind tooltip itself to dismiss when clicked
  if (themeTooltip) {
    themeTooltip.addEventListener('click', () => {
      dismissTooltip();
    });
  }

  themeToggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
    dismissTooltip(); // Auto-dismiss tooltip when user toggles theme
  });
}
