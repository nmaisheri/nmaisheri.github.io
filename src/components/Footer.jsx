import { profile } from '../data'
import './sections.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-brand">
          NM<span>.</span>
        </span>
        <p className="footer-copy">© {year} {profile.name}. All rights reserved.</p>
        <a href="#top" className="footer-top">
          Back to top
        </a>
      </div>
    </footer>
  )
}
