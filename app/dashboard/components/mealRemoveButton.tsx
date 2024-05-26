"use client";

import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";

const MealRemoveButton = () => {
  const click = () => {
    console.log("add meal");
  };

  return (
    <Button
      variant="ghost"
      className="rounded-full w-12 hover:bg-slate-100"
      onClick={() => click()}
    >
      <FaMinus size={24} />
    </Button>
  );
};

export default MealRemoveButton;
