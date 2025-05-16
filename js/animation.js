// GSAP Animations for Portfolio V3
document.addEventListener("DOMContentLoaded", () => {
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
    .from(".text-[3em], .text-[1.5em]", { 
      y: 50, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.2, 
      ease: "power3.out" 
    }, "-=0.5")
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
});
