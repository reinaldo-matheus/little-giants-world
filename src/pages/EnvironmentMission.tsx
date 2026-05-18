import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Leaf,
  Droplets,
  Trash2,
  Apple,
} from "lucide-react";
import { useState } from "react";

// Dados das missões — cada uma tem quiz de 2 perguntas
const tasks = [
  {
    id: 1,
    icon: "🧼",
    lucideIcon: null,
    title: "Higiene Pessoal",
    description:
      "Aprenda por que lavar as mãos e escovar os dentes protege toda a comunidade.",
    color: "from-blue-400 to-cyan-400",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-300",
    quiz: [
      {
        question: "Quando devemos lavar as mãos?",
        options: [
          "Só quando estiverem sujas de terra",
          "Antes de comer, após usar o banheiro e após tossir",
          "Uma vez por dia, de manhã",
        ],
        correct: 1,
        explanation:
          "Lavar as mãos com sabão e água nos momentos certos elimina germes que causam doenças!",
      },
      {
        question: "Por que a higiene de uma pessoa protege toda a comunidade?",
        options: [
          "Não protege, higiene é só individual",
          "Porque doenças se espalham entre pessoas — higiene quebra essa corrente",
          "Porque deixa o ambiente mais bonito",
        ],
        correct: 1,
        explanation:
          "Quando cada pessoa cuida da própria higiene, doenças como gripe e diarreia não conseguem se espalhar!",
      },
    ],
  },
  {
    id: 2,
    icon: "♻️",
    lucideIcon: null,
    title: "Descarte de Resíduos",
    description:
      "Descubra como separar o lixo corretamente protege o meio ambiente e a saúde.",
    color: "from-green-400 to-emerald-500",
    bgLight: "bg-green-50",
    borderColor: "border-green-300",
    quiz: [
      {
        question: "Lixo jogado em rios e ruas causa:",
        options: [
          "Apenas sujeira visual",
          "Enchentes, doenças e morte de animais",
          "Nenhum problema sério",
        ],
        correct: 1,
        explanation:
          "O lixo mal descartado entope bueiros, causa enchentes e contamina a água que bebemos!",
      },
      {
        question: "O que vai no lixo VERDE (orgânico)?",
        options: [
          "Plástico e vidro",
          "Restos de comida, cascas de frutas e folhas",
          "Pilhas e baterias",
        ],
        correct: 1,
        explanation:
          "Resíduos orgânicos como restos de comida podem virar adubo — como na horta do Educandário de Luz!",
      },
    ],
  },
  {
    id: 3,
    icon: "💧",
    lucideIcon: null,
    title: "Consumo Consciente de Água",
    description: "A água é um bem precioso. Saiba como usar sem desperdiçar.",
    color: "from-sky-400 to-blue-500",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-300",
    quiz: [
      {
        question: "Qual atitude economiza mais água?",
        options: [
          "Deixar a torneira aberta enquanto escova os dentes",
          "Fechar a torneira enquanto escova os dentes",
          "Tomar banho de 30 minutos",
        ],
        correct: 1,
        explanation:
          "Fechar a torneira ao escovar os dentes economiza até 12 litros de água por vez — o suficiente para beber por um dia!",
      },
      {
        question: "Por que a falta de água limpa prejudica a saúde?",
        options: [
          "Não prejudica, só causa sede",
          "Água contaminada transmite doenças como cólera, hepatite e diarreia",
          "Só prejudica animais, não pessoas",
        ],
        correct: 1,
        explanation:
          "Água limpa é essencial para beber, cozinhar e se higienizar. Sem ela, doenças sérias se espalham rápido!",
      },
    ],
  },
  {
    id: 4,
    icon: "🥦",
    lucideIcon: null,
    title: "Alimentação Saudável",
    description:
      "O que comemos afeta nossa saúde e o meio ambiente. Conheça as escolhas certas.",
    color: "from-lime-400 to-green-500",
    bgLight: "bg-lime-50",
    borderColor: "border-lime-300",
    quiz: [
      {
        question: "Qual alimento é mais saudável E mais sustentável?",
        options: [
          "Salgadinho industrializado em embalagem plástica",
          "Fruta fresca ou legume da horta comunitária",
          "Refrigerante com muito açúcar",
        ],
        correct: 1,
        explanation:
          "Frutas e legumes frescos são ricos em vitaminas, geram menos lixo e podem ser cultivados na própria comunidade!",
      },
      {
        question: "O que é uma horta comunitária?",
        options: [
          "Um supermercado de frutas",
          "Um espaço coletivo onde a comunidade cultiva alimentos juntos",
          "Uma loja de plantas decorativas",
        ],
        correct: 1,
        explanation:
          "Hortas comunitárias como a do Educandário de Luz produzem alimento saudável E fortalecem os laços da comunidade!",
      },
    ],
  },
];

