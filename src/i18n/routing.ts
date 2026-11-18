import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
  // Every URL carries its locale: /fr/pricing, /ar/pricing, /en/pricing.
  localePrefix: "always",
  // Remember an explicit language choice for a year (set when the visitor switches language).
  localeCookie: { name: "NEXT_LOCALE", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" },
  // hreflang is emitted in the HTML <head> (src/lib/seo.ts), the single source of truth.
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];

/** Per-locale settings that the routing config doesn't cover. */
export const localeSettings: Record<
  AppLocale,
  { dir: "ltr" | "rtl"; nativeName: string; shortName: string; ogLocale: string; hreflang: string }
> = {
  fr: { dir: "ltr", nativeName: "Français", shortName: "FR", ogLocale: "fr_MA", hreflang: "fr" },
  ar: { dir: "rtl", nativeName: "العربية", shortName: "ع", ogLocale: "ar_MA", hreflang: "ar" },
  en: { dir: "ltr", nativeName: "English", shortName: "EN", ogLocale: "en_US", hreflang: "en" },
};

/** Order shown in the language switcher. */
export const switcherOrder: AppLocale[] = ["ar", "fr", "en"];
