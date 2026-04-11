"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginSuccess,
  loginStart,
  loginFailure,
} from "@/store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function UnifiedLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth,
  );

  // Immediate redirection if already authenticated
  useLayoutEffect(() => {
    if (isAuthenticated && user) {
      const target =
        user.role === "employer"
          ? "/employer/dashboard"
          : "/candidate/dashboard";
      router.replace(target);
    }
  }, [isAuthenticated, user, router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (values: LoginValues) => {
    dispatch(loginStart());

    // Simulate API call with multi-role support
    setTimeout(() => {
      // Check Candidate credentials
      if (
        values.email === "candidate@test.com" &&
        values.password === "user123"
      ) {
        dispatch(
          loginSuccess({
            id: "2",
            email: values.email,
            name: "Arif Hossain",
            role: "candidate",
            refId: "16101121",
          }),
        );
        toast.success("Welcome back, Candidate!");
        router.push("/candidate/dashboard");
      }
      // Check Employer credentials
      else if (
        values.email === "employer@test.com" &&
        values.password === "admin123"
      ) {
        dispatch(
          loginSuccess({
            id: "1",
            email: values.email,
            name: "Jhon Smith Doe",
            role: "employer",
            refId: "12341341",
          }),
        );
        toast.success("Welcome back, Employer!");
        router.push("/employer/dashboard");
      } else {
        dispatch(loginFailure());
        toast.error(
          "Invalid credentials. Please check your email and password.",
        );
      }
    }, 1000);
  };

  if (isAuthenticated && user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Top Header */}
      <header className="flex h-16 sm:h-20 items-center bg-white border-b border-gray-100 px-4 sm:px-8 shadow-sm sticky top-0 z-50">
        <div className="flex-1 flex justify-start">
          <Image
            src="/Logo.svg"
            alt="AKI RESOURCE"
            width={180}
            height={48}
            className="h-7 sm:h-10 w-auto"
            priority
          />
        </div>
        <div className="flex-1 flex justify-start -ml-20 md:ml-0 md:justify-center">
          <h1 className="text-lg sm:text-2xl font-bold text-[#1e1b4b] whitespace-nowrap">
            Akij Resource
          </h1>
        </div>
        <div className="flex-1 hidden sm:block" /> {/* Balance for centering */}
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-5 sm:p-8 lg:p-10 gap-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] tracking-tight">
          Sign In
        </h2>

        <Card className="w-full max-w-[540px] border-none bg-white rounded-[1rem] p-8 sm:p-10">
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your primary email address"
                          {...field}
                          className="h-14 border-gray-200 bg-gray-50/30 rounded-xl text-base shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="h-14 border-gray-200 bg-gray-50/30 rounded-xl text-base shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end -mt-6">
                  <button
                    type="button"
                    className="text-sm font-bold text-gray-500 hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Forget Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold bg-[#6366f1] hover:bg-[#5558e3] active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-indigo-100"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-400 pt-10 pb-0 p-0 border-t border-gray-100 mt-10">
            <div className="opacity-60 italic">
              Demo: candidate@test.com / user123 or employer@test.com / admin123
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Bottom Footer */}
      <footer className="bg-[#0f172a] text-white py-10 px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <span className="text-sm font-medium text-gray-400">Powered by</span>
          <Image
            src="/Logo.svg"
            alt="AKI RESOURCE"
            width={150}
            height={40}
            className="h-9 w-auto brightness-0 invert"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10">
          <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
            Helpline
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10 text-sm">
            <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
              <Phone
                size={20}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
              <span className="font-semibold">+88 011020202505</span>
            </div>
            <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
              <Mail
                size={20}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
              <span className="font-semibold">support@akij.work</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
