import { Rubik } from "next/font/google";



const rubik = Rubik({ subsets: ["latin"] });

const Hero = () => {
  return (
    <section className="">
      <h1
        className={`${rubik.className} mt-20 text-center text-[50px] font-semibold`}
      >
        Welcome to
        <span className="hi text-red-600"> DaanRakto </span>
        <span
          className={`loader_spin inline-block h-3 w-3 rounded-full`}
        ></span>
      </h1>
    </section>
  );
};

export default Hero;
