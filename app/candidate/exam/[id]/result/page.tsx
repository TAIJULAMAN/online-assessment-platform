"use client";

import { useRouter } from "next/navigation";
import { Clock, XCircle } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export default function ExamResultPage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { currentSession } = useAppSelector((state) => state.exam);
  
  // In a real app, we'd fetch the result based on testId, 
  // but for this mock, we'll check if it was a timeout
  const isTimeout = currentSession?.timeLeft === 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      <Header title="Akij Resource" />
      
      <main className="flex-1 flex items-center justify-center p-4">
        {isTimeout ? (
          <Card className="w-full max-w-lg p-12 text-center shadow-xl border-none">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center relative">
                <Clock size={40} className="text-red-500" />
                <div className="absolute top-0 right-0 h-8 w-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center">
                  <XCircle size={14} fill="white" className="text-red-500" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Timeout!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              Dear {user?.name || "Candidate"}, Your exam time has been finished. Thank you for participating.
            </p>
            <Button 
              variant="outline" 
              className="h-12 border-gray-200 text-gray-700 px-8 font-bold w-full"
              onClick={() => router.push("/candidate/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Card>
        ) : (
          <Card className="w-full max-w-4xl p-12 text-center shadow-sm border-none">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Image 
                  src="/check.svg" 
                  alt="Success" 
                  width={48} 
                  height={48} 
                  className="text-primary"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Test Completed</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Congratulations! {user?.name || "Candidate"}, You have completed your MCQ Exam for Probationary Officer. Thank you for participating.
            </p>
            <Button 
              variant="outline" 
              className="h-12 border-gray-200 text-gray-700 px-8 font-bold"
              onClick={() => router.push("/candidate/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
