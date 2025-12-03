import { Button } from "@/components/ui/button";
import { Copy, Check, Wand2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GeneratedPromptProps {
  prompt: string;
  isGenerating: boolean;
}

export function GeneratedPrompt({ prompt, isGenerating }: GeneratedPromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-accent" />
          <label className="text-sm font-medium text-muted-foreground">Generated Prompt</label>
        </div>
        {prompt && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-primary">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        )}
      </div>
      <div className={cn(
        "relative min-h-[200px] rounded-xl border transition-all duration-300",
        prompt ? "border-accent/30 bg-accent/5" : "border-border bg-card/50"
      )}>
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <Wand2 className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">Crafting your prompt...</p>
            </div>
          </div>
        ) : prompt ? (
          <div className="p-4 font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {prompt}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground/60 text-sm">Your optimized prompt will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
