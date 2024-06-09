"use client";

import React, { useState, useEffect } from "react";
import { getSession, getUser } from "@/utils/actions";
import { MealCard } from "./components/mealCard";
import WeekDaySelector from "@/app/dashboard/components/weekDaySelector";
import { useRouter } from "next/navigation";
import AddMealDialog from "./components/addMealDialog";
import { Meal } from "@/models/models";
import DataPanel from "./components/dataPanel";
import { User } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

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

const DashboardPage = () => {
  const [meals, setMeals] = useState<Meal[] | null>([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [nutrients, setNutrients] = useState<DataPanelProps>({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    goalCalories: 0,
    goalProtein: 0,
    goalCarbs: 0,
    goalFat: 0,
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    getUser().then((res) => {
      setNutrients({
        ...nutrients,
        goalCalories: res?.caloriesTarget!,
        goalProtein: res?.protein!,
        goalCarbs: res?.carbs!,
        goalFat: res?.fat!,
      });
    });
  }, [meals]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session.isLoggedIn) {
        router.push("/");
      }
    };
    fetchSession();
  }, [router]);

  const fetchMeals = async (day: Date) => {
    try {
      const response = await fetch(
        `/api/meals?date=${encodeURIComponent(day.toISOString())}`
      );
      const data = await response.json();
      console.log(data);
      setMeals(data);

      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;

      data.forEach((meal: Meal) => {
        calories += meal.totalCalories || 0;
        protein += meal.totalProtein || 0;
        carbs += meal.totalCarbs || 0;
        fat += meal.totalFat || 0;
      });

      setNutrients((prevNutrients) => ({
        ...prevNutrients,
        totalCalories: calories,
        totalProtein: protein,
        totalCarbs: carbs,
        totalFat: fat,
      }));
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  const handleMealDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Meal deleted",
        });
        handleMealUpdated();
      } else {
        console.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };

  const handleRenameMeal = async (mealId: number, newMealName: string) => {
    if (!newMealName) return;

    const data = {
      name: newMealName,
    };

    try {
      const response = await fetch(`/api/meals/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchMeals(selectedDay);
      } else {
        console.error("Failed to rename meal");
      }
    } catch (error) {
      console.error("Failed to rename meal:", error);
    }
  };

  useEffect(() => {
    fetchMeals(selectedDay);
  }, [selectedDay]);

  const handleDayChange = (day: Date) => {
    setSelectedDay(day);
  };

  const handleMealAdded = () => {
    fetchMeals(selectedDay);
  };

  const handleMealUpdated = () => {
    fetchMeals(selectedDay);
  };

  return (
    <>
      <div className="h-[9rem] flex justify-between items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <WeekDaySelector onDayChange={handleDayChange} />
      </div>
      <div className="w-full h-full flex items-center justify-start gap-4 pb-8 overflow-x-scroll overflow-y-hidden relative">
        {meals && meals.length > 0 ? (
          meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              handleMealDelete={() => handleMealDelete(meal.id)}
              handleMealRename={handleRenameMeal}
              onMealUpdated={handleMealUpdated}
            />
          ))
        ) : (
          <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-slate-300 text-2xl font-light">
            No meals were found on that day. Add a new meal
          </p>
        )}
        <AddMealDialog
          selectedDay={selectedDay}
          onMealAdded={handleMealAdded}
        />
      </div>
      <div className="flex justify-center items-center w-full p-8 pl-0">
        <DataPanel {...nutrients} />
      </div>
    </>
  );
};

export default DashboardPage;
