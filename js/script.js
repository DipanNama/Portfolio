const toggleSidebarOpen = document.querySelector('#toggle-sidebar-open');
const toggleSidebarClose = document.querySelector('#toggle-sidebar-close');
const nav = document.querySelector('#nav');
const sidebar = document.querySelector('#sidebar');

// Add CSS for sidebar animation
const style = document.createElement('style');
style.innerHTML = `
  #sidebar {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
  }
  
  #sidebar.active {
    transform: translateX(0);
    opacity: 1;
  }
`;
document.head.appendChild(style);

toggleSidebarOpen.addEventListener('click', () => {
  sidebar.classList.remove('hidden');
  nav.classList.add('hidden');
  
  // Trigger reflow to ensure transition works
  sidebar.offsetWidth;
  
  // Add active class to animate in
  sidebar.classList.add('active');
});

toggleSidebarClose.addEventListener('click', () => {
  // First remove active class to trigger animation
  sidebar.classList.remove('active');
  
  // After animation completes, hide the sidebar
  setTimeout(() => {
    sidebar.classList.add('hidden');
    nav.classList.remove('hidden');
  }, 300); // Same duration as the CSS transition
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


// Get all navigation links (both desktop and mobile)
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#sidebar li a');

// Function to set the active class
function setActiveLink() {
  const currentHash = window.location.hash || '#home';
  
  // Update desktop navigation
  navLinks.forEach(link => {
    // Remove active styles from all links
    link.classList.remove('bg-zinc-700', 'font-bold', 'border-zinc-600', 'active');

    // Add active styles to the current link
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('bg-zinc-700', 'font-bold', 'border-zinc-600', 'active');
    }
  });
  
  // Update mobile navigation
  mobileNavLinks.forEach(link => {
    // Remove active styles
    link.classList.remove('active', 'bg-white/10');
    
    if (link.querySelector('span')) {
      link.querySelector('span').classList.remove('text-[#14ae96]');
    }
    
    // Add active styles to current link
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active', 'bg-white/10');
      
      if (link.querySelector('span')) {
        link.querySelector('span').classList.add('text-[#14ae96]');
      }
    }
  });
}

// Set active link on page load
setActiveLink();

// Set active link on hash change
window.addEventListener('hashchange', setActiveLink);

// Close sidebar when a mobile menu link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    // First remove active class to trigger animation
    sidebar.classList.remove('active');
    
    // After animation completes, hide the sidebar
    setTimeout(() => {
      sidebar.classList.add('hidden');
      nav.classList.remove('hidden');
    }, 300);
  });
});


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

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.querySelector('.submit-text');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  
  if (!contactForm) return; // Exit if contact form doesn't exist
  
  // Form validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^.{3,100}$/,
    message: /^.{10,1000}$/
  };

  // Validation messages
  const messages = {
    name: 'Name must be 2-50 characters and contain only letters and spaces',
    email: 'Please enter a valid email address',
    subject: 'Subject must be 3-100 characters long',
    message: 'Message must be 10-1000 characters long'
  };

  // Real-time validation function
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = field.parentElement.parentElement.querySelector('.form-error-message');
    const isValid = patterns[fieldName].test(value);
    
    if (value === '') {
      // Field is empty
      field.classList.remove('border-red-500', 'border-green-500');
      field.classList.add('border-zinc-700');
      errorElement.classList.add('hidden');
      return false;
    } else if (isValid) {
      // Field is valid
      field.classList.remove('border-red-500', 'border-zinc-700');
      field.classList.add('border-green-500');
      errorElement.classList.add('hidden');
      return true;
    } else {
      // Field is invalid
      field.classList.remove('border-green-500', 'border-zinc-700');
      field.classList.add('border-red-500');
      errorElement.textContent = messages[fieldName];
      errorElement.classList.remove('hidden');
      return false;
    }
  }

  // Add real-time validation to form fields
  const formFields = contactForm.querySelectorAll('input, textarea');
  formFields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      // Only validate if field has been touched (blurred)
      if (field.classList.contains('border-red-500') || field.classList.contains('border-green-500')) {
        validateField(field);
      }
    });
  });

  // Form submission handler
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide any previous messages
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');
    
    // Validate all fields
    let isFormValid = true;
    formFields.forEach(field => {
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      // Scroll to first error
      const firstError = contactForm.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    submitText.textContent = 'Sending...';
    
    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin';
    submitBtn.querySelector('span').appendChild(spinner);
    
    try {
      // Collect form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
      };
      
      // Simulate API call (replace with actual endpoint)
      await simulateFormSubmission(data);
      
      // Show success message
      formSuccess.classList.remove('hidden');
      contactForm.reset();
      
      // Reset field styles
      formFields.forEach(field => {
        field.classList.remove('border-red-500', 'border-green-500');
        field.classList.add('border-zinc-700');
      });
      
      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.add('hidden');
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      formError.classList.remove('hidden');
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        formError.classList.add('hidden');
      }, 5000);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      submitText.textContent = 'Send Message';
      
      // Remove spinner
      const spinnerElement = submitBtn.querySelector('.animate-spin');
      if (spinnerElement) {
        spinnerElement.remove();
      }
    }
  });
  
  // Simulate form submission (replace with actual API call)
  async function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          console.log('Form submitted:', data);
          resolve(data);
        } else {
          reject(new Error('Simulated network error'));
        }
      }, 2000); // 2 second delay to simulate network request
    });
  }
  
  // Character counter for message field
  const messageField = document.getElementById('message');
  if (messageField) {
    const charCounter = document.createElement('div');
    charCounter.className = 'text-zinc-500 text-xs mt-1 text-right';
    messageField.parentElement.appendChild(charCounter);
    
    function updateCharCounter() {
      const current = messageField.value.length;
      const max = 1000;
      const min = 10;
      
      charCounter.textContent = `${current}/${max} characters`;
      
      if (current < min) {
        charCounter.className = 'text-zinc-500 text-xs mt-1 text-right';
      } else if (current > max * 0.9) {
        charCounter.className = 'text-yellow-400 text-xs mt-1 text-right';
      } else {
        charCounter.className = 'text-green-400 text-xs mt-1 text-right';
      }
    }
    
    messageField.addEventListener('input', updateCharCounter);
    updateCharCounter(); // Initialize counter
  }
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});