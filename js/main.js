// Main JavaScript file for JMC Studio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the interactive elements (intro animation is now handled by shared.js)
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeCTA();
    initializeCookieBanner();
    initializeProjectFilters();
    initializeProjectModals();
    initializeHeroCarousel();
});

// Navigation functionality (smooth scrolling)
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
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
    
    // Smooth scrolling for navigation links
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
                        top: targetElement.offsetTop - 100, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add mobile navigation toggle if needed in future
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

// Project modal functionality
function initializeProjectModals() {
    // This function has been replaced with direct links to project pages
    // We're keeping this function to avoid breaking any references to it in the main initialization
    console.log("Project modal functionality replaced with direct links to project pages");
    
    // Remove any lingering event listeners from project items that might still be in the DOM
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        projectModal.remove(); // Remove modal element if it exists
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
    const projectsLinks = document.querySelectorAll('a[href="#projects"]');
    
    // Function to scroll to projects section
    const scrollToProjects = function(e) {
        if (e) e.preventDefault();
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            window.scrollTo({
                top: projectsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    
    // Add event listener to CTA button if it exists
    if (ctaButton) {
        ctaButton.addEventListener('click', scrollToProjects);
    }
    
    // Add event listeners to any links pointing to the projects section
    projectsLinks.forEach(link => {
        link.addEventListener('click', scrollToProjects);
    });
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

// Initialize the hero carousel
function initializeHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    const slidesContainer = carousel.querySelector('.carousel-slides');
    const dotsContainer = carousel.querySelector('.absolute.bottom-10');
    
    // This will hold our slide elements
    let slides = [];
    let dots = [];
    let currentSlideIndex = 0;
    let slideInterval;
    const slideIntervalTime = 4000; // 4 seconds per slide
    
    // Get slide images from projects data
    const carouselImages = [];
    
    // Extract images from projects data
    if (typeof projectsData !== 'undefined') {
        // Collect all project images
        for (const projectId in projectsData) {
            const project = projectsData[projectId];
            
            // Take the first image from each project
            if (project.images && project.images.length > 0) {
                project.images.forEach(image => {
                    carouselImages.push({
                        url: image.url,
                        title: project.title,
                        category: project.category
                    });
                });
            }
        }
    } else {
        // Fallback images if projects data is not available
        carouselImages.push(
            { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', title: 'Elegant Interior', category: 'Residential Design' },
            { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', title: 'Modern Living Room', category: 'Residential Design' },
            { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', title: 'Minimalist Kitchen', category: 'Commercial Design' }
        );
    }
    
    // Preload all images before setting up the carousel
    const preloadImages = () => {
        return Promise.all(carouselImages.map(image => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(image);
                img.onerror = () => resolve(image); // Continue even if an image fails to load
                img.src = image.url;
            });
        }));
    };
    
    // Setup carousel after preloading images
    preloadImages().then(() => {
        // Create slides from images
        carouselImages.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.backgroundImage = `url('${image.url}')`;
            
            // Add to slides container
            slidesContainer.appendChild(slide);
            slides.push(slide);
            
            // Create navigation dot
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            
            // Add to dots container
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
        
        // Set first slide as active immediately
        if (slides.length > 0) {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }
        
        // Start the automatic rotation
        resetInterval();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        // Update current index
        const previousIndex = currentSlideIndex;
        currentSlideIndex = index;
        
        // Loop around if needed
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        
        // Handle the transition
        if (slides.length > 0) {
            // First remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Force browser reflow to ensure clean animation
            void slides[currentSlideIndex].offsetWidth;
            
            // Add active class to new current slide/dot
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }
        
        // Reset the interval
        resetInterval();
    }
    
    // Next slide function
    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }
    
    // Reset interval for automatic rotation
    function resetInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        slideInterval = setInterval(() => {
            nextSlide();
        }, slideIntervalTime);
    }
    
    // Pause rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume rotation on mouse leave
    carousel.addEventListener('mouseleave', () => {
        resetInterval();
    });
    
    // Update header style on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
} 