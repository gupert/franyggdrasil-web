import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/marcellus-sc/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import { getDict, isLocale, locales } from "@/lib/content";
import { SITE } from "@/lib/seo";
import { Header, Footer } from "@/components/Chrome";
import "../globals.css";


export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL(SITE[locale]),
    title: { default: t.meta.title, template: `%s · ${t.meta.title}` },
    description: t.meta.description,
    applicationName: t.meta.title,
    authors: [{ name: "C G Martini" }],
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      siteName: t.meta.title,
      locale: locale === "sv" ? "sv_SE" : "en_GB",
      images: [{ url: `/art/og-${locale}.jpg`, width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [`/art/og-${locale}.jpg`] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
