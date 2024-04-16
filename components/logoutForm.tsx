import React from "react";
import { Button } from "./ui/button";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "@/utils/actions";

const LogoutForm = () => {
  return (
    <form action={logout}>
      <Button variant="ghost" className="rounded-full">
        <MdOutlineLogout size={32} />
      </Button>
    </form>
  );
};

export default LogoutForm;
