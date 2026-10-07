/**
 * Content index. Edit the files this re-exports:
 *   profile.ts      — name, positioning, links, nav, education, skills
 *   projects.ts     — every project and its case study (tier: flagship / supporting / archive)
 *   experience.ts   — jobs, leadership roles, recommendations
 *   field-notes.ts  — conferences, speaking, programs, and recognition
 *   record.ts       — features/published work, map places, turning points, interests
 *
 * Set `visibility: "hidden"` to keep an item off the site until it's verified.
 * `needs` arrays list missing evidence; see docs/CONTENT_NEEDED.md.
 */
export * from "./profile";
export * from "./projects";
export * from "./experience";
export * from "./field-notes";
export * from "./record";
