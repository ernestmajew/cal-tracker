import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddButton from "./addButton";
import MealContent from "./mealContent";

interface MealCardProps {
  name: string;
}

const MealCard = ({ name }: MealCardProps) => {
  return (
    <Card className="w-full h-fit overflow-x-clip">
      <CardHeader className="flex flex-col border-border border-b-[1px]">
        <div className="justify-between flex flex-row items-center">
          <h1 className="font-bold text-2xl">{name}</h1>
          <AddButton></AddButton>
        </div>
        <div className="grid grid-cols-4 gap-12">
          <span>183kcal</span>
          <span>14.2</span>
          <span>16.3</span>
          <span>8.7</span>
        </div>
      </CardHeader>
      <CardContent>
        <MealContent></MealContent>
        <MealContent></MealContent>
        <MealContent></MealContent>
        <MealContent></MealContent>
        <MealContent></MealContent>
      </CardContent>
    </Card>
  );
};

export default MealCard;
