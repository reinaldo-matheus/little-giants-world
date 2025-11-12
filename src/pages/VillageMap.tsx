import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import villageMapImage from "@/assets/village-map.jpg";
import { ArrowLeft } from "lucide-react";

export const VillageMap = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${villageMapImage})` }}
    >
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary drop-shadow-lg">
            Vila de Esperançópolis 🏘️
          </h1>
          
          <div className="w-24" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <GameCard
            icon="🌱"
            title="Horta Comunitária"
            description="Aprenda a plantar e cuidar de uma horta com seus amigos!"
            onClick={() => navigate("/mission/garden")}
          />
          
          <GameCard
            icon="🏫"
            title="Escola"
            description="Descubra como estudar e ensinar podem mudar vidas!"
            onClick={() => navigate("/mission/school")}
            locked
          />
          
          <GameCard
            icon="🎪"
            title="Praça"
            description="Organize eventos e una a comunidade!"
            onClick={() => navigate("/mission/square")}
            locked
          />
          
          <GameCard
            icon="🛒"
            title="Feira"
            description="Aprenda sobre comércio justo e solidário!"
            onClick={() => navigate("/mission/market")}
            locked
          />
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-card/90 backdrop-blur-sm rounded-2xl shadow-glow p-6 border-2 border-primary/30">
            <p className="text-xl font-heading font-semibold text-foreground mb-2">
              🌟 Missões Completadas: 0/4
            </p>
            <p className="text-muted-foreground font-body">
              Complete todas as missões para desbloquear a fase final!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
