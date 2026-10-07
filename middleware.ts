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

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  const queryLang = url.searchParams.get("lang");

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
    cookieLang === "sv" || cookieLang === "en" ? cookieLang : localeFromHost(host);

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
