import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Phone } from "lucide-react";

type Search = { ref?: string };

export const Route = createFileRoute("/confirmation")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { ref } = Route.useSearch();

  return (
    <Layout>
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="font-display text-3xl font-black">Commande confirmée !</h1>
        <p className="mt-2 text-muted-foreground">
          Merci pour votre achat. Nous préparons votre colis.
        </p>

        {ref && (
          <div className="mx-auto mt-6 inline-block rounded-xl border bg-card px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Numéro de commande</p>
            <p className="font-display text-xl font-black text-primary">{ref}</p>
          </div>
        )}

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-4">
            <Package className="mb-2 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">Livraison</p>
            <p className="text-xs text-muted-foreground">Vous serez contacté pour planifier la remise.</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <Phone className="mb-2 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">Support</p>
            <p className="text-xs text-muted-foreground">Bouaké · 07 20 98 78 12 · 07h–19h</p>
          </div>
        </div>

        <Link to="/"><Button size="lg" className="mt-8">Continuer mes achats</Button></Link>
      </div>
    </Layout>
  );
}
