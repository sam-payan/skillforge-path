import { Check, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Phase {
  id: number;
  name: string;
  status: "completed" | "active" | "locked";
  tasks: number;
  completedTasks: number;
}

interface RoadmapProgressProps {
  phases: Phase[];
}

const RoadmapProgress = ({ phases }: RoadmapProgressProps) => {
  return (
    <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Roadmap Progress</h3>
          <p className="text-xs text-muted-foreground">Your learning journey</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          View Full Roadmap
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            {index < phases.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-10 w-0.5 h-8",
                  phase.status === "completed" ? "bg-success" : "bg-border"
                )}
              />
            )}
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                  phase.status === "completed" && "bg-success text-success-foreground",
                  phase.status === "active" && "bg-primary text-primary-foreground animate-pulse-glow",
                  phase.status === "locked" && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {phase.status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : phase.status === "locked" ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  <span className="text-xs font-bold">{phase.id}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4
                    className={cn(
                      "font-medium text-sm",
                      phase.status === "locked" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {phase.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {phase.completedTasks}/{phase.tasks} tasks
                  </span>
                </div>
                {phase.status !== "locked" && (
                  <div className="mt-2">
                    <div className="progress-bar h-1.5">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          phase.status === "completed"
                            ? "bg-success"
                            : "bg-gradient-to-r from-primary to-accent"
                        )}
                        style={{
                          width: `${(phase.completedTasks / phase.tasks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapProgress;
