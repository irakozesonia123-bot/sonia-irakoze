# Photos and evidence to add

The site has **photo slots**: dashed pink boxes that show where a photo, screenshot, or
certificate belongs. They appear on local and Vercel preview builds only. Production never
shows an empty slot; it shows a clean text layout instead.

**To fill a slot:** save the image at the exact path printed inside the box (under `public/`),
as a JPG about 1600 px wide (PNG for charts and screenshots). Rebuild, and the slot becomes the
real image with its caption. To change a caption, edit the matching entry in `src/content/`.

Do not add confidential CDOT or AGR material, internal data, or photos of workshop participants
(especially minors) without their consent.

## Priority order

### 1. Aero Design (homepage feature)
1. `public/images/aero/wing-cad.jpg` – best Siemens NX screenshot of the wing or airframe (cover image on the homepage)
2. `public/images/aero/fea-comparison.jpg` – FEA stress/deflection plot comparing two options
3. `public/images/aero/prototype.jpg` – laser-cut parts or prototype you built, ideally with you in frame
4. `public/images/aero/team-build.jpg` – team build or test-day photo
Also: the aircraft's name and competition year.

### 2. CDOT Compass
1. `public/images/compass/innovation-award.jpg` – award certificate, announcement slide, or ceremony photo
2. `public/images/compass/survey-summary.png` – aggregate survey chart (no names or emails)

### 3. MarketBite
1. `public/images/marketbite/pitch.jpg` – you presenting, or the team on stage
2. `public/images/marketbite/my-slides.jpg` – your slide 2 (problem) and slide 6 (market) side by side
3. `public/images/marketbite/award.jpg` – award photo, certificate, or winners-page screenshot

### 4. SAquaSolve Rwanda
1. `public/images/saquasolve/founding-assembly.jpg` – founding general assembly, 20 Aug 2026
2. `public/images/saquasolve/youth-ambassadors.jpg` – the four Youth Ambassadors (with consent)
3. A Lake Mirayi fieldwork photo that includes you. Send it to me and I'll place it, or replace `public/images/sq-lake-mirayi.jpg`.

### 5. Other projects
- `public/images/cubesat/frame-cad.jpg`, `public/images/cubesat/simulation.jpg`
- `public/images/truss/model.jpg`, `public/images/truss/comparison.jpg`
- `public/images/cdot/floyd-hill.jpg` (public site only)
- `public/images/unibooth/pitch.jpg`
- `public/images/bowl-voyage/gameplay.jpg`
- `public/images/techgirls-cap/workshop.jpg`, `public/images/techgirls-cap/certificate.jpg`

### 6. About page
- `public/images/about/rwanda.jpg` – you in Gashora, at Lake Mirayi, or in Kigali
- `public/images/events/next-event-1.jpg`, `next-event-2.jpg` – new conferences or talks. Then fill in
  the title, place, date, role, and note for `slot-event-1` / `slot-event-2` in `src/content/about.ts`
  and set `visibility: "public"`.
- `public/images/awards/next-award.jpg` – another certificate (entry `slot-award` in the same file)
- Optional: `public/images/about/rowing.jpg`, `karate.jpg`, `painting.jpg`

## Swapping the homepage mechanical project
`featuredSlugs` in `src/content/projects.ts`. Replace `"aero-design"` with `"timber-truss-bridge"`
or `"cubesat-structures"` if one of those ends up with stronger visuals.