type QuizState = {
  taskId: number;
  questionIndex: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  allCorrect: boolean;
  wrongAttempts: number;
};

export const EnvironmentMission = () => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const progress = (completedTasks.length / tasks.length) * 100;

  const handleOpenTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) return;
    setActiveTask(taskId);
    setQuizState({
      taskId,
      questionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      allCorrect: true,
      wrongAttempts: 0,
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (!quizState || quizState.showFeedback) return;
    setQuizState((prev) =>
      prev
        ? { ...prev, selectedAnswer: answerIndex, showFeedback: true }
        : null,
    );
  };

  const handleNext = () => {
    if (!quizState) return;
    const task = tasks.find((t) => t.id === quizState.taskId)!;
    const currentQ = task.quiz[quizState.questionIndex];
    const isCorrect = quizState.selectedAnswer === currentQ.correct;

    if (quizState.questionIndex < task.quiz.length - 1) {
      setQuizState((prev) =>
        prev
          ? {
              ...prev,
              questionIndex: prev.questionIndex + 1,
              selectedAnswer: null,
              showFeedback: false,
              allCorrect: prev.allCorrect && isCorrect,
              wrongAttempts: prev.wrongAttempts + (isCorrect ? 0 : 1),
            }
          : null,
      );
    } else {
      // Finished quiz
      const finalCorrect = quizState.allCorrect && isCorrect;
      setCompletedTasks((prev) => [...prev, quizState.taskId]);
      setActiveTask(null);
      setQuizState(null);

      if (completedTasks.length + 1 === tasks.length) {
        setShowCelebration(true);
        setTimeout(() => navigate("/reward"), 3500);
      }
    }
  };

  const handleRetry = () => {
    if (!quizState) return;
    setQuizState((prev) =>
      prev
        ? {
            ...prev,
            selectedAnswer: null,
            showFeedback: false,
            wrongAttempts: prev.wrongAttempts + 1,
          }
        : null,
    );
  };

  const activeTaskData = tasks.find((t) => t.id === activeTask);
  const currentQuestion =
    quizState && activeTaskData
      ? activeTaskData.quiz[quizState.questionIndex]
      : null;
  const isCorrectAnswer =
    quizState && currentQuestion
      ? quizState.selectedAnswer === currentQuestion.correct
      : false;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(145 65% 92%) 0%, hsl(170 60% 88%) 40%, hsl(200 70% 92%) 100%)",
      }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: "hsl(145 65% 55%)" }}
        />
        <div
          className="absolute top-1/2 -right-24 w-72 h-72 rounded-full opacity-15 animate-float"
          style={{ background: "hsl(200 80% 60%)", animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full opacity-10 animate-float"
          style={{ background: "hsl(45 95% 60%)", animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/map")}
            className="bg-white/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Voltar ao Mapa
          </Button>

          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary drop-shadow-sm">
              🌿 Guardiões do Meio Ambiente
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-body mt-1">
              Aprenda e proteja o planeta e a comunidade!
            </p>
          </div>

          <div className="text-right">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border-2 border-primary/20">
              <p className="text-sm font-heading font-bold text-primary">
                {completedTasks.length}/{tasks.length} ✅
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-card border border-primary/20">
          <div className="flex justify-between text-xs font-body text-muted-foreground mb-2">
            <span>Progresso da missão</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, hsl(145 65% 45%), hsl(170 60% 50%))",
              }}
            />
          </div>
        </div>

        {/* Task cards grid */}
        {!activeTask && !showCelebration && (
          <div className="grid md:grid-cols-2 gap-6">
            {tasks.map((task) => {
              const done = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => handleOpenTask(task.id)}
                  className={`
                    relative rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer
                    ${
                      done
                        ? "bg-primary/10 border-primary shadow-glow opacity-80 cursor-default"
                        : "bg-white/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:scale-102 hover:shadow-button active:scale-98"
                    }
                  `}
                  style={{
                    boxShadow: done ? undefined : "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`text-5xl flex-shrink-0 ${done ? "" : "animate-float"}`}
                      style={{ animationDelay: `${task.id * 0.3}s` }}
                    >
                      {task.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
                        {task.description}
                      </p>
                      {done ? (
                        <div className="flex items-center gap-2 text-primary font-heading font-semibold">
                          <CheckCircle className="w-5 h-5" />
                          Missão concluída! ⭐
                        </div>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="font-heading"
                        >
                          🎮 Iniciar missão
                        </Button>
                      )}
                    </div>
                  </div>
                  {done && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-button">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Quiz Modal */}
        {activeTask && activeTaskData && quizState && currentQuestion && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 animate-fade-in border-2 border-primary/30">
              {/* Quiz header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{activeTaskData.icon}</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {activeTaskData.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Pergunta {quizState.questionIndex + 1} de{" "}
                    {activeTaskData.quiz.length}
                  </p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2 mb-6">
                {activeTaskData.quiz.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      i < quizState.questionIndex
                        ? "bg-primary"
                        : i === quizState.questionIndex
                          ? "bg-primary/50"
                          : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <p className="text-lg font-heading font-semibold text-foreground mb-5 leading-snug">
                {currentQuestion.question}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((opt, i) => {
                  let style =
                    "border-2 border-muted bg-muted/30 hover:border-primary/50 hover:bg-primary/5";
                  if (quizState.showFeedback) {
                    if (i === currentQuestion.correct)
                      style =
                        "border-2 border-green-400 bg-green-50 text-green-800";
                    else if (i === quizState.selectedAnswer)
                      style = "border-2 border-red-400 bg-red-50 text-red-800";
                    else style = "border-2 border-muted bg-muted/20 opacity-50";
                  } else if (quizState.selectedAnswer === i) {
                    style = "border-2 border-primary bg-primary/10";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={quizState.showFeedback}
                      className={`w-full text-left p-4 rounded-2xl font-body text-sm transition-all duration-200 ${style} ${!quizState.showFeedback ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <span className="font-heading font-bold mr-2 text-primary/60">
                        {["A", "B", "C"][i]}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {quizState.showFeedback && (
                <div
                  className={`rounded-2xl p-4 mb-5 border-2 ${isCorrectAnswer ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}
                >
                  <p className="font-heading font-bold text-lg mb-1">
                    {isCorrectAnswer ? "✅ Correto!" : "❌ Quase lá!"}
                  </p>
                  <p className="text-sm font-body text-foreground leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveTask(null);
                    setQuizState(null);
                  }}
                  className="font-heading border-2"
                >
                  Sair
                </Button>
                {quizState.showFeedback && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleNext}
                    className="flex-1 font-heading"
                  >
                    {quizState.questionIndex < activeTaskData.quiz.length - 1
                      ? "Próxima pergunta →"
                      : "✅ Concluir missão!"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Celebration screen */}
        {showCelebration && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(145 65% 45%), hsl(170 60% 50%))",
            }}
          >
            <div className="text-center text-white animate-fade-in">
              <div className="text-8xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">
                Missão Concluída!
              </h2>
              <p className="text-xl md:text-2xl font-body mb-2 opacity-90">
                Você se tornou um Guardião do Meio Ambiente!
              </p>
              <p className="text-lg font-body opacity-75">
                Redirecionando para a recompensa... 🌟
              </p>
              <div className="flex justify-center gap-4 mt-8 text-5xl">
                <span className="animate-float">🌿</span>
                <span
                  className="animate-float"
                  style={{ animationDelay: "0.3s" }}
                >
                  💧
                </span>
                <span
                  className="animate-float"
                  style={{ animationDelay: "0.6s" }}
                >
                  ♻️
                </span>
                <span
                  className="animate-float"
                  style={{ animationDelay: "0.9s" }}
                >
                  🥦
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tip card */}
        {!activeTask && !showCelebration && (
          <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-6 border-2 border-accent/30 shadow-card">
            <h3 className="text-lg font-heading font-bold text-accent mb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Dica do Educandário de Luz
            </h3>
            <p className="text-foreground font-body text-sm leading-relaxed">
              Na Vila de Ponta Negra, o Educandário de Luz já usa hortas para
              ensinar sobre natureza e alimentação saudável. Complete todas as
              missões e leve esse conhecimento para sua comunidade! 🌱
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
