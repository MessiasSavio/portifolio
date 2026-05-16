// ===== INTERNATIONALIZATION (i18n) =====
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'pt';

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('./src/js/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Get nested translation value
function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    return value || key;
}

// Update page language
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (translation) {
            element.innerHTML = translation;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = getTranslation(key);
        if (translation) {
            element.title = translation;
        }
    });
    
    // Update typing animation professions
    updateTypingAnimation();
    
    // Update CV download link
    updateCVDownload();
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Update CV download based on language
function updateCVDownload() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        const cvFiles = {
            'pt': './Curriculo_Messias_Savio_Atualizado.pdf',
            'en': './Resume_Messias_Savio_English.pdf'
        };
        
        downloadBtn.href = cvFiles[currentLanguage] || cvFiles['pt'];
    }
}

// ===== TYPING ANIMATION =====
let typingInterval;
let currentProfessionIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function updateTypingAnimation() {
    // Clear existing animation
    if (typingInterval) {
        clearTimeout(typingInterval);
    }
    
    // Reset animation state
    currentProfessionIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    
    // Start new animation with current language
    typeAnimation();
}

function typeAnimation() {
    const professions = getTranslation('hero.professions') || [
        'Machine Learning Engineer 🧠',
        'Data Engineer 🧭', 
        'MLOps Engineer 🤖',
        'Data Scientist 📊'
    ];
    
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    const currentProfession = professions[currentProfessionIndex];
    const animatedElement = document.getElementById('animated-profession');
    
    if (!animatedElement) return;
    
    if (!isDeleting) {
        // Typing
        animatedElement.textContent = currentProfession.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentProfession.length) {
            isDeleting = true;
            typingInterval = setTimeout(typeAnimation, pauseTime);
            return;
        }
    } else {
        // Deleting
        animatedElement.textContent = currentProfession.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
        }
    }
    
    typingInterval = setTimeout(typeAnimation, isDeleting ? deletingSpeed : typingSpeed);
}

// Initialize i18n system
document.addEventListener('DOMContentLoaded', async function () {
    await loadTranslations();
    updateLanguage(currentLanguage);
    
    // Language switcher event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.dataset.lang);
        });
    });
});

// ===== CERTIFICADOS FUNCTIONALITY =====
const certificadosData = {
    'ml-ai': [
        'do zero ao primeiro chatbot.pdf',
        'engenharia de Prompts.pdf',
        'Deep Learning and Neural Networks.pdf',
        'conceitos basicos de python.pdf',
        'criação de setup.pdf',
        'introdução a inteligencia artificial.pdf',
        'introdução a logica de progrmação.pdf',
        'python stater.pdf'
    ],
    'data-science': [
        'Ciência de Dados e CyberSecurity.pdf',
        'Math Computing Basics.pdf'
    ],
    'backend': [
        'Java e Orientação a Objetos T6 - ONE.pdf',
        'Potência Tech iFood - Programação do Zero.pdf',
        // Exemplo de alguns certificados principais - total: 86 certificados
        'Spring Boot API Rest',
        'Java Orientação a Objetos',
        'Lógica de Programação',
        'Estruturas de Dados',
        'Desenvolvimento Web Backend'
    ],
    'cloud-devops': [
        'Cloud Computing.pdf',
        'github.pdf'
    ],
    'soft-skills': [
        'Desenvolvimento de carreira',
        'Gestão Ágil',
        'Empreendedorismo',
        'Foco e Produtividade',
        'Hábitos e Metas',
        'LinkedIn e Networking',
        'Técnicas de Aprendizado',
        'Developer Thinking.pdf',
        'Programming and Communication.pdf',
        'Modelling Data Developer.pdf'
    ],
    'frontend': [
        'HTML e CSS - Desenvolvimento Web',
        'Responsividade e Design',
        'JavaScript Fundamentals',
        'Frontend Frameworks'
    ]
};

let currentDisplayCount = 12;
let activeFilter = 'all';
let certificatesBasePath = './certificados';

function getEncodedCertificateUrl(folderName, filename) {
    const encodedFileName = encodeURIComponent(filename);
    return `${certificatesBasePath}/${folderName}/${encodedFileName}`;
}

