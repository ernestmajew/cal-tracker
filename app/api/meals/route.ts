import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/actions";

interface Product {
  productId: number;
  weight: number;
}

export const GET = async (req: Request) => {
  const session = await getSession();
  try {
    if (!session.id) {
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
    }

    const startOfDay = date ? new Date(date.setHours(0, 0, 0, 0)) : new Date();
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await prisma.meal.findMany({
      where: {
        userId: parseInt(session.id),
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        products: true,
      },
    });

    return new NextResponse(JSON.stringify(meals), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error" + error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getSession();

  if (!session.id) {
    return new NextResponse("Session not found", { status: 404 });
  }

  try {
    const body = await req.json();
    const { name, date, createdAt, userId } = body;

    if (!name || !date || !createdAt || !userId) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const newMeal = await prisma.meal.create({
      data: {
        name,
        date: new Date(date),
        createdAt: new Date(createdAt),
        user: {
          connect: { id: parseInt(userId) },
        },
      },
      include: {
        user: true,
      },
    });

    return new NextResponse(JSON.stringify(newMeal), { status: 201 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error.message, {
      status: 500,
    });
  }
};
