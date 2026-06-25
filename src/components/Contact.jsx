import Reveal from './Reveal'
import { profile } from '../data'
import { Mail, Phone, MapPin, Linkedin, Github, Download, FileText, ArrowUpRight } from '../icons'
import './sections.css'

const methods = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, label: 'Location', value: profile.location, href: null },
]

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: Github, label: 'GitHub', href: profile.github },
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}` },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>
        <Reveal as="h2" className="section-title contact-title" delay={0.05}>
          Let&apos;s build something.
        </Reveal>
        <Reveal as="p" className="section-lead" delay={0.1}>
          I&apos;m always interested in new opportunities and collaborations. Feel free to reach
          out.
        </Reveal>

        <div className="contact-methods">
          {methods.map((m, i) => {
            const Icon = m.icon
            const inner = (
              <>
                <span className="contact-icon">
                  <Icon width={22} height={22} />
                </span>
                <span className="contact-method-label">{m.label}</span>
                <span className="contact-method-value">{m.value}</span>
              </>
            )
            return (
              <Reveal key={m.label} delay={0.1 + i * 0.06}>
                {m.href ? (
                  <a className="card contact-card" href={m.href}>
                    {inner}
                  </a>
                ) : (
                  <div className="card contact-card">{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        <Reveal className="contact-bottom" delay={0.2}>
          <div className="card resume-card">
            <div className="resume-info">
              <FileText width={30} height={30} />
              <div>
                <p className="resume-title">Resume</p>
                <p className="resume-sub">{profile.resumeUpdated}</p>
              </div>
            </div>
            <a className="btn btn-primary" href={profile.resume} download>
              <Download width={18} height={18} /> Download
            </a>
          </div>

          <div className="social-row">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  className="social-pill"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon width={18} height={18} />
                  <span>{s.label}</span>
                  <ArrowUpRight width={15} height={15} className="social-arrow" />
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
