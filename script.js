// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
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

// Simple fade-in animation for sections
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

// Observe all sections for fade-in effect and initialize future animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Future Possibilities Section Animations
    // Animate future cards on scroll
    const futureCards = document.querySelectorAll('.future-card');
    const futureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = `all 0.6s ease ${index * 0.2}s`;
            }
        });
    }, { threshold: 0.1 });

    futureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        futureObserver.observe(card);
    });

    // Interactive future card effects
    futureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.future-icon i');
            const skills = card.querySelectorAll('.future-skill');
            
            // Animate icon
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
            
            // Animate skills with delay
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'translateY(-5px) scale(1.05)';
                    skill.style.background = 'rgba(255, 255, 255, 0.4)';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.future-icon i');
            const skills = card.querySelectorAll('.future-skill');
            
            // Reset icon
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset skills
            skills.forEach(skill => {
                skill.style.transform = 'translateY(0) scale(1)';
                skill.style.background = 'rgba(255, 255, 255, 0.2)';
            });
        });
    });

    // Career path timeline animations
    const pathSteps = document.querySelectorAll('.path-step');
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = `all 0.8s ease ${index * 0.3}s`;
            }
        });
    }, { threshold: 0.2 });

    pathSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        pathObserver.observe(step);
    });

    // Interactive career path steps
    pathSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const content = step.querySelector('.step-content');
            const icon = step.querySelector('.step-icon i');
            
            if (content) {
                content.style.transform = 'translateY(-5px) scale(1.02)';
                content.style.background = 'rgba(255, 255, 255, 0.2)';
            }
            
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'all 0.3s ease';
            }
        });

        step.addEventListener('mouseleave', () => {
            const content = step.querySelector('.step-content');
            const icon = step.querySelector('.step-icon i');
            
            if (content) {
                content.style.transform = 'translateY(0) scale(1)';
                content.style.background = 'rgba(255, 255, 255, 0.1)';
            }
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Add click-to-explore functionality for future cards
    futureCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent;
            
            // Create a modal or tooltip with more information
            const info = {
                'ai-ml': 'Artificial Intelligence and Machine Learning are revolutionizing how we solve complex problems. From autonomous vehicles to medical diagnosis, AI is transforming every industry.',
                'iot': 'The Internet of Things connects billions of devices, creating smart cities, homes, and industries. IoT engineers build the infrastructure of tomorrow.',
                'robotics': 'Robotics combines mechanical engineering, electronics, and computer science to create intelligent machines that work alongside humans.',
                'cybersecurity': 'As technology advances, protecting digital systems becomes crucial. Cybersecurity experts defend against evolving threats.',
                'quantum': 'Quantum computing harnesses quantum mechanics to solve problems impossible for classical computers, revolutionizing cryptography and drug discovery.',
                'biotech': 'Biomedical engineering merges technology with healthcare, creating medical devices and systems that improve human health and quality of life.'
            };
            
            // Show information in a subtle way
            const tooltip = document.createElement('div');
            tooltip.innerHTML = `
                <h4>${title}</h4>
                <p>${info[category]}</p>
            `;
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 400px;
                z-index: 10000;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                animation: fadeIn 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Remove tooltip after 3 seconds or on click
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 3000);
            
            tooltip.addEventListener('click', () => {
                tooltip.remove();
            });
        });
    });

    // Enhanced typing effect for hero description
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
});

// Click-to-copy functionality for contact information
document.querySelectorAll('.contact-item p').forEach(element => {
    element.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show a simple tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #2563eb;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// Professional hover effects for cards
document.querySelectorAll('.project-card, .experience-card, .education-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Simple skill tag hover effects
document.querySelectorAll('.skill-tag, .course-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Professional button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Profile picture hover effect
const profilePicture = document.querySelector('.profile-picture');
if (profilePicture) {
    profilePicture.addEventListener('mouseenter', () => {
        const overlay = profilePicture.querySelector('.profile-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
        }
    });
    
    profilePicture.addEventListener('mouseleave', () => {
        const overlay = profilePicture.querySelector('.profile-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
        }
    });
}

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
    });
});

// Interactive Demo Functions
function triggerTypingEffect() {
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
        
        typeWriter();
        
        // Scroll to hero section
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
}

function triggerFutureAnimation() {
    const futureCards = document.querySelectorAll('.future-card');
    futureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        }, 100);
    });
    
    // Scroll to future section
    document.querySelector('#future').scrollIntoView({ behavior: 'smooth' });
}

function triggerProfileAnimation() {
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.style.animation = 'none';
        profilePicture.offsetHeight; // Trigger reflow
        profilePicture.style.animation = 'float 2s ease-in-out';
        
        // Add a pulse effect
        profilePicture.style.boxShadow = '0 0 0 0 rgba(37, 99, 235, 0.7)';
        profilePicture.style.animation = 'pulse 2s infinite';
        
        setTimeout(() => {
            profilePicture.style.animation = 'float 6s ease-in-out infinite';
            profilePicture.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        }, 2000);
    }
    
    // Scroll to hero section
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
}

// Cursor trail effect
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
    dot.style.backgroundColor = 'rgba(37, 99, 235, 0.6)';
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