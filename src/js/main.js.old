;(() => {
  /* ═══════════════════════════════════════════════
     PRAYER TIMES
  ═══════════════════════════════════════════════ */
  const PRAYERS = [
    {
      name: 'Subuh',
      time: '04:32',
      icon: `<svg width="13" height="13" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    },
    {
      name: 'Dzuhur',
      time: '11:54',
      icon: `<svg width="13" height="13" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    },
    {
      name: 'Ashar',
      time: '15:12',
      icon: `<svg width="13" height="13" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6z"/></svg>`
    },
    {
      name: 'Maghrib',
      time: '17:58',
      icon: `<svg width="13" height="13" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>`
    },
    {
      name: 'Isya',
      time: '19:10',
      icon: `<svg width="13" height="13" style="flex-shrink:0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
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

  function buildPrayerCell (p, i, idx) {
    const isNext = i === idx
    return `<div class="prayer-cell${isNext ? ' next' : ''}">
      <span class="prayer-badge">${isNext ? 'NEXT' : '\u00a0'}</span>
      <span class="prayer-icon">${p.icon}</span>
      <span class="prayer-name">${p.name}</span>
      <span class="prayer-time">${p.time}</span>
    </div>`
  }

  let lastIdx = -1

  function tick () {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    // Single clock element
    const clockEl = document.getElementById('live-clock')
    if (clockEl) clockEl.textContent = timeStr

    const idx = nextIdx(now.getHours(), now.getMinutes())
    if (idx !== lastIdx) {
      lastIdx = idx
      const cellsHTML = PRAYERS.map((p, i) => buildPrayerCell(p, i, idx)).join(
        ''
      )

      const grid = document.getElementById('prayer-grid')
      if (grid) grid.innerHTML = cellsHTML
    }
  }

  tick()
  setInterval(tick, 1000)

  /* ═══════════════════════════════════════════════
     DOM READY
  ═══════════════════════════════════════════════ */
  window.addEventListener('DOMContentLoaded', () => {
    // Copyright
    const cp = document.getElementById('copyright')
    if (cp)
      cp.textContent = `© ${new Date().getFullYear()} Masjid Ash-Shomad. All rights reserved.`

    // Show floating dock after 900ms
    setTimeout(() => {
      const dock = document.getElementById('floating-dock')
      if (dock) dock.classList.add('visible')
    }, 900)

    // Init all features
    initScrollSpy()
    initTyping()
    initCarousel('carousel-track', 'carousel-dots', 'c-card')
    initYoutube()
  })

  /* ═══════════════════════════════════════════════
     SCROLL SPY
  ═══════════════════════════════════════════════ */
  function initScrollSpy () {
    const SECTIONS = ['beranda', 'kegiatan', 'donasi', 'tontonan', 'tentang']

    function updateActive () {
      let cur = 'beranda'
      SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 180 && r.bottom >= 180) cur = id
        }
      })
      document.querySelectorAll('.nav-item[data-section]').forEach(a => {
        a.classList.toggle('active', a.dataset.section === cur)
      })
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
  }

  /* ═══════════════════════════════════════════════
     TYPING ANIMATION
  ═══════════════════════════════════════════════ */
  function initTyping () {
    const FULL_TEXT =
      'Pusat ibadah, kajian ilmu, dan kegiatan sosial untuk membangun umat yang berdaya dan berakhlak mulia.'
    const el = document.getElementById('typing-text')
    if (!el) return

    let i = 0
    let deleting = false

    function typeNext () {
      if (!deleting) {
        el.textContent = FULL_TEXT.slice(0, i++)
        if (i > FULL_TEXT.length) {
          deleting = true
          setTimeout(typeNext, 2200)
          return
        }
        setTimeout(typeNext, 28 + Math.random() * 22)
      } else {
        el.textContent = FULL_TEXT.slice(0, i--)
        if (i < 0) {
          deleting = false
          i = 0
          setTimeout(typeNext, 650)
          return
        }
        setTimeout(typeNext, 18 + Math.random() * 15)
      }
    }

    setTimeout(typeNext, 900)
  }

  /* ═══════════════════════════════════════════════
     CAROUSEL  (drag / swipe / dots)
  ═══════════════════════════════════════════════ */
  function initCarousel (trackId, dotsId, cardClass) {
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

    // Build dots
    if (dotsEl) {
      dotsEl.innerHTML = ''
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button')
        dot.setAttribute('aria-label', `Slide ${i + 1}`)
        dot.addEventListener('click', () => goTo(i))
        dotsEl.appendChild(dot)
      }
    }

    function getCardWidth () {
      return cards[0].offsetWidth + 16 // gap = 1rem = 16px
    }

    function updateDots () {
      if (!dotsEl) return
      dotsEl.querySelectorAll('button').forEach((dot, i) => {
        dot.classList.toggle('active', i === current)
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
      const threshold = getCardWidth() * 0.22
      if (dragOffset < -threshold) goTo(current + 1)
      else if (dragOffset > threshold) goTo(current - 1)
      else goTo(current)
    }

    // Mouse
    track.addEventListener('mousedown', e => {
      e.preventDefault()
      onDragStart(e.clientX)
    })
    window.addEventListener('mousemove', e => onDragMove(e.clientX))
    window.addEventListener('mouseup', onDragEnd)

    // Touch
    track.addEventListener(
      'touchstart',
      e => onDragStart(e.touches[0].clientX),
      { passive: true }
    )
    track.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), {
      passive: true
    })
    track.addEventListener('touchend', onDragEnd)

    updateDots()
  }

  /* ═══════════════════════════════════════════════
     YOUTUBE FEATURED SECTION
     - Thumbnail loads as <img> element (not bg-image)
       so the overlay gradient + meta stay on top cleanly
     - Only subtle bottom gradient — NO heavy black overlay
  ═══════════════════════════════════════════════ */
  function initYoutube () {
    const CHANNEL_URL = 'https://www.youtube.com/@Masjid_Ash-shomad_official/'

    // Grab persistent overlay elements (they stay in DOM, never replaced)
    const featLink = document.getElementById('featured-link')
    const featRatio = featLink ? featLink.querySelector('.video-ratio') : null
    const featPlaceholder = document.getElementById('featured-placeholder')
    const featDuration = document.getElementById('featured-duration')
    const featCategory = document.getElementById('featured-category')
    const featDate = document.getElementById('featured-date')
    const featTitle = document.getElementById('featured-title')

    if (!featRatio) return

    function setFeatured (item) {
      const vid = item.dataset.videoId
      if (!vid) return

      // Update link href
      if (featLink) featLink.href = 'https://www.youtube.com/watch?v=' + vid

      // Remove previous thumbnail if present
      const oldThumb = featRatio.querySelector('.feat-thumb')
      if (oldThumb) oldThumb.remove()

      // Hide placeholder
      if (featPlaceholder) featPlaceholder.style.display = 'none'

      // Insert new thumbnail as <img> at z-index 1 (behind overlays)
      const thumbImg = document.createElement('img')
      thumbImg.className = 'feat-thumb'
      thumbImg.alt = item.dataset.title || 'Video Thumbnail'
      thumbImg.style.cssText = [
        'position:absolute',
        'inset:0',
        'width:100%',
        'height:100%',
        'object-fit:cover',
        'object-position:center',
        'z-index:1',
        'opacity:0',
        'transition:opacity 0.4s ease'
      ].join(';')

      thumbImg.onload = () => {
        thumbImg.style.opacity = '1'
      }
      thumbImg.onerror = () => {
        // Fallback: show placeholder again
        thumbImg.remove()
        if (featPlaceholder) featPlaceholder.style.display = ''
      }

      // Insert before first child so it sits under all overlays
      featRatio.insertBefore(thumbImg, featRatio.firstChild)

      // Set it after insertBefore so browser starts loading
      thumbImg.src = `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`

      // Update meta labels
      if (featDuration)
        featDuration.textContent = item.dataset.duration || '–:––'
      if (featCategory)
        featCategory.textContent = item.dataset.category || 'Kajian'
      if (featDate) featDate.textContent = item.dataset.date || ''
      if (featTitle) featTitle.textContent = item.dataset.title || ''
    }

    function setActiveItem (activeItem) {
      document
        .querySelectorAll('.video-item')
        .forEach(el => el.classList.remove('active'))
      activeItem.classList.add('active')
    }

    // Click handler — set featured, mark active, open in new tab
    document.querySelectorAll('.video-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()
        setActiveItem(item)
        setFeatured(item)
        setTimeout(() => {
          window.open(item.href, '_blank', 'noopener,noreferrer')
        }, 280)
      })
    })

    // Auto-select first item on load
    const firstItem = document.querySelector('.video-item')
    if (firstItem) {
      setActiveItem(firstItem)
      setFeatured(firstItem)
    }
  }
})()
