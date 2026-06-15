import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

type Search = { next?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  component: AuthPage,
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(80),
  phone: z.string().trim().regex(/^[0-9 +\-]{8,20}$/, "Numéro invalide"),
  password: z.string().min(6, "6 caractères minimum").max(72),
});
const loginSchema = z.object({
  phone: z.string().trim().regex(/^[0-9 +\-]{8,20}$/, "Numéro invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

function AuthPage() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: (next as "/" | undefined) ?? "/" });
  }, [user, next, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.parse({ fullName, phone, password });
        await signUp(parsed.fullName, parsed.phone, parsed.password);
        toast.success("Compte créé", { description: "Bienvenue sur KassaCI !" });
      } else {
        const parsed = loginSchema.parse({ phone, password });
        await signIn(parsed.phone, parsed.password);
        toast.success("Connecté");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof z.ZodError ? err.issues[0]?.message :
        err instanceof Error ? err.message : "Erreur";
      toast.error(msg || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="mb-5 grid grid-cols-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode("login")}
              className={`rounded-md py-2 text-sm font-semibold transition ${mode === "login" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >Connexion</button>
            <button
              onClick={() => setMode("signup")}
              className={`rounded-md py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >Inscription</button>
          </div>

          <h1 className="font-display text-2xl font-black">
            {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Connectez-vous pour finaliser votre commande." : "Pas besoin d'email — juste votre numéro."}
          </p>

          <form onSubmit={submit} className="mt-5 space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fullName">Nom complet</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={80} className="mt-1" />
              </div>
            )}
            <div>
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" inputMode="tel" placeholder="07 20 98 78 12" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1" />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Patientez…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">← Retour à la boutique</Link>
        </p>
      </div>
    </Layout>
  );
}
