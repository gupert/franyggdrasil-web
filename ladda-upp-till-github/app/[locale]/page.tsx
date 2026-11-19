import Link from "next/link";
import { characterIds, getDict, type Locale } from "@/lib/content";
import { EyeInBark, Portrait } from "@/components/Art";
import Signup from "@/components/Signup";
import BookFlip from "@/components/BookFlip";
import type { Metadata } from "next";
import { alternates, SITE } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, "/") };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            { "@context": "https://schema.org", "@type": "WebSite", name: t.meta.title, alternateName: ["Skriket från Yggdrasil", "The Scream from Yggdrasil"], url: SITE[locale] + "/", inLanguage: locale },
            {
              "@context": "https://schema.org",
              "@type": "Book",
              name: t.meta.title,
              author: { "@type": "Person", name: "C G Martini" },
              bookFormat: "https://schema.org/Paperback",
              inLanguage: "sv",
              genre: "Fantasy",
              typicalAgeRange: "12-",
              datePublished: "2026-12-01",
              image: SITE[locale] + "/art/omslag.webp",
              description: t.meta.description,
              url: SITE[locale] + "/shop",
            },
          ]),
        }}
      />
      <section className="hero cover-hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-text">
            <EyeInBark size={70} className="hero-eye" />
            <p className="kicker">{t.hero.book}</p>
            <h1>{t.hero.titleTop}<small>{t.hero.titleMid}</small>{t.hero.titleBottom}</h1>
            <p className="slogan">{t.hero.slogan}</p>
            <p className="hero-release">{t.hero.release}</p>
            <div className="hero-cta">
              <Link className="btn btn-gold" href="/shop#forbestall">{t.hero.ctaBuy}</Link>
              <Link className="btn" href="#trion">{t.hero.ctaMeet}</Link>
            </div>
          </div>
          <div className="hero-book">
            <BookFlip alt={t.meta.title} backAlt={t.hero.backCover} />
            <p className="book-hint">{t.hero.flipHint}</p>
          </div>
        </div>
      </section>

      <section className="pitch">
        <p className="kicker">{t.pitch.kicker}</p>
        {t.pitch.body.map((p, i) => (
          <p key={i} className={i === t.pitch.body.length - 1 ? "pitch-last" : ""}>{p}</p>
        ))}
      </section>

      <section className="trio" id="trion">
        <p className="kicker">{t.trio.kicker}</p>
        <h2>{t.trio.title}</h2>
        <p className="lead">{t.trio.lead}</p>
        <p className="hover-hint">{t.character.hoverHint}</p>
        <div className="trio-grid">
          {characterIds.map((id) => {
            const c = t.characters[id];
            return (
              <Link key={id} href={`/${id}`} className="trio-card">
                <Portrait id={id} name={c.name} seal={c.seal} labels={t.character.worlds} />
                <h3>{c.name}</h3>
                <p className="epithet">{c.epithet}</p>
                <p className="trio-quote">– {c.quote}</p>
                <span className="trio-meet">{t.trio.meet} {c.name} →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="series">
        <p className="kicker">{t.series.kicker}</p>
        <h2>{t.series.title}</h2>
        <ol className="books">
          {t.series.books.map((b, i) => (
            <li key={i} className={i === 0 ? "book now" : i === 1 ? "book next" : "book"}>
              <span className="book-num">{["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][i]}</span>
              <span className="book-title">{b}</span>
              {i === 0 && <span className="book-tag">{t.series.now}</span>}
              {i === 1 && <span className="book-tag">{t.series.next}</span>}
            </li>
          ))}
        </ol>
      </section>

      <Signup t={t.signup} locale={locale} />
    </>
  );
}
