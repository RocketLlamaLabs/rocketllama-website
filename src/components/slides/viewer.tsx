"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  Maximize,
  Minimize,
  X,
} from "lucide-react";

type Slide = { title: string; src: string };

// A full-page slide viewer. The Slides button in the bottom left opens the
// slide list; arrow keys, a click on either side of the slide, or a swipe
// move through the deck. The slide number is kept in the URL hash (#3).
export function SlideViewer({
  name,
  slides,
  downloadHref,
  versions,
  currentVersion,
}: {
  name: string;
  slides: Slide[];
  downloadHref: string;
  versions: { id: string; href: string }[];
  currentVersion: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const last = slides.length - 1;

  const go = useCallback(
    (to: number) => {
      const next = Math.min(last, Math.max(0, to));
      setIndex(next);
      window.history.replaceState(null, "", `#${next + 1}`);
    },
    [last]
  );

  // Start on the slide named in the hash, and follow it if it changes.
  useEffect(() => {
    const read = () => {
      const n = Number.parseInt(window.location.hash.slice(1), 10);
      if (Number.isFinite(n)) setIndex(Math.min(last, Math.max(0, n - 1)));
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [last]);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(last);
          break;
        case "Escape":
          setOpen(false);
          break;
        case "f":
        case "F":
          toggleFull();
          break;
        case "g":
        case "G":
          setOpen((o) => !o);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, last, toggleFull]);

  const slide = slides[index];
  const control =
    "inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/15 disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div
      ref={root}
      className="fixed inset-0 flex flex-col bg-[#031a40] text-white select-none"
    >
      <h1 className="sr-only">{name}</h1>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-4"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={slide.src}
          src={slide.src}
          alt={`Slide ${index + 1}: ${slide.title}`}
          width={1920}
          height={1080}
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize disabled:cursor-default"
        />
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          disabled={index === last}
          className="absolute inset-y-0 right-0 w-2/3 cursor-e-resize disabled:cursor-default"
        />
        {/* Warm the next slide so the change is instant. */}
        {index < last ? (
          <link rel="preload" as="image" href={slides[index + 1].src} />
        ) : null}
      </div>

      {open ? (
        <div className="absolute inset-0 z-10 flex flex-col bg-[#031a40]/97">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="font-display text-lg font-bold">{name}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close slide list"
              className={control}
            >
              <X className="size-5" />
            </button>
          </div>
          <ol className="grid flex-1 grid-cols-2 content-start gap-4 overflow-y-auto px-4 pb-24 sm:grid-cols-3 sm:px-6 lg:grid-cols-4">
            {slides.map((s, i) => (
              <li key={s.src}>
                <button
                  type="button"
                  onClick={() => {
                    go(i);
                    setOpen(false);
                  }}
                  aria-current={i === index ? "true" : undefined}
                  className={`block w-full overflow-hidden rounded-md text-left outline-offset-2 ${
                    i === index ? "outline-2 outline-blue" : "hover:outline-2 hover:outline-white/60"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt=""
                    width={1920}
                    height={1080}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                  <span className="flex gap-2 bg-white/10 px-3 py-2 text-sm">
                    <span className="font-semibold">{i + 1}</span>
                    <span className="truncate text-mist">{s.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {/* Its own strip under the slide, so it never covers the slide's footer. */}
      <div className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex items-center gap-1 rounded-lg bg-navy/90 p-1 shadow-md ring-1 ring-white/15">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-4 font-semibold text-white hover:bg-action-hover"
          >
            <LayoutGrid className="size-5" />
            Slides
          </button>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className={control}
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="min-w-14 text-center text-sm font-semibold tabular-nums" aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === last}
            aria-label="Next slide"
            className={control}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-navy/90 p-1 shadow-md ring-1 ring-white/15">
          {versions.length > 1 ? (
            <label className="flex items-center gap-2 pl-3 text-sm font-semibold">
              <span className="sr-only sm:not-sr-only">Version</span>
              <select
                value={currentVersion}
                onChange={(e) => {
                  const v = versions.find((x) => x.id === e.target.value);
                  if (v) window.location.href = v.href;
                }}
                className="min-h-11 rounded-md bg-transparent px-2 font-semibold text-white"
              >
                {versions.map((v) => (
                  <option key={v.id} value={v.id} className="text-navy">
                    {v.id}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <a
            href={downloadHref}
            download
            aria-label="Download the PowerPoint file"
            className={`${control} max-sm:hidden`}
          >
            <Download className="size-5" />
          </a>
          <button
            type="button"
            onClick={toggleFull}
            aria-label={full ? "Leave full screen" : "Full screen"}
            className={control}
          >
            {full ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
