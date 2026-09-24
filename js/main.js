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
});



