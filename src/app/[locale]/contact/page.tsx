import type { AppLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { Faq } from "@/components/sections/Faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return pageMetadata(locale as AppLocale, "contact");
}

/**
 * The design has no contact form — contact goes through WhatsApp, the free
 * trial and the demo. See README › "Contact form" to add one later.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader page="contact" />
      <ContactChannels />
      <div className="bg-surface">
        <Faq ids={["setup", "commitment", "arabic", "families"]} />
      </div>
    </>
  );
}
