import { useTheme } from './useTheme'
import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StartupShell from './components/StartupShell'

export default function App() {
  const { theme, toggle } = useTheme()

  if (window.location.pathname.toLowerCase().startsWith('/startupshell')) {
    return <StartupShell theme={theme} toggle={toggle} />
  }

  return (
    <>
      <Background theme={theme} />
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
