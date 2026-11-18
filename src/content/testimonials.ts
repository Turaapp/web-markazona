import type { AppLocale } from "@/i18n/routing";
import type { Tone } from "@/types/content";

export type Testimonial = {
  name: string;
  initials: string;
  tone: Tone;
  /** Quote and role in every language (keep the customer's original wording in their language). */
  quote: Record<AppLocale, string>;
  role: Record<AppLocale, string>;
};

/**
 * Only add REAL customer testimonials here, with the customer's consent.
 * The design contains sample quotes ("Témoignages d'exemple pour la maquette"),
 * so they are intentionally not published. The section stays hidden while
 * this list is empty. Section headings are in messages › testimonials.
 */
export const testimonials: Testimonial[] = [];
