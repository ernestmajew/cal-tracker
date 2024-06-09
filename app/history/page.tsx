"use client";

import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { getSession, getUser } from "@/utils/actions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);
const months = [
  { name: "January", value: "0" },
  { name: "February", value: "1" },
  { name: "March", value: "2" },
  { name: "April", value: "3" },
  { name: "May", value: "4" },
  { name: "June", value: "5" },
  { name: "July", value: "6" },
  { name: "August", value: "7" },
  { name: "September", value: "8" },
  { name: "October", value: "9" },
  { name: "November", value: "10" },
  { name: "December", value: "11" },
];

export default function HistoryPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [nutrients, setNutrients] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    goalCalories: 0,
    goalProtein: 0,
    goalCarbs: 0,
    goalFat: 0,
  });

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
  }, []);

  useEffect(() => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(selectedMonth);
    date.setFullYear(selectedYear);

    fetch(`/api/meals/month?date=${date.toISOString()}`)
      .then((res) => res.json())
      .then((data) => setMonthlyData(data));
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const calculateProgress = (goal: number, total: number) => {
    return (total / goal) * 100;
  };

  return (
    <>
      <div className="h-32 flex justify-between items-center py-8">
        <h1 className="font-bold text-3xl">History</h1>
        <div className="w-fit flex gap-2">
          <Select
            onValueChange={handleYearChange}
            value={selectedYear.toString()}
          >
            <SelectTrigger className="bg-slate-200 px-8 rounded-full border-none gap-2 w-fit">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleMonthChange}
            value={selectedMonth.toString()}
          >
            <SelectTrigger className="bg-slate-200 px-8 rounded-full border-none gap-2 w-42">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full justify-center mx-auto p-12 text-nowrap overflow-y-scroll">
        {monthlyData.map((day) => (
          <div
            key={day.day}
            className="w-72 h-fit p-4 bg-slate-100 flex flex-col rounded-lg gap-2"
          >
            <h1 className="text-2xl font-bold text-slate-600">{day.day}</h1>
            <div className="flex flex-col justify-center gap-2">
              <span className="w-full justify-between flex font-light">
                <span className="font-semibold">Calories</span>
                <span>
                  {day.totalCalories.toFixed()} /{" "}
                  {nutrients.goalCalories.toFixed()} kcal
                </span>
              </span>
              <Progress
                value={calculateProgress(
                  nutrients.goalCalories,
                  day.totalCalories
                )}
              ></Progress>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="w-full justify-between flex font-light">
                <span className="font-semibold">Proteins</span>
                <span>
                  {day.totalProtein.toFixed()} /{" "}
                  {nutrients.goalProtein.toFixed()} g
                </span>
              </span>
              <Progress
                value={calculateProgress(
                  nutrients.goalProtein,
                  day.totalProtein
                )}
                color="bg-orange-600"
              ></Progress>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="w-full justify-between flex font-light">
                <span className="font-semibold">Carbs</span>
                <span>
                  {day.totalCarbs.toFixed()} / {nutrients.goalCarbs.toFixed()} g
                </span>
              </span>
              <Progress
                value={calculateProgress(nutrients.goalCarbs, day.totalCarbs)}
                color="bg-orange-400"
              ></Progress>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="w-full justify-between flex font-light">
                <span className="font-semibold">Fat</span>
                <span>
                  {day.totalFat.toFixed()} / {nutrients.goalFat.toFixed()} g
                </span>
              </span>
              <Progress
                value={calculateProgress(nutrients.goalFat, day.totalFat)}
                color="bg-amber-400"
              ></Progress>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
