import type { routing } from "@/i18n/routing";
import type messages from "../../messages/fr.json";

/**
 * Types every t("…") call against messages/fr.json, so a typo or a missing
 * key fails `tsc`. Parity of ar.json / en.json is checked in src/i18n/messages-check.ts
 * and scripts/check-i18n.mjs.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
