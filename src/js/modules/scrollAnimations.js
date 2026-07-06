/**
 * Scroll Animations Module
 * Handles scroll-triggered animations using Intersection Observer
 */

export class ScrollAnimations {
  constructor() {
    this.animatedElements = [];
    this.observer = null;
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.observeElements();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeElements() {
    // Observe elements with animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      this.observer.observe(element);
      this.animatedElements.push(element);
    });

    // If no custom class is used, observe section headers and cards
    this.observeDefaultElements();
  }

  observeDefaultElements() {
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-head, .text-center');
    sectionHeaders.forEach(header => {
      if (!header.classList.contains('animate-on-scroll')) {
        header.classList.add('animate-on-scroll');
        this.observer.observe(header);
      }
    });

    // Observe cards
    const cards = document.querySelectorAll('.card, .prayer-card, .group');
    cards.forEach(card => {
      if (!card.classList.contains('animate-on-scroll')) {
        card.classList.add('animate-on-scroll');
        this.observer.observe(card);
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    this.animatedElements.forEach(element => {
      element.classList.remove('animate-on-scroll', 'visible');
    });
    
    this.animatedElements = [];
  }
}
