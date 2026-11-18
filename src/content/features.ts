/**
 * Structure of the marketing sections (order, icons, colours). All text lives
 * in messages/{locale}.json under the matching id. Everything listed here exists
 * in the product design (Claude Design canvas "Education Center SaaS").
 */
import type { IconName, Tone } from "@/types/content";

export const featureItems = [
  { id: "onlineEnrollment", icon: "inbox", tone: "primary" },
  { id: "studentsParents", icon: "users", tone: "teal" },
  { id: "timetable", icon: "calendar", tone: "info" },
  { id: "attendance", icon: "check", tone: "teal" },
  { id: "payments", icon: "wallet", tone: "saffron" },
  { id: "website", icon: "globe", tone: "primary" },
] as const satisfies readonly { id: string; icon: IconName; tone: Tone }[];

/**
 * Product tour tabs (homepage + features page). `screen` is a real capture of
 * the connected app (Claude Design artboard 20, demo organisation "Académie
 * Horizon") stored as public/images/product/app-{screen}-{fr|ar}.webp, 2880×1800.
 * The app has French and Arabic interfaces; English pages show the French one.
 */
export const showcaseTabs = [
  { id: "admissions", icon: "inbox", screen: "admissions", path: "admissions" },
  { id: "students", icon: "users", screen: "student-profile", path: "eleves/hz-25-0142" },
  { id: "timetable", icon: "calendar", screen: "timetable", path: "emploi-du-temps" },
  { id: "attendance", icon: "check", screen: "attendance", path: "presences" },
  { id: "finance", icon: "wallet", screen: "finance", path: "finance" },
  { id: "website", icon: "globe", screen: "website", path: "site-web" },
] as const satisfies readonly { id: string; icon: IconName; screen: string; path: string }[];

export const productScreen = (screen: string, locale: string) => `/images/product/app-${screen}-${locale === "ar" ? "ar" : "fr"}.webp`;

/** The 8 spaces of the app — one per role (icons from the product's space switcher; the student cap is replaced per BRAND.md). */
export const roleSpaces = [
  { id: "super", group: "platform", icon: "shield" },
  { id: "owner", group: "team", icon: "building" },
  { id: "manager", group: "team", icon: "pin" },
  { id: "reception", group: "team", icon: "inbox" },
  { id: "accountant", group: "team", icon: "wallet" },
  { id: "teacher", group: "team", icon: "board" },
  { id: "parent", group: "families", icon: "heart" },
  { id: "student", group: "families", icon: "user" },
] as const satisfies readonly { id: string; group: "platform" | "team" | "families"; icon: IconName }[];

export const solutionItems = [
  { id: "languages", tone: "primary" },
  { id: "tutoring", tone: "teal" },
  { id: "kids", tone: "saffron" },
  { id: "professional", tone: "info" },
  { id: "multi", tone: "gray" },
] as const satisfies readonly { id: string; tone: Tone }[];

export const comparisonIds = ["enrollment", "attendance", "payments", "timetable", "parents"] as const;

export const stepIds = ["create", "configure", "publish"] as const;

export const benefitIds = ["attendance", "unpaid", "cash", "branches"] as const;

export const trustItems = [
  { id: "isolation", icon: "lock" },
  { id: "permissions", icon: "shield" },
  { id: "receipts", icon: "receipt" },
  { id: "bilingual", icon: "languages" },
] as const satisfies readonly { id: string; icon: IconName }[];

export const faqIds = ["cardPayments", "arabic", "branches", "data", "domain", "setup", "commitment", "families", "roles"] as const;

export const principleIds = ["local", "simple", "trust"] as const;
