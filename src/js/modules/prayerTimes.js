/**
 * Prayer Times Module
 * Handles prayer times display, countdown, and date calculations
 */

export class PrayerTimes {
  constructor() {
    this.prayers = [
      { name: 'Subuh', time: '04:32', icon: this.getMoonIcon() },
      { name: 'Dzuhur', time: '11:54', icon: this.getSunIcon() },
      { name: 'Ashar', time: '15:12', icon: this.getCloudIcon() },
      { name: 'Maghrib', time: '17:58', icon: this.getMoonIcon() },
      { name: 'Isya', time: '19:10', icon: this.getMoonIcon() }
    ];
    
    this.nextPrayerIndex = -1;
    this.countdownInterval = null;
    
    this.init();
  }

  getMoonIcon() {
    return `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
  }

  getSunIcon() {
    return `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`;
  }

  getCloudIcon() {
    return `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>`;
  }

  init() {
    this.updateDates();
    this.renderPrayerTimes();
    this.renderQuickPrayerTimes();
    this.startCountdown();
    
    // Update every minute
    setInterval(() => {
      this.updateNextPrayer();
    }, 60000);
  }

  updateDates() {
    const now = new Date();
    
    // Gregorian date
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('id-ID', options);
    }

    // Hijri date (simplified calculation)
    const hijriEl = document.getElementById('hijri-date');
    if (hijriEl) {
      const hijriDate = this.calculateHijriDate(now);
      hijriEl.textContent = hijriDate;
    }
  }

  calculateHijriDate(date) {
    // Simplified Hijri calculation
    // For accurate Hijri dates, consider using a library like 'hijri-date'
    const islamicDate = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
    
    return islamicDate;
  }

  getNextPrayerIndex() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (let i = 0; i < this.prayers.length; i++) {
      const [hours, minutes] = this.prayers[i].time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (prayerMinutes > currentMinutes) {
        return i;
      }
    }
    
    // If no prayer is left today, return first prayer for tomorrow
    return 0;
  }

  updateNextPrayer() {
    const newIndex = this.getNextPrayerIndex();
    if (newIndex !== this.nextPrayerIndex) {
      this.nextPrayerIndex = newIndex;
      this.renderPrayerTimes();
      this.renderQuickPrayerTimes();
    }
  }

  renderPrayerTimes() {
    const grid = document.getElementById('prayer-times-grid');
    if (!grid) return;

    this.nextPrayerIndex = this.getNextPrayerIndex();
    
    grid.innerHTML = this.prayers.map((prayer, index) => {
      const isActive = index === this.nextPrayerIndex;
      const activeClass = isActive ? 'active' : '';
      
      return `
        <div class="prayer-card ${activeClass}">
          <div class="mb-1 sm:mb-2">${prayer.icon}</div>
          <p class="prayer-name text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">${prayer.name}</p>
          <p class="prayer-time text-sm sm:text-lg font-bold text-gray-900">${prayer.time}</p>
        </div>
      `;
    }).join('');

    this.updateNextPrayerDisplay();
  }

  renderQuickPrayerTimes() {
    const quickGrid = document.getElementById('prayer-times-quick');
    if (!quickGrid) return;

    this.nextPrayerIndex = this.getNextPrayerIndex();
    
    quickGrid.innerHTML = this.prayers.map((prayer, index) => {
      const isActive = index === this.nextPrayerIndex;
      const bgClass = isActive ? 'bg-white/30 text-amber-400' : 'bg-white/10 text-white';
      
      return `
        <div class="text-center p-1.5 sm:p-2 rounded-lg ${bgClass}">
          <p class="text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">${prayer.name}</p>
          <p class="text-xs sm:text-sm font-bold">${prayer.time}</p>
        </div>
      `;
    }).join('');
  }

  updateNextPrayerDisplay() {
    const nameEl = document.getElementById('next-prayer-name');
    if (nameEl && this.nextPrayerIndex !== -1) {
      nameEl.textContent = this.prayers[this.nextPrayerIndex].name;
    }
  }

  startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    this.updateCountdown();
    
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const now = new Date();
    const nextPrayer = this.prayers[this.getNextPrayerIndex()];
    
    if (!nextPrayer) {
      countdownEl.textContent = '--:--:--';
      return;
    }

    const [hours, minutes] = nextPrayer.time.split(':').map(Number);
    let prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);

    // If prayer time has passed today, set it for tomorrow
    if (prayerDate < now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }

    const diff = prayerDate - now;
    
    if (diff <= 0) {
      countdownEl.textContent = '00:00:00';
      return;
    }

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
  }
}
