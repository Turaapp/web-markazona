import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CampusSite, EditorialSite } from "@/components/sections/themes/SitePreviews";
import { ThemePlayground } from "@/components/sections/themes/ThemePlayground";

/**
 * "Public website" — the two themes of the product's public school website v3
 * (Campus and Éditorial), with the design's sample centres. Visitors switch
 * theme and pick a centre colour; shades are derived from it, as in the product.
 */

/** Sample centre colours: the two design defaults first, then other brand-safe choices. */
const COLORS = ["#0E6E63", "#3B6BDB", "#5B3FB8", "#B4532A", "#1B2340"];

export function ThemeShowcase() {
  const t = useTranslations("themes");
  const chips = t.raw("chips") as string[];
  const colorNames = t.raw("preview.colors") as string[];

  const themes = [
    {
      id: "campus",
      name: t("campus.name"),
      description: t("campus.description"),
      defaultColor: COLORS[0],
      url: "academie-horizon.ma",
      label: t("preview.previewLabel", { theme: t("campus.name") }),
    },
    {
      id: "editorial",
      name: t("editorial.name"),
      description: t("editorial.description"),
      defaultColor: COLORS[1],
      url: "excellenceplus.ma",
      label: t("preview.previewLabel", { theme: t("editorial.name") }),
    },
  ];

  return (
    <section id="themes" aria-labelledby="themes-title" className="section-y relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#F7F3EC_100%)]">
      <div className="container-site">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading id="themes-title" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
          <Reveal stagger as="ul" className="flex flex-wrap gap-2 lg:justify-end">
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-bold text-ink-2 shadow-xs">
                <Icon name="tick" size={14} strokeWidth={2.6} className="text-brand-500" />
                {c}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal variant="scale" className="mt-14">
          <ThemePlayground
            themes={themes}
            previews={[<CampusSite key="campus" />, <EditorialSite key="editorial" />]}
            colors={COLORS.map((hex, i) => ({ hex, label: colorNames[i] }))}
            switchLabel={t("preview.switchLabel")}
            colorLabel={t("preview.colorLabel")}
          />
        </Reveal>

        <Reveal as="p" className="mx-auto mt-12 max-w-[640px] text-center text-sm text-muted">
          {t("note")}
        </Reveal>
      </div>
    </section>
  );
}
