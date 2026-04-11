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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);

  const handleAddQuestion = () => {
    setEditingQuestion(undefined);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (id: string) => {
    if (!draft) return;
    const updatedQuestions = draft.questions.filter((q) => q.id !== id);
    dispatch(setDraft({ ...draft, questions: updatedQuestions }));
    toast.info("Question removed from exam");
  };

  const handleSaveQuestion = (question: Question) => {
    if (!draft) return;
    
    let updatedQuestions;
    const existingIndex = draft.questions.findIndex((q) => q.id === question.id);
    
    if (existingIndex !== -1) {
      updatedQuestions = [...draft.questions];
      updatedQuestions[existingIndex] = question;
    } else {
      updatedQuestions = [...draft.questions, question];
    }
    
    dispatch(setDraft({ ...draft, questions: updatedQuestions }));
    setIsModalOpen(false);
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
    <div className="space-y-6 pb-12">
      {draft?.questions.map((question, index) => (
        <Card key={question.id} className="border-none shadow-sm overflow-hidden bg-white rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1e1b4b] font-bold text-[15px]">Question {index + 1}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-gray-500 font-medium rounded-full px-3 py-1 bg-white border-gray-200">
                  {question.type}
                </Badge>
                <Badge variant="outline" className="text-gray-500 font-medium rounded-full px-3 py-1 bg-white border-gray-200">
                  {question.score} pt
                </Badge>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-[#1e1b4b] mb-4">{question.title}</h3>
              {question.type !== 'Text' ? (
                <div className="grid gap-3">
                  {question.options.map((option, optIdx) => (
                    <div key={option.id} className="flex items-center justify-between p-3.5 bg-[#f8fafc] rounded-xl border border-transparent transition-colors">
                      <span className="text-gray-700 text-sm font-medium">
                        {String.fromCharCode(65 + optIdx)}. {option.text}
                      </span>
                      {option.isCorrect && (
                        <CheckCircle2 size={20} className="text-white fill-green-500" strokeWidth={2} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed text-justify mt-2 max-w-4xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                  condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                  Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
              <Button 
                variant="ghost" 
                className="text-primary hover:bg-primary/5 hover:text-primary font-semibold px-2 h-auto"
                onClick={() => handleEditQuestion(question)}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                className="text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold px-2 h-auto"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Remove From Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="pt-2">
        <Button 
          className="w-full h-[52px] text-base font-bold bg-primary hover:bg-primary/90 shadow-sm rounded-xl transition-all active:scale-[0.99]"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </div>

      <div className="flex items-center justify-between pt-10">
        <Button variant="outline" className="h-11 px-8 font-semibold rounded-xl border-gray-200" onClick={onBack}>
          Back to Basic Info
        </Button>
        <Button className="h-11 px-10 text-base font-bold bg-green-600 hover:bg-green-700 shadow-md rounded-xl" onClick={handleFinish}>
          Publish Online Test
        </Button>
      </div>

      <QuestionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />
    </div>
  );
}
