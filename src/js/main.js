;(() => {
  const PRAYERS = [
    {
      name: 'Subuh',
      time: '04:32',
      icon: `<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    },
    {
      name: 'Dzuhur',
      time: '11:54',
      icon: `<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    },
    {
      name: 'Ashar',
      time: '15:12',
      icon: `<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6z"/></svg>`
    },
    {
      name: 'Maghrib',
      time: '17:58',
      icon: `<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>`
    },
    {
      name: 'Isya',
      time: '19:10',
      icon: `<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    }
  ]

  function nextIdx (h, m) {
    const now = h * 60 + m
    for (let i = 0; i < PRAYERS.length; i++) {
      const [ph, pm] = PRAYERS[i].time.split(':').map(Number)
      if (ph * 60 + pm > now) return i
    }
    return 0
  }

  let lastIdx = -1
  function tick () {
    const now = new Date()
    const el = document.getElementById('live-clock')
    if (el)
      el.textContent = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

    const idx = nextIdx(now.getHours(), now.getMinutes())
    if (idx !== lastIdx) {
      lastIdx = idx
      const grid = document.getElementById('prayer-grid')
      if (grid)
        grid.innerHTML = PRAYERS.map(
          (p, i) => `
            <div class="flex flex-col items-center gap-1 px-2 pt-1 pb-2 rounded-xl transition-all duration-300
              ${
                i === idx
                  ? 'bg-[#fbbf24]/15 ring-1 ring-[#fbbf24]/40'
                  : 'bg-white/[0.04] hover:bg-white/[0.08]'
              }">
              <span class="text-[9px] font-bold uppercase tracking-widest leading-tight
                ${
                  i === idx ? 'text-[#fbbf24]' : 'text-transparent select-none'
                }">&nbsp;NEXT&nbsp;</span>
              <span class="${
                i === idx ? 'text-[#fbbf24]' : 'text-[rgba(255,255,255,0.5)]'
              }">${p.icon}</span>
              <span class="text-[10px] font-medium ${
                i === idx ? 'text-[#fbbf24]' : 'text-[rgba(255,255,255,0.5)]'
              }">${p.name}</span>
              <span class="text-xs font-bold font-mono ${
                i === idx ? 'text-[#fbbf24]' : 'text-[rgba(255,255,255,0.9)]'
              }">${p.time}</span>
            </div>`
        ).join('')
    }
  }
  tick()
  setInterval(tick, 1000)

  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.getElementById('hero-text')?.classList.add('visible')
    })

    const copyright = document.getElementById('copyright')
    if (copyright)
      copyright.textContent = `© ${new Date().getFullYear()} Masjid Ash-Shomad. All rights reserved.`

    setTimeout(() => {
      const d = document.getElementById('floating-dock')
      d?.classList.remove('dock-hidden')
      d?.classList.add('dock-visible')
    }, 1000)
  })

  // FIX: Ganti 'renovasi' → 'tontonan' sesuai section yang ada di HTML
  function updateActive () {
    let cur = 'beranda'
    ;['beranda', 'kegiatan', 'donasi', 'tontonan', 'tentang'].forEach(id => {
      const el = document.getElementById(id)
      if (el) {
        const r = el.getBoundingClientRect()
        if (r.top <= 200 && r.bottom >= 200) cur = id
      }
    })
    document.querySelectorAll('.nav-item[data-section]').forEach(a => {
      const active = a.dataset.section === cur
      a.classList.toggle('active', active)
      a.classList.toggle('text-fg-50', !active)
    })
  }
  window.addEventListener('scroll', updateActive, { passive: true })
  updateActive()

  // Donation accounts
  const ACCOUNTS = [
    { bank: 'BSI', number: '7182 9012 34', name: 'Masjid Ash-Shomad' },
    { bank: 'BCA', number: '5320 1847 62', name: 'Yayasan Ash-Shomad' },
    { bank: 'Mandiri', number: '1570 0065 4321', name: 'Masjid Ash-Shomad' }
  ]
  const modal = document.getElementById('donation-modal')

  const accountList = document.getElementById('account-list')
  if (accountList)
    accountList.innerHTML = ACCOUNTS.map(
      a => `
        <div class="flex items-center justify-between p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:border-[#fbbf24]/30 transition-all">
          <div>
            <p class="text-sm font-bold text-[#fbbf24]">${a.bank}</p>
            <p class="text-lg font-mono" style="color:rgba(255,255,255,0.9)">${
              a.number
            }</p>
            <p class="text-xs" style="color:rgba(255,255,255,0.4)">${a.name}</p>
          </div>
          <button onclick="copyAcc('${a.number.replace(/\s/g, '')}', this)"
            aria-label="Salin nomor rekening ${a.bank}"
            class="p-2.5 rounded-lg bg-white/10 hover:bg-[#fbbf24]/20 transition-colors" style="color:rgba(255,255,255,0.5)">
            <svg class="w-4 h-4 copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>`
    ).join('')

  // FIX: Modal sekarang bisa dibuka via tombol #open-modal yang sudah ditambahkan di HTML
  if (modal) {
    document
      .getElementById('open-modal')
      ?.addEventListener('click', () => modal.classList.add('open'))
    document
      .getElementById('close-modal')
      ?.addEventListener('click', () => modal.classList.remove('open'))
    document
      .getElementById('modal-backdrop')
      ?.addEventListener('click', () => modal.classList.remove('open'))
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.classList.remove('open')
    })
  }

  window.copyAcc = (num, btn) => {
    navigator.clipboard.writeText(num).then(() => {
      btn.querySelector(
        '.copy-icon'
      ).innerHTML = `<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
      btn.style.color = '#4ade80'
      setTimeout(() => {
        btn.querySelector(
          '.copy-icon'
        ).innerHTML = `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`
        btn.style.color = ''
      }, 2000)
    })
  }
})()

// ── Typing animation ──
function initTyping () {
  const FULL_TEXT =
    'Pusat ibadah, kajian ilmu, dan kegiatan sosial untuk membangun umat yang berdaya dan berakhlak mulia.'
  const el = document.getElementById('typing-text')
  if (!el) return

  let i = 0
  let deleting = false

  function typeNext () {
    if (!deleting) {
      el.textContent = FULL_TEXT.slice(0, i)
      i++
      if (i > FULL_TEXT.length) {
        deleting = true
        setTimeout(typeNext, 2000)
        return
      }
      setTimeout(typeNext, 28 + Math.random() * 22)
    } else {
      el.textContent = FULL_TEXT.slice(0, i)
      i--
      if (i < 0) {
        deleting = false
        i = 0
        setTimeout(typeNext, 600)
        return
      }
      setTimeout(typeNext, 18 + Math.random() * 15)
    }
  }

  setTimeout(typeNext, 900)
}

// ── Carousel — drag/swipe only ──
function createCarousel (trackId, dotsId, cardClass) {
  const track = document.getElementById(trackId)
  const dotsEl = document.getElementById(dotsId)
  if (!track) return

  const cards = track.querySelectorAll('.' + cardClass)
  const total = cards.length
  if (total === 0) return

  let current = 0
  let startX = 0
  let isDragging = false
  let dragOffset = 0

  if (dotsEl) {
    dotsEl.innerHTML = ''
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button')
      dot.className =
        'rounded-full transition-all duration-300 ' +
        (i === 0 ? 'bg-[#fbbf24] w-5 h-2' : 'bg-white/20 w-2 h-2')
      dot.setAttribute('aria-label', `Slide ${i + 1}`)
      dot.addEventListener('click', () => goTo(i))
      dotsEl.appendChild(dot)
    }
  }

  function getCardWidth () {
    return cards[0].offsetWidth + 16
  }

  function updateDots () {
    if (!dotsEl) return
    dotsEl.querySelectorAll('button').forEach((dot, i) => {
      dot.className =
        'rounded-full transition-all duration-300 ' +
        (i === current ? 'bg-[#fbbf24] w-5 h-2' : 'bg-white/20 w-2 h-2')
    })
  }

  function goTo (index) {
    current = Math.max(0, Math.min(index, total - 1))
    track.style.transition =
      'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    track.style.transform = `translateX(-${current * getCardWidth()}px)`
    updateDots()
  }

  function onDragStart (x) {
    isDragging = true
    startX = x
    dragOffset = 0
    track.style.transition = 'none'
  }

  function onDragMove (x) {
    if (!isDragging) return
    dragOffset = x - startX
    track.style.transform = `translateX(${
      -current * getCardWidth() + dragOffset
    }px)`
  }

  function onDragEnd () {
    if (!isDragging) return
    isDragging = false
    const threshold = getCardWidth() * 0.25
    if (dragOffset < -threshold) goTo(current + 1)
    else if (dragOffset > threshold) goTo(current - 1)
    else goTo(current)
  }

  track.addEventListener('mousedown', e => {
    e.preventDefault()
    onDragStart(e.clientX)
  })
  window.addEventListener('mousemove', e => onDragMove(e.clientX))
  window.addEventListener('mouseup', onDragEnd)
  track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), {
    passive: true
  })
  track.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), {
    passive: true
  })
  track.addEventListener('touchend', onDragEnd)

  updateDots()
}

// ── YouTube featured section ──
function initYoutube () {
  const CHANNEL_URL = 'https://www.youtube.com/@Masjid_Ash-shomad_official/'

  const elThumb = document.getElementById('featured-thumb')
  const elPlaceholder = document.getElementById('featured-placeholder')
  const elTitle = document.getElementById('featured-title')
  const elCat = document.getElementById('featured-category')
  const elDate = document.getElementById('featured-date')
  const elDur = document.getElementById('featured-duration')
  const elLink = document.getElementById('featured-link')

  if (!elThumb || !elLink) return

  function loadThumb (videoId) {
    if (!videoId) {
      // FIX: pakai class thumb-hidden, bukan inline style
      elThumb.classList.add('thumb-hidden')
      if (elPlaceholder) elPlaceholder.style.display = 'flex'
      return
    }
    const maxUrl = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg'
    const mqUrl = 'https://i.ytimg.com/vi/' + videoId + '/mqdefault.jpg'
    const probe = new Image()
    probe.onload = () => {
      elThumb.src = maxUrl
      elThumb.classList.remove('thumb-hidden')
      if (elPlaceholder) elPlaceholder.style.display = 'none'
    }
    probe.onerror = () => {
      elThumb.src = mqUrl
      elThumb.classList.remove('thumb-hidden')
      if (elPlaceholder) elPlaceholder.style.display = 'none'
    }
    probe.src = maxUrl
  }

  function updateFeatured (item) {
    const videoId = item.dataset.videoId || ''
    const title = item.dataset.title || ''
    const category = item.dataset.category || ''
    const date = item.dataset.date || ''
    const duration = item.dataset.duration || '–:––'
    const videoUrl = videoId
      ? 'https://www.youtube.com/watch?v=' + videoId
      : CHANNEL_URL

    loadThumb(videoId)
    elTitle.textContent = title || 'Pilih video dari daftar.'
    elCat.textContent = category || 'Kajian'
    elDate.textContent = date || ''
    elDur.textContent = duration
    elLink.href = videoUrl
  }

  function setActiveItem (activeItem) {
    document.querySelectorAll('.video-item').forEach(el => {
      el.classList.remove('active-video')
    })
    activeItem.classList.add('active-video')
  }

  // FIX: preventDefault agar klik sidebar update featured dulu,
  // user bisa Ctrl+Click atau buka tab manual dari link sendiri
  document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()
      setActiveItem(item)
      updateFeatured(item)
      // Buka YouTube setelah 300ms delay (UX: lihat preview dulu)
      setTimeout(() => {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      }, 300)
    })
  })

  // Auto-load item pertama
  const firstItem = document.querySelector('.video-item')
  if (firstItem) {
    setActiveItem(firstItem)
    updateFeatured(firstItem)
  }
}

// ── Init semua setelah DOM ready ──
window.addEventListener('DOMContentLoaded', () => {
  initTyping()

  // FIX: Hanya panggil carousel yang ID-nya ada di HTML
  createCarousel('carousel-track', 'carousel-dots', 'carousel-card')
  // carousel-track-2 dihapus karena tidak ada di HTML

  initYoutube()
})
