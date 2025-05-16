// GSAP Animations for Portfolio V3
document.addEventListener("DOMContentLoaded", () => {
  // Page Loader Animation (simplified without circle animation)
  const pageLoader = document.getElementById('page-loader');
  const siteWrapper = document.getElementById('smooth-wrapper');
  
  // Simple fade out loader after breathing animation ends
  setTimeout(() => {
    // Hide loader and show site content
    pageLoader.style.opacity = 0;
    pageLoader.style.pointerEvents = 'none';
    siteWrapper.style.opacity = 1;
    siteWrapper.style.transition = 'opacity 0.5s ease';
    document.body.style.overflow = 'hidden'; // Ensure body doesn't scroll during transition
    
    // Remove loader from DOM after fade out and fix scrolling
    setTimeout(() => {
      pageLoader.remove();
      document.body.style.overflow = ''; // Reset overflow to default value
      document.body.style.height = '';
      window.scrollTo(0, 0); // Reset scroll position to top
      
      // Initialize typing effect after page loads
      initTypingEffect();
      
      // Initialize interactive background particles
      initParticles();
    }, 600);
  }, 1500); // Match with breathing animation duration (1.5s)
  
  // Register ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Smooth scroll initialization
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    smoothTouch: 0.1,
    effects: true
  });
  
  // Intro animation when page loads
  const tl = gsap.timeline();
  tl.from("nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".desktop-resume-btn", { 
      x: 50, 
      opacity: 0, 
      duration: 0.6, 
      ease: "back.out(1.7)",
    }, "-=0.5")
    .from(".text-[3em], .text-[1.5em]", { 
      y: 50, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.2, 
      ease: "power3.out" 
    }, "-=0.3")
    .from(".social-icon, .scroll-btn", { 
      opacity: 0, 
      y: 20, 
      duration: 0.5, 
      stagger: 0.1,
      ease: "power3.out" 
    }, "-=0.3")
    .from(".msg-block", {
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.5");

  // Parallax effect for message blocks
  document.querySelectorAll('.msg-block').forEach(block => {
    gsap.to(block, {
      y: -50,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll('section, #about, #technologies, #projects, #experience, #services, #contact');
  sections.forEach(section => {
    gsap.fromTo(section, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          markers: false
        }
      }
    );
  });

  // About section animations
  if (document.querySelector('#about')) {
    // Animate the about section content with staggered timing
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    });
    
    aboutTl
      .from('#about h1', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      })
      .from('#about .info p', { 
        y: 30, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.2, 
        ease: 'power3.out' 
      }, '-=0.4')
      .from('#about .achievements', { 
        x: -30, 
        opacity: 0, 
        duration: 0.7, 
        ease: 'back.out(1.2)' 
      }, '-=0.2')
      .from('#about .resume-download-btn', { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.5, 
        ease: 'back.out(1.7)' 
      }, '-=0.3')
      .from('#about .social-link', { 
        y: 20, 
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: 'power3.out' 
      }, '-=0.2')
      .from('#about .stats h3', { 
        opacity: 0, 
        y: 20, 
        duration: 0.5, 
        ease: 'power3.out' 
      }, '-=0.5')
      .from('#about .stat-item', { 
        width: 0, 
        opacity: 0, 
        duration: 0.7, 
        stagger: 0.15, 
        ease: 'power3.out' 
      }, '-=0.3');
      
    // Animate stat bars on scroll with a slight delay
    gsap.from('#about .stat-item .h-full', {
      width: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#about .stats',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Animate skill ratings
    gsap.from('#about .skill-rating', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about .skill-rating',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
    
    // Animate skill bars
    gsap.from('#about .skill-rating .h-1\\.5', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about .skill-rating',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: 0.3
    });
    
    // Animate certification items
    gsap.from('#about .certification-item', {
      opacity: 0,
      x: -20,
      duration: 0.7,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '#about .certification-item',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
    
    // Animate CTA button
    gsap.from('#about .portfolio-btn', {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '#about .portfolio-btn',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Animate bento grid sections on scroll
  const bentoSections = document.querySelectorAll('#technologies .grid > div');
  gsap.fromTo(bentoSections, 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '#technologies',
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Animate skill chips on scroll with staggered effect
  const skillChips = document.querySelectorAll('.skill-chip');
  gsap.fromTo(skillChips, 
    { scale: 0.8, opacity: 0, y: 20 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '#technologies',
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      delay: 0.3 // Start after the bento sections appear
    }
  );
  
  // Add hover animations for skill chips
  skillChips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      gsap.to(chip, { 
        scale: 1.1, 
        boxShadow: "0 0 15px rgba(20, 174, 150, 0.5)",
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
    
    chip.addEventListener('mouseleave', () => {
      gsap.to(chip, { 
        scale: 1, 
        boxShadow: "none",
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
  });

  // Animate project cards with stagger
  const projectCards = document.querySelectorAll('.project-card');
  gsap.fromTo(projectCards,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#projects',
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Animate technology chips with staggered effect
  projectCards.forEach(card => {
    const techChips = card.querySelectorAll('.tech-chip');
    gsap.fromTo(techChips, 
      { scale: 0.8, opacity: 0, y: 10 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        delay: 0.3
      }
    );
  });

  // Animate experience items with stagger
  const experienceItems = document.querySelectorAll('.experience-item');
  gsap.fromTo(experienceItems,
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#experience',
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Service cards animation
  const serviceCards = document.querySelectorAll('.service-card');
  gsap.fromTo(serviceCards,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#services',
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Contact form animation
  gsap.fromTo('#contact form',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#contact',
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Footer copyright animation
  gsap.fromTo('.footer-copyright',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: 'footer',
        start: "top bottom",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Scroll to top button
  const scrollToTopButton = document.getElementById('scroll-to-top');
  
  // Show button when scrolled down
  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    onUpdate: (self) => {
      if (self.direction === -1) {
        // Scrolling up
        gsap.to(scrollToTopButton, {opacity: 0, duration: 0.3});
      } else {
        // Scrolling down
        gsap.to(scrollToTopButton, {opacity: 1, duration: 0.3});
      }
    }
  });
  
  // Click behavior for scroll to top
  scrollToTopButton.addEventListener('click', () => {
    smoother.scrollTop(0, 1);
  });

  // Animate social links with bounce on hover
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
    });
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.3 });
    });
  });
  
  // Animate project buttons on hover
  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn.querySelector('.btn-bg'), { width: '100%', duration: 0.3 });
      gsap.to(btn.querySelector('.btn-text'), { color: '#000', duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn.querySelector('.btn-bg'), { width: '0%', duration: 0.3 });
      gsap.to(btn.querySelector('.btn-text'), { color: '#fff', duration: 0.3 });
    });
  });
  
  // Initialize Typed.js for the typing effect
  function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    
    if (typedElement) {
      new Typed('#typed-text', {
        strings: [
          'Fullstack developer',
          'Android developer',
          'CTF player',
          'problem solver',
          'UI/UX enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
      });
    }
  }
  
  // Initialize interactive particles background
  function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Create particles
    const particleCount = 30;
    const particles = [];
    
    // Create and append particles to DOM
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Store particle properties for animation
      const particleObj = {
        element: particle,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.2, // Slow movement
        speedY: (Math.random() - 0.5) * 0.2,
        size: size
      };
      
      particles.push(particleObj);
      particlesContainer.appendChild(particle);
    }
    
    // Animate particles
    function animateParticles() {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= 100) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= 100) {
          particle.speedY *= -1;
        }
        
        // Update DOM element position
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Add mouse interaction
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.forEach(particle => {
        // Subtle attraction to mouse
        const distX = mouseX * 100 - particle.x;
        const distY = mouseY * 100 - particle.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 30) { // Only affect particles within range
          particle.speedX += distX * 0.0005;
          particle.speedY += distY * 0.0005;
          
          // Limit speed
          const maxSpeed = 0.4;
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        }
      });
    });
  }
});
