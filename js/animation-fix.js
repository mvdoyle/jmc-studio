// Simple animation fix for JMC Studio - Direct and minimal approach
// Completely rewritten to ensure menu links work properly

document.addEventListener('DOMContentLoaded', function() {
    console.log('Animation fix script loaded - Direct implementation');
    
    // Get the animation element
    const introAnimation = document.getElementById('intro-animation');
    if (!introAnimation) {
        console.error('Intro animation element not found');
        return;
    }
    
    // Handle initial page load animation
    handleInitialAnimation(introAnimation);
    
    // Add direct event listeners to navigation links
    addDirectEventListeners();
});

// Handle the initial page load animation
function handleInitialAnimation(introElement) {
    // Check if this is a new page load or a refresh
    const isFromTransition = sessionStorage.getItem('animationTransition') === 'true';
    
    // Clear the flag
    sessionStorage.removeItem('animationTransition');
    
    if (!isFromTransition) {
        // New page load, show animation
        console.log('Initial page load - showing animation');
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Show animation
        introElement.style.display = 'flex';
        introElement.style.opacity = '1';
        
        // After 2 seconds, hide it
        setTimeout(function() {
            introElement.style.opacity = '0';
            
            // After animation completes, hide the element and restore scrolling
            setTimeout(function() {
                introElement.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }, 2000);
    } else {
        // Coming from transition, hide animation
        console.log('Coming from transition - hiding animation');
        introElement.style.opacity = '0';
        introElement.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add direct click handlers to each navigation link
function addDirectEventListeners() {
    // MANUAL DIRECT HANDLERS FOR EACH MENU LINK
    // This ensures we're not using complex selectors that might fail
    
    // About page link
    const aboutLinks = document.querySelectorAll('a[href="about.html"]');
    aboutLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            navigateWithAnimation('about.html');
            return false;
        };
    });
    
    // Projects page link
    const projectLinks = document.querySelectorAll('a[href="projects.html"]');
    projectLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            navigateWithAnimation('projects.html');
            return false;
        };
    });
    
    // Process page link
    const processLinks = document.querySelectorAll('a[href="process.html"]');
    processLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            navigateWithAnimation('process.html');
            return false;
        };
    });
    
    // Inquire page link
    const inquireLinks = document.querySelectorAll('a[href="inquire.html"]');
    inquireLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            navigateWithAnimation('inquire.html');
            return false;
        };
    });
    
    // Home page link (index)
    const homeLinks = document.querySelectorAll('a[href="index.html"], a[href="./"], a[href="/"], a[href="."]');
    homeLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            navigateWithAnimation('index.html');
            return false;
        };
    });
    
    console.log('Direct event listeners added to navigation links');
}

// Navigate to the given page with animation
function navigateWithAnimation(targetPage) {
    console.log('Navigating to: ' + targetPage);
    
    // Get animation element
    const introAnimation = document.getElementById('intro-animation');
    if (!introAnimation) {
        // Fallback - just navigate
        window.location.href = targetPage;
        return;
    }
    
    // Set transition flag
    sessionStorage.setItem('animationTransition', 'true');
    
    // Show animation
    introAnimation.style.display = 'flex';
    introAnimation.style.opacity = '0'; // Start transparent
    
    // Make sure logo is visible
    const logoImage = introAnimation.querySelector('.intro-logo-image');
    if (logoImage) {
        logoImage.style.opacity = '1';
        logoImage.style.visibility = 'visible';
    }
    
    // Force a reflow
    void introAnimation.offsetWidth;
    
    // Make animation visible with transition
    introAnimation.style.opacity = '1';
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Navigate after delay
    setTimeout(function() {
        window.location.href = targetPage;
    }, 800);
} 