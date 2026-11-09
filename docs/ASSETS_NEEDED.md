# Photos, artwork, and details to add

**How slots work.** Every image below has a fixed path. Until the file exists:
- **Live site (production):** nothing empty is ever shown. A project falls back to a clean text
  cover, a personal tile falls back to a small flower or feather illustration, and an award or
  event shows its text only.
- **Local and Vercel preview builds only:** a dashed pink "Photo slot" box shows where the image
  will go, with its path. Preview links need a Vercel login, so they are not public.

**To fill a slot**, save the image at the exact path (under `public/`), as a JPG about 1600 px wide
(PNG for charts and screenshots), then rebuild. Captions and alt text live in `src/content/`.
Never add confidential CDOT/AGR material, internal data, or identifiable photos of workshop
participants (especially minors) without consent.

Hypothetical slots (an unnamed future award and two unnamed future events) were removed on
9 Nov 2026. To add a new award or event, add a normal entry in `src/content/about.ts`.

## Checklist (deduplicated, in priority order)

| # | Project / event | Image needed | Placement | Path (`public/…`) | Existing alternatives | Optional? |
|---|---|---|---|---|---|---|
| 1 | Aero Design | Best Siemens NX screenshot of the wing or airframe | Homepage project card + case-study cover | `/images/aero/wing-cad.jpg` | None on file | No: homepage feature |
| 2 | CDOT Compass | Innovations Challenge award certificate, slide, or ceremony photo | Compass › Recognition; About › Recognition thumbnail | `/images/compass/innovation-award.jpg` | `cdot-compass-idea-card.jpg` is already shown beside it | No |
| 3 | MarketBite / Heist | You presenting, or the team on stage | MarketBite › Pitch and award; About › Events (Heist) | `/images/marketbite/pitch.jpg` | None on file | No |
| 4 | SAquaSolve | Founding general assembly group photo (20 Aug 2026), no ID documents visible | SAquaSolve › Building the organization | `/images/saquasolve/founding-assembly.jpg` | None on file | No |
| 5 | MarketBite / Heist | Award photo, certificate, or winners-page screenshot | MarketBite › Pitch and award; About › Recognition thumbnail | `/images/marketbite/award.jpg` | A screenshot of the Ain Center Heist page would work | No |
| 6 | Aero Design | FEA stress/deflection plot comparing two options | Aero › The challenge | `/images/aero/fea-comparison.jpg` | None on file | No |
| 7 | Aero Design | Laser-cut parts or prototype, ideally your hands or you in frame | Aero › What I do | `/images/aero/prototype.jpg` | None on file | No |
| 8 | Beyond › Art | A painting, shot straight on in daylight (+ title, year, medium) | Beyond › Painting and design (art stack) | `/images/beyond/painting-1.jpg` | Blake Quarterly cover is already in the stack | No: the stack has one item until this arrives |
| 9 | CDOT Compass | Aggregate survey chart (no names or emails) | Compass › The problem | `/images/compass/survey-summary.png` | None on file | Yes |
| 10 | Places › Kigali | A photo of you in Kigali | About › Places that shaped me (Kigali) | `/images/places/kigali.jpg` | The founding-assembly photo (#4) could double here if taken in Kigali | Yes |
| 11 | Beyond › Rowing | On the water, the boathouse, or with your crew | Beyond › Movement and music | `/images/beyond/rowing.jpg` | None on file | Yes (illustration shows meanwhile) |
| 12 | Beyond › Karate | Training, a kata, or your belt | Beyond › Movement and music | `/images/beyond/karate.jpg` | None on file | Yes (illustration shows meanwhile) |
| 13 | Beyond › Singing | Choir photo, with the choir's permission | Beyond › Movement and music | `/images/beyond/choir.jpg` | None on file | Yes (illustration shows meanwhile) |
| 14 | SAquaSolve | The four Youth Ambassadors, only with their and the school's consent | SAquaSolve › Two days of community workshops | `/images/saquasolve/youth-ambassadors.jpg` | Two workshop photos already shown | Yes |
| 15 | MarketBite | Your slide 2 (problem) and slide 6 (market), side by side | MarketBite › Pitch and award | `/images/marketbite/my-slides.jpg` | None on file | Yes |
| 16 | Beyond › Art | A second painting or sketch | Beyond › art stack | `/images/beyond/painting-2.jpg` | None on file | Yes |
| 17 | Timber truss | Dr.Frame screenshot of the final truss (forces or deflected shape) | Truss case-study cover | `/images/truss/model.jpg` | None on file | Yes |
| 18 | Timber truss | The three designs side by side, or a weight/deflection table | Truss › Approach. With two same-size images this can become a before/after slider | `/images/truss/comparison.jpg` | None on file | Yes |
| 19 | CubeSat | CAD screenshot of the frame parts you modeled | CubeSat case study | `/images/cubesat/frame-cad.jpg` | None on file | Yes |
| 20 | CubeSat | Vibration or thermal plot from your MATLAB work | CubeSat case study | `/images/cubesat/simulation.jpg` | None on file | Yes |
| 21 | Aero Design | Team build or test-day photo | Aero › Build and test | `/images/aero/team-build.jpg` | None on file | Yes |
| 22 | UniBooth | Pitch-night photo or booth mockup | UniBooth › The opportunity | `/images/unibooth/pitch.jpg` | `unibooth-mark.jpg` (logo) is the cover | Yes |
| 23 | CDOT bridge work | A public-site photo at Floyd Hill (nothing confidential) | CDOT bridge asset management case study | `/images/cdot/floyd-hill.jpg` | `cdot-field-site.jpg` is already used | Yes |
| 24 | TechGirls CAP | A photo from the 2023 community workshops | TechGirls Community Action Project | `/images/techgirls-cap/workshop.jpg` | None found (the 2023 LinkedIn "journey" photos are from Virginia Tech, not the workshops) | Yes |
| 25 | TechGirls CAP | CAP certificate scan | TechGirls Community Action Project | `/images/techgirls-cap/certificate.jpg` | `cert-techgirls-2023.jpg` is the exchange certificate, not the CAP one | Yes |
| 26 | Bowl Voyage | Gameplay screenshot | Bowl Voyage | `/images/bowl-voyage/gameplay.jpg` | None on file | Yes |

**Unused certificates already on file** (in `sonia-portfolio/assets-originals/certificates/`):
Institution of Engineers Rwanda essay recognition (2023), Maxwell iChoose leadership (2023),
Gashora Gavel Club "Miss Creativity" (2022), Kigali Public Library coding and robotics (2019),
FAWE STEM mentoring camp (2019), and the TechGirls Alumnae Advisory Council certificate (2024). Say
which ones you want on About › Recognition and I'll add them.

## Personal details only you can supply

- Books you'd like listed under Reading (title, author, optional one-line note). Hidden until filled.
- Titles, years, and media for the paintings in #8 and #16.
- Rowing and karate: are these current? The text avoids saying you still do them.
- The eagle reflection on Beyond › Faith is drafted from your keywords; edit it in `src/content/beyond.ts`.
- Whether Isaiah 40:31 should be NIV (current) or another translation, and whether to add the Kinyarwanda verse.
- Any edits to "A day in my world" (`src/content/beyond.ts` › `day`).
- Aero Design: the aircraft name and competition, only once confirmed from team material.
- A permitted track or playlist, if you want the optional music feature later.

## Swapping the homepage mechanical project
`featuredSlugs` in `src/content/projects.ts`. Replace `"aero-design"` with `"timber-truss-bridge"`
or `"cubesat-structures"` if one of those ends up with stronger visuals.
