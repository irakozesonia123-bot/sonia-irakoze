import Link from "next/link";
import { profile } from "@/content/profile";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-2 sm:px-8">
        <p className="flex items-center gap-2"><Logo className="h-5 w-5" /> © 2026 {profile.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a className="ulink" href={`mailto:${profile.email}`}>Email</a></li>
          <li><a className="ulink" href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a className="ulink" href={profile.links.github} target="_blank" rel="noopener">GitHub</a></li>
          <li><a className="ulink" href={profile.links.resume} target="_blank" rel="noopener">Resume (PDF)</a></li>
          <li><Link className="ulink" href="/about">About</Link></li>
        </ul>
      </div>
    </footer>
  );
}
