import { useEffect, useRef } from 'react'

// Animated particle + connection field on a fixed canvas.
// Recreates the original site's effect: drifting particles, twinkling stars,
// proximity lines, and mouse repulsion. Colors read from the theme token
// --particle (an "r,g,b" string) so it adapts to light/dark instantly.
export default function Background({ theme }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr

    const rgb = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() ||
      '9,9,11'
    let color = rgb()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const count = Math.min(70, Math.floor((w * h) / 18000))
    const stars = Math.min(120, Math.floor((w * h) / 9000))

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      o: Math.random() * 0.5 + 0.3,
      p: Math.random() * 0.012 + 0.004,
    }))
    const starField = Array.from({ length: stars }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.6 + 0.2,
      tw: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? -1 : 1),
    }))

    const mouse = { x: null, y: null, radius: 140 }
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = null
      mouse.y = null
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // stars (twinkle only)
      for (const s of starField) {
        s.o += s.tw
        if (s.o > 0.8 || s.o < 0.15) s.tw *= -1
        ctx.globalAlpha = s.o
        ctx.fillStyle = `rgb(${color})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // particles
      for (const a of particles) {
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1

        // mouse repulsion
        if (mouse.x !== null) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius
            a.x += (dx / dist) * force * 2.5
            a.y += (dy / dist) * force * 2.5
          }
        }

        a.o += a.p
        if (a.o > 0.85 || a.o < 0.25) a.p *= -1

        ctx.globalAlpha = a.o
        ctx.fillStyle = `rgb(${color})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 110) {
            ctx.globalAlpha = ((110 - dist) / 110) * 0.18
            ctx.strokeStyle = `rgb(${color})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    if (reduce) {
      // Draw a single static frame for reduced-motion users.
      draw()
      cancelAnimationFrame(rafRef.current)
    } else {
      draw()
    }

    // React to theme changes (token value flips).
    const recolor = setInterval(() => {
      color = rgb()
    }, 400)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(recolor)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />
}
