"use client";

import { useState, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 h-20 flex items-center">
      <div className="container mx-auto flex items-center px-6">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="AKIJ RESOURCE"
              width={140}
              height={38}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex justify-center">
          {title && (
            <h1 className="text-xl font-semibold text-gray-800">
              {title}
            </h1>
          )}
        </div>

        {/* Right: User Profile */}
        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors focus:outline-none",
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 overflow-hidden border border-gray-100 shadow-sm">
                <User size={24} className="text-gray-400" />
              </div>
              <div className="hidden flex-col items-start leading-tight text-left md:flex">
                <span className="font-bold text-[#1e1b4b] text-[15px]">
                  {mounted ? (user?.name || "Arif Hossain") : "Arif Hossain"}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Ref. ID - {mounted ? (user?.refId || "16101121") : "16101121"}
                </span>
              </div>
              <ChevronDown size={18} className="text-gray-400 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 shadow-xl border-gray-100 rounded-xl"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="text-red-600 font-semibold cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
