import { CopyEmail } from "../copy-email";

/**
 * The main contact action: a mailto link with a small floral envelope. On hover or focus the
 * flap opens and a letter rises. It only opens the visitor's own email app; nothing is sent.
 */
export function EnvelopeLink({ email }: { email: string }) {
  return (
    <div>
      <a
        href={`mailto:${email}`}
        className="envelope group inline-flex items-center gap-5 rounded-[1.75rem] bg-surface py-4 pl-5 pr-7 shadow-[0_18px_40px_-26px_rgb(60_20_60/0.5)] ring-1 ring-line transition-colors hover:ring-berry focus-visible:ring-berry"
      >
        <svg viewBox="0 0 84 64" className="h-16 w-[5.25rem] flex-none overflow-visible" aria-hidden>
          <rect x="2" y="14" width="80" height="48" rx="6" fill="var(--rose-soft)" stroke="var(--rose)" strokeWidth="1.5" />
          <path className="env-flap" d="M2 20 L42 46 L82 20 L82 18 Q82 14 78 14 L6 14 Q2 14 2 18Z" fill="var(--lav)" stroke="var(--rose)" strokeWidth="1.5" strokeLinejoin="round" />
          <g className="env-letter">
            <rect x="14" y="16" width="56" height="36" rx="3" fill="var(--surface)" stroke="var(--line-strong)" />
            <path d="M22 26 H52 M22 32 H60 M22 38 H46" stroke="var(--line-strong)" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(60 42) scale(0.45)" fill="var(--rose)">
              {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-6" rx="4.5" ry="6.5" transform={`rotate(${r})`} />)}
              <circle r="3" fill="#e2ad45" />
            </g>
          </g>
          <path d="M2 60 L34 36 M82 60 L50 36" stroke="var(--rose)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 58 Q2 62 6 62 L78 62 Q82 62 82 58 L82 22 L42 48 L2 22Z" fill="var(--rose-soft)" stroke="var(--rose)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span>
          <span className="block font-display text-[1.6rem] font-semibold leading-tight text-ink group-hover:text-berry">Send me a hello</span>
          <span className="mt-0.5 block text-[0.95rem] text-ink-2">Opens your email app</span>
        </span>
      </a>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="select-all break-all font-mono text-[0.95rem] text-ink">{email}</span>
        <CopyEmail email={email} compact />
      </div>
    </div>
  );
}
