import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CharacterSelection } from "./pages/CharacterSelection";
import { VillageMap } from "./pages/VillageMap";
import { GardenMission } from "./pages/GardenMission";
import { EnvironmentMission } from "./pages/EnvironmentMission";
import { Reward } from "./pages/Reward";
import { MarketMission } from "./pages/MarketMission";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character-selection" element={<CharacterSelection />} />
          <Route path="/map" element={<VillageMap />} />
          <Route path="/mission/garden" element={<GardenMission />} />
          <Route path="/mission/environment" element={<EnvironmentMission />} />
          <Route path="/mission/market" element={<MarketMission />} />
          <Route path="/reward" element={<Reward />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
