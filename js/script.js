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
    link.classList.remove('bg-zinc-600', 'font-bold', 'border-zinc-600');

    // Add active styles to the current link
    if (link.getAttribute('href') === window.location.hash) {
      link.classList.add('bg-zinc-600', 'font-bold', 'border-zinc-600');
    }
  });
}

// Set active link on page load
setActiveLink();

// Set active link on hash change
window.addEventListener('hashchange', setActiveLink);





tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  }
}