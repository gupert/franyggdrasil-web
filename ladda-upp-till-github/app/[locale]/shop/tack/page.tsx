import Link from "next/link";
import { getDict, type Locale } from "@/lib/content";
import { EyeInBark } from "@/components/Art";

export default async function Thanks({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <section className="thanks">
      <EyeInBark size={110} />
      <h1>{t.thanks.title}</h1>
      <p className="lead">{t.thanks.body}</p>
      <p><Link className="btn" href="/">{t.thanks.back}</Link></p>
    </section>
  );
}
