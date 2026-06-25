# nmaisheri.github.io

My personal portfolio — a minimal, motion-driven site built with **Vite + React + Framer Motion**.

Live at **https://nmaisheri.github.io**.

---

## ✏️ Updating content (the only thing you usually need)

**All content lives in one file: [`src/data.js`](src/data.js).**

You do **not** need to touch any component or CSS to change what's on the site.
That file has a comment block at the top explaining everything, but in short:

| I want to… | Do this in `src/data.js` |
| --- | --- |
| Add a **project** | Copy a `{ ... }` block in the `projects` array, bump `id`, edit fields |
| Add an **experience** | Copy a `{ ... }` block in the `experiences` array, bump `id` |
| Add a **skill** | Add a string to a list in `skills`, or add a new `'Category': [...]` |
| Change **name / email / phone / links** | Edit the `profile` object |
| Reorder items | Move blocks up/down — they render in array order |

### Project link icons

Inside a project's `links`, each key shows a different icon on the card:

```js
links: {
  live: 'https://...',  // ↗  top-right arrow — a live/deployed site
  app:  'https://...',  // ↖  top-left arrow  — e.g. an app's repo
  code: 'https://...',  // </> code icon       — a source-code repo
}
```

Use only the keys you want, or omit `links` entirely. Add `type: 'Personal Project'`
to show a small green tag.

### Replacing your resume

Drop a new PDF at `public/resume.pdf` (keep the same name) — the Download button
points there automatically.

---

## 🛠 Running locally

```bash
npm install      # first time only
npm run dev      # start dev server with hot reload (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

Requires Node 18+.

---

## 🚀 Deploying

Pushing to the **`main`** branch automatically builds and deploys via GitHub
Actions (see `.github/workflows/deploy.yml`). No manual build step needed.

> One-time setup: in the repo, go to **Settings → Pages → Build and deployment →
> Source** and choose **GitHub Actions**.

---

## 🎨 Changing the look (optional)

Design tokens (colors, fonts, spacing, motion) live at the top of
[`src/index.css`](src/index.css) under `:root`, `[data-theme='light']`, and
`[data-theme='dark']`. Change the accent color, fonts, or radii in one place and
it updates everywhere.

---

## 📁 Project structure

```
index.html              App shell + fonts + no-flash theme script
src/
  main.jsx              React entry point
  App.jsx               Page composition (section order)
  data.js               ← ALL CONTENT lives here
  index.css             Design tokens + global styles
  icons.jsx             Inline SVG icons
  useTheme.js           Light/dark theme hook
  components/
    Background.jsx       Animated particle/connection canvas
    Nav.jsx              Left vertical nav + theme toggle + scroll progress
    Hero.jsx             Animated hero
    About.jsx            About + Technical Skills
    Projects.jsx         Project cards (tilt on hover)
    Experience.jsx       Timeline
    Contact.jsx          Contact methods + socials + resume
    Footer.jsx           Footer
legacy/                 The previous version of the site (archived)
```
