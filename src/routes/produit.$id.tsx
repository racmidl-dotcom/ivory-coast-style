import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { findProduct, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ChevronLeft, ShoppingCart, Zap } from "lucide-react";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-black">Produit introuvable</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Retour à l'accueil</Link>
      </div>
    </Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState<"cart" | "buy" | null>(null);

  const handleAdd = (then: "cart" | "buy") => {
    setLoading(then);
    addItem(
      { productId: product.id, name: product.name, price: product.price, image: product.image, size, color },
      qty,
    );
    setTimeout(() => {
      setLoading(null);
      if (then === "buy") {
        navigate({ to: "/panier" });
      } else {
        toast.success("Ajouté au panier", { description: `${product.name} × ${qty}` });
      }
    }, 300);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Retour
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-primary">{product.category}</span>
            <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">{product.name}</h1>
            <div className="mt-3 text-3xl font-black text-primary">{formatPrice(product.price)}</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Taille</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-12 rounded-md border px-3 py-2 text-sm font-medium transition ${
                      size === s ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">Couleur</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      color === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-sm font-semibold">Quantité</p>
              <div className="flex items-center rounded-md border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted">−</button>
                <span className="min-w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-muted">+</button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleAdd("cart")}
                disabled={loading !== null}
              >
                <ShoppingCart className="h-4 w-4" />
                {loading === "cart" ? "Ajout…" : "Ajouter au panier"}
              </Button>
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => handleAdd("buy")}
                disabled={loading !== null}
              >
                <Zap className="h-4 w-4" />
                {loading === "buy" ? "Patientez…" : "Acheter maintenant"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
