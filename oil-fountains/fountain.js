// Wait for DOM to be fully ready
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);

let initialized = false;
let canvas, ctx;
let fountains = [];
let screenWidth, screenHeight;

function init() {
    if (initialized) return;
    initialized = true;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Wait a moment for WebView to settle
    setTimeout(() => {
        resizeCanvas();
        animate();
    }, 100);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => {
        setTimeout(resizeCanvas, 200);
    });

    // Prevent default touch behaviors
    document.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

    // Touch interaction - tap to boost nearest fountain
    document.addEventListener('touchstart', handleTouch, { passive: false });
    document.addEventListener('click', handleClick);
}

function resizeCanvas() {
    screenWidth = window.innerWidth || document.documentElement.clientWidth || 360;
    screenHeight = window.innerHeight || document.documentElement.clientHeight || 640;

    // Ensure we have valid dimensions
    if (screenWidth < 10) screenWidth = 360;
    if (screenHeight < 10) screenHeight = 640;

    canvas.width = screenWidth;
    canvas.height = screenHeight;
    canvas.style.width = screenWidth + 'px';
    canvas.style.height = screenHeight + 'px';

    initFountains();
}

// Oil colors - made more visible with lighter shades
const oilColors = [
    'rgba(40, 40, 50, 0.95)',
    'rgba(50, 50, 60, 0.9)',
    'rgba(45, 45, 55, 0.95)',
    'rgba(35, 35, 45, 0.95)',
    'rgba(55, 45, 40, 0.9)',
    'rgba(60, 50, 45, 0.9)'
];

// Highlight colors - brighter for visibility
const highlightColors = [
    'rgba(100, 100, 120, 0.7)',
    'rgba(110, 110, 130, 0.6)',
    'rgba(120, 115, 110, 0.6)'
];

class Particle {
    constructor(x, y, fountain) {
        this.fountain = fountain;
        this.reset(x, y);
    }

    reset(x, y) {
        this.x = x + (Math.random() - 0.5) * 10;
        this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedY = -(Math.random() * 8 + this.fountain.power);
        this.speedX = (Math.random() - 0.5) * 3;
        this.gravity = 0.15;
        this.color = oilColors[Math.floor(Math.random() * oilColors.length)];
        this.highlight = highlightColors[Math.floor(Math.random() * highlightColors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.004 + 0.002;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        if (this.y > this.fountain.y || this.life <= 0) {
            this.reset(this.fountain.x, this.fountain.y);
        }
    }

    draw() {
        const radius = this.size * this.life;
        if (radius < 0.5) return;

        // Main oil droplet
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Glossy highlight
        ctx.beginPath();
        ctx.arc(
            this.x - radius * 0.3,
            this.y - radius * 0.3,
            radius * 0.4,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.highlight;
        ctx.fill();
    }
}

class Fountain {
    constructor(x, y, particleCount, power) {
        this.x = x;
        this.y = y;
        this.power = power;
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(x, y, this));
        }
    }

    update() {
        this.particles.forEach(particle => particle.update());
    }

    draw() {
        // Base pool - more visible
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 10, 45, 18, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(50, 50, 60, 0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(80, 80, 100, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nozzle
        ctx.fillStyle = '#3a3a45';
        ctx.fillRect(this.x - 6, this.y - 6, 12, 16);

        // Metallic highlight
        ctx.fillStyle = 'rgba(100, 100, 120, 0.6)';
        ctx.fillRect(this.x - 6, this.y - 6, 4, 16);

        // Draw particles
        this.particles.forEach(particle => particle.draw());
    }
}

function initFountains() {
    fountains = [];

    // Adjust fountain count for screen size
    const minSpacing = screenWidth < 500 ? 100 : 180;
    const fountainCount = Math.max(2, Math.min(5, Math.floor(screenWidth / minSpacing)));
    const spacing = screenWidth / (fountainCount + 1);

    // Adjust for mobile
    const isMobile = screenWidth < 768;
    const baseParticles = isMobile ? 40 : 70;

    for (let i = 0; i < fountainCount; i++) {
        const x = spacing * (i + 1);
        const y = screenHeight - 60;
        const particleCount = baseParticles + Math.random() * 25;
        const power = isMobile ? 7 + Math.random() * 4 : 9 + Math.random() * 5;
        fountains.push(new Fountain(x, y, particleCount, power));
    }
}

function drawBackground() {
    // Ground gradient - subtle for transparency
    const groundGradient = ctx.createLinearGradient(0, screenHeight - 120, 0, screenHeight);
    groundGradient.addColorStop(0, 'transparent');
    groundGradient.addColorStop(1, 'rgba(20, 20, 30, 0.3)');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, screenHeight - 120, screenWidth, 120);
}

function animate() {
    // Clear canvas with transparency
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    drawBackground();

    fountains.forEach(fountain => {
        fountain.update();
        fountain.draw();
    });

    requestAnimationFrame(animate);
}

function handleTouch(e) {
    if (!fountains.length) return;
    const touch = e.touches[0];
    boostNearestFountain(touch.clientX);
}

function handleClick(e) {
    if (!fountains.length) return;
    boostNearestFountain(e.clientX);
}

function boostNearestFountain(x) {
    let nearest = fountains[0];
    let minDist = Math.abs(fountains[0].x - x);

    fountains.forEach(f => {
        const dist = Math.abs(f.x - x);
        if (dist < minDist) {
            minDist = dist;
            nearest = f;
        }
    });

    // Boost the fountain
    nearest.particles.forEach(p => {
        if (Math.random() > 0.4) {
            p.speedY = -(14 + Math.random() * 6);
            p.speedX = (Math.random() - 0.5) * 6;
        }
    });
}
