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

tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  }
}