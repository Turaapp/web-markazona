import { cn } from "@/lib/utils";

/*
 * Brand motifs from the Markazona identity (Claude Design › Brand):
 * - the "markaz": concentric rings around the saffron point — the hub
 *   everything in a centre connects to (as on the social preview);
 * - the arch: the two arches of the M, the doorway of a centre.
 * Used sparingly as background decoration; never as a replacement for the logo.
 */

/** Concentric rings converging on the saffron point. */
export function Orbit({ className, rings = 3, dot = true }: { className?: string; rings?: number; dot?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true" focusable="false">
      {Array.from({ length: rings }, (_, i) => (
        <circle key={i} cx="100" cy="100" r={96 - i * (80 / rings)} stroke="currentColor" strokeWidth="1" />
      ))}
      {dot && <circle cx="100" cy="100" r="9" fill="var(--color-saffron-500)" />}
    </svg>
  );
}

/** The M's two arches as an outline (same geometry as the symbol, 64-unit grid). */
export function Arches({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="8 12 48 42" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M15 47V25.5a8.5 8.5 0 0 1 14.6-5.9L32 22.2l2.4-2.6A8.5 8.5 0 0 1 49 25.5V47"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Faint repeating arch texture for dark surfaces. */
export function ArchPattern({ className, id = "arches", opacity = 0.07 }: { className?: string; id?: string; opacity?: number }) {
  return (
    <svg className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M14 54V36a10 10 0 0 1 17-7l1 1 1-1a10 10 0 0 1 17 7v18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
