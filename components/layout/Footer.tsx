"use client";

import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-10 px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <p className="text-sm font-medium text-gray-400">Powered by</p>
        <Image
          src="/Logo.svg"
          alt="AKIJ RESOURCE"
          width={150}
          height={40}
          className="h-9 w-auto brightness-0 invert"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10">
        <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Helpline
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-sm">
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
  );
}
