const toggleSidebarOpen = document.querySelector('#toggle-sidebar-open');
const toggleSidebarClose = document.querySelector('#toggle-sidebar-close');
const nav = document.querySelector('#nav');

toggleSidebarOpen.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.remove('hidden');
  nav.classList.add('hidden');
});

toggleSidebarClose.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.add('hidden');
  nav.classList.remove('hidden');
});

const msgBlocks = document.querySelectorAll('.msg-block');

msgBlocks.forEach(msgBlock => {
  msgBlock.addEventListener("mouseover", () => {
    msgBlock.style.animationPlayState = "paused";
  });

  msgBlock.addEventListener("mouseout", () => {
    msgBlock.style.animationPlayState = "running";
  });
});


// Get all links
const navLinks = document.querySelectorAll('.nav-link');

// Function to set the active class
function setActiveLink() {
  navLinks.forEach(link => {
    // Remove active styles from all links
    link.classList.remove('bg-zinc-700', 'font-bold', 'border-zinc-600');

    // Add active styles to the current link
    if (link.getAttribute('href') === window.location.hash) {
      link.classList.add('bg-zinc-700', 'font-bold', 'border-zinc-600');
    }
  });
}

// Set active link on page load
setActiveLink();

// Set active link on hash change
window.addEventListener('hashchange', setActiveLink);


function setupIntersectionOvserver(element, isLTR, speed){

  const intersectionCallback = (entries, observer) => {
    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
      document.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const offset = scroll * speed;
        if (isLTR) {
          element.style.transform = `translateX(${offset}px)`;
        } else {
          element.style.transform = `translateX(-${offset}px)`;
        }
      });
    }
  }

  const intersectionObserver = new IntersectionObserver(intersectionCallback);

  intersectionObserver.observe(element);
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

setupIntersectionOvserver(line1, true, 0.25);
setupIntersectionOvserver(line2, false, 0.15);
setupIntersectionOvserver(line3, true, 0.35);



tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
        primary: '#14ae96',
        secondary: '#8b5cf6'
      },
      animation: {
        'spin': 'spin 0.5s linear',
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite'
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        bounce: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      }
    }
  }
}

// Enhanced Theme toggle logic with animations and more robust state management
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;
  
  // Add theme transition class to necessary elements
  const elementsToTransition = [
    document.body,
    ...document.querySelectorAll('.bg-white\\/5, .bg-white\\/10, .border')
  ];
  
  elementsToTransition.forEach(el => {
    if (el) el.classList.add('theme-transition');
  });

  function setTheme(theme, animate = true) {
    // Add animation class for smooth transitions
    if (animate) {
      document.body.classList.add('theme-transition');
      setTimeout(() => document.body.classList.remove('theme-transition'), 500);
    }
    
    if (theme === 'light') {
      // Set light theme
      html.classList.add('light');
      html.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      
      // Update toggle icon with animation
      themeToggleIcon.classList.add('animate-spin');
      setTimeout(() => {
        themeToggleIcon.classList.remove('ri-moon-line');
        themeToggleIcon.classList.add('ri-sun-line');
        themeToggleIcon.classList.remove('animate-spin');
      }, 150);
      
      // Update any additional light theme specific elements
      document.querySelectorAll('[data-theme-toggle]').forEach(el => {
        el.setAttribute('data-theme', 'light');
      });
    } else {
      // Set dark theme
      html.classList.add('dark');
      html.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      
      // Update toggle icon with animation
      themeToggleIcon.classList.add('animate-spin');
      setTimeout(() => {
        themeToggleIcon.classList.remove('ri-sun-line');
        themeToggleIcon.classList.add('ri-moon-line');
        themeToggleIcon.classList.remove('animate-spin');
      }, 150);
      
      // Update any additional dark theme specific elements
      document.querySelectorAll('[data-theme-toggle]').forEach(el => {
        el.setAttribute('data-theme', 'dark');
      });
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Dispatch custom event for other components to listen for theme changes
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
  }

  // Initialize theme from local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme, false); // Apply without animation on initial load
  } else {
    setTheme(prefersDark ? 'dark' : 'light', false);
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't manually set theme
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Add click event listener to the theme toggle button with debouncing
  if (themeToggle) {
    let isThemeChanging = false;
    
    themeToggle.addEventListener('click', () => {
      if (isThemeChanging) return; // Prevent rapid clicking
      
      isThemeChanging = true;
      const isLight = document.body.classList.contains('light');
      setTheme(isLight ? 'dark' : 'light');
      
      // Add subtle pulse animation to theme toggle
      themeToggle.classList.add('scale-110');
      setTimeout(() => {
        themeToggle.classList.remove('scale-110');
        isThemeChanging = false;
      }, 300);
    });
    
    // Add hover effect to theme toggle button
    themeToggle.addEventListener('mouseenter', () => {
      themeToggleIcon.classList.add('animate-pulse');
    });
    
    themeToggle.addEventListener('mouseleave', () => {
      themeToggleIcon.classList.remove('animate-pulse');
    });
  }
});