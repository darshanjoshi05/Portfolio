# SEO & Vercel Setup Guide — Darshan Joshi Portfolio

## ✅ What Was Changed

### 1. `app/layout.tsx` — Root Metadata (most important file)
- Updated `metadataBase` from `darshanjoshi.dev` → **`darshanjoshi.tech`** (your actual domain)
- Enhanced title, description, and 17 targeted keywords
- Added `alternates.canonical` to prevent duplicate content penalties
- Added `publisher`, `category` fields
- Upgraded OG image to 1200×630 (standard social share size)
- Enhanced Googlebot directives (`max-video-preview`, `max-snippet`)
- Added PWA icons (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`)
- Added **JSON-LD structured data** (Person schema + WebSite schema) for Google Rich Results

### 2. `app/opengraph-image.tsx` — Dynamic OG Image
- Auto-generates a 1200×630 branded social preview card
- Shows on every Google, Twitter, LinkedIn share automatically

### 3. `app/sitemap.ts` — Dynamic XML Sitemap
- Auto-generates `/sitemap.xml` including all project detail pages
- Tells Google exactly what pages to crawl and their priority

### 4. `app/robots.ts` — Robots file
- Auto-generates `/robots.txt`
- Blocks `/api/` from indexing, allows everything else
- Points to sitemap

### 5. `next.config.js` — Performance & SEO
- Removed `output: 'standalone'` (Vercel doesn't need it, it caused issues)
- Added WebP/AVIF image formats for Core Web Vitals
- Added security headers (X-Frame-Options, XSS protection, etc.)
- Added www → non-www permanent redirect (canonical URL hygiene)
- Enabled compression

### 6. `vercel.json` — Vercel Deployment Config
- Configures build/dev/install commands explicitly
- Sets long-term cache headers for static assets
- Deploys to `iad1` (US East — closest to Michigan for speed)

### 7. Page-level Metadata (all layouts updated)
- `/projects` — project-specific keywords + canonical URL
- `/education` — degree + cert keywords + canonical URL
- `/contact` — hire-intent keywords + canonical URL
- `/publications` — paper + journal keywords + canonical URL
- `/projects/[id]` — dynamic per-project metadata with OG tags

### 8. `public/site.webmanifest` — PWA Manifest
- Enables "Add to Home Screen" on mobile
- Helps with Google's mobile-first indexing

---

## 🚀 Vercel Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: SEO optimization — structured data, sitemap, OG image, vercel config"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Framework: **Next.js** (auto-detected)
3. Root directory: `portfolio-next` (if your repo has a subfolder)
4. Click **Deploy**

### Step 3: Add Your .tech Domain
1. In Vercel → Project Settings → **Domains**
2. Add `darshanjoshi.tech` and `www.darshanjoshi.tech`
3. Vercel shows you DNS records — go to your .tech registrar and add:
   - `A record` → `76.76.19.19` (Vercel's IP)
   - `CNAME www` → `cname.vercel-dns.com`
4. Wait 10-60 min for DNS propagation

### Step 4: Verify in Google Search Console (critical!)
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://darshanjoshi.tech`
3. Verify via HTML tag method:
   - Copy the `content` value from the meta tag Google gives you
   - In `app/layout.tsx`, uncomment this line and paste your token:
     ```ts
     verification: { google: 'YOUR_TOKEN_HERE' },
     ```
4. After verifying, click **Request Indexing** on your homepage URL
5. Submit sitemap: In Search Console → Sitemaps → add `https://darshanjoshi.tech/sitemap.xml`

### Step 5: Add OG Image icons (required for full SEO)
You need these image files in `public/`:
- `og-image.jpg` — 1200×630px (fallback OG image, can be a screenshot of your site)
- `icon-192.png` — 192×192 app icon
- `icon-512.png` — 512×512 app icon
- `apple-touch-icon.png` — 180×180 iOS icon
- `favicon.ico` — already exists ✅

For quick generation, use your `photo.jpg` or take a screenshot of your deployed site and resize it.

---

## 📊 Expected Timeline to Rank

| Timeframe | What happens |
|-----------|-------------|
| Day 1–3 | Google discovers your site via Search Console submission |
| Week 1–2 | Pages get indexed (check Search Console → Coverage) |
| Week 2–4 | Starts ranking for "Darshan Joshi" exact name searches |
| Month 1–3 | Ranks for long-tail: "Darshan Joshi AI Engineer", "Darshan Joshi YOLOv8" |
| Month 3+ | Competes for broader terms if you get backlinks |

> **Fastest wins**: Submit to Google Search Console on Day 1, and make sure your LinkedIn & GitHub profiles link to `darshanjoshi.tech`. Backlinks from trusted domains are the #1 ranking signal.

---

## 💡 Extra Tips to Rank Higher

1. **LinkedIn**: Update your profile URL/description to include `darshanjoshi.tech`
2. **GitHub profile README**: Add a link to your portfolio
3. **Publications**: If IJARESM/IJSRST have author pages, add your site URL there
4. **Google Scholar**: Create a profile at scholar.google.com linking your papers
5. **Core Web Vitals**: Run your deployed site through [pagespeed.web.dev](https://pagespeed.web.dev) — aim for 90+ on all metrics. The 3D scenes may slow things down on mobile; consider lazy-loading them more aggressively.
