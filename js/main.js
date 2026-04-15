/* ============================================
   AquaLux Rentals — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navigation ---
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
          if (navOverlay) navOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- Testimonials Slider ---
  const slider = document.querySelector('.testimonials-slider');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');

  if (slider && prevBtn && nextBtn) {
    let currentSlide = 0;
    const cards = slider.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    const getVisibleCount = () => {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    };

    const updateSlider = () => {
      const visibleCount = getVisibleCount();
      const maxSlide = Math.max(0, totalCards - visibleCount);
      currentSlide = Math.min(currentSlide, maxSlide);
      const percentage = (currentSlide / totalCards) * 100;
      slider.style.transform = `translateX(-${percentage}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentSlide = Math.max(0, currentSlide - 1);
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      const visibleCount = getVisibleCount();
      const maxSlide = Math.max(0, totalCards - visibleCount);
      currentSlide = Math.min(maxSlide, currentSlide + 1);
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      item.classList.toggle('active', !isActive);
      answer.style.maxHeight = isActive ? null : answer.scrollHeight + 'px';
    });
  });

  // --- Contact Form (front-end only) ---
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a, .nav-dropdown > a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
      link.classList.add('active');
    }
  });

});
