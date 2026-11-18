import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig, videoSources } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, PlayIcon } from "@/components/ui/Icon";
import { Orbit } from "@/components/ui/Decor";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { videoCues } from "@/content/video";
import type { AppLocale } from "@/i18n/routing";
import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

const reassurance = ["noCard", "languages", "payments"] as const;

const enter = (step: number) => ({ "--enter-delay": step }) as CSSProperties;
const enterSpeed = (speed: number) => ({ "--speed": speed }) as CSSProperties;

/** Small notification cards floating around the dashboard — each is a real product event. */
function FloatingCard({
  icon,
  tone,
  title,
  body,
  className,
  parallax,
  floatDelay,
}: {
  icon: IconName;
  tone: string;
  title: string;
  body: string;
  className: string;
  parallax: number;
  floatDelay: string;
}) {
  return (
    <div data-parallax="" style={enterSpeed(parallax)} className={cn("pointer-events-none absolute z-10 hidden lg:block", className)} aria-hidden="true">
      <div className="animate-float flex w-[290px] items-center gap-3 text-start rounded-2xl border border-white/60 bg-white/90 p-3 shadow-float backdrop-blur-md" style={{ animationDelay: floatDelay }}>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", tone)}>
          <Icon name={icon} size={20} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-extrabold text-ink">{title}</span>
          <span className="line-clamp-2 block text-xs font-medium text-muted">{body}</span>
        </span>
      </div>
    </div>
  );
}

/** The design's hero video: player + transcript (accessibility and SEO). */
function HeroVideoBlock() {
  const t = useTranslations("video");
  const locale = useLocale() as AppLocale;
  const cueLang = locale === "ar" ? "ary" : locale;
  const src = videoSources(locale);
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="rounded-[22px] border border-line bg-white p-1.5 shadow-mock sm:p-2">
        <HeroVideo
          key={locale}
          poster={src.poster}
          posterAlt={t("posterAlt")}
          teaser={src.teaser}
          full={src.full}
          locale={locale}
          labels={{
            label: t("label"),
            play: t("play"),
            playMeta: t("playMeta"),
            fallback: t("fallback"),
            download: t("download"),
            error: t("error"),
            retry: t("retry"),
            captions: { ary: t("captionsAr"), fr: t("captionsFr"), en: t("captionsEn") },
          }}
        />
      </div>
      <details className="group mx-auto mt-4 max-w-[760px] text-start text-sm text-muted">
        <summary className="cursor-pointer list-none text-center font-bold text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden">
          {t("transcript")} <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">⌄</span>
        </summary>
        <ol className="mt-4 flex flex-col gap-2 rounded-2xl border border-line bg-white p-5 leading-relaxed" lang={cueLang === "ary" ? "ar" : cueLang}>
          {videoCues.map((c) => (
            <li key={c.start} className="flex gap-3">
              <span className="num shrink-0 font-sans text-xs font-bold text-faint">{`0:${String(Math.floor(c.start)).padStart(2, "0")}`}</span>
              <span>{c[cueLang]}</span>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const title = t("title");
  const accent = t("accent");
  const [before] = title.split(accent);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface via-white to-white pt-14 pb-20 sm:pt-20 lg:pb-28">
      {/* Background: grid, glows, brand orbit and arches */}
      <div className="bg-grid mask-radial absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -top-40 start-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl rtl:translate-x-1/2" aria-hidden="true" />
      <div data-parallax="" style={enterSpeed(0.12)} className="absolute top-24 -start-16 -z-10 hidden text-brand-200 md:block" aria-hidden="true">
        <Orbit className="size-64" rings={3} />
      </div>

      <div className="container-site flex flex-col items-center text-center">
        <span className="hero-enter inline-flex items-center gap-2 rounded-full border border-saffron-300/50 bg-saffron-50 py-1.5 ps-2 pe-4 text-[13px] font-extrabold text-saffron-800" style={enter(0)}>
          <span className="size-2.5 rounded-full bg-saffron-500" aria-hidden="true" />
          {t("badge")}
        </span>

        <h1 className="display-1 mt-7 max-w-[1000px]">
          {before}
          <span className="relative inline-block">
            <span className="headline-accent text-brand-500">{accent}</span>
            <svg className="underline-draw absolute -bottom-2 start-0 h-3 w-full text-saffron-300" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 9C60 3 140 2 298 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="hero-enter lead max-w-[720px]" style={enter(2)}>
          {t("lead")}
        </p>

        <div className="hero-enter mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row" style={enter(3)}>
          <ButtonLink href={siteConfig.links.signup} size="lg" arrow>
            {t("primaryCta")}
          </ButtonLink>
          <ButtonLink href={siteConfig.links.demo} variant="secondary" size="lg">
            <PlayIcon />
            {t("secondaryCta")}
          </ButtonLink>
        </div>

        <ul className="hero-enter mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-muted" style={enter(4)}>
          {reassurance.map((key) => (
            <li key={key} className="flex items-center gap-1.5">
              <span className="flex size-[18px] items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <Icon name="tick" size={12} strokeWidth={3} />
              </span>
              {t(`reassurance.${key}`)}
            </li>
          ))}
        </ul>

        {siteConfig.video.enabled ? (
          <div className="hero-enter relative mt-16 w-full sm:mt-20" style={enter(5)}>
            <div className="absolute inset-x-10 -bottom-10 top-20 -z-10 rounded-[40px] bg-gradient-to-r from-brand-300/40 via-teal-300/30 to-saffron-300/30 blur-3xl" aria-hidden="true" />
            <HeroVideoBlock />
          </div>
        ) : (
          <div className="hero-enter relative mt-16 w-full max-w-[1120px] sm:mt-20" style={enter(5)}>
            <div className="absolute inset-x-10 -bottom-10 top-20 -z-10 rounded-[40px] bg-gradient-to-r from-brand-300/40 via-teal-300/30 to-info-500/20 blur-3xl" aria-hidden="true" />
            <FloatingCard
              icon="inbox"
              tone="bg-brand-50 text-brand-500"
              title={t("floating.enrollmentTitle")}
              body={t("floating.enrollmentBody")}
              className="top-16 -start-20"
              parallax={0.08}
              floatDelay="0s"
            />
            <FloatingCard
              icon="check"
              tone="bg-teal-50 text-teal-700"
              title={t("floating.attendanceTitle")}
              body={t("floating.attendanceBody")}
              className="bottom-20 -start-24"
              parallax={0.14}
              floatDelay="-2s"
            />
            <FloatingCard
              icon="receipt"
              tone="bg-saffron-50 text-saffron-800"
              title={t("floating.paymentTitle")}
              body={t("floating.paymentBody")}
              className="top-28 -end-20"
              parallax={0.11}
              floatDelay="-4s"
            />
            <FloatingCard
              icon="message"
              tone="bg-whatsapp-50 text-whatsapp-700"
              title={t("floating.reminderTitle")}
              body={t("floating.reminderBody")}
              className="-bottom-6 -end-12"
              parallax={0.06}
              floatDelay="-1s"
            />
            <DashboardPreview />
          </div>
        )}
      </div>
    </section>
  );
}
