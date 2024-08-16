"use client";
import { Rubik } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const rubik = Rubik({ subsets: ["latin"] });

const Header = () => {
 const router = useRouter();
  return (
    <header className="bg-slate-100 py-5">
      <div className="flex justify-between px-10">
        <div>
          <div onClick={()=> router.push("/")} className={`${rubik.className} cursor-pointer text-lg font-semibold`}>
            DaanRakto
          </div>
        </div>
        <div className="flex gap-5">
          <Link href="/blood">Blood</Link>
          <Link href="/processing">Processing</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
