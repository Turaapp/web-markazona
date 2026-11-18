import { useTranslations } from "next-intl";
import { faqIds } from "@/content/features";
import { whatsappUrl } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion — accessible, no JavaScript; animated where the browser supports it. */
export function Faq({ showHeading = true, ids = faqIds }: { showHeading?: boolean; ids?: readonly (typeof faqIds)[number][] }) {
  const t = useTranslations("faq");
  return (
    <section id="faq" aria-labelledby={showHeading ? "faq-title" : undefined} aria-label={showHeading ? undefined : t("eyebrow")} className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          {showHeading ? (
            <SectionHeading id="faq-title" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
          ) : (
            <Reveal as="p" className="text-[17px] leading-relaxed text-muted">
              {t("lead")}
            </Reveal>
          )}
          <Reveal delay={3} className="mt-8">
            <ButtonLink href={whatsappUrl} variant="secondary" arrow>
              {t("contactCta")}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal stagger className="flex flex-col divide-y divide-line border-y border-line">
          {ids.map((id, i) => (
            <details key={id} open={i === 0} className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-start [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] font-bold tracking-tight transition-colors group-hover:text-brand-700">{t(`items.${id}.question`)}</h3>
                <span
                  className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-2 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-brand-500 group-open:bg-brand-500 group-open:text-white"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[640px] pb-6 text-[15px] leading-relaxed text-muted">{t(`items.${id}.answer`)}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
