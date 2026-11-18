"use client";

import { useTranslations } from "next-intl";
import { useId, useLayoutEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { mainNav, pages } from "@/content/pages";
import { Link, usePathname } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LanguageLinks, LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

const navLink = "text-[15px] font-semibold text-ink-2 hover:text-ink";

/** Desktop navigation, language switcher and mobile menu — the header's interactive part. */
export function SiteNav() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Routes stay mounted (React Activity): close the menu when this view is hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav aria-label={t("primaryLabel")} className="hidden flex-1 flex-wrap gap-7 lg:flex">
        {mainNav.map((key) => {
          const href = pages[key].path;
          return (
            <Link
              key={key}
              href={href}
              className={cn(navLink, isActive(href) && "text-ink")}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {t(`items.${key}`)}
            </Link>
          );
        })}
      </nav>

      <div className="ms-auto flex items-center gap-2 sm:gap-3.5 lg:ms-0">
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <a className={cn(navLink, "hidden lg:inline")} href={siteConfig.links.login}>
          {t("login")}
        </a>
        <ButtonLink href={siteConfig.links.signup} size="sm">
          {t("freeTrial")}
        </ButtonLink>
        <button
          type="button"
          className="flex size-[42px] shrink-0 items-center justify-center rounded-xl border border-line-strong text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div
        id={menuId}
        inert={!open}
        className={cn(
          "grid basis-full transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
        <nav aria-label={t("mobileLabel")} className="mt-3 flex flex-col gap-1 border-t border-line-soft pt-3 pb-2">
          {mainNav.map((key) => {
            const href = pages[key].path;
            return (
              <Link
                key={key}
                href={href}
                onNavigate={close}
                className={cn(navLink, "rounded-xl px-3 py-3 text-base", isActive(href) && "bg-surface text-ink")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {t(`items.${key}`)}
              </Link>
            );
          })}
          <a className={cn(navLink, "rounded-xl px-3 py-3 text-base")} href={siteConfig.links.login}>
            {t("login")}
          </a>
          <div className="border-t border-line-soft sm:hidden">
            <LanguageLinks onNavigate={close} />
          </div>
        </nav>
        </div>
      </div>
    </>
  );
}
