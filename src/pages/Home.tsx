import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-2xl animate-fade-in">
        <div className="animate-float">
          <img src={logoImage} alt="Little Giants Logo" className="w-32 h-32 mx-auto mb-4" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-heading font-bold text-primary animate-wiggle">
          Little Giants 🌱
        </h1>
        
        <p className="text-2xl md:text-3xl font-heading font-semibold text-secondary animate-fade-in">
          Pequenos gestos, grandes mudanças
        </p>
        
        <p className="text-lg text-muted-foreground font-body max-w-lg mx-auto">
          Venha fazer parte da Vila de Esperançópolis e aprenda como pequenas ações podem transformar o mundo!
        </p>
        
        <div className="pt-6 space-y-4">
          <Button 
            variant="play" 
            size="lg"
            onClick={() => navigate("/map")}
            className="w-full md:w-auto"
          >
            🎮 Jogar Agora
          </Button>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="px-4 py-2 bg-card rounded-xl shadow-card border border-primary/20">
              <span className="text-primary font-heading font-bold">🌟 Cooperação</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-xl shadow-card border border-accent/20">
              <span className="text-accent font-heading font-bold">💚 Empatia</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-xl shadow-card border border-pink/20">
              <span className="text-pink font-heading font-bold">🤝 Solidariedade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
