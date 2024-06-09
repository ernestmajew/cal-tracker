"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { goalSubmit } from "@/utils/actions";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";

interface GoalSettingsFormProps {
  id: number;
  initialValues: {
    caloriesTarget: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
}

export default function GoalSettingsForm({
  id,
  initialValues,
}: GoalSettingsFormProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [state, formAction] = useFormState<any, FormData>(
    goalSubmit,
    undefined
  );
  const { toast } = useToast();
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const calculateCalories = (proteins: number, carbs: number, fats: number) => {
    return proteins * 4 + carbs * 4 + fats * 9;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10) || 0;

    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: newValue };
      const { proteins, carbs, fats } = newValues;
      return {
        ...newValues,
        caloriesTarget: calculateCalories(proteins, carbs, fats),
      };
    });
  };

  const handleReset = () => {
    setFormValues(initialValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("calories", formValues.caloriesTarget.toString());
    formData.append("proteins", formValues.proteins.toString());
    formData.append("carbs", formValues.carbs.toString());
    formData.append("fats", formValues.fats.toString());
    try {
      await formAction(formData);
      toast({
        title: "Success",
        description: "Goal settings updated",
      });
    } catch (error: Error | any) {
      toast({
        title: "Error",
        description: error?.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="font-semibold">Goal settings</h1>
      <div className="flex w-full items-center">
        <Label className="w-36">Calories</Label>
        <Input
          className="text-end border-none pointer-events-none"
          type="number"
          id="calories"
          name="caloriesTarget"
          placeholder="g"
          value={formValues.caloriesTarget}
          readOnly
        />
      </div>
      <div className="flex w-full items-center">
        <Label htmlFor="proteins" className="w-36">
          Proteins
        </Label>
        <Input
          className="text-end"
          type="number"
          id="proteins"
          name="proteins"
          placeholder="g"
          value={formValues.proteins}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center">
        <Label htmlFor="carbs" className="w-36">
          Carbs
        </Label>
        <Input
          className="text-end"
          type="number"
          id="carbs"
          name="carbs"
          placeholder="g"
          value={formValues.carbs}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center">
        <Label htmlFor="fats" className="w-36">
          Fats
        </Label>
        <Input
          className="text-end"
          type="number"
          id="fats"
          name="fats"
          placeholder="g"
          value={formValues.fats}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 w-full gap-4 flex items-center justify">
        <Button
          type="button"
          variant={"secondary"}
          className="gap-2 w-full"
          onClick={handleReset}
        >
          Reset <FaXmark size={20} />
        </Button>
        <Button
          type="submit"
          className="bg-primary text-white hover:bg-primary hover:opacity-90 gap-2 w-full"
        >
          Save <FaCheck size={20} />
        </Button>
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
