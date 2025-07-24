class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
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
            
            // Create stardust trail
            const distance = Math.sqrt(
                Math.pow(this.mouse.x - this.mouse.prevX, 2) + 
                Math.pow(this.mouse.y - this.mouse.prevY, 2)
            );
            
            // Only create trail particles if mouse is moving fast enough
            if (distance > 3) {
                for (let i = 0; i < 2; i++) {
                    this.trailParticles.push(new Star(
                        this.mouse.x + (Math.random() - 0.5) * 20,
                        this.mouse.y + (Math.random() - 0.5) * 20,
                        'trail'
                    ));
                }
            }
        });
        
        // Keep click effect but make it more dramatic
        document.addEventListener('click', (e) => {
            // Create star explosion
            for (let i = 0; i < 20; i++) {
                this.trailParticles.push(new Star(
                    e.clientX + (Math.random() - 0.5) * 80,
                    e.clientY + (Math.random() - 0.5) * 80,
                    'burst'
                ));
            }
        });
    }
    
    init() {
        // Create many background stars
        const starCount = Math.floor((this.canvas.width * this.canvas.height) / 3000); // More stars
        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                'background'
            ));
        }
        
        // Create some shooting stars
        for (let i = 0; i < 3; i++) {
            this.shootingStars.push(new ShootingStar());
        }
    }
    
    animate() {
        // Create deep space background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background stars
        this.stars.forEach(star => {
            star.update(this.mouse);
            star.draw(this.ctx);
        });
        
        // Draw shooting stars
        this.shootingStars.forEach((star, index) => {
            star.update();
            star.draw(this.ctx);
            
            if (star.isOffScreen(this.canvas.width, this.canvas.height)) {
                this.shootingStars[index] = new ShootingStar();
            }
        });
        
        // Draw trail particles
        this.trailParticles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.trailParticles.splice(index, 1);
            }
        });
        
        // Draw connections between nearby stars
        this.drawStarConnections();
        
        // Maintain star count
        while (this.stars.length < Math.floor((this.canvas.width * this.canvas.height) / 3000)) {
            this.stars.push(new Star(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                'background'
            ));
        }
        
        // Limit trail particles
        if (this.trailParticles.length > 150) {
            this.trailParticles.splice(0, this.trailParticles.length - 150);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawStarConnections() {
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    const opacity = (80 - distance) / 80 * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.3;
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Star {
    constructor(x, y, type = 'background') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'burst') {
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 6;
            this.speedY = (Math.random() - 0.5) * 6;
            this.life = 60;
            this.maxLife = 60;
            this.brightness = 1;
        } else if (type === 'trail') {
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 30;
            this.maxLife = 30;
            this.brightness = 0.8;
        } else {
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.life = Infinity;
            this.brightness = Math.random() * 0.8 + 0.2;
            this.twinkle = Math.random() * Math.PI * 2;
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
            // Gentle mouse attraction for background stars
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x += (dx / distance) * force * 0.1;
                this.y += (dy / distance) * force * 0.1;
            }
            
            // Return to original position
            this.x += (this.originalX - this.x) * 0.01;
            this.y += (this.originalY - this.y) * 0.01;
            
            // Add drift
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Twinkling effect
            this.twinkle += 0.02;
            
            // Wrap around edges
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }
    }
    
    draw(ctx) {
        let opacity = this.brightness;
        if (this.type === 'burst' || this.type === 'trail') {
            opacity = (this.life / this.maxLife) * this.brightness;
        } else {
            opacity = this.brightness * (0.5 + 0.5 * Math.sin(this.twinkle));
        }
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow for larger stars
        if (this.size > 1) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}

class ShootingStar {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = Math.random() * 3 + 2;
        this.size = Math.random() * 2 + 1;
        this.tail = [];
        this.life = Math.random() * 200 + 100;
    }
    
    update() {
        this.tail.push({ x: this.x, y: this.y });
        if (this.tail.length > 15) {
            this.tail.shift();
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    
    draw(ctx) {
        // Draw tail
        for (let i = 0; i < this.tail.length; i++) {
            const opacity = (i / this.tail.length) * 0.5;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(this.tail[i].x, this.tail[i].y, this.size * (i / this.tail.length), 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw main star
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    isOffScreen(width, height) {
        return this.y > height + 50 || this.x < -50 || this.x > width + 50 || this.life <= 0;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});