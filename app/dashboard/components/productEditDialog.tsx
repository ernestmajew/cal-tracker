"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductEditDialogProps {
  product: any;
  mealId: number;
  onProductUpdated: VoidFunction;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  product,
  mealId,
  onProductUpdated,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [weight, setWeight] = useState(product.weight);

  const handleEditProduct = async () => {
    try {
      const response = await fetch(
        `/api/meals/${mealId}/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight }),
        }
      );

      if (response.ok) {
        onProductUpdated();
        setIsDialogOpen(false);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full h-fit p-2.5 flex justify-between"
            onClick={() => setIsDialogOpen(true)}
          >
            <span>Edit</span>
            <MdEdit size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit product entry</DialogTitle>
          <DialogDescription>
            Enter a new weight for your meal
          </DialogDescription>
          <div className="flex flex-col gap-4">
            <Input
              type="number"
              placeholder="g"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditProduct}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductEditDialog;
