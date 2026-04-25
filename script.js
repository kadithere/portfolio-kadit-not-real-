// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// Loader Timeline
const tl = gsap.timeline();

tl.to('.progress', {
  width: '100%',
  duration: 1.5,
  ease: 'power3.inOut'
})
.to('.loader', {
  yPercent: -100,
  duration: 0.8,
  ease: 'power4.inOut'
})
.from('.hero-title', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power4.out'
}, "-=0.3")
.from('.fade-up', {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: 'power3.out'
}, "-=0.8");

// Scroll Animations
const fadeUps = document.querySelectorAll('.fade-up');
fadeUps.forEach(elem => {
  gsap.fromTo(elem, 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

// Parallax Images
const parallaxImgs = document.querySelectorAll('.parallax-img .pixel-placeholder');
parallaxImgs.forEach(img => {
  gsap.fromTo(img,
    { scale: 1.2, y: -20 },
    {
      scale: 1,
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
});

// Smooth Scroll (Lenis style lightweight implementation using GSAP ScrollTo if needed, or native)
// Native CSS scroll-behavior usually conflicts with GSAP ScrollTrigger pinning, 
// but since we aren't pinning, native smooth scrolling in CSS (or Lenis) is ideal.
// For this demo, simple scroll is fine.

// Terminal Text Effect
const terminalOutput = document.querySelectorAll('.output');
terminalOutput.forEach(out => {
  const originalText = out.innerText;
  out.innerText = '';
  
  ScrollTrigger.create({
    trigger: out.parentElement,
    start: 'top 80%',
    onEnter: () => {
      let i = 0;
      out.innerText = '';
      const interval = setInterval(() => {
        out.innerText += originalText.charAt(i);
        i++;
        if(i >= originalText.length) clearInterval(interval);
      }, 30);
    },
    once: true
  });
});

// Interactive 3D Hero
const hero = document.querySelector('.hero');
const hero3D = document.getElementById('hero-3d');
if (hero && hero3D) {
  hero.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    hero3D.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    hero3D.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
}

// Quest Timeline Accordion
const quests = document.querySelectorAll('.interactive-quest');
quests.forEach(quest => {
  const summary = quest.querySelector('.timeline-summary');
  const toggleIcon = quest.querySelector('.toggle-icon');
  
  summary.addEventListener('click', () => {
    // Optional: Close others
    // quests.forEach(q => { if(q !== quest) { q.classList.remove('expanded'); q.querySelector('.toggle-icon').innerText = '[+] EXPAND'; } });
    
    quest.classList.toggle('expanded');
    
    if(quest.classList.contains('expanded')) {
      toggleIcon.innerText = '[-] COLLAPSE';
    } else {
      toggleIcon.innerText = '[+] EXPAND';
    }
    
    // Refresh ScrollTrigger since height changed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400); // Wait for CSS transition
  });
});

