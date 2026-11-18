import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { servicesSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Solutions } from "@/components/sections/Solutions";
import { Comparison } from "@/components/sections/Comparison";
import { ThemeShowcase } from "@/components/sections/ThemeShowcase";
import { Benefits } from "@/components/sections/Benefits";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "solutions");
}

export default async function SolutionsPage({ params }: PageProps<"/[locale]/solutions">) {
  const { locale } = await params;
  return (
    <>
      <PageHeader page="solutions" />
      <Solutions />
      <div className="bg-surface">
        <Comparison />
      </div>
      <ThemeShowcase />
      <Benefits />
      <ContactCta />
      <JsonLd data={await servicesSchema(locale as AppLocale)} />
    </>
  );
}
