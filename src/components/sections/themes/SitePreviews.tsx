import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/*
 * Miniature public websites, built from the product's "Public school website v3"
 * (Claude Design › AppSite / App design system: classes .ws, .w-hero, .w-stats,
 * .w-card…). Same sections, same sample centres, same data as the design:
 * Campus = Académie Horizon (Rabat), Éditorial = Centre Excellence Plus (Fès).
 * Colours come from CSS variables (--sp = the centre's colour), so the
 * playground can recolour them live. Decorative: wrapped in aria-hidden.
 */

type Program = { name: string; meta: string; price: string };

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SiteNav({ org, initials, editorial }: { org: string; initials: string; editorial?: boolean }) {
  const t = useTranslations("themes");
  const nav = t.raw("nav") as string[];
  return (
    <div className={cn("flex items-center gap-4 border-b border-[var(--w-line)] px-[4cqw] py-3", editorial ? "bg-[var(--w-bg)]" : "bg-[var(--sp-50)]/70")}>
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          className={cn(
            "relative flex size-9 shrink-0 items-center justify-center overflow-hidden text-[12px] font-extrabold text-white",
            editorial ? "rounded-full bg-[var(--w-ink)]" : "rounded-[11px] bg-[var(--sp)]",
          )}
        >
          {initials}
          {!editorial && <span className="absolute -end-1.5 -bottom-1.5 size-4 rounded-full bg-[var(--ac)]" />}
        </span>
        <b className="truncate font-[family-name:var(--w-fh)] text-[15px] tracking-tight">{org}</b>
      </span>
      <span className="mx-auto hidden gap-5 text-[12.5px] font-semibold text-[var(--w-ink2)] @2xl:flex">
        {nav.map((n, i) => (
          <span key={n} className={cn("relative", i === 0 && "text-[var(--sp-d)]")}>
            {n}
            {i === 0 && !editorial && <span className="absolute -bottom-2 start-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[var(--ac)] rtl:translate-x-1/2" />}
          </span>
        ))}
      </span>
      <span className={cn("ms-auto shrink-0 rounded-full px-3.5 py-2 text-[12px] font-bold text-white @2xl:ms-0", editorial ? "bg-[var(--w-ink)]" : "bg-[var(--sp)]")}>
        {t("preview.registerNow")}
      </span>
    </div>
  );
}

function ProgramCard({ p, i, editorial, perMonth, view }: { p: Program; i: number; editorial?: boolean; perMonth: string; view: string }) {
  const shapes = [
    <circle key="c" cx="70" cy="40" r="26" fill="var(--sp)" opacity=".85" />,
    <rect key="r" x="40" y="18" width="50" height="50" rx="10" fill="var(--ac)" opacity=".9" transform="rotate(12 65 43)" />,
    <path key="p" d="M20 70 Q60 10 110 60" fill="none" stroke="var(--sp-d)" strokeWidth="9" strokeLinecap="round" />,
  ];
  return (
    <div className={cn("flex flex-col overflow-hidden border border-[var(--w-line)] bg-[var(--w-bg)]", editorial ? "rounded-[6px]" : "rounded-[18px]")}>
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--sp-50)]">
        <svg viewBox="0 0 130 80" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="130" height="80" fill="var(--sp-50)" />
          {shapes[i % shapes.length]}
          <circle cx="20" cy="18" r="6" fill="var(--sp-100)" />
        </svg>
      </div>
      <div className="relative flex flex-1 flex-col gap-1.5 p-4 pt-6">
        <span
          className={cn(
            "absolute -top-4 end-4 flex h-8 items-center px-3 text-[12px] font-extrabold",
            editorial ? "rounded-[4px] bg-[var(--w-ink)] text-[var(--w-bg)]" : "rounded-full bg-[var(--ac)] text-[#2A1A05] shadow-[0_10px_20px_-10px_var(--ac)]",
          )}
        >
          <span className="num">{p.price}</span>&nbsp;{perMonth}
        </span>
        <b className="font-[family-name:var(--w-fh)] text-[15px] leading-snug tracking-tight">{p.name}</b>
        <span className="text-[11.5px] font-semibold text-[var(--w-ink3)]">{p.meta}</span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[12px] font-bold text-[var(--sp-d)]">
          {view} <Arrow />
        </span>
      </div>
    </div>
  );
}

