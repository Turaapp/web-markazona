import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { faqIds, featureItems, solutionItems } from "@/content/features";
import { pages, type PageKey } from "@/content/pages";
import { pricingPlans } from "@/content/pricing";
import { localeSettings, routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl, localizedPath } from "@/lib/utils";

/**
 * /llms.txt — a plain-text summary for AI assistants (https://llmstxt.org),
 * with one section per language. Generated from the same dictionaries as the
 * pages, so it never drifts from the site.
 */
async function section(locale: AppLocale): Promise<string[]> {
  const t = await getTranslations({ locale });
  const pageKeys = Object.keys(pages) as PageKey[];
  return [
    `## ${localeSettings[locale].nativeName} (${locale})`,
    "",
    `> ${t("metadata.description")}`,
    "",
    "### Pages",
    ...pageKeys.map(
      (key) => `- [${t(`metadata.pages.${key}.title`)}](${absoluteUrl(localizedPath(locale, pages[key].path))}): ${t(`metadata.pages.${key}.description`)}`,
    ),
    "",
    `### ${t("features.eyebrow")}`,
    ...featureItems.map(({ id }) => `- ${t(`features.items.${id}.title`)}: ${t(`features.items.${id}.description`)}`),
    "",
    `### ${t("solutions.eyebrow")}`,
    ...solutionItems.map(({ id }) => `- ${t(`solutions.items.${id}.title`)}: ${t(`solutions.items.${id}.description`)}`),
    "",
    `### ${t("pricing.eyebrow")}`,
    ...pricingPlans.map((p) => {
      const price = p.priceMad !== null ? `${p.priceMad} ${t("pricing.perMonth")}` : t("pricing.plans.network.priceLabel");
      const features = (t.raw(`pricing.plans.${p.id}.features`) as string[]).join(" · ");
      return `- ${t(`pricing.plans.${p.id}.name`)} — ${price}: ${t(`pricing.plans.${p.id}.description`)} ${features}`;
    }),
    `- ${t("pricing.lead")}`,
    "",
    `### ${t("faq.title")}`,
    ...faqIds.flatMap((id) => [`- **${t(`faq.items.${id}.question`)}** ${t(`faq.items.${id}.answer`)}`]),
    "",
  ];
}

export async function GET() {
  const sections = await Promise.all(routing.locales.map(section));
  const body = [`# ${siteConfig.name}`, "", ...sections.flat()].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
