"use client"
import "@/app/globals.css";
import { Rubik } from "next/font/google";
import { useRouter } from "next/navigation";
import Button from "./Button";
import DotAnimation from "./DotAnimation";


const rubik = Rubik({ subsets: ["latin"] });


const Hero = () => {
  const router = useRouter();
  return (
    <section className="">
      <div>
           <h1
        className={`${rubik.className} mt-20 text-center text-[50px] font-semibold`}
      >
        Welcome to
        <span className="hi text-red-600"> DaanRakto</span>
       <DotAnimation />
      </h1>
      </div>
      <div className="space-x-5 flex justify-center mt-10">
        <Button
        onClick={()=> router.push("/donate")}
          className="bg-orange-400 shadow-xl text-white button_border_style hover:bg-orange-600 duration-200 ease-in-out" buttonTitle="Blood Donate" />

        <Button className="hover:bg-red-500 hover:text-white duration-200 ease-out" buttonTitle="Blood Need" />
      </div>
    </section>
  );
};

export default Hero





