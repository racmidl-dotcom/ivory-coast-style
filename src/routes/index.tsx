import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

type Search = { q?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: HomePage,
});

function HomePage() {
  const { q } = Route.useSearch();
  const [cat, setCat] = useState<Category | "all">("all");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (min && p.price < Number(min)) return false;
      if (max && p.price > Number(max)) return false;
      if (onlyNew && !p.isNew) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, min, max, onlyNew, q]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-2">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Nouvelle collection
            </span>
            <h1 className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl">
              La mode ivoirienne <br />à prix imbattables
            </h1>
            <p className="mt-3 max-w-md text-base text-primary-foreground/90 sm:text-lg">
              Homme, Femme, Enfant — Livraison rapide dans toute la sous-région. Paiement Mobile Money sécurisé.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#produits">
                <Button size="lg" variant="secondary" className="font-bold">Découvrir les nouveautés</Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-primary-foreground/90">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Livraison CI, Mali, BF, Niger, Bénin, Togo</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Paiement sécurisé</span>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              <img src={PRODUCTS[4].image} alt="" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-2xl" />
              <img src={PRODUCTS[7].image} alt="" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery zone banner */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Truck className="h-5 w-5 text-primary" />
              Livraison express disponible dans 6 pays
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { flag: "🇨🇮", name: "Côte d'Ivoire" },
                { flag: "🇲🇱", name: "Mali" },
                { flag: "🇧🇫", name: "Burkina Faso" },
                { flag: "🇳🇪", name: "Niger" },
                { flag: "🇧🇯", name: "Bénin" },
                { flag: "🇹🇬", name: "Togo" },
              ].map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm"
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <section id="produits" className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-black sm:text-3xl">Nos produits</h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} article{filtered.length > 1 ? "s" : ""} {q ? `pour "${q}"` : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Button
                key={c.value}
                size="sm"
                variant={cat === c.value ? "default" : "outline"}
                onClick={() => setCat(c.value)}
                className="rounded-full"
              >
                {c.label}
              </Button>
            ))}
            <Button
              size="sm"
              variant={onlyNew ? "default" : "outline"}
              onClick={() => setOnlyNew((v) => !v)}
              className="rounded-full"
            >
              ✨ Nouveautés
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3">
          <span className="text-sm font-semibold text-muted-foreground">Prix (FCFA) :</span>
          <Input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="h-9 w-28"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="h-9 w-28"
          />
          {(min || max || onlyNew || cat !== "all") && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => { setMin(""); setMax(""); setOnlyNew(false); setCat("all"); }}
            >
              Réinitialiser
            </Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center text-muted-foreground">
            Aucun produit ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
