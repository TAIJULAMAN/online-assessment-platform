"use client";

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

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm h-16 sm:h-20 flex items-center">
      <div className="container mx-auto flex items-center px-4">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="AKIJ RESOURCE"
              width={120}
              height={32}
              className="h-6 sm:h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex justify-center">
          {title && (
            <h1 className="text-lg sm:text-2xl font-bold text-[#1e1b4b] whitespace-nowrap">
              {title}
            </h1>
          )}
        </div>

        {/* Right: User Profile */}
        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-3 px-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0",
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 overflow-hidden border border-gray-200 shadow-sm">
                <User size={24} className="text-gray-500" />
              </div>
              <div className="hidden flex-col items-start leading-tight text-left md:flex">
                <span className="font-bold text-[#1e1b4b] text-sm">
                  {user?.name || "Guest User"}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                  Ref. ID - {user?.refId || "N/A"}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 shadow-xl border-gray-100 rounded-xl z-999"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="text-red-600 font-bold cursor-pointer"
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
