import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/actions";

export const GET = async (req: Request) => {
  try {
    const session = await getSession();

    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }

    const url = new URL(req.url);
    const dateParam = url.searchParams.get("date");
    let date = null;

    if (dateParam) {
      date = new Date(dateParam);
      if (isNaN(date.getTime())) {
        return new NextResponse("Invalid date format", { status: 400 });
      }
    } else {
      return new NextResponse("Date parameter is required", { status: 400 });
    }

    // Calculate the start and end of the month
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Fetch meals within the specified month
    const meals = await prisma.meal.findMany({
      where: {
        userId: parseInt(session.id),
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    // Initialize an array with all days of the month
    const daysInMonth = Array.from(
      { length: endOfMonth.getDate() },
      (_, day) => ({
        day: day + 1, // 1-based day number
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalSugar: 0,
      })
    );

    // Aggregate meals by day and merge with the initialized array
    const dailyTotals = meals.reduce((acc, meal) => {
      const dayNumber = new Date(meal.date).getDate(); // Get the day number (1-31)
      if (!acc[dayNumber]) {
        acc[dayNumber] = {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
          totalSugar: 0,
        };
      }

      acc[dayNumber].totalCalories += meal.totalCalories || 0;
      acc[dayNumber].totalProtein += meal.totalProtein || 0;
      acc[dayNumber].totalCarbs += meal.totalCarbs || 0;
      acc[dayNumber].totalFat += meal.totalFat || 0;
      acc[dayNumber].totalSugar += meal.totalSugar || 0;

      return acc;
    }, {});

    // Merge the daily totals into the days in the month
    const result = daysInMonth.map((day) => ({
      day: day.day,
      totalCalories: dailyTotals[day.day]?.totalCalories || 0,
      totalProtein: dailyTotals[day.day]?.totalProtein || 0,
      totalCarbs: dailyTotals[day.day]?.totalCarbs || 0,
      totalFat: dailyTotals[day.day]?.totalFat || 0,
      totalSugar: dailyTotals[day.day]?.totalSugar || 0,
    }));

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};
