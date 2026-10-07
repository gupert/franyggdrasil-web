export type Locale = "sv" | "en";
export const locales: Locale[] = ["sv", "en"];
export const isLocale = (v: string): v is Locale => v === "sv" || v === "en";

export type CharacterId = "idun" | "eskil" | "rurik";
export const characterIds: CharacterId[] = ["idun", "eskil", "rurik"];

export type Character = {
  id: CharacterId;
  name: string;
  seal: string; // färgen på Hervors sigill
  epithet: string;
  hair: string;
  arrived: string;
  intro: string[];
  file: { label: string; text: string }[];
  quote: string;
  traits: string[];
};

type Dict = {
  meta: { title: string; description: string };
  nav: { home: string; trio: string; shop: string; other: string; otherCode: string };
  hero: { book: string; slogan: string; ctaBuy: string; ctaMeet: string };
  pitch: { kicker: string; body: string[] };
  trio: { kicker: string; title: string; lead: string; meet: string; age: string };
  series: { kicker: string; title: string; books: string[]; now: string; next: string };
  signup: { title: string; lead: string; placeholder: string; button: string; ok: string; err: string };
  shop: {
    kicker: string;
    title: string;
    lead: string;
    format: string[];
    price: string;
    qty: string;
    buy: string;
    preorder: string;
    preorderNote: string;
    secure: string;
    notReady: string;
    terms: string;
  };
  thanks: { title: string; body: string; back: string };
  character: {
    file: string;
    fileNote: string;
    traits: string;
    hair: string;
    arrived: string;
    age: string;
    others: string;
    sealNote: string;
  };
  footer: { author: string; inspired: string; terms: string };
  characters: Record<CharacterId, Character>;
};

