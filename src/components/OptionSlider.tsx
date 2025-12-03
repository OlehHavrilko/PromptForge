import { cn } from "@/lib/utils";

interface OptionSliderProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function OptionSlider({ label, options, selected, onSelect }: OptionSliderProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              selected === option
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
