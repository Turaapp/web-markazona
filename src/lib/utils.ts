import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/i18n/routing";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "/pricing" + "ar" → "/ar/pricing"; "/" + "fr" → "/fr". */
export function localizedPath(locale: AppLocale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Absolute URL on the marketing site, e.g. absoluteUrl("/ar/pricing"). */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
