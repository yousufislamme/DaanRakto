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
 <header className="border-b-[0.5px] border-white bg-slate-100 py-3 dark:bg-slate-900 md:flex md:items-center md:justify-between">
  <div className="flex items-center justify-between px-4 md:px-10">
    <div className="md:hidden">
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
    <div className="md:flex md:items-center">
      <div
        className={`${rubik.className} cursor-pointer text-lg font-semibold`}
      >
        <Link href="/">DaanRakto</Link>
      </div>
      <div className="hidden md:flex md:items-center md:gap-5">
        <Link href="/donate">Donate</Link>
        <Link href="/blood-request">Blood Request</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </div>
    <div className="md:hidden">
      <Button variant="outline" size="icon" className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
    </div>
  </div>
  <div className="md:hidden">
    <div className="flex flex-col gap-5 p-4">
      <Link href="/donate">Donate</Link>
      <Link href="/blood-request">Blood Request</Link>
      <Link href="/blog">Blog</Link>
    </div>
  </div>
</header>
  );
};

export default Header;
