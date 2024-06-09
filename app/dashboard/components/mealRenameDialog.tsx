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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";

interface MealRenameDialogProps {
  mealId: number;
  currentName: string;
  onMealRenamed: (mealId: number, newMealName: string) => void;
}

const MealRenameDialog: React.FC<MealRenameDialogProps> = ({
  mealId,
  currentName,
  onMealRenamed,
}) => {
  const [newMealName, setNewMealName] = useState<string>(currentName);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRename = () => {
    setIsDialogOpen(false);
    onMealRenamed(mealId, newMealName); // Call the callback to update the meal
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-fit p-2.5 flex justify-between"
          onClick={() => setIsDialogOpen(true)}
        >
          <span>Rename</span>
          <MdEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename meal</DialogTitle>
        <DialogDescription>Enter a new name for your meal</DialogDescription>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="New meal name"
            value={newMealName}
            onChange={(e) => setNewMealName(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleRename}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MealRenameDialog;
