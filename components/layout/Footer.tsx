"use client";

import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#050b1a] text-white py-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-800">
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-gray-400">Powered by</p>
        <Image
          src="/Logo.svg"
          alt="AKIJ RESOURCE"
          width={130}
          height={32}
          className="h-8 w-auto brightness-0 invert"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
          Helpline
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
          <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer group">
            <Phone
              size={18}
              className="text-gray-500 group-hover:text-indigo-400 transition-colors"
            />
            <span className="font-semibold text-gray-300 tracking-tight">+88 011020202505</span>
          </div>
          <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer group">
            <Mail
              size={18}
              className="text-gray-500 group-hover:text-indigo-400 transition-colors"
            />
            <span className="font-semibold text-gray-300 tracking-tight">support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
