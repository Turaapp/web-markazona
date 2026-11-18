import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  // An explicit locale wins (e.g. getTranslations({ locale }) in route handlers);
  // otherwise read the [locale] root segment.
  const candidate = explicitLocale ?? (await rootLocale());
  const locale = hasLocale(routing.locales, candidate) ? candidate : routing.defaultLocale;

  return {
    locale,
    // Only the active locale's dictionary is loaded.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
