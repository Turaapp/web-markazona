import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { pages, type InnerPageKey } from "@/content/pages";
import { SplitWords } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Orbit } from "@/components/ui/Decor";

/** Header for inner pages: grid backdrop, breadcrumbs, word-reveal h1. */
export function PageHeader({ page, children }: { page: InnerPageKey; children?: React.ReactNode }) {
  const t = useTranslations("metadata.pages");
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-white pt-14 pb-6 sm:pt-20 lg:pb-8">
      <div className="bg-grid mask-radial absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -top-48 start-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl rtl:translate-x-1/2" aria-hidden="true" />
      <div data-parallax="" style={{ "--speed": 0.15 } as CSSProperties} className="absolute top-16 -end-14 -z-10 hidden text-brand-200 md:block" aria-hidden="true">
        <Orbit className="size-56" rings={3} />
      </div>
      <div className="container-site flex flex-col items-center text-center">
        <div className="hero-enter" style={{ "--enter-delay": 0 } as CSSProperties}>
          <Breadcrumbs items={[{ name: t(`${page}.label`), path: pages[page].path }]} />
        </div>
        <p className="eyebrow hero-enter mt-8 mb-0" style={{ "--enter-delay": 1 } as CSSProperties}>
          {t(`${page}.eyebrow`)}
        </p>
        <SplitWords as="h1" text={t(`${page}.heading`)} accent={t(`${page}.accent`)} className="display-1 mt-5 max-w-[960px] text-[clamp(38px,5.6vw,72px)]" />
        <p className="hero-enter lead max-w-[680px]" style={{ "--enter-delay": 3 } as CSSProperties}>
          {t(`${page}.lead`)}
        </p>
        {children && (
          <div className="hero-enter mt-9" style={{ "--enter-delay": 4 } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
