import type { Viewport } from "next";
import { headers } from "next/headers";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0d0c" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = (await headers()).get("x-locale") === "en" ? "en" : "sv";
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
