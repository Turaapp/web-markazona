import { useTranslations } from "next-intl";
import { featureItems } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { toneTile } from "@/components/ui/tones";
import { cn } from "@/lib/utils";

/** "Everything included" grid of the six core modules. */
export function Features() {
  const t = useTranslations("features");
  return (
    <section id="features" aria-labelledby="features-title" className="section-y">
      <div className="container-site">
        <SectionHeading id="features-title" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
        <Reveal stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((f) => (
            <li key={f.id} className="group bg-white p-8 transition-colors duration-500 hover:bg-surface-2">
              <div className={cn("flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]", toneTile[f.tone])}>
                <Icon name={f.icon} />
              </div>
              <h3 className="mt-6 text-lg font-extrabold tracking-tight">{t(`items.${f.id}.title`)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(`items.${f.id}.description`)}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
