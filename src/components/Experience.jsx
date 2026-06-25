import Reveal from './Reveal'
import { experiences } from '../data'
import { MapPin } from '../icons'
import './sections.css'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Career
        </Reveal>
        <Reveal as="h2" className="section-title" delay={0.05}>
          Professional experience
        </Reveal>
        <Reveal as="p" className="section-lead" delay={0.1}>
          Where I&apos;ve gained experience and contributed to meaningful work.
        </Reveal>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <Reveal className="timeline-item" key={exp.id} delay={i * 0.05}>
              <div className="timeline-marker" aria-hidden="true">
                <span className="timeline-dot" />
              </div>
              <div className="card timeline-card">
                <div className="timeline-head">
                  <h3 className="timeline-role">{exp.title}</h3>
                  <span className="timeline-duration">{exp.duration}</span>
                </div>
                <div className="timeline-sub">
                  <span className="timeline-company">{exp.company}</span>
                  <span className="timeline-location">
                    <MapPin width={14} height={14} /> {exp.location}
                  </span>
                </div>
                <p className="timeline-desc">{exp.description}</p>
                <ul className="timeline-achievements">
                  {exp.achievements.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
