import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="station">STA 404+00 · Off alignment</p>
      <h1 className="mt-4 text-5xl font-extrabold sm:text-6xl">This station isn’t on the survey.</h1>
      <p className="mt-4 max-w-xl text-ink-2">The page you’re looking for doesn’t exist or has moved. The route back is below.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-xl bg-ink px-5 py-3 font-semibold text-bg hover:bg-lake">Back to the start</Link>
        <Link href="/#projects" className="rounded-xl border border-line-strong px-5 py-3 font-semibold hover:border-ink">See projects</Link>
      </div>
    </section>
  );
}
