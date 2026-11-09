"use client";

import Image from "next/image";
import { useRef } from "react";
import { Maximize2, X } from "lucide-react";

/** An image that opens full size in a dialog, so drawings and screenshots can be inspected. */
export function ZoomImage({ src, alt, sizes, aspect, fit, pos, priority, contain }: {
  src: string; alt: string; sizes: string; aspect: string; fit: string; pos?: string; priority?: boolean; contain?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={`group relative block w-full ${aspect} cursor-zoom-in overflow-hidden rounded-xl ${contain ? "bg-surface-2" : ""}`}
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`${fit} transition-transform duration-500 group-hover:scale-[1.015] ${contain ? "p-2" : ""}`} style={{ objectPosition: pos }} />
        <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-ink shadow-sm" aria-hidden>
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label={alt}
        className="m-auto h-[min(88vh,1000px)] w-[min(94vw,1400px)] max-w-none overflow-hidden rounded-2xl bg-surface p-0 text-ink backdrop:bg-black/70"
      >
        <div className="relative h-full w-full">
          <Image src={src} alt={alt} fill sizes="94vw" className="object-contain p-3" />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink text-bg"
            aria-label="Close image"
            autoFocus
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </dialog>
    </>
  );
}
