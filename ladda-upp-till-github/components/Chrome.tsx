import Link from "next/link";
import { EyeInBark } from "./Art";
import type { Locale } from "@/lib/content";
import { getDict } from "@/lib/content";

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
      <p className="small">
        <Link href="/villkor">{t.footer.terms}</Link> · frånyggdrasil.se · fromyggdrasil.com
      </p>
      <p className="small muted">© {new Date().getFullYear()} Skriket från Yggdrasil</p>
    </footer>
  );
}
