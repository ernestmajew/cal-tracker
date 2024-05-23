import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AddButton from "./addButton";
import MealContent from "./mealContent";
import { Meal } from "@/models/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete, MdEdit } from "react-icons/md";
import MealRenameDialog from "./mealRenameDialog";

interface MealCardProps {
  meal: Meal;
  handleMealDelete: VoidFunction;
  handleMealRename: (mealId: number, newMealName: string) => void;
}

const MealCard = ({
  meal,
  handleMealDelete,
  handleMealRename,
}: MealCardProps) => {
  return (
    <Card className="relative flex flex-col w-96 h-full overflow-x-clip border-slate-100 flex-shrink-0 rounded-xl">
      <CardHeader className="flex flex-col border-none border-b-[0px] bg-slate-100 pt-4 pb-6 rounded-t-xl">
        <div className="justify-between flex flex-row items-center">
          <h1 className="font-bold text-2xl">{meal.name}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="rounded-full w-12 hover:bg-slate-200"
              >
                <SlOptionsVertical
                  size={24}
                  className="text-xl h-full w-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Meal options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <MealRenameDialog
                  mealId={meal.id}
                  currentName={meal.name}
                  onMealRenamed={handleMealRename}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMealDelete()}>
                <Button
                  variant="ghost"
                  className="w-full h-fit p-1 flex justify-between"
                >
                  Delete
                  <MdDelete size={20} />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-4 gap-12 font-semibold">
          <span>Cal.</span>
          <span>Prot.</span>
          <span>Carbs</span>
          <span>Fats</span>
        </div>
        <div className="grid grid-cols-4 gap-12">
          <span>{meal.totalCalories || 0} kcal</span>
          <span>{meal.totalProtein || 0} g</span>
          <span>{meal.totalCarbs || 0} g</span>
          <span>{meal.totalFat || 0} g</span>
        </div>
      </CardHeader>
      <CardContent className="">
        {meal.products.length > 0 &&
          meal.products.map((product) => <MealContent key={product.id} />)}
      </CardContent>
      <div className="h-fit w-fit absolute bottom-6 right-6">
        <AddButton />
      </div>
    </Card>
  );
};

export default MealCard;
