"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, FileText, Clock, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

const mockTests = [
  {
    id: "1",
    title: "Psychometric Test for Management Trainee Officer",
    totalCandidates: "10,000",
    questionSets: "3",
    totalSlots: "3",
  },
  {
    id: "2",
    title: "Psychometric Test for Management Trainee Officer",
    totalCandidates: "10,000",
    questionSets: "3",
    totalSlots: "3",
  },
  {
    id: "3",
    title: "Psychometric Test for Management Trainee Officer",
    totalCandidates: "Not Set",
    questionSets: "Not Set",
    totalSlots: "Not Set",
  },
  {
    id: "4",
    title: "Psychometric Test for Management Trainee Officer",
    totalCandidates: "10,000",
    questionSets: "3",
    totalSlots: "3",
  }
];

export default function EmployerDashboardPage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("8");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePageSizeChange = (size: string) => {
    setPageSize(size);
    setIsPopupOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Header title="Dashboard" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-5">
          {/* Header with Search and Create Button */}
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-[#1e1b4b] w-full md:w-auto">Online Tests</h2>

            <div className="flex flex-1 items-center justify-center max-w-2xl w-full">
              <div className="relative w-full">
                <Input
                  placeholder="Search by exam title"
                  className="h-12 pl-6 pr-14 border-primary bg-white shadow-sm rounded-xl font-medium text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group cursor-pointer hover:bg-primary/20 transition-colors">
                  <Image
                    src="/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                    className="opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-end">
              <Button 
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 text-base"
                onClick={() => router.push("/employer/create-test")}
              >
                Create Online Test
              </Button>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {mockTests.map((test, i) => (
              <Card key={i} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[1.5rem] p-8 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
                <CardContent className="p-0 space-y-8">
                  <h3 className="text-xl font-bold text-[#1e1b4b] leading-tight group-hover:text-primary transition-colors pr-4">
                    {test.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold text-gray-500">
                    <div className="flex items-center gap-2.5">
                      <Users size={18} className="text-gray-400" />
                      <span>Candidates: <span className="text-[#1e1b4b]">{test.totalCandidates}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} className="text-gray-400" />
                      <span>Question Set: <span className="text-[#1e1b4b]">{test.questionSets}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={18} className="text-gray-400" />
                      <span>Exam Slots: <span className="text-[#1e1b4b]">{test.totalSlots}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <Button 
                      variant="outline"
                      className="h-11 px-6 border-2 border-primary text-primary font-bold rounded-xl transition-all active:scale-95 shadow-sm"
                    >
                      View Candidates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-primary rounded-xl transition-colors">
                <ChevronLeft size={18} />
              </Button>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold border border-gray-100 shadow-sm text-[#1e1b4b]">
                1
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-primary rounded-xl transition-colors">
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-widest">
              Online Test Per Page
              <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
                <DialogTrigger 
                  render={
                    <Button 
                      variant="outline" 
                      className="w-[72px] h-10 bg-white border-gray-200 shadow-sm rounded-xl font-bold text-[#1e1b4b] transition-all hover:border-primary/30 flex items-center justify-center gap-2 px-3 focus-visible:ring-0 active:scale-95"
                    />
                  }
                >
                  {pageSize}
                  <ChevronDown size={14} className="text-gray-400" />
                </DialogTrigger>
                <DialogContent className="max-w-[340px] p-6 rounded-[2rem] border-none shadow-2xl">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold text-[#1e1b4b] text-center">Select Page Size</DialogTitle>
                    <DialogDescription className="text-center text-gray-500">
                      Choose how many results to display
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3">
                    {["8", "16", "24", "32"].map((size) => (
                      <Button
                        key={size}
                        variant="ghost"
                        className={cn(
                          "h-14 rounded-2xl border-2 transition-all font-bold text-lg",
                          pageSize === size 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-100"
                        )}
                        onClick={() => handlePageSizeChange(size)}
                      >
                        {size} Tests
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
