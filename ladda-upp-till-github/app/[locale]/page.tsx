import Link from "next/link";
import { characterIds, getDict, type Locale } from "@/lib/content";
import { EyeInBark, Portrait } from "@/components/Art";
import Signup from "@/components/Signup";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <section className="hero">
        <EyeInBark size={150} className="hero-eye" />
        <p className="kicker">{t.hero.book}</p>
        <h1>{t.meta.title}</h1>
        <p className="slogan">{t.hero.slogan}</p>
        <div className="hero-cta">
          <Link className="btn btn-gold" href="/shop">{t.hero.ctaBuy}</Link>
          <Link className="btn" href="#trion">{t.hero.ctaMeet}</Link>
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
        <div className="trio-grid">
          {characterIds.map((id) => {
            const c = t.characters[id];
            return (
              <Link key={id} href={`/${id}`} className="trio-card">
                <Portrait id={id} name={c.name} seal={c.seal} />
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
