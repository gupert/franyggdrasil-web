import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/marcellus-sc/400.css";
import { getDict, isLocale, locales } from "@/lib/content";
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
    title: { default: t.meta.title, template: `%s · ${t.meta.title}` },
    description: t.meta.description,
    openGraph: { title: t.meta.title, description: t.meta.description, type: "website" },
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
