import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  /** fade-up (default), fade, scale, or slide in from the inline start. */
  variant?: "up" | "fade" | "scale" | "start";
  /** Delay in steps of 90 ms. */
  delay?: number;
  /** Reveal children one after another instead of the element itself. */
  stagger?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
} & Record<`aria-${string}` | `data-${string}`, string | undefined>;

/** Scroll-triggered reveal (CSS scroll-driven animation; no client JavaScript). */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, stagger, className, children, ...rest }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": delay } as CSSProperties) : undefined;
  const attrs = stagger ? { "data-stagger": "" } : { "data-reveal": variant === "up" ? "" : variant };
  return (
    <Tag className={className} style={style} {...attrs} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Headline that reveals word by word. Words are kept whole, so Arabic letter
 * joining is preserved. Pass `accent` to render part of the text in the serif accent.
 */
export function SplitWords({
  text,
  accent,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const parts: { word: string; accent: boolean }[] = [];
  const push = (chunk: string, isAccent: boolean) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => parts.push({ word, accent: isAccent }));

  if (accent && text.includes(accent)) {
    const [before, after] = text.split(accent);
    push(before, false);
    push(accent, true);
    push(after, false);
  } else {
    push(text, false);
  }

  return (
    <Tag id={id} className={className} data-reveal="words" style={delay ? ({ "--reveal-delay": delay } as CSSProperties) : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((p, i) => (
          <span key={i}>
            <span className="split-word">
              <span style={{ "--word": i } as CSSProperties} className={p.accent ? "headline-accent text-brand-500" : undefined}>
                {p.word}
              </span>
            </span>{" "}
          </span>
        ))}
      </span>
    </Tag>
  );
}
