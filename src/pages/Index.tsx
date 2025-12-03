import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PromptInput } from "@/components/PromptInput";
import { TaskTypeSelector } from "@/components/TaskTypeSelector";
import { OptionSlider } from "@/components/OptionSlider";
import { GeneratedPrompt } from "@/components/GeneratedPrompt";
import { TemplateCard } from "@/components/TemplateCard";
import { generatePrompt, templates } from "@/lib/promptGenerator";
import { Wand2, Zap, FileText, Code, Megaphone, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, typeof FileText> = {
  FileText,
  Code,
  Megaphone,
  Search,
};

const Index = () => {
  const [input, setInput] = useState("");
  const [taskType, setTaskType] = useState("content");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Balanced");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please describe what you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const prompt = generatePrompt({ input, taskType, tone, length });
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      toast({
        title: "Prompt generated!",
        description: "Your optimized prompt is ready to use.",
      });
    }, 1200);
  }, [input, taskType, tone, length, toast]);

  const handleTemplateClick = (template: typeof templates[0]) => {
    setInput(template.defaultInput + " ");
    setTaskType(template.taskType);
    toast({
      title: `Template loaded: ${template.title}`,
      description: "Customize the input and generate your prompt.",
    });
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Prompt Engineering Made Simple</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">PromptForge</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform simple ideas into powerful AI prompts. No expertise required.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Input Section */}
          <div className="space-y-6">
            <PromptInput
              value={input}
              onChange={setInput}
            />

            <TaskTypeSelector
              selected={taskType}
              onSelect={setTaskType}
            />

            <div className="space-y-6">
              <OptionSlider
                label="Tone"
                options={["Professional", "Casual", "Creative", "Technical"]}
                selected={tone}
                onSelect={setTone}
              />
              <OptionSlider
                label="Length"
                options={["Concise", "Balanced", "Detailed"]}
                selected={length}
                onSelect={setLength}
              />
            </div>

            <Button
              variant="gradient"
              size="xl"
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Wand2 className="w-5 h-5" />
              {isGenerating ? "Generating..." : "Generate Prompt"}
            </Button>
          </div>

          {/* Output Section */}
          <div>
            <GeneratedPrompt
              prompt={generatedPrompt}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        {/* Templates Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/20">
              <Wand2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Quick Templates</h2>
              <p className="text-sm text-muted-foreground">Start with a pre-built template</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => {
              const Icon = iconMap[template.icon];
              return (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  icon={Icon}
                  example={template.example}
                  onClick={() => handleTemplateClick(template)}
                />
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Craft better prompts. Get better results.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
