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
    <div className="flex items-center justify-start py-6 overflow-x-auto no-scrollbar">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                currentStep > step.id
                  ? "border-primary bg-primary text-white"
                  : currentStep === step.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-400",
              )}
            >
              {currentStep > step.id ? <Check size={20} strokeWidth={3} /> : step.id}
            </div>
            <span
              className={cn(
                "text-sm font-bold whitespace-nowrap",
                currentStep >= step.id ? "text-[#1e1b4b]" : "text-gray-400",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mx-4 sm:mx-6 h-[2px] w-8 sm:w-16 transition-all duration-300 rounded-full",
                currentStep > step.id ? "bg-primary" : "bg-gray-200",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
