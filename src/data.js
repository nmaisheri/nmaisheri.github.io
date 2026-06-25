// =============================================================================
//  PORTFOLIO CONTENT — edit this file to update the whole site.
//  This is the ONLY file you need to touch to add/remove/change content.
//  Nothing here is styling; it's just your data. After editing, run
//  `npm run dev` to preview, or push to `main` to deploy automatically.
//
//  HOW TO ADD THINGS
//  -----------------
//  • New PROJECT      → copy a {...} block inside the `projects` array,
//                       bump the `id`, and fill in the fields. See the
//                       "links" notes below for the icons that appear.
//  • New EXPERIENCE   → copy a {...} block inside the `experiences` array,
//                       bump the `id`. `achievements` is a list of bullets.
//  • New SKILL        → add a string to any list in `skills`, OR add a whole
//                       new category: 'Category Name': ['Skill A', 'Skill B'].
//  • Order matters    → items render top-to-bottom in array order.
//
//  PROJECT "links" — each key shows a different icon on the card:
//    live: 'https://...'   → ↗ top-right arrow  (a live/deployed site)
//    app:  'https://...'   → ↖ top-left arrow   (e.g. SmartClip's repo)
//    code: 'https://...'   → </> code icon      (a source-code repo)
//  Include only the keys you want; omit `links` entirely for none.
//  Optional `type: 'Personal Project'` shows a small green tag.
// =============================================================================

export const profile = {
  name: 'Nipun Maisheri',
  role: 'Computer Engineering Student @ UMD',
  about:
    'Sophomore pursuing computer engineering at the University of Maryland, College Park. Passionate about developing innovative solutions and exploring new technologies, with a current focus on software development and system design.',
  email: 'maisherinipun@gmail.com',
  phone: '(240) 665-9411',
  phoneHref: 'tel:+12406659411',
  location: 'College Park, MD',
  linkedin: 'https://www.linkedin.com/in/nipun-maisheri/',
  github: 'https://github.com/nmaisheri',
  resume: '/resume.pdf',
  resumeUpdated: 'Updated August 2025',
}

export const projects = [
  {
    id: 1,
    title: 'Interactive Website Portfolio',
    date: 'August 2025',
    description:
      'A modern, responsive portfolio website with interactive particle animations and smooth transitions for an engaging user experience.',
    details:
      'Built with HTML, CSS, JavaScript, and React, this project showcases my front-end development and design skills.',
    technologies: ['HTML/CSS', 'JavaScript', 'Canvas API', 'React'],
    links: {
      live: 'https://nmaisheri.github.io/',
      code: 'https://github.com/nmaisheri/nmaisheri.github.io',
    },
  },
  {
    id: 2,
    title: 'Test Execution Monitor',
    date: 'August 2025',
    description:
      'A real-time pytest automation dashboard built with Python, HTML, CSS, and JavaScript to monitor 10,000+ test executions with live status updates and marker-based filtering.',
    details:
      'Implemented interactive error visualization, responsive UI design, and a modular architecture with separated CSS/JavaScript files for maintainability and scalability.',
    technologies: ['Python', 'HTML/CSS', 'JavaScript'],
    links: {
      code: 'https://github.com/nmaisheri/Test_Execution_Report',
    },
  },
  {
    id: 3,
    title: 'Autonomous Obstacle-Traversing Vehicle',
    date: 'April 2025',
    description:
      'Co-led a team of 8 to design and build a self-navigating vehicle, integrating sensors, dual motors, and servo arms with custom firmware.',
    details:
      'Presented the final system and design tradeoffs in a 15-minute technical showcase to an audience of over 200.',
    technologies: ['Arduino', 'C++', 'Autodesk', '3D Printing', 'Sensor Integration'],
    type: 'Academic Project',
  },
  {
    id: 4,
    title: 'Data Structure Visualizer',
    date: 'March 2025',
    description:
      'A comprehensive suite of data structures and algorithms in Java, designed to help students understand core concepts through interactive visualizations and hands-on exercises.',
    details:
      'All user information was saved locally; generated over 45 different users, helping them learn the basics of object-oriented programming.',
    technologies: ['Java', 'JavaFX', 'Data Structures', 'Algorithms', 'Interactive UI'],
    type: 'Academic Project',
    links: {
      code: 'https://github.com/nmaisheri/Data-Structure-Visualizer',
    },
  },
  {
    id: 5,
    title: 'SmartClip',
    date: 'In Progress',
    description:
      'A macOS clipboard manager built with Swift and SwiftUI that lets users store and manage multiple clipboard items efficiently.',
    details:
      'Features search, categorization of clipboard items, and AI-powered summarization of text and images — designed to boost productivity.',
    technologies: ['Swift', 'SwiftUI', 'AI Integration'],
    type: 'Personal Project',
    links: {
      app: 'https://github.com/nmaisheri/SmartClip',
    },
  },
]

export const experiences = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Sparksoft Corporation',
    duration: 'June 2025 – August 2025',
    location: 'Columbia, MD',
    description:
      'Designed and led development of high-performance automation solutions, focused on test infrastructure, framework development, and codebase optimization.',
    achievements: [
      'Implemented a high-performance test automation dashboard capable of processing 10,000+ test cases with real-time status visualization.',
      'Developed a modular Pytest framework with intelligent test randomization, marker-based filtering, and dynamic execution timing.',
      'Led a full codebase reorganization focused on modularity and long-term maintainability, improving scalability and developer productivity.',
    ],
  },
  {
    id: 2,
    title: 'Student IT Worker',
    company: 'University of Maryland School of Public Health',
    duration: 'Feb 2025 – Present',
    location: 'College Park, MD',
    description:
      'Providing comprehensive IT and audiovisual support for academic operations, managing technical infrastructure for classes, events, and administrative functions.',
    achievements: [
      'Set up and troubleshoot AV and IT support for classes and in-house events, handling tickets via Jira.',
      'Assist professors, guests, and department heads with resolving computer issues efficiently.',
      'Set up, maintain, and test audiovisual and IT systems for classes, seminars, and live events.',
    ],
  },
  {
    id: 3,
    title: 'Seasonal Production Warehouse Technician',
    company: 'Daly Computers',
    duration: 'June 2023 – August 2023',
    location: 'Frederick, MD',
    description:
      'Managed logistics and technical operations in a high-volume production environment, focused on hardware assembly, testing, and quality assurance.',
    achievements: [
      'Configured, imaged, and tested hardware and software components for K-12 schools.',
      'Organized and palletized hundreds of customer and individual orders.',
      'Performed quality assurance and quality control audits.',
    ],
  },
]

export const skills = {
  'Programming Languages': ['Python', 'Java', 'JavaScript', 'C++', 'HTML/CSS', 'Swift'],
  'Frameworks & Tools': ['React', 'SwiftUI', 'Git', 'Jira', 'Arduino', 'Pytest'],
  Technologies: ['AWS', 'Azure', 'Test Automation', 'AV Systems', '3D Printing'],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
