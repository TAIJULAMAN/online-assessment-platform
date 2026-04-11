import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AKIJ Resource | Online Assessment Platform",
  description: "Advanced assessment management system",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="flex min-h-screen flex-col bg-slate-50">
            {children}
            <Toaster position="top-right" richColors />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
