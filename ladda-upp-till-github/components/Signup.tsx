"use client";
import { useState } from "react";
import type { Locale } from "@/lib/content";

type T = { title: string; lead: string; placeholder: string; button: string; ok: string; err: string };

export default function Signup({ t, locale }: { t: T; locale: Locale }) {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setState(r.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  }
  return (
    <section className="signup" id="signup">
      <h2>{t.title}</h2>
      <p className="lead">{t.lead}</p>
      {state === "ok" ? (
        <p className="signup-ok">{t.ok}</p>
      ) : (
        <form onSubmit={submit} className="signup-form">
          <input type="email" name="email" required placeholder={t.placeholder} aria-label="E-post / Email" />
          <button type="submit" className="btn" disabled={state === "busy"}>{t.button}</button>
        </form>
      )}
      {state === "err" && <p className="signup-err">{t.err}</p>}
    </section>
  );
}
