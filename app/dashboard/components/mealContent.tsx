import React from "react";
import MealRemoveButton from "./mealRemoveButton";

const MealContent = () => {
  return (
    <div className="flex flex-col px-8 py-2 border-b-[1px] border-border border-slate-200 -mx-8">
      <span className="flex justify-between items-center font-bold">
        Eggs
        <MealRemoveButton></MealRemoveButton>
      </span>
      <span className="pb-2 font-semibold">24g</span>
      <div className="grid grid-cols-4 gap-12 pb-2">
        <span className="text-nowrap">183 kcal</span>
        <span>14.2 g</span>
        <span>16.3 g</span>
        <span>8.7 g</span>
      </div>
    </div>
  );
};

export default MealContent;
