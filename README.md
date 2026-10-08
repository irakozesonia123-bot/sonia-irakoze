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

All copy lives in **`src/content/`**. Types are in `types.ts`.

| To change | File → export |
|---|---|
| Name, headline, positioning, "Now", links, navigation | `profile.ts` → `profile`, `nav` |
| Education, skills | `profile.ts` → `education`, `skills` |
| Projects and their case studies (`/work/[slug]`) | `projects.ts` → `projects` |
| Jobs and internships | `experience.ts` → `experience` |
| Leadership (with level: Elected / Appointed / Selected / …) | `experience.ts` → `leadership` |
| Recommendations (attach to a job with `experienceId`) | `experience.ts` → `recommendations` |
| Conferences, talks, programs | `field-notes.ts` → `fieldNotes` |
| Grants, scholarships, awards | `field-notes.ts` → `recognition` |
| Features and published work | `record.ts` → `features` |
| Map stops and Journey turning points | `record.ts` → `places`, `turningPoints` (map positions in `components/journey-map.tsx`) |
| Personal interests | `record.ts` → `interests` |

**Tiers.** `tier: "flagship"` items lead /work and the homepage; `"supporting"` get cards; `"archive"` appear in the index and on /workbench.

**Case studies** are built from `story` blocks: `text`, `list`, `steps`, `stats`, `architecture`, `compare` (before/after images), `status` (done/underway/next/not-started), `gallery`, `quote`, `lesson`. Mix them per project.

**Evidence drawer.** Add `artifacts: [{ kind, label, href?, src?, note? }]` to a project.

**Unverified items.** Set `visibility: "hidden"` to keep something off the site. Missing evidence goes in `needs: [...]` and in `docs/CONTENT_NEEDED.md`; neither is ever rendered.

- **Photos:** add to `public/images/` and reference as `/images/name.jpg`.
- **Resume:** replace `public/resume/Sonia_Irakoze_Resume.pdf` (public copy has no phone number).

## Structure

```
src/
  app/                 home, /work, /work/[slug], /workbench, /experience, /journey, /field-notes,
                       /recognition, /on-the-record, /about, 404, sitemap, robots, OG image, icon
  components/          header + mobile menu, ⌘K palette, sections, project grid, experience list
  content/             portfolio.ts (all copy) and types.ts
public/images, public/resume
```

## Design notes

Visual motif: an engineering field book. Pages are drawing sheets (S-01…S-09), sections are survey stations (`STA 03+00`), the hero has a topographic contour field, the Journey is a road centerline with an optional schematic map, conferences are event passes, features are publication clippings, and the Workbench is a pinned drafting board. Light and dark themes, reduced-motion support, and a ⌘K / Ctrl K quick-jump palette.

## Deploy

Pushed to GitHub and connected to Vercel; every push to `main` deploys production. Manual deploy: `npx vercel --prod`.

## Promoting CubeSat or Aero Design to flagship
When CAD, FEA, and prototype images arrive: add them to `public/images/`, add `cover`, `gallery`, and `artifacts` to the project in `src/content/projects.ts`, then change its `tier` from `"supporting"` to `"flagship"`. It will automatically appear in Selected Work on the homepage and /work. Mechanical work also has its own band on the homepage.

## Accuracy
`docs/CLAIMS_AUDIT.md` traces every claim to its source and project. Keep it updated when facts change (for example, SAquaSolve's testing status).
