import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  className?: string;
  locked?: boolean;
}

export const GameCard = ({ title, description, icon, onClick, className, locked = false }: GameCardProps) => {
  return (
    <Card className={cn(
      "p-6 cursor-pointer transition-all hover:scale-105 shadow-card hover:shadow-button border-2 border-primary/20 hover:border-primary bg-card",
      locked && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={!locked ? onClick : undefined}
    >
      <div className="text-center space-y-4">
        <div className="text-6xl animate-float">{icon}</div>
        <h3 className="text-2xl font-heading font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground font-body">{description}</p>
        {locked ? (
          <div className="text-muted-foreground font-semibold">🔒 Em breve</div>
        ) : (
          <Button variant="play" size="sm">Jogar</Button>
        )}
      </div>
    </Card>
  );
};
