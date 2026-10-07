import type { Metadata } from "next";
import type { Locale } from "@/lib/content";

/* MALL – fyll i [hakparenteserna] innan butiken öppnar. */
const SELLER = {
  name: "Skriket från Yggdrasil [företagsform, t.ex. enskild firma C G Martini]",
  orgnr: "[organisationsnummer]",
  address: "[postadress]",
  email: "[kontakt@frånyggdrasil.se]",
};

const sv = {
  title: "Köpvillkor",
  sections: [
    ["Säljare", `${SELLER.name}, org.nr ${SELLER.orgnr}, ${SELLER.address}. E-post: ${SELLER.email}.`],
    ["Priser och betalning", "Alla priser anges i svenska kronor inklusive moms (6 % på böcker). Frakt visas i kassan innan du betalar. Betalningen hanteras av Stripe; vi tar aldrig del av dina kortuppgifter."],
    ["Förbeställning och leverans", "Vid förbeställning dras betalningen när du beställer och boken skickas så snart den är tryckt. Beräknad leveranstid anges på produktsidan. Blir utgivningen försenad mer än 30 dagar mejlar vi dig, och du kan då välja att häva köpet och få pengarna tillbaka."],
    ["Ångerrätt", "Du har 14 dagars ångerrätt enligt distansavtalslagen, räknat från dagen du tar emot boken. Meddela oss via e-post. Du står för returfrakten. Vi återbetalar inom 14 dagar från att vi fått ditt meddelande och boken."],
    ["Reklamation", "Är boken skadad eller felaktig har du rätt att reklamera enligt konsumentköplagen i tre år. Kontakta oss med en bild så ordnar vi en ny bok eller återbetalning."],
    ["Personuppgifter", "Vi använder dina uppgifter enbart för att leverera din beställning och, om du skrivit upp dig, för att skicka nyheter om serien. Du kan när som helst avregistrera dig."],
    ["Tvister", "Vi försöker alltid lösa problem direkt med dig. Annars kan du vända dig till Allmänna reklamationsnämnden (arn.se) eller EU:s tvistlösningsplattform (ec.europa.eu/odr)."],
  ],
};

const en = {
  title: "Terms of sale",
  sections: [
    ["Seller", `${SELLER.name}, reg. no. ${SELLER.orgnr}, ${SELLER.address}, Sweden. Email: ${SELLER.email}.`],
    ["Prices and payment", "Prices include VAT. Shipping is shown at checkout before you pay. Payments are handled by Stripe; we never see your card details."],
    ["Pre-orders and delivery", "Pre-orders are charged when you order and ship as soon as the book is printed. If publication is delayed by more than 30 days we will email you, and you may cancel for a full refund."],
    ["Right of withdrawal", "You have a 14-day right of withdrawal from the day you receive the book. Let us know by email. Return shipping is at your cost. We refund within 14 days of receiving your notice and the book."],
    ["Faulty goods", "If the book is damaged or faulty, contact us with a photo and we will send a new copy or refund you."],
    ["Personal data", "We only use your details to deliver your order and, if you signed up, to send news about the series. You can unsubscribe at any time."],
    ["Disputes", "We always aim to solve problems directly with you. You may also use the EU Online Dispute Resolution platform (ec.europa.eu/odr)."],
  ],
};

type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { title: (locale === "en" ? en : sv).title };
}

export default async function Terms({ params }: P) {
  const { locale } = await params;
  const t = locale === "en" ? en : sv;
  return (
    <section className="terms">
      <h1>{t.title}</h1>
      {t.sections.map(([h, p]) => (
        <div key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </div>
      ))}
    </section>
  );
}
