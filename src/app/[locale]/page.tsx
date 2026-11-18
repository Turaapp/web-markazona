import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { softwareApplicationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Comparison } from "@/components/sections/Comparison";
import { ProductShowcase } from "@/components/sections/showcase/ProductShowcase";
import { RoleSpaces } from "@/components/sections/RoleSpaces";
import { ThemeShowcase } from "@/components/sections/ThemeShowcase";
import { Solutions } from "@/components/sections/Solutions";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "home");
}

/**
 * Homepage story: promise → pain → product tour → who uses it (8 spaces) →
 * public website → audiences → onboarding → outcomes & trust → pricing → FAQ → CTA.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return (
    <>
      <Hero />
      <Comparison />
      <ProductShowcase />
      <RoleSpaces />
      <ThemeShowcase />
      <Solutions />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Faq ids={["cardPayments", "arabic", "setup", "commitment", "families", "data"]} />
      <ContactCta />
      <JsonLd data={await softwareApplicationSchema(locale as AppLocale)} />
    </>
  );
}
