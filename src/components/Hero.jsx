import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data'
import { ArrowDown, Github, Linkedin, ArrowUpRight } from '../icons'
import './Hero.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// Split the name so each word animates in.
const words = profile.name.split(' ')

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <header id="top" className="hero" ref={ref}>
      <motion.div className="hero-inner container" style={{ y, opacity }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p className="hero-eyebrow eyebrow" variants={item}>
            {profile.role}
          </motion.p>

          <h1 className="hero-name">
            {words.map((w, i) => (
              <span className="hero-word" key={i}>
                <motion.span className="hero-word-inner" variants={item}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div className="hero-actions hero-actions--spaced" variants={item}>
            <a href="#projects" className="btn btn-primary">
              View work <ArrowUpRight width={18} height={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scroll"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown />
        </motion.span>
        Scroll
      </motion.a>
    </header>
  )
}
