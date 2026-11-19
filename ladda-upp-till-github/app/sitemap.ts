import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE } from "@/lib/seo";

const PATHS = ["", "/shop", "/idun", "/eskil", "/rurik"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? "";
  const base = host.endsWith(".com") ? SITE.en : SITE.sv;
  return PATHS.map((p) => ({
    url: base + (p || "/"),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : p === "/shop" ? 0.9 : 0.7,
    alternates: { languages: { sv: SITE.sv + (p || "/"), en: SITE.en + (p || "/") } },
  }));
}
