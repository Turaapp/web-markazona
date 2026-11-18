import { useTranslations } from "next-intl";
import { benefitIds, trustItems } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Outcomes from the first month + the trust facts (data isolation, permissions, traceability, RTL). */
export function Benefits({ showTrust = true }: { showTrust?: boolean }) {
  const t = useTranslations("benefits");
  const tt = useTranslations("trust");
  return (
    <section id="about" aria-labelledby="benefits-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="benefits-title" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
          </div>
          <Reveal stagger as="ul" className="grid gap-4 sm:grid-cols-2">
            {benefitIds.map((id, i) => (
              <li key={id} className="card card-hover p-7">
                <span className="font-sans text-sm font-extrabold text-brand-500">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight">{t(`items.${id}.title`)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(`items.${id}.description`)}</p>
              </li>
            ))}
          </Reveal>
        </div>

        {showTrust && (
          <div className="mt-20 rounded-[28px] border border-line bg-surface-2 p-6 sm:p-10">
            <Reveal as="h3" variant="fade" className="text-center text-sm font-extrabold tracking-[0.12em] text-muted uppercase">
              {tt("title")}
            </Reveal>
            <Reveal stagger as="ul" className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse">
              {trustItems.map((item) => (
                <li key={item.id} className="flex flex-col items-center px-4 text-center lg:px-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-500 shadow-card ring-1 ring-line">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h4 className="mt-4 text-[15px] font-extrabold">{tt(`items.${item.id}.title`)}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{tt(`items.${item.id}.description`)}</p>
                </li>
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
