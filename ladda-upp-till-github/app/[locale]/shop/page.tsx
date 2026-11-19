import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/lib/content";
import BuyBox from "@/components/BuyBox";
import Signup from "@/components/Signup";
import BookFlip from "@/components/BookFlip";
import Preorder from "@/components/Preorder";
import { alternates } from "@/lib/seo";

// Egen butik via Stripe visas bara om NEXT_PUBLIC_STRIPE_SHOP=true
const STRIPE_SHOP = process.env.NEXT_PUBLIC_STRIPE_SHOP === "true";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDict(locale).nav.shop, alternates: alternates(locale, "/shop") };
}

export default async function Shop({ params }: P) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <section className="shop">
        <div className="shop-book">
          <BookFlip alt={t.meta.title} backAlt={t.hero.backCover} />
          <p className="book-hint">{t.hero.flipHint}</p>
        </div>
        <div className="shop-text">
          <p className="kicker">{t.shop.kicker}</p>
          <h1>{t.shop.title}</h1>
          <p className="lead">{t.shop.lead}</p>
          <ul className="format">{t.shop.format.map((f) => <li key={f}>{f}</li>)}</ul>
          <Preorder t={t.preorder} locale={locale} />
          {STRIPE_SHOP && <BuyBox t={t.shop} locale={locale} />}
          {STRIPE_SHOP && <p className="small"><Link href="/villkor">{t.shop.terms}</Link></p>}
        </div>
      </section>
      <Signup t={t.signup} locale={locale} />
    </>
  );
}
