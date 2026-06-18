import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display font-black text-primary-foreground">
              K
            </div>
            <span className="font-display text-xl font-black">
              Kassa<span className="text-primary">CI</span>
            </span>
          </div>
          <p className="text-sm text-background/70">
            Votre boutique de vêtements en Côte d'Ivoire. Livraison rapide partout dans le pays.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Boutique</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Située à Bouaké — Livraison 🇨🇮 🇲🇱 🇧🇫 🇳🇪 🇧🇯 🇹🇬</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> 07 20 98 78 12</li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Lun – Dim, 07h – 19h</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Liens utiles</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li><a href="#" className="hover:text-primary">À propos</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
            <li><a href="#" className="hover:text-primary">Politique de retour</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Paiement</h4>
          <p className="text-sm text-background/70">Mobile Money accepté :</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-primary px-2 py-1 font-bold text-primary-foreground">Orange Money</span>
            <span className="rounded-md bg-background/10 px-2 py-1">MTN</span>
            <span className="rounded-md bg-background/10 px-2 py-1">Wave</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-4 text-center text-xs text-background/60">
        © {new Date().getFullYear()} KassaCI — Tous droits réservés.
      </div>
    </footer>
  );
}
