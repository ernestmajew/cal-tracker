import { getSession } from "@/utils/actions";
import MealCard from "./components/mealCard";
import WeekDaySelector from "@/app/dashboard/components/weekDaySelector";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  const meals = ["Breakfast", "Brunch", "Lunch", "Dinner", "Test 1"];

  return (
    <>
      <div className="py-8 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <WeekDaySelector></WeekDaySelector>
      </div>
      <div>
        <div className="w-full h-full flex items-center justify-center gap-8 overflow-y-scroll pb-24">
          {meals.map((meal, i) => (
            <div
              key={i}
              className="w-96 h-full overflow-x-clip overflow-y-scroll"
            >
              <MealCard name={meal} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
