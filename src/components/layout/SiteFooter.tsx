import { useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/config/site";
import { pages } from "@/content/pages";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";

export function SiteFooter() {
  const t = useTranslations();
  const columns = [
    { title: t("footer.product"), links: (["features", "solutions", "pricing"] as const).map((k) => ({ href: pages[k].path, label: t(`navigation.items.${k}`) })) },
    { title: t("footer.company"), links: (["about", "faq", "contact"] as const).map((k) => ({ href: pages[k].path, label: t(`navigation.items.${k}`) })) },
  ];
  const linkCls = "text-on-dark/80 transition-colors hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo tone="dark" height={38} />
          <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-on-dark">{t("footer.tagline")}</p>
          <address className="mt-6 flex items-center gap-2 text-sm text-on-dark not-italic">
            <Icon name="pin" size={16} className="text-brand-300" />
            {t("footer.location")}
          </address>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-xs font-extrabold tracking-[0.12em] text-on-dark/60 uppercase">{col.title}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-xs font-extrabold tracking-[0.12em] text-on-dark/60 uppercase">{t("footer.getStarted")}</h2>
          <ul className="mt-5 flex flex-col gap-3 text-[15px]">
            <li>
              <a href={siteConfig.links.signup} className={linkCls}>
                {t("navigation.freeTrial")}
              </a>
            </li>
            <li>
              <a href={siteConfig.links.login} className={linkCls}>
                {t("navigation.login")}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} className={`${linkCls} inline-flex items-center gap-2`}>
                <Icon name="message" size={16} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-on-dark/70 sm:flex-row">
          <span>{t("footer.rights", { year: siteConfig.copyrightYear })}</span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-saffron-500" aria-hidden="true" />
            {t("footer.madeIn")}
          </span>
        </div>
      </div>
    </footer>
  );
}
