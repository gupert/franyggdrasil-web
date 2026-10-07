"use client";
import { useState } from "react";
import type { Locale } from "@/lib/content";

type T = { qty: string; buy: string; preorder: string; preorderNote: string; secure: string; notReady: string; price: string };

export default function BuyBox({ t, locale }: { t: T; locale: Locale }) {
  const preorder = process.env.NEXT_PUBLIC_PREORDER !== "false";
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function checkout() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, quantity: qty }),
      });
      const data = await r.json();
      if (r.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setMsg(t.notReady);
    } catch {
      setMsg(t.notReady);
    }
    setBusy(false);
  }

  return (
    <div className="buybox">
      <div className="buybox-price">{t.price}</div>
      <label className="buybox-qty">
        {t.qty}
        <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <button className="btn btn-gold" onClick={checkout} disabled={busy}>
        {busy ? "…" : preorder ? t.preorder : t.buy}
      </button>
      {preorder && <p className="small">{t.preorderNote}</p>}
      <p className="small muted">{t.secure}</p>
      {msg && <p className="buybox-msg">{msg}</p>}
    </div>
  );
}
