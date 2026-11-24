/**
 * ADP ENGENHARIA - JAVASCRIPT
 * Lógicas Interativas: Abas, Acordeão, Carrossel, Depoimentos e Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. MENU MOBILE TOGGLE
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Fechar ao clicar em qualquer link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. HEADER STICKY & SCROLL EFEITO
  // -------------------------------------------------------------------------
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
    }
  });

  // -------------------------------------------------------------------------
  // 3. ABAS DE SERVIÇOS ("O QUE CONSTRUÍMOS")
  // -------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. ACORDEÃO DO PROCESSO PASSO A PASSO
  // -------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os outros acordeões
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Alterna o atual
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // -------------------------------------------------------------------------
  // 5. CARROSSEL DE PROJETOS
  // -------------------------------------------------------------------------
  const projectsTrack = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('projectPrevBtn');
  const nextBtn = document.getElementById('projectNextBtn');

  if (projectsTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = projectsTrack.querySelectorAll('.project-card');
    const totalCards = cards.length;

    const updateCarousel = () => {
      const isMobile = window.innerWidth <= 900;
      const cardWidthPercentage = isMobile ? 100 : 50;
      const gap = 24;
      const maxIndex = isMobile ? totalCards - 1 : Math.max(0, totalCards - 2);

      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const offset = currentIndex * (cardWidthPercentage + 2);
      projectsTrack.style.transform = `translateX(-${currentIndex * (isMobile ? 102 : 52)}%)`;
    };

    nextBtn.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 900;
      const maxIndex = isMobile ? totalCards - 1 : Math.max(0, totalCards - 2);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 900;
      const maxIndex = isMobile ? totalCards - 1 : Math.max(0, totalCards - 2);
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex; // loop
      }
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  }

  // -------------------------------------------------------------------------
  // 6. DEPOIMENTOS (TESTIMONIALS SLIDER)
  // -------------------------------------------------------------------------
  const testimonials = [
    {
      name: "David Henderson",
      role: "Diretor de Operações, Vertex Corp",
      quote: "A ADP Engenharia superou todas as nossas expectativas. O rigor no cumprimento do cronograma, o cuidado com as normas de segurança e o acabamento impecável do nosso centro de distribuição foram incomparáveis. Entregaram a obra 15 dias antes do prazo com economia de 7% no custo orçado.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dra. Renata Silveira",
      role: "Investidora & Proprietária, Residencial Jardins",
      quote: "Construir nossa sede corporativa com a ADP Engenharia foi a melhor decisão estratégica. O nível de transparência na gestão orçamentária e a comunicação diária com os engenheiros de campo nos deram total tranquilidade do início ao fim.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Marcelo Albuquerque",
      role: "CEO, Construtora & Incorporadora Horizonte",
      quote: "Parceiros indispensáveis para grandes estruturas. A equipe técnica da ADP Engenharia possui maestria no uso de modelagem BIM e soluções de concreto protendido que reduziram nosso tempo de fundação em 3 semanas.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const authorNameEl = document.getElementById('testimonialAuthorName');
  const authorRoleEl = document.getElementById('testimonialAuthorRole');
  const quoteBodyEl = document.getElementById('testimonialQuoteBody');
  const avatarEl = document.getElementById('testimonialAvatar');
  const dots = document.querySelectorAll('.dot-btn');

  let currentTestimonial = 0;

  const setTestimonial = (index) => {
    currentTestimonial = index;
    const item = testimonials[index];

    if (authorNameEl) authorNameEl.textContent = item.name;
    if (authorRoleEl) authorRoleEl.textContent = item.role;
    if (quoteBodyEl) quoteBodyEl.textContent = `"${item.quote}"`;
    if (avatarEl) avatarEl.src = item.avatar;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setTestimonial(index));
  });

  // Auto rotação a cada 8 segundos
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    setTestimonial(currentTestimonial);
  }, 8000);

  // -------------------------------------------------------------------------
  // 7. MODAL DE ORÇAMENTO (NATIVE <dialog>)
  // -------------------------------------------------------------------------
  const quoteDialog = document.getElementById('quoteModal');
  const openModalBtns = document.querySelectorAll('.btn-open-quote-modal');
  const closeModalBtn = document.getElementById('closeQuoteModal');
  const quoteForm = document.getElementById('quoteForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteDialog) {
        quoteDialog.showModal();
      }
    });
  });

  if (closeModalBtn && quoteDialog) {
    closeModalBtn.addEventListener('click', () => {
      quoteDialog.close();
    });

    quoteDialog.addEventListener('click', (e) => {
      const rect = quoteDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        quoteDialog.close();
      }
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Obrigado! Sua solicitação foi recebida com sucesso. Um de nossos engenheiros entrará em contato em até 2 horas.');
        quoteForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (quoteDialog) {
          quoteDialog.close();
        }
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 8. FORMULÁRIO DE NEWSLETTER
  // -------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value.trim()) {
        alert('Inscrição realizada com sucesso! Você receberá nossos artigos e insights da construção.');
        input.value = '';
      }
    });
  }

  // -------------------------------------------------------------------------
  // Botão Perfil do Google do Cliente (Placeholder temporário até definição)
  // -------------------------------------------------------------------------
  const btnGoogleProfile = document.getElementById('btnGoogleProfile');
  if (btnGoogleProfile) {
    btnGoogleProfile.addEventListener('click', (e) => {
      const href = btnGoogleProfile.getAttribute('href');
      if (!href || href === '#' || href === 'javascript:void(0)') {
        e.preventDefault();
        alert('O link direto do perfil da ADP Engenharia no Google (Google Meu Negócio / Avaliações) será vinculado aqui assim que estiver definido!');
      }
    });
  }

  // -------------------------------------------------------------------------
  // Botão Scroll to Top (Voltar ao Topo)
  // -------------------------------------------------------------------------
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    const handleScrollToTop = () => {
      if (window.scrollY > 350) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScrollToTop, { passive: true });
    handleScrollToTop(); // Verificação inicial

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // Alternador de Modo Escuro / Claro (Dark Mode Switch)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    // Sincroniza estado inicial do botão com a classe ativa no <html> ou <body>
    const isInitiallyDark = document.documentElement.classList.contains('dark-mode') || 
                            document.body.classList.contains('dark-mode');
    
    if (isInitiallyDark) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      themeToggleBtn.setAttribute('aria-checked', 'true');
    } else {
      themeToggleBtn.setAttribute('aria-checked', 'false');
    }

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-mode');
      document.body.classList.toggle('dark-mode', isDark);
      themeToggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
      
      try {
        localStorage.setItem('adp_theme', isDark ? 'dark' : 'light');
      } catch (e) {
        // Fallback para ambientes com restrição de cookies/localStorage
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. VÍDEOS COM CARREGAMENTO 100% COMPLETO ANTES DA TROCA (HERO E TIMELAPSE)
  // -------------------------------------------------------------------------
  const getCandidateVideoUrls = (video) => {
    const mp4Url = video.dataset.mp4;
    const webmUrl = video.dataset.webm;
    const mp4Support = video.canPlayType('video/mp4; codecs="avc1.64001f"') || video.canPlayType('video/mp4');
    const webmSupport = video.canPlayType('video/webm; codecs="vp9"') || video.canPlayType('video/webm');

    const candidates = [];
    if (mp4Url && mp4Support === 'probably') {
      candidates.push({ url: mp4Url, type: 'video/mp4' });
      if (webmUrl && webmSupport) candidates.push({ url: webmUrl, type: 'video/webm' });
    } else if (webmUrl && webmSupport) {
      candidates.push({ url: webmUrl, type: 'video/webm' });
      if (mp4Url && mp4Support) candidates.push({ url: mp4Url, type: 'video/mp4' });
    } else if (mp4Url) {
      candidates.push({ url: mp4Url, type: 'video/mp4' });
      if (webmUrl) candidates.push({ url: webmUrl, type: 'video/webm' });
    } else if (webmUrl) {
      candidates.push({ url: webmUrl, type: 'video/webm' });
    }
    return candidates;
  };

  const fetchFullVideoBlobUrl = async (url, expectedType, onProgress) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ao carregar ${url}`);
    }

    const totalHeader = response.headers.get('content-length');
    const total = totalHeader ? Number(totalHeader) : 0;

    let blob;
    if (response.body && Number.isFinite(total) && total > 0) {
      const reader = response.body.getReader();
      const chunks = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          loaded += value.byteLength;
          const percent = Math.min(100, Math.round((loaded / total) * 100));
          onProgress(percent);
        }
      }
      blob = new Blob(chunks, { type: expectedType || response.headers.get('content-type') || 'video/mp4' });
    } else {
      const rawBlob = await response.blob();
      blob = (!rawBlob.type || rawBlob.type === 'application/octet-stream')
        ? new Blob([rawBlob], { type: expectedType || 'video/mp4' })
        : rawBlob;
      onProgress(100);
    }

    return URL.createObjectURL(blob);
  };

  const attachVideoAndWaitReady = (video, srcUrl, isBlob) => {
    return new Promise((resolve, reject) => {
      const readyEvent = isBlob ? 'loadeddata' : 'canplaythrough';
      const cleanup = () => {
        video.removeEventListener(readyEvent, onReady);
        video.removeEventListener('error', onError);
      };
      const onReady = () => {
        if (!isBlob && video.readyState < 4) return;
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error('Falha ao decodificar vídeo'));
      };

      video.addEventListener(readyEvent, onReady);
      video.addEventListener('error', onError);
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.preload = 'auto';
      video.src = srcUrl;
      video.load();

      if (isBlob && video.readyState >= 2) {
        cleanup();
        resolve();
      } else if (!isBlob && video.readyState >= 4) {
        cleanup();
        resolve();
      }
    });
  };

  const initFullLoadVideoSwap = ({
    container,
    image,
    video,
    loader,
    toggleBtn,
    pausedClass,
    baseLoaderText,
    pauseLabel,
    playLabel,
    loaderDelayMs = 0,
    deferUntilIntersect = false
  }) => {
    if (!container || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const loaderTextEl = loader ? (loader.querySelector('.video-loader-text') || loader.querySelector('span')) : null;
    let loaderTimer = null;
    let isLoading = false;
    let isVideoLoaded = false;
    let isSwapped = false;
    let isPausedByUser = false;

    const setLoaderProgress = (percent) => {
      if (!loaderTextEl) return;
      loaderTextEl.textContent = percent !== null ? `${baseLoaderText} ${percent}%` : baseLoaderText;
    };

    const showLoader = () => {
      if (!loader || isPausedByUser || isSwapped) return;
      loader.hidden = false;
      loader.classList.add('is-loading');
    };

    const hideLoader = () => {
      if (loaderTimer) {
        clearTimeout(loaderTimer);
        loaderTimer = null;
      }
      if (!loader) return;
      loader.classList.remove('is-loading');
      loader.hidden = true;
    };

    const scheduleLoader = () => {
      if (!loader || isPausedByUser || isSwapped) return;
      if (loaderDelayMs <= 0) {
        showLoader();
        return;
      }
      if (loaderTimer) clearTimeout(loaderTimer);
      loaderTimer = setTimeout(() => {
        if (isLoading && !isPausedByUser && !isSwapped) {
          showLoader();
        }
      }, loaderDelayMs);
    };

    const setToggleState = (isPaused) => {
      container.classList.toggle(pausedClass, isPaused);
      if (!toggleBtn) return;
      toggleBtn.classList.toggle('is-paused', isPaused);
      const label = isPaused ? playLabel : pauseLabel;
      toggleBtn.setAttribute('aria-label', label);
      toggleBtn.setAttribute('title', label);
    };

    const revealVideoAndPlay = async () => {
      if (isPausedByUser) {
        hideLoader();
        setToggleState(true);
        if (toggleBtn) toggleBtn.hidden = false;
        return;
      }

      try {
        await video.play();
        isSwapped = true;
        video.classList.add('is-ready');
        hideLoader();
        setToggleState(false);
        if (toggleBtn) toggleBtn.hidden = false;
      } catch (e) {
        // Autoplay bloqueado: mantém imagem visível até o usuário clicar em Play
        isPausedByUser = true;
        hideLoader();
        setToggleState(true);
        if (toggleBtn) toggleBtn.hidden = false;
      }
    };

    const startDownloadAndSwap = async () => {
      if (isLoading || isVideoLoaded || isPausedByUser) return;
      const candidates = getCandidateVideoUrls(video);
      if (candidates.length === 0) return;

      isLoading = true;
      setLoaderProgress(null);
      scheduleLoader();

      for (const candidate of candidates) {
        if (isPausedByUser) break;
        let objectUrl = null;
        try {
          objectUrl = await fetchFullVideoBlobUrl(candidate.url, candidate.type, (pct) => {
            setLoaderProgress(pct);
          });
          await attachVideoAndWaitReady(video, objectUrl, true);
          isVideoLoaded = true;
          isLoading = false;
          await revealVideoAndPlay();
          return;
        } catch (fetchErr) {
          if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
          }
          // Fallback para abertura direta via file:// quando fetch não é suportado
          if (window.location.protocol === 'file:') {
            try {
              await attachVideoAndWaitReady(video, candidate.url, false);
              isVideoLoaded = true;
              isLoading = false;
              await revealVideoAndPlay();
              return;
            } catch (directErr) {
              // Tenta o próximo candidato
            }
          }
        }
      }

      isLoading = false;
      hideLoader();
      video.classList.remove('is-ready');
      if (!isVideoLoaded && toggleBtn) {
        toggleBtn.hidden = true;
      }
    };

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);

    const pauseForReducedMotion = () => {
      isPausedByUser = true;
      video.pause();
      hideLoader();
      setToggleState(true);
      if (toggleBtn) toggleBtn.hidden = false;
    };

    if (reducedMotionQuery.matches || saveData) {
      pauseForReducedMotion();
    } else if (deferUntilIntersect && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            startDownloadAndSwap();
            obs.unobserve(entry.target);
          }
        },
        { rootMargin: '250px 0px' }
      );
      observer.observe(container);
    } else if (image && !image.complete) {
      const onImageDone = () => startDownloadAndSwap();
      image.addEventListener('load', onImageDone, { once: true });
      image.addEventListener('error', onImageDone, { once: true });
    } else {
      startDownloadAndSwap();
    }

    reducedMotionQuery.addEventListener('change', (event) => {
      if (event.matches) {
        pauseForReducedMotion();
      }
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', async () => {
        if (!isVideoLoaded) {
          isPausedByUser = false;
          setToggleState(false);
          startDownloadAndSwap();
          return;
        }

        if (video.paused) {
          isPausedByUser = false;
          await revealVideoAndPlay();
        } else {
          isPausedByUser = true;
          video.pause();
          hideLoader();
          setToggleState(true);
        }
      });
    }
  };

  initFullLoadVideoSwap({
    container: document.getElementById('inicio'),
    image: document.querySelector('#inicio .hero-bg-image'),
    video: document.getElementById('heroBgVideo'),
    loader: document.getElementById('heroVideoLoader'),
    toggleBtn: document.getElementById('heroVideoToggle'),
    pausedClass: 'hero-motion-paused',
    baseLoaderText: 'Carregando vídeo...',
    pauseLabel: 'Pausar vídeo de fundo',
    playLabel: 'Reproduzir vídeo de fundo',
    loaderDelayMs: 300,
    deferUntilIntersect: false
  });

  initFullLoadVideoSwap({
    container: document.getElementById('obra-timelapse'),
    image: document.querySelector('#obra-timelapse .panoramic-img'),
    video: document.getElementById('panoramicTimelapseVideo'),
    loader: document.getElementById('panoramicVideoLoader'),
    toggleBtn: document.getElementById('panoramicVideoToggle'),
    pausedClass: 'panoramic-motion-paused',
    baseLoaderText: 'Carregando vídeo da obra...',
    pauseLabel: 'Pausar timelapse da obra',
    playLabel: 'Reproduzir timelapse da obra',
    loaderDelayMs: 0,
    deferUntilIntersect: true
  });
});




document.addEventListener('DOMContentLoaded', () => {
  // Image Modal Logic for Recognized Cards
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModalBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-modal');
  const nextBtn = document.querySelector('.next-modal');
  const cardImgWrappers = document.querySelectorAll('.recognized-card-img-wrapper');
  
  let currentModalIndex = 0;
  let modalImages = [];

  if (imageModal && modalImage && closeModalBtn) {
    // Store all images and set up click listeners
    cardImgWrappers.forEach((wrapper, index) => {
      const img = wrapper.querySelector('img');
      if (img) {
        modalImages.push({ src: img.src, alt: img.alt });
        const openModal = () => {
          currentModalIndex = index;
          updateModalImage();
          imageModal.classList.add('show');
          imageModal.setAttribute('aria-hidden', 'false');
        };
        wrapper.addEventListener('click', openModal);
        
        const card = wrapper.closest('.recognized-card');
        if (card) {
          const badge = card.querySelector('.recognized-card-btn-badge');
          if (badge) {
            badge.style.cursor = 'pointer';
            badge.addEventListener('click', openModal);
          }
        }
      }
    });

    const updateModalImage = () => {
      if (modalImages.length > 0) {
        modalImage.src = modalImages[currentModalIndex].src;
        modalImage.alt = modalImages[currentModalIndex].alt || 'Visualização Ampliada';
      }
    };

    const showNextImage = (e) => {
      if (e) e.stopPropagation();
      currentModalIndex = (currentModalIndex + 1) % modalImages.length;
      updateModalImage();
    };

    const showPrevImage = (e) => {
      if (e) e.stopPropagation();
      currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
      updateModalImage();
    };

    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

    // Close function
    const closeImageModal = () => {
      imageModal.classList.remove('show');
      imageModal.setAttribute('aria-hidden', 'true');
      setTimeout(() => { modalImage.src = ''; }, 300);
    };

    closeModalBtn.addEventListener('click', closeImageModal);

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeImageModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!imageModal.classList.contains('show')) return;
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    });
  }
});
