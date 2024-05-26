import React from "react";
import { Progress } from "@/components/ui/progress";

interface DataPanelProps {
  nutrients: {
    totalCalories?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
    goalCalories: number;
    goalProtein: number;
    goalCarbs: number;
    goalFat: number;
  };
}

const DataPanel: React.FC<DataPanelProps> = ({ nutrients }) => {
  const {
    totalCalories = 0,
    totalProtein = 0,
    totalCarbs = 0,
    totalFat = 0,
    goalCalories,
    goalProtein,
    goalCarbs,
    goalFat,
  } = nutrients;

  const calculateProgress = (total: number, goal: number) => {
    return (total / goal) * 100;
  };

  return (
    <div className="w-full grid grid-cols-4 py-4 px-8 gap-8 bg-slate-100 rounded-full">
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Calories</h2>
          <p className="flex flex-nowrap font-light">
            {totalCalories}/{goalCalories} kcal
          </p>
        </span>
        <Progress value={calculateProgress(totalCalories, goalCalories)} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Protein</h2>
          <p className="flex flex-nowrap font-light">
            {totalProtein}/{goalProtein} g
          </p>
        </span>
        <Progress value={calculateProgress(totalProtein, goalProtein)} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Carbs</h2>
          <p className="flex flex-nowrap font-light">
            {totalCarbs}/{goalCarbs} g
          </p>
        </span>
        <Progress value={calculateProgress(totalCarbs, goalCarbs)} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Fats</h2>
          <p className="flex flex-nowrap font-light">
            {totalFat}/{goalFat} g
          </p>
        </span>
        <Progress value={calculateProgress(totalFat, goalFat)} />
      </div>
    </div>
  );
};

export default DataPanel;
