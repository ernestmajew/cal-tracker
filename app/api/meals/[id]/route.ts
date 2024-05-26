import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/actions";

interface Product {
  productId: number;
  weight: number;
}

export const GET = async (req: Request, context: { params: any }) => {
  const mealId = parseInt(context.params.id);
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      include: {
        products: true,
      },
    });
    if (!mealId) {
      return new NextResponse("Invalid meal id", { status: 400 });
    }
    if (!meal) {
      return new NextResponse("Meal not found", { status: 404 });
    }
    if (meal.userId !== parseInt(session.id)) {
      return new NextResponse("Meal not assigned to user", { status: 405 });
    }
    return new NextResponse(JSON.stringify(meal), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};

export const PUT = async (req: Request, context: { params: any }) => {
  const mealId = parseInt(context.params.id);
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const existingMeal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
    });
    if (!mealId) {
      return new NextResponse("Invalid meal id", { status: 400 });
    }
    if (!existingMeal) {
      return new NextResponse("Meal not found", { status: 404 });
    }
    if (existingMeal.userId !== parseInt(session.id)) {
      return new NextResponse("Meal not assigned to user", { status: 405 });
    }
    const updatedMeal = await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        name,
      },
    });
    return new NextResponse(JSON.stringify(updatedMeal), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};

export const PUT_WITH_PRODUCTS = async (
  req: Request,
  context: { params: any }
) => {
  const mealId = parseInt(context.params.id);
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }
    const body = await req.json();
    const { name, products } = body;
    const existingMeal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      include: {
        products: true,
      },
    });
    if (!mealId) {
      return new NextResponse("Invalid meal id", { status: 400 });
    }
    if (!existingMeal) {
      return new NextResponse("Meal not found", { status: 404 });
    }
    if (existingMeal.userId !== parseInt(session.id)) {
      return new NextResponse("Meal not assigned to user", { status: 405 });
    }
    const updatedMeal = await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        name,
        products: {
          deleteMany: {},
          createMany: {
            data: products.map((product: Product) => ({
              weight: product.weight,
              product: {
                connect: { id: product.productId },
              },
            })),
          },
        },
      },
      include: {
        products: true,
      },
    });
    return new NextResponse(JSON.stringify(updatedMeal), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: { params: any }) => {
  const mealId = parseInt(context.params.id);
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }
    const existingMeal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
    });
    if (!mealId) {
      return new NextResponse("Invalid meal id", { status: 400 });
    }
    if (!existingMeal) {
      return new NextResponse("Meal not found", { status: 404 });
    }
    if (existingMeal.userId !== parseInt(session.id)) {
      return new NextResponse("Meal not assigned to user", { status: 405 });
    }
    await prisma.productWeight.deleteMany({
      where: {
        mealId: mealId,
      },
    });
    const deletedMeal = await prisma.meal.delete({
      where: {
        id: mealId,
      },
    });
    return new NextResponse(JSON.stringify(deletedMeal), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};
