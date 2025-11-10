import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy, Star, Heart, Sparkles } from "lucide-react";

export const Reward = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-sunset flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-glow border-2 border-primary text-center space-y-6 animate-scale-in">
        <div className="animate-bounce-soft">
          <Trophy className="w-24 h-24 text-secondary mx-auto mb-4" />
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary animate-wiggle">
          Parabéns! 🎉
        </h1>

        <p className="text-2xl font-heading font-semibold text-foreground">
          Você completou a Horta Comunitária!
        </p>

        <div className="flex justify-center gap-4 my-8">
          <div className="animate-float">
            <Star className="w-16 h-16 text-secondary" fill="currentColor" />
          </div>
          <div className="animate-float" style={{ animationDelay: '0.2s' }}>
            <Star className="w-16 h-16 text-secondary" fill="currentColor" />
          </div>
          <div className="animate-float" style={{ animationDelay: '0.4s' }}>
            <Star className="w-16 h-16 text-secondary" fill="currentColor" />
          </div>
        </div>

        <Card className="bg-primary/10 border-primary/30 p-6">
          <h3 className="text-xl font-heading font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink" />
            O Que Você Aprendeu
          </h3>
          <ul className="text-left space-y-2 text-foreground font-body">
            <li className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span>Trabalho em equipe faz a diferença</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span>Cuidar da natureza é cuidar de todos nós</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span>Pequenos gestos geram grandes mudanças</span>
            </li>
          </ul>
        </Card>

        <div className="pt-4">
          <p className="text-3xl font-heading font-bold text-secondary mb-6 animate-bounce-soft">
            "Juntos fazemos a diferença!" 💪
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="play" 
              size="lg"
              onClick={() => navigate("/map")}
            >
              🗺️ Voltar ao Mapa
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/")}
            >
              🏠 Tela Inicial
            </Button>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-3xl shadow-button animate-wiggle">
            🏆
          </div>
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-3xl shadow-button animate-wiggle" style={{ animationDelay: '0.2s' }}>
            🌟
          </div>
          <div className="w-16 h-16 bg-pink rounded-full flex items-center justify-center text-3xl shadow-button animate-wiggle" style={{ animationDelay: '0.4s' }}>
            💚
          </div>
        </div>
      </Card>
    </div>
  );
};