const sv: Dict = {
  meta: {
    title: "Skriket från Yggdrasil",
    description:
      "Bok 1 av 9. Trettiofem år efter Ragnarök. Tre trettonåringar, ett hus av granit och ett träd som minns allt.",
  },
  nav: { home: "Start", trio: "Trion", shop: "Butik", other: "English", otherCode: "en" },
  hero: {
    book: "Bok 1 av 9",
    slogan: "Trädet minns allt.",
    ctaBuy: "Förbeställ boken",
    ctaMeet: "Möt trion",
  },
  pitch: {
    kicker: "35 år efter Ragnarök",
    body: [
      "En bil kör genom regnet mot Asplunda – ett ungdomshem av granit, där rötterna tränger in i stenen och fönstren sväljer ljuset.",
      "Tre trettonåringar som ingen vill ha. En pojke med ett skissblock och ett mönster han ritat sedan dagen hans mor försvann. En pojke med ärr på knogarna som tappat räkningen på hemmen. En flicka med ett rött äpple, som hör vad kråkorna säger.",
      "Under huset slår något. Rytmiskt. Djupt inne i stenen.",
    ],
  },
  trio: {
    kicker: "Asplunda ungdomshem",
    title: "Möt trion",
    lead: "Alla tre kom till Asplunda på sin trettonårsdag. Alla tre kördes dit av samma man.",
    meet: "Möt",
    age: "13 år",
  },
  series: {
    kicker: "Serien",
    title: "Nio böcker. Nio världar.",
    books: [
      "Skriket från Yggdrasil",
      "Brevet från Yggdrasil",
      "Bok 3",
      "Bok 4",
      "Bok 5",
      "Bok 6",
      "Bok 7",
      "Bok 8",
      "Bok 9",
    ],
    now: "Nu",
    next: "Nästa",
  },
  signup: {
    title: "Hör när trädet skriker",
    lead: "Få besked när boken släpps, nya karaktärer vaknar och förbeställningar öppnar.",
    placeholder: "din@e-post.se",
    button: "Skriv upp mig",
    ok: "Tack. Trädet har noterat dig.",
    err: "Något gick fel. Försök igen om en stund.",
  },
  shop: {
    kicker: "Butik",
    title: "Skriket från Yggdrasil – Bok 1",
    lead: "Första boken i serien. Pocket på krämvitt papper, med ett omslag i nordisk noir som löper runt hela boken.",
    format: ["Pocket", "Svenska", "Från 12 år", "C G Martini"],
    price: "249 kr",
    qty: "Antal",
    buy: "Köp",
    preorder: "Förbeställ",
    preorderNote: "Förbeställning – boken skickas så snart den är tryckt. Du får ett mejl när den är på väg.",
    secure: "Säker betalning via Stripe – kort, Apple Pay, Google Pay med flera.",
    notReady: "Butiken öppnar inom kort. Skriv upp dig nedan så hör vi av oss.",
    terms: "Köpvillkor",
  },
  thanks: {
    title: "Tack för din beställning",
    body: "Ett kvitto är på väg till din e-post. När boken lämnar tryckeriet får du ett nytt mejl.",
    back: "Tillbaka till start",
  },
  character: {
    file: "Ur akten",
    fileNote: "Statens pärm, Asplunda ungdomshem",
    traits: "Kännetecken",
    hair: "Hår",
    arrived: "Kom till Asplunda",
    age: "Ålder",
    others: "De andra två",
    sealNote: "Sigillets färg",
  },
  footer: { author: "C G Martini", inspired: "Inspirerad av Eskil Larsson", terms: "Köpvillkor" },
  characters: {
    eskil: {
      id: "eskil",
      name: "Eskil",
      seal: "#1f3a6b",
      epithet: "Han som ritar mönstret",
      hair: "Rött",
      arrived: "På sin trettonårsdag",
      intro: [
        "Eskil sitter i baksätet med skissblocket mot låren. Höger hand arbetar av sig själv. Han har ritat samma mönster sedan dagen då hans mor försvann – dagen efter hans sexårsdag.",
        "Han rättar till det som står snett. Lampan mot klockan. Glasen på hyllan, med lika små mellanrum. Räta linjer håller, sa hans mor.",
      ],
      file: [
        { label: "Teckningar", text: "Samma motiv om och om igen – en falk, en get, en ekorre med yvig svans." },
        { label: "Anteckning", text: "Mellan djurskisserna: en cirkel. Linjerna är exakta." },
      ],
      quote: "Är jag ensam om att tycka att det här huset är skevt?",
      traits: ["Skissblocket", "Räta linjer", "Tar orden bokstavligt", "Tänker innan han vågar"],
    },
    rurik: {
      id: "rurik",
      name: "Rurik",
      seal: "#7a1c1c",
      epithet: "Han som räknar ärren",
      hair: "Svart",
      arrived: "På sin trettonårsdag",
      intro: [
        "Svart hår tungt över pannan. Gröna ögon som mäter dig och sjunker tillbaka till serietidningen. En vuxen mans axlar på en trettonåring.",
        "Knogarna är tjocka och ojämna där gamla sår läkt snett. Fyra ärr på höger hand, tre på vänster. Ett flätat armband sitter hårt om handleden, gammalt och mörknat.",
      ],
      file: [
        { label: "Placeringar", text: "Fjorton hem, kanske fler. Varje gång slutade det likadant." },
        { label: "Bilaga", text: "Ett foto: pojken, armarna korsade, blicken rakt in i kameran." },
      ],
      quote: "Motstånd är bra för kroppen.",
      traits: ["Armbandet", "Knogarna", "Skyddar först, frågar sen", "Säger mindre än han känner"],
    },
    idun: {
      id: "idun",
      name: "Idun",
      seal: "#2d5a3a",
      epithet: "Hon som hör kråkorna",
      hair: "Ljust blont",
      arrived: "På sin trettonårsdag",
      intro: [
        "Ljust blont hår faller löst framför ansiktet. Ett rött äpple rullar mellan hennes fingrar längs bordskanten, varv efter varv. Hon gillar inte att prata.",
        "När en kråka skriker utanför fönstret hör Idun mer än ett skrik. Hennes händer vet saker om jord och växter som ingen lärt henne.",
      ],
      file: [
        { label: "Placeringar", text: "Sju institutioner på fyra år." },
        {
          label: "Anteckning",
          text: "Hittades i ett förråd på sitt sjunde hem. Hon hade bott där i sex veckor. Ingen såg henne.",
        },
        { label: "Remiss", text: "Påstår att hon hör djurens tankar." },
      ],
      quote: "Tre.",
      traits: ["Det röda äpplet", "Visslar när det blir tyst", "Planerar i förväg", "Ser allt, säger lite"],
    },
  },
};

