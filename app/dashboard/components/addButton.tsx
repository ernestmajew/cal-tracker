"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface AddButtonProps {
  mealId: number;
  onProductAdded: VoidFunction;
}

const AddButton = ({ mealId, onProductAdded }: AddButtonProps) => {
  const [searchedName, setSearchedName] = useState<string>("");
  const [productWeight, setProductWeight] = useState<number>();
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (searchedName) {
      updateList(searchedName);
    }
  }, [searchedName]);

  const updateList = async (productName: string) => {
    try {
      const response = await fetch(`/api/products?name=${productName}`);
      const data = await response.json();
      setSearchedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addMeal = async () => {
    if (!selectedProduct || !productWeight || productWeight <= 0) {
      return;
    }

    try {
      const response = await fetch(`/api/meals/${mealId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct,
          weight: productWeight,
        }),
      });

      if (response.ok) {
        console.log("Product added successfully to the meal.");
        setIsDialogOpen(false);
        setSearchedName("");
        setProductWeight(undefined);
        setSelectedProduct(null);
        setSearchedProducts([]);
        onProductAdded();
      } else {
        console.error(
          "Failed to add product to the meal:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding product to the meal:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsDialogOpen(true)}
        >
          <FaPlus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add product</DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Search</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Search by name"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
          />
        </div>
        <Label>Products</Label>
        <ScrollArea className="h-[350px] border rounded-md pt-2">
          {searchedProducts.map((product) => (
            <div
              className={`mx-2 p-3 border-b ${
                product.id === selectedProduct
                  ? "bg-slate-100 rounded font-semibold"
                  : ""
              }`}
              key={product?.id}
              onClick={() => setSelectedProduct(product.id)}
            >
              {product.name}
            </div>
          ))}
        </ScrollArea>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="weight">Weight</Label>
          <Input
            type="number"
            id="weight"
            name="weight"
            placeholder="g"
            value={productWeight}
            onChange={(e) => setProductWeight(parseInt(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!selectedProduct || !productWeight || productWeight <= 0}
            onClick={addMeal}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddButton;
