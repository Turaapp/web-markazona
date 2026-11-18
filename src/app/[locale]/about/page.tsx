import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/PageHeader";
import { AboutStory } from "@/components/sections/AboutStory";
import { Comparison } from "@/components/sections/Comparison";
import { Benefits } from "@/components/sections/Benefits";
import { ContactCta } from "@/components/sections/ContactCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "about");
}

export default function AboutPage() {
  return (
    <>
      <PageHeader page="about" />
      <AboutStory />
      <div className="bg-surface">
        <Comparison />
      </div>
      <Benefits />
      <ContactCta />
    </>
  );
}