const en: Dict = {
  meta: {
    title: "The Scream from Yggdrasil",
    description:
      "Book 1 of 9. Thirty-five years after Ragnarök. Three thirteen-year-olds, a house of granite and a tree that remembers everything.",
  },
  nav: { home: "Home", trio: "The Trio", shop: "Shop", other: "Svenska", otherCode: "sv" },
  hero: {
    book: "Book 1 of 9",
    slogan: "The tree remembers everything.",
    ctaBuy: "Pre-order the book",
    ctaMeet: "Meet the trio",
  },
  pitch: {
    kicker: "35 years after Ragnarök",
    body: [
      "A car drives through the rain towards Asplunda – a youth home built of granite, where roots force their way into the stone and the windows swallow the light.",
      "Three thirteen-year-olds nobody wants. A boy with a sketchbook and a pattern he has drawn since the day his mother vanished. A boy with scarred knuckles who has lost count of the homes. A girl with a red apple, who hears what the crows say.",
      "Beneath the house, something beats. Rhythmic. Deep inside the stone.",
    ],
  },
  trio: {
    kicker: "Asplunda Youth Home",
    title: "Meet the trio",
    lead: "All three arrived at Asplunda on their thirteenth birthday. All three were driven there by the same man.",
    meet: "Meet",
    age: "Age 13",
  },
  series: {
    kicker: "The series",
    title: "Nine books. Nine worlds.",
    books: [
      "The Scream from Yggdrasil",
      "The Letter from Yggdrasil",
      "Book 3",
      "Book 4",
      "Book 5",
      "Book 6",
      "Book 7",
      "Book 8",
      "Book 9",
    ],
    now: "Now",
    next: "Next",
  },
  signup: {
    title: "Hear when the tree screams",
    lead: "Be the first to know when the book is released, new characters wake and pre-orders open.",
    placeholder: "you@email.com",
    button: "Sign me up",
    ok: "Thank you. The tree has taken note of you.",
    err: "Something went wrong. Please try again shortly.",
  },
  shop: {
    kicker: "Shop",
    title: "The Scream from Yggdrasil – Book 1",
    lead: "The first book in the series. Paperback on cream paper, with a Nordic noir cover that wraps around the whole book.",
    format: ["Paperback", "Swedish edition", "Ages 12+", "C G Martini"],
    price: "€24",
    qty: "Quantity",
    buy: "Buy",
    preorder: "Pre-order",
    preorderNote: "Pre-order – the book ships as soon as it is printed. You will get an email when it is on its way.",
    secure: "Secure payment via Stripe – card, Apple Pay and Google Pay.",
    notReady: "The shop opens soon. Sign up below and we will let you know.",
    terms: "Terms of sale",
  },
  thanks: {
    title: "Thank you for your order",
    body: "A receipt is on its way to your inbox. You will get another email when the book leaves the printer.",
    back: "Back to home",
  },
  character: {
    file: "From the file",
    fileNote: "State records, Asplunda Youth Home",
    traits: "Marks",
    hair: "Hair",
    arrived: "Arrived at Asplunda",
    age: "Age",
    others: "The other two",
    sealNote: "Seal colour",
  },
  footer: { author: "C G Martini", inspired: "Inspired by Eskil Larsson", terms: "Terms of sale" },
  characters: {
    eskil: {
      id: "eskil",
      name: "Eskil",
      seal: "#1f3a6b",
      epithet: "The one who draws the pattern",
      hair: "Red",
      arrived: "On his thirteenth birthday",
      intro: [
        "Eskil sits in the back seat with the sketchbook against his thighs. His right hand works on its own. He has drawn the same pattern since the day his mother vanished – the day after his sixth birthday.",
        "He straightens what stands crooked. The lamp against the clock. The glasses on the shelf, evenly spaced. Straight lines hold, his mother said.",
      ],
      file: [
        { label: "Drawings", text: "The same subjects over and over – a falcon, a goat, a squirrel with a bushy tail." },
        { label: "Note", text: "Between the animal sketches: a circle. The lines are exact." },
      ],
      quote: "Am I the only one who thinks this house is crooked?",
      traits: ["The sketchbook", "Straight lines", "Takes words literally", "Thinks before he dares"],
    },
    rurik: {
      id: "rurik",
      name: "Rurik",
      seal: "#7a1c1c",
      epithet: "The one who counts the scars",
      hair: "Black",
      arrived: "On his thirteenth birthday",
      intro: [
        "Black hair heavy over his forehead. Green eyes that size you up and sink back to the comic book. A grown man's shoulders on a thirteen-year-old.",
        "His knuckles are thick and uneven where old wounds healed crooked. Four scars on the right hand, three on the left. A braided bracelet sits tight around his wrist, old and darkened.",
      ],
      file: [
        { label: "Placements", text: "Fourteen homes, maybe more. Every time it ended the same way." },
        { label: "Attachment", text: "A photo: the boy, arms crossed, staring straight into the camera." },
      ],
      quote: "Resistance is good for the body.",
      traits: ["The bracelet", "The knuckles", "Protects first, asks later", "Says less than he feels"],
    },
    idun: {
      id: "idun",
      name: "Idun",
      seal: "#2d5a3a",
      epithet: "The one who hears the crows",
      hair: "Pale blonde",
      arrived: "On her thirteenth birthday",
      intro: [
        "Pale blonde hair falls loose across her face. A red apple rolls between her fingers along the edge of the table, round after round. She doesn't like to talk.",
        "When a crow screams outside the window, Idun hears more than a scream. Her hands know things about soil and plants that nobody ever taught her.",
      ],
      file: [
        { label: "Placements", text: "Seven institutions in four years." },
        {
          label: "Note",
          text: "Found in a storeroom at her seventh home. She had lived there for six weeks. Nobody saw her.",
        },
        { label: "Referral", text: "Claims she can hear the thoughts of animals." },
      ],
      quote: "Three.",
      traits: ["The red apple", "Whistles when it goes quiet", "Plans ahead", "Sees everything, says little"],
    },
  },
};

export const dict: Record<Locale, Dict> = { sv, en };
export const getDict = (l: Locale) => dict[l];
