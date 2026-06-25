// Main JavaScript functionality for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Debug: Check if elements exist
    const navContainer = document.querySelector('.nav-container');
    const header = document.querySelector('header');
    const projectsDiv = document.getElementById('projects');
    const experienceDiv = document.getElementById('experience');
    
    console.log('Nav container:', navContainer);
    console.log('Header:', header);
    console.log('Projects div:', projectsDiv);
    console.log('Experience div:', experienceDiv);

    // TEMPORARY: Force show the nav container for testing
    if (navContainer) {
        navContainer.classList.add('test-visible');
        console.log('Added test-visible class to nav container');
    }

    // Add staggered fade-in animation for header elements
    const headerElements = document.querySelectorAll('header h1, header p, header nav');
    headerElements.forEach((element, index) => {
        element.style.animation = `headerFadeIn 1.5s ease-out ${index * 0.3}s forwards`;
        element.style.opacity = '0';
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fa fa-sun';
        updateBackgroundCanvas();
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fa fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fa fa-moon';
            localStorage.setItem('theme', 'light');
        }
        
        // This is the key addition - force the background canvas to update
        updateBackgroundCanvas();
    });

    // Function to force update the background canvas
    function updateBackgroundCanvas() {
        const canvas = document.getElementById('backgroundCanvas');
        if (!canvas) return;
        
        // Reinitialize the entire animation
        if (window.reinitializeBackgroundAnimation) {
            window.reinitializeBackgroundAnimation();
        }
    }

    // NATIVE SMOOTH SCROLL FUNCTION
    function forceScrollTo(target) {
        if (!target) return;

        console.log('=== SMOOTH SCROLL ANIMATION ===');
        console.log('Target element:', target);

        // Get current scroll position
        const startPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate target position
        let absoluteTop = 0;
        let element = target;
        
        while (element) {
            absoluteTop += element.offsetTop;
            element = element.offsetParent;
        }
        
        const headerOffset = 120;
        const targetPosition = absoluteTop - headerOffset;
        
        // Calculate distance to scroll
        const distance = targetPosition - startPosition;
        
        console.log('Start position:', startPosition);
        console.log('Target position:', targetPosition);
        console.log('Distance to scroll:', distance);

        // Animation settings
        const duration = 1000; // Duration in ms
        let start = null;

        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easeInOutCubic(progress);
            const currentPosition = startPosition + distance * easedProgress;
            
            window.scrollTo(0, currentPosition);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Ensure we land exactly on target
                window.scrollTo(0, targetPosition);
                console.log('Final scroll position:', window.pageYOffset);
                
                // Verification
                setTimeout(() => {
                    const finalPosition = window.pageYOffset;
                    console.log('Verified final position:', finalPosition);
                    console.log('Target position:', targetPosition);
                    console.log('Accuracy:', Math.abs(finalPosition - targetPosition));
                }, 100);
            }
        }

        // Start animation
        requestAnimationFrame(animation);
    }

    // Use event delegation to handle clicks on all navigation links (current and future)
    document.addEventListener('click', function(e) {
        // Check if clicked element is a navigation link
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            console.log('=== NAVIGATION CLICK (Event Delegation) ===');
            console.log('Clicked anchor:', e.target.getAttribute('href'));
            console.log('Clicked element:', e.target);
            console.log('Parent container:', e.target.closest('.nav-container') ? 'sidebar' : 'header');
            
            const targetId = e.target.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            console.log('Target ID:', targetId);
            console.log('Target element:', target);
            
            if (target) {
                forceScrollTo(target);
            } else {
                console.error('Target element not found:', targetId);
            }
        }
    });

    // Show/hide the floating sidebar navigation based on scroll
    if (navContainer && header) {
        let lastScroll = 0;
        const scrollThreshold = 200; // Adjust this value as needed

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > scrollThreshold) {
                // Scrolling down past threshold
                navContainer.classList.add('visible');
                header.classList.add('nav-hidden');
            } else {
                // Scrolling back up
                navContainer.classList.remove('visible');
                header.classList.remove('nav-hidden');
            }

            lastScroll = currentScroll;
        });
    }
});