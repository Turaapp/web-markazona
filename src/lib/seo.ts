import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pages, type PageKey } from "@/content/pages";
import { localeSettings, routing, type AppLocale } from "@/i18n/routing";
import { localizedPath } from "@/lib/utils";

/**
 * hreflang map for a page: one entry per locale plus x-default, which points
 * to the unprefixed URL — the proxy redirects it to the visitor's language.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[localeSettings[locale].hreflang] = localizedPath(locale, path);
  }
  languages["x-default"] = path;
  return languages;
}

/**
 * Metadata for one marketing page in one language: localized title and
 * description, self-referencing canonical, hreflang alternates, Open Graph
 * and Twitter card. The social image is branding/social-preview.png.
 */
export async function pageMetadata(locale: AppLocale, key: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t(`pages.${key}.title`);
  const description = t(`pages.${key}.description`);
  const { path } = pages[key];
  const url = localizedPath(locale, path);
  // Official bilingual link preview from the brand kit (1200 × 630).
  const image = { url: "/branding/social-preview.png", width: 1200, height: 630, alt: t("ogAlt") };

  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: localeSettings[locale].ogLocale,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeSettings[l].ogLocale),
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
