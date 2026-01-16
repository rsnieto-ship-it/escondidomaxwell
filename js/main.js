/**
 * Escondido Maxwell - Main JavaScript
 * Handles navigation, smooth scrolling, and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link, .nav__cta');
    const quoteForm = document.getElementById('quote-form');

    /**
     * Header Scroll Effect
     * Adds 'scrolled' class when page is scrolled past threshold
     */
    function handleScroll() {
        const scrollThreshold = 100;

        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Initial check and scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    /**
     * Mobile Navigation Toggle
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    /**
     * Smooth Scroll for Anchor Links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Scroll Animations
     * Fade in elements when they enter the viewport
     */
    const animatedElements = document.querySelectorAll('.section__title, .section__description, .amenity-card, .pricing__card, .about__feature, .testimonial, .gallery__item, .accommodations__grid');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = entry.target.closest('.testimonials__grid, .amenities__grid, .pricing__cards, .gallery__grid')
                    ? Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100
                    : 0;

                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    /**
     * Form Handling
     */
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            // Form will be handled by Formspree
            // This adds basic validation feedback

            const requiredFields = quoteForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#c0392b';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });

        // Remove error styling on input
        quoteForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    /**
     * Set minimum date for event date picker (today)
     */
    const eventDateInput = document.getElementById('event-date');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.setAttribute('min', today);
    }

    /**
     * Active Navigation Link Highlighting
     */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    /**
     * Parallax Effect for Hero (subtle)
     */
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
            }
        }, { passive: true });
    }

    /**
     * Gallery Lightbox Preparation
     * (Ready for when real images are added)
     */
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // Placeholder for lightbox functionality
            // Will be implemented when real images are added
            console.log('Gallery item clicked - lightbox coming soon');
        });
    });

    /**
     * Console Welcome Message
     */
    console.log('%c Escondido Maxwell ', 'background: #89704d; color: white; padding: 10px 20px; font-size: 16px; font-family: Georgia, serif;');
    console.log('A Private Sanctuary for Unforgettable Celebrations');
});
