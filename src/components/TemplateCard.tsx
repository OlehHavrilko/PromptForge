import { ArrowRight } from "lucide-react";
import { ComponentType } from "react";

interface TemplateCardProps {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  example: string;
  onClick: () => void;
}

export function TemplateCard({ title, description, icon: Icon, example, onClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative p-5 rounded-xl border border-border bg-card/30 hover:bg-card/60 transition-all duration-300 text-left hover:border-primary/30"
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-secondary text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2 font-mono truncate">
            "{example}"
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
      </div>
    </button>
  );
}
