import { useTranslations } from "next-intl";
import { solutionItems } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arches } from "@/components/ui/Decor";
import { toneChip, toneHex, toneText } from "@/components/ui/tones";
import { cn } from "@/lib/utils";

/** Bento grid: the two largest audiences get wide cards. */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Solutions() {
  const t = useTranslations("solutions");
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section-y">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="solutions-title" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} className="max-w-[680px]" />
          <Reveal as="p" delay={2} className="max-w-[380px] text-[17px] leading-relaxed text-muted">
            {t("aside")}
          </Reveal>
        </div>
        <Reveal stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {solutionItems.map((s, i) => {
            const title = t(`items.${s.id}.title`);
            const tags = t.raw(`items.${s.id}.tags`) as string[];
            const wide = i < 2;
            return (
              <li key={s.id} className={cn("card card-hover group relative flex flex-col overflow-hidden p-7", spans[i], i === 4 && "sm:col-span-2 lg:col-span-2")}>
                <Arches className="absolute -end-6 -bottom-8 h-32 w-36 text-ink opacity-[0.06] transition-[transform,opacity] duration-700 group-hover:-translate-y-2 group-hover:opacity-[0.12]" strokeWidth={1.5} />
                <div className={cn("relative text-xs font-extrabold tracking-wide uppercase", toneText[s.tone])}>
                  <span className="me-2 inline-block size-2 rounded-full align-middle" style={{ background: toneHex[s.tone] }} />
                  {t(`items.${s.id}.category`)}
                </div>
                <h3 className={cn("relative mt-4 font-extrabold tracking-tight", wide ? "text-2xl" : "text-xl")}>{title}</h3>
                <p className="relative mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">{t(`items.${s.id}.description`)}</p>
                <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={t("tagsLabel", { title })}>
                  {tags.map((tag) => (
                    <li key={tag} className={cn("rounded-full px-3 py-1 text-xs font-bold", toneChip[s.tone])}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
