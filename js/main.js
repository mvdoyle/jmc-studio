// Main JavaScript file for JMC Studio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeCTA();
    initializeCookieBanner();
    initializeProjectFilters();
    initializeProjectModals();
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

// Project modal functionality
function initializeProjectModals() {
    const projectItems = document.querySelectorAll('.project-item');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const projectContent = document.getElementById('project-content');
    const body = document.body;
    
    let currentProject = null;
    let currentImageIndex = 0;
    
    // Function to update image navigation
    function updateImageNavigation(images) {
        const prevBtn = projectContent.querySelector('#prev-image');
        const nextBtn = projectContent.querySelector('#next-image');
        if (prevBtn && nextBtn) {
            prevBtn.classList.toggle('hidden', currentImageIndex === 0);
            nextBtn.classList.toggle('hidden', currentImageIndex === images.length - 1);
        }
    }
    
    // Function to change image
    function changeImage(direction, images) {
        const newIndex = currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < images.length) {
            currentImageIndex = newIndex;
            const mainImage = projectContent.querySelector('.main-image img');
            const mainImageCaption = projectContent.querySelector('.main-image p');
            
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.src = images[currentImageIndex].url;
                mainImageCaption.textContent = images[currentImageIndex].caption;
                mainImage.style.opacity = 1;
            }, 300);
            
            updateImageNavigation(images);
        }
    }
    
    // Function to open modal with project data
    function openProjectModal(projectId) {
        // Check if project data exists
        if (projectsData && projectsData[projectId]) {
            const project = projectsData[projectId];
            currentProject = project;
            currentImageIndex = 0;
            const modalContainer = document.getElementById('modal-container');
            
            // Create modal content HTML
            let modalContent = `
                <h2 class="text-2xl md:text-3xl font-serif mb-2">${project.title}</h2>
                <div class="flex flex-wrap text-sage mb-6 md:mb-8 text-sm md:text-base">
                    <span class="mr-4">${project.category}</span>
                    <span class="mr-4">${project.location}</span>
                    <span>${project.year}</span>
                </div>
                
                <!-- Project image gallery -->
                <div class="mb-6 md:mb-8">
                    <div class="project-gallery relative">
                        <div class="main-image mb-4">
                            <img src="${project.images[0].url}" alt="${project.title}" class="w-full h-[40vh] md:h-[50vh] object-cover">
                            <p class="text-xs md:text-sm text-sage mt-2 italic px-4 md:px-0">${project.images[0].caption}</p>
                        </div>
                        
                        <!-- Navigation Arrows -->
                        <button id="prev-image" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-cream text-olive p-2 rounded-full shadow-lg z-10 hover:bg-sage hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button id="next-image" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cream text-olive p-2 rounded-full shadow-lg z-10 hover:bg-sage hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <div class="grid grid-cols-4 gap-2 md:gap-4 px-4 md:px-0">
                            ${project.images.map((image, index) => `
                                <div class="thumbnail cursor-pointer overflow-hidden ${index === 0 ? 'active' : ''}">
                                    <img src="${image.url}" alt="${image.caption}" class="w-full h-16 md:h-32 object-cover transition-transform duration-300 hover:scale-110" data-full="${image.url}" data-caption="${image.caption}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Project details -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 px-4 md:px-0">
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Client</h3>
                        <p class="text-sm md:text-base">${project.client}</p>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Scope</h3>
                        <p class="text-sm md:text-base">${project.scope}</p>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Year</h3>
                        <p class="text-sm md:text-base">${project.year}</p>
                    </div>
                </div>
                
                <!-- Project description -->
                <div class="mb-6 md:mb-8 px-4 md:px-0">
                    <h3 class="text-lg md:text-xl font-serif mb-2">About the Project</h3>
                    <p class="text-sm md:text-base mb-4">${project.description}</p>
                </div>
                
                <!-- Challenge, Approach, Result -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 px-4 md:px-0">
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Challenge</h3>
                        <p class="text-sm md:text-base">${project.challenge}</p>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Approach</h3>
                        <p class="text-sm md:text-base">${project.approach}</p>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-serif mb-2">Result</h3>
                        <p class="text-sm md:text-base">${project.result}</p>
                    </div>
                </div>
                
                <!-- Testimonial -->
                <div class="bg-sage bg-opacity-10 p-4 md:p-8 my-6 md:my-8 mx-4 md:mx-0">
                    <p class="text-lg md:text-xl font-serif italic mb-4 text-sm md:text-base">"${project.testimonial.quote}"</p>
                    <p class="uppercase tracking-widest text-xs md:text-sm">— ${project.testimonial.author}</p>
                </div>
            `;
            
            // Update modal content
            projectContent.innerHTML = modalContent;
            
            // Add event listeners to thumbnails
            const thumbnails = projectContent.querySelectorAll('.thumbnail img');
            const mainImage = projectContent.querySelector('.main-image img');
            const mainImageCaption = projectContent.querySelector('.main-image p');
            const prevImageBtn = projectContent.querySelector('#prev-image');
            const nextImageBtn = projectContent.querySelector('#next-image');
            
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function() {
                    currentImageIndex = index;
                    const fullSrc = this.getAttribute('data-full');
                    const caption = this.getAttribute('data-caption');
                    
                    // Animate the image change
                    mainImage.style.opacity = 0;
                    setTimeout(() => {
                        mainImage.src = fullSrc;
                        mainImageCaption.textContent = caption;
                        mainImage.style.opacity = 1;
                    }, 300);
                    
                    // Update active thumbnail
                    thumbnails.forEach(t => t.parentElement.classList.remove('active'));
                    this.parentElement.classList.add('active');
                    
                    updateImageNavigation(project.images);
                });
            });
            
            // Add event listeners for navigation buttons
            prevImageBtn.addEventListener('click', () => {
                changeImage(-1, project.images);
            });
            
            nextImageBtn.addEventListener('click', () => {
                changeImage(1, project.images);
            });
            
            // Show the modal with animation
            projectModal.classList.remove('hidden');
            
            // Trigger reflow to ensure transition works
            void projectModal.offsetWidth;
            
            // Add opacity to fade in the modal background
            projectModal.classList.add('opacity-100');
            
            // Animate the modal container
            setTimeout(() => {
                modalContainer.classList.remove('scale-95', 'opacity-0');
                modalContainer.classList.add('scale-100', 'opacity-100');
            }, 50);
            
            // Prevent body scrolling
            body.classList.add('overflow-hidden');
            
            // Update navigation buttons
            updateImageNavigation(project.images);
        }
    }
    
    // Add click event to project items
    projectItems.forEach(item => {
        const projectImage = item.querySelector('.relative');
        
        projectImage.addEventListener('click', function() {
            const projectId = item.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });
    
    // Close modal functionality
    function closeModal() {
        const modalContainer = document.getElementById('modal-container');
        
        // Animate closing
        projectModal.classList.remove('opacity-100');
        modalContainer.classList.remove('scale-100', 'opacity-100');
        modalContainer.classList.add('scale-95', 'opacity-0');
        
        // Hide modal after animation completes
        setTimeout(() => {
            projectModal.classList.add('hidden');
            body.classList.remove('overflow-hidden');
        }, 300);
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });
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