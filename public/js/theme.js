// theme.js: Dark mode toggle with localStorage
(function() {
  function setDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', '1');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', '0');
    }
  }

  // On page load, set mode from localStorage
  document.addEventListener('DOMContentLoaded', function() {
    const dark = localStorage.getItem('darkMode') === '1';
    setDarkMode(dark);
    // Add event for toggle button
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
      btn.onclick = function() {
        setDarkMode(!document.body.classList.contains('dark-mode'));
      };
    }
  });
})();
