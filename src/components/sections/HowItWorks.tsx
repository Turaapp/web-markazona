import { useTranslations } from "next-intl";
import { stepIds } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/content";

const stepIcons: Record<(typeof stepIds)[number], IconName> = {
  create: "building",
  configure: "calendar",
  publish: "globe",
};

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  return (
    <section aria-labelledby="how-title" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading id="how-title" align="center" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
        <div className="relative mt-16 lg:mt-20">
          {/* Connecting line (desktop) — draws in when revealed */}
          <Reveal variant="fade" className="absolute inset-x-[16%] top-[30px] hidden lg:block" aria-hidden="true">
            <div className="h-px w-full bg-[repeating-linear-gradient(90deg,var(--color-brand-300)_0_8px,transparent_8px_16px)]" />
          </Reveal>
          <Reveal stagger as="ol" className="relative grid gap-6 lg:grid-cols-3 lg:gap-10">
            {stepIds.map((id, i) => (
              <li key={id} className="flex flex-col items-center text-center">
                <span className="relative flex size-[60px] items-center justify-center rounded-2xl bg-white text-brand-500 shadow-card ring-1 ring-line">
                  <Icon name={stepIcons[id]} size={24} />
                  <span className="absolute -end-2 -top-2 flex size-6 items-center justify-center rounded-full bg-navy font-sans text-[11px] font-extrabold text-white">{i + 1}</span>
                </span>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight">{t(`steps.${id}.title`)}</h3>
                <p className="mt-2.5 max-w-[320px] text-[15px] leading-relaxed text-muted">{t(`steps.${id}.description`)}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
