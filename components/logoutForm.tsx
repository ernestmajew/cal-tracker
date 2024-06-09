import React from "react";
import { Button } from "./ui/button";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "@/utils/actions";

const LogoutForm = () => {
  return (
    <form action={logout} className="w-full">
      <Button
        variant={"secondary"}
        className=" text-red-500 hover:text-red-400 w-full"
      >
        <span className="pr-4">Logout</span>
        <MdOutlineLogout size={20} />
      </Button>
    </form>
  );
};

export default LogoutForm;
