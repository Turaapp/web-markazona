/**
 * Schema.org JSON-LD builders, localized to the page language. Only facts
 * that appear on the site are used — no ratings, reviews or invented data.
 */
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { faqIds, solutionItems } from "@/content/features";
import { pricingPlans } from "@/content/pricing";
import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl, localizedPath } from "@/lib/utils";

const orgId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export type JsonLdObject = Record<string, unknown>;

export async function organizationSchema(locale: AppLocale): Promise<JsonLdObject> {
  const t = await getTranslations({ locale });
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: absoluteUrl(localizedPath(locale, "/")),
    alternateName: "مركزونا",
    logo: absoluteUrl("/branding/png/logo-icon-512.png"),
    description: t("metadata.description"),
    address: {
      "@type": "PostalAddress",
      addressLocality: t("schema.city"),
      addressCountry: siteConfig.countryCode,
    },
    areaServed: { "@type": "Country", name: t("schema.country") },
    knowsLanguage: [...routing.locales],
  };
}

export async function websiteSchema(locale: AppLocale): Promise<JsonLdObject> {
  const t = await getTranslations({ locale });
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${websiteId}-${locale}`,
    name: siteConfig.name,
    description: t("metadata.tagline"),
    url: absoluteUrl(localizedPath(locale, "/")),
    inLanguage: locale,
    publisher: { "@id": orgId },
  };
}

export async function softwareApplicationSchema(locale: AppLocale): Promise<JsonLdObject> {
  const t = await getTranslations({ locale });
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: absoluteUrl(localizedPath(locale, "/")),
    description: t("metadata.description"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: t("schema.appSubCategory"),
    operatingSystem: "Web",
    inLanguage: locale,
    availableLanguage: ["fr", "ar"],
    publisher: { "@id": orgId },
    offers: pricingPlans
      .filter((plan) => plan.priceMad !== null)
      .map((plan) => ({
        "@type": "Offer",
        name: t(`pricing.plans.${plan.id}.name`),
        description: t(`pricing.plans.${plan.id}.description`),
        price: plan.priceMad,
        priceCurrency: "MAD",
        url: absoluteUrl(localizedPath(locale, "/pricing")),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.priceMad,
          priceCurrency: "MAD",
          unitText: "MONTH",
        },
      })),
  };
}

export async function servicesSchema(locale: AppLocale): Promise<JsonLdObject> {
  const t = await getTranslations({ locale });
  return {
    "@context": "https://schema.org",
    "@graph": solutionItems.map(({ id }) => ({
      "@type": "Service",
      name: t("schema.serviceName", { audience: t(`solutions.items.${id}.title`) }),
      serviceType: t(`solutions.items.${id}.title`),
      description: t(`solutions.items.${id}.description`),
      inLanguage: locale,
      provider: { "@id": orgId },
      areaServed: { "@type": "Country", name: t("schema.country") },
      url: absoluteUrl(localizedPath(locale, "/solutions")),
    })),
  };
}

export async function faqPageSchema(locale: AppLocale): Promise<JsonLdObject> {
  const t = await getTranslations({ locale, namespace: "faq.items" });
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqIds.map((id) => ({
      "@type": "Question",
      name: t(`${id}.question`),
      acceptedAnswer: { "@type": "Answer", text: t(`${id}.answer`) },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
