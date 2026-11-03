import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import characters from "@/assets/characters-group-2d.png";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home-screen">
      <section className="home-welcome" aria-labelledby="home-title">
        <h1 id="home-title" className="sr-only">Little Giants — Pequenos gestos, grandes mudanças</h1>
        <div className="home-artwork">
          <img
            src={characters}
            alt="Três amigos abraçados na Vila de Esperançópolis, sob o título Little Giants: Pequenos gestos, grandes mudanças."
            width={1536}
            height={1024}
            fetchPriority="high"
          />
        </div>
        <div className="home-actions">
          <Button
            variant="play"
            size="lg"
            onClick={() => navigate("/character-selection")}
            className="home-play"
          >
            <span aria-hidden="true">🎮</span> Jogar Agora
          </Button>
          <p className="home-intro">
            Venha fazer parte da Vila de Esperançópolis e aprenda como pequenas ações podem transformar o mundo!
          </p>
        </div>
      </section>
    </main>
  );
};
