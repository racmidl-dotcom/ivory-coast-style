import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const SHIPPING = 1500;

export const Route = createFileRoute("/paiement")({
  component: PaymentPage,
});

const PAYMENT_METHODS = [
  { id: "orange_money", label: "Orange Money", color: "bg-primary text-primary-foreground" },
  { id: "mtn", label: "MTN Money", color: "bg-yellow-400 text-foreground" },
  { id: "wave", label: "Wave", color: "bg-blue-500 text-white" },
] as const;

function PaymentPage() {
  const { items, subtotal, clear } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<typeof PAYMENT_METHODS[number]["id"]>("orange_money");
  const [loading, setLoading] = useState(false);

  const total = subtotal + (items.length ? SHIPPING : 0);

  useEffect(() => {
    if (!user) navigate({ to: "/auth", search: { next: "/paiement" } as never });
  }, [user, navigate]);

  useEffect(() => {
    if (user && items.length === 0) navigate({ to: "/" });
  }, [items.length, user, navigate]);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.object({ address: z.string().trim().min(5, "Adresse trop courte").max(500) }).safeParse({ address });
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Adresse invalide");
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.from("orders").insert({
        user_id: user.id,
        items: items as unknown as Record<string, unknown>[],
        subtotal,
        shipping: SHIPPING,
        total,
        address: parsed.data.address,
        payment_method: method,
        status: "pending",
      }).select("order_number").single();

      if (error) throw error;

      // TODO: appeler ici l'API Mobile Money réelle
      await new Promise((r) => setTimeout(r, 800));

      clear();
      toast.success("Paiement enregistré");
      navigate({ to: "/confirmation", search: { ref: data.order_number } as never });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-black sm:text-3xl">Paiement</h1>

        <form onSubmit={pay} className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <section className="rounded-2xl border bg-card p-5">
              <h2 className="mb-3 font-display text-lg font-black">Adresse de livraison</h2>
              <p className="mb-2 text-sm text-muted-foreground">
                Client : <b>{profile?.full_name}</b> · {profile?.phone}
              </p>
              <Label htmlFor="address">Adresse complète</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Quartier, rue, repère… (Bouaké, Abidjan, …)"
                rows={4}
                required
                className="mt-1"
              />
            </section>

            <section className="rounded-2xl border bg-card p-5">
              <h2 className="mb-3 font-display text-lg font-black">Méthode de paiement</h2>
              <div className="grid gap-2 sm:grid-cols-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`rounded-xl border-2 p-4 text-center font-bold transition ${
                      method === m.id ? "border-primary shadow-[var(--shadow-cta)]" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full ${m.color} text-sm`}>
                      {m.label[0]}
                    </div>
                    <span className="text-sm">{m.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Vous recevrez une notification sur votre téléphone pour valider le paiement.
              </p>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
            <h2 className="mb-4 font-display text-lg font-black">Récapitulatif</h2>
            <ul className="mb-4 space-y-2 text-sm">
              {items.map((i) => (
                <li key={`${i.productId}-${i.size}-${i.color}`} className="flex justify-between gap-2">
                  <span className="truncate text-muted-foreground">{i.name} × {i.quantity}</span>
                  <span className="font-semibold">{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-1 border-t pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Livraison</span><span>{formatPrice(SHIPPING)}</span></div>
              <div className="flex justify-between text-base font-black"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
            </div>
            <Button type="submit" size="lg" className="mt-5 w-full" disabled={loading}>
              {loading ? "Traitement…" : "Payer maintenant"}
            </Button>
          </aside>
        </form>
      </div>
    </Layout>
  );
}
