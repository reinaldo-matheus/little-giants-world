import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import characterGirl from "@/assets/character-girl-garden.png";
import characterBoy from "@/assets/character-boy-backpack.png";
import characterFruits from "@/assets/character-girl-fruits.png";
import hillsBackground from "@/assets/hills-background.jpg";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-gradient-sky relative flex items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${hillsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/30"></div>
      
      {/* Characters at the top */}
      <div className="absolute top-4 md:top-8 left-0 right-0 flex justify-center gap-4 md:gap-8 px-4 z-10">
        <div className="animate-float w-20 h-20 md:w-32 md:h-32">
          <img 
            src={characterGirl} 
            alt="Personagem menina com jardineira" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
        <div className="animate-float w-20 h-20 md:w-32 md:h-32" style={{ animationDelay: '0.2s' }}>
          <img 
            src={characterBoy} 
            alt="Personagem menino com mochila" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
        <div className="animate-float w-20 h-20 md:w-32 md:h-32" style={{ animationDelay: '0.4s' }}>
          <img 
            src={characterFruits} 
            alt="Personagem menina com cesto de frutas" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-6 max-w-2xl animate-fade-in relative z-10 mt-24 md:mt-32">
        <div className="animate-float">
          <img src={logoImage} alt="Little Giants Logo" className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 drop-shadow-2xl" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold logo-title animate-wiggle">
          Little Giants 🌱
        </h1>
        
        <p className="text-xl md:text-3xl font-heading font-semibold text-secondary drop-shadow-md">
          Pequenos gestos, grandes mudanças
        </p>
        
        <p className="text-base md:text-lg text-foreground font-body max-w-lg mx-auto bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-card">
          Venha fazer parte da Vila de Esperançópolis e aprenda como pequenas ações podem transformar o mundo!
        </p>
        
        <div className="pt-4 space-y-4">
          <Button 
            variant="play" 
            size="lg"
            onClick={() => navigate("/map")}
            className="w-full md:w-auto text-lg md:text-xl px-8 md:px-12"
          >
            🎮 Jogar Agora
          </Button>
          
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <div className="px-4 md:px-6 py-2 md:py-3 bg-card/90 backdrop-blur-sm rounded-xl shadow-button border-2 border-primary/30 hover:scale-105 transition-transform">
              <span className="text-primary font-heading font-bold text-sm md:text-base">🌿 Cooperação</span>
            </div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-card/90 backdrop-blur-sm rounded-xl shadow-button border-2 border-accent/30 hover:scale-105 transition-transform">
              <span className="text-accent font-heading font-bold text-sm md:text-base">💙 Empatia</span>
            </div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-card/90 backdrop-blur-sm rounded-xl shadow-button border-2 border-pink/30 hover:scale-105 transition-transform">
              <span className="text-pink font-heading font-bold text-sm md:text-base">❤️ Solidariedade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
