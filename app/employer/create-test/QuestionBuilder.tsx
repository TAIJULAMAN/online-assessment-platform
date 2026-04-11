"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDraft, addTest } from "@/store/slices/testSlice";
import { QuestionModal } from "./QuestionModal";
import { Question } from "@/store/slices/testSlice";
import { useRouter } from "next/navigation";

interface QuestionBuilderProps {
  onBack: () => void;
}

export function QuestionBuilder({ onBack }: QuestionBuilderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.tests.currentTestDraft);
  const handleAddQuestion = () => {
    router.push("/employer/create-test/add-question");
  };

  const handleEditQuestion = (question: Question) => {
    router.push(`/employer/create-test/edit-question/${question.id}`);
  };

  const handleDeleteQuestion = (id: string) => {
    if (!draft) return;
    const updatedQuestions = draft.questions.filter((q) => q.id !== id);
    dispatch(setDraft({ ...draft, questions: updatedQuestions }));
    toast.info("Question removed from exam");
  };

  const handleFinish = () => {
    if (!draft || draft.questions.length === 0) {
      toast.error("Please add at least one question before finishing");
      return;
    }
    dispatch(addTest(draft));
    toast.success("Online test created successfully!");
    router.push("/employer/dashboard");
  };

  return (
    <div className="space-y-6 pb-20">
      {draft?.questions.map((question, index) => (
        <Card key={question.id} className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden bg-white rounded-2xl">
          <CardContent className="p-10">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-700 font-bold text-lg">Question {index + 1}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-gray-400 font-medium rounded-full px-4 py-1.5 bg-white border-gray-100 text-xs">
                  {question.type}
                </Badge>
                <Badge variant="outline" className="text-gray-400 font-medium rounded-full px-4 py-1.5 bg-white border-gray-100 text-xs">
                  {question.score} pt
                </Badge>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-800 mb-6">{question.title}</h3>
              {question.type !== 'Text' ? (
                <div className="space-y-4">
                  {question.options.map((option, optIdx) => (
                    <div key={option.id} className="flex items-center justify-between p-5 bg-[#f8fafc] rounded-xl transition-all h-16">
                      <span className="text-gray-600 font-medium">
                        {String.fromCharCode(65 + optIdx)}. {option.text}
                      </span>
                      {option.isCorrect && (
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 leading-relaxed text-[15px] space-y-4">
                  <p>
                    {question.title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button 
                className="text-[#6366f1] hover:opacity-80 font-bold transition-opacity"
                onClick={() => handleEditQuestion(question)}
              >
                Edit
              </button>
              <button 
                className="text-red-500 hover:opacity-80 font-bold transition-opacity"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Remove From Exam
              </button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="pt-4">
        <Button 
          className="w-full h-16 text-lg font-bold bg-[#6366f1] hover:bg-[#5558e6] text-white shadow-lg rounded-2xl transition-all active:scale-[0.99]"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </div>

      <div className="flex items-center justify-between mt-12">
        <Button 
          variant="outline" 
          className="h-12 px-10 rounded-xl border-gray-200 text-gray-500 font-bold hover:bg-gray-100 transition-all shadow-sm"
          onClick={onBack}
        >
          Back to Basic Info
        </Button>
        <Button 
          className="h-12 px-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-lg"
          onClick={handleFinish}
        >
          Publish Online Test
        </Button>
      </div>
    </div>
  );
}
