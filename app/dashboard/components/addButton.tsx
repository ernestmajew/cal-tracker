"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const AddButton = () => {
  const addMeal = () => {
    console.log("add meal");
  };

  return (
    <Button variant="ghost" onClick={() => addMeal()}>
      <FaPlus size={24} />
    </Button>
  );
};

export default AddButton;
