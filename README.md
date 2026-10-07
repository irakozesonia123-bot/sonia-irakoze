# Sonia Irakoze — portfolio

Personal site for Sonia Irakoze, mechanical engineering student at the University of Rochester who also builds software.

**Stack:** Next.js 16 (App Router, React Server Components, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
npm run lint
```

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata, Open Graph, sitemap, and JSON-LD. Defaults to `https://sonia-irakoze.vercel.app`. |

Copy `.env.example` to `.env.local` for local overrides. No secrets are used.

## Editing content (no component changes needed)

Everything lives in **`src/content/portfolio.ts`**. Search for `[ADD` to find placeholders.

| To change | Edit in `portfolio.ts` |
|---|---|
| Name, headline, intro, status, email, social links | `profile` |
| Bio and interests, About photo | `about` |
| Jobs and internships | `experience` |
| Projects and case-study pages (`/projects/[slug]`) | `projects` |
| Schools, coursework | `education` |
| Awards | `awards` |
| Leadership & volunteering | `leadership` |
| Skills | `skills` |
| Journey timeline | `journey` |
| Recommendations | `recommendations` |
| Navigation order | `nav` |

- **Photos:** add files to `public/images/` and reference them as `/images/your-file.jpg`.
- **Resume:** replace `public/resume/Sonia_Irakoze_Resume.pdf` (keep the filename, or update `profile.links.resume`).
- **Types** for all content are in `src/content/types.ts`.

## Structure

```
src/
  app/                 layout, home page, /projects/[slug], 404, sitemap, robots, OG image, icon
  components/          header + mobile menu, ⌘K palette, sections, project grid, experience list
  content/             portfolio.ts (all copy) and types.ts
public/images, public/resume
```

## Design notes

Visual motif: a survey alignment. Section labels are stations (`STA 03+00`), the hero has a topographic contour field, and the Journey section is drawn as a road centerline with control points. Light and dark themes, reduced-motion support, and a ⌘K / Ctrl K quick-jump palette.

## Deploy

Pushed to GitHub and connected to Vercel; every push to `main` deploys production. Manual deploy: `npx vercel --prod`.
