const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call resize function
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ADD THESE MISSING COLOR DEFINITIONS:
const starColors = ['#A3B18A', '#588157', '#3A5A40', '#344E41'];
const particleColors = ['#A3B18A', '#588157', '#3A5A40', '#344E41'];

// Particles array
const particles = [];
const stars = [];
const numParticles = 80;
const numStars = 200;

// Mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 150
};

// Mouse event listeners
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// Particle class - remove shadows
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY *= -1;
        }

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let angle = Math.atan2(dy, dx);
                this.speedX += Math.cos(angle) * force * 0.5;
                this.speedY += Math.sin(angle) * force * 0.5;
            }
        }

        // Pulsing effect
        this.opacity += this.pulse;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.pulse *= -1;
        }

        // Slow down over time
        this.speedX *= 0.99;
        this.speedY *= 0.99;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Star class - remove shadows
class StarParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.drift = {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2
        };
    }

    update() {
        // Twinkling effect
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0.1) {
            this.twinkleSpeed *= -1;
        }

        // Gentle drift
        this.x += this.drift.x;
        this.y += this.drift.y;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Connection lines with updated colors
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                ctx.strokeStyle = '#588157'; // Use one of your palette colors
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

// Initialize particles and stars
function init() {
    particles.length = 0;
    stars.length = 0;
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    for (let i = 0; i < numStars; i++) {
        stars.push(new StarParticle());
    }
}

// Animation loop - plain background
function animate() {
    // Plain background color - no gradient
    ctx.fillStyle = '#DAD7CD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars (background layer)
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connection lines
    drawConnections();

    requestAnimationFrame(animate);
}

// Start animation
init();
animate();

// Resize handler
window.addEventListener('resize', function() {
    resizeCanvas();
    init();
});