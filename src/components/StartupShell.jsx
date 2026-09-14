import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Background from './Background'
import Reveal from './Reveal'
import { ArrowDown, ArrowUpRight, Code, Moon, Sun } from '../icons'
import './StartupShell.css'

const projectStories = [
  {
    number: '01',
    title: 'Test Execution Monitor',
    meta: 'Sparksoft Corporation · Summer 2025',
    summary:
      'A real-time dashboard that made more than 10,000 automated test results understandable at a glance.',
    made:
      'I designed the interface and underlying automation flow in Python, HTML, CSS, and JavaScript. The dashboard surfaced live status, grouped tests by markers, and made errors explorable instead of burying them in terminal output.',
    learned:
      'A tool is only useful when it reduces the time between seeing a problem and knowing what to do next. Performance mattered, but information hierarchy mattered just as much.',
    overcame:
      'At this scale, raw output became noise. I broke the codebase into modules, added filtering, and designed error views around the questions engineers actually ask while a test run is failing.',
    tags: ['Python', 'Pytest', 'JavaScript', 'Product UI'],
    link: 'https://github.com/nmaisheri/Test_Execution_Report',
  },
  {
    number: '02',
    title: 'Autonomous Obstacle-Traversing Vehicle',
    meta: 'University of Maryland · Spring 2025',
    summary:
      'A self-navigating vehicle built by an eight-person team to sense, approach, and cross physical obstacles.',
    made:
      'I co-led the team through mechanical design, sensor integration, dual-motor control, servo arms, custom firmware, and a final technical presentation to more than 200 people.',
    learned:
      'A system can have individually correct parts and still fail at the interfaces between them. Clear ownership and frequent integration tests beat waiting for a polished final assembly.',
    overcame:
      'The hardest failures appeared when hardware and software met. We iterated across sensor readings, motor behavior, and physical tolerances until the full vehicle behaved as one system.',
    tags: ['Arduino', 'C++', '3D Printing', 'Team Leadership'],
  },
  {
    number: '03',
    title: 'This Portfolio',
    meta: 'Personal Project · 2025–Present',
    summary:
      'The site you are reading: a responsive portfolio designed and built to make my work feel clear, personal, and easy to explore.',
    made:
      'I rebuilt an earlier static site in React, added a reusable content system, theme support, responsive layouts, canvas motion, and interactions that respect reduced-motion preferences.',
    learned:
      'Good design is not decoration. Every animation, label, and line of copy has to help someone understand the work—or get out of the way.',
    overcame:
      'The first version treated every detail as equally important. Rebuilding it forced me to edit aggressively, create a hierarchy, and make the experience work across screen sizes instead of only on my laptop.',
    tags: ['React', 'Interaction Design', 'Accessibility', 'Canvas API'],
    link: 'https://github.com/nmaisheri/nmaisheri.github.io',
  },
]

const wayfarePrinciples = [
  {
    number: '01',
    title: 'Start with the constraint',
    body: 'The budget is not a filter applied at the end. Wayfare removes an 8% buffer first, accounts for arrival cost, then divides what remains across lodging, food, activities, and local transit.',
  },
  {
    number: '02',
    title: 'Keep the math deterministic',
    body: 'A cost index and trip length determine the spending tier and category totals. AI can suggest what to do, but it cannot quietly invent or change the budget.',
  },
  {
    number: '03',
    title: 'Fail usefully',
    body: 'If live flights or an AI provider are unavailable, the product returns an estimated structural plan and explains the limitation instead of returning a dead end.',
  },
]

const iterationLog = [
  {
    label: 'Generic plans',
    text: 'The first working version could allocate money correctly, but its activities were generic. I added destination-aware AI recommendations while keeping every dollar outside the model.',
  },
  {
    label: 'Static-site limits',
    text: 'API keys could not safely live on GitHub Pages. I moved the planner to a small server-side architecture and deployed it on Vercel.',
  },
  {
    label: 'Incorrect totals',
    text: 'An early live-flight integration double-counted travelers. I corrected the calculation and made the budget engine—not the external result—the source of truth.',
  },
  {
    label: 'Expensive dependencies',
    text: 'Real flight searches have tight quotas. I added 12-hour route caching, a weekly per-browser limit, and graceful estimates so one API never controls the experience.',
  },
]

