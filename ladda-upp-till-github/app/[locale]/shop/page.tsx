import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/lib/content";
import BuyBox from "@/components/BuyBox";
import Signup from "@/components/Signup";
import BookFlip from "@/components/BookFlip";

const AMAZON_ASIN = "9190290003";
const AMAZON_MAIN = `https://www.amazon.se/dp/${AMAZON_ASIN}`;
const AMAZON_OTHER = [
  ["Amazon.de", `https://www.amazon.de/dp/${AMAZON_ASIN}`],
  ["Amazon.co.uk", `https://www.amazon.co.uk/dp/${AMAZON_ASIN}`],
  ["Amazon.com", `https://www.amazon.com/dp/${AMAZON_ASIN}`],
];
// Egen butik via Stripe visas bara om NEXT_PUBLIC_STRIPE_SHOP=true
const STRIPE_SHOP = process.env.NEXT_PUBLIC_STRIPE_SHOP === "true";

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
        <div className="shop-book">
          <BookFlip alt={t.meta.title} backAlt={t.hero.backCover} />
          <p className="book-hint">{t.hero.flipHint}</p>
        </div>
        <div className="shop-text">
          <p className="kicker">{t.shop.kicker}</p>
          <h1>{t.shop.title}</h1>
          <p className="lead">{t.shop.lead}</p>
          <ul className="format">{t.shop.format.map((f) => <li key={f}>{f}</li>)}</ul>
          <div className="buybox">
            <a className="btn btn-gold btn-big" href={AMAZON_MAIN} target="_blank" rel="noopener">{t.shop.amazon} →</a>
            <p className="small">{t.shop.amazonNote}</p>
            <p className="small muted">
              {t.shop.otherStores}{" "}
              {AMAZON_OTHER.map(([name, url], i) => (
                <span key={name}>{i > 0 && " · "}<a href={url} target="_blank" rel="noopener">{name}</a></span>
              ))}
            </p>
          </div>
          {STRIPE_SHOP && <BuyBox t={t.shop} locale={locale} />}
          {STRIPE_SHOP && <p className="small"><Link href="/villkor">{t.shop.terms}</Link></p>}
        </div>
      </section>
      <Signup t={t.signup} locale={locale} />
    </>
  );
}
