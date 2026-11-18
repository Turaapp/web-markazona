import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/config/site";
import { Reveal, SplitWords } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ArchPattern, Orbit } from "@/components/ui/Decor";

const reassurance = ["noCard", "languages", "payments"] as const;

/** Closing call to action — dark navy panel with the brand orbit motif. */
export function ContactCta() {
  const t = useTranslations("cta");
  const th = useTranslations("hero");
  return (
    <section id="contact" aria-labelledby="cta-title" className="px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal variant="scale" className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-navy px-6 py-20 text-center text-white sm:px-12 lg:py-28">
        <ArchPattern id="arches-cta" className="text-white" opacity={0.04} />
        <div className="absolute -top-40 start-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-500/45 blur-3xl rtl:translate-x-1/2" aria-hidden="true" />
        <div className="absolute -bottom-32 -end-20 -z-10 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" aria-hidden="true" />
        <div data-parallax="" style={{ "--speed": 0.1 } as CSSProperties} className="absolute -start-16 top-10 -z-10 text-white/10" aria-hidden="true">
          <Orbit className="size-80" rings={4} />
        </div>

        <p className="eyebrow justify-center text-brand-300">{t("eyebrow")}</p>
        <SplitWords id="cta-title" text={t("title")} accent={t("accent")} className="heading-2 mx-auto max-w-[860px] text-white [&_.headline-accent]:text-brand-300" />
        <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-on-dark">{t("lead")}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.links.signup} variant="inverse" size="lg" arrow>
            {t("primary")}
          </ButtonLink>
          <ButtonLink href={whatsappUrl} variant="outline-inverse" size="lg">
            <Icon name="message" size={19} />
            {t("secondary")}
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-on-dark">
          {reassurance.map((key) => (
            <li key={key} className="flex items-center gap-1.5">
              <Icon name="tick" size={14} strokeWidth={2.8} className="text-teal-300" />
              {th(`reassurance.${key}`)}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
