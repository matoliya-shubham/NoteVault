import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Vault } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-1">
      <Vault className="w-8 h-8 text-gray-900 dark:text-gray-100" />
      <p className={cn("font-semibold text-xl", font.className)}>NoteVault</p>
    </div>
  );
};
