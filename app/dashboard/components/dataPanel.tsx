"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";

interface DataPanelProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goalCalories: number;
  goalProtein: number;
  goalCarbs: number;
  goalFat: number;
}

const DataPanel: React.FC<DataPanelProps> = ({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  goalCalories,
  goalProtein,
  goalCarbs,
  goalFat,
}) => {
  const calculateProgress = (total: number, goal: number) => {
    return (total / goal) * 100;
  };

  return (
    <div className="w-full grid grid-cols-4 py-4 px-8 gap-8 bg-slate-100 rounded-full">
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Calories</h2>
          <p className="flex flex-nowrap font-light">
            {totalCalories.toFixed()}/{goalCalories} kcal
          </p>
        </span>
        <Progress value={calculateProgress(totalCalories, goalCalories)} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Protein</h2>
          <p className="flex flex-nowrap font-light">
            {totalProtein.toFixed()}/{goalProtein} g
          </p>
        </span>
        <Progress
          value={calculateProgress(totalProtein, goalProtein)}
          color="bg-orange-600"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Carbs</h2>
          <p className="flex flex-nowrap font-light">
            {totalCarbs.toFixed()}/{goalCarbs} g
          </p>
        </span>
        <Progress
          value={calculateProgress(totalCarbs, goalCarbs)}
          color="bg-orange-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex justify-between">
          <h2 className="font-semibold">Fats</h2>
          <p className="flex flex-nowrap font-light">
            {totalFat.toFixed()}/{goalFat} g
          </p>
        </span>
        <Progress
          value={calculateProgress(totalFat, goalFat)}
          color="bg-amber-400"
        />
      </div>
    </div>
  );
};

export default DataPanel;
