const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Get current CSS variable values
function getCssVariable(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particles array
let particles = [];
let stars = [];
const numParticles = 80;
const numStars = 200;

// Mouse interaction
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
        this.colorIndex = Math.floor(Math.random() * 4);
    }

    update() {
        // Same update logic
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY *= -1;
        }

        // Other update logic...
        this.opacity += this.pulse;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.pulse *= -1;
        }

        this.speedX *= 0.99;
        this.speedY *= 0.99;
    }

    draw() {
        // Get colors directly from CSS variables each time
        const colors = [
            getCssVariable('--accent-primary'),
            getCssVariable('--accent-secondary'), 
            getCssVariable('--text-primary'),
            getCssVariable('--text-secondary')
        ];
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = colors[this.colorIndex];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Similar update for StarParticle class
class StarParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.colorIndex = Math.floor(Math.random() * 3);
    }

    update() {
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0.1) {
            this.twinkleSpeed *= -1;
        }
    }

    draw() {
        // Get colors directly from CSS variables each time
        const colors = [
            getCssVariable('--accent-primary'),
            getCssVariable('--accent-secondary'), 
            getCssVariable('--text-primary')
        ];
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = colors[this.colorIndex];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawConnections() {
    const connectionColor = getCssVariable('--accent-primary');
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                ctx.strokeStyle = connectionColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

function init() {
    particles = [];
    stars = [];
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    for (let i = 0; i < numStars; i++) {
        stars.push(new StarParticle());
    }
}

// Animation loop
function animate() {
    // Get background color directly from CSS variable
    ctx.fillStyle = getCssVariable('--bg-primary');
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

init();
animate();

// Make this function available globally
window.reinitializeBackgroundAnimation = function() {
    init();
}