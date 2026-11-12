import { NextRequest, NextResponse } from "next/server";

/*
 * Ett och samma bygge betjänar båda domänerna:
 *   frånyggdrasil.se (xn--frnyggdrasil-*.se)  → svenska som standard
 *   fromyggdrasil.com                          → engelska som standard
 * Språkväljaren (?lang=sv|en) sparar valet i en cookie och vinner över domänen.
 * Underdomänerna idun. / eskil. / rurik. visar respektive karaktärssida.
 */

const LOCALES = ["sv", "en"] as const;
type Locale = (typeof LOCALES)[number];
const CHARACTERS = ["idun", "eskil", "rurik"];

function localeFromHost(host: string): Locale {
  const h = host.toLowerCase().split(":")[0];
  if (h.endsWith(".com")) return "en";
  return "sv"; // .se, förhandsvisningar och localhost
}

// De riktiga domänerna har ALLTID sitt eget språk: .se = svenska, .com = engelska.
const SV_DOMAIN = /(^|\.)(xn--frnyggdrasil-ucb\.se|frånyggdrasil\.se|franyggdrasil\.se)$/;
const EN_DOMAIN = /(^|\.)fromyggdrasil\.com$/;
const SITE = { sv: "https://www.xn--frnyggdrasil-ucb.se", en: "https://www.fromyggdrasil.com" };

function fixedLocale(host: string): Locale | null {
  const h = host.toLowerCase().split(":")[0];
  if (SV_DOMAIN.test(h)) return "sv";
  if (EN_DOMAIN.test(h)) return "en";
  return null; // förhandsvisning/localhost: språkväljaren styr
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  const queryLang = url.searchParams.get("lang");
  const fixed = fixedLocale(host);

  // skriket.frånyggdrasil.se → köpsidan på frånyggdrasil.se
  if (host.toLowerCase().startsWith("skriket.")) {
    return NextResponse.redirect(new URL("/shop", SITE.sv), 308);
  }

  // På de riktiga domänerna byter språkknappen domän (samma sida)
  if (fixed && (queryLang === "sv" || queryLang === "en")) {
    if (queryLang === fixed) {
      url.searchParams.delete("lang");
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL(url.pathname, SITE[queryLang]));
  }

  // Explicit språkval via länk: spara och städa bort parametern ur adressen
  if (queryLang === "sv" || queryLang === "en") {
    url.searchParams.delete("lang");
    const res = NextResponse.redirect(url);
    res.cookies.set("lang", queryLang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  // Gamla/direkta /sv/... eller /en/...-länkar → ren adress + rätt språk
  const first = url.pathname.split("/")[1];
  if ((LOCALES as readonly string[]).includes(first)) {
    url.pathname = url.pathname.slice(first.length + 1) || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set("lang", first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  const cookieLang = req.cookies.get("lang")?.value;
  const locale: Locale =
    fixed ?? (cookieLang === "sv" || cookieLang === "en" ? cookieLang : localeFromHost(host));

  // idun.fromyggdrasil.com → karaktärssidan
  const sub = host.toLowerCase().split(".")[0];
  let path = url.pathname;
  if (CHARACTERS.includes(sub) && path === "/") path = `/${sub}`;

  url.pathname = `/${locale}${path === "/" ? "" : path}`;
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
