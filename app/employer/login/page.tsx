"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified root login
    router.replace("/");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-gray-500 animate-pulse">Redirecting to login portal...</p>
      </div>
    </div>
  );
}
