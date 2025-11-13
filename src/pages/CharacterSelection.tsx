import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import lunaImg from "@/assets/character-luna.png";
import caioImg from "@/assets/character-caio.png";
import ninaImg from "@/assets/character-nina.png";
import backgroundImg from "@/assets/background-character-selection.jpg";

const characters = [
  {
    id: "luna",
    name: "Luna",
    emoji: "🌻",
    description: "curiosa e criativa, adora aprender novas formas de ajudar a comunidade.",
    image: lunaImg,
    greeting: "Oi! Sou a Luna! Adoro descobrir coisas novas. Vamos juntos ajudar a nossa vila?"
  },
  {
    id: "caio",
    name: "Caio",
    emoji: "🌿",
    description: "calmo e prestativo, acredita que cooperação transforma o mundo.",
    image: caioImg,
    greeting: "Olá! Eu sou o Caio. Juntos somos mais fortes! Vamos cooperar para ajudar todos?"
  },
  {
    id: "nina",
    name: "Nina",
    emoji: "💧",
    description: "alegre e solidária, sempre disposta a cuidar de todos.",
    image: ninaImg,
    greeting: "Oi, oi! Nina aqui! Que bom te ver por aqui! Vamos juntos cuidar da nossa vila?"
  }
];

export const CharacterSelection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const navigate = useNavigate();

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId);
    setShowGreeting(true);
    
    // Som de confirmação (toast com som)
    const character = characters.find(c => c.id === characterId);
    toast.success(`${character?.name} selecionado(a)!`, {
      description: "Personagem escolhido com sucesso! ✨",
      duration: 2000,
    });
  };

  const handleStartMission = () => {
    if (!selectedCharacter) {
      toast.error("Escolha um personagem primeiro!", {
        description: "Selecione seu Pequeno Gigante para começar a aventura.",
      });
      return;
    }
    
    // Salvar personagem selecionado no localStorage
    localStorage.setItem("selectedCharacter", selectedCharacter);
    navigate("/map");
  };

  const selectedCharacterData = characters.find(c => c.id === selectedCharacter);

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-6xl w-full animate-fade-in">
        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-4 text-secondary drop-shadow-lg">
          Escolha seu Pequeno Gigante
        </h1>
        
        <p className="text-lg md:text-xl text-center mb-12 text-foreground font-body bg-card/90 backdrop-blur-md px-6 py-3 rounded-2xl max-w-2xl mx-auto shadow-card">
          Selecione o personagem que vai acompanhar você nessa jornada de cooperação e solidariedade!
        </p>

        {/* Cards dos personagens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleSelectCharacter(character.id)}
              className={`
                relative bg-card/95 backdrop-blur-md rounded-3xl p-6 cursor-pointer
                transition-all duration-300 hover:scale-105
                border-4 shadow-card
                ${selectedCharacter === character.id 
                  ? 'border-primary shadow-glow scale-105 animate-pulse' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              {/* Imagem do personagem */}
              <div className="relative mb-4 flex justify-center">
                <div className={`
                  transition-transform duration-500
                  ${selectedCharacter === character.id ? 'animate-bounce' : ''}
                `}>
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-48 h-48 object-contain drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Info do personagem */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {character.emoji} {character.name}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground font-body">
                  {character.description}
                </p>
              </div>

              {/* Indicador de seleção */}
              {selectedCharacter === character.id && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-2xl animate-scale-in">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mensagem do personagem selecionado */}
        {showGreeting && selectedCharacterData && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-card/95 backdrop-blur-md rounded-3xl p-6 max-w-2xl mx-auto shadow-card border-3 border-primary/40">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedCharacterData.image} 
                  alt={selectedCharacterData.name}
                  className="w-20 h-20 object-contain animate-wiggle"
                />
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-body text-foreground leading-relaxed">
                    "{selectedCharacterData.greeting}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botão de começar */}
        <div className="flex justify-center">
          <Button
            variant="play"
            size="lg"
            onClick={handleStartMission}
            disabled={!selectedCharacter}
            className="text-xl md:text-2xl px-12 py-6 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Começar minha missão!
          </Button>
        </div>
      </div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-3 h-3 bg-secondary/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-pink/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};
