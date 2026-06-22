/* ============================================
   PORTFOLIO WEBSITE - PREMIUM JAVASCRIPT
   Advanced Interactions & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const initializers = [
        initNavigation,
        initFormHandling,
        initScrollAnimations,
        setActiveNavLink,
        initParallaxEffect,
        initTypingEffect,
        initCircuitBackground,
        initBootSequence,
        initScrollReveal,
        initTimelinePing
    ];

    initializers.forEach(fn => {
        try {
            fn();
        } catch (err) {
            console.error(`Error running ${fn.name}:`, err);
        }
    });
});

/* ============================================
   PREMIUM NAVIGATION
   ============================================ */

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Sticky nav animation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
    } else {
        nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    }
});

/* ============================================
   FORM HANDLING - PREMIUM
   ============================================ */

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (fieldName === 'name' && value.length < 3) {
        isValid = false;
    } else if (fieldName === 'email' && !isValidEmail(value)) {
        isValid = false;
    } else if (fieldName === 'message' && value.length < 10) {
        isValid = false;
    }
    
    if (isValid) {
        field.style.borderColor = '#10b981';
        field.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
    } else {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Clear previous messages
    document.getElementById('successMessage')?.remove();
    document.getElementById('formErrors')?.remove();
    
    const errors = validateContactForm();
    
    if (errors.length > 0) {
        showFormErrors(errors, form);
        return;
    }
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', data);
        showSuccessMessage(form);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Reset input styles
        form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = 'var(--border)';
            input.style.boxShadow = 'none';
        });
    }, 1500);
}

function validateContactForm() {
    const errors = [];
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    
    if (!name) errors.push('Name is required');
    else if (name.length < 3) errors.push('Name must be at least 3 characters');
    
    if (!email) errors.push('Email is required');
    else if (!isValidEmail(email)) errors.push('Invalid email format');
    
    if (!subject) errors.push('Subject is required');
    
    if (!message) errors.push('Message is required');
    else if (message.length < 10) errors.push('Message must be at least 10 characters');
    
    return errors;
}

