import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { pages } from "@/content/pages";
import { routing } from "@/i18n/routing";
import { languageAlternates } from "@/lib/seo";
import { absoluteUrl, localizedPath } from "@/lib/utils";

/** One URL per page per language, each listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  return Object.values(pages).flatMap(({ path }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)]),
    );
    return routing.locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
