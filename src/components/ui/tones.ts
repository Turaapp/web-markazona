import type { Tone } from "@/types/content";

/** Tone → Tailwind classes, matching the design system's colour pairs. */
export const toneTile: Record<Tone, string> = {
  primary: "bg-brand-50 text-brand-500",
  teal: "bg-teal-50 text-teal-700",
  info: "bg-info-50 text-info-700",
  saffron: "bg-saffron-50 text-saffron-800",
  gray: "bg-chip-gray text-ink-2",
  error: "bg-error-50 text-error-700",
  ink: "bg-ink text-white",
};

export const toneChip: Record<Tone, string> = {
  primary: "bg-brand-50 text-brand-700",
  teal: "bg-teal-50 text-teal-700",
  info: "bg-info-50 text-info-700",
  saffron: "bg-saffron-50 text-saffron-800",
  gray: "bg-chip-gray text-ink-2",
  error: "bg-error-50 text-error-700",
  ink: "bg-ink text-white",
};

export const toneText: Record<Tone, string> = {
  primary: "text-brand-700",
  teal: "text-teal-700",
  info: "text-info-700",
  saffron: "text-saffron-800",
  gray: "text-ink-2",
  error: "text-error-700",
  ink: "text-ink",
};

/** Solid accent colour (CSS variable) — for inline styles. */
export const toneHex: Record<Tone, string> = {
  primary: "var(--color-brand-500)",
  teal: "var(--color-teal-500)",
  info: "var(--color-info-500)",
  saffron: "var(--color-saffron-500)",
  gray: "var(--color-muted)",
  error: "var(--color-error-700)",
  ink: "var(--color-navy)",
};
