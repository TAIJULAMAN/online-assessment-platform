import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDraft } from "@/store/slices/testSlice";
import { Pencil } from "lucide-react";

const infoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  totalCandidates: z.coerce.number().min(1),
  totalSlots: z.coerce.number().min(1),
  questionSets: z.coerce.number().min(1),
  questionType: z.string(),
  duration: z.coerce.number().min(1),
});

type InfoFormValues = z.infer<typeof infoSchema>;

interface BasicInfoFormProps {
  onNext: () => void;
}

export function BasicInfoForm({ onNext }: BasicInfoFormProps) {
  const dispatch = useAppDispatch();
  const currentDraft = useAppSelector((state) => state.tests.currentTestDraft);
  const [isEditing, setIsEditing] = useState(true);

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema) as any,
    defaultValues: {
      title: currentDraft?.title || "",
      totalCandidates: currentDraft?.totalCandidates || 0,
      totalSlots: currentDraft?.totalSlots || 0,
      questionSets: currentDraft?.questionSets || 0,
      questionType: currentDraft?.questionType || "MCQ",
      duration: currentDraft?.duration || 0,
    },
  });

  const values = form.getValues();

  const onSubmit = (data: InfoFormValues) => {
    dispatch(
      setDraft({
        ...data,
        id: currentDraft?.id || Math.random().toString(36).substring(2, 9),
        questions: currentDraft?.questions || [],
        createdAt: currentDraft?.createdAt || new Date().toISOString(),
        startTime: currentDraft?.startTime || "",
        endTime: currentDraft?.endTime || "",
      }),
    );
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-[#6366f1] font-semibold hover:opacity-80 transition-opacity"
              >
                <Pencil size={18} />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Online Test Title</label>
                <p className="text-lg font-bold text-gray-600 mt-1">{values.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Candidates</label>
                  <p className="text-lg font-bold text-gray-600 mt-1">{values.totalCandidates.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Slots</label>
                  <p className="text-lg font-bold text-gray-600 mt-1">{values.totalSlots}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Question Set</label>
                  <p className="text-lg font-bold text-gray-600 mt-1">{values.questionSets}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration Per Slots (Minutes)</label>
                  <p className="text-lg font-bold text-gray-600 mt-1">{values.duration}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Question Type</label>
                  <p className="text-lg font-bold text-gray-600 mt-1">{values.questionType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-10">
          <Button
            variant="outline"
            type="button"
            className="h-12 px-12 rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={onNext}
            type="button"
            className="h-12 px-12 rounded-xl bg-[#6366f1] hover:bg-[#5558e6] text-white font-bold transition-all shadow-lg shadow-indigo-200"
          >
            Save & Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-10">
        <Form {...(form as any)}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700">Edit Basic Information</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <FormField
                control={form.control as any}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Online Test Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter exam title"
                        {...field}
                        className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="totalCandidates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Total Candidates
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-12 rounded-xl border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="totalSlots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Total Slots
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-12 rounded-xl border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="questionSets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Question Sets
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-12 rounded-xl border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Question Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-gray-200">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mixed">Mixed</SelectItem>
                        <SelectItem value="MCQ">MCQ</SelectItem>
                        <SelectItem value="Checkbox">Checkbox</SelectItem>
                        <SelectItem value="Text">Text</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-600">
                      Duration (Minutes)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-12 rounded-xl border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="h-12 px-8 font-bold text-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-12 px-10 rounded-xl bg-[#6366f1] hover:bg-[#5558e6] text-white font-bold transition-all shadow-lg"
              >
                Save Info
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
