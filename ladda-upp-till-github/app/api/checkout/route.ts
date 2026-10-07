import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SHIP_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "SE", "NO", "DK", "FI", "IS", "DE", "AT", "CH", "NL", "BE", "FR", "GB", "IE", "PL", "EE", "LV", "LT", "US", "CA",
];

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "shop_not_configured" }, { status: 503 });

  const body = await req.json().catch(() => ({}));
  const locale: "sv" | "en" = body.locale === "en" ? "en" : "sv";
  const quantity = Math.min(Math.max(parseInt(body.quantity, 10) || 1, 1), 5);
  const preorder = process.env.NEXT_PUBLIC_PREORDER !== "false";
  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host")}`;

  const currency = locale === "sv" ? "sek" : "eur";
  const priceId = locale === "sv" ? process.env.STRIPE_PRICE_ID_SEK : process.env.STRIPE_PRICE_ID_EUR;
  const amount = Number(locale === "sv" ? process.env.BOOK_PRICE_SEK ?? 24900 : process.env.BOOK_PRICE_EUR ?? 2400);
  const shippingRates = (locale === "sv" ? process.env.STRIPE_SHIPPING_RATES_SEK : process.env.STRIPE_SHIPPING_RATES_EUR)
    ?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  const line_item: Stripe.Checkout.SessionCreateParams.LineItem = priceId
    ? { price: priceId, quantity }
    : {
        quantity,
        price_data: {
          currency,
          unit_amount: amount,
          product_data: {
            name: locale === "sv" ? "Skriket från Yggdrasil – Bok 1 (pocket)" : "The Scream from Yggdrasil – Book 1 (paperback, Swedish edition)",
            description: preorder
              ? locale === "sv" ? "Förbeställning – skickas när boken är tryckt." : "Pre-order – ships when the book is printed."
              : undefined,
          },
        },
      };

  const stripe = new Stripe(key);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [line_item],
      locale,
      shipping_address_collection: { allowed_countries: SHIP_COUNTRIES },
      ...(shippingRates.length ? { shipping_options: shippingRates.map((shipping_rate) => ({ shipping_rate })) } : {}),
      phone_number_collection: { enabled: false },
      metadata: { preorder: String(preorder), site_locale: locale },
      success_url: `${origin}/shop/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe checkout error", e);
    return NextResponse.json({ error: "stripe_error" }, { status: 500 });
  }
}
