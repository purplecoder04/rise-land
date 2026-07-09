import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="font-body text-sm text-foreground/60">Opening your private space...</p>
      </div>
    );
  }

  if (!isSupabaseConfigured || !user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
