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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/utils/actions";
import { FaPlus } from "react-icons/fa6";

interface AddMealDialogProps {
  selectedDay: Date;
  onMealAdded: () => void;
}

const defaultMeals = ["Breakfast", "Breakfast 2", "Lunch", "Snack", "Dinner"];

const AddMealDialog: React.FC<AddMealDialogProps> = ({
  selectedDay,
  onMealAdded,
}) => {
  const [newMealName, setNewMealName] = useState<string | null>(null);
  const [customMealName, setCustomMealName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMealNameChange = (name: string) => {
    setNewMealName(name);
  };

  const handleAddMeal = async () => {
    if (newMealName === "type" && customMealName === "") return;

    const data = {
      name: newMealName === "type" ? customMealName : newMealName,
      date: selectedDay.toISOString(),
      createdAt: new Date().toISOString(),
      userId: (await getSession()).id,
    };

    try {
      const response = await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onMealAdded();
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add meal");
      }
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="group/add w-28 h-full flex justify-center items-center bg-white rounded-xl  hover:bg-slate-50 transition-all flex-shrink-0 border border-slate-100 shadow-sm"
        onClick={() => setIsDialogOpen(true)}
      >
        <Button className="group/add rounded-full bg-slate-200 group-hover/add:bg-slate-300 group-hover/add:text-slate-500 text-slate-400 h-16 w-16">
          <FaPlus size={48} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add meal</DialogTitle>
        <DialogDescription>
          Add new meal to your daily counter
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <Select onValueChange={(value) => handleMealNameChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select meal name"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="type">Type in name</SelectItem>
              </SelectGroup>
              <Separator className="my-2 w-11/12 mx-auto"></Separator>
              <SelectGroup>
                {defaultMeals.map((meal) => (
                  <SelectItem key={meal} value={meal.toLowerCase()}>
                    {meal}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {newMealName === "type" && (
            <Input
              type="text"
              placeholder="Type in meal name"
              value={customMealName}
              onChange={(e) => setCustomMealName(e.target.value)}
            />
          )}
        </div>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddMeal}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealDialog;
