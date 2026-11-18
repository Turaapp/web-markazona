import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "faq");
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  return (
    <>
      <PageHeader page="faq" />
      <Faq showHeading={false} />
      <ContactCta />
      <JsonLd data={await faqPageSchema(locale as AppLocale)} />
    </>
  );
}
