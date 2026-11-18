import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { BrowserFrame } from "@/components/ui/Frames";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * The owner's overview screen from the product design (demo organisation
 * "Académie Horizon"), rebuilt in HTML/CSS: sharp at any size, translated,
 * no image request, mirrors automatically in RTL.
 */
const sidebar = [
  { id: "overview", icon: "chart" },
  { id: "admissions", icon: "inbox" },
  { id: "students", icon: "users" },
  { id: "academics", icon: "layers" },
  { id: "timetable", icon: "calendar" },
  { id: "attendance", icon: "check" },
  { id: "finance", icon: "wallet" },
  { id: "website", icon: "globe" },
] as const;

const bars = [62, 66, 70, 68, 74, 50, 42, 80, 88, 96];

const sessions = [
  { time: "14:00", id: "englishKids", cls: "bg-brand-50 border-brand-500" },
  { time: "15:30", id: "maths", cls: "bg-teal-50 border-teal-500" },
  { time: "16:00", id: "robotics", cls: "bg-saffron-50 border-saffron-500" },
  { time: "18:30", id: "frenchAdults", cls: "bg-info-50 border-info-500" },
] as const;

export function DashboardPreview({ className }: { className?: string }) {
  const t = useTranslations("dashboard");
  const stats = [
    { label: t("stats.students"), value: "412", trend: "+18" },
    { label: t("stats.sessionsToday"), value: "27" },
    { label: t("stats.revenue"), value: "186 450", unit: t("currency"), trend: "+6%" },
    { label: t("stats.attendance"), value: t("attendanceValue"), accent: true },
  ];

  return (
    <a href={siteConfig.links.demo} aria-label={t("linkLabel")} className={cn("group block text-start text-ink hover:text-ink", className)}>
      <BrowserFrame url={`${siteConfig.appHost}/horizon`} className="transition-transform duration-700 ease-out group-hover:-translate-y-1">
        <div aria-hidden="true" className="flex min-h-[440px] text-[13px]">
          <div className="hidden w-[208px] shrink-0 flex-col gap-1 border-e border-line-soft bg-white px-3 py-4 font-semibold text-ink-2 md:flex">
            <div className="mb-4 flex items-center gap-2 px-1.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#0E6E63] text-[11px] font-extrabold text-white">
                {t("centerInitials")}
              </span>
              <span className="truncate font-extrabold text-ink">{t("centerName")}</span>
            </div>
            {sidebar.map((item, i) => (
              <span
                key={item.id}
                className={cn("flex items-center gap-2.5 rounded-[9px] px-2.5 py-2", i === 0 ? "bg-brand-50 font-bold text-brand-700" : "text-ink-2")}
              >
                <Icon name={item.icon} size={16} />
                {t(`sidebar.${item.id}`)}
              </span>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4 bg-surface p-4 sm:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xl font-extrabold tracking-tight">{t("greeting")}</div>
                <div className="mt-0.5 text-xs font-semibold text-faint">{t("subGreeting")}</div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="size-8 rounded-full bg-gradient-to-br from-saffron-300 to-saffron-500 ring-2 ring-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[14px] border border-line bg-white p-3.5 shadow-xs">
                  <div className="text-[11px] font-bold text-muted">{s.label}</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className={cn("num font-sans text-[22px] font-extrabold tracking-tight", s.accent && "text-teal-700")}>{s.value}</span>
                    {s.unit && <span className="text-[11px] font-bold text-muted">{s.unit}</span>}
                    {s.trend && <span className="num ms-auto rounded-full bg-teal-50 px-1.5 py-0.5 font-sans text-[10px] font-bold text-teal-700">{s.trend}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">
              <div className="flex flex-col rounded-[14px] border border-line bg-white p-4 shadow-xs">
                <div className="text-[13px] font-extrabold">{t("revenueChart")}</div>
                <div className="mt-4 flex min-h-[150px] flex-1 items-end gap-2">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-t-md",
                        i === bars.length - 1 ? "bg-brand-500" : i === bars.length - 2 ? "bg-brand-300" : "bg-brand-100",
                      )}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-white p-4 shadow-xs">
                <div className="text-[13px] font-extrabold">{t("upcoming")}</div>
                {sessions.map((s) => (
                  <div key={s.time} className={cn("rounded-lg border-s-[3px] px-2.5 py-2 text-xs", s.cls)}>
                    <b className="font-sans">{s.time}</b> {t(`sessions.${s.id}`)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </a>
  );
}
