class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.connections = [];
        
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
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        document.addEventListener('click', (e) => {
            // Create burst effect on click
            for (let i = 0; i < 10; i++) {
                this.particles.push(new Particle(
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
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        // Maintain particle count
        while (this.particles.length < 80) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
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
                    const opacity = (120 - distance) / 120 * 0.5;
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
}

class Particle {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'burst') {
            this.size = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = (Math.random() - 0.5) * 8;
            this.life = 60;
            this.maxLife = 60;
            this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
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
        if (this.type === 'burst') {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.98;
            this.speedY *= 0.98;
            this.life--;
            this.size *= 0.98;
        } else {
            // Mouse attraction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                this.x += (dx / distance) * force * 0.3;
                this.y += (dy / distance) * force * 0.3;
            }
            
            // Return to original position slowly
            this.x += (this.originalX - this.x) * 0.01;
            this.y += (this.originalY - this.y) * 0.01;
            
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
        if (this.type === 'burst') {
            opacity = this.life / this.maxLife;
        }
        
        ctx.beginPath();
        ctx.fillStyle = this.type === 'burst' ? 
            this.color.replace('60%)', `60%, ${opacity})`) : 
            `rgba(100, 255, 218, ${opacity * 0.8})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});