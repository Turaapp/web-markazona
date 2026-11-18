import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { roleSpaces } from "@/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchPattern, Orbit } from "@/components/ui/Decor";

/** The 8 role-based spaces of the app — Markazona's signature section (dark, brand orbit motif). */
export function RoleSpaces() {
  const t = useTranslations("roles");
  return (
    <section id="spaces" aria-labelledby="spaces-title" className="section-y relative isolate overflow-hidden bg-navy text-white">
      <ArchPattern id="arches-roles" className="text-white" opacity={0.04} />
      <div className="absolute start-1/2 top-0 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl rtl:translate-x-1/2" aria-hidden="true" />

      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading id="spaces-title" tone="dark" eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} lead={t("lead")} />
          <div className="relative hidden h-56 lg:block" aria-hidden="true">
            <div data-parallax="" style={{ "--speed": 0.08 } as CSSProperties} className="absolute inset-0 flex items-center justify-center">
              <Orbit className="size-60 text-brand-300/35" rings={4} dot={false} />
              <span className="absolute font-sans text-7xl font-extrabold tracking-tighter text-white">8</span>
            </div>
          </div>
        </div>

        <Reveal stagger as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {roleSpaces.map((role) => (
            <li
              key={role.id}
              className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-6 transition-[background-color,border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div aria-hidden="true" className="absolute -end-10 -top-10 size-32 rounded-full bg-teal-500 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-white/15 transition-colors duration-500 group-hover:bg-teal-500 group-hover:text-white">
                  <Icon name={role.icon} size={20} />
                </span>
                <span className="text-[11px] font-bold tracking-wide text-on-dark/70 uppercase">{t(`groups.${role.group}`)}</span>
              </div>
              <h3 className="relative mt-6 text-lg font-extrabold">{t(`items.${role.id}.name`)}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-on-dark">{t(`items.${role.id}.description`)}</p>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex items-center justify-center gap-3 text-center text-sm font-semibold text-on-dark">
          <span className="flex size-8 items-center justify-center rounded-full bg-teal-300/15 text-teal-300">
            <Icon name="shield" size={17} />
          </span>
          {t("note")}
        </Reveal>
      </div>
    </section>
  );
}
