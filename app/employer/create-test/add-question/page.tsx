"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDraft } from "@/store/slices/testSlice";
import { QuestionForm } from "../QuestionForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";

export default function AddQuestionPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.tests.currentTestDraft);

  const handleSave = (question: any) => {
    if (!draft) {
      toast.error("No test draft found");
      return;
    }

    const updatedQuestions = [...draft.questions, question];
    dispatch(setDraft({ ...draft, questions: updatedQuestions }));
    toast.success("Question added successfully");
    router.push("/employer/create-test?step=2");
  };

  const handleCancel = () => {
    router.push("/employer/create-test?step=2");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Header title="Online Test" />
      <main className="flex-1">
        <QuestionForm 
          onSave={handleSave} 
          onCancel={handleCancel} 
          questionNumber={(draft?.questions.length || 0) + 1}
        />
      </main>
      <Footer />
    </div>
  );
}
