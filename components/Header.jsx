"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Rubik } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const rubik = Rubik({ subsets: ["latin"] });

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-slate-100 dark:bg-slate-900 py-3 border-b-[0.5px] border-white">
      <div className="flex justify-between items-center px-10">
        <div>
          <div
            onClick={() => router.push("/")}
            className={`${rubik.className} cursor-pointer text-lg font-semibold`}
          >
            DaanRakto
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/blood">Blood</Link>
          <Link href="/processing">Processing</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
