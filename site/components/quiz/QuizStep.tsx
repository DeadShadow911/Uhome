"use client";

import { cn } from "@/lib/utils";

interface QuizOption {
  value: string;
  label: string;
}

interface QuizStepProps {
  question: string;
  options: QuizOption[];
  selected?: string;
  onSelect: (value: string) => void;
}

export function QuizStep({ question, options, selected, onSelect }: QuizStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-heading text-lg font-semibold text-primary sm:text-xl">
        {question}
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "min-h-[48px] rounded-xl border-2 px-4 py-3 text-left font-medium transition-all",
              selected === opt.value
                ? "border-primary bg-primary text-white"
                : "border-primary/20 bg-background text-primary hover:border-primary/40 hover:bg-primary/5"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
