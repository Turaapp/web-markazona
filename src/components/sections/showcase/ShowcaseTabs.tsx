"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; icon: React.ReactNode };

const AUTOPLAY_MS = 7000;

/**
 * Accessible tabs (WAI-ARIA tabs pattern, ←/→/Home/End) for the product tour.
 * Panels are server-rendered and all present in the HTML (indexable); only
 * the active one is visible. While the section is on screen and untouched, it
 * advances on its own with a progress bar; any interaction stops autoplay.
 */
export function ShowcaseTabs({ tabs, panels, label }: { tabs: Tab[]; panels: React.ReactNode[]; label: string }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    // Autoplay only runs while visible, and never with reduced motion.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && !reduce.matches), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = autoplay && inView && !paused;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % tabs.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [running, active, tabs.length]);

  const select = (index: number, focus = false) => {
    setAutoplay(false);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const rtl = document.documentElement.dir === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === next) select((active + 1) % tabs.length, true);
    else if (e.key === prev) select((active - 1 + tabs.length) % tabs.length, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(tabs.length - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="mx-auto flex w-max gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-card">
          {tabs.map((tab, i) => {
            const selected = i === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "relative flex h-11 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-bold whitespace-nowrap transition-colors duration-300",
                  selected ? "bg-navy text-white" : "text-ink-2 hover:bg-surface hover:text-ink",
                )}
              >
                {tab.icon}
                {tab.label}
                {selected && running && (
                  <span
                    key={`${active}-progress`}
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-white/60 rtl:origin-right"
                    style={{ animation: `tab-progress ${AUTOPLAY_MS}ms linear forwards` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        {panels.map((panel, i) => (
          <div
            key={tabs[i].id}
            role="tabpanel"
            id={`${baseId}-panel-${tabs[i].id}`}
            aria-labelledby={`${baseId}-tab-${tabs[i].id}`}
            hidden={i !== active}
            tabIndex={0}
            className="animate-[rise_0.7s_var(--ease-out-expo)_both] focus-visible:outline-offset-8"
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
