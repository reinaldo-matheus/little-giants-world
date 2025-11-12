import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import villageMapImage from "@/assets/village-map.jpg";
import { ArrowLeft, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const VillageMap = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${villageMapImage})` }}
    >
      {/* Overlay suave com efeito de manhã ensolarada */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-secondary/10" />
      
      {/* Partículas de luz flutuando */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-secondary/50 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-accent/40 rounded-full animate-float blur-sm" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-60 left-1/3 w-3 h-3 bg-pink/30 rounded-full animate-float blur-sm" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float blur-sm" style={{ animationDelay: '1.8s' }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header com navegação */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/")}
            className="bg-card/95 backdrop-blur-md border-2 border-primary/40 hover:border-primary shadow-card"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary drop-shadow-lg">
              Vila de Esperançópolis 🏡
            </h1>
            <p className="text-lg md:text-xl font-body text-accent drop-shadow-md mt-2">
              Escolha um local para começar sua próxima missão!
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-3 bg-card/95 backdrop-blur-md rounded-full shadow-card border-2 border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300">
                <Settings className="w-5 h-5 text-primary" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading text-primary">⚙️ Configurações</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-heading font-semibold text-foreground">Volume da Música</label>
                  <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Grid de locais com animações */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <GameCard
            icon="🌱"
            title="Horta Comunitária"
            description="Aprenda a plantar e cuidar junto com seus amigos!"
            onClick={() => navigate("/mission/garden")}
            className="animate-fade-in"
          />
          
          <GameCard
            icon="🏫"
            title="Escola da Vila"
            description="Descubra como aprender e ensinar podem mudar vidas."
            onClick={() => navigate("/mission/school")}
            locked
            className="animate-fade-in"
            style={{ animationDelay: '0.1s' } as React.CSSProperties}
          />
          
          <GameCard
            icon="🎪"
            title="Praça Comunitária"
            description="Organize eventos e celebre a união da comunidade."
            onClick={() => navigate("/mission/square")}
            locked
            className="animate-fade-in"
            style={{ animationDelay: '0.2s' } as React.CSSProperties}
          />
          
          <GameCard
            icon="🧺"
            title="Feira Solidária"
            description="Aprenda sobre comércio justo e colaboração."
            onClick={() => navigate("/mission/market")}
            locked
            className="animate-fade-in"
            style={{ animationDelay: '0.3s' } as React.CSSProperties}
          />
        </div>

        {/* Barra de progresso temática */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' } as React.CSSProperties}>
          <div className="inline-block bg-card/95 backdrop-blur-md rounded-2xl shadow-glow p-6 border-2 border-primary/40 hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌞</span>
              <div className="flex-1">
                <p className="text-xl font-heading font-semibold text-foreground mb-2">
                  Missões Completadas: 0/4
                </p>
                {/* Barra de progresso visual */}
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden border-2 border-primary/30">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
              <span className="text-3xl opacity-30">🌻</span>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Complete todas as missões para desbloquear a fase final!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
