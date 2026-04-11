"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Stepper } from "@/components/ui/stepper";
import { BasicInfoForm } from "../../create-test/BasicInfoForm";
import { QuestionBuilder } from "../../create-test/QuestionBuilder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDraft } from "@/store/slices/testSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function EditTestContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const stepParam = searchParams.get("step");
  const [currentStep, setCurrentStep] = useState(stepParam ? parseInt(stepParam) : 1);
  const [isLoading, setIsLoading] = useState(true);

  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Questions Sets" },
  ];

  useEffect(() => {
    const fetchTest = () => {
      const mockTestData = {
        id: params.id as string,
        title: "Psychometric Test for Management Trainee Officer",
        totalCandidates: 10000,
        totalSlots: 3,
        questionSets: 2,
        questionType: "MCQ",
        duration: 30,
        startTime: "",
        endTime: "",
        questions: [
          {
            id: "q1",
            title: "What is the Capital of Bangladesh?",
            type: "MCQ" as const,
            score: 1,
            options: [
              { id: "A", text: "Dhaka", isCorrect: true },
              { id: "B", text: "Chattogram", isCorrect: false },
              { id: "C", text: "Rajshahi", isCorrect: false },
              { id: "D", text: "Barishal", isCorrect: false },
            ]
          }
        ],
        createdAt: new Date().toISOString()
      };

      dispatch(setDraft(mockTestData));
      setIsLoading(false);
    };

    fetchTest();
  }, [params.id, dispatch]);

  useEffect(() => {
    if (stepParam) {
      setCurrentStep(parseInt(stepParam));
    }
  }, [stepParam]);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    router.push(`/employer/edit-test/${params.id}?step=${step}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-gray-400 font-bold">Loading Test Data...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Header title="Edit Online Test" />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-6">
          <Card className="mb-8 p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-none rounded-2xl bg-white">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex-1 w-full md:w-auto">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 md:mb-0 hidden md:block">Edit Test</h1>
                <Stepper steps={steps} currentStep={currentStep} />
              </div>
              <Button
                variant="outline"
                className="h-11 px-6 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
                onClick={() => router.push(`/employer/candidates/${params.id}`)}
              >
                Back to Candidates
              </Button>
            </div>
          </Card>

          {currentStep === 1 ? (
            <BasicInfoForm onNext={() => handleStepChange(2)} />
          ) : (
            <QuestionBuilder onBack={() => handleStepChange(1)} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function EditTestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTestContent />
    </Suspense>
  );
}
