"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Theme = { id: string; name: string; description: string; defaultColor: string; url: string; label: string };

/**
 * Theme switch + "centre colour" swatches over server-rendered previews.
 * Only a CSS variable (--sp) changes: the previews derive every shade from it,
 * like the product does. Both previews stay in the HTML (only one is visible).
 */
export function ThemePlayground({
  themes,
  previews,
  colors,
  switchLabel,
  colorLabel,
}: {
  themes: Theme[];
  previews: React.ReactNode[];
  colors: { hex: string; label: string }[];
  switchLabel: string;
  colorLabel: string;
}) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState<string | null>(null);
  const current = themes[active];
  const sp = color ?? current.defaultColor;

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div role="radiogroup" aria-label={switchLabel} className="inline-flex rounded-2xl border border-line bg-white p-1.5 shadow-card">
          {themes.map((th, i) => (
            <button
              key={th.id}
              type="button"
              role="radio"
              aria-checked={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "flex h-11 items-center gap-2.5 rounded-xl px-5 text-sm font-bold transition-colors duration-300",
                i === active ? "bg-navy text-white" : "text-ink-2 hover:bg-surface hover:text-ink",
              )}
            >
              <span className={cn("size-3", th.id === "campus" ? "rounded-[4px]" : "rounded-full")} style={{ background: i === active ? sp : th.defaultColor }} />
              {th.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span id="theme-color-label" className="text-sm font-bold text-ink-2">
            {colorLabel}
          </span>
          <div role="radiogroup" aria-labelledby="theme-color-label" className="flex gap-2">
            {colors.map((c) => {
              const selected = sp.toLowerCase() === c.hex.toLowerCase();
              return (
                <button
                  key={c.hex}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={c.label}
                  title={c.label}
                  onClick={() => setColor(c.hex)}
                  className={cn(
                    "size-8 rounded-full ring-offset-2 transition-transform duration-200 hover:scale-110",
                    selected ? "ring-2 ring-ink" : "ring-1 ring-black/10",
                  )}
                  style={{ background: c.hex }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <figure className="m-0 mt-8">
        <div
          className="site-preview overflow-hidden rounded-[18px] border border-line bg-white shadow-mock"
          style={{ "--sp": sp } as CSSProperties}
        >
          <div className="flex h-10 items-center gap-2 border-b border-line-soft bg-surface-2 px-4">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            <span dir="ltr" className="mx-auto truncate rounded-md border border-line-soft bg-white px-3 py-0.5 font-sans text-[11px] text-faint">
              {current.url}
            </span>
            <span className="w-[52px]" />
          </div>
          {previews.map((preview, i) => (
            <div key={themes[i].id} hidden={i !== active} aria-hidden="true" className="animate-[rise_0.6s_var(--ease-out-expo)_both]">
              {preview}
            </div>
          ))}
        </div>
        <figcaption className="mt-5 flex items-start gap-3">
          <span className="mt-1.5 size-3 shrink-0 rounded-full" style={{ background: sp }} />
          <span>
            <span className="block text-lg font-extrabold">{current.name}</span>
            <span className="text-[15px] text-muted">{current.description}</span>
            <span className="sr-only">{current.label}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
