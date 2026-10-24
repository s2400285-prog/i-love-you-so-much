/**
 * ============================================================================
 * GOLDEN PHOENIX OF LOVE — JAVASCRIPT FOR BABY JULIE
 * Fully interactive, romantic, and optimized for all devices.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CANVAS: GOLDEN PARTICLES, EMBERS & STARDUST
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('starfield-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool
    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 45 : 85;

    const colors = [
      'rgba(255, 215, 0, ',    // Metallic Gold
      'rgba(245, 215, 142, ',  // Champagne Gold
      'rgba(255, 107, 53, ',   // Fiery Orange
      'rgba(255, 79, 216, ',   // Electric Pink
      'rgba(194, 24, 91, '     // Crimson
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.8 + 0.8;
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.7 + 0.2;
        this.vy = -(Math.random() * 0.8 + 0.25);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.wobbleSpeed = Math.random() * 0.02 + 0.008;
        this.wobbleAngle = Math.random() * Math.PI * 2;
        this.glow = Math.random() > 0.6;
      }

      update() {
        this.y += this.vy;
        this.wobbleAngle += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobbleAngle) * 0.35;

        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.colorBase + this.alpha + ')';

        if (this.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFD700';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(renderCanvas);
    }
    renderCanvas();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* --------------------------------------------------------------------------
     2. SCROLL PROGRESS BAR & ACTIVE NAV HIGHLIGHTER
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrollPercent + '%';
    }

    if (siteHeader) {
      if (scrollTop > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active Section Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. BACKGROUND ROMANTIC MUSIC PLAYER CONTROLLER
     -------------------------------------------------------------------------- */
  const audio = document.getElementById('romanticAudio');
  const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
  const playerBtnIcon = document.getElementById('playerBtnIcon');
  const quickSoundBtn = document.getElementById('quickSoundBtn');
  const quickSoundLabel = document.getElementById('quickSoundLabel');
  const heroPlayMusicBtn = document.getElementById('heroPlayMusicBtn');
  const heroPlayMusicText = document.getElementById('heroPlayMusicText');
  const playerVinylDisc = document.getElementById('playerVinylDisc');
  const floatingMusicPlayer = document.getElementById('floatingMusicPlayer');
  const playerMuteBtn = document.getElementById('playerMuteBtn');
  const muteIcon = document.getElementById('muteIcon');
  const playerMinimizeBtn = document.getElementById('playerMinimizeBtn');
  const audioProgressWrap = document.getElementById('audioProgressWrap');
  const audioProgressFill = document.getElementById('audioProgressFill');
  const autoplayToast = document.getElementById('autoplayToastPrompt');
  const toastPlayBtn = document.getElementById('toastPlayBtn');
  const toastDismissBtn = document.getElementById('toastDismissBtn');

  let isPlaying = false;

  function updatePlayerUI(playing) {
    isPlaying = playing;
    if (playing) {
      if (playerBtnIcon) playerBtnIcon.textContent = '⏸';
      if (playerVinylDisc) playerVinylDisc.classList.add('spinning');
      if (floatingMusicPlayer) floatingMusicPlayer.classList.add('playing');
      if (quickSoundBtn) {
        quickSoundBtn.classList.add('playing');
        if (quickSoundLabel) quickSoundLabel.textContent = 'Pause Song';
      }
      if (heroPlayMusicText) heroPlayMusicText.textContent = 'Playing Our Song ❤️';
      if (autoplayToast) autoplayToast.style.display = 'none';
    } else {
      if (playerBtnIcon) playerBtnIcon.textContent = '▶';
      if (playerVinylDisc) playerVinylDisc.classList.remove('spinning');
      if (floatingMusicPlayer) floatingMusicPlayer.classList.remove('playing');
      if (quickSoundBtn) {
        quickSoundBtn.classList.remove('playing');
        if (quickSoundLabel) quickSoundLabel.textContent = 'Play Song';
      }
      if (heroPlayMusicText) heroPlayMusicText.textContent = 'Play Our Little Soundtrack';
    }
  }

  function toggleAudio() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        updatePlayerUI(true);
      }).catch(err => {
        console.log('Audio playback prevented:', err);
        if (autoplayToast) autoplayToast.style.display = 'flex';
      });
    } else {
      audio.pause();
      updatePlayerUI(false);
    }
  }

  if (playerPlayPauseBtn) playerPlayPauseBtn.addEventListener('click', toggleAudio);
  if (quickSoundBtn) quickSoundBtn.addEventListener('click', toggleAudio);
  if (heroPlayMusicBtn) heroPlayMusicBtn.addEventListener('click', toggleAudio);

  // Mute toggle
  if (playerMuteBtn && audio) {
    playerMuteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteIcon.textContent = audio.muted ? '🔇' : '🔊';
    });
  }

  // Minimize player toggle
  if (playerMinimizeBtn && floatingMusicPlayer) {
    playerMinimizeBtn.addEventListener('click', () => {
      floatingMusicPlayer.classList.toggle('minimized');
      playerMinimizeBtn.querySelector('span').textContent = floatingMusicPlayer.classList.contains('minimized') ? '+' : '—';
    });
  }

  // Audio progress tracking & seek
  if (audio && audioProgressFill && audioProgressWrap) {
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        audioProgressFill.style.width = percent + '%';
      }
    });

    audioProgressWrap.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = audioProgressWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      audio.currentTime = (clickX / width) * audio.duration;
    });
  }

  // Handle Autoplay policy attempt
  function attemptAutoplay() {
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updatePlayerUI(true);
      }).catch(() => {
        // Autoplay blocked by browser policy
        updatePlayerUI(false);
        if (autoplayToast) {
          setTimeout(() => {
            autoplayToast.style.display = 'flex';
          }, 1200);
        }

        // Unlock audio on first user gesture anywhere
        const unlockAudio = () => {
          audio.play().then(() => {
            updatePlayerUI(true);
            if (autoplayToast) autoplayToast.style.display = 'none';
          }).catch(() => {});
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
        };
        window.addEventListener('click', unlockAudio, { once: true });
        window.addEventListener('touchstart', unlockAudio, { once: true });
      });
    }
  }
  attemptAutoplay();

  if (toastPlayBtn) {
    toastPlayBtn.addEventListener('click', () => {
      if (audio) {
        audio.play().then(() => {
          updatePlayerUI(true);
          if (autoplayToast) autoplayToast.style.display = 'none';
        });
      }
    });
  }

  if (toastDismissBtn && autoplayToast) {
    toastDismissBtn.addEventListener('click', () => {
      autoplayToast.style.display = 'none';
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO SECTION "OPEN YOUR LITTLE SURPRISE"
     -------------------------------------------------------------------------- */
  const heroOpenSurpriseBtn = document.getElementById('heroOpenSurpriseBtn');
  if (heroOpenSurpriseBtn) {
    heroOpenSurpriseBtn.addEventListener('click', (e) => {
      createHeartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 25);
      
      const letterSection = document.getElementById('letter');
      if (letterSection) {
        letterSection.scrollIntoView({ behavior: 'smooth' });
        // Trigger reveal after scroll starts
        setTimeout(() => {
          revealLoveLetter(false);
        }, 700);
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. HEARTFELT LOVE LETTER PROGRESSIVE REVEAL
     -------------------------------------------------------------------------- */
  const letterInitialPrompt = document.getElementById('letterInitialPrompt');
  const letterContent = document.getElementById('letterContent');
  const readMyHeartBtn = document.getElementById('readMyHeartBtn');
  const showInstantlyBtn = document.getElementById('showInstantlyBtn');
  const replayLetterBtn = document.getElementById('replayLetterBtn');
  const letterParagraphs = document.querySelectorAll('.letter-p');
  let letterRevealTimeouts = [];

  function revealLoveLetter(instant = false) {
    if (letterInitialPrompt) letterInitialPrompt.style.display = 'none';
    if (letterContent) letterContent.style.display = 'block';

    // Clear previous timeouts if replaying
    letterRevealTimeouts.forEach(t => clearTimeout(t));
    letterRevealTimeouts = [];

    if (instant) {
      letterParagraphs.forEach(p => p.classList.add('revealed'));
      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
    } else {
      letterParagraphs.forEach(p => p.classList.remove('revealed'));
      letterParagraphs.forEach((p, index) => {
        const timeout = setTimeout(() => {
          p.classList.add('revealed');
          // Emit a few floating hearts along the way
          const rect = p.getBoundingClientRect();
          createHeartBurst(rect.left + rect.width / 2, rect.top + 20, 3);
        }, index * 950);
        letterRevealTimeouts.push(timeout);
      });
    }
  }

  if (readMyHeartBtn) {
    readMyHeartBtn.addEventListener('click', (e) => {
      createHeartBurst(e.clientX, e.clientY, 15);
      revealLoveLetter(false);
    });
  }

  if (showInstantlyBtn) {
    showInstantlyBtn.addEventListener('click', () => {
      revealLoveLetter(true);
    });
  }

  if (replayLetterBtn) {
    replayLetterBtn.addEventListener('click', (e) => {
      createHeartBurst(e.clientX, e.clientY, 10);
      revealLoveLetter(false);
    });
  }

  /* --------------------------------------------------------------------------
     6. FIVE-PHOTO MEMORY GALLERY & LIGHTBOX
     -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item-card');
  const lightboxModal = document.getElementById('photoLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  // Photo Memory Data
  const photoData = [
    {
      src: 'images/photo1.jpg',
      tag: 'Memory 01 • My Golden Girl',
      title: 'My Favorite Picture of Julie 👑',
      caption: 'The girl whose bright, sincere smile effortlessly turns my ordinary days into pure joy. You look so gorgeous here, my love.'
    },
    {
      src: 'images/photo2.jpg',
      tag: 'Memory 02 • Us Together',
      title: 'Right Where We Belong 💑',
      caption: 'Side by side, hand in hand. Every second with you feels like home, peace, and the sweetest warmth.'
    },
    {
      src: 'images/photo3.jpg',
      tag: 'Memory 03 • Food Date',
      title: 'Our Warm Food Date 🍽️',
      caption: 'Thank you for treating me to our delicious meal today. Food always tastes 1,000 times better when I am eating it with you.'
    },
    {
      src: 'images/photo4.jpg',
      tag: 'Memory 04 • Photobooth',
      title: 'Our Photobooth Laughs 🎞️',
      caption: 'These little strips of goofy poses, sweet glances, and happy laughter are treasures I will hold onto forever.'
    },
    {
      src: 'images/photo5.jpg',
      tag: 'Memory 05 • Today\'s Special Moment',
      title: 'My Favorite Memory From Today ✨',
      caption: 'The way you looked at me, made me feel valued, and generously shared your time and heart. I will never forget today.'
    }
  ];

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    currentPhotoIndex = index;
    const data = photoData[currentPhotoIndex];
    if (!data || !lightboxModal) return;

    lightboxImg.src = data.src;
    lightboxTag.textContent = data.tag;
    lightboxTitle.textContent = data.title;
    lightboxCaption.textContent = data.caption;
    lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photoData.length}`;

    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
    openLightbox(currentPhotoIndex);
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
    openLightbox(currentPhotoIndex);
  }

  galleryItems.forEach((card, index) => {
    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextPhoto);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevPhoto);

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();
    }
  });

  /* --------------------------------------------------------------------------
     7. INTERACTIVE GRATITUDE CARDS
     -------------------------------------------------------------------------- */
  const gratitudeCards = document.querySelectorAll('.gratitude-card');
  gratitudeCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const isExpanded = card.classList.toggle('expanded');
      card.setAttribute('aria-expanded', isExpanded);
      const hint = card.querySelector('.action-hint');

      if (isExpanded) {
        if (hint) hint.textContent = 'Tap to collapse 💛';
        createHeartBurst(e.clientX || card.offsetLeft + 100, e.clientY || card.offsetTop + 50, 10);
      } else {
        if (hint) hint.textContent = 'Tap to expand 💛';
      }
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. THE GOLDEN PROMISE CAROUSEL / STEPPER
     -------------------------------------------------------------------------- */
  const promises = [
    '“I will never treat your kindness as something I am entitled to.”',
    '“I will keep appreciating the little things you do.”',
    '“I want to make beautiful memories with you, even when we spend nothing.”',
    '“I will do my best to give you the same love, care, and thoughtfulness you give me.”',
    '“I want us to keep growing together, with God guiding our hearts.”'
  ];

  let currentPromiseIndex = 0;
  const promiseQuoteText = document.getElementById('promiseQuoteText');
  const promiseStepCounter = document.getElementById('promiseStepCounter');
  const promiseDots = document.querySelectorAll('.step-dot');
  const prevPromiseBtn = document.getElementById('prevPromiseBtn');
  const nextPromiseBtn = document.getElementById('nextPromiseBtn');

  function renderPromise(index) {
    currentPromiseIndex = index;
    if (promiseQuoteText) {
      promiseQuoteText.style.opacity = '0';
      promiseQuoteText.style.transform = 'translateY(10px)';

      setTimeout(() => {
        promiseQuoteText.textContent = promises[currentPromiseIndex];
        promiseQuoteText.style.opacity = '1';
        promiseQuoteText.style.transform = 'translateY(0)';
      }, 250);
    }

    if (promiseStepCounter) {
      promiseStepCounter.textContent = `Promise ${currentPromiseIndex + 1} of ${promises.length}`;
    }

    promiseDots.forEach((dot, dIndex) => {
      dot.classList.toggle('active', dIndex === currentPromiseIndex);
    });
  }

  if (nextPromiseBtn) {
    nextPromiseBtn.addEventListener('click', (e) => {
      createHeartBurst(e.clientX, e.clientY, 8);
      const nextIndex = (currentPromiseIndex + 1) % promises.length;
      renderPromise(nextIndex);
    });
  }

  if (prevPromiseBtn) {
    prevPromiseBtn.addEventListener('click', () => {
      const prevIndex = (currentPromiseIndex - 1 + promises.length) % promises.length;
      renderPromise(prevIndex);
    });
  }

  promiseDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      renderPromise(idx);
    });
  });

  /* --------------------------------------------------------------------------
     9. VIRTUAL HUG MODAL
     -------------------------------------------------------------------------- */
  const virtualHugBtn = document.getElementById('virtualHugBtn');
  const virtualHugOverlay = document.getElementById('virtualHugOverlay');
  const closeHugBtn = document.getElementById('closeHugBtn');
  const sweetDreamBtn = document.getElementById('sweetDreamBtn');

  function openHugModal(e) {
    if (e) createHeartBurst(e.clientX, e.clientY, 30);
    if (virtualHugOverlay) {
      virtualHugOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeHugModal() {
    if (virtualHugOverlay) {
      virtualHugOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (virtualHugBtn) virtualHugBtn.addEventListener('click', openHugModal);
  if (closeHugBtn) closeHugBtn.addEventListener('click', closeHugModal);
  if (sweetDreamBtn) sweetDreamBtn.addEventListener('click', closeHugModal);

  /* --------------------------------------------------------------------------
     10. SECRET FEATHER EASTER EGG MODAL
     -------------------------------------------------------------------------- */
  const secretFeatherBtn = document.getElementById('secretFeatherBtn');
  const secretFeatherModal = document.getElementById('secretFeatherModal');
  const closeSecretBtn = document.getElementById('closeSecretBtn');
  const secretModalBackdrop = document.getElementById('secretModalBackdrop');

  function openSecretModal(e) {
    createHeartBurst(e.clientX, e.clientY, 18);
    if (secretFeatherModal) {
      secretFeatherModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSecretModal() {
    if (secretFeatherModal) {
      secretFeatherModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (secretFeatherBtn) secretFeatherBtn.addEventListener('click', openSecretModal);
  if (closeSecretBtn) closeSecretBtn.addEventListener('click', closeSecretModal);
  if (secretModalBackdrop) secretModalBackdrop.addEventListener('click', closeSecretModal);

  /* --------------------------------------------------------------------------
     11. SEND YOU A LITTLE LOVE BUTTON & LOVE PILL COUNTER
     -------------------------------------------------------------------------- */
  const sendLoveFromLetterBtn = document.getElementById('sendLoveFromLetterBtn');
  const sendLovePillBtn = document.getElementById('sendLovePillBtn');
  const sendLoveModal = document.getElementById('sendLoveModal');
  const closeSendLoveBtn = document.getElementById('closeSendLoveBtn');
  const sendLoveModalBackdrop = document.getElementById('sendLoveModalBackdrop');
  const loveCountDisplay = document.getElementById('loveCountDisplay');

  let loveCount = parseInt(localStorage.getItem('julie_phoenix_love_count') || '100', 10);
  if (loveCountDisplay) loveCountDisplay.textContent = loveCount;

  function incrementLoveCount(e, showModal = false) {
    loveCount += 1;
    if (loveCountDisplay) loveCountDisplay.textContent = loveCount;
    localStorage.setItem('julie_phoenix_love_count', loveCount.toString());

    createHeartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 20);

    if (showModal && sendLoveModal) {
      sendLoveModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  if (sendLovePillBtn) {
    sendLovePillBtn.addEventListener('click', (e) => {
      incrementLoveCount(e, false);
    });
  }

  if (sendLoveFromLetterBtn) {
    sendLoveFromLetterBtn.addEventListener('click', (e) => {
      incrementLoveCount(e, true);
    });
  }

  if (closeSendLoveBtn) {
    closeSendLoveBtn.addEventListener('click', () => {
      if (sendLoveModal) {
        sendLoveModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  if (sendLoveModalBackdrop) {
    sendLoveModalBackdrop.addEventListener('click', () => {
      if (sendLoveModal) {
        sendLoveModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. DYNAMIC FLOATING HEARTS & PARTICLES GENERATOR
     -------------------------------------------------------------------------- */
  const heartSymbols = ['❤️', '🔥', '✨', '💖', '💛', '🪶', '🥰'];

  function createFloatingHeart(x, y, symbol) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = symbol || heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Random drift offsets
    const dx = (Math.random() - 0.5) * 120;
    const dx2 = (Math.random() - 0.5) * 160;
    const rot = (Math.random() - 0.5) * 50;
    const rot2 = (Math.random() - 0.5) * 80;
    const size = Math.random() * 1.4 + 1.2;

    heart.style.setProperty('--dx', `${dx}px`);
    heart.style.setProperty('--dx2', `${dx2}px`);
    heart.style.setProperty('--rot', `${rot}deg`);
    heart.style.setProperty('--rot2', `${rot2}deg`);
    heart.style.fontSize = `${size}rem`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2800);
  }

  function createHeartBurst(x, y, count = 12) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;
        createFloatingHeart(x + offsetX, y + offsetY);
      }, i * 45);
    }
  }

  // Click anywhere to spawn floating heart
  window.addEventListener('click', (e) => {
    // Avoid double bursting if clicking an explicit button
    if (
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('.gratitude-card') ||
      e.target.closest('.gallery-item-card') ||
      e.target.closest('.floating-music-player')
    ) {
      return;
    }
    createFloatingHeart(e.clientX, e.clientY);
  });

  /* --------------------------------------------------------------------------
     13. DESKTOP CURSOR TRAIL SPARKLES (PERFORMANCE OPTIMIZED)
     -------------------------------------------------------------------------- */
  const cursorTrailContainer = document.getElementById('cursorTrailContainer');
  let lastCursorTime = 0;

  if (window.innerWidth >= 1024 && cursorTrailContainer) {
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastCursorTime < 45) return; // Limit to ~22fps for smooth performance
      lastCursorTime = now;

      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // Rainbow or gold variation
      if (Math.random() > 0.5) {
        dot.style.background = '#FF4FD8';
        dot.style.boxShadow = '0 0 10px #FF4FD8';
      }

      cursorTrailContainer.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 750);
    });
  }

  /* --------------------------------------------------------------------------
     14. SMOOTH SCROLL FOR ALL ANCHOR LINKS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
