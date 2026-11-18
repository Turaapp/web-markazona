import { useTranslations } from "next-intl";
import { comparisonIds } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Orbit } from "@/components/ui/Decor";

/** Before / after — the pain points from the product video, and what replaces them. */
export function Comparison() {
  const t = useTranslations("comparison");
  return (
    <section aria-labelledby="comparison-title" className="section-y relative overflow-hidden">
      <div className="container-site">
        <SectionHeading id="comparison-title" align="center" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />

        <div className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal variant="start" className="relative rounded-[28px] border border-line bg-surface-2 p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-ink-2">{t("beforeLabel")}</h3>
              <span className="flex gap-1.5" aria-hidden="true">
                {["WhatsApp", "Excel"].map((x) => (
                  <span key={x} className="rounded-full border border-line bg-white px-2.5 py-1 font-sans text-[11px] font-bold text-faint">
                    {x}
                  </span>
                ))}
              </span>
            </div>
            <ul className="mt-8 flex flex-col gap-4">
              {comparisonIds.map((id) => (
                <li key={id} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-muted">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-error-50 text-error-500">
                    <Icon name="cross" size={13} strokeWidth={2.6} />
                  </span>
                  <span className="decoration-error-500/30 decoration-1">{t(`before.${id}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2} className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-2 to-navy p-7 text-white shadow-plan sm:p-10">
            <Orbit className="absolute -end-20 -top-20 size-72 text-white/15" rings={4} />
            <div className="relative flex items-center justify-between">
              <h3 className="text-lg font-extrabold">{t("afterLabel")}</h3>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20">✦</span>
            </div>
            <ul className="relative mt-8 flex flex-col gap-4">
              {comparisonIds.map((id) => (
                <li key={id} className="flex items-start gap-3.5 text-[15px] leading-relaxed font-semibold text-white">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-300 text-navy">
                    <Icon name="tick" size={13} strokeWidth={3} />
                  </span>
                  {t(`after.${id}`)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
