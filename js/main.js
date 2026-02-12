/**
 * Portfolio Landing Page - Main JavaScript
 * Modules: ThemeToggle, SmoothScroll, ScrollReveal, CardEffects
 */

(function() {
  'use strict';

  // ============================================
  // Theme Toggle Module
  // ============================================
  const ThemeToggle = {
    STORAGE_KEY: 'theme-preference',

    init() {
      this.toggle = document.querySelector('[data-theme-toggle]');
      this.html = document.documentElement;

      // Get initial theme
      const savedTheme = this.getSavedTheme();
      const systemTheme = this.getSystemTheme();
      const initialTheme = savedTheme || systemTheme;

      // Apply initial theme
      this.setTheme(initialTheme, false);

      // Listen for toggle clicks
      if (this.toggle) {
        this.toggle.addEventListener('click', () => this.toggleTheme());
      }

      // Listen for system theme changes
      this.watchSystemTheme();
    },

    getSavedTheme() {
      try {
        return localStorage.getItem(this.STORAGE_KEY);
      } catch (e) {
        return null;
      }
    },

    getSystemTheme() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    },

    setTheme(theme, save = true) {
      this.html.setAttribute('data-theme', theme);

      if (save) {
        try {
          localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (e) {
          // localStorage not available
        }
      }

      // Update toggle button aria-label
      if (this.toggle) {
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        this.toggle.setAttribute('aria-label', label);
      }
    },

    toggleTheme() {
      const currentTheme = this.html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },

    watchSystemTheme() {
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          // Only respond to system changes if user hasn't set a preference
          if (!this.getSavedTheme()) {
            this.setTheme(e.matches ? 'dark' : 'light', false);
          }
        });
      }
    }
  };

  // ============================================
  // Smooth Scroll Module
  // ============================================
  const SmoothScroll = {
    HEADER_OFFSET: 80, // pixels to offset for sticky header

    init() {
      // Handle all anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
      });
    },

    handleClick(e, anchor) {
      const href = anchor.getAttribute('href');

      // Ignore empty hashes or just "#"
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - this.HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without scrolling
      history.pushState(null, null, href);
    }
  };

  // ============================================
  // Scroll Reveal Module
  // ============================================
  const ScrollReveal = {
    init() {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Immediately reveal all elements
        document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
          el.classList.add('revealed');
        });
        return;
      }

      // Set up IntersectionObserver
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1
        }
      );

      // Observe all reveal elements
      document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        this.observer.observe(el);
      });
    },

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stop observing once revealed
          this.observer.unobserve(entry.target);
        }
      });
    }
  };

  // ============================================
  // Card Effects Module
  // ============================================
  const CardEffects = {
    init() {
      // Skill card icon animations
      document.querySelectorAll('.card-skill').forEach(card => {
        const icon = card.querySelector('.card-icon');
        if (!icon) return;

        card.addEventListener('mouseenter', () => {
          // Animation handled by CSS, but we can add additional effects here
        });

        card.addEventListener('mouseleave', () => {
          // Animation handled by CSS
        });
      });

      // Legacy support for cards using old structure
      document.querySelectorAll('#what .group').forEach(card => {
        const svg = card.querySelector('svg');
        if (!svg) return;

        card.addEventListener('mouseenter', () => {
          svg.style.transform = 'scale(1.1) rotate(5deg)';
          svg.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        card.addEventListener('mouseleave', () => {
          svg.style.transform = 'scale(1) rotate(0deg)';
        });
      });
    }
  };

  // ============================================
  // Hero Animation Module
  // ============================================
  const HeroAnimation = {
    init() {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const heroTitle = document.querySelector('.hero-title') || document.querySelector('#introduction h1');
      if (!heroTitle) return;

      // Initial state
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(20px)';

      // Animate in after a short delay
      setTimeout(() => {
        heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 100);
    }
  };

  // ============================================
  // Mobile Menu Module (for future use)
  // ============================================
  const MobileMenu = {
    init() {
      this.toggle = document.querySelector('[data-mobile-menu-toggle]');
      this.menu = document.querySelector('[data-mobile-menu]');

      if (!this.toggle || !this.menu) return;

      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMenu();
        }
      });
    },

    toggleMenu() {
      const isOpen = this.menu.classList.toggle('is-open');
      this.toggle.setAttribute('aria-expanded', isOpen);
    },

    closeMenu() {
      this.menu.classList.remove('is-open');
      this.toggle.setAttribute('aria-expanded', 'false');
    }
  };

  // ============================================
  // Initialize All Modules
  // ============================================
  function init() {
    ThemeToggle.init();
    SmoothScroll.init();
    ScrollReveal.init();
    CardEffects.init();
    HeroAnimation.init();
    MobileMenu.init();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
