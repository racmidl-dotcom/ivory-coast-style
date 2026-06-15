import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
    });
    toast.success("Ajouté au panier", { description: product.name });
  };

  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold uppercase text-primary-foreground">
            Nouveau
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-base font-black text-primary">{formatPrice(product.price)}</span>
          <Button size="icon" onClick={onAdd} aria-label="Ajouter au panier" className="h-9 w-9 shrink-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
