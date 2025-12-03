import { cn } from "@/lib/utils";
import { FileText, Code, Megaphone, Search, Lightbulb, MessageSquare } from "lucide-react";

const taskTypes = [
  { id: "content", label: "Content", icon: FileText, description: "Blog posts, articles, stories" },
  { id: "code", label: "Code", icon: Code, description: "Programming & development" },
  { id: "marketing", label: "Marketing", icon: Megaphone, description: "Ads, campaigns, copy" },
  { id: "research", label: "Research", icon: Search, description: "Analysis & summaries" },
  { id: "ideas", label: "Ideas", icon: Lightbulb, description: "Brainstorming & creativity" },
  { id: "chat", label: "Chat", icon: MessageSquare, description: "Conversational prompts" },
];

interface TaskTypeSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function TaskTypeSelector({ selected, onSelect }: TaskTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Task Type</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {taskTypes.map((task) => {
          const Icon = task.icon;
          const isSelected = selected === task.id;
          return (
            <button
              key={task.id}
              onClick={() => onSelect(task.id)}
              className={cn(
                "relative group p-4 rounded-xl border transition-all duration-300 text-left",
                isSelected
                  ? "border-primary bg-primary/10 glow-sm"
                  : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover:text-primary"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium text-sm",
                    isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {task.label}
                  </p>
                  <p className="text-xs text-muted-foreground/70 truncate mt-0.5">
                    {task.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
