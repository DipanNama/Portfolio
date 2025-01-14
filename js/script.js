const toggleSidebarOpen = document.querySelector('#toggle-sidebar-open');
const toggleSidebarClose = document.querySelector('#toggle-sidebar-close');

toggleSidebarOpen.addEventListener('click',() => {
    document.querySelector('#sidebar').classList.remove('hidden');
});

toggleSidebarClose.addEventListener('click',() => {
    document.querySelector('#sidebar').classList.add('hidden');
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