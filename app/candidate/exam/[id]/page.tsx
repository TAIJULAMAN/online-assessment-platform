"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { 
  Undo2, Redo2, Bold, Italic, Underline, List, 
  ChevronDown, CheckCircle2, AlertCircle, Clock, XCircle
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { tick, updateAnswer, submitExam, logBehavior } from "@/store/slices/examSlice";

// Mock Question Data matching Figma
const currentExamData = {
  id: "1",
  title: "Psychometric Test for Management Trainee Officer",
  totalQuestions: 20,
  questions: [
    {
      id: "q1",
      number: 1,
      title: "Which of the following indicators is used to measure market volatility?",
      type: "MCQ",
      options: [
        { id: "A", text: "Relative Strength Index (RSI)" },
        { id: "B", text: "Moving Average Convergence Divergence (MACD)" },
        { id: "C", text: "Bollinger Bands" },
        { id: "D", text: "Fibonacci Retracement" },
      ],
    },
    {
      id: "q2",
      number: 2,
      title: "Write a brief description of market liquidity and its importance.",
      type: "Text",
      options: [],
    }
  ]
};

export default function ExamScreenPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentSession, isActive } = useAppSelector((state) => state.exam);
  const { user } = useAppSelector((state) => state.auth);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  // Redirect if not active
  useEffect(() => {
    if (!isActive) {
      // In a real app we'd check if a session exists at all
    }
  }, [isActive, router]);

  // Timer logic
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, dispatch]);

  // Handle Timeout
  useEffect(() => {
    if (currentSession?.timeLeft === 0 && isActive) {
      setShowTimeoutModal(true);
      dispatch(submitExam());
      // Delay redirect slightly to show modal as per Figma
    }
  }, [currentSession?.timeLeft, isActive, dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs} left`;
  };

  const handleNext = () => {
    if (currentIndex < currentExamData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      dispatch(submitExam());
      router.push(`/candidate/exam/${params.id}/result`);
    }
  };

  const currentQuestion = currentExamData.questions[currentIndex];
  const currentAnswer = currentSession?.answers[currentQuestion.id];

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      <Header title="Akij Resource" />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {/* Progress & Timer Card */}
          <Card className="border-none shadow-sm h-16 flex items-center px-6">
            <div className="flex flex-1 items-center justify-between">
              <span className="text-lg font-bold text-gray-700 font-sans">
                Question ({currentQuestion.number}/{currentExamData.totalQuestions})
              </span>
              <div className="bg-gray-100 px-8 py-2 rounded-lg text-lg font-bold text-gray-700 min-w-[120px] text-center">
                {formatTime(currentSession?.timeLeft || 0)}
              </div>
            </div>
          </Card>

          {/* Question Card */}
          <Card className="border-none shadow-sm min-h-[500px] flex flex-col p-8">
            <h2 className="text-xl font-bold text-[#1e1b4b] mb-8 leading-tight">
              Q{currentQuestion.number}. {currentQuestion.title}
            </h2>

            <div className="flex-1 space-y-4">
              {currentQuestion.type === "MCQ" ? (
                <RadioGroup 
                  value={(currentAnswer as string) || ""} 
                  onValueChange={(val) => dispatch(updateAnswer({ questionId: currentQuestion.id, answer: val }))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={option.id} id={option.id} className="text-primary border-gray-300" />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer font-medium text-gray-700">{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="border border-gray-100 rounded-lg overflow-hidden flex flex-col h-[300px]">
                  <div className="flex items-center gap-1 p-2 bg-gray-50/50 border-b border-gray-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500"><Undo2 size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500"><Redo2 size={16} /></Button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                    <Button variant="ghost" className="h-8 px-2 text-xs font-bold text-gray-500 gap-1">
                      Normal text <ChevronDown size={14} />
                    </Button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500"><List size={16} /></Button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 font-bold"><Bold size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 italic"><Italic size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 underline"><Underline size={16} /></Button>
                  </div>
                  <textarea 
                    className="flex-1 p-6 resize-none outline-none text-gray-600 placeholder:text-gray-300 bg-white"
                    placeholder="Type questions here.."
                    value={currentAnswer as string || ''}
                    onChange={(e) => dispatch(updateAnswer({ questionId: currentQuestion.id, answer: e.target.value }))}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-8">
              <Button 
                variant="outline" 
                className="h-12 border-gray-100 text-gray-600 px-8 font-bold hover:bg-gray-50"
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              >
                Skip this Question
              </Button>
              <Button 
                className="h-12 px-10 font-bold bg-[#6366f1] hover:bg-[#5558e6] transition-all"
                onClick={handleNext}
              >
                Save & Continue
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Timeout Modal */}
      <Dialog open={showTimeoutModal} onOpenChange={setShowTimeoutModal}>
        <DialogContent className="max-w-md p-12 text-center border-none shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center relative">
              <Clock size={40} className="text-red-500" />
              <div className="absolute top-0 right-0 h-8 w-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center">
                <XCircle size={14} fill="white" className="text-red-500" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-[#1e1b4b] mb-4">Timeout!</DialogTitle>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Dear {user?.name}, Your exam time has been finished. Thank you for participating.
          </p>
          <Button 
            variant="outline" 
            className="h-12 border-gray-200 text-gray-700 px-8 font-bold w-full"
            onClick={() => router.push(`/candidate/exam/${params.id}/result`)}
          >
            Go to Results
          </Button>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}
