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

// Generated product images — professional e-commerce style
import tshirtHomme from "@/assets/produits/tshirt-homme.png.asset.json";
import chemiseHomme from "@/assets/produits/chemise-homme.png.asset.json";
import jeanHomme from "@/assets/produits/jean-homme.png.asset.json";
import poloHomme from "@/assets/produits/polo-homme.png.asset.json";
import robeFemme from "@/assets/produits/robe-femme.png.asset.json";
import topFemme from "@/assets/produits/top-femme.png.asset.json";
import jupeFemme from "@/assets/produits/jupe-femme.png.asset.json";
import pagneFemme from "@/assets/produits/pagne-femme.png.asset.json";
import tshirtEnfant from "@/assets/produits/tshirt-enfant.png.asset.json";
import shortEnfant from "@/assets/produits/short-enfant.png.asset.json";
import robeEnfant from "@/assets/produits/robe-enfant.png.asset.json";
import survetementEnfant from "@/assets/produits/survetement-enfant.png.asset.json";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "T-shirt coton premium",
    price: 3500,
    category: "homme",
    image: tshirtHomme.url,
    description: "T-shirt 100% coton bio, coupe droite, idéal au quotidien.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Blanc", "Bleu"],
    isNew: true,
  },
  {
    id: "p2",
    name: "Chemise lin manches longues",
    price: 6500,
    category: "homme",
    image: chemiseHomme.url,
    description: "Chemise en lin léger, parfaite pour le climat tropical.",
    sizes: ["M", "L", "XL"],
    colors: ["Blanc", "Beige"],
  },
  {
    id: "p3",
    name: "Jean slim délavé",
    price: 7500,
    category: "homme",
    image: jeanHomme.url,
    description: "Jean slim avec stretch confortable.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Bleu", "Noir"],
  },
  {
    id: "p4",
    name: "Polo classique",
    price: 4500,
    category: "homme",
    image: poloHomme.url,
    description: "Polo piqué de coton, col contrasté.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Marine", "Vert", "Bordeaux"],
    isNew: true,
  },
  {
    id: "p5",
    name: "Robe fleurie d'été",
    price: 6500,
    category: "femme",
    image: robeFemme.url,
    description: "Robe légère à motif fleuri, idéale pour l'été.",
    sizes: ["S", "M", "L"],
    colors: ["Rouge", "Bleu"],
    isNew: true,
  },
  {
    id: "p6",
    name: "Top crop tendance",
    price: 2500,
    category: "femme",
    image: topFemme.url,
    description: "Top court mode, parfait avec un jean taille haute.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Blanc", "Rose"],
  },
  {
    id: "p7",
    name: "Jupe plissée midi",
    price: 5000,
    category: "femme",
    image: jupeFemme.url,
    description: "Jupe plissée midi, finition élégante.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Noir"],
  },
  {
    id: "p8",
    name: "Ensemble pagne moderne",
    price: 7500,
    category: "femme",
    image: pagneFemme.url,
    description: "Ensemble en pagne wax, coupe contemporaine.",
    sizes: ["M", "L", "XL"],
    colors: ["Multicolore"],
    isNew: true,
  },
  {
    id: "p9",
    name: "T-shirt enfant ludique",
    price: 1500,
    category: "enfant",
    image: tshirtEnfant.url,
    description: "T-shirt enfant avec imprimé fun.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Jaune", "Bleu", "Rouge"],
  },
  {
    id: "p10",
    name: "Short jeans enfant",
    price: 2500,
    category: "enfant",
    image: shortEnfant.url,
    description: "Short en jean résistant pour les aventures.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Bleu"],
  },
  {
    id: "p11",
    name: "Robe enfant princesse",
    price: 3500,
    category: "enfant",
    image: robeEnfant.url,
    description: "Robe colorée pour petites filles.",
    sizes: ["2A", "4A", "6A", "8A"],
    colors: ["Rose", "Violet"],
    isNew: true,
  },
  {
    id: "p12",
    name: "Survêtement enfant",
    price: 5500,
    category: "enfant",
    image: survetementEnfant.url,
    description: "Survêtement confortable pour le sport.",
    sizes: ["6A", "8A", "10A", "12A"],
    colors: ["Gris", "Noir"],
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
