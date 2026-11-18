import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Localized 404, rendered inside the locale layout (header + footer). */
export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <title>{t("metaTitle")}</title>
      <meta name="robots" content="noindex" />
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="heading-2">{t("title")}</h1>
      <p className="lead max-w-[520px]">{t("lead")}</p>
      <div className="mt-7">
        <ButtonLink href="/">{t("cta")}</ButtonLink>
      </div>
    </div>
  );
}
