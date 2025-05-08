// Custom JavaScript for Jujutsu Kaisen Art Gallery

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap Carousel with custom settings
  const featuredCarousel = document.getElementById('featuredCarousel');
  if (featuredCarousel) {
    const carousel = new bootstrap.Carousel(featuredCarousel, {
      interval: 5000,
      wrap: true,
      touch: true
    });
    
    // Pause carousel on hover
    featuredCarousel.addEventListener('mouseenter', function() {
      carousel.pause();
    });
    
    featuredCarousel.addEventListener('mouseleave', function() {
      carousel.cycle();
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 56, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation to cards when they come into view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-card');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.panel-card').forEach(card => {
    observer.observe(card);
  });
  
  // Handle form submission for artwork uploads
  const submitButtons = document.querySelectorAll('.btn-primary');
  submitButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.textContent.includes('Submit')) {
        alert('Thank you for your interest! The submission form will be available soon.');
      }
    });
  });
  
  // Add active class to nav items when scrolling
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
