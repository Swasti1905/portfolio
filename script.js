// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing animation for hero name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('typing-complete');
        }
    }
    type();
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Photo Upload Functionality
    const photoFrame = document.getElementById('photoFrame');
    const photoInput = document.getElementById('photoInput');
    const profilePhoto = document.getElementById('profilePhoto');
    const photoOverlay = document.getElementById('photoOverlay');

    // Click on photo frame to trigger file input
    if (photoFrame && photoInput) {
        photoFrame.addEventListener('click', () => {
            photoInput.click();
        });

        // Handle file selection
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profilePhoto.src = event.target.result;
                    profilePhoto.style.display = 'block';
                    photoOverlay.style.display = 'none';
                    // Store in localStorage to persist
                    localStorage.setItem('profilePhoto', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Load saved photo from localStorage
        const savedPhoto = localStorage.getItem('profilePhoto');
        if (savedPhoto) {
            profilePhoto.src = savedPhoto;
            profilePhoto.style.display = 'block';
            photoOverlay.style.display = 'none';
            // Update overlay text to "Change Photo"
            const overlayText = photoOverlay.querySelector('span');
            if (overlayText) {
                overlayText.textContent = 'Change Photo';
            }
        } else {
            // Show placeholder if no photo
            photoOverlay.style.display = 'flex';
        }

        // Show overlay on hover when photo exists
        photoFrame.addEventListener('mouseenter', () => {
            if (profilePhoto.src && profilePhoto.src !== window.location.href) {
                photoOverlay.style.display = 'flex';
                const overlayText = photoOverlay.querySelector('span');
                if (overlayText) {
                    overlayText.textContent = 'Change Photo';
                }
            }
        });

        photoFrame.addEventListener('mouseleave', () => {
            if (profilePhoto.src && profilePhoto.src !== window.location.href) {
                photoOverlay.style.display = 'none';
            }
        });
    }

    // Initialize typing effect
    const typingElement = document.getElementById('typing-text');
    if (typingElement && typingElement.textContent.trim() !== '') {
        const text = typingElement.textContent.trim();
        // Small delay to ensure page is ready
        setTimeout(() => {
            typeWriter(typingElement, text, 120);
        }, 500);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
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

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.education-card, .project-card, .certificate-card, .skill-category, .objective-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Animate section titles on scroll
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, { threshold: 0.3 });

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add ripple effect to buttons and tags
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple to interactive elements
document.querySelectorAll('.cta-button, .tag, .skill-tag').forEach(element => {
    element.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mouse move parallax effect for cards
document.querySelectorAll('.project-card, .education-card, .certificate-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Animated counter for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Smooth reveal animation for project details
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const details = card.querySelectorAll('.project-details li');
        details.forEach((li, index) => {
            setTimeout(() => {
                li.style.opacity = '1';
                li.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
});

// Initialize project details animation
document.querySelectorAll('.project-details li').forEach(li => {
    li.style.opacity = '0.7';
    li.style.transform = 'translateX(-10px)';
    li.style.transition = 'all 0.3s ease';
});

// Animate progress bars when in view
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.setProperty('--progress', progress + '%');
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Project button interactions
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

