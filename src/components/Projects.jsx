import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { projects } from '../data'
import { Calendar, ArrowUpRight, ArrowUpLeft, Code } from '../icons'
import './sections.css'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: py * -6, ry: px * 6 })
  }
  const reset = () => setTilt({ rx: 0, ry: 0 })

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <motion.article
        ref={ref}
        className="card project-card"
        onMouseMove={onMove}
        onMouseLeave={reset}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformPerspective: 900 }}
      >
        <div className="project-top">
          <div className="project-meta">
            <span className="project-date">
              <Calendar width={15} height={15} /> {project.date}
            </span>
            {project.type && <span className="project-type">{project.type}</span>}
          </div>
          <div className="project-actions">
            {project.links?.app && (
              <a
                href={project.links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label={`${project.title} — view project`}
              >
                <ArrowUpLeft width={18} height={18} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label={`${project.title} — live site`}
              >
                <ArrowUpRight width={18} height={18} />
              </a>
            )}
            {project.links?.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label={`${project.title} — source code`}
              >
                <Code width={18} height={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <p className="project-detail">{project.details}</p>

        <div className="project-tech">
          {project.technologies.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Work
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.05}>
          Featured projects
        </Reveal>
        <Reveal as="p" className="section-lead" delay={0.1}>
          A selection of things I&apos;ve designed, built, and shipped.
        </Reveal>

        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