async function resolveCertificatesBasePath() {
    const pathCandidates = ['./certificados', '../certificados'];
    const probeFile = 'Destaques/Cloud%20Computing.pdf';

    for (const candidate of pathCandidates) {
        try {
            const response = await fetch(`${candidate}/${probeFile}`, { method: 'HEAD' });

            if (response.ok) {
                certificatesBasePath = candidate;
                return;
            }

            if (response.status === 405 || response.status === 501) {
                const fallbackResponse = await fetch(`${candidate}/${probeFile}`, { method: 'GET' });
                if (fallbackResponse.ok) {
                    certificatesBasePath = candidate;
                    return;
                }
            }
        } catch (error) {
            // Ignore and try next candidate path.
        }
    }
}

function updateFeaturedCertificateLinks() {
    const featuredLinks = document.querySelectorAll('.view-cert');

    featuredLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref) return;

        const fileName = decodeURIComponent(currentHref.split('/').pop() || '');
        if (!fileName) return;

        link.setAttribute('href', getEncodedCertificateUrl('Destaques', fileName));
    });
}

function createCertificateCard(filename, category) {
    const name = formatCertificateName(filename);
    const card = document.createElement('div');
    card.className = `certificate-card ${category}`;
    
    // Map category to folder name
    const categoryFolders = {
        'ml-ai': '01_Machine_Learning_AI',
        'data-science': '02_Data_Science_Analytics',
        'backend': '03_Backend_Programming',
        'cloud-devops': '04_Cloud_DevOps',
        'soft-skills': '05_Soft_Skills_Career',
        'frontend': '06_Frontend_Web'
    };
    
    const folderName = categoryFolders[category] || category;
    
    card.innerHTML = `
        <div class="certificate-icon">
            <i class="${getCertificateIcon(category)}"></i>
        </div>
        <h3>${name}</h3>
        <p class="certificate-category">${getCategoryDisplayName(category)}</p>
        <a href="${getEncodedCertificateUrl(folderName, filename)}" target="_blank" class="view-certificate">
            <i class="fas fa-external-link-alt"></i>
            Ver Certificado
        </a>
    `;
    return card;
}

function formatCertificateName(filename) {
    let name = filename.replace('.pdf', '');
    
    if (name.startsWith('Messias Sávio Benedito Chaves - Curso ')) {
        name = name.replace('Messias Sávio Benedito Chaves - Curso ', '');
        name = name.replace(/_ /g, ': ');
        name = name.replace(' - Alura', '');
    }
    
    if (name.includes('Java e Orientação')) {
        name = 'Java e Orientação a Objetos - Oracle Next Education';
    }
    
    return name.length > 60 ? name.substring(0, 60) + '...' : name;
}

function getCertificateIcon(category) {
    const icons = {
        'ml-ai': 'fas fa-brain',
        'data-science': 'fas fa-chart-line',
        'backend': 'fas fa-server',
        'cloud-devops': 'fas fa-cloud',
        'soft-skills': 'fas fa-users',
        'frontend': 'fab fa-html5'
    };
    return icons[category] || 'fas fa-certificate';
}

function getCategoryDisplayName(category) {
    const displayNames = {
        'ml-ai': 'MACHINE LEARNING & AI',
        'data-science': 'DATA SCIENCE',
        'backend': 'BACKEND PROGRAMMING',
        'cloud-devops': 'CLOUD & DEVOPS',
        'soft-skills': 'SOFT SKILLS',
        'frontend': 'FRONTEND WEB'
    };
    return displayNames[category] || category.toUpperCase();
}

function displayCertificates() {
    const container = document.getElementById('certificados-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    let allCertificates = [];
    
    if (activeFilter === 'all') {
        Object.keys(certificadosData).forEach(category => {
            certificadosData[category].forEach(cert => {
                allCertificates.push({ name: cert, category });
            });
        });
    } else {
        certificadosData[activeFilter].forEach(cert => {
            allCertificates.push({ name: cert, category: activeFilter });
        });
    }
    
    const certificatesToShow = allCertificates.slice(0, currentDisplayCount);
    
    certificatesToShow.forEach(cert => {
        const card = createCertificateCard(cert.name, cert.category);
        container.appendChild(card);
    });
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-certificates');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = currentDisplayCount >= allCertificates.length ? 'none' : 'block';
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', async function() {
    // Certificate filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            currentDisplayCount = 12;
            displayCertificates();
        });
    });
    
    // Load more certificates
    const loadMoreBtn = document.getElementById('load-more-certificates');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentDisplayCount += 12;
            displayCertificates();
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu ul');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    await resolveCertificatesBasePath();
    updateFeaturedCertificateLinks();

    // Initialize certificates display
    displayCertificates();
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.especialidade-card, .destaque-card, .projeto-card, .certificate-card');
    animateElements.forEach(el => observer.observe(el));
});

