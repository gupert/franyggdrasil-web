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
  eyes: string;
  arrived: string;
  intro: string[];
  file: { label: string; text: string }[];
  quote: string;
  traits: string[];
};

type Dict = {
  meta: { title: string; description: string };
  nav: { home: string; trio: string; shop: string; other: string; otherCode: string };
  hero: { book: string; slogan: string; ctaBuy: string; ctaMeet: string; titleTop: string; titleMid: string; titleBottom: string; flipHint: string; backCover: string };
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
    amazon: string;
    amazonNote: string;
    otherStores: string;
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
    figure: string;
    worlds: [string, string];
    hoverHint: string;
    eyes: string;
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
    titleTop: "Skriket",
    flipHint: "För musen över boken – vänd på den.",
    backCover: "Bokens baksida: Eskil, Idun och Rurik blickar ut över Vanaheim",
    titleMid: "från",
    titleBottom: "Yggdrasil",
    slogan: "Trädet minns allt.",
    ctaBuy: "Köp boken",
    ctaMeet: "Möt trion",
  },
  pitch: {
    kicker: "Midgård. 35 år efter Ragnarök.",
    body: [
      "Regnet slår mot bilrutan. Vägen smalnar. Vid slutet av grusvägen väntar Asplunda: granit, mörk lav och rötter som pressar sig in i grunden.",
      "Eskil har ritat samma mönster i sju år, sedan dagen då hans mor försvann. Rurik har slagit sig fram genom fjorton placeringar. Idun är tyst, och djuren lyssnar.",
      "Tre trettonåringar. Tre pärmar från staten.",
      "Under huset slår något. Rytmiskt. Djupt inne i stenen.",
    ],
  },
  trio: {
    kicker: "Asplunda ungdomshem",
    title: "Möt trion",
    lead: "Tre namn i en pärm. Tre rum i samma korridor.",
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
    amazon: "Köp på Amazon",
    amazonNote: "Boken finns nu som pocket. Du handlar och betalar tryggt hos Amazon, som trycker och skickar boken till dig.",
    otherStores: "Bor du utanför Sverige?",
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
    figure: "Hela gestalten",
    worlds: ["Midgård", "Vanaheim"],
    hoverHint: "För musen över dem – se dem i Vanaheim.",
    eyes: "Ögon",
  },
  footer: { author: "C G Martini", inspired: "Inspirerad av Eskil Larsson", terms: "Köpvillkor" },
  characters: {
    eskil: {
      id: "eskil",
      name: "Eskil",
      seal: "#1f3a6b",
      epithet: "Han har ritat samma mönster i sju år.",
      hair: "Rött",
      eyes: "Blå",
      arrived: "På sin trettonårsdag",
      intro: ["Rött hår, fräknar. Han har alltid sett mönster som är skeva."],
      file: [
        { label: "Anteckning", text: "Samma teckning, sida efter sida, sedan modern försvann dagen efter hans sexårsdag. Ensam." },
      ],
      quote: "Är jag ensam om att tycka att det här huset är skevt?",
      traits: ["Skissblocket", "Räta linjer", "Tar orden bokstavligt", "Tänker innan han vågar"],
    },
    rurik: {
      id: "rurik",
      name: "Rurik",
      seal: "#7a1c1c",
      epithet: "Han har slagit sig fram genom fjorton placeringar.",
      hair: "Svart",
      eyes: "Gröna",
      arrived: "På sin trettonårsdag",
      intro: ["Svart hår tungt över pannan. Knogarna bär ärr."],
      file: [
        { label: "Anteckning", text: "En annan elev försökte ta hans flätade armband. Eleven hamnade på sjukhuset." },
      ],
      quote: "Motstånd är bra för kroppen.",
      traits: ["Armbandet", "Knogarna", "Skyddar först, frågar sen", "Säger mindre än han känner"],
    },
    idun: {
      id: "idun",
      name: "Idun",
      seal: "#2d5a3a",
      epithet: "”Ett tyst djur.”",
      hair: "Ljust blont",
      eyes: "Blå",
      arrived: "På sin trettonårsdag",
      intro: ["Ljust blont hår faller fram över ansiktet."],
      file: [
        { label: "Anteckning", text: "Hittad i ett förråd på sitt sjunde hem, efter sex veckor. Visslade när de hämtade henne." },
      ],
      quote: "Tre.",
      traits: ["Visslar när det blir tyst", "Planerar i förväg", "Ser allt, säger lite"],
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
    titleTop: "The Scream",
    flipHint: "Hover over the book to turn it around.",
    backCover: "Back cover: Eskil, Idun and Rurik looking out over Vanaheim",
    titleMid: "from",
    titleBottom: "Yggdrasil",
    slogan: "The tree remembers everything.",
    ctaBuy: "Buy the book",
    ctaMeet: "Meet the trio",
  },
  pitch: {
    kicker: "Midgard. 35 years after Ragnarök.",
    body: [
      "Rain beats against the car window. The road narrows. At the end of the gravel track waits Asplunda: granite, dark lichen and roots forcing their way into the foundations.",
      "Eskil has drawn the same pattern for seven years, since the day his mother vanished. Rurik has fought his way through fourteen placements. Idun is silent, and the animals listen.",
      "Three thirteen-year-olds. Three state files.",
      "Beneath the house, something beats. Rhythmic. Deep inside the stone.",
    ],
  },
  trio: {
    kicker: "Asplunda Youth Home",
    title: "Meet the trio",
    lead: "Three names in a file. Three rooms in the same corridor.",
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
    amazon: "Buy on Amazon",
    amazonNote: "Out now in paperback (Swedish edition). You order and pay securely through Amazon, who print and ship the book to you.",
    otherStores: "Outside Sweden?",
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
    figure: "Full figure",
    worlds: ["Midgard", "Vanaheim"],
    hoverHint: "Hover over them – see them in Vanaheim.",
    eyes: "Eyes",
  },
  footer: { author: "C G Martini", inspired: "Inspired by Eskil Larsson", terms: "Terms of sale" },
  characters: {
    eskil: {
      id: "eskil",
      name: "Eskil",
      seal: "#1f3a6b",
      epithet: "He has drawn the same pattern for seven years.",
      hair: "Red",
      eyes: "Blue",
      arrived: "On his thirteenth birthday",
      intro: ["Red hair, freckles. He has always seen patterns that are crooked."],
      file: [
        { label: "Note", text: "The same drawing, page after page, since his mother vanished the day after his sixth birthday. Alone." },
      ],
      quote: "Am I the only one who thinks this house is crooked?",
      traits: ["The sketchbook", "Straight lines", "Takes words literally", "Thinks before he dares"],
    },
    rurik: {
      id: "rurik",
      name: "Rurik",
      seal: "#7a1c1c",
      epithet: "He has fought his way through fourteen placements.",
      hair: "Black",
      eyes: "Green",
      arrived: "On his thirteenth birthday",
      intro: ["Black hair heavy over his forehead. His knuckles carry scars."],
      file: [
        { label: "Note", text: "Another pupil tried to take his braided bracelet. The pupil ended up in hospital." },
      ],
      quote: "Resistance is good for the body.",
      traits: ["The bracelet", "The knuckles", "Protects first, asks later", "Says less than he feels"],
    },
    idun: {
      id: "idun",
      name: "Idun",
      seal: "#2d5a3a",
      epithet: "“A quiet animal.”",
      hair: "Pale blonde",
      eyes: "Blue",
      arrived: "On her thirteenth birthday",
      intro: ["Pale blonde hair falls across her face."],
      file: [
        { label: "Note", text: "Found in a storeroom at her seventh home, after six weeks. Whistled when they came for her." },
      ],
      quote: "Three.",
      traits: ["Whistles when it goes quiet", "Plans ahead", "Sees everything, says little"],
    },
  },
};

export const dict: Record<Locale, Dict> = { sv, en };
export const getDict = (l: Locale) => dict[l];
