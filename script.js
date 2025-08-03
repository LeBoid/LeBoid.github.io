// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.setupThemeToggle();
        this.updateThemeIcon();
    }

    setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        this.animateThemeTransition();
    }

    updateThemeIcon() {
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');
        
        if (this.theme === 'dark') {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }

    animateThemeTransition() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        });
    }

    setupActiveNavigation() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSkillBars();
        this.setupTypingEffect();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for fade-in effect
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        });
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    setupTypingEffect() {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            const originalText = heroDescription.textContent;
            heroDescription.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroDescription.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30);
                }
            };
            
            // Start typing effect when section is visible
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        heroObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            heroObserver.observe(heroDescription);
        }
    }

    setupHoverEffects() {
        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            });
        });

        // Skill tag hover effects
        document.querySelectorAll('.tech-tag, .research-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0)';
            });
        });
    }
}

// ECE Design Project Manager
class ECEDesignManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupFilterDemo();
        this.setupCopyButtons();
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    setupFilterDemo() {
        const applyFilterBtn = document.getElementById('apply-filter');
        const signalTypeSelect = document.getElementById('signal-type');
        const filterTypeSelect = document.getElementById('filter-type');
        const canvas = document.getElementById('filter-canvas');

        if (applyFilterBtn && canvas) {
            applyFilterBtn.addEventListener('click', () => {
                this.simulateFilter(canvas, signalTypeSelect.value, filterTypeSelect.value);
            });
        }
    }

    simulateFilter(canvas, signalType, filterType) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
        ctx.fillRect(0, 0, width, height);

        // Draw frequency response
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
            const freq = (x / width) * 4000; // 0-4kHz
            let magnitude;

            if (filterType === 'lowpass') {
                // Lowpass filter response
                const cutoff = 1000; // 1kHz cutoff
                magnitude = 1 / (1 + Math.pow(freq / cutoff, 4));
            } else {
                // Highpass filter response
                const cutoff = 1000; // 1kHz cutoff
                magnitude = 1 - (1 / (1 + Math.pow(freq / cutoff, 4)));
            }

            const y = height - (magnitude * height * 0.8 + height * 0.1);
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Draw frequency markers
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        for (let freq = 0; freq <= 4000; freq += 1000) {
            const x = (freq / 4000) * width;
            ctx.fillText(`${freq}Hz`, x, height - 10);
        }

        // Update filter info
        this.updateFilterInfo(signalType, filterType);
    }

    updateFilterInfo(signalType, filterType) {
        const passbandEdge = document.getElementById('passband-edge');
        const stopbandEdge = document.getElementById('stopband-edge');
        const filterOrder = document.getElementById('filter-order');

        if (filterType === 'lowpass') {
            passbandEdge.textContent = '250 Hz';
            stopbandEdge.textContent = '1000 Hz';
        } else {
            passbandEdge.textContent = '1000 Hz';
            stopbandEdge.textContent = '250 Hz';
        }

        filterOrder.textContent = '12';
    }

    setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-text');
                navigator.clipboard.writeText(text).then(() => {
                    this.showCopyNotification(btn);
                });
            });
        });
    }

    showCopyNotification(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// Contact Manager
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactLinks();
    }

    setupContactLinks() {
        // Email link
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const email = link.href.replace('mailto:', '');
                window.open(`mailto:${email}`, '_blank');
            });
        });

        // Phone link
        const phoneElements = document.querySelectorAll('.contact-details p');
        phoneElements.forEach(element => {
            if (element.textContent.includes('405-')) {
                element.style.cursor = 'pointer';
                element.addEventListener('click', () => {
                    window.open('tel:405-992-6078', '_blank');
                });
            }
        });
    }
}

// Particle System for Hero Section
class ParticleSystem {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${8 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
            `;
            particleContainer.appendChild(particle);
        }
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new ECEDesignManager();
    new ContactManager();
    new ParticleSystem();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
    });
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const nextSection = sections[currentIndex + 1];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const prevSection = sections[currentIndex - 1];
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Cursor trail effect (optional)
let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail dot
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.backgroundColor = 'rgba(59, 130, 246, 0.6)';
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(dot);
    
    // Animate and remove
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        setTimeout(() => {
            if (dot.parentNode) {
                dot.remove();
            }
        }, 300);
    }, 100);
}); 