# Darshan Joshi — Portfolio\n\nUpdated by BLACKBOXAI on $(date) — Synced from local portfolio-next

A production-grade Next.js 14 portfolio with Three.js 3D scenes, Framer Motion animations, and a fully interactive project detail system.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Three.js + @react-three/fiber** — 3D hero scenes & architecture viewers
- **Framer Motion** — scroll animations, page transitions
- **Tailwind CSS** — styling
- **React Markdown** — project insights editor

## Email Setup (Contact Form)

The contact form sends real emails via Gmail SMTP using Nodemailer.

**Step 1:** Copy the environment file:
```bash
cp .env.local.example .env.local
```

**Step 2:** Get a Gmail App Password (NOT your real password):
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification → make sure it's **ON**
3. Security → **App Passwords** → Add → "Mail" → "Other" → name it "Portfolio"
4. Google generates a 16-char password like `abcd efgh ijkl mnop`
5. Put it in `.env.local` without spaces: `GMAIL_APP_PASSWORD=abcdefghijklmnop`

**Step 3:** Run `npm run dev` and test the form.

When someone submits the form:
- You get a **beautiful HTML email** at `joshidarshan193@gmail.com` with their name, email, and message, plus a one-click reply button
- They get a **professional auto-reply** confirming receipt

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — Hero 3D scene, about, experience, projects preview |
| `/projects` | All 5 projects with filter bar |
| `/projects/[id]` | Individual project — 3D viewer, arch diagram, gallery, insights editor |
| `/education` | Degrees, skill bars, EC-Council certs, publication |
| `/publications` | **3 full publications** with expandable detail panels |
| `/contact` | Real email form (sends to Gmail) + direct links |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

## Add Your Photo
In `app/page.tsx`, the hero photo box has a click-to-upload zone. Click it to add your photo each session, or to permanently embed it:
1. Save your photo as `public/photo.jpg`
2. Replace the photo `<label>` block in `app/page.tsx` with:
```tsx
<img src="/photo.jpg" alt="Darshan Joshi" className="w-full aspect-square object-cover" />
```

## Update GitHub Links
In `lib/data.ts`, update each project's `github` field with your actual repo URLs:
```ts
github: 'https://github.com/darshanjoshi05/resume-intelligence-engine',
```

## Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and connect to vercel.com
```

## Deploy to Netlify
```bash
npm run build
# Upload the .next folder or connect via GitHub at app.netlify.com
```

## Project Structure
```
darshan-portfolio/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind
│   ├── not-found.tsx       # 404 page
│   ├── projects/
│   │   ├── page.tsx        # All projects
│   │   └── [id]/
│   │       ├── page.tsx    # Static params + metadata
│   │       └── ProjectDetail.tsx  # Client component
│   ├── education/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx         # Sticky nav with hamburger
│   │   └── Footer.tsx
│   ├── three/
│   │   ├── HeroScene.tsx   # Floating node cloud (home hero)
│   │   ├── ProjectScene.tsx # Architecture 3D layers
│   │   └── ParticleCanvas.tsx # Background particles
│   └── ui/
│       ├── SectionHeader.tsx
│       ├── ProgressBar.tsx
│       ├── InsightsEditor.tsx  # Markdown split-pane editor
│       ├── GalleryMock.tsx     # Mock UI gallery panels
│       └── ArchDiagram.tsx     # Architecture flowchart
├── lib/
│   └── data.ts             # ALL portfolio data — edit here
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## Customizing Content
All portfolio data lives in `lib/data.ts`:
- `PERSON` — name, bio, contact, stats
- `SKILLS` — tech stack tags
- `EXPERIENCE` — work history
- `PROJECTS` — all project data (name, stack, architecture, gallery, insights)
- `EDUCATION`, `CERTIFICATIONS`, `PUBLICATION` — education page data
- `SKILL_GROUPS` — skill bars with percentage levels
