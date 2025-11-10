import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import characterGirl from "@/assets/character-3d-girl-garden.png";
import characterBoy from "@/assets/character-3d-boy-backpack.png";
import characterFruits from "@/assets/character-3d-girl-fruits.png";
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/20"></div>
      
      {/* 3D Characters - Dynamic Composition */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left character - Girl with garden */}
        <div className="absolute left-0 md:left-10 bottom-0 w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
          <img 
            src={characterGirl} 
            alt="Personagem menina com jardineira" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Right character - Boy with backpack */}
        <div 
          className="absolute right-0 md:right-10 bottom-0 w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float" 
          style={{ animationDelay: '0.3s' }}
        >
          <img 
            src={characterBoy} 
            alt="Personagem menino com mochila" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Center back character - Girl with fruits (smaller, creating depth) */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 top-10 md:top-16 w-32 h-32 md:w-48 md:h-48 animate-float" 
          style={{ animationDelay: '0.6s' }}
        >
          <img 
            src={characterFruits} 
            alt="Personagem menina com cesto de frutas" 
            className="w-full h-full object-contain drop-shadow-2xl opacity-90"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-6 max-w-2xl animate-fade-in relative z-20">
        
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
