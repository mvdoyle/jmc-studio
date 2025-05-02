// Direct link fix - overrides all other scripts to ensure navigation works
// This script runs last and takes priority

(function() {
    // Wait for DOM to be fully loaded and all other scripts to run
    window.addEventListener('load', function() {
        console.log('Direct link fix running - overriding navigation handlers');
        
        // Helper function to create direct navigation
        function createDirectNavigation(url) {
            return function(e) {
                // If user pressed ctrl or command key, allow default behavior (new tab)
                if (e.ctrlKey || e.metaKey) {
                    return true;
                }
                
                e.preventDefault(); // Prevent default behavior
                console.log('Direct navigation to: ' + url);
                window.location.href = url;
                return false; // Prevent default
            };
        }
        
        // For each menu link, override the click event
        // About link
        const aboutLinks = document.querySelectorAll('a[href="about.html"]');
        aboutLinks.forEach(function(link) {
            // Override all event handlers
            link.onclick = createDirectNavigation('about.html');
        });
        
        // Projects link
        const projectLinks = document.querySelectorAll('a[href="projects.html"]');
        projectLinks.forEach(function(link) {
            link.onclick = createDirectNavigation('projects.html');
        });
        
        // Process link
        const processLinks = document.querySelectorAll('a[href="process.html"]');
        processLinks.forEach(function(link) {
            link.onclick = createDirectNavigation('process.html');
        });
        
        // Inquire link
        const inquireLinks = document.querySelectorAll('a[href="inquire.html"]');
        inquireLinks.forEach(function(link) {
            link.onclick = createDirectNavigation('inquire.html');
        });
        
        // Home link - expanded selector to catch all possible variations
        const homeLinks = document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a[href="/"], a[href="./"], a[href="."], a[href=""], a[href="../index.html"], a[href="../"]');
        homeLinks.forEach(function(link) {
            // Determine the correct path based on current location
            let targetUrl = 'index.html';
            if (window.location.pathname.includes('/projects/')) {
                targetUrl = '../index.html';
            }
            link.onclick = createDirectNavigation(targetUrl);
        });
        
        // Additionally, handle clicks on the logo which often leads to home
        const logoImages = document.querySelectorAll('header img, .logo img');
        logoImages.forEach(function(logo) {
            const parentAnchor = logo.closest('a');
            if (parentAnchor) {
                // Determine the correct path based on current location
                let targetUrl = 'index.html';
                if (window.location.pathname.includes('/projects/')) {
                    targetUrl = '../index.html';
                }
                parentAnchor.onclick = createDirectNavigation(targetUrl);
            }
        });
        
        console.log('Direct navigation links established');
    });
})(); 