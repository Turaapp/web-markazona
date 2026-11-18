import { useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Contact options. The design has no contact form, so contact happens through
 * WhatsApp, the free trial and the demo — no fake form submissions.
 */
export function ContactChannels() {
  const t = useTranslations("contact");
  const channels: { id: "whatsapp" | "trial" | "demo"; href: string; icon: IconName; featured?: boolean }[] = [
    { id: "whatsapp", href: whatsappUrl, icon: "message", featured: true },
    { id: "trial", href: siteConfig.links.signup, icon: "sparkle" },
    { id: "demo", href: siteConfig.links.demo, icon: "chart" },
  ];
  return (
    <section aria-labelledby="channels-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <h2 id="channels-title" className="sr-only">
          {t("channelsTitle")}
        </h2>
        <Reveal stagger as="ul" className="grid gap-4 lg:grid-cols-3">
          {channels.map((c) => (
            <li key={c.id}>
              <a
                href={c.href}
                className={cn(
                  "group flex h-full flex-col rounded-[24px] p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1",
                  c.featured ? "bg-navy text-white shadow-plan hover:text-white" : "card text-ink hover:text-ink hover:shadow-lift",
                )}
              >
                <span className={cn("flex size-12 items-center justify-center rounded-2xl", c.featured ? "bg-whatsapp text-white" : "bg-brand-50 text-brand-500")}>
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-8 text-xl font-extrabold tracking-tight">{t(`${c.id}.title`)}</h3>
                <p className={cn("mt-2 flex-1 text-[15px] leading-relaxed", c.featured ? "text-on-dark" : "text-muted")}>{t(`${c.id}.description`)}</p>
                <span className={cn("mt-8 inline-flex items-center gap-2 text-[15px] font-bold", c.featured ? "text-teal-300" : "text-brand-500")}>
                  {t(`${c.id}.cta`)}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <Icon name="arrow" size={18} strokeWidth={2.2} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </Reveal>
        <Reveal className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-line bg-surface-2 px-8 py-6 text-[15px] font-semibold text-ink-2 sm:flex-row">
          <span className="flex items-center gap-3">
            <Icon name="pin" size={20} className="text-brand-500" />
            {t("location")}
          </span>
          <span className="flex items-center gap-3">
            <Icon name="languages" size={20} className="text-brand-500" />
            {t("languages")}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
