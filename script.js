document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '24px';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        }
    });

    // --- Configuração da Galeria Lightbox ---
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;

    // Coleta dados de todas as imagens
    const imagesData = Array.from(galleryCards).map(card => {
        return {
            src: card.querySelector('img').getAttribute('src'),
            title: card.querySelector('h3').innerText,
            desc: card.querySelector('p').innerText
        };
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function updateLightboxContent() {
        const data = imagesData[currentIndex];
        lightboxImg.src = data.src;
        lightboxTitle.innerText = data.title;
        lightboxDesc.innerText = data.desc;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex === 0) ? imagesData.length - 1 : currentIndex - 1;
        updateLightboxContent();
    }

    function showNext() {
        currentIndex = (currentIndex === imagesData.length - 1) ? 0 : currentIndex + 1;
        updateLightboxContent();
    }

    // Adiciona evento de clique aos cards
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
    });

    // Controles do Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    // Fechar ao clicar no fundo
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Controles por Teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});