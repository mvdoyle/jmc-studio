// Shared JavaScript file for JMC Studio
// This file contains functionality that should be consistent across all pages

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing shared functionality");
    
    // Initialize the page transition on page load
    storePageVisit();
    
    // Note: Animation functionality is now handled by animation-fix.js
});

// Store page visit timestamp in sessionStorage
function storePageVisit() {
    sessionStorage.setItem('lastPageVisit', Date.now());
    
    // Set up beforeunload event listener for page transitions
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('pageTransition', 'true');
    });
} 