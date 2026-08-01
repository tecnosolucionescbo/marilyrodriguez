/* ============================================
   MARLYN RODRIGUEZ PHOTOGRAPHY
   JavaScript Functionality
   ============================================ */

// ============================================
// PHOTOS DATA - FÁCIL DE EDITAR
// Tu cliente puede agregar/editar fotos aquí
// ============================================
const photosData = [
    {
        id: 1,
        src: "images/portfolio/boda1.jpg",
        title: "Boda en la Playa",
        description: "Una ceremonia íntima al atardecer con vistas al océano.",
        category: "bodas"
    },
    {
        id: 2,
        src: "images/portfolio/retrato1.jpg",
        title: "Retrato Artístico",
        description: "Sesión de retrato en estudio con iluminación natural.",
        category: "retratos"
    },
    {
        id: 3,
        src: "images/portfolio/moda1.jpg",
        title: "Colección Primavera",
        description: "Shooting para la nueva colección de primavera.",
        category: "moda"
    },
    {
        id: 4,
        src: "images/portfolio/evento1.jpg",
        title: "Evento Corporativo",
        description: "Cobertura del evento anual de la empresa.",
        category: "eventos"
    },
    {
        id: 5,
        src: "images/portfolio/familia1.jpg",
        title: "Sesión Familiar",
        description: "Una tarde divertida capturando momentos familiares.",
        category: "familia"
    },
    {
        id: 6,
        src: "images/portfolio/comercial1.jpg",
        title: "Producto Gourmet",
        description: "Fotografía de producto para catálogo gourmet.",
        category: "comercial"
    },
    {
        id: 7,
        src: "images/portfolio/boda2.jpg",
        title: "Primera Mirada",
        description: "El momento más emotivo del día de la boda.",
        category: "bodas"
    },
    {
        id: 8,
        src: "images/portfolio/retrato2.jpg",
        title: "Retrato en Exteriores",
        description: "Sesión de retrato en el parque al atardecer.",
        category: "retratos"
    },
    {
        id: 9,
        src: "images/portfolio/moda2.jpg",
        title: "Editorial de Moda",
        description: "Editorial para revista de moda local.",
        category: "moda"
    },
    {
        id: 10,
        src: "images/portfolio/familia2.jpg",
        title: "Maternidad",
        description: "Sesión de fotos de maternidad en exteriores.",
        category: "familia"
    },
    {
        id: 11,
        src: "images/portfolio/boda3.jpg",
        title: "Recepción",
        description: "La celebración continúa con música y baile.",
        category: "bodas"
    },
    {
        id: 12,
        src: "images/portfolio/comercial2.jpg",
        title: "Arquitectura",
        description: "Fotografía arquitectónica para desarrolladora.",
        category: "comercial"
    }
];

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

    // Active nav link based on scroll position
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

// Close mobile menu when clicking a link
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
    currentPhotos = filter === 'all' 
        ? photosData 
        : photosData.filter(photo => photo.category === filter);

    const photosToShow = currentPhotos.slice(0, limit);

    portfolioGrid.innerHTML = photosToShow.map((photo, index) => `
        <div class="portfolio-item" data-id="${photo.id}" data-index="${index}">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3 class="portfolio-overlay-title">${photo.title}</h3>
                <span class="portfolio-overlay-category">${getCategoryName(photo.category)}</span>
            </div>
        </div>
    `).join('');

    // Add click events to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            openLightbox(id);
        });
    });

    // Show/hide load more button
    loadMoreBtn.style.display = currentPhotos.length > limit ? 'inline-block' : 'none';
}

function getCategoryName(category) {
    const names = {
        bodas: 'Bodas',
        retratos: 'Retratos',
        moda: 'Moda',
        eventos: 'Eventos',
        familia: 'Familia',
        comercial: 'Comercial'
    };
    return names[category] || category;
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

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
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

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Aquí puedes integrar con EmailJS, Formspree, o tu backend
    // Por ahora, mostramos un mensaje de éxito
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
    renderPortfolio();
    startSlider();

    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});

// ============================================
// CARGAR FOTOS DESDE JSON EXTERNO (opcional)
// Si tu cliente prefiere editar un archivo JSON
// ============================================
/*
// Descomenta esto si quieres cargar desde un archivo JSON externo:
fetch('photos.json')
    .then(response => response.json())
    .then(data => {
        photosData.length = 0;
        photosData.push(...data);
        renderPortfolio();
    })
    .catch(error => console.log('Usando datos por defecto'));
*/
