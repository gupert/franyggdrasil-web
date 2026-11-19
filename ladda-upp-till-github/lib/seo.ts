import type { Metadata } from "next";
import type { Locale } from "./content";

export const SITE = { sv: "https://www.xn--frnyggdrasil-ucb.se", en: "https://www.fromyggdrasil.com" } as const;

/* Kanonisk adress + språkversioner för en sida (path börjar med "/") */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: SITE[locale] + path,
    languages: { sv: SITE.sv + path, en: SITE.en + path, "x-default": SITE.sv + path },
  };
}
