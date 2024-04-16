import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import LogoutForm from "../logoutForm";
import { getSession } from "@/utils/actions";

export const Navbar = async () => {
  const session = await getSession();
  console.log(session);
  if (!session.isLoggedIn) return <></>;
  return (
    <>
      <div className="w-28 h-full z-10 backdrop-blur-lg transition-all overflow-clip flex-shrink-0">
        <div className="h-full container flex flex-col justify-between items-center py-12">
          <Link href="/dashboard" className="h-12 -mx-3">
            <img src="/logo.png" alt="Logo" className="w-16" />
          </Link>

          <div className="flex flex-col gap-2 bg-slate-100 p-2 rounded-full">
            <Link
              href="dashboard"
              className="flex items-center gap-2 p-4 text-slate-800"
            >
              <BiSolidDashboard size={24} />
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 p-4 text-slate-800"
            >
              <FaChartBar size={24} />
            </Link>
            <Link
              href="dashboard"
              className="flex items-center gap-2 p-4 text-slate-800"
            >
              <BiSolidDashboard size={24} />
            </Link>
            <Link
              href="dashboard"
              className="flex items-center gap-2 p-4 text-slate-800"
            >
              <BiSolidDashboard size={24} />
            </Link>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <Link href="/login">
              <img
                src="running_0.jpg"
                className="w-12 h-12 rounded-full object-fill"
              ></img>
            </Link>
            <LogoutForm></LogoutForm>
          </div>
        </div>
      </div>
    </>
  );
};
