import { useTranslations } from "next-intl";
import { pricingPlans } from "@/content/pricing";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchPattern } from "@/components/ui/Decor";
import { BillingToggle } from "@/components/sections/pricing/BillingToggle";
import { cn } from "@/lib/utils";

/** Annual = 10 × monthly ("2 mois offerts" in the design). */
const yearlyPrice = (monthly: number) => monthly * 10;
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function Pricing({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations("pricing");
  const gridId = "pricing-plans";
  return (
    <section id="pricing" aria-labelledby={showHeading ? "pricing-title" : undefined} aria-label={showHeading ? undefined : t("eyebrow")} className="section-y bg-surface">
      <div className="container-site">
        {showHeading && <SectionHeading id="pricing-title" align="center" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />}

        <Reveal className={cn("flex justify-center", showHeading ? "mt-10" : "")} delay={1}>
          <BillingToggle targetId={gridId} label={t("billingLabel")} monthly={t("monthly")} yearly={t("yearly")} badge={t("yearlyBadge")} />
        </Reveal>

        <Reveal stagger as="ul" id={gridId} data-period="monthly" className="group/pricing mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const features = t.raw(`plans.${plan.id}.features`) as string[];
            const dark = plan.highlighted;
            return (
              <li
                key={plan.id}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-[24px] p-8",
                  dark ? "bg-navy text-white shadow-plan ring-1 ring-brand-500/40 lg:-my-4 lg:py-12" : "card card-hover",
                )}
              >
                {dark && <ArchPattern id="arches-pro" className="text-white" opacity={0.04} />}
                {dark && <div className="absolute -top-24 start-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl rtl:translate-x-1/2" aria-hidden="true" />}
                <div className="relative flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold">{t(`plans.${plan.id}.name`)}</h3>
                  {plan.id === "pro" && <span className="rounded-full bg-saffron-300 px-3 py-1 text-xs font-extrabold text-saffron-950">{t("plans.pro.badge")}</span>}
                </div>
                <p className={cn("relative mt-2 text-sm", dark ? "text-on-dark" : "text-muted")}>{t(`plans.${plan.id}.description`)}</p>

                <div className="relative mt-8 min-h-[78px]">
                  {plan.priceMad !== null ? (
                    <>
                      <p className="group-data-[period=yearly]/pricing:hidden">
                        <span className="num font-sans text-5xl font-extrabold tracking-tight">{fmt(plan.priceMad)}</span>{" "}
                        <span className={cn("font-bold", dark ? "text-on-dark" : "text-muted")}>{t("perMonth")}</span>
                      </p>
                      <p className="hidden group-data-[period=yearly]/pricing:block">
                        <span className="num font-sans text-5xl font-extrabold tracking-tight">{fmt(yearlyPrice(plan.priceMad))}</span>{" "}
                        <span className={cn("font-bold", dark ? "text-on-dark" : "text-muted")}>{t("perYear")}</span>
                        <span className={cn("mt-1 block text-sm font-semibold", dark ? "text-teal-300" : "text-teal-700")}>
                          {t("yearlyEquivalent", { price: Math.round(yearlyPrice(plan.priceMad) / 12) })}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="text-4xl font-extrabold tracking-tight">{t("plans.network.priceLabel")}</p>
                  )}
                </div>

                <div className={cn("relative my-8 h-px", dark ? "bg-white/10" : "bg-line")} />
                <p className={cn("relative text-xs font-extrabold tracking-wider uppercase", dark ? "text-on-dark" : "text-faint")}>{t("includes")}</p>
                <ul className="relative mt-4 flex flex-1 flex-col gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[15px]">
                      <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", dark ? "bg-teal-300 text-navy" : "bg-teal-50 text-teal-700")}>
                        <Icon name="tick" size={11} strokeWidth={3.2} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={plan.cta === "signup" ? siteConfig.links.signup : "/contact"}
                  variant={dark ? "primary" : "secondary"}
                  arrow={dark}
                  className="relative mt-10 w-full"
                >
                  {t(`plans.${plan.id}.cta`)}
                </ButtonLink>
              </li>
            );
          })}
        </Reveal>

        <Reveal as="p" className="mt-12 text-center text-sm font-semibold text-muted">
          {t("trialNote")}
        </Reveal>
      </div>
    </section>
  );
}
