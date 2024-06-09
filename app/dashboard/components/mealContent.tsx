import React, { useState } from "react";
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
import ProductEditDialog from "./productEditDialog";

const MealContent = ({
  product,
  mealId,
  onMealUpdated,
}: {
  product: any;
  mealId: number;
  onMealUpdated: VoidFunction;
}) => {
  const handleProductDelete = async () => {
    try {
      const response = await fetch(`/api/meals/${mealId}`, {
        method: "DELETE",
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        onMealUpdated();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col px-8 py-2 border-b-[1px] border-border border-slate-200 -mx-8">
      <span className="flex justify-between items-center font-bold">
        <span className="text-nowrap overflow-clip">{product.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="rounded-full w-12 hover:bg-slate-200"
            >
              <SlOptionsVertical size={24} className="text-xl h-full w-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Meal options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* <ProductEditDialog
                product={product}
                mealId={mealId}
                onProductUpdated={onMealUpdated}
              /> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleProductDelete}>
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
      </span>
      <span className="pb-2 font-semibold">{product.weight} g</span>
      <div className="grid grid-cols-4 gap-12 pb-2 text-nowrap">
        <span className="text-nowrap">
          {(product.nutrition.calories * (product.weight / 100)).toFixed()} kcal
        </span>
        <span>
          {(product.nutrition.protein * (product.weight / 100)).toFixed()} g
        </span>
        <span>
          {(product.nutrition.carbs * (product.weight / 100)).toFixed()} g
        </span>
        <span>
          {(product.nutrition.fat * (product.weight / 100)).toFixed()} g
        </span>
      </div>
    </div>
  );
};

export default MealContent;
