import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";

interface AuthActionResult {
  error?: string;
  needsEmailConfirmation?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signUp: (email: string, password: string) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
