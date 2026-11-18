/**
 * Plans and prices (MAD / month). Names, descriptions and feature lists are in
 * messages/{locale}.json › pricing.plans.<id>.
 * TODO: confirm these prices before launch — they come from the design.
 */
export const pricingPlans = [
  { id: "essential", priceMad: 299, cta: "signup", highlighted: false },
  { id: "pro", priceMad: 599, cta: "signup", highlighted: true },
  { id: "network", priceMad: null, cta: "contact", highlighted: false },
] as const satisfies readonly {
  id: string;
  priceMad: number | null;
  cta: "signup" | "contact";
  highlighted: boolean;
}[];
