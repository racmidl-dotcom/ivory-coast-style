import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const { count } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/", search: { q: query || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display font-black">
            K
          </div>
          <span className="hidden font-display text-xl font-black text-foreground sm:inline">
            Kassa<span className="text-primary">CI</span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="hidden flex-1 max-w-2xl md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un vêtement, marque, catégorie…"
              className="h-11 pl-10 pr-24"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 h-9 -translate-y-1/2">
              Rechercher
            </Button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[140px] truncate text-sm text-muted-foreground">
                {profile?.full_name ?? "Mon compte"}
              </span>
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Déconnexion">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/auth" className="hidden sm:block">
              <Button variant="ghost" className="gap-2">
                <User className="h-4 w-4" /> Connexion
              </Button>
            </Link>
          )}

          <Link to="/panier" className="relative">
            <Button variant="ghost" size="icon" aria-label="Panier">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="h-11 pl-10"
              />
            </div>
          </form>
          {user ? (
            <Button variant="outline" className="w-full gap-2" onClick={() => { signOut(); setOpen(false); }}>
              <LogOut className="h-4 w-4" /> Déconnexion ({profile?.full_name})
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button className="w-full gap-2">
                <User className="h-4 w-4" /> Connexion / Inscription
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
