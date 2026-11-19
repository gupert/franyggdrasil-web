import Link from "next/link";
import { EyeInBark } from "./Art";
import type { Locale } from "@/lib/content";
import { getDict } from "@/lib/content";

// TikTok-konton per karaktär
export const TIKTOK: Partial<Record<"idun" | "rurik" | "eskil", string>> = {
  idun: "idunfromyggdrasil",
  rurik: "rurik.from.yggdras", // byts till "rurikfromyggdrasil" den 11 december
  eskil: "eskilfromyggdrasil",
};
export const tiktokUrl = (handle: string) => `https://www.tiktok.com/@${handle}`;

export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.6 2h-3.3v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V8.9a6.3 6.3 0 1 0 5.3 6.2V8.6a8 8 0 0 0 4.4 1.3V6.6a4.6 4.6 0 0 1-4.4-4.6Z" />
    </svg>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={t.meta.title}>
        <EyeInBark size={34} />
        <span>{t.meta.title}</span>
      </Link>
      <nav>
        <Link href="/#trion">{t.nav.trio}</Link>
        <Link href="/shop">{t.nav.shop}</Link>
        <a href={`?lang=${t.nav.otherCode}`} className="lang" hrefLang={t.nav.otherCode}>{t.nav.other}</a>
      </nav>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="site-footer">
      <EyeInBark size={44} />
      <p className="footer-title">{t.meta.title}</p>
      <p>{t.footer.author} · {t.footer.inspired}</p>
      <p className="footer-tiktok">
        {Object.values(TIKTOK).map((h) => (
          <a key={h} href={tiktokUrl(h!)} target="_blank" rel="noopener"><TikTokIcon size={16} /> @{h}</a>
        ))}
      </p>
      <p className="small">
        <Link href="/villkor">{t.footer.terms}</Link> · frånyggdrasil.se · fromyggdrasil.com
      </p>
      <p className="small muted">© {new Date().getFullYear()} Skriket från Yggdrasil</p>
    </footer>
  );
}
