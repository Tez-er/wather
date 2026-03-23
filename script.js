// script.js

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const lines = hamburger.querySelectorAll('span');
        lines.forEach(line => line.classList.toggle('active-line'));
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

observeElements.forEach(el => observer.observe(el));


// Active Navbar Link Update on Scroll
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    // Earthquake shake effect
    const earthquakeSection = document.getElementById('earthquake');
    if (earthquakeSection) {
        if (current === 'earthquake') {
            earthquakeSection.classList.add('active-shake');
        } else {
            earthquakeSection.classList.remove('active-shake');
        }
    }
});


// Particle Effect Functions (Rain, Snow, Hail)
function createParticles(canvasId, type) {
    const container = document.getElementById(canvasId);
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    let width, height;
    let particles = [];

    function resize() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            
            if (type === 'rain') {
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = Math.random() * 15 + 10;
                this.speedX = Math.random() * 2 - 1; // slight wind
                this.length = Math.random() * 20 + 10;
            } else if (type === 'snow') {
                this.size = Math.random() * 3 + 1;
                this.speedY = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 3 - 1.5;
                this.opacity = Math.random() * 0.5 + 0.3;
            } else if (type === 'hail') {
                this.size = Math.random() * 5 + 2;
                this.speedY = Math.random() * 20 + 15;
                this.speedX = Math.random() * 4 - 2;
            }
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y > height) {
                this.reset();
                this.y = 0; // appear at top
            }
        }

        draw() {
            ctx.beginPath();
            if (type === 'rain') {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = this.size;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.speedX, this.y + this.length);
                ctx.stroke();
            } else if (type === 'snow') {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (type === 'hail') {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    const P_COUNT = type === 'rain' ? 150 : (type === 'snow' ? 200 : 80);
    for (let i = 0; i < P_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize particles for specific sections
document.addEventListener('DOMContentLoaded', () => {
    createParticles('rain-canvas-container', 'rain');
    createParticles('snow-canvas-container', 'snow');
    createParticles('hail-canvas-container', 'hail');
    
    // Add random lightning flashes
    // Random lightning flashes every 2.5 to 5 seconds
    const flash = document.getElementById('lightning-flash');
    if (flash) {
        function triggerFlash() {
            flash.style.opacity = Math.random() * 0.9 + 0.1;
            setTimeout(() => {
                flash.style.opacity = 0;
                if (Math.random() > 0.5) { // Occasional double flash
                    setTimeout(() => {
                        flash.style.opacity = Math.random() * 0.8 + 0.2;
                        setTimeout(() => { flash.style.opacity = 0; }, 50 + Math.random() * 100);
                    }, 50 + Math.random() * 50);
                }
            }, 50 + Math.random() * 100);
            
            const nextFlashDelay = 2500 + Math.random() * 2500; // 2.5 to 5 seconds
            setTimeout(triggerFlash, nextFlashDelay);
        }
        
        setTimeout(triggerFlash, 2000); // Initial start
    }
});
