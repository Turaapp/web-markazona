/**
 * Marketing pages and their locale-independent paths. Titles, descriptions and
 * headings are in messages/{locale}.json › metadata.pages.<key>.
 * URLs are /{locale}{path}, e.g. /ar/pricing.
 */
export const pages = {
  home: { path: "/" },
  features: { path: "/features" },
  solutions: { path: "/solutions" },
  pricing: { path: "/pricing" },
  about: { path: "/about" },
  faq: { path: "/faq" },
  contact: { path: "/contact" },
} as const;

export type PageKey = keyof typeof pages;
export type InnerPageKey = Exclude<PageKey, "home">;

/** Main navigation, in the design's order. Labels: messages › navigation.items. */
export const mainNav = ["features", "solutions", "pricing", "about", "faq", "contact"] as const satisfies readonly InnerPageKey[];

export const footerNav = ["features", "solutions", "pricing", "faq", "contact"] as const satisfies readonly InnerPageKey[];
