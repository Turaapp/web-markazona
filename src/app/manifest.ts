import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "metadata" });
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: t("description"),
    start_url: "/",
    display: "browser",
    lang: routing.defaultLocale,
    background_color: "#ffffff",
    theme_color: "#13294b",
    icons: [
      { src: "/branding/png/android-chrome-192.png", sizes: "192x192", type: "image/png" },
      { src: "/branding/png/android-chrome-512.png", sizes: "512x512", type: "image/png" },
      { src: "/branding/app-icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
