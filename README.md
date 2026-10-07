# Skriket från Yggdrasil – hemsida + butik

En Next.js-sajt som betjänar **både frånyggdrasil.se och fromyggdrasil.com** med identiskt innehåll:
- `.se` visar svenska som standard, `.com` engelska. Språkknappen i menyn byter och kommer ihåg valet.
- `idun.`, `eskil.` och `rurik.` (på båda domänerna) öppnar respektive karaktärssida.
- Butiken säljer via **Stripe Checkout** (SEK på svenska, EUR på engelska).

## Sidor
| Adress | Innehåll |
|---|---|
| `/` | Start: symbolen, pitch, trion, nio-böckersraden, e-postlista |
| `/idun` `/eskil` `/rurik` | Karaktärssidor: stående porträtt, citat, "Ur akten", kännetecken |
| `/shop` | Köp/förbeställ Bok 1 |
| `/shop/tack` | Tack-sida efter betalning |
| `/villkor` | Köpvillkor (MALL – fyll i dina uppgifter i `app/[locale]/villkor/page.tsx`) |

## Hur sidan publiceras
Vercel-projektet **franyggdrasil-web-liio** är kopplat till GitHub-repot **gupert/franyggdrasil-web** (gren `main`).
Allt som laddas upp till `main` publiceras automatiskt på fromyggdrasil.com, frånyggdrasil.se och franyggdrasil.se.
Lägg in inställningarna från `.env.example` under Vercel → Settings → Environment Variables.
Underdomänerna idun./eskil./rurik. läggs till under Vercel → Settings → Domains.

## Stripe
1. Skapa konto på stripe.com och aktivera det (företagsuppgifter, bankkonto).
2. Kopiera **Secret key** till `STRIPE_SECRET_KEY` (börja med `sk_test_...` för att testa, byt till `sk_live_...` när allt fungerar).
3. Valfritt: skapa produkten i Stripe och lägg in Price-ID:n i `STRIPE_PRICE_ID_SEK` / `STRIPE_PRICE_ID_EUR`. Annars används `BOOK_PRICE_SEK` / `BOOK_PRICE_EUR` (i ören/cent).
4. Lägg upp fraktpriser i Stripe (Produkter → Fraktpriser) och klistra in deras ID:n i `STRIPE_SHIPPING_RATES_SEK` / `_EUR`.
5. Betalsätt (kort, Apple Pay, Google Pay, Klarna m.m.) slås på i Stripe → Settings → Payment methods – sajten använder automatiskt det du aktiverar.
6. Testa med kortet `4242 4242 4242 4242`, valfritt framtida datum och CVC.
7. När boken går att köpa direkt: sätt `NEXT_PUBLIC_PREORDER=false` så står det "Köp" i stället för "Förbeställ".

Pris och texter som visas på sidan finns i `lib/content.ts` (`shop.price`) – ändra där om priset ändras.

## E-postlistan
Formuläret skickar `{email, locale, source, at}` som JSON till `SUBSCRIBE_WEBHOOK_URL` – den är redan inställd på er n8n-webhook (samma som den gamla sidan).

## Stående porträtt av trion
Lägg en bild per karaktär i `public/characters/` med namnet `idun.webp`, `eskil.webp`, `rurik.webp` (eller .jpg/.png), stående format ca 5:8 (t.ex. 1000×1600 px). Då ersätter bilden automatiskt skogen + sigillet i valvet, både på startsidan och karaktärssidan.

## Köra lokalt
```
npm install
npm run dev
```
Öppna http://localhost:3000 (svenska) – lägg till `?lang=en` för engelska.
