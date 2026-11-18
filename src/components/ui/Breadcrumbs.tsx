import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { localizedPath } from "@/lib/utils";

type Crumb = { name: string; path: string };

/** Localized breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const trail = [{ name: t("metadata.pages.home.label"), path: "/" }, ...items];

  return (
    <nav aria-label={t("navigation.breadcrumbLabel")} className="text-sm font-semibold text-muted">
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="text-muted hover:text-ink">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ name: c.name, url: localizedPath(locale, c.path) })))} />
    </nav>
  );
}
