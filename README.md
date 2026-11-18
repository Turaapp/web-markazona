# Markazona — site marketing

Public marketing website for **Markazona**, the management software for tutoring and training centres in Morocco (centres de soutien scolaire, language schools, kids' workshops, professional training).

This repository is **only the public website** — no dashboards, no authentication, no application logic. Links such as "Essai gratuit" and "Connexion" point to the separate Markazona app.

The design source is the Claude Design canvas *"Markazona — Education Center SaaS"*, artboard **03 · Site marketing Markazona**.

## Technologies

- Next.js 16 (App Router, Server Components, Cache Components + Partial Prefetching)
- React 19, TypeScript
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- `next/font` (Manrope, IBM Plex Sans Arabic) — self-hosted, no layout shift
- next-intl 4 for French, Arabic (RTL) and English
- Only the header navigation and language switcher are Client Components.

## Getting started

Requires Node.js 20.9+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages are prerendered static HTML) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

## Environment variables

All optional — defaults live in `src/config/site.ts`. Set them in Vercel › Project › Settings › Environment Variables.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain — canonical URLs, sitemap, Open Graph | `https://markazona.ma` |
| `NEXT_PUBLIC_SIGNUP_URL` | "Essai gratuit" / "Commencer" buttons | `https://app.markazona.ma/inscription` |
| `NEXT_PUBLIC_LOGIN_URL` | "Connexion" link | `https://app.markazona.ma/connexion` |
| `NEXT_PUBLIC_DEMO_URL` | "Voir la démo" and the dashboard preview | `https://app.markazona.ma/demo` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | "Parler à un conseiller" (digits only, e.g. `2126…`) | value from the design — **replace it** |

## Languages

The site is published in **French (default), Arabic and English** with [next-intl](https://next-intl.dev).

| URL | Language | `<html>` |
| --- | --- | --- |
| `/fr`, `/fr/pricing`, … | Français | `lang="fr" dir="ltr"` |
| `/ar`, `/ar/pricing`, … | العربية | `lang="ar" dir="rtl"` |
| `/en`, `/en/pricing`, … | English | `lang="en" dir="ltr"` |

- **Routing** — `src/i18n/routing.ts` (locales, default `fr`, prefix always). `src/proxy.ts` redirects `/` and unprefixed paths (`/pricing`) to the visitor's language: `NEXT_LOCALE` cookie → `Accept-Language` → French.
- **Persistence** — choosing a language sets the `NEXT_LOCALE` cookie for one year.
- **Switcher** — `components/layout/LanguageSwitcher.tsx`: dropdown in the header (keyboard: ↓/↑/Home/End/Esc), inline links in the mobile menu. Options are real links to the same page in the other language.
- **Loading** — `src/i18n/request.ts` loads only the active locale's file. Only the `navigation` and `language` namespaces are sent to the browser; everything else renders on the server.

## Project structure

```
messages/
├── fr.json                   # Reference dictionary (French)
├── ar.json                   # Modern Standard Arabic
└── en.json                   # English
scripts/check-i18n.mjs        # Key parity check (npm run i18n:check)
src/
├── proxy.ts                  # Locale detection + redirects
├── i18n/
│   ├── routing.ts            # Locales, cookie, per-locale dir / names / og:locale
│   ├── navigation.ts         # Locale-aware Link, usePathname, redirect
│   ├── request.ts            # Loads messages for the request
│   └── messages-check.ts     # Compile-time: ar/en must have every fr key
├── app/
│   ├── [locale]/             # Root layout (<html lang dir>, fonts, header/footer)
│   │   ├── page.tsx          # /{locale}            Homepage
│   │   ├── features/  solutions/  pricing/  about/  faq/  contact/
│   │   ├── [...rest]/        # Unknown paths → localized 404
│   │   ├── not-found.tsx
│   │   └── opengraph-image.tsx
│   ├── globals.css           # Tokens, design primitives, Arabic typography
│   ├── sitemap.ts            # 21 URLs with hreflang alternates
│   ├── robots.ts, manifest.ts, llms.txt/route.ts, icon.svg, apple-icon.tsx
├── components/
│   ├── layout/               # SiteHeader, SiteNav, LanguageSwitcher (client), SiteFooter, Logo
│   ├── sections/             # One component per designed section
│   └── ui/
├── config/site.ts            # Brand, URLs (language-independent)
├── content/                  # Structure only: ids, icons, colours, prices, page paths
├── lib/                      # seo.ts (metadata + hreflang), schema.ts (JSON-LD), utils.ts
└── types/
```

## Updating content and translations

All visible text lives in `messages/{fr,ar,en}.json` — components contain no copy. `src/content/` only says *which* items exist and in what order (ids, icons, colours, prices).

- **Change a sentence** → edit the same key in all three JSON files.
- **Add an item** (e.g. a feature) → add its id to `content/features.ts`, then add `features.items.<id>` to all three files.
- **Prices** → `content/pricing.ts`; plan names and feature lists → `pricing.plans.<id>` in the messages.
- **Testimonials** → `content/testimonials.ts` (only real ones; hidden while empty).

Namespaces: `metadata` (SEO per page), `navigation`, `language`, `hero`, `dashboard`, `features`, `solutions`, `howItWorks`, `benefits`, `pricing`, `testimonials`, `faq`, `cta`, `footer`, `notFound`, `schema`.

**Missing keys are caught three ways:** `t("…")` calls are typed against `fr.json` (typos fail `tsc`); `src/i18n/messages-check.ts` fails `tsc` if `ar.json`/`en.json` lack a key; `npm run i18n:check` also reports extra keys, empty values and mismatched list lengths. Run everything with:

```bash
npm run check     # i18n:check + typecheck + lint
```

Translation guidelines: French for the Moroccan market; Arabic in Modern Standard Arabic using Moroccan education terms (استعمال الزمن, التكوين, الأولى إعدادي, الثانية باكالوريا, نونبر); English in clear international English. The brand name stays "Markazona" in Latin script in every language.

## Brand & design system

Source of truth: the Claude Design canvas (Brand board, `branding/BRAND.md`).

- **Logos** — official files in `public/branding/` (outlined SVG wordmarks): `logo.svg` / `logo-dark.svg` on French and English pages, `logo-ar.svg` / `logo-ar-dark.svg` (مركزونا) on Arabic pages, chosen automatically by `components/layout/Logo.tsx`. Favicon, apple-touch icon and app icons come from the same kit (`src/app/favicon.ico`, `icon.svg`, `apple-icon.png`, `manifest.ts`); `branding/social-preview.png` is the Open Graph image for every page.
- **Colours** — tokens in `src/app/globals.css` (`@theme`): `navy` #13294B (brand, dark surfaces), `brand-*` = "Sarcelle action" #0E7C6A (buttons, links, accents — the only saturated UI colour), `teal-*` #14A38B (symbol, illustrations), `saffron-*` #F4A52E (the point, small highlights; never text on white), neutrals and status colours. Components use tokens only; remaining hex values are data (the sample centres' own theme colours) or WhatsApp's green (`--color-whatsapp`).
- **Type** — Manrope (Latin), Noto Kufi Arabic (Arabic headings), IBM Plex Sans Arabic (Arabic text), all via `next/font`.
- **Name** — "Markazona" in French/English text, "مركزونا" in Arabic text (`messages/ar.json`).
- **Icons** — 24 px, 2 px stroke, round (BRAND.md): no graduation caps, books or school buildings.
- **Motifs** — the brand's own: rings converging on the saffron point (the *markaz*) and the M's arches (`components/ui/Decor.tsx`).
- **Product visuals** are HTML/CSS recreations of screens from the product design with its demo data — translated, sharp, mirrored in RTL.
- **Motion** — no JavaScript: reveals (`[data-reveal]`, `[data-stagger]`, word-by-word `SplitWords`) and parallax (`[data-parallax]` + `--speed`) are CSS scroll-driven animations (`animation-timeline: view()`), so nothing mutates the server-rendered DOM (no hydration mismatches). Unsupported browsers and `prefers-reduced-motion` get the static page.

## Hero video

The design's hero is a 16:9 explainer video (music only — the narration is carried by subtitles). Player: `components/sections/HeroVideo.tsx`, built to the design's spec (poster `<img>` with high priority, muted teaser after 1.2 s unless reduced motion, full video with controls on click, captions on by default in the page language, transcript underneath).

The video files live in the design's asset store and must be exported manually. To publish:

1. Put these files in `public/videos/`: `markazona-explainer-poster.jpg` (1920×1080), `markazona-hero-teaser.mp4` (18 s, 720p, no audio), `markazona-explainer-16x9-web.mp4` (1080p).
2. Set `NEXT_PUBLIC_VIDEO_ENABLED=true` (Vercel env) and redeploy. Until then the hero shows the product dashboard.

Subtitles (Darija, French, English) are generated from `src/content/video.ts` with `npm run vtt`.

## RTL (Arabic)

- `dir="rtl"` on `<html>` flips the layout; components use logical utilities only (`ms-*`, `ps-*`, `start-*`, `end-*`, `border-s`, `text-start`) — never `left`/`right`.
- Arabic text uses IBM Plex Sans Arabic (`:lang(ar)`); Latin brand name, prices and times keep Manrope (`font-sans`).
- `globals.css` removes letter-spacing and uppercase for Arabic (they break letter joining) and increases line height for headings and paragraphs.
- The media "play" icon is intentionally not mirrored (universal convention).

## SEO

`lib/seo.ts › pageMetadata(locale, page)` produces, for each page and language: localized title and description, a **self-referencing canonical** (`/ar/pricing` canonicalizes to itself), `hreflang` alternates for `fr`, `ar`, `en` and `x-default` (the unprefixed URL, which redirects by language), localized Open Graph/Twitter tags with `og:locale` (`fr_MA`, `ar_MA`, `en_US`) and a social image with localized alt text.

Structured data (`lib/schema.ts`), in the page language:

| Type | Where |
| --- | --- |
| `Organization`, `WebSite` | every page |
| `SoftwareApplication` (+ offers in MAD) | home, features, pricing |
| `Service` (one per audience) | solutions |
| `FAQPage` | faq |
| `BreadcrumbList` | every inner page |

`/sitemap.xml` lists all 21 URLs with their alternates; `/llms.txt` has one section per language.

## Adding a marketing page

1. Add `{ path: "/my-page" }` to `content/pages.ts` (and to `mainNav`/`footerNav` if it belongs in the menus).
2. Add `metadata.pages.myPage` (`label`, `title`, `description`, `heading`, `lead`) and `navigation.items.myPage` to **all three** message files.
3. Create `src/app/[locale]/my-page/page.tsx`:

   ```tsx
   import type { AppLocale } from "@/i18n/routing";
   import { pageMetadata } from "@/lib/seo";
   import { PageHeader } from "@/components/sections/PageHeader";
   import { ContactCta } from "@/components/sections/ContactCta";

   export async function generateMetadata({ params }: PageProps<"/[locale]/my-page">) {
     const { locale } = await params;
     return pageMetadata(locale as AppLocale, "myPage");
   }

   export default function MyPage() {
     return (
       <>
         <PageHeader page="myPage" />
         <ContactCta />
       </>
     );
   }
   ```
4. The sitemap, hreflang and `llms.txt` pick it up automatically. Run `npm run check`.

## Adding a section

1. Put its text in the three message files under a new namespace, and any structure (ids, icons) in `content/`.
2. Create `components/sections/MySection.tsx` as a Server Component using `useTranslations("mySection")` and the design primitives (`container-site`, `card`, `eyebrow`, `heading-2`, `lead`, `<ButtonLink>`, `<SectionHeading>`).
3. Use logical utilities only, so it works in RTL. One `<h1>` per page; sections use `<h2>`, cards `<h3>`.

## Contact form

The design has no contact form — contact is via WhatsApp ("Parler à un conseiller") and the free-trial signup. To add one later you need: a form provider or API (e.g. Resend, Formspree, or the Markazona app's API), a Server Action that validates input and sends the message, spam protection (honeypot or Turnstile), and a privacy notice. Don't publish a form that doesn't actually deliver messages.

## Domain and Vercel deployment

1. Push the repository to GitHub/GitLab and import it in [Vercel](https://vercel.com/new). The framework preset is detected automatically; no build settings needed.
2. Set `NEXT_PUBLIC_SITE_URL` (and the other variables above) for the Production environment.
3. Vercel › Project › Domains: add `markazona.ma` and `www.markazona.ma`, set one as primary (the other redirects), and create the DNS records Vercel shows at your registrar.
4. Redeploy so canonical URLs and the sitemap use the domain.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Arabic and English pages are indexed independently.

## Before launch — to confirm

- Real app URLs (signup, login, demo) and the WhatsApp number.
- Prices in `content/pricing.ts` (taken from the design).
- A privacy policy page (the design's footer has a "Confidentialité" link with no destination; it is omitted until the page exists).
- Real customer testimonials, if any.
- The hero video files (see "Hero video").
- The production domain (default `markazona.ma`) and app host (`app.markazona.ma`).
- A review of `messages/ar.json` and `messages/en.json` by a native speaker before launch.
