import { useTranslations } from "next-intl";
import { principleIds } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Orbit } from "@/components/ui/Decor";
import type { IconName } from "@/types/content";

const principleIcons: Record<(typeof principleIds)[number], IconName> = { local: "pin", simple: "sparkle", trust: "shield" };

/** The About page story (from the product video's narrative) and guiding principles. */
export function AboutStory() {
  const t = useTranslations("about");
  const story = t.raw("story") as string[];
  return (
    <section aria-labelledby="story-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative lg:sticky lg:top-32 lg:self-start">
          <div className="relative overflow-hidden rounded-[28px] bg-navy p-10 text-white">
            <Orbit className="absolute -end-24 -bottom-24 size-80 text-white/10" rings={4} />
            <span className="font-sans text-[88px] leading-none font-extrabold text-brand-300">“</span>
            <p className="relative -mt-6 text-2xl leading-snug font-extrabold tracking-tight sm:text-3xl">{story[2]}</p>
          </div>
        </Reveal>
        <div>
          <Reveal as="h2" id="story-title" className="heading-3">
            {t("storyTitle")}
          </Reveal>
          <Reveal stagger className="mt-6 flex flex-col gap-5 text-[17px] leading-relaxed text-ink-2">
            {story.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal as="h2" className="heading-3 mt-16">
            {t("principlesTitle")}
          </Reveal>
          <Reveal stagger as="ul" className="mt-6 grid gap-4">
            {principleIds.map((id) => (
              <li key={id} className="card flex gap-5 p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon name={principleIcons[id]} size={20} />
                </span>
                <span>
                  <h3 className="text-lg font-extrabold">{t(`principles.${id}.title`)}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{t(`principles.${id}.description`)}</p>
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
