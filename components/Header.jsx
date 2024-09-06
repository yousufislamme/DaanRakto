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
    <header className="border-b-[0.5px] border-white bg-slate-100 py-3 dark:bg-slate-900">
      <div className="flex items-center justify-between px-10">
        <div>
          <div
            className={`${rubik.className} cursor-pointer text-lg font-semibold`}
          >
            <Link href="/">DaanRakto</Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/donate">Blood</Link>
          <Link href="/map">Map</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
