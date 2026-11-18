"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeSettings, switcherOrder } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

/**
 * Header language dropdown (disclosure pattern). Each option is a real link to
 * the same page in another language, so crawlers can follow it too.
 * Keyboard: Enter/Space or ↓/↑ opens, ↓/↑/Home/End move, Esc closes.
 */
export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  // Option to focus once the menu has rendered open (it is inert while closed).
  const pendingFocus = useRef<"first" | "last" | null>(null);
  const current = localeSettings[locale];

  // Routes stay mounted (React Activity): close when this view is hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const options = () => Array.from(rootRef.current?.querySelectorAll<HTMLAnchorElement>("[data-lang-option]") ?? []);

  const focusOption = (which: "first" | "last" | "next" | "prev") => {
    const list = options();
    if (list.length === 0) return;
    const index = list.indexOf(document.activeElement as HTMLAnchorElement);
    const target =
      which === "first" ? 0 : which === "last" ? list.length - 1 : which === "next" ? (index + 1) % list.length : (index - 1 + list.length) % list.length;
    list[target]?.focus();
  };

  useEffect(() => {
    if (open && pendingFocus.current) {
      focusOption(pendingFocus.current);
      pendingFocus.current = null;
    }
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const down = e.key === "ArrowDown";
      if (!open) {
        pendingFocus.current = down ? "first" : "last";
        setOpen(true);
      } else {
        focusOption(down ? "next" : "prev");
      }
    } else if (open && (e.key === "Home" || e.key === "End")) {
      e.preventDefault();
      focusOption(e.key === "Home" ? "first" : "last");
    }
  };

  const onBlur = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t("switcherLabel", { language: current.nativeName })}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[42px] items-center gap-2 rounded-xl px-2.5 text-sm font-bold text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <GlobeIcon />
        <span lang={locale}>{current.nativeName}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <ul
        id={listId}
        inert={!open}
        className={cn(
          "absolute end-0 top-full z-50 mt-2 min-w-[200px] origin-top rounded-2xl border border-line bg-white p-1.5 shadow-lift duration-200 ease-out",
          // Visibility flips instantly on open (so options are focusable at once) and is delayed on close.
          open ? "visible translate-y-0 scale-100 opacity-100 transition-[opacity,transform]" : "invisible -translate-y-1 scale-95 opacity-0 transition-[opacity,transform,visibility]",
        )}
      >
        {switcherOrder.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                data-lang-option
                href={pathname}
                locale={code}
                lang={code}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                onNavigate={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-[15px] font-semibold text-ink-2 hover:bg-surface hover:text-ink focus-visible:bg-surface",
                  active && "text-brand-700",
                )}
              >
                <span>{localeSettings[code].nativeName}</span>
                {active && <CheckIcon />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Inline language links for the mobile menu. */
export function LanguageLinks({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="px-2 py-2.5">
      <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-muted uppercase">{t("label")}</p>
      <ul className="flex flex-wrap gap-2">
        {switcherOrder.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                lang={code}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                onNavigate={onNavigate}
                className={cn(
                  "flex h-10 items-center rounded-full border px-4 text-sm font-bold",
                  active ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line-strong text-ink-2 hover:bg-surface hover:text-ink",
                )}
              >
                {localeSettings[code].nativeName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
