"use client";

import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDraft } from "@/store/slices/testSlice";
import { QuestionForm } from "../../QuestionForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.tests.currentTestDraft);
  
  const questionId = params.id as string;
  const question = draft?.questions.find(q => q.id === questionId);
  const questionIndex = draft?.questions.findIndex(q => q.id === questionId) ?? -1;

  const handleSave = (updatedQuestion: any) => {
    if (!draft) return;

    const updatedQuestions = [...draft.questions];
    if (questionIndex !== -1) {
      updatedQuestions[questionIndex] = updatedQuestion;
    }
    
    dispatch(setDraft({ ...draft, questions: updatedQuestions }));
    toast.success("Question updated successfully");
    router.push("/employer/create-test?step=2");
  };

  const handleCancel = () => {
    router.push("/employer/create-test?step=2");
  };

  if (!question) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8fafc]">
        <Header title="Online Test" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 font-bold">Question not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Header title="Online Test" />
      <main className="flex-1">
        <QuestionForm 
          initialData={question}
          onSave={handleSave} 
          onCancel={handleCancel} 
          questionNumber={questionIndex + 1}
        />
      </main>
      <Footer />
    </div>
  );
}
