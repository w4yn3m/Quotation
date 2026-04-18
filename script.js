// ==============================
// PRELOADER
// ==============================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        initAnimations();
    }, 1200);
});

// ==============================
// GSAP ANIMATIONS
// ==============================
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // Hero entrance
    const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

    heroTL
        .from('.hero-top-tag', {
            y: 30,
            opacity: 0,
            duration: 1
        })
        .from('.hero-line-1', {
            y: 80,
            opacity: 0,
            duration: 1.2
        }, '-=0.6')
        .from('.hero-line-2', {
            y: 80,
            opacity: 0,
            duration: 1.2
        }, '-=0.9')
        .from('.hero-line-3', {
            y: 80,
            opacity: 0,
            duration: 1.2
        }, '-=0.9')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1
        }, '-=0.7')
        .from('.detail-chip', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12
        }, '-=0.5')
        .from('.hero-scroll', {
            opacity: 0,
            duration: 1
        }, '-=0.3');

    // Scroll-triggered reveals
    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach((card) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Staggered grid reveals
    const grids = ['.services-grid', '.album-row', '.video-row', '.reasons-row', '.contact-grid'];
    grids.forEach(selector => {
        const grid = document.querySelector(selector);
        if (!grid) return;
        
        const children = grid.children;
        gsap.to(children, {
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%'
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });

    // Section labels fade in
    document.querySelectorAll('.section-label').forEach(label => {
        gsap.from(label, {
            scrollTrigger: {
                trigger: label,
                start: 'top 90%'
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Section headings
    document.querySelectorAll('.section-heading').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 88%'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// ==============================
// FLOATING NAV
// ==============================
const floatingNav = document.getElementById('floatingNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 500) {
        floatingNav.classList.add('visible');
    } else {
        floatingNav.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a, .nav-cta, .nav-logo').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==============================
// VIDEO PLAY INTERACTION
// ==============================
document.querySelectorAll('.vid-preview').forEach(preview => {
    preview.addEventListener('click', () => {
        const isPlaying = preview.classList.contains('playing');
        
        // Reset all
        document.querySelectorAll('.vid-preview').forEach(p => {
            p.classList.remove('playing');
        });
        
        if (!isPlaying) {
            preview.classList.add('playing');
        }
    });
});

// ==============================
// BOOK BUTTON HOVER
// ==============================
const bookBtn = document.getElementById('bookBtn');
if (bookBtn) {
    bookBtn.addEventListener('mouseenter', () => {
        gsap.to(bookBtn, { scale: 1.03, duration: 0.3 });
    });
    bookBtn.addEventListener('mouseleave', () => {
        gsap.to(bookBtn, { scale: 1, duration: 0.3 });
    });
}

// ==============================
// PHOTO GRID LIGHTBOX EFFECT
// ==============================
document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
});
