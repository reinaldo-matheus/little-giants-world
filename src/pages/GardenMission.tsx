import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import gardenImage from "@/assets/garden-mission.jpg";
export const GardenMission = () => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const tasks = [{
    id: 1,
    icon: "🌱",
    title: "Preparar a Terra",
    description: "Cave e prepare o solo para plantar"
  }, {
    id: 2,
    icon: "🌾",
    title: "Plantar Sementes",
    description: "Coloque as sementes na terra com cuidado"
  }, {
    id: 3,
    icon: "💧",
    title: "Regar as Plantas",
    description: "Dê água para as plantinhas crescerem"
  }, {
    id: 4,
    icon: "🥕",
    title: "Colher os Vegetais",
    description: "Colha os vegetais quando estiverem prontos"
  }];
  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      if (completedTasks.length + 1 === tasks.length) {
        setTimeout(() => navigate("/reward"), 1000);
      }
    }
  };
  const progress = completedTasks.length / tasks.length * 100;
  return <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{
    backgroundImage: `url(${gardenImage})`
  }}>
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate("/map")}>
            <ArrowLeft className="mr-2" /> Voltar ao Mapa
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary drop-shadow-lg mb-2">
              Fase 1: Horta Comunitária 🌱
            </h1>
            <div className="bg-card/90 rounded-full px-6 py-2 shadow-card border border-primary/20">
              <p className="text-sm font-body font-semibold text-foreground">
                Progresso: {completedTasks.length}/{tasks.length} tarefas
              </p>
            </div>
          </div>
          
          <div className="w-24" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-card border border-primary/20">
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-hero transition-all duration-500" style={{
              width: `${progress}%`
            }} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {tasks.map(task => {
            const isCompleted = completedTasks.includes(task.id);
            return <Card key={task.id} className={`p-6 transition-all border-2 ${isCompleted ? 'bg-primary/10 border-primary shadow-glow' : 'bg-card/90 backdrop-blur-sm border-primary/20 shadow-card'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl animate-float">{task.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {task.title}
                      </h3>
                      <p className="text-muted-foreground font-body mb-4">
                        {task.description}
                      </p>
                      
                      {isCompleted ? <div className="flex items-center gap-2 text-primary font-semibold">
                          <CheckCircle className="w-5 h-5" />
                          Completo!
                        </div> : <Button variant="default" size="sm" onClick={() => handleTaskComplete(task.id)}>
                          Realizar Tarefa
                        </Button>}
                    </div>
                  </div>
                </Card>;
          })}
          </div>

          <Card className="bg-accent/10 backdrop-blur-sm border-2 border-accent/30 p-6 shadow-card">
            <h3 className="text-xl font-heading mb-3 text-blue-950 font-extrabold">💡 Você Sabia ?</h3>
            <p className="text-foreground font-body">
              Quando trabalhamos juntos em uma horta comunitária, não apenas produzimos alimentos saudáveis, 
              mas também fortalecemos nossa comunidade e aprendemos valores importantes como cooperação, 
              paciência e respeito pela natureza!
            </p>
          </Card>
        </div>
      </div>
    </div>;
};