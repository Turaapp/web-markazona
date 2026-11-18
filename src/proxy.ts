import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale routing: redirects "/" and unprefixed paths to the visitor's language
 * (NEXT_LOCALE cookie first, then the Accept-Language header, then French).
 */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next|_vercel|api|apple-icon|icon|opengraph-image|.*\\..*).*)"],
};