const navItems = [
  { id: 'work', label: 'Past work' },
  { id: 'wayfare', label: 'Wayfare' },
  { id: 'next', label: 'Next' },
]

function ShellNav({ theme, toggle }) {
  const [active, setActive] = useState('work')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="shell-home" href="/" aria-label="Return to Nipun Maisheri's main portfolio">
        <span>NM</span><i>.</i>
      </a>
      <button
        className="theme-btn theme-btn--floating"
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
      <nav className="shell-side-nav" aria-label="Startup Shell portfolio sections">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
            <span aria-hidden="true" />
            {item.label}
          </a>
        ))}
      </nav>
    </>
  )
}

function ProjectStory({ project, index }) {
  return (
    <Reveal>
      <article className="shell-project card">
        <div className="shell-project-heading">
          <div>
            <p className="shell-number">{project.number}</p>
            <h3>{project.title}</h3>
            <p className="shell-project-meta">{project.meta}</p>
          </div>
          {project.link && (
            <a
              className="icon-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
            >
              <Code />
            </a>
          )}
        </div>
        <p className="shell-project-summary">{project.summary}</p>
        <div className="shell-story-grid">
          <div>
            <span>What I made</span>
            <p>{project.made}</p>
          </div>
          <div>
            <span>What I learned</span>
            <p>{project.learned}</p>
          </div>
          <div>
            <span>What I overcame</span>
            <p>{project.overcame}</p>
          </div>
        </div>
        <div className="shell-tags">
          {project.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
        </div>
      </article>
    </Reveal>
  )
}

export default function StartupShell({ theme, toggle }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Nipun Maisheri — Startup Shell Portfolio'
    return () => { document.title = originalTitle }
  }, [])

  return (
    <>
      <Background theme={theme} />
      <ShellNav theme={theme} toggle={toggle} />

      <main className="startup-shell">
        <header id="top" className="shell-hero container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell-hero-meta">
              <p className="eyebrow">Startup Shell application · Fall 2026</p>
              <span>~8 minute read</span>
            </div>
            <h1>I build by finding the constraint that matters.</h1>
            <p className="shell-hero-lead">
              I&apos;m Nipun Maisheri, a computer engineering student at UMD. I like turning
              messy systems—thousands of test results, a physical robot, or an unrealistic
              travel budget—into products people can understand and use.
            </p>
            <div className="shell-hero-actions">
              <a className="btn btn-primary" href="#wayfare">
                What I&apos;m working on <ArrowDown width={18} height={18} />
              </a>
              <a className="btn btn-ghost" href="/">
                Main portfolio <ArrowUpRight width={18} height={18} />
              </a>
            </div>
          </motion.div>
          <div className="shell-hero-index" aria-label="Portfolio contents">
            <a href="#work"><b>01</b><span>Past projects</span></a>
            <a href="#wayfare"><b>02</b><span>Current idea</span></a>
            <a href="#next"><b>03</b><span>What comes next</span></a>
          </div>
        </header>

        <section id="work" className="section shell-work">
          <div className="container">
            <Reveal as="p" className="eyebrow">Part 1 · Selected work</Reveal>
            <Reveal as="h2" className="section-title" delay={0.05}>Three projects that changed how I build.</Reveal>
            <Reveal as="p" className="section-lead" delay={0.1}>
              Each one pushed me beyond making something technically correct and toward
              making something resilient, understandable, and useful.
            </Reveal>
            <div className="shell-project-list">
              {projectStories.map((project, index) => (
                <ProjectStory key={project.number} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="wayfare" className="section shell-wayfare">
          <div className="container">
            <Reveal as="p" className="eyebrow">Part 2 · What I&apos;m working on</Reveal>
            <div className="shell-wayfare-intro">
              <Reveal as="div">
                <p className="shell-kicker">Wayfare</p>
                <h2>Plan the trip you can afford—not the trip an algorithm wants to sell you.</h2>
              </Reveal>
              <Reveal as="div" className="shell-wayfare-pitch" delay={0.08}>
                <p>
                  Most travel tools start with inspiration and leave cost reconciliation to the
                  traveler. Wayfare reverses that flow: give it a destination, total budget, and
                  trip length, and it works backward to produce a day-by-day plan that fits.
                </p>
                <div className="shell-wayfare-actions">
                  <span className="shell-status">Working prototype · September 2026</span>
                  <a className="btn btn-primary" href="https://wayfare-hazel.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Try Wayfare <ArrowUpRight width={18} height={18} />
                  </a>
                  <a className="btn btn-ghost" href="#iterations">
                    Read the build log <ArrowDown width={18} height={18} />
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="shell-product-frame card">
              <div className="shell-frame-top">
                <span /><span /><span />
                <p>wayfare · budget engine</p>
              </div>
              <div className="shell-budget-visual">
                <div className="shell-budget-copy">
                  <span>Example plan</span>
                  <strong>$1,800</strong>
                  <p>7 days in Lisbon · 1 traveler</p>
                </div>
                <div className="shell-budget-bars" aria-label="Example budget allocation">
                  <div style={{ '--size': '30%' }}><span>Arrival</span><b>30%</b></div>
                  <div style={{ '--size': '27%' }}><span>Stay</span><b>27%</b></div>
                  <div style={{ '--size': '18%' }}><span>Food</span><b>18%</b></div>
                  <div style={{ '--size': '12%' }}><span>Explore</span><b>12%</b></div>
                  <div style={{ '--size': '5%' }}><span>Local transit</span><b>5%</b></div>
                  <div style={{ '--size': '8%' }}><span>Buffer</span><b>8%</b></div>
                </div>
              </div>
            </div>

            <div className="shell-principles">
              {wayfarePrinciples.map((principle) => (
                <Reveal as="article" className="shell-principle" key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </Reveal>
              ))}
            </div>

            <div id="iterations" className="shell-iterations">
              <Reveal as="div" className="shell-iterations-heading">
                <p className="eyebrow">The honest build log</p>
                <h3>What broke—and what changed because of it.</h3>
                <p>
                  The most valuable parts of Wayfare came from the moments when the first
                  approach was not good enough.
                </p>
              </Reveal>
              <div className="shell-iteration-list">
                {iterationLog.map((item, index) => (
                  <Reveal as="article" className="shell-iteration" key={item.label} delay={index * 0.04}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><h4>{item.label}</h4><p>{item.text}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="next" className="section shell-next">
          <div className="container shell-next-grid">
            <Reveal as="div">
              <p className="eyebrow">Where it goes next</p>
              <h2 className="section-title">The code works. Now I need to prove the product.</h2>
            </Reveal>
            <Reveal as="div" className="shell-next-list" delay={0.08}>
              <div><span>01</span><p>Test with UMD students planning real trips under a fixed budget.</p></div>
              <div><span>02</span><p>Compare Wayfare&apos;s estimates with what travelers actually spend.</p></div>
              <div><span>03</span><p>Learn which matters more: better cost accuracy, faster planning, or collaborative trip decisions.</p></div>
            </Reveal>
          </div>
          <div className="container shell-closing">
            <p>That is what I&apos;m working on.</p>
            <a href="mailto:maisherinipun@gmail.com">maisherinipun@gmail.com <ArrowUpRight /></a>
          </div>
        </section>
      </main>

      <footer className="shell-footer">
        <div className="container">
          <span>NM<span>.</span></span>
          <p>Built by Nipun Maisheri for Startup Shell.</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  )
}
