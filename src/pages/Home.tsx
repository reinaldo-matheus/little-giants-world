import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import backgroundVillage from "@/assets/characters-group-2d.png";
export const Home = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden" style={{
    backgroundImage: `url(${backgroundVillage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'hsl(var(--background))'
  }}>
      {/* Gradient overlays for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/15"></div>
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white/65 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{
        animationDelay: '0.5s'
      }}></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-pink/40 rounded-full animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-6 md:space-y-8 max-w-3xl animate-fade-in relative z-20 -mt-12 md:-mt-16">
        
        
        
        
        <p className="text-sm md:text-base lg:text-lg text-foreground font-body max-w-lg mx-auto bg-card/90 backdrop-blur-md px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-card border-2 border-primary/20 mt-6">
          Venha fazer parte da Vila de Esperançópolis e aprenda como pequenas ações podem transformar o mundo!
        </p>
        
        <div className="pt-8 md:pt-10 space-y-8 md:space-y-10">
          <Button variant="play" size="lg" onClick={() => navigate("/character-selection")} className="w-full md:w-auto text-lg md:text-xl lg:text-2xl px-8 md:px-12 lg:px-16 py-5 md:py-6 shadow-glow hover:scale-105 transition-transform duration-300">
            🎮 Jogar Agora
          </Button>
          
          <div className="space-y-4">
            
            
            
          </div>
        </div>
      </div>
    </div>;
};