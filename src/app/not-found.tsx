import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="label">404</p>
      <h1 className="mt-4 text-5xl font-semibold sm:text-6xl">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-xl text-ink-2">It may have moved when I simplified the site. These will get you back on track.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-ink px-5 py-3 font-semibold text-bg hover:bg-berry-strong">Home</Link>
        <Link href="/work" className="rounded-full border border-line-strong px-5 py-3 font-semibold hover:border-ink">See my work</Link>
      </div>
    </section>
  );
}
