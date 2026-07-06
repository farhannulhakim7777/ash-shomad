/**
 * Navigation Module
 * Handles floating dock navigation, scroll spy, and active navigation states
 */

export class Navigation {
  constructor() {
    this.floatingDock = null;
    this.sections = [];
    
    this.init();
  }

  init() {
    this.floatingDock = document.getElementById('floating-dock');
    
    // Show floating dock after delay
    setTimeout(() => {
      if (this.floatingDock) {
        this.floatingDock.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        this.floatingDock.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      }
    }, 900);
    
    this.setupScrollSpy();
    this.setupSmoothScroll();
  }

  setupScrollSpy() {
    this.sections = ['beranda', 'jadwal-sholat', 'profil', 'kegiatan', 'donasi', 'galeri', 'kontak'];
    
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;
      
      let currentSection = 'beranda';
      
      this.sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
          }
        }
      });

      this.updateActiveLinks(currentSection);
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateActiveSection);
    }, { passive: true });

    updateActiveSection();
  }

  updateActiveLinks(activeSectionId) {
    // Floating dock navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const section = item.dataset.section;
      if (section === activeSectionId) {
        item.classList.add('text-emerald-600', 'bg-emerald-50');
        item.classList.remove('text-gray-600');
      } else {
        item.classList.remove('text-emerald-600', 'bg-emerald-50');
        item.classList.add('text-gray-600');
      }
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}
