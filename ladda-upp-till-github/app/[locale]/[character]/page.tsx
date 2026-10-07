import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { characterIds, getDict, locales, type CharacterId, type Locale } from "@/lib/content";
import { Portrait, Sigil } from "@/components/Art";

type P = { params: Promise<{ locale: Locale; character: string }> };
const isChar = (v: string): v is CharacterId => (characterIds as string[]).includes(v);

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => characterIds.map((character) => ({ locale, character })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, character } = await params;
  if (!isChar(character)) return {};
  const c = getDict(locale).characters[character];
  return { title: c.name, description: `${c.name} – ${c.epithet}. ${c.intro[0]}` };
}

export default async function CharacterPage({ params }: P) {
  const { locale, character } = await params;
  if (!isChar(character)) notFound();
  const t = getDict(locale);
  const c = t.characters[character];
  const others = characterIds.filter((id) => id !== character);

  return (
    <article className="character" style={{ ["--seal" as string]: c.seal }}>
      <div className="character-hero">
        <div className="character-portrait">
          <Portrait id={c.id} name={c.name} seal={c.seal} />
        </div>
        <div className="character-text">
          <p className="kicker">{t.trio.kicker}</p>
          <h1>{c.name}</h1>
          <p className="epithet">{c.epithet}</p>
          <blockquote className="quote">– {c.quote}</blockquote>
          {c.intro.map((p, i) => <p key={i}>{p}</p>)}
          <dl className="facts">
            <div><dt>{t.character.age}</dt><dd>13</dd></div>
            <div><dt>{t.character.hair}</dt><dd>{c.hair}</dd></div>
            <div><dt>{t.character.arrived}</dt><dd>{c.arrived}</dd></div>
            <div><dt>{t.character.sealNote}</dt><dd><span className="seal-dot" /></dd></div>
          </dl>
        </div>
      </div>

      <section className="dossier">
        <header>
          <h2>{t.character.file}</h2>
          <p className="small muted">{t.character.fileNote}</p>
        </header>
        <ul>
          {c.file.map((f, i) => (
            <li key={i}><span className="dossier-label">{f.label}</span><span>{f.text}</span></li>
          ))}
        </ul>
        <div className="dossier-sigil"><Sigil id={c.id} size={56} /></div>
      </section>

      <section className="traits">
        <h2>{t.character.traits}</h2>
        <ul>{c.traits.map((tr) => <li key={tr}>{tr}</li>)}</ul>
      </section>

      <section className="others">
        <h2>{t.character.others}</h2>
        <div className="others-grid">
          {others.map((id) => {
            const o = t.characters[id];
            return (
              <Link key={id} href={`/${id}`} className="other" style={{ ["--seal" as string]: o.seal }}>
                <Sigil id={id} size={44} />
                <span><strong>{o.name}</strong><em>{o.epithet}</em></span>
              </Link>
            );
          })}
        </div>
        <p className="center"><Link className="btn btn-gold" href="/shop">{t.hero.ctaBuy}</Link></p>
      </section>
    </article>
  );
}
