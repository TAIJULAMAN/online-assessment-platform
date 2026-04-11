"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data
const mockCandidates = [
  { id: "16101121", name: "MD. Shajedul Islam", category: "Management Trainee", score: 85, status: "Shortlisted", date: "12 Oct, 2023" },
  { id: "16101122", name: "Arif Hossain", category: "Management Trainee", score: 72, status: "Shortlisted", date: "12 Oct, 2023" },
  { id: "16101123", name: "Jhon Smith Doe", category: "Junior Developer", score: 45, status: "Not Shortlisted", date: "11 Oct, 2023" },
  { id: "16101124", name: "Sarah Williams", category: "Management Trainee", score: 92, status: "Shortlisted", date: "10 Oct, 2023" },
  { id: "16101125", name: "Michael Chen", category: "Senior Analyst", score: 68, status: "Pending", date: "09 Oct, 2023" },
  { id: "16101126", name: "Emily Davis", category: "Management Trainee", score: 81, status: "Shortlisted", date: "08 Oct, 2023" },
  { id: "16101127", name: "James Wilson", category: "Junior Developer", score: 55, status: "Not Shortlisted", date: "07 Oct, 2023" },
  { id: "16101128", name: "Jessica Brown", category: "Management Trainee", score: 77, status: "Pending", date: "06 Oct, 2023" },
];

const stats = [
  { label: "Total Candidates", value: "12,450", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Shortlisted", value: "8,240", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  { label: "Rejected", value: "3,120", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { label: "In-Progress", value: "1,090", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
];

export default function CandidatesListPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.includes(searchQuery);
      const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Header title="View Candidates" />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Top Navigation & Test Title */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/employer/dashboard")}
                className="rounded-full hover:bg-white shadow-sm"
              >
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#1e1b4b]">Psychometric Test for Management Trainee</h1>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <Card className="mb-8 border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1e1b4b]">Basic Information</h2>
                <button 
                  className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity"
                  onClick={() => router.push(`/employer/edit-test/${params.id}`)}
                >
                  <Badge variant="outline" className="border-none p-0 text-primary flex gap-2">
                    <span className="text-sm">Edit</span>
                  </Badge>
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Online Test Title</p>
                  <p className="text-lg font-bold text-[#1e1b4b]">Psychometric Test for Management Trainee Officer</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Candidates</p>
                    <p className="text-xl font-bold text-[#1e1b4b]">10,000</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Slots</p>
                    <p className="text-xl font-bold text-[#1e1b4b]">3</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Question Set</p>
                    <p className="text-xl font-bold text-[#1e1b4b]">2</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Duration Per Slots (Minutes)</p>
                    <p className="text-xl font-bold text-[#1e1b4b]">30</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Question Type</p>
                  <p className="text-xl font-bold text-[#1e1b4b]">MCQ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                    <stat.icon size={28} className={stat.color} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-black text-[#1e1b4b] mt-0.5">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* List Controls */}
          <Card className="border-none shadow-sm rounded-2xl bg-white mb-6">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <Input
                  placeholder="Search candidates..."
                  className="h-12 pl-12 pr-4 bg-gray-50/50 border-none shadow-none rounded-xl font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-gray-50/50 p-1.5 px-3 rounded-xl border border-gray-100">
                  <Filter size={16} className="text-gray-400" />
                  <select
                    className="bg-transparent text-sm font-bold text-gray-500 outline-none cursor-pointer pr-4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Shortlisted</option>
                    <option>Not Shortlisted</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidates Table */}
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-widest">
                      <th className="p-6 text-[11px] font-black text-gray-400">S/N</th>
                      <th className="p-6 text-[11px] font-black text-gray-400">Candidate Information</th>
                      <th className="p-6 text-[11px] font-black text-gray-400">Applied Category</th>
                      <th className="p-6 text-[11px] font-black text-gray-400">Test Score</th>
                      <th className="p-6 text-[11px] font-black text-gray-400">Status</th>
                      <th className="p-6 text-[11px] font-black text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCandidates.map((candidate, i) => (
                      <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-6 text-sm font-bold text-gray-400">{(i + 1).toString().padStart(2, '0')}</td>
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#1e1b4b]">{candidate.name}</p>
                              <p className="text-xs font-semibold text-gray-400 mt-0.5">ID: {candidate.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm font-bold text-[#1e1b4b]">{candidate.category}</td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  candidate.score >= 80 ? "bg-green-500" : candidate.score >= 60 ? "bg-blue-500" : "bg-red-500"
                                )}
                                style={{ width: `${candidate.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-black text-[#1e1b4b]">{candidate.score}%</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "rounded-lg px-3 py-1 text-[11px] font-black uppercase tracking-wider border-none shadow-sm",
                              candidate.status === "Shortlisted" ? "bg-green-100 text-green-700" :
                                candidate.status === "Not Shortlisted" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                            )}
                          >
                            {candidate.status}
                          </Badge>
                        </td>
                        <td className="p-6">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-300 hover:text-primary">
                            <MoreVertical size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-400">
              Showing <span className="text-[#1e1b4b]">{filteredCandidates.length}</span> candidates
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-primary transition-all">
                <ChevronLeft size={20} />
              </Button>
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg">
                1
              </div>
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-primary transition-all">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
