import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/*
 * Official Markazona logo files (public/branding, from Claude Design › branding).
 * Wordmarks are outlined paths, so they render identically everywhere.
 * - Latin pages: logo.svg / logo-dark.svg  (symbol + "Markazona")
 * - Arabic pages: logo-ar.svg / logo-ar-dark.svg (مركزونا, symbol on the right)
 */
const files = {
  latin: { light: "/branding/logo.svg", dark: "/branding/logo-dark.svg", ratio: 311.8 / 64 },
  arabic: { light: "/branding/logo-ar.svg", dark: "/branding/logo-ar-dark.svg", ratio: 223.7 / 64 },
} as const;

type Props = {
  /** "light" for light backgrounds (primary logo), "dark" for navy/dark surfaces. */
  tone?: "light" | "dark";
  /** Rendered height in px (brand minimum: 96 px wide for the primary logo). */
  height?: number;
  priority?: boolean;
  className?: string;
};

export function LogoImage({ tone = "light", height = 36, priority, className }: Props) {
  const locale = useLocale();
  const t = useTranslations("metadata");
  const set = locale === "ar" ? files.arabic : files.latin;
  return (
    <Image
      src={set[tone]}
      alt={t("siteName")}
      width={Math.round(height * set.ratio)}
      height={height}
      priority={priority}
      unoptimized
      className={cn("block h-auto max-w-none select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}

/** Header/footer logo linking to the home page. */
export function Logo({ tone = "light", height = 36, priority = false }: Omit<Props, "className">) {
  const t = useTranslations("navigation");
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={t("homeLink")}>
      <LogoImage tone={tone} height={height} priority={priority} />
    </Link>
  );
}

/** The symbol tile alone (decorative). */
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <Image src="/branding/logo-icon.svg" alt="" width={size} height={size} unoptimized aria-hidden="true" className={cn("shrink-0", className)} />
  );
}
