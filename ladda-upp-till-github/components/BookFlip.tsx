"use client";
import { useState } from "react";

/* Bokomslaget: musen över visar baksidan, klick/tryck vänder fram och tillbaka. */
export default function BookFlip({ alt, backAlt }: { alt: string; backAlt: string }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  return (
    <div
      className={flipped ? "book3d flipped" : "book3d"}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
    >
      <div className="book3d-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face front" src="/art/omslag.webp" alt={alt} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face back" src="/art/baksida.webp" alt={backAlt} />
      </div>
    </div>
  );
}
