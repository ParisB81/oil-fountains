const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initFountains();
});

// Oil colors - dark, glossy appearance
const oilColors = [
    'rgba(20, 20, 25, 0.9)',
    'rgba(30, 30, 35, 0.85)',
    'rgba(25, 25, 30, 0.9)',
    'rgba(15, 15, 20, 0.95)',
    'rgba(35, 30, 25, 0.85)', // slight brown tint
    'rgba(40, 35, 30, 0.8)'   // brownish oil
];

// Highlight colors for glossy effect
const highlightColors = [
    'rgba(60, 60, 70, 0.6)',
    'rgba(70, 70, 80, 0.5)',
    'rgba(80, 75, 70, 0.5)'
];

class Particle {
    constructor(x, y, fountain) {
        this.fountain = fountain;
        this.reset(x, y);
    }

    reset(x, y) {
        this.x = x + (Math.random() - 0.5) * 10;
        this.y = y;
        this.size = Math.random() * 6 + 3;
        this.speedY = -(Math.random() * 8 + this.fountain.power);
        this.speedX = (Math.random() - 0.5) * 3;
        this.gravity = 0.15;
        this.color = oilColors[Math.floor(Math.random() * oilColors.length)];
        this.highlight = highlightColors[Math.floor(Math.random() * highlightColors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.005 + 0.003;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        // Reset particle when it falls below fountain or fades out
        if (this.y > this.fountain.y || this.life <= 0) {
            this.reset(this.fountain.x, this.fountain.y);
        }
    }

    draw() {
        ctx.save();

        // Main oil droplet
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Glossy highlight
        ctx.beginPath();
        ctx.arc(
            this.x - this.size * 0.3,
            this.y - this.size * 0.3,
            this.size * 0.4 * this.life,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.highlight;
        ctx.fill();

        ctx.restore();
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
        // Draw fountain base
        ctx.save();

        // Base pool
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 10, 40, 15, 0, 0, Math.PI * 2);
        const poolGradient = ctx.createRadialGradient(this.x, this.y + 10, 0, this.x, this.y + 10, 40);
        poolGradient.addColorStop(0, 'rgba(30, 30, 35, 0.9)');
        poolGradient.addColorStop(0.7, 'rgba(20, 20, 25, 0.8)');
        poolGradient.addColorStop(1, 'rgba(15, 15, 20, 0.6)');
        ctx.fillStyle = poolGradient;
        ctx.fill();

        // Nozzle
        ctx.beginPath();
        ctx.fillStyle = '#2a2a30';
        ctx.fillRect(this.x - 5, this.y - 5, 10, 15);

        // Metallic highlight on nozzle
        ctx.beginPath();
        ctx.fillStyle = 'rgba(80, 80, 90, 0.5)';
        ctx.fillRect(this.x - 5, this.y - 5, 3, 15);

        ctx.restore();

        // Draw particles
        this.particles.forEach(particle => particle.draw());
    }
}

let fountains = [];

function initFountains() {
    fountains = [];
    const fountainCount = Math.min(5, Math.floor(canvas.width / 200));
    const spacing = canvas.width / (fountainCount + 1);

    for (let i = 0; i < fountainCount; i++) {
        const x = spacing * (i + 1);
        const y = canvas.height - 50;
        const particleCount = 80 + Math.random() * 40;
        const power = 10 + Math.random() * 5;
        fountains.push(new Fountain(x, y, particleCount, power));
    }
}

function drawBackground() {
    // Create subtle ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    groundGradient.addColorStop(0, 'transparent');
    groundGradient.addColorStop(1, 'rgba(10, 10, 15, 0.8)');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
}

function animate() {
    // Clear with semi-transparent black for trail effect
    ctx.fillStyle = 'rgba(15, 15, 25, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    fountains.forEach(fountain => {
        fountain.update();
        fountain.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize and start animation
initFountains();
animate();
