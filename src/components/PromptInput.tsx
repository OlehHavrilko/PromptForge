import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-primary rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-500" />
      <div className="relative glass-strong rounded-xl p-1">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Describe what you want to create</span>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "e.g., Write a blog post about the future of AI in healthcare..."}
          className="min-h-[140px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}
