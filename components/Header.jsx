
import { Rubik } from "next/font/google";
import Link from "next/link";

const rubik = Rubik({ subsets: ["latin"] });

const Header = () => {
  return (
    <header className="bg-slate-100 py-5">
      <div className="flex justify-between px-10">
        <div>
          <Link className={`${rubik.className} text-lg font-semibold`} href="/">
            DaanRakto
          </Link>
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
