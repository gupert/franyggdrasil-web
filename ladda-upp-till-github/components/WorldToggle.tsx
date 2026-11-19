"use client";
import { useState } from "react";

/* Klick på porträttet eller knapparna växlar mellan Midgård-kläder och läderrustning, fram och tillbaka. */
export default function WorldToggle({ children, labels }: { children: React.ReactNode; labels: [string, string] }) {
  const [vanaheim, setVanaheim] = useState(false);
  return (
    <div className={vanaheim ? "world-toggle show-vanaheim" : "world-toggle"}>
      <div onClick={() => setVanaheim((v) => !v)}>{children}</div>
      <div className="world-switch" role="group">
        <button type="button" aria-pressed={!vanaheim} onClick={() => setVanaheim(false)}>{labels[0]}</button>
        <button type="button" aria-pressed={vanaheim} onClick={() => setVanaheim(true)}>{labels[1]}</button>
      </div>
    </div>
  );
}
