import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rise" element={<RisePrompt />} />
          <Route path="/rise/journal" element={<RiseJournal />} />
          <Route path="/rise/progress" element={<RiseProgress />} />
          <Route path="/rise/profile" element={<RiseProfile />} />
          <Route path="/land" element={<LandPrompt />} />
          <Route path="/land/journal" element={<LandJournal />} />
          <Route path="/land/progress" element={<LandProgress />} />
          <Route path="/land/profile" element={<LandProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
