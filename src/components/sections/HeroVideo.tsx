"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  poster: string;
  posterAlt: string;
  teaser: string;
  full: string;
  locale: "fr" | "ar" | "en";
  labels: {
    label: string;
    play: string;
    playMeta: string;
    fallback: string;
    download: string;
    error: string;
    retry: string;
    captions: { ary: string; fr: string; en: string };
  };
};

/**
 * Hero explainer player (markazona-explainers/README.md). Each language has its
 * own edit, so the page passes that language's poster, teaser and full video:
 * - fixed 16:9 box (no layout shift), poster is a real <img> (LCP, high priority);
 * - muted looping teaser starts 1.2 s after mount, never with reduced motion;
 * - the play button swaps in the full video with native controls and starts it;
 * - captions are on by default in the page language (the master has music only);
 * - if the full video fails to load, a message with a retry button replaces it.
 */
export function HeroVideo({ poster, posterAlt, teaser, full, locale, labels }: Props) {
  const [teaserOn, setTeaserOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [teaserFailed, setTeaserFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setTeaserOn(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (playing && !failed) videoRef.current?.play().catch(() => {});
  }, [playing, failed, attempt]);

  const retry = () => {
    setFailed(false);
    setAttempt((n) => n + 1);
  };

  const defaultTrack = locale === "ar" ? "ary" : locale;
  const tracks = [
    { lang: "ary", srcLang: "ar", label: labels.captions.ary },
    { lang: "fr", srcLang: "fr", label: labels.captions.fr },
    { lang: "en", srcLang: "en", label: labels.captions.en },
  ] as const;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-navy">
      {/* eslint-disable-next-line @next/next/no-img-element -- poster must be a plain, high-priority LCP image */}
      <img src={poster} alt={posterAlt} width={1920} height={1080} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />

      {!playing && teaserOn && !teaserFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={teaser}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setTeaserFailed(true)}
        />
      )}

      {playing && failed ? (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy/85 p-6 text-center text-white backdrop-blur-sm">
          <p className="max-w-[420px] text-[15px] font-semibold">{labels.error}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={retry} className="rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-navy transition-colors hover:bg-brand-50">
              {labels.retry}
            </button>
            <a href={full} download className="text-sm font-bold text-white/80 underline underline-offset-4 hover:text-white">
              {labels.download}
            </a>
          </div>
        </div>
      ) : playing ? (
        <video
          key={attempt}
          ref={videoRef}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full bg-navy"
          src={full}
          poster={poster}
          controls
          playsInline
          preload="auto"
          aria-label={labels.label}
          crossOrigin="anonymous"
        >
          {tracks.map((tr) => (
            <track key={tr.lang} kind="subtitles" src={`/videos/markazona-explainer.${tr.lang}.vtt`} srcLang={tr.srcLang} label={tr.label} default={tr.lang === defaultTrack} />
          ))}
          <p>
            {labels.fallback}{" "}
            <a href={full} download>
              {labels.download}
            </a>
          </p>
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${labels.play} — ${labels.playMeta}`}
          className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-navy/70 via-navy/10 to-transparent p-5 text-start sm:items-center sm:justify-center sm:p-0"
        >
          <span className="flex items-center gap-4 rounded-full bg-white/95 py-2 ps-2 pe-6 shadow-float backdrop-blur transition-transform duration-500 group-hover:scale-[1.03]">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-500 text-white sm:size-14">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ms-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="flex flex-col">
              <b className="text-[15px] font-extrabold text-ink">{labels.play}</b>
              <small className={cn("text-xs font-semibold text-muted")}>{labels.playMeta}</small>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
