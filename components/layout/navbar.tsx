import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import LogoutForm from "../logoutForm";
import { getSession } from "@/utils/actions";
import { FaUserLarge } from "react-icons/fa6";

export const Navbar = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) return <></>;
  return (
    <>
      <div className="w-28 h-full z-10 backdrop-blur-lg transition-all overflow-clip flex-shrink-0">
        <div className="h-full container flex flex-col justify-between items-center py-10">
          <Link href="/dashboard" className="h-12 -mx-3">
            <img src="/logo.png" alt="Logo" className="w-16" />
          </Link>

          <div className="flex flex-col gap-2 bg-slate-100 p-2 rounded-full">
            <Link
              href="dashboard"
              className="flex items-center justify-center rounded-full w-14 h-14 text-slate-800 hover:bg-slate-200 transition-colors ease-in-out"
            >
              <BiSolidDashboard size={24} />
            </Link>
            <Link
              href="/history"
              className="flex items-center justify-center rounded-full w-14 h-14 text-slate-800 hover:bg-slate-200 transition-colors ease-in-out"
            >
              <FaChartBar size={24} />
            </Link>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <Link
              href="/user"
              className="w-14 h-14 bg-slate-100 hover:bg-slate-200 items-center justify-center flex rounded-full text-xl"
            >
              <FaUserLarge />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
