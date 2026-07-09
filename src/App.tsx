import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RisePrompt from "./pages/rise/RisePrompt";
import RiseJournal from "./pages/rise/RiseJournal";
import RiseProgress from "./pages/rise/RiseProgress";
import RiseProfile from "./pages/rise/RiseProfile";
import LandPrompt from "./pages/land/LandPrompt";
import LandJournal from "./pages/land/LandJournal";
import LandProgress from "./pages/land/LandProgress";
import LandProfile from "./pages/land/LandProfile";

const queryClient = new QueryClient();

const protectedPage = (page: JSX.Element) => <ProtectedRoute>{page}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={protectedPage(<Index />)} />
            <Route path="/rise" element={protectedPage(<RisePrompt />)} />
            <Route path="/rise/journal" element={protectedPage(<RiseJournal />)} />
            <Route path="/rise/progress" element={protectedPage(<RiseProgress />)} />
            <Route path="/rise/profile" element={protectedPage(<RiseProfile />)} />
            <Route path="/land" element={protectedPage(<LandPrompt />)} />
            <Route path="/land/journal" element={protectedPage(<LandJournal />)} />
            <Route path="/land/progress" element={protectedPage(<LandProgress />)} />
            <Route path="/land/profile" element={protectedPage(<LandProfile />)} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
