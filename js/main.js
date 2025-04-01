// Main JavaScript file for JMC Studio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeCTA();
    initializeCookieBanner();
    initializeProjectFilters();
});

// Navigation functionality (smooth scrolling)
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for hash links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add mobile navigation toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
    }
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

    // Animate elements that are already in viewport on page load
    setTimeout(() => {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                element.classList.add('fade-in');
            }
        });
    }, 300);
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                this.classList.add('active-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('opacity-0');
                            item.classList.add('opacity-100');
                        }, 50);
                    } else {
                        item.classList.remove('opacity-100');
                        item.classList.add('opacity-0');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Sending your message...', 'info');
            
            // In a real application, you would send data to a server here
            setTimeout(() => {
                showFormMessage('Thank you for your message. We will be in touch soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

// CTA button functionality
function initializeCTA() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                window.scrollTo({
                    top: projectsSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
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

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Check if message element exists
    let messageElement = document.getElementById('form-message');
    
    // Create if it doesn't exist
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'form-message';
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(messageElement, form.nextSibling);
    }
    
    // Set message content and styling
    messageElement.textContent = message;
    messageElement.className = 'mt-4 p-3 rounded';
    
    // Set message type styling
    if (type === 'error') {
        messageElement.classList.add('bg-red-100', 'text-red-700');
    } else if (type === 'success') {
        messageElement.classList.add('bg-green-100', 'text-green-700');
    } else {
        messageElement.classList.add('bg-stone-100', 'text-stone-700');
    }
}

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    }
});

// Add scroll event for header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (header) {
        if (window.pageYOffset > 50) {
            header.classList.add('bg-cream', 'shadow-sm', 'transition-all', 'duration-300');
        } else {
            header.classList.remove('shadow-sm');
        }
    }
}); 