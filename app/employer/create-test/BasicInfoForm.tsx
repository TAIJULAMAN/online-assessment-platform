"use client";

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

const infoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  totalCandidates: z.coerce.number().min(1),
  totalSlots: z.coerce.number().min(1),
  questionSets: z.coerce.number().min(1),
  questionType: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.coerce.number().min(1),
});

interface BasicInfoFormProps {
  onNext: () => void;
}

export function BasicInfoForm({ onNext }: BasicInfoFormProps) {
  const dispatch = useAppDispatch();
  const currentDraft = useAppSelector((state) => state.tests.currentTestDraft);

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      title: currentDraft?.title || "",
      totalCandidates: currentDraft?.totalCandidates || 0,
      totalSlots: currentDraft?.totalSlots || 0,
      questionSets: currentDraft?.questionSets || 0,
      questionType: currentDraft?.questionType || "Mixed",
      startTime: currentDraft?.startTime || "",
      endTime: currentDraft?.endTime || "",
      duration: currentDraft?.duration || 60,
    },
  });

  function onSubmit(values: z.infer<typeof infoSchema>) {
    dispatch(
      setDraft({
        ...values,
        id: currentDraft?.id || Math.random().toString(36).substr(2, 9),
        questions: currentDraft?.questions || [],
        createdAt: currentDraft?.createdAt || new Date().toISOString(),
      }),
    );
    onNext();
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-gray-700 font-semibold">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter exam title"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalCandidates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Total Candidates
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalSlots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Total Slots
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionSets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Question Sets
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Question Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
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
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      End Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Duration (Minutes)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="h-11 px-10 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                Save & Continue
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
