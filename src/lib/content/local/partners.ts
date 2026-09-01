import { entryOf } from "../identifiers";
import type { ContentImage, Partner } from "../types";

export const careerPartnerLogos: readonly {
  readonly id: string;
  readonly name: string;
  readonly kind:
    | "technology"
    | "ecosystem"
    | "industry"
    | "finance"
    | "consulting";
  readonly blurb?: string | null;
  readonly logo: ContentImage;
}[] = [
  {
    id: "leapfrog",
    name: "Leapfrog Technology",
    kind: "industry",
    logo: {
      src: "/career logos/Leapfrog.png.webp",
      alt: "Leapfrog Technology logo",
      width: 168,
      height: 101,
    },
  },
  {
    id: "khalti",
    name: "Khalti Digital Wallet",
    kind: "finance",
    logo: {
      src: "/career logos/640px-Khalti_Digital_Wallet_Logo.png.jpg.webp",
      alt: "Khalti Digital Wallet logo",
      width: 640,
      height: 344,
    },
  },
  {
    id: "esewa",
    name: "eSewa",
    kind: "finance",
    logo: {
      src: "/career logos/esewa.png.webp",
      alt: "eSewa logo",
      width: 310,
      height: 163,
    },
  },
  {
    id: "fonepay",
    name: "Fonepay",
    kind: "finance",
    logo: {
      src: "/career logos/fonepay-1.png.webp",
      alt: "Fonepay logo",
      width: 512,
      height: 283,
    },
  },
  {
    id: "ime-pay",
    name: "IME Pay",
    kind: "finance",
    logo: {
      src: "/career logos/IME-Pay-Logo.png.webp",
      alt: "IME Pay logo",
      width: 663,
      height: 208,
    },
  },
  {
    id: "cloud-factory",
    name: "CloudFactory",
    kind: "technology",
    logo: {
      src: "/career logos/cloud-factory.png.webp",
      alt: "CloudFactory logo",
      width: 512,
      height: 461,
    },
  },
  {
    id: "pathao",
    name: "Pathao Nepal",
    kind: "industry",
    logo: {
      src: "/career logos/Pathao-Logo_Horizontal_with_TagLine-e1706002895600.png.webp",
      alt: "Pathao Nepal logo",
      width: 1614,
      height: 446,
    },
  },
  {
    id: "genese",
    name: "Genese Solutions",
    kind: "technology",
    logo: {
      src: "/career logos/genese.png.webp",
      alt: "Genese Solutions logo",
      width: 285,
      height: 177,
    },
  },
  {
    id: "logpoint",
    name: "Logpoint",
    kind: "technology",
    logo: {
      src: "/career logos/logpoint.png.webp",
      alt: "Logpoint logo",
      width: 459,
      height: 110,
    },
  },
  {
    id: "treeleaf",
    name: "Treeleaf Technologies",
    kind: "technology",
    logo: {
      src: "/career logos/Treeleaf-final.jpeg.webp",
      alt: "Treeleaf Technologies logo",
      width: 667,
      height: 453,
    },
  },
  {
    id: "yarsa-labs",
    name: "Yarsa Labs",
    kind: "technology",
    logo: {
      src: "/career logos/yarsa-labs-full.png.webp",
      alt: "Yarsa Labs logo",
      width: 367,
      height: 128,
    },
  },
  {
    id: "programiz",
    name: "Programiz",
    kind: "technology",
    logo: {
      src: "/career logos/programiz.png.webp",
      alt: "Programiz logo",
      width: 390,
      height: 129,
    },
  },
  {
    id: "ekbana",
    name: "Ekbana Solutions",
    kind: "industry",
    logo: {
      src: "/career logos/ekbana.png.webp",
      alt: "Ekbana Solutions logo",
      width: 404,
      height: 125,
    },
  },
  {
    id: "swift-technology",
    name: "Swift Technology",
    kind: "finance",
    logo: {
      src: "/career logos/SWIFT-LOGO-WEBSITE-1.png.webp",
      alt: "Swift Technology logo",
      width: 250,
      height: 135,
    },
  },
  {
    id: "dishhome",
    name: "DishHome",
    kind: "industry",
    logo: {
      src: "/career logos/DishHome_Logo.svg_.png.webp",
      alt: "DishHome logo",
      width: 1200,
      height: 1200,
    },
  },
  {
    id: "karkhana",
    name: "Karkhana",
    kind: "ecosystem",
    logo: {
      src: "/career logos/karkhana.png.webp",
      alt: "Karkhana logo",
      width: 388,
      height: 130,
    },
  },
  {
    id: "broadway",
    name: "Broadway Infosys",
    kind: "technology",
    logo: {
      src: "/career logos/broadway.png.webp",
      alt: "Broadway Infosys logo",
      width: 381,
      height: 132,
    },
  },
  {
    id: "clockb",
    name: "Clock B Business Technology",
    kind: "consulting",
    logo: {
      src: "/career logos/clockb.png.webp",
      alt: "Clock B Business Technology logo",
      width: 768,
      height: 268,
    },
  },
  {
    id: "info-developers",
    name: "InfoDevelopers",
    kind: "technology",
    logo: {
      src: "/career logos/info-developers.png.webp",
      alt: "InfoDevelopers logo",
      width: 383,
      height: 131,
    },
  },
  {
    id: "dex-international",
    name: "Adex International",
    kind: "consulting",
    logo: {
      src: "/career logos/Purple-Adex-Logo-1_1680601855.png.webp",
      alt: "Adex International logo",
      width: 991,
      height: 312,
    },
  },
  {
    id: "dlytica",
    name: "Dlytica",
    kind: "technology",
    logo: {
      src: "/career logos/Dlytica.png.webp",
      alt: "Dlytica logo",
      width: 4160,
      height: 1428,
    },
  },
  {
    id: "intuji",
    name: "Intuji",
    kind: "technology",
    logo: {
      src: "/career logos/intuji.png.webp",
      alt: "Intuji logo",
      width: 405,
      height: 124,
    },
  },
  {
    id: "logicabeans",
    name: "LogicaBeans",
    kind: "technology",
    logo: {
      src: "/career logos/logicabeans-logo-software-company-2.png.webp",
      alt: "LogicaBeans logo",
      width: 1521,
      height: 1384,
    },
  },
  {
    id: "lis-nepal",
    name: "LIS Nepal",
    kind: "technology",
    logo: {
      src: "/career logos/lis-logo.png.webp",
      alt: "LIS Nepal logo",
      width: 541,
      height: 87,
    },
  },
  {
    id: "techkraft",
    name: "TechKraft",
    kind: "technology",
    logo: {
      src: "/career logos/techkraft.jpg.webp",
      alt: "TechKraft logo",
      width: 310,
      height: 163,
    },
  },
  {
    id: "spiralogics",
    name: "Spiralogics",
    kind: "technology",
    logo: {
      src: "/career logos/spiralogics.png.webp",
      alt: "Spiralogics logo",
      width: 212,
      height: 52,
    },
  },
  {
    id: "eminence-ways",
    name: "Eminence Ways",
    kind: "technology",
    logo: {
      src: "/career logos/eminence-ways.png.webp",
      alt: "Eminence Ways logo",
      width: 423,
      height: 119,
    },
  },
  {
    id: "diyo-ai",
    name: "Diyo AI",
    kind: "technology",
    logo: {
      src: "/career logos/Diyo-Ai.png.webp",
      alt: "Diyo AI logo",
      width: 478,
      height: 105,
    },
  },
  {
    id: "code-himalaya",
    name: "Code Himalaya",
    kind: "technology",
    logo: {
      src: "/career logos/Code-Himalaya-e1709001522785.png.webp",
      alt: "Code Himalaya logo",
      width: 251,
      height: 117,
    },
  },
  {
    id: "quickfox",
    name: "Quickfox Consulting",
    kind: "consulting",
    logo: {
      src: "/career logos/37.-Quickfox-Consulting-e1715081130304.png.webp",
      alt: "Quickfox Consulting logo",
      width: 571,
      height: 199,
    },
  },
  {
    id: "wise-yak",
    name: "Wise Yak",
    kind: "technology",
    logo: {
      src: "/career logos/Wise-yak-logo.png.webp",
      alt: "Wise Yak logo",
      width: 4263,
      height: 3692,
    },
  },
  {
    id: "waft-tech",
    name: "Waft Technology",
    kind: "technology",
    logo: {
      src: "/career logos/waft.png.webp",
      alt: "Waft Technology logo",
      width: 445,
      height: 113,
    },
  },
  {
    id: "tuna-tech",
    name: "Tuna Technology",
    kind: "technology",
    logo: {
      src: "/career logos/tuna.png.webp",
      alt: "Tuna Technology logo",
      width: 514,
      height: 515,
    },
  },
  {
    id: "slash-plus",
    name: "Slash Plus",
    kind: "technology",
    logo: {
      src: "/career logos/Slashlogo-e1715081500251.png.webp",
      alt: "Slash Plus logo",
      width: 508,
      height: 295,
    },
  },
  {
    id: "prixa",
    name: "Prixa",
    kind: "technology",
    logo: {
      src: "/career logos/prixa.png.webp",
      alt: "Prixa logo",
      width: 417,
      height: 215,
    },
  },
  {
    id: "palm-mind",
    name: "Palm Mind",
    kind: "technology",
    logo: {
      src: "/career logos/palm-mind.png.webp",
      alt: "Palm Mind logo",
      width: 339,
      height: 148,
    },
  },
  {
    id: "dynamic-technosoft",
    name: "Dynamic Technosoft",
    kind: "technology",
    logo: {
      src: "/career logos/dynamic_technosoft_logo.png.webp",
      alt: "Dynamic Technosoft logo",
      width: 296,
      height: 89,
    },
  },
  {
    id: "extensodata",
    name: "ExtensoData",
    kind: "technology",
    logo: {
      src: "/career logos/extensodata_logo-1.jpg.webp",
      alt: "ExtensoData logo",
      width: 200,
      height: 114,
    },
  },
  {
    id: "codroidhub",
    name: "CodroidHub",
    kind: "technology",
    logo: {
      src: "/career logos/codroidhub_logo.jpeg.webp",
      alt: "CodroidHub logo",
      width: 200,
      height: 105,
    },
  },
  {
    id: "datahub",
    name: "DataHub",
    kind: "technology",
    logo: {
      src: "/career logos/datahub.png.webp",
      alt: "DataHub logo",
      width: 190,
      height: 56,
    },
  },
  {
    id: "aqore",
    name: "Aqore",
    kind: "technology",
    logo: {
      src: "/career logos/aqore-e1707312849329.jpg.webp",
      alt: "Aqore logo",
      width: 225,
      height: 156,
    },
  },
  {
    id: "grit",
    name: "Grit",
    kind: "technology",
    logo: {
      src: "/career logos/grit1.png.webp",
      alt: "Grit logo",
      width: 212,
      height: 53,
    },
  },
  {
    id: "sunya-ek",
    name: "Sunya Ek",
    kind: "technology",
    logo: {
      src: "/career logos/sunya-ek.png.webp",
      alt: "Sunya Ek logo",
      width: 212,
      height: 53,
    },
  },
  {
    id: "inspiring-lab",
    name: "Inspiring Lab",
    kind: "technology",
    logo: {
      src: "/career logos/inspiring-lab.jpg.webp",
      alt: "Inspiring Lab logo",
      width: 250,
      height: 250,
    },
  },
  {
    id: "cypher",
    name: "Cypher",
    kind: "technology",
    logo: {
      src: "/career logos/cypher.jpg.webp",
      alt: "Cypher logo",
      width: 200,
      height: 200,
    },
  },
];

export const partners: readonly Partner[] = careerPartnerLogos.map((p) => ({
  ...entryOf(p.id),
  name: p.name,
  kind: p.kind as "industry",
  blurb: p.blurb ?? null,
  href: null,
  logo: p.logo,
}));
