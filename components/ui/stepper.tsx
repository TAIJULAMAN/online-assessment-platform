"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-start py-4 overflow-x-auto no-scrollbar">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                currentStep >= step.id
                  ? "bg-[#6366f1] text-white"
                  : "bg-gray-200 text-gray-500",
              )}
            >
              {currentStep >= step.id ? <Check className="h-5 w-5" strokeWidth={3} /> : step.id}
            </div>
            <span
              className={cn(
                "text-sm font-semibold whitespace-nowrap",
                currentStep >= step.id ? "text-gray-700" : "text-gray-400",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mx-4 sm:mx-8 h-[1px] w-12 sm:w-20",
                currentStep > step.id ? "bg-[#6366f1]" : "bg-gray-300",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
