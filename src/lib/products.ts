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

// Generated product images — professional e-commerce style (CDN)
const tshirtHommeUrl = "/__l5e/assets-v1/c9bd98c1-2384-46ab-b111-1c8029f4c463/tshirt-homme.png";
const chemiseHommeUrl = "/__l5e/assets-v1/8f590d8a-e2c8-4462-b683-d80d9f5d3b1e/chemise-homme.png";
const jeanHommeUrl = "/__l5e/assets-v1/56600197-0a68-4207-b233-3e600e347a89/jean-homme.png";
const poloHommeUrl = "/__l5e/assets-v1/cddd66a7-053c-4896-91dd-faeb6b7a454a/polo-homme.png";
const robeFemmeUrl = "/__l5e/assets-v1/cb6bcd65-0045-4f16-9387-6b49a7ddc501/robe-femme.png";
const topFemmeUrl = "/__l5e/assets-v1/0ee138f5-15ba-4877-9293-ce128bf20dc1/top-femme.png";
const jupeFemmeUrl = "/__l5e/assets-v1/0a9a0440-98fe-4e9d-9117-6e5e39bc61fb/jupe-femme.png";
const pagneFemmeUrl = "/__l5e/assets-v1/cb73a08b-107d-4bb4-8986-adf4ff13c8fe/pagne-femme.png";
const tshirtEnfantUrl = "/__l5e/assets-v1/52452ff7-3149-4a01-ba65-5486f57062c8/tshirt-enfant.png";
const shortEnfantUrl = "/__l5e/assets-v1/3f3c170c-1ae2-4563-a8a9-b2ff391ef4ba/short-enfant.png";
const robeEnfantUrl = "/__l5e/assets-v1/7154259b-e608-4023-b162-005641312fe9/robe-enfant.png";
const survetementEnfantUrl = "/__l5e/assets-v1/bf478ae9-575c-4a75-90b6-5b13108a23d6/survetement-enfant.png";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "T-shirt coton premium",
    price: 3500,
    category: "homme",
    image: tshirtHommeUrl,
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
    image: chemiseHommeUrl,
    description: "Chemise en lin léger, parfaite pour le climat tropical.",
    sizes: ["M", "L", "XL"],
    colors: ["Blanc", "Beige"],
  },
  {
    id: "p3",
    name: "Jean slim délavé",
    price: 7500,
    category: "homme",
    image: jeanHommeUrl,
    description: "Jean slim avec stretch confortable.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Bleu", "Noir"],
  },
  {
    id: "p4",
    name: "Polo classique",
    price: 4500,
    category: "homme",
    image: poloHommeUrl,
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
    image: robeFemmeUrl,
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
    image: topFemmeUrl,
    description: "Top court mode, parfait avec un jean taille haute.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Blanc", "Rose"],
  },
  {
    id: "p7",
    name: "Jupe plissée midi",
    price: 5000,
    category: "femme",
    image: jupeFemmeUrl,
    description: "Jupe plissée midi, finition élégante.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Noir"],
  },
  {
    id: "p8",
    name: "Ensemble pagne moderne",
    price: 7500,
    category: "femme",
    image: pagneFemmeUrl,
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
    image: tshirtEnfantUrl,
    description: "T-shirt enfant avec imprimé fun.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Jaune", "Bleu", "Rouge"],
  },
  {
    id: "p10",
    name: "Short jeans enfant",
    price: 2500,
    category: "enfant",
    image: shortEnfantUrl,
    description: "Short en jean résistant pour les aventures.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Bleu"],
  },
  {
    id: "p11",
    name: "Robe enfant princesse",
    price: 3500,
    category: "enfant",
    image: robeEnfantUrl,
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
    image: survetementEnfantUrl,
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
