import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { toneChip } from "@/components/ui/tones";
import { cn } from "@/lib/utils";

/** Renders nothing until real testimonials are added to content/testimonials.ts. */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="px-4 py-24 sm:px-6">
      <div className="container-site">
        <SectionHeading id="testimonials-title" className="max-w-[640px]" eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {testimonials.map((item) => (
            <figure key={item.name} className="card m-0 flex flex-col gap-[18px]">
              <blockquote className="text-base leading-[1.65]">{item.quote[locale]}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className={cn("flex size-10 items-center justify-center rounded-full font-extrabold", toneChip[item.tone])} aria-hidden="true">
                  {item.initials}
                </span>
                <span>
                  <b className="block">{item.name}</b>
                  <span className="text-[13px] text-muted">{item.role[locale]}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
