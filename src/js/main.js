/**
 * Masjid Ash-Shomad - Main JavaScript
 * Modular architecture for prayer times, navigation, and interactions
 */

import { PrayerTimes } from './modules/prayerTimes.js';
import { Navigation } from './modules/navigation.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';

class App {
  constructor() {
    this.prayerTimes = null;
    this.navigation = null;
    this.scrollAnimations = null;
  }

  init() {
    try {
      // Initialize modules
      this.prayerTimes = new PrayerTimes();
      this.navigation = new Navigation();
      this.scrollAnimations = new ScrollAnimations();

      // Initialize copyright year
      this.updateCopyright();

      console.log('Masjid Ash-Shomad app initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  updateCopyright() {
    const copyrightEl = document.getElementById('copyright');
    if (copyrightEl) {
      const year = new Date().getFullYear();
      copyrightEl.textContent = `© ${year} Masjid Ash-Shomad. All rights reserved.`;
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
