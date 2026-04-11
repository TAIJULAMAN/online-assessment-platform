"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Stepper } from "@/components/ui/stepper";
import { BasicInfoForm } from "./BasicInfoForm";
import { QuestionBuilder } from "./QuestionBuilder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CreateTestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  
  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Questions Sets" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Manage Online Test" />
      
      <main className="flex-1 bg-[#f8fafc] py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <Card className="mb-6 p-6 shadow-sm border-gray-100">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex-1 w-full md:w-auto">
                <Stepper steps={steps} currentStep={currentStep} />
              </div>
              <Button 
                variant="outline" 
                className="h-10 border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => router.push("/employer/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>

          {currentStep === 1 ? (
            <BasicInfoForm onNext={() => setCurrentStep(2)} />
          ) : (
            <QuestionBuilder onBack={() => setCurrentStep(1)} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
