/**
 * Brand and URL configuration — language-independent values only.
 * Translatable text lives in messages/{locale}.json. Values marked TODO must be
 * confirmed before launch.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://markazona.ma").replace(/\/$/, "");

export const siteConfig = {
  name: "Markazona",
  url: siteUrl,
  countryCode: "MA",
  /** Shown in product mockups (browser address bar). */
  appHost: "app.markazona.ma",
  copyrightYear: 2026,

  /** Date the marketing content was last reviewed — used for sitemap lastModified. */
  lastUpdated: "2026-11-18",

  links: {
    /** TODO: confirm the real app URLs. Override with env vars on Vercel. */
    signup: process.env.NEXT_PUBLIC_SIGNUP_URL ?? "https://app.markazona.ma/inscription",
    login: process.env.NEXT_PUBLIC_LOGIN_URL ?? "https://app.markazona.ma/connexion",
    demo: process.env.NEXT_PUBLIC_DEMO_URL ?? "https://app.markazona.ma/demo",
  },

  /**
   * TODO: the number in the design (212661234567) looks like a placeholder.
   * Set NEXT_PUBLIC_WHATSAPP_NUMBER (international format, digits only).
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661234567",

  /**
   * Hero explainer video (markazona-explainers package): one 16:9 edit per
   * language — on-screen text and app screenshots follow the language (Arabic
   * app UI for AR, French app UI for FR and EN). Music only; the narration is
   * carried by subtitles (public/videos/*.vtt, built from src/content/video.ts).
   * Set NEXT_PUBLIC_VIDEO_ENABLED=false to show the product dashboard instead.
   */
  video: {
    enabled: process.env.NEXT_PUBLIC_VIDEO_ENABLED !== "false",
    durationSeconds: 49,
  },
} as const;

/**
 * Files of the explainer for one language. Only the page language's poster and
 * teaser are requested; the full video loads when the visitor presses play.
 */
export function videoSources(locale: "fr" | "ar" | "en") {
  return {
    poster: `/videos/markazona-poster-${locale}.jpg`, // 1920×1080, LCP image
    teaser: `/videos/markazona-teaser-${locale}.mp4`, // 720p, muted loop, no audio
    full: `/videos/markazona-explainer-${locale}.mp4`, // 1080p H.264, ~11 MB
  };
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
