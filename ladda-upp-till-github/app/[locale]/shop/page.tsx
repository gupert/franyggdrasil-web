import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/lib/content";
import { EyeInBark } from "@/components/Art";
import BuyBox from "@/components/BuyBox";
import Signup from "@/components/Signup";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.shop };
}

export default async function Shop({ params }: P) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <section className="shop">
        <div className="book-cover" aria-hidden="true">
          <div className="cover-inner">
            <EyeInBark size={90} />
            <span className="cover-title">{t.meta.title}</span>
            <span className="cover-author">C G Martini</span>
          </div>
        </div>
        <div className="shop-text">
          <p className="kicker">{t.shop.kicker}</p>
          <h1>{t.shop.title}</h1>
          <p className="lead">{t.shop.lead}</p>
          <ul className="format">{t.shop.format.map((f) => <li key={f}>{f}</li>)}</ul>
          <BuyBox t={t.shop} locale={locale} />
          <p className="small"><Link href="/villkor">{t.shop.terms}</Link></p>
        </div>
      </section>
      <Signup t={t.signup} locale={locale} />
    </>
  );
}