function showFormErrors(errors, form) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'formErrors';
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        color: #dc2626;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border-left: 4px solid #ef4444;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        animation: slideInDown 0.5s ease-out;
    `;
    
    const errorList = errors.map(err => `<li style="margin-bottom: 0.5rem;">✗ ${err}</li>`).join('');
    errorDiv.innerHTML = `<ul style="list-style: none; padding: 0; margin: 0;">${errorList}</ul>`;
    
    form.parentNode.insertBefore(errorDiv, form);
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.id = 'successMessage';
    successDiv.style.cssText = `
        background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        color: #166534;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border-left: 4px solid #10b981;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
        animation: slideInDown 0.5s ease-out;
    `;
    successDiv.innerHTML = '✓ Thank you! Your message has been sent successfully. I will get back to you within 24 hours.';
    
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => successDiv?.remove?.(), 5000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    animateProgressBarsOnScroll();
    animateCardsOnScroll();
    animateCounters();
}

function animateProgressBarsOnScroll() {
    const progressBars = document.querySelectorAll('.progress');
    
    if (!progressBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = parseInt(progressBar.parentElement.querySelector('.skill-percentage')?.textContent) || 0;
                
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.card');
    
    if (!cards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const parallaxElements = hero.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/* ============================================
   TYPING EFFECT
   ============================================ */

function initTypingEffect() {
    const elements = document.querySelectorAll('[data-typing]');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let index = 0;
        const speed = parseInt(element.getAttribute('data-speed')) || 50;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.unobserve(element);
            }
        });
        observer.observe(element);
    });
}

/* ============================================
   CIRCUIT BACKGROUND
   Injects an animated PCB-trace SVG into the hero
   ============================================ */

function initCircuitBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'circuit-bg';
    wrapper.innerHTML = `
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path class="circuit-trace" d="M0,80 L180,80 L220,120 L420,120 L460,80 L700,80" />
            <path class="circuit-trace" d="M1200,160 L980,160 L940,200 L760,200 L720,240 L500,240" />
            <path class="circuit-trace" d="M0,320 L140,320 L180,360 L380,360 L420,400 L640,400 L680,440 L900,440" />
            <path class="circuit-trace" d="M1200,500 L1000,500 L960,460 L800,460 L760,420 L600,420" />
            <path class="circuit-trace" d="M100,0 L100,140 L60,180 L60,300" />
            <path class="circuit-trace" d="M1100,0 L1100,180 L1140,220 L1140,360" />
            <circle class="circuit-node" cx="220" cy="120" r="3.5" />
            <circle class="circuit-node" cx="460" cy="80" r="3.5" />
            <circle class="circuit-node" cx="940" cy="200" r="3.5" />
            <circle class="circuit-node" cx="720" cy="240" r="3.5" />
            <circle class="circuit-node" cx="180" cy="360" r="3.5" />
            <circle class="circuit-node" cx="420" cy="400" r="3.5" />
            <circle class="circuit-node" cx="680" cy="440" r="3.5" />
            <circle class="circuit-node" cx="960" cy="460" r="3.5" />
            <circle class="circuit-node" cx="60" cy="180" r="3.5" />
            <circle class="circuit-node" cx="1140" cy="220" r="3.5" />
        </svg>
    `;
    hero.prepend(wrapper);
}

/* ============================================
   BOOT SEQUENCE
   Device-style flicker-in for the hero name on load
   ============================================ */

function initBootSequence() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    heroTitle.classList.add('boot-text');
    // Trigger after a tiny delay so the browser registers the class change
    requestAnimationFrame(() => {
        setTimeout(() => heroTitle.classList.add('glitch-in'), 50);
    });
}

/* ============================================
   SCROLL REVEAL
   Generic IntersectionObserver reveal for cards,
   timeline items, skill bars, and sections site-wide
   ============================================ */

function initScrollReveal() {
    // Auto-tag common elements with reveal classes if not already present
    const autoTargets = [
        { selector: '.card', cls: 'reveal' },
        { selector: '.skill-card', cls: 'reveal' },
        { selector: '.service-card', cls: 'reveal' },
        { selector: '.faq-item', cls: 'reveal' },
        { selector: '.project-detail-card', cls: 'reveal' },
        { selector: '.achievement-card', cls: 'reveal' },
        { selector: '.education-item', cls: 'reveal' },
        { selector: '.timeline-item', cls: '' }, // timeline already animates via CSS, just observe for the dot ping
        { selector: '.skill-bar', cls: 'reveal-left' },
        { selector: '.section-title', cls: 'reveal' }
    ];

    autoTargets.forEach(({ selector, cls }) => {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((node, i) => {
            if (cls && !node.classList.contains('reveal') && !node.classList.contains('reveal-left') &&
                !node.classList.contains('reveal-right') && !node.classList.contains('reveal-scale')) {
                node.classList.add(cls);
                node.style.setProperty('--d', Math.min(i * 80, 480));
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // If this reveal contains a progress bar fill, animate + charge-glow it
                const fill = entry.target.querySelector ? entry.target.querySelector('.bar-fill') : null;
                if (fill) {
                    const targetWidth = fill.style.width;
                    fill.style.width = '0%';
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                            fill.classList.add('is-charged');
                        }, 100);
                    });
                }

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
}

/* ============================================
   TIMELINE PING
   Triggers a signal-ping glow on each dot as its
   timeline item scrolls into view
   ============================================ */

function initTimelinePing() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const pingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot) dot.classList.add('is-visible');
                pingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    items.forEach(item => pingObserver.observe(item));
}

/* ============================================
   SCROLL PROGRESS
   ============================================ */

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0f766e 0%, #14b8a6 100%);
        width: 0;
        z-index: 9999;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

initScrollProgress();

/* ============================================
   UTILITY & PERFORMANCE
   ============================================ */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('✓ Portfolio loaded in ' + pageLoadTime + 'ms');
    }
});