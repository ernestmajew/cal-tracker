"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const AddButton = () => {
  const addMeal = () => {
    console.log("add meal");
  };

  return (
    <Button
      onClick={() => addMeal()}
      className="rounded-full w-14 h-14 shadow-lg"
    >
      <FaPlus size={24} />
    </Button>
  );
};

export default AddButton;
