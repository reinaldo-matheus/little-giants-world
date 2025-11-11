import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import charactersGroup from "@/assets/characters-group-2d.png";
import backgroundVillage from "@/assets/background-village-anime.jpg";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundVillage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-pink/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main content */}
      <div className="text-center space-y-4 max-w-3xl animate-fade-in relative z-20">
        {/* Characters Group - Above Title */}
        <div className="relative z-10 mb-2 animate-fade-in">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto animate-float">
            <img 
              src={charactersGroup} 
              alt="Lia, Nina e Zeca - Personagens principais" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold logo-title animate-wiggle mb-2">
          Little Giants 🌱
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-accent drop-shadow-lg mb-4">
          Pequenos gestos, grandes mudanças
        </p>
        
        <p className="text-base md:text-lg text-foreground font-body max-w-lg mx-auto bg-card/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-card border-2 border-primary/20">
          Venha fazer parte da Vila de Esperançópolis e aprenda como pequenas ações podem transformar o mundo!
        </p>
        
        <div className="pt-6 space-y-6">
          <Button 
            variant="play" 
            size="lg"
            onClick={() => navigate("/map")}
            className="w-full md:w-auto text-xl md:text-2xl px-10 md:px-16 py-6 shadow-glow"
          >
            🎮 Jogar Agora
          </Button>
          
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
            <div className="px-6 md:px-8 py-3 md:py-4 bg-card/95 backdrop-blur-md rounded-2xl shadow-card border-3 border-primary/40 hover:scale-110 hover:shadow-glow transition-all duration-300 cursor-default">
              <span className="text-primary font-heading font-bold text-base md:text-lg drop-shadow-sm">🌿 Cooperação</span>
            </div>
            <div className="px-6 md:px-8 py-3 md:py-4 bg-card/95 backdrop-blur-md rounded-2xl shadow-card border-3 border-accent/40 hover:scale-110 hover:shadow-glow transition-all duration-300 cursor-default">
              <span className="text-accent font-heading font-bold text-base md:text-lg drop-shadow-sm">💙 Empatia</span>
            </div>
            <div className="px-6 md:px-8 py-3 md:py-4 bg-card/95 backdrop-blur-md rounded-2xl shadow-card border-3 border-pink/40 hover:scale-110 hover:shadow-glow transition-all duration-300 cursor-default">
              <span className="text-pink font-heading font-bold text-base md:text-lg drop-shadow-sm">❤️ Solidariedade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
