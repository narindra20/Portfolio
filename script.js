// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.querySelector('.header');
    
    // Toggle menu mobile
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation des barres de compétences
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Observer pour animer les compétences quand elles sont visibles
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Animation des projets au scroll
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        portfolioObserver.observe(item);
    });
    
    // Form submission (exemple basique)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici vous ajouteriez l'envoi du formulaire
            // Pour l'instant, on simule un envoi réussi
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
            submitBtn.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                this.reset();
            }, 3000);
        });
    }
    
    // Dark mode toggle (optionnel)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.querySelector('i').classList.toggle('fa-moon');
        this.querySelector('i').classList.toggle('fa-sun');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Vérifier le mode sombre dans le localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    }
});

// CSS pour le mode sombre
const darkModeCSS = `
    .dark-mode {
        background-color: #121212;
        color: #e0e0e0;
    }
    
    .dark-mode .header {
        background-color: #1e1e1e;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .dark-mode .logo {
        color: #e0e0e0;
    }
    
    .dark-mode .nav ul li a {
        color: #e0e0e0;
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(52, 152, 219, 0.8));
    }
    
    .dark-mode section {
        background-color: #1e1e1e;
    }
    
    .dark-mode .section-title h2 {
        color: #e0e0e0;
    }
    
    .dark-mode .section-title p {
        color: #b0b0b0;
    }
    
    .dark-mode .about, 
    .dark-mode .skills,
    .dark-mode .portfolio,
    .dark-mode .education,
    .dark-mode .contact {
        background-color: #1e1e1e;
    }
    
    .dark-mode .skill-category,
    .dark-mode .timeline-content,
    .dark-mode .goal-card,
    .dark-mode .contact-form,
    .dark-mode .contact-item,
    .dark-mode .academic-item,
    .dark-mode .portfolio-item,
    .dark-mode .mini-project {
        background-color: #2d2d2d;
        color: #e0e0e0;
    }
    
    .dark-mode .skill-category h3,
    .dark-mode .timeline-content h3,
    .dark-mode .goal-card h4,
    .dark-mode .portfolio-info h3,
    .dark-mode .contact-item h3,
    .dark-mode .academic-item h4 {
        color: #e0e0e0;
    }
    
    .dark-mode .portfolio-info > p,
    .dark-mode .goal-card p,
    .dark-mode .contact-item p,
    .dark-mode .academic-item p {
        color: #b0b0b0;
    }
    
    .dark-mode .footer {
        background-color: #121212;
    }
    
    .dark-mode .dark-mode-toggle {
        background-color: #3498db;
    }
`;

// Ajouter le CSS du mode sombre
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);