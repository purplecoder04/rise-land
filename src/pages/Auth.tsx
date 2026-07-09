import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { isSupabaseConfigured } from "@/integrations/supabase/client";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { loading, signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";

  if (!loading && user) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const result =
      mode === "login" ? await signIn(email.trim(), password) : await signUp(email.trim(), password);

    setSubmitting(false);

    if (result.error) {
      toast({
        title: mode === "login" ? "Login failed" : "Sign up failed",
        description: result.error,
      });
      return;
    }

    if (result.needsEmailConfirmation) {
      toast({
        title: "Check your email",
        description: "Confirm your account, then come back to log in.",
      });
      return;
    }

    toast({
      title: mode === "login" ? "Welcome back" : "Account created",
      description: "Your journal space is ready.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl font-light tracking-wide text-foreground">Rise & Land</h1>
          <p className="font-body text-sm text-foreground/60">Sign in to save your private journal entries.</p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-3">
            <p className="font-display text-xl font-light text-foreground">Connect Supabase</p>
            <p className="font-body text-sm leading-relaxed text-foreground/65">
              Add your Supabase URL and anon key to a local .env file, then run the journal entries migration.
            </p>
            <div className="rounded-xl bg-background/70 p-3 font-mono text-xs text-foreground/70 space-y-1">
              <p>VITE_SUPABASE_URL=...</p>
              <p>VITE_SUPABASE_ANON_KEY=...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="font-body text-xs font-medium tracking-widest uppercase text-foreground/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="font-body text-xs font-medium tracking-widest uppercase text-foreground/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                minLength={6}
                required
              />
            </div>

            <Button type="submit" variant="rise" className="w-full" disabled={submitting}>
              {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
            </Button>
          </form>
        )}

        {isSupabaseConfigured && (
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full text-center font-body text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
