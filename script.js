/* ============================================
   MARLYN RODRIGUEZ PHOTOGRAPHY
   JavaScript Functionality
   ============================================ */

// ============================================
// PHOTOS DATA - Se carga desde photos.json
// ============================================
let photosData = [];

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const contactForm = document.getElementById('contactForm');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// ============================================
// MOBILE MENU
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// ACTIVE NAV LINK
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// PORTFOLIO - RENDER PHOTOS
// ============================================
let currentFilter = 'all';
let visibleCount = 6;
let currentPhotos = [];

function renderPortfolio(filter = 'all', limit = visibleCount) {
    if (!photosData.length) {
        portfolioGrid.innerHTML = '<p>Cargando fotos...</p>';
        return;
    }

    currentPhotos = filter === 'all' 
        ? photosData 
        : photosData.filter(photo => photo.category === filter);

    const photosToShow = currentPhotos.slice(0, limit);

    if (photosToShow.length === 0) {
        portfolioGrid.innerHTML = '<p>No hay fotos en esta categoría.</p>';
    } else {
        portfolioGrid.innerHTML = photosToShow.map((photo, index) => `
            <div class="portfolio-item" data-id="${photo.id}" data-index="${index}">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-overlay-title">${photo.title}</h3>
                    <span class="portfolio-overlay-category">${getCategoryName(photo.category)}</span>
                </div>
            </div>
        `).join('');
    }

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            openLightbox(id);
        });
    });

    loadMoreBtn.style.display = currentPhotos.length > limit ? 'inline-block' : 'none';
}

// ============================================
// MAPEO DE CATEGORÍAS (SOLO 5)
// ============================================
function getCategoryName(category) {
    const names = {
        naturaleza: 'Naturaleza',
        deporte: 'Deporte',
        formacion: 'Formación',
        retratos: 'Retratos',
        estudio: 'Fotos Estudio'
    };
    return names[category] || category;
}

// ============================================
// CARGAR FOTOS DESDE JSON EXTERNO
// ============================================
async function loadPhotos() {
    try {
        const response = await fetch('photos.json');
        if (!response.ok) throw new Error('No se pudo cargar photos.json');
        const data = await response.json();
        photosData = data.photos || data;
        renderPortfolio(currentFilter, visibleCount);
    } catch (error) {
        console.error('Error cargando photos.json:', error);
        portfolioGrid.innerHTML = '<p>Error al cargar las fotos. Por favor, recarga la página.</p>';
    }
}

// ============================================
// PORTFOLIO FILTERS
// ============================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        visibleCount = 6;
        renderPortfolio(currentFilter, visibleCount);
    });
});

// ============================================
// LOAD MORE
// ============================================
loadMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    visibleCount += 3;
    renderPortfolio(currentFilter, visibleCount);
});

// ============================================
// LIGHTBOX
// ============================================
let currentLightboxIndex = 0;

function openLightbox(id) {
    const photo = photosData.find(p => p.id === id);
    if (!photo) return;
    currentLightboxIndex = currentPhotos.findIndex(p => p.id === id);
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title;
    lightboxTitle.textContent = photo.title;
    lightboxDesc.textContent = photo.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (currentPhotos.length === 0) return;
    if (direction === 'next') {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentPhotos.length;
    } else {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentPhotos.length) % currentPhotos.length;
    }
    const photo = currentPhotos[currentLightboxIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title;
    lightboxTitle.textContent = photo.title;
    lightboxDesc.textContent = photo.description;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
lightboxNext.addEventListener('click', () => navigateLightbox('next'));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
    if (e.key === 'ArrowRight') navigateLightbox('next');
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================
let currentSlide = 0;
let testimonialInterval;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % testimonialSlides.length);
}

function startSlider() {
    testimonialInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(testimonialInterval);
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlider();
        showSlide(index);
        startSlider();
    });
});

// ============================================
// CONTACT FORM
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    contactForm.reset();
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
    startSlider();
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
