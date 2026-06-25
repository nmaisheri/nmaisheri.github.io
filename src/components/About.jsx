import Reveal from './Reveal'
import { profile, skills } from '../data'
import './sections.css'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-text">
          <Reveal as="p" className="eyebrow">
            About
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            Engineering student, software-minded.
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            {profile.about}
          </Reveal>
        </div>

        <Reveal className="about-skills" delay={0.15}>
          <h3 className="about-skills-title">Technical Skills</h3>
          {Object.entries(skills).map(([cat, list]) => (
            <div className="skill-row" key={cat}>
              <span className="skill-cat">{cat}</span>
              <div className="skill-chips">
                {list.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
