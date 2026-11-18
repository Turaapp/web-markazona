import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

/** Stroke icons (24×24, 2 px, round) — BRAND.md icon style: no caps, books or school buildings. */
const paths: Record<IconName, string> = {
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z",
  users: "M9 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M16 4.1a4 4 0 0 1 0 7.8M22 21c0-3-1.8-5.6-4.5-6.6",
  calendar: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18",
  check: "m9 11 3 3 8-8M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  wallet: "M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5M17 14h.01",
  globe: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  arrow: "M5 12h14M13 6l6 6-6 6",
  tick: "m5 12 5 5L20 7",
  cross: "M6 6l12 12M18 6 6 18",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4",
  receipt: "M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21zM9 8h6M9 12h6M9 16h3",
  message: "M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z",
  languages: "M4 5h8M8 3v2M6 5c0 4 2.5 7 6 8M10 5c-.5 3-2.5 6.5-6 8M13 21l4-9 4 9M14.5 18h5",
  building: "M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5",
  board: "M3 4h18M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4M12 16v5M8 21h8",
  heart: "M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z",
  user: "M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",
  layers: "m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  chart: "M3 3v18h18M7 15l4-4 3 3 6-7",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 3v4M21 5h-4",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
};

export function Icon({ name, size = 22, className, strokeWidth = 2 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(name === "arrow" && "rtl:-scale-x-100", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
