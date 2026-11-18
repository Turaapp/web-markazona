import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { softwareApplicationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductShowcase } from "@/components/sections/showcase/ProductShowcase";
import { Features } from "@/components/sections/Features";
import { RoleSpaces } from "@/components/sections/RoleSpaces";
import { ThemeShowcase } from "@/components/sections/ThemeShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ContactCta } from "@/components/sections/ContactCta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: PageProps<"/[locale]/features">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "features");
}

export default async function FeaturesPage({ params }: PageProps<"/[locale]/features">) {
  const { locale } = await params;
  const t = await getTranslations("hero");
  return (
    <>
      <PageHeader page="features">
        <ButtonLink href={siteConfig.links.signup} size="lg" arrow>
          {t("primaryCta")}
        </ButtonLink>
      </PageHeader>
      <ProductShowcase />
      <Features />
      <RoleSpaces />
      <ThemeShowcase />
      <HowItWorks />
      <div className="pt-20 lg:pt-28">
        <ContactCta />
      </div>
      <JsonLd data={await softwareApplicationSchema(locale as AppLocale)} />
    </>
  );
}
