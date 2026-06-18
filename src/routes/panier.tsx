import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/panier")({
  component: CartPage,
});

const SHIPPING = 1500;

function CartPage() {
  const { items, updateQty, removeItem, subtotal, count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = subtotal + (items.length ? SHIPPING : 0);

  const goCheckout = () => {
    if (!user) {
      navigate({ to: "/auth", search: { next: "/paiement" } as never });
    } else {
      navigate({ to: "/paiement" });
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-black sm:text-3xl">
          Mon panier <span className="text-muted-foreground">({count})</span>
        </h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <ShoppingBag className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Votre panier est vide.</p>
            <Link to="/"><Button className="mt-4">Continuer mes achats</Button></Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-3 rounded-xl border bg-card p-3">
                  <img src={item.image} alt={item.name} className="h-24 w-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.size && <>Taille : <b>{item.size}</b></>}
                          {item.color && <> · Couleur : <b>{item.color}</b></>}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Retirer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center rounded-md border">
                        <button onClick={() => updateQty(item.productId, item.quantity - 1, item.size, item.color)}
                                className="px-2 py-1.5 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.quantity + 1, item.size, item.color)}
                                className="px-2 py-1.5 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
              <h2 className="mb-4 font-display text-lg font-black">Récapitulatif</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Livraison sous-région</span><span className="font-semibold">{formatPrice(SHIPPING)}</span></div>
                <div className="my-3 border-t" />
                <div className="flex justify-between text-base"><span className="font-bold">Total</span><span className="font-black text-primary">{formatPrice(total)}</span></div>
              </div>
              <Button size="lg" className="mt-5 w-full" onClick={goCheckout}>
                Confirmer la commande
              </Button>
              {!user && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Vous serez invité à vous connecter
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
