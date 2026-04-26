// Typewriter Effect Logic
let i = 0;
let typingTimer;
function typeWriter() {
    const mainTitleEl = document.getElementById('hero-title-main');
    const subTitleEl = document.getElementById('hero-title-sub');
    const badgeEl = document.getElementById('hero-badge');
    const subDescEl = document.getElementById('hero-sub');
    
    // Update texts based on slide and lang
    if (typeof dict !== 'undefined' && dict[currentLang]) {
        if(badgeEl) badgeEl.textContent = dict[currentLang][`hero_badge_${currentSlide}`] || '';
        if(subTitleEl) subTitleEl.textContent = dict[currentLang][`hero_title_${currentSlide}_sub`] || '';
        if(subDescEl) subDescEl.textContent = dict[currentLang][`hero_sub_${currentSlide}`] || '';
        
        const fullText = dict[currentLang][`hero_title_${currentSlide}_main`] || '';
        
        if (mainTitleEl && mainTitleEl.textContent.length === 0) i = 0; // reset
        
        if (mainTitleEl && i < fullText.length) {
            mainTitleEl.textContent += fullText.charAt(i);
            i++;
            typingTimer = setTimeout(typeWriter, 100);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.visibility = 'hidden', 600);
        }, 500); // Wait 0.5s to show preloader briefly
    }

    // Scroll Reveal Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // Fallback for missing images
    document.querySelectorAll('.fallback-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    document.querySelectorAll('[data-gallery-track]').forEach(track => {
        if (track.dataset.cloned === 'true') return;

        Array.from(track.children).forEach(card => {
            track.appendChild(card.cloneNode(true));
        });

        track.dataset.cloned = 'true';
    });
    
    // Set current language on load
    if (typeof setLang === 'function') {
    const savedLang = localStorage.getItem('selectedLang') || 'id';
    setLang(savedLang);
}

});

// Set year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar Scroll, Active Link (ScrollSpy) & Hide/Show Logic
const header = document.getElementById('main-header');
const navbar = document.getElementById('navbar');
const topBar = document.getElementById('top-bar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        if(header) header.classList.add('shadow-md');
        if(navbar) {
            navbar.classList.replace('border-brand-gold/20', 'border-transparent');
            navbar.classList.add('glass-nav');
            navbar.classList.remove('bg-transparent', 'py-4');
        }
        if(topBar) {
            topBar.style.height = '0px';
            topBar.style.paddingTop = '0px';
            topBar.style.paddingBottom = '0px';
            topBar.style.opacity = '0';
        }
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('text-white');
            l.classList.add('text-brand-dark');
        });
        document.querySelectorAll('.nav-social-icon').forEach(l => {
            l.classList.remove('text-white');
            l.classList.add('text-brand-dark');
        });
        document.getElementById('mobile-menu-btn')?.classList.replace('text-white', 'text-brand-dark');
    } else {
        if(header) header.classList.remove('shadow-md');
        if(navbar) {
            navbar.classList.replace('border-transparent', 'border-brand-gold/20');
            navbar.classList.remove('glass-nav');
            navbar.classList.remove('bg-transparent');
        }
        if(topBar) {
            topBar.style.height = '';
            topBar.style.paddingTop = '';
            topBar.style.paddingBottom = '';
            topBar.style.opacity = '1';
        }
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('text-white');
            l.classList.add('text-brand-dark');
        });
        document.querySelectorAll('.nav-social-icon').forEach(l => {
            l.classList.remove('text-white');
            l.classList.add('text-brand-dark');
        });
        document.getElementById('mobile-menu-btn')?.classList.replace('text-white', 'text-brand-dark');
    }

    if (scrollTop > lastScrollTop && scrollTop > 150) {
        if(header) header.classList.add('-translate-y-full');
    } else {
        if(header) header.classList.remove('-translate-y-full');
    }
    
    if (scrollTop > 500) {
        if(backToTop) {
            backToTop.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTop.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    } else {
        if(backToTop) {
            backToTop.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTop.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 

    // ScrollSpy Logic
    let currentSection = '';
    document.querySelectorAll('section').forEach(sec => {
        const secTop = sec.offsetTop;
        const secHeight = sec.clientHeight;
        if(scrollTop >= (secTop - 150)) {
            currentSection = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').includes(currentSection) && currentSection !== '') {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon && mobileMenu) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.add('hidden');
        if(mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});
