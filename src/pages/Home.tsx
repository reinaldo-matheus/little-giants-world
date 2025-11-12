import { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeBackground from "@/assets/home-background.png";
import { Volume2, VolumeX, Settings, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Home = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div 
      className="min-h-screen relative flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${homeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Efeitos de partículas sutis */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-secondary/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-pink/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header com botões funcionais */}
      <header className="relative z-50 p-4 flex justify-between items-start">
        {/* Botão Sobre o Projeto (esquerda) */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-card/95 backdrop-blur-md rounded-2xl shadow-card border-2 border-primary/30 hover:border-primary hover:scale-105 transition-all duration-300">
              <Info className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold text-foreground">Sobre o Projeto</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-primary">ℹ️ Sobre o Projeto</DialogTitle>
            </DialogHeader>
            <p className="text-foreground font-body leading-relaxed">
              Um jogo educativo inspirado na <strong>ODS 1 – Erradicação da Pobreza</strong>. 
              Desenvolvido para crianças de 5 a 10 anos, com foco em <strong>empatia</strong>, 
              <strong> cooperação</strong> e <strong>solidariedade</strong>.
            </p>
          </DialogContent>
        </Dialog>

        {/* Ícones funcionais (direita) */}
        <div className="flex gap-3">
          {/* Som */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-card/95 backdrop-blur-md rounded-full shadow-card border-2 border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-muted-foreground" />
            ) : (
              <Volume2 className="w-6 h-6 text-primary" />
            )}
          </button>

          {/* Configurações */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-3 bg-card/95 backdrop-blur-md rounded-full shadow-card border-2 border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300">
                <Settings className="w-6 h-6 text-primary" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading text-primary">⚙️ Configurações</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-heading font-semibold text-foreground">Idioma</label>
                  <select className="w-full p-2 rounded-lg border-2 border-border bg-background font-body">
                    <option>Português (BR)</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-heading font-semibold text-foreground">Volume</label>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="font-heading font-semibold text-foreground">Acessibilidade</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="high-contrast" className="rounded" />
                    <label htmlFor="high-contrast" className="font-body text-sm">Alto contraste</label>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Área clicável central invisível para o botão "Jogar Agora" */}
      <div className="flex-1 flex items-center justify-center relative z-50">
        <button
          onClick={() => navigate("/map")}
          className="absolute z-50"
          style={{
            bottom: '28%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '480px',
            height: '80px',
            background: 'transparent',
            cursor: 'pointer',
            border: 'none'
          }}
          aria-label="Jogar Agora"
        />
      </div>

      {/* Área dos cards de valores (botões na base) */}
      <div className="relative z-50 pb-8">
        <div 
          className="flex gap-4 justify-center px-6"
          style={{
            marginBottom: '40px'
          }}
        >
          {/* Cards transparentes clicáveis sobre os cards da imagem */}
          <button
            className="w-32 h-20 bg-transparent cursor-default"
            aria-label="Cooperação"
          />
          <button
            className="w-32 h-20 bg-transparent cursor-default"
            aria-label="Empatia"
          />
          <button
            className="w-32 h-20 bg-transparent cursor-default"
            aria-label="Solidariedade"
          />
        </div>
      </div>
    </div>
  );
};