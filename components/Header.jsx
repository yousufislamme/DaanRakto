"use client";
import LogoAnimation from "@/app/logo/page";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { setTheme, resolvedTheme } = useTheme();

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Scroll down
    } else {
      setIsVisible(true); // Scroll up
    }
    setLastScrollY(window.scrollY);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  const handleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b-2 bg-white/50 px-1 backdrop-blur-2xl transition-transform duration-300 md:px-5 lg:px-20 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          rel="noopener noreferrer"
          href={"/"}
          aria-label="Back to homepage"
          className="flex items-center p-2 text-2xl font-semibold"
        >
          <div className="mt-6">
            <LogoAnimation />
          </div>
        </Link>
        <ul className="hidden space-x-3 md:flex">
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/"}
              className={`flex items-center px-4 ${pathname === "/blood-request" ? "text-red-600" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/blood-request"}
              className={`flex items-center px-4 ${pathname === "/blood-request" ? "text-red-600" : ""}`}
            >
              Blood Request
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/blog"}
              className={`flex items-center px-4 ${pathname === "/blog" ? "text-red-600" : ""}`}
            >
              Blog
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/police"}
              className={`flex items-center px-4 ${pathname === "/police" ? "text-red-600" : ""}`}
            >
              Police
            </Link>
          </li>
          <Button variant="outline" size="icon" onClick={handleTheme}>
            {resolvedTheme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </ul>
        <button
          className="flex justify-end p-4 md:hidden"
          onClick={handleDropdownToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-16 w-full border-t bg-white/60 text-slate-900 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col space-y-2 p-4 font-semibold">
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/"}
                className={`block px-4 py-2 ${pathname === "/" ? "text-red-600" : ""}`}
                onClick={() => setIsDropdownVisible(false)}
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
