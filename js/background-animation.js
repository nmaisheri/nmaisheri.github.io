class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
        this.connections = [];
        this.trailParticles = [];
        
        // Ensure canvas doesn't interfere with mouse events
        this.canvas.style.pointerEvents = 'none';
        
        this.resize();
        this.init();
        this.animate();
        this.bindEvents();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        // Listen to mouse events on the document, not the canvas
        document.addEventListener('mousemove', (e) => {
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create trail effect as mouse moves
            const distance = Math.sqrt(
                Math.pow(this.mouse.x - this.mouse.prevX, 2) + 
                Math.pow(this.mouse.y - this.mouse.prevY, 2)
            );
            
            // Only create trail particles if mouse is moving fast enough
            if (distance > 5) {
                for (let i = 0; i < 3; i++) {
                    this.trailParticles.push(new Particle(
                        this.mouse.x + (Math.random() - 0.5) * 30,
                        this.mouse.y + (Math.random() - 0.5) * 30,
                        'trail'
                    ));
                }
            }
        });
        
        // Keep click effect but make it more dramatic
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 15; i++) {
                this.trailParticles.push(new Particle(
                    e.clientX + (Math.random() - 0.5) * 100,
                    e.clientY + (Math.random() - 0.5) * 100,
                    'burst'
                ));
            }
        });
    }
    
    init() {
        // Create initial particles
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw background particles
        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        // Update and draw trail particles
        this.trailParticles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.trailParticles.splice(index, 1);
            }
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        // Draw cursor glow effect
        this.drawCursorGlow();
        
        // Maintain background particle count
        while (this.particles.length < 80) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
        
        // Limit trail particles to prevent performance issues
        if (this.trailParticles.length > 100) {
            this.trailParticles.splice(0, this.trailParticles.length - 100);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3; // Reduced opacity
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawCursorGlow() {
        if (this.mouse.x > 0 && this.mouse.y > 0) {
            const gradient = this.ctx.createRadialGradient(
                this.mouse.x, this.mouse.y, 0,
                this.mouse.x, this.mouse.y, 50
            );
            gradient.addColorStop(0, 'rgba(100, 255, 218, 0.2)'); // Reduced opacity
            gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
            
            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(this.mouse.x, this.mouse.y, 50, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

class Particle {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'burst') {
            this.size = Math.random() * 4 + 3;
            this.speedX = (Math.random() - 0.5) * 10;
            this.speedY = (Math.random() - 0.5) * 10;
            this.life = 80;
            this.maxLife = 80;
            this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
        } else if (type === 'trail') {
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 3;
            this.speedY = (Math.random() - 0.5) * 3;
            this.life = 40;
            this.maxLife = 40;
            this.color = `hsl(${Math.random() * 30 + 180}, 80%, 70%)`;
        } else {
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.life = Infinity;
            this.color = '#64ffda';
        }
        
        this.originalX = x;
        this.originalY = y;
    }
    
    update(mouse) {
        if (this.type === 'burst' || this.type === 'trail') {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.98;
            this.speedY *= 0.98;
            this.life--;
            this.size *= 0.99;
        } else {
            // Mouse attraction for background particles
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                this.x += (dx / distance) * force * 0.5;
                this.y += (dy / distance) * force * 0.5;
            }
            
            // Return to original position slowly
            this.x += (this.originalX - this.x) * 0.02;
            this.y += (this.originalY - this.y) * 0.02;
            
            // Add some drift
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }
    }
    
    draw(ctx) {
        let opacity = 1;
        if (this.type === 'burst' || this.type === 'trail') {
            opacity = this.life / this.maxLife;
        }
        
        ctx.beginPath();
        
        if (this.type === 'burst') {
            ctx.fillStyle = this.color.replace('60%)', `60%, ${opacity})`);
        } else if (this.type === 'trail') {
            ctx.fillStyle = this.color.replace('70%)', `70%, ${opacity})`);
        } else {
            ctx.fillStyle = `rgba(100, 255, 218, ${opacity * 0.6})`; // Reduced opacity
        }
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        if (this.type !== 'normal') {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});