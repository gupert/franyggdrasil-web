import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, locale } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const hook =
    process.env.SUBSCRIBE_WEBHOOK_URL ??
    "https://n8n.fromyggdrasil.com/webhook/8b3b3fee-a056-43bd-b051-57a4e09f1ff6";
  if (!hook) {
    console.warn("SUBSCRIBE_WEBHOOK_URL saknas – e-post loggas bara:", email);
    return NextResponse.json({ ok: true, stored: false });
  }
  const r = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, locale: locale === "en" ? "en" : "sv", source: "website", at: new Date().toISOString() }),
  });
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "webhook_failed" }, { status: 502 });
}
