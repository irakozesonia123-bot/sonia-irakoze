import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { JourneyMap } from "@/components/journey-map";
import { places, turningPoints } from "@/content/record";

export const metadata: Metadata = {
  title: "Journey",
  description: "The road from Gashora, Rwanda, to Rochester and Colorado: the turning points in Sonia Irakoze’s path and what each one led to, with an interactive map.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHeader
        sheet="S-05"
        kicker="Journey"
        title="The road here"
        intro="Opportunities compound. A job shadow became an internship; a school by a lake became a water project. This page traces the turning points and what each one led to. The map below is optional, for anyone who wants to wander."
        meta={[
          { label: "Start", value: "Kigali" },
          { label: "Now", value: "Rochester" },
          { label: "Turning points", value: String(turningPoints.length) },
          { label: "Stops on map", value: String(places.length) },
        ]}
      />

      <Section id="turning-points" station="05+10" kicker="Turning points" title="Doors that opened">
        <ol className="relative">
          <span aria-hidden className="absolute bottom-6 left-[0.55rem] top-2 w-[3px] rounded bg-[repeating-linear-gradient(to_bottom,var(--line-strong)_0_10px,transparent_10px_18px)] md:left-[7.15rem]" />
          {turningPoints.map((t, i) => (
            <li key={t.id} className="relative grid grid-cols-[1.4rem_minmax(0,1fr)] gap-4 pb-10 last:pb-0 md:grid-cols-[6rem_2.3rem_minmax(0,1fr)] md:gap-3">
              <p className="hidden pt-1 text-right font-mono text-xs text-ink-3 md:block">STA {i}+00<br />{t.year}</p>
              <span aria-hidden className="relative flex justify-center pt-1.5"><span className="h-3.5 w-3.5 rotate-45 border-2 border-survey bg-bg shadow-[0_0_0_4px_var(--bg)]" /></span>
              <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
                <div>
                  <p className="font-mono text-xs text-ink-3"><span className="md:hidden">{t.year} · </span>{t.place}</p>
                  <h3 className="mt-0.5 text-xl font-bold leading-snug">{t.moment}</h3>
                  <p className="mt-1 text-ink-2">{t.detail}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface px-4 py-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-survey-ink">Led to →</p>
                  <p className="mt-1">{t.led}</p>
                  {t.placeId && <a href={`/journey?place=${t.placeId}#map`} className="mt-2 inline-block font-mono text-xs text-ink-3 underline underline-offset-2 hover:text-ink">See on the map</a>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="map" station="05+20" kicker="Explore" title="Explore my map" intro="Pick a stop to see what happened there. Real coordinates, schematic positions.">
        <JourneyMap places={places} />
      </Section>
    </>
  );
}
