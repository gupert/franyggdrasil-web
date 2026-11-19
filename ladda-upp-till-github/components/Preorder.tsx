"use client";
import { useState } from "react";
import type { Locale } from "@/lib/content";

type T = { button: string; placeholder: string; note: string; ok: string; err: string; release: string };

/* Förbeställning = anmälan med e-post. Skickas till n8n med source "forbestallning". */
export default function Preorder({ t, locale }: { t: T; locale: Locale }) {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source: "forbestallning" }),
      });
      setState(r.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }
  return (
    <div className="buybox preorder" id="forbestall">
      <p className="preorder-release">{t.release}</p>
      {state === "ok" ? (
        <p className="signup-ok">{t.ok}</p>
      ) : (
        <form onSubmit={submit} className="signup-form preorder-form">
          <input type="email" name="email" required placeholder={t.placeholder} aria-label="E-post / Email" />
          <button type="submit" className="btn btn-gold" disabled={state === "busy"}>{t.button}</button>
        </form>
      )}
      <p className="small">{t.note}</p>
      {state === "err" && <p className="signup-err">{t.err}</p>}
    </div>
  );
}
