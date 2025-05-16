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
      }
    }
  }
}

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;

  function setTheme(theme) {
    if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      themeToggleIcon.classList.remove('ri-moon-line');
      themeToggleIcon.classList.add('ri-sun-line');
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      themeToggleIcon.classList.remove('ri-sun-line');
      themeToggleIcon.classList.add('ri-moon-line');
    }
    localStorage.setItem('theme', theme);
  }

  // Initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Add click event listener to the theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light');
      setTheme(isLight ? 'dark' : 'light');
    });
  }
});