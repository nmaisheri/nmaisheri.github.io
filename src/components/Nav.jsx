import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { navLinks } from '../data'
import { Sun, Moon } from '../icons'
import './Nav.css'

export default function Nav({ theme, toggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('about')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      {/* Theme toggle stays out of the way in the top-right corner */}
      <button
        className="theme-btn theme-btn--floating"
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>

      {/* Vertical nav docked to the left gutter — appears after scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            className="side-nav"
            aria-label="Primary"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className={active === l.id ? 'is-active' : ''}
              >
                <span className="side-dot" aria-hidden="true" />
                <span className="side-label">{l.label}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
