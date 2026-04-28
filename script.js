/**
 * PORTFOLIO SCRIPT - COMPLETE & DEBUGGED
 * Features: Theme toggle, custom cursor, particles, typewriter,
 * scroll reveal, magnetic buttons, mobile menu, form handling, tilt effect
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ========================================
     THEME TOGGLE
     ======================================== */
  
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      
      // Re-init particles with new theme colors
      initParticles();
    });
  }
  
  /* ========================================
     CUSTOM CURSOR
     ======================================== */
  
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  
  if (!isTouchDevice && cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });
    
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
  } else if (cursorDot && cursorOutline) {
    // Hide custom cursor on touch devices
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
  }
  
  /* ========================================
     MAGNETIC BUTTONS
     ======================================== */
  
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  if (!isTouchDevice) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  /* ========================================
     PARTICLE BACKGROUND
     ======================================== */
  
  const canvas = document.getElementById('particle-canvas');
  let ctx, particles, animationId;
  
  function initParticles() {
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Cancel existing animation
    if (animationId) cancelAnimationFrame(animationId);
    
    const isDark = html.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 'rgba(34, 211, 238, 0.5)' : 'rgba(6, 182, 212, 0.3)';
    const lineColor = isDark ? 'rgba(34, 211, 238, 0.08)' : 'rgba(6, 182, 212, 0.05)';
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    
    const particleCount = Math.min(window.innerWidth / 10, 100);
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    window.addEventListener('resize', resize);
  }
  
  initParticles();
  
  /* ========================================
     TYPEWRITER EFFECT
     ======================================== */
  
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const words = ['pixel-perfect UIs', 'smooth animations', 'responsive layouts', 'clean code'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
      }
      
      setTimeout(type, typeSpeed);
    }
    
    // Start after initial delay
    setTimeout(type, 1000);
  }
  
  /* ========================================
     NAVBAR SCROLL EFFECT
     ======================================== */
  
  const navbar = document.getElementById('navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
  
  /* ========================================
     MOBILE MENU
     ======================================== */
  
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  /* ========================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ======================================== */
  
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  /* ========================================
     SKILL BARS ANIMATION
     ======================================== */
  
  const skillItems = document.querySelectorAll('.skill-item');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const level = item.getAttribute('data-level');
        const progress = item.querySelector('.skill-progress');
        
        // Stagger the animations
        const index = Array.from(skillItems).indexOf(item);
        setTimeout(() => {
          item.classList.add('visible');
          if (progress && level) {
            progress.style.width = `${level}%`;
          }
        }, index * 100);
        
        skillObserver.unobserve(item);
      }
    });
  }, { threshold: 0.5 });
  
  skillItems.forEach(item => skillObserver.observe(item));
  
  /* ========================================
     STAT COUNTER ANIMATION
     ======================================== */
  
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.textContent.includes('+') ? '+' : '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(easeOutQuart * (target - start) + start);
          
          el.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        }
        
        requestAnimationFrame(update);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => statObserver.observe(stat));
  
  /* ========================================
     PROJECT CARD TILT EFFECT
     ======================================== */
  
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  if (!isTouchDevice) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
  
  /* ========================================
     CONTACT FORM HANDLING
     ======================================== */
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>Sending...</span>';
      btn.disabled = true;
      
      setTimeout(() => {
        alert(`Thanks for reaching out, ${name}! I'll get back to you at ${email} within 24 hours.`);
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
  
  /* ========================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ======================================== */
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  /* ========================================
     FOOTER YEAR
     ======================================== */
  
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  /* ========================================
     HERO PARALLAX
     ======================================== */
  
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    }, { passive: true });
  }
  
});