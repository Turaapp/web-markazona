import { notFound } from "next/navigation";

/** Unknown paths under a locale (e.g. /ar/xyz) render the localized 404. */
export default function CatchAll() {
  notFound();
}
