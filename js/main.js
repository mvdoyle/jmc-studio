// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeCTA();
});

// Navigation functionality (mobile responsive)
function initializeNavigation() {
    // We'll add mobile navigation functionality later
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
}

// Initialize animations on scroll
function initializeAnimations() {
    // Add animation classes when elements come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
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
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Sending...', 'info');
            
            // In a real application, you would send data to a server here
            setTimeout(() => {
                showFormMessage('Message sent successfully!', 'success');
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
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover effect class
        ctaButton.classList.add('btn-hover-effect');
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
        messageElement.classList.add('bg-blue-100', 'text-blue-700');
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