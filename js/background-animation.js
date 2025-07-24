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
            
            // Create colorful stardust trail
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
        // Create many background stars with varied colors
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
        // Create galaxy gradient background
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.3, this.canvas.height * 0.2, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.5, Math.max(this.canvas.width, this.canvas.height)
        );
        gradient.addColorStop(0, '#e54ed0');
        gradient.addColorStop(0.25, '#9f45b0');
        gradient.addColorStop(0.5, '#44008b');
        gradient.addColorStop(0.75, '#00076f');
        gradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = gradient;
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
        const selectedStars = nearbyStars.slice(0, 5);
        
        // Draw a single line connecting the stars in order of distance
        for (let i = 0; i < selectedStars.length - 1; i++) {
            const star1 = selectedStars[i].star;
            const star2 = selectedStars[i + 1].star;
            
            const opacity = Math.max(0, 1 - (selectedStars[i].distance / cursorRadius)) * 0.5;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 228, 242, ${opacity})`;
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
            this.ctx.strokeStyle = `rgba(229, 78, 208, ${opacity})`;
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
        
        // Color palette for stars
        const colors = ['#ffe4f2', '#e54ed0', '#9f45b0', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        if (type === 'trail') {
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.life = 40;
            this.maxLife = 40;
            this.brightness = 0.9;
            this.color = '#e54ed0'; // Pink trail
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
        ctx.fillStyle = this.color.replace(')', `, ${opacity})`).replace(/rgb|#[a-f0-9]{6}/i, (match) => {
            if (match.startsWith('#')) {
                const r = parseInt(match.slice(1, 3), 16);
                const g = parseInt(match.slice(3, 5), 16);
                const b = parseInt(match.slice(5, 7), 16);
                return `rgba(${r}, ${g}, ${b}`;
            }
            return match.replace('rgb', 'rgba');
        });
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
        
        // Random color from palette
        const colors = ['#ffe4f2', '#e54ed0', '#9f45b0'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
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
            const r = parseInt(this.color.slice(1, 3), 16);
            const g = parseInt(this.color.slice(3, 5), 16);
            const b = parseInt(this.color.slice(5, 7), 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.arc(this.tail[i].x, this.tail[i].y, this.size * (i / this.tail.length), 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw main star
        ctx.beginPath();
        const r = parseInt(this.color.slice(1, 3), 16);
        const g = parseInt(this.color.slice(3, 5), 16);
        const b = parseInt(this.color.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
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