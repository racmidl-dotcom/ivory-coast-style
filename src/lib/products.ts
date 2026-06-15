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

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/750`;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "T-shirt coton premium", price: 8500, category: "homme", image: img("tshirt-h1"), description: "T-shirt 100% coton bio, coupe droite, idéal au quotidien.", sizes: ["S","M","L","XL"], colors: ["Noir","Blanc","Bleu"], isNew: true },
  { id: "p2", name: "Chemise lin manches longues", price: 14000, category: "homme", image: img("chemise-h"), description: "Chemise en lin léger, parfaite pour le climat tropical.", sizes: ["M","L","XL"], colors: ["Blanc","Beige"] },
  { id: "p3", name: "Jean slim délavé", price: 18500, category: "homme", image: img("jean-h"), description: "Jean slim avec stretch confortable.", sizes: ["30","32","34","36"], colors: ["Bleu","Noir"] },
  { id: "p4", name: "Polo classique", price: 9500, category: "homme", image: img("polo-h"), description: "Polo piqué de coton, col contrasté.", sizes: ["S","M","L","XL"], colors: ["Marine","Vert","Bordeaux"], isNew: true },
  { id: "p5", name: "Robe fleurie d'été", price: 16500, category: "femme", image: img("robe-f1"), description: "Robe légère à motif fleuri, idéale pour l'été.", sizes: ["S","M","L"], colors: ["Rouge","Bleu"], isNew: true },
  { id: "p6", name: "Top crop tendance", price: 7500, category: "femme", image: img("top-f1"), description: "Top court mode, parfait avec un jean taille haute.", sizes: ["XS","S","M","L"], colors: ["Noir","Blanc","Rose"] },
  { id: "p7", name: "Jupe plissée midi", price: 12500, category: "femme", image: img("jupe-f"), description: "Jupe plissée midi, finition élégante.", sizes: ["S","M","L"], colors: ["Beige","Noir"] },
  { id: "p8", name: "Ensemble pagne moderne", price: 22000, category: "femme", image: img("pagne-f"), description: "Ensemble en pagne wax, coupe contemporaine.", sizes: ["M","L","XL"], colors: ["Multicolore"], isNew: true },
  { id: "p9", name: "T-shirt enfant ludique", price: 5500, category: "enfant", image: img("tshirt-e"), description: "T-shirt enfant avec imprimé fun.", sizes: ["4A","6A","8A","10A"], colors: ["Jaune","Bleu","Rouge"] },
  { id: "p10", name: "Short jeans enfant", price: 7000, category: "enfant", image: img("short-e"), description: "Short en jean résistant pour les aventures.", sizes: ["4A","6A","8A","10A"], colors: ["Bleu"] },
  { id: "p11", name: "Robe enfant princesse", price: 9500, category: "enfant", image: img("robe-e"), description: "Robe colorée pour petites filles.", sizes: ["2A","4A","6A","8A"], colors: ["Rose","Violet"], isNew: true },
  { id: "p12", name: "Survêtement enfant", price: 12000, category: "enfant", image: img("survet-e"), description: "Survêtement confortable pour le sport.", sizes: ["6A","8A","10A","12A"], colors: ["Gris","Noir"] },
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
