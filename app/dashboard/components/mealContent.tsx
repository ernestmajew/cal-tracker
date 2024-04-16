import React from "react";
import MealRemoveButton from "./mealRemoveButton";

const MealContent = () => {
  return (
    <div className="flex flex-col px-8 py-4 border-b-[1px] border-border -mx-8">
      <span className="flex justify-between items-center leading-3">
        Eggs
        <MealRemoveButton></MealRemoveButton>
      </span>
      <span className="pb-2">24g</span>
      <div className="grid grid-cols-4 gap-12 pb-2">
        <span>183kcal</span>
        <span>14.2</span>
        <span>16.3</span>
        <span>8.7</span>
      </div>
    </div>
  );
};

export default MealContent;
