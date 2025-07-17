// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌓';
themeToggle.id = 'theme-toggle';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// Project Card Hover Effects
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('img').style.transform = 'scale(1.05)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('img').style.transform = 'scale(1)';
  });
});

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});