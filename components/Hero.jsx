"use client";
import { cn } from "@/lib/utils";
import { Rubik } from "next/font/google";
import { useRouter } from "next/navigation";
import Button from "./Button";
import DotAnimation from "./DotAnimation";
import Popup from "./Popup";

const rubik = Rubik({ subsets: ["latin"] });

export function Hero() {
  const router = useRouter();

  return (
    <div className="relative flex w-full flex-col items-center bg-white py-32 bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Main Content */}
      <h1
        className={cn(
          `${rubik.className} titleStyle mt-32 text-center font-extrabold`,
        )}
      >
        Welcome to
        <span className="text-red-600"> DaanRakto </span>
        <DotAnimation />
      </h1>

      <div className="mt-2 text-center text-neutral-300">
        <p>We make blood donation easy and accessible.</p>
      </div>

      <div className="mt-10 flex justify-center space-x-5">
        <Button
          onClick={() => router.push("/donate")}
          className="button_border_style bg-orange-400 text-white shadow-xl duration-200 ease-in-out hover:bg-orange-600"
          buttonTitle="Blood Donate"
        />
        <Button
          className="bg-slate-900 text-white duration-200 ease-out hover:bg-slate-800"
          buttonTitle="Blood Need"
        />
      </div>
      <Popup />
    </div>
  );
}

export default Hero;
