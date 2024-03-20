"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const path = usePathname();
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);
  const isActive = (href) => currentPath === href;

  return (
    <>
      <div
        className={
          isExpanded
            ? "w-72 h-full z-10 backdrop-blur-lg transition-all overflow-clip bg-stone-100 flex-shrink-0"
            : "w-24 h-full z-10 backdrop-blur-lg transition-all overflow-clip bg-stone-100 flex-shrink-0"
        }
      >
        <div className="h-full container flex flex-col justify-between items-center py-12">
          <Link href="/dashboard" className="h-12 -mx-3">
            <img src="/logo.png" alt="Logo" className="w-16" />
          </Link>

          <div className="flex flex-col gap-8">
            <Link href="dashboard" className="flex items-center gap-2">
              <BiSolidDashboard size={24} />
              {isExpanded ? "Dashboard" : ""}
            </Link>
            <Link href="/history" className="flex items-center gap-2">
              <FaChartBar size={24} />
              {isExpanded ? "History" : ""}
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            <Link href="/login" className="grid w-full">
              <Button size="icon" className=" w-full gap-2" variant="ghost">
                <IoPerson size={24} />
                {isExpanded ? <span>Login</span> : ""}
              </Button>
            </Link>

            <Button
              className=" w-full gap-2"
              variant="ghost"
              onClick={() => toggleIsExpanded()}
            >
              {isExpanded ? (
                <>
                  <FaAngleLeft size={24} />
                  <span>Colapse</span>
                </>
              ) : (
                <FaAngleRight size={24} />
              )}{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
