// Modified JavaScript file for Process page with scrolling fixes

document.addEventListener('DOMContentLoaded', function() {
    // Ensure scrolling is enabled immediately
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    
    // Initialize all the interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeCookieBanner();
    
    // Scroll to top button
    initializeScrollToTop();
});

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector('header');
    
    // Header scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // Reduce logo size when scrolled
            const logoImage = header.querySelector('.text-center img');
            if (logoImage && window.innerWidth >= 768) { // Only on desktop
                logoImage.style.maxHeight = '70px';
                logoImage.style.maxWidth = '170px';
            }
        } else {
            header.classList.remove('scrolled');
            // Restore logo size when at top
            const logoImage = header.querySelector('.text-center img');
            if (logoImage && window.innerWidth >= 768) { // Only on desktop
                logoImage.style.maxHeight = '90px';
                logoImage.style.maxWidth = '220px';
            }
        }
    });
}

// Initialize animations on scroll
function initializeAnimations() {
    // Add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Choose animation based on position in viewport
                    if (entry.boundingClientRect.left < window.innerWidth / 2) {
                        entry.target.classList.add('fade-in-left');
                    } else if (entry.boundingClientRect.left > window.innerWidth / 2) {
                        entry.target.classList.add('fade-in-right');
                    } else {
                        entry.target.classList.add('fade-in');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Cookie banner functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const denyCookiesBtn = document.getElementById('deny-cookies');
    
    if (cookieBanner && acceptCookiesBtn && denyCookiesBtn) {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (cookieConsent === null) {
            // Show cookie banner if no choice has been made
            setTimeout(() => {
                cookieBanner.classList.remove('hidden');
                cookieBanner.classList.add('show');
            }, 1000);
            
            // Handle accept button
            acceptCookiesBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.classList.add('hidden');
                }, 500);
            });
            
            // Handle deny button
            denyCookiesBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'denied');
                cookieBanner.classList.remove('show');
                setTimeout(() => {
                    cookieBanner.classList.add('hidden');
                }, 500);
            });
        }
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide scroll-to-top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });
        
        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
} 