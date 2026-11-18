import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans_Arabic, Inter, Manrope, Noto_Kufi_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { localeSettings, routing } from "@/i18n/routing";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  // Only Arabic pages render Arabic text at size; the font has unicode-range,
  // so French/English pages never download it.
  preload: false,
});

// Arabic titles (BRAND.md: Noto Kufi Arabic SemiBold/Bold).
const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["600", "700"],
  variable: "--font-noto-kufi",
  display: "swap",
  preload: false,
});

// Fonts of the two public-site themes (only used inside the theme preview;
// not preloaded — files download only when that section renders).
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-jakarta", display: "swap", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["500"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-inter", display: "swap", preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: `${t("siteName")} — ${t("tagline")}`, template: `%s | ${t("siteName")}` },
    description: t("description"),
    applicationName: t("siteName"),
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "education",
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#13294b",
  width: "device-width",
  initialScale: 1,
};

/** Only these namespaces are sent to the browser (used by the header's client components). */
const clientNamespaces = ["navigation", "language"] as const;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]));
  const t = await getTranslations("navigation");
  const { dir } = localeSettings[locale];

  return (
    <html lang={locale} dir={dir} className={`${manrope.variable} ${plexArabic.variable} ${notoKufi.variable} ${jakarta.variable} ${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        <JsonLd data={[await organizationSchema(locale), await websiteSchema(locale)]} />
      </body>
    </html>
  );
}
