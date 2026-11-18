import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { productScreen, showcaseTabs } from "@/content/features";
import { Icon } from "@/components/ui/Icon";
import { BrowserFrame } from "@/components/ui/Frames";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ShowcaseTabs } from "@/components/sections/showcase/ShowcaseTabs";

/**
 * Interactive product tour: one tab per module, each showing a real screenshot
 * of the connected app (demo organisation "Académie Horizon") in the page
 * language — Arabic RTL interface on /ar, French interface on /fr and /en.
 */
export function ProductShowcase() {
  const t = useTranslations("showcase");
  const locale = useLocale();

  const tabs = showcaseTabs.map((tab) => ({
    id: tab.id,
    label: t(`tabs.${tab.id}.label`),
    icon: <Icon name={tab.icon} size={17} />,
  }));

  const panels = showcaseTabs.map((tab) => {
    const points = t.raw(`tabs.${tab.id}.points`) as string[];
    return (
      <div key={tab.id} className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <div>
          <h3 className="heading-3">{t(`tabs.${tab.id}.title`)}</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{t(`tabs.${tab.id}.description`)}</p>
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-semibold text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Icon name="tick" size={11} strokeWidth={3.2} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand-100/70 via-white to-teal-50 sm:-inset-10" aria-hidden="true" />
          <BrowserFrame url={`${siteConfig.appHost}/horizon/${tab.path}`} className="transition-transform duration-500 ease-out hover:-translate-y-1">
            <Image
              src={productScreen(tab.screen, locale)}
              alt={t(`tabs.${tab.id}.alt`)}
              width={2880}
              height={1800}
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
              className="block h-auto w-full"
            />
          </BrowserFrame>
        </div>
      </div>
    );
  });

  return (
    <section id="tour" aria-labelledby="tour-title" className="section-y relative overflow-x-clip bg-surface">
      <div className="container-site">
        <SectionHeading id="tour-title" align="center" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
        <Reveal className="mt-12" delay={1}>
          <ShowcaseTabs tabs={tabs} panels={panels} label={t("tabsLabel")} />
        </Reveal>
      </div>
    </section>
  );
}
