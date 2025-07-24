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
        this.constellationLines = [];
        
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
            
            if (distance > 5) {
                for (let i = 0; i < 1; i++) {
                    this.trailParticles.push(new Star(
                        this.mouse.x + (Math.random() - 0.5) * 10,
                        this.mouse.y + (Math.random() - 0.5) * 10,
                        'trail'
                    ));
                }
            }
        });
    }
    
    init() {
        // Create many background stars (increased density)
        const starCount = Math.floor((this.canvas.width * this.canvas.height) / 2000);
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
        
        // Draw simple constellation line
        this.drawConstellationLines();
        
        // Maintain star count
        while (this.stars.length < Math.floor((this.canvas.width * this.canvas.height) / 2000)) {
            this.stars.push(new Star(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                'background'
            ));
        }
        
        // Limit trail particles
        if (this.trailParticles.length > 50) {
            this.trailParticles.splice(0, this.trailParticles.length - 50);
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConstellationLines() {
        // Find stars near the cursor
        const nearbyStars = [];
        const cursorRadius = 150;
        
        this.stars.forEach(star => {
            const dx = star.x - this.mouse.x;
            const dy = star.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < cursorRadius) {
                nearbyStars.push({ star, distance });
            }
        });
        
        // Sort by distance and take the closest ones
        nearbyStars.sort((a, b) => a.distance - b.distance);
        const selectedStars = nearbyStars.slice(0, 5); // Only connect 5 stars max
        
        // Draw a single line connecting the stars in order of distance
        for (let i = 0; i < selectedStars.length - 1; i++) {
            const star1 = selectedStars[i].star;
            const star2 = selectedStars[i + 1].star;
            
            const opacity = Math.max(0, 1 - (selectedStars[i].distance / cursorRadius)) * 0.5;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(star1.x, star1.y);
            this.ctx.lineTo(star2.x, star2.y);
            this.ctx.stroke();
        }
        
        // Connect the first star to the cursor
        if (selectedStars.length > 0) {
            const firstStar = selectedStars[0].star;
            const opacity = Math.max(0, 1 - (selectedStars[0].distance / cursorRadius)) * 0.3;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.ctx.lineTo(firstStar.x, firstStar.y);
            this.ctx.stroke();
        }
    }
}

class Star {
    constructor(x, y, type = 'background') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'trail') {
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.life = 40;
            this.maxLife = 40;
            this.brightness = 0.9;
        } else {
            this.size = Math.random() * 1.8 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.1;
            this.speedY = (Math.random() - 0.5) * 0.1;
            this.life = Infinity;
            this.brightness = Math.random() * 0.9 + 0.1;
            this.twinkle = Math.random() * Math.PI * 2;
        }
        
        this.originalX = x;
        this.originalY = y;
    }
    
    update(mouse) {
        if (this.type === 'trail') {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.95;
            this.speedY *= 0.95;
            this.life--;
            this.size *= 0.98;
        } else {
            // Very gentle mouse attraction for background stars
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x += (dx / distance) * force * 0.05;
                this.y += (dy / distance) * force * 0.05;
            }
            
            // Return to original position
            this.x += (this.originalX - this.x) * 0.005;
            this.y += (this.originalY - this.y) * 0.005;
            
            // Add drift
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Twinkling effect
            this.twinkle += 0.01;
            
            // Wrap around edges
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }
    }
    
    draw(ctx) {
        let opacity = this.brightness;
        if (this.type === 'trail') {
            opacity = (this.life / this.maxLife) * this.brightness;
        } else {
            opacity = this.brightness * (0.3 + 0.7 * Math.sin(this.twinkle));
        }
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
        this.speedY = Math.random() * 2 + 1;
        this.size = Math.random() * 1.5 + 0.5;
        this.tail = [];
        this.life = Math.random() * 300 + 200;
    }
    
    update() {
        this.tail.push({ x: this.x, y: this.y });
        if (this.tail.length > 20) {
            this.tail.shift();
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    
    draw(ctx) {
        // Draw tail
        for (let i = 0; i < this.tail.length; i++) {
            const opacity = (i / this.tail.length) * 0.4;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(this.tail[i].x, this.tail[i].y, this.size * (i / this.tail.length), 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw main star
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    isOffScreen(width, height) {
        return this.y > height + 50 || this.x < -50 || this.x > width + 50 || this.life <= 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});