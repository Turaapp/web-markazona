import { Reveal, SplitWords } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  /** Part of the title rendered in the serif accent (must appear verbatim in title). */
  accent?: string;
  lead?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  as?: "h1" | "h2";
};

/** Eyebrow + word-reveal headline + lead, used by every section. */
export function SectionHeading({ eyebrow, title, accent, lead, align = "start", tone = "light", className, id, as = "h2" }: Props) {
  return (
    <div className={cn("max-w-[760px]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal as="p" variant="fade" className={cn("eyebrow", tone === "dark" && "text-brand-300")}>
          {eyebrow}
        </Reveal>
      )}
      <SplitWords as={as} id={id} text={title} accent={accent} className={cn("heading-2", tone === "dark" && "text-white [&_.headline-accent]:text-brand-300")} />
      {lead && (
        <Reveal as="p" delay={2} className={cn("lead", tone === "dark" && "text-on-dark", align === "center" && "mx-auto max-w-[640px]")}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}
