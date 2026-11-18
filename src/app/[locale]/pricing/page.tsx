import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { softwareApplicationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { Benefits } from "@/components/sections/Benefits";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/pricing">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "pricing");
}

export default async function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const { locale } = await params;
  return (
    <>
      <PageHeader page="pricing" />
      <Pricing showHeading={false} />
      <Benefits />
      <Faq ids={["commitment", "cardPayments", "branches", "domain", "setup", "data"]} />
      <ContactCta />
      <JsonLd data={await softwareApplicationSchema(locale as AppLocale)} />
    </>
  );
}
