import { motion } from 'framer-motion'

// Scroll-triggered reveal. Respects reduced-motion automatically via Framer's
// useReducedMotion-aware defaults when the OS setting is on (transitions are
// near-instant). Use `delay` to stagger siblings.
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
