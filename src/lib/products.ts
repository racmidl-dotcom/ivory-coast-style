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

// Unsplash photos of real clothing (men, women, kids)
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "T-shirt coton premium",
    price: 3500,
    category: "homme",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
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
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop",
    description: "Chemise en lin léger, parfaite pour le climat tropical.",
    sizes: ["M", "L", "XL"],
    colors: ["Blanc", "Beige"],
  },
  {
    id: "p3",
    name: "Jean slim délavé",
    price: 7500,
    category: "homme",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
    description: "Jean slim avec stretch confortable.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Bleu", "Noir"],
  },
  {
    id: "p4",
    name: "Polo classique",
    price: 4500,
    category: "homme",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=750&fit=crop",
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
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop",
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
    image: "https://images.unsplash.com/photo-1564257577-2d3ee8740ba9?w=600&h=750&fit=crop",
    description: "Top court mode, parfait avec un jean taille haute.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Blanc", "Rose"],
  },
  {
    id: "p7",
    name: "Jupe plissée midi",
    price: 5000,
    category: "femme",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=600&h=750&fit=crop",
    description: "Jupe plissée midi, finition élégante.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Noir"],
  },
  {
    id: "p8",
    name: "Ensemble pagne moderne",
    price: 7500,
    category: "femme",
    image: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&h=750&fit=crop",
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
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&h=750&fit=crop",
    description: "T-shirt enfant avec imprimé fun.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Jaune", "Bleu", "Rouge"],
  },
  {
    id: "p10",
    name: "Short jeans enfant",
    price: 2500,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=750&fit=crop",
    description: "Short en jean résistant pour les aventures.",
    sizes: ["4A", "6A", "8A", "10A"],
    colors: ["Bleu"],
  },
  {
    id: "p11",
    name: "Robe enfant princesse",
    price: 3500,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=750&fit=crop",
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
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=750&fit=crop",
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
