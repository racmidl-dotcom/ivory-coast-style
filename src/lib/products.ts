export type Category = "homme" | "femme" | "enfant";

export interface Product {
  id: string;
  name: string;
  price: number; // FCFA
  category: Category;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

import airRunBleu from "@/assets/baskets/air-run-bleu.jpg";
import highTopBlanche from "@/assets/baskets/high-top-blanche.jpg";
import airMaxNavy from "@/assets/baskets/air-max-navy.jpg";
import knitGris from "@/assets/baskets/knit-gris.jpg";
import femmeBlancheBleu from "@/assets/baskets/femme-blanche-bleu.jpg";
import femmeRoyalBlue from "@/assets/baskets/femme-royal-blue.jpg";
import femmeCourtBlanc from "@/assets/baskets/femme-court-blanc.jpg";
import femmeSlipNavy from "@/assets/baskets/femme-slip-navy.jpg";
import enfantVelcroBleu from "@/assets/baskets/enfant-velcro-bleu.jpg";
import enfantHightop from "@/assets/baskets/enfant-hightop.jpg";
import enfantRunningCiel from "@/assets/baskets/enfant-running-ciel.jpg";
import enfantSportNoir from "@/assets/baskets/enfant-sport-noir.jpg";

const SIZES_H = ["39", "40", "41", "42", "43", "44", "45"];
const SIZES_F = ["36", "37", "38", "39", "40", "41"];
const SIZES_E = ["28", "30", "32", "34", "35"];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Nike Air Run Bleu Royal",
    price: 20000,
    category: "homme",
    image: airRunBleu,
    description:
      "Basket de running homme, mesh respirant et semelle Air amortissante. Bleu / blanc.",
    sizes: SIZES_H,
    colors: ["Bleu", "Blanc"],
    isNew: true,
  },
  {
    id: "p2",
    name: "Nike High-Top Blanche",
    price: 25000,
    category: "homme",
    image: highTopBlanche,
    description: "Montante en cuir blanc avec swoosh bleu. Un classique intemporel du basket.",
    sizes: SIZES_H,
    colors: ["Blanc", "Bleu"],
  },
  {
    id: "p3",
    name: "Nike Air Max Navy",
    price: 25000,
    category: "homme",
    image: airMaxNavy,
    description: "Air Max bleu marine, bulle d'air visible et semelle gomme. Confort maximal.",
    sizes: SIZES_H,
    colors: ["Marine"],
    isNew: true,
  },
  {
    id: "p4",
    name: "Nike Knit Gris Bleu",
    price: 15000,
    category: "homme",
    image: knitGris,
    description: "Sneaker légère en maille tricotée, idéale pour le sport et la ville.",
    sizes: SIZES_H,
    colors: ["Gris", "Bleu"],
  },
  {
    id: "p5",
    name: "Nike Femme Blanche & Ciel",
    price: 15000,
    category: "femme",
    image: femmeBlancheBleu,
    description: "Basket lifestyle femme, blanc nacré et touches bleu ciel. Semelle épaisse.",
    sizes: SIZES_F,
    colors: ["Blanc", "Bleu ciel"],
    isNew: true,
  },
  {
    id: "p6",
    name: "Nike Femme Royal Blue",
    price: 8000,
    category: "femme",
    image: femmeRoyalBlue,
    description: "Running femme bleu roi, ultra légère avec semelle blanche amortissante.",
    sizes: SIZES_F,
    colors: ["Bleu"],
  },
  {
    id: "p7",
    name: "Nike Court Blanc",
    price: 4000,
    category: "femme",
    image: femmeCourtBlanc,
    description: "Sneaker basse en cuir blanc, contrefort bleu. Élégante au quotidien.",
    sizes: SIZES_F,
    colors: ["Blanc"],
  },
  {
    id: "p8",
    name: "Nike Slip-On Navy",
    price: 8000,
    category: "femme",
    image: femmeSlipNavy,
    description: "Modèle sans lacets bleu marine, souple et facile à enfiler.",
    sizes: SIZES_F,
    colors: ["Marine"],
  },
  {
    id: "p9",
    name: "Nike Kids Velcro Bleu",
    price: 4000,
    category: "enfant",
    image: enfantVelcroBleu,
    description: "Basket enfant à scratchs, bleu et blanc. Facile à mettre tout seul.",
    sizes: SIZES_E,
    colors: ["Bleu", "Blanc"],
  },
  {
    id: "p10",
    name: "Nike Kids High-Top",
    price: 8000,
    category: "enfant",
    image: enfantHightop,
    description: "Montante enfant blanche à détails bleus, style basket-ball.",
    sizes: SIZES_E,
    colors: ["Blanc", "Bleu"],
    isNew: true,
  },
  {
    id: "p11",
    name: "Nike Kids Running Ciel",
    price: 4000,
    category: "enfant",
    image: enfantRunningCiel,
    description: "Running enfant bleu ciel, très légère pour courir et jouer.",
    sizes: SIZES_E,
    colors: ["Bleu ciel"],
  },
  {
    id: "p12",
    name: "Nike Kids Sport Noir",
    price: 20000,
    category: "enfant",
    image: enfantSportNoir,
    description: "Basket sport enfant noire à semelle bleue, parfaite pour l'entraînement.",
    sizes: SIZES_E,
    colors: ["Noir", "Bleu"],
  },
];

export const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "enfant", label: "Enfant" },
];

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
