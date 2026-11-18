import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

/** Public marketing site: everything is crawlable, including AI search crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