export function CampusSite() {
  const t = useTranslations("themes");
  const title = t("campus.title");
  const accent = t("campus.accent");
  const [before] = title.split(accent);
  const programs = t.raw("preview.campusPrograms") as Program[];
  const stats = [
    { v: "412", l: t("preview.stats.students") },
    { v: "10", l: t("preview.stats.teachers") },
    { v: "8", l: t("preview.stats.programs") },
    { v: "3", l: t("preview.stats.branches") },
  ];
  return (
    <div className="site-campus bg-[var(--w-bg)] font-[family-name:var(--w-fb)] text-[var(--w-ink)]">
      <SiteNav org={t("campus.org")} initials="AH" />
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[var(--sp-50)] to-[var(--w-bg)] px-[4cqw] pt-8 pb-20">
        <span className="absolute top-6 start-[3%] size-24 bg-[radial-gradient(var(--sp)_1.4px,transparent_1.5px)] bg-[length:13px_13px] opacity-20" />
        <div className="relative grid items-center gap-6 @2xl:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[var(--sp-d)]">
              <i className="flex size-6 items-center justify-center rounded-full bg-[var(--sp-50)] not-italic">★</i>
              {t("campus.eyebrow")}
            </span>
            <div className="mt-3 font-[family-name:var(--w-fh)] text-[clamp(24px,4.6cqw,48px)] leading-[1.04] font-extrabold tracking-[-0.035em] rtl:leading-[1.3] rtl:tracking-normal">
              {before}
              <span className="relative whitespace-nowrap text-[var(--sp)] rtl:whitespace-normal">
                {accent}
                <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.18em] h-[0.34em] w-full overflow-visible" aria-hidden="true">
                  <path d="M2 14 C 50 4 150 4 198 12" fill="none" stroke="var(--ac)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <p className="mt-4 max-w-[420px] text-[13px] leading-relaxed text-[var(--w-ink2)]">{t("campus.lead")}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--sp)] px-4 text-[12.5px] font-bold text-white shadow-[0_14px_28px_-14px_var(--sp)]">
                {t("preview.registerNow")} <Arrow />
              </span>
              <span className="inline-flex h-10 items-center rounded-full border-[1.5px] border-[var(--w-line)] bg-[var(--w-bg)] px-4 text-[12.5px] font-bold">{t("preview.explore")}</span>
            </div>
            <div className="mt-5 flex items-center gap-3 text-[12px] text-[var(--w-ink2)]">
              <span className="flex">
                {["SB", "YM", "KA", "IF"].map((ini, i) => (
                  <span
                    key={ini}
                    className="-ms-2.5 flex size-8 items-center justify-center rounded-full border-2 border-[var(--w-bg)] text-[10px] font-extrabold first:ms-0"
                    style={{ background: ["var(--sp-100)", "var(--ac)", "var(--sp-50)", "#E7DFD0"][i] }}
                  >
                    {ini}
                  </span>
                ))}
              </span>
              <b className="text-[var(--w-ink)]">{t("preview.proof", { n: 412 })}</b>
            </div>
          </div>
          {/* Visual: dashed ring, brand disc, arch, floating chips */}
          <div className="relative mx-auto hidden h-[300px] w-full max-w-[380px] @2xl:block">
            <span className="absolute end-[2%] top-[2%] aspect-square w-[82%] rounded-full border-2 border-dashed border-[var(--sp-100)]" />
            <span className="absolute end-[8%] top-[9%] aspect-square w-[70%] rounded-full bg-[var(--sp)]" />
            <div className="absolute end-[14%] bottom-0 h-[88%] w-[62%] overflow-hidden rounded-t-full rounded-b-[22px] bg-[var(--sp-d)] shadow-[0_40px_80px_-30px_rgba(20,38,46,.45)]">
              <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
                <rect width="200" height="260" fill="var(--sp-d)" />
                <circle cx="150" cy="70" r="46" fill="var(--ac)" opacity=".9" />
                <path d="M-10 210 Q60 140 130 200 T260 170 V260 H-10Z" fill="var(--sp)" />
                <path d="M30 120 h70" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".35" />
                <path d="M30 145 h45" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".25" />
              </svg>
            </div>
            <div className="absolute top-[10%] start-0 flex items-center gap-2.5 rounded-2xl bg-white p-2.5 text-[#14262E] shadow-[0_26px_50px_-20px_rgba(20,38,46,.35)] [animation:site-float_7s_ease-in-out_infinite]">
              <i className="flex size-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--ac)_18%,#fff)] text-[#9A5B07] not-italic">✓</i>
              <span>
                <b className="block text-[12.5px]">{t("preview.free")}</b>
                <span className="block text-[11px] text-[#7A878C]">{t("preview.freeD")}</span>
              </span>
            </div>
            <div className="absolute start-[-2%] bottom-[12%] flex max-w-[230px] items-center gap-2.5 rounded-2xl bg-white p-2.5 text-[#14262E] shadow-[0_26px_50px_-20px_rgba(20,38,46,.35)] [animation:site-float_7s_ease-in-out_-2.4s_infinite]">
              <i className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sp-50)] text-[var(--sp-d)] not-italic">◷</i>
              <span className="min-w-0">
                <span className="block text-[9.5px] font-bold tracking-wide uppercase">{t("preview.nextClass")}</span>
                <b className="block truncate text-[12.5px]">{programs[0].name}</b>
                <span className="block text-[11px] text-[#7A878C]">{t("preview.nextWhen")}</span>
              </span>
            </div>
            <div className="absolute end-[-2%] top-[44%] rounded-2xl bg-white px-3 py-2 text-center text-[#14262E] shadow-[0_26px_50px_-20px_rgba(20,38,46,.35)] [animation:site-float_7s_ease-in-out_-4.8s_infinite]">
              <b className="num block text-[20px] tracking-tight">412</b>
              <span className="block text-[10.5px] text-[#7A878C]">{t("preview.stats.students")}</span>
            </div>
          </div>
        </div>
        <svg className="absolute inset-x-0 -bottom-px h-10 w-full text-[var(--w-bg)]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 C 360 90 1080 -10 1440 40 V80 H0Z" fill="currentColor" />
        </svg>
      </div>
      {/* Stats band overlapping the hero */}
      <div className="relative z-10 mx-[4cqw] -mt-12 grid grid-cols-2 overflow-hidden rounded-[18px] border border-[var(--w-line)] bg-[var(--w-bg)] shadow-[0_30px_60px_-30px_rgba(20,38,46,.28)] @2xl:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className={cn("flex items-center gap-3 p-4", i > 0 && "border-s border-[var(--w-line)]", i === 2 && "@max-2xl:border-s-0 @max-2xl:border-t", i === 3 && "@max-2xl:border-t")}>
            <span className="num font-[family-name:var(--w-fh)] text-[24px] leading-none font-extrabold tracking-tight">{s.v}</span>
            <span className="text-[11.5px] leading-tight text-[var(--w-ink2)]">{s.l}</span>
          </div>
        ))}
      </div>
      {/* Programmes */}
      <div className="px-[4cqw] pt-10 pb-10">
        <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[var(--sp-d)]">
          <i className="flex size-6 items-center justify-center rounded-full bg-[var(--sp-50)] not-italic">◆</i>
          {t("preview.programsKick")}
        </span>
        <div className="mt-2 font-[family-name:var(--w-fh)] text-[clamp(20px,2.8cqw,30px)] font-extrabold tracking-[-0.03em] rtl:tracking-normal">{t("preview.programsTitle")}</div>
        <div className="mt-8 grid gap-4 @2xl:grid-cols-3">
          {programs.map((p, i) => (
            <div key={p.name} className={cn(i === 2 && "hidden @2xl:block")}>
              <ProgramCard p={p} i={i} perMonth={t("preview.perMonth")} view={t("preview.view")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditorialSite() {
  const t = useTranslations("themes");
  const title = t("editorial.title");
  const accent = t("editorial.accent");
  const [before] = title.split(accent);
  const programs = t.raw("preview.editorialPrograms") as Program[];
  return (
    <div className="site-editorial bg-[var(--w-bg)] font-[family-name:var(--w-fb)] text-[var(--w-ink)]">
      <SiteNav org={t("editorial.org")} initials="EP" editorial />
      {/* Hero */}
      <div className="border-b border-[var(--w-line)] px-[5cqw] pt-10 pb-12">
        <div className="grid items-center gap-8 @2xl:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--w-ink2)] uppercase rtl:tracking-normal">{t("editorial.eyebrow")}</span>
            <div className="mt-3 font-[family-name:var(--w-fh)] text-[clamp(28px,5.2cqw,56px)] leading-none font-medium tracking-[-0.02em] rtl:leading-[1.3] rtl:font-bold rtl:tracking-normal">
              {before}
              <em className="text-[var(--sp-d)] rtl:not-italic">{accent}</em>
            </div>
            <p className="mt-4 max-w-[420px] text-[13px] leading-relaxed text-[var(--w-ink2)]">{t("editorial.lead")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--sp)] px-4 text-[12.5px] font-bold text-white">
                {t("editorial.primary")} <Arrow />
              </span>
              <span className="inline-flex h-10 items-center rounded-full border-[1.5px] border-[var(--w-line)] px-4 text-[12.5px] font-bold">{t("editorial.secondary")}</span>
            </div>
          </div>
          <div className="relative hidden h-[260px] overflow-hidden rounded-[8px] bg-[var(--s2)] @2xl:block">
            <svg viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
              <rect width="300" height="260" fill="var(--s2)" />
              <path d="M40 260 V120 a70 70 0 0 1 140 0 V260" fill="var(--sp)" />
              <circle cx="230" cy="70" r="34" fill="var(--ac)" />
              <path d="M200 200 h70 M200 222 h48" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".3" />
            </svg>
            <span className="absolute start-4 bottom-4 rounded-[4px] bg-[var(--w-bg)] px-3 py-2 text-[var(--w-ink)]">
              <span className="block text-[10px] font-semibold tracking-[0.12em] text-[var(--w-ink3)] uppercase rtl:tracking-normal">{t("preview.nextClass")}</span>
              <b className="block text-[12.5px]">
                {programs[0].name} · {t("preview.nextWhen")}
              </b>
            </span>
          </div>
        </div>
      </div>
      {/* Programmes */}
      <div className="bg-[var(--w-bg2)] px-[5cqw] pt-10 pb-10">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--w-ink2)] uppercase rtl:tracking-normal">{t("preview.programsKick")}</span>
        <div className="mt-2 font-[family-name:var(--w-fh)] text-[clamp(22px,3cqw,32px)] font-medium tracking-[-0.02em] rtl:font-bold rtl:tracking-normal">{t("preview.programsTitle")}</div>
        <div className="mt-8 grid gap-4 @2xl:grid-cols-3">
          {programs.map((p, i) => (
            <ProgramCard key={p.name} p={p} i={i} editorial perMonth={t("preview.perMonth")} view={t("preview.view")} />
          ))}
          <div className="hidden flex-col justify-between rounded-[6px] bg-[var(--w-ink)] p-5 text-[var(--w-bg)] @2xl:flex">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase opacity-70 rtl:tracking-normal">{t("preview.families")}</span>
            <span className="font-[family-name:var(--w-fh)] text-[18px] leading-snug italic rtl:not-italic">{t("preview.editorialNote")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
