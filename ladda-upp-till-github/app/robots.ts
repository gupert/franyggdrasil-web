import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const base = host.endsWith(".com") ? SITE.en : SITE.sv;
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/shop/tack"] }, sitemap: `${base}/sitemap.xml` };
}
