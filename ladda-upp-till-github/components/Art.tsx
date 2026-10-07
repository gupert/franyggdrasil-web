import fs from "node:fs";
import path from "node:path";
import type { CharacterId } from "@/lib/content";

/* Ögat i barken – seriens symbol */
export function EyeInBark({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="60" cy="60" r="56" strokeWidth="1.2" opacity=".6" />
        <circle cx="60" cy="60" r="50" strokeWidth=".6" opacity=".4" />
        {/* barkens fåror */}
        <path d="M38 12 C34 34 42 46 36 60 C30 76 40 92 36 110" strokeWidth="1.4" opacity=".55" />
        <path d="M82 12 C86 34 78 46 84 60 C90 76 80 92 84 110" strokeWidth="1.4" opacity=".55" />
        <path d="M50 6 C48 22 52 30 49 40" strokeWidth="1" opacity=".45" />
        <path d="M70 6 C72 22 68 30 71 40" strokeWidth="1" opacity=".45" />
        <path d="M49 80 C52 92 47 102 50 114" strokeWidth="1" opacity=".45" />
        <path d="M71 80 C68 92 73 102 70 114" strokeWidth="1" opacity=".45" />
        {/* ögat */}
        <path d="M30 60 C42 44 78 44 90 60 C78 76 42 76 30 60 Z" strokeWidth="1.8" />
        <circle cx="60" cy="60" r="9" strokeWidth="1.6" />
      </g>
      <circle cx="60" cy="60" r="4" fill="currentColor" />
    </svg>
  );
}

/* Varje karaktärs föremål, tecknat med samma tunna linje */
export function Sigil({ id, size = 64 }: { id: CharacterId; size?: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {id === "idun" && (
        <g {...common}>
          <path d="M32 20 C24 12 10 16 10 32 C10 48 22 56 32 52 C42 56 54 48 54 32 C54 16 40 12 32 20 Z" />
          <path d="M32 20 C32 14 34 9 38 6" />
          <path d="M36 11 C42 6 50 8 50 8 C46 14 40 14 36 11 Z" />
        </g>
      )}
      {id === "eskil" && (
        <g {...common}>
          <rect x="12" y="10" width="34" height="44" rx="2" />
          <path d="M18 20 H40 M18 28 H40 M18 36 H34" opacity=".6" />
          <path d="M44 50 L56 14 L60 16 L48 52 Z" />
          <path d="M44 50 L45 56 L48 52" />
        </g>
      )}
      {id === "rurik" && (
        <g {...common}>
          <ellipse cx="32" cy="32" rx="22" ry="11" />
          <path d="M12 30 C18 36 22 26 28 32 C34 38 38 26 44 32 C48 36 52 30 52 30" />
          <path d="M12 34 C18 28 22 38 28 32 C34 26 38 38 44 32 C48 28 52 34 52 34" opacity=".7" />
        </g>
      )}
    </svg>
  );
}

function portraitSrc(id: CharacterId): string | null {
  // Lägg en stående bild i public/characters/<namn>.webp (eller .jpg/.png) så visas den automatiskt
  for (const ext of ["webp", "jpg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "characters", `${id}.${ext}`))) {
      return `/characters/${id}.${ext}`;
    }
  }
  return null;
}

/* Stående porträtt i jugendvalv. Utan bild: siluett av skog + karaktärens sigill. */
export function Portrait({ id, name, seal }: { id: CharacterId; name: string; seal: string }) {
  const src = portraitSrc(id);
  return (
    <div className="portrait" style={{ ["--seal" as string]: seal }}>
      <svg className="portrait-frame" viewBox="0 0 200 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 316 V110 C6 50 50 6 100 6 C150 6 194 50 194 110 V316 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 316 V112 C14 58 54 14 100 14 C146 14 186 58 186 112 V316" fill="none" stroke="currentColor" strokeWidth=".6" opacity=".5" />
      </svg>
      <div className="portrait-inner">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} />
        ) : (
          <svg viewBox="0 0 200 320" className="portrait-forest" aria-hidden="true">
            <defs>
              <linearGradient id={`fog-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--seal)" stopOpacity=".55" />
                <stop offset="1" stopColor="#0b0d0c" stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect width="200" height="320" fill={`url(#fog-${id})`} />
            {[18, 44, 150, 176].map((x, i) => (
              <path key={x} d={`M${x} 320 C${x - 3} 220 ${x + 4} 120 ${x + (i % 2 ? 2 : -2)} 0`} stroke="#0b0d0c" strokeWidth={i % 3 ? 9 : 13} opacity=".85" />
            ))}
            {[70, 128].map((x) => (
              <path key={x} d={`M${x} 320 C${x + 2} 230 ${x - 3} 140 ${x} 30`} stroke="#0b0d0c" strokeWidth="4" opacity=".5" />
            ))}
          </svg>
        )}
      </div>
      {!src && (
        <div className="portrait-sigil">
          <Sigil id={id} size={72} />
        </div>
      )}
    </div>
  );
}
