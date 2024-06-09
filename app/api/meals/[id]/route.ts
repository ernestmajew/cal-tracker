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

    const body = await req.json();
    const productId = body.productId;

    // Fetch the existing meal to validate ownership and existence
    const existingMeal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                nutrition: true,
              },
            },
          },
        },
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

    if (!productId) {
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
    } else {
      const productWeightEntry = existingMeal.products.find(
        (pw) => pw.productId === productId
      );
      if (!productWeightEntry) {
        return new NextResponse("Product not found in meal", { status: 404 });
      }

      const weight = productWeightEntry.weight;
      const nutrition = productWeightEntry.product.nutrition;

      const updatedMeal = await prisma.meal.update({
        where: { id: mealId },
        data: {
          totalCalories:
            (existingMeal.totalCalories || 0) -
            (nutrition.calories || 0) * (weight / 100),
          totalProtein:
            (existingMeal.totalProtein || 0) -
            (nutrition.protein || 0) * (weight / 100),
          totalCarbs:
            (existingMeal.totalCarbs || 0) -
            (nutrition.carbs || 0) * (weight / 100),
          totalFat:
            (existingMeal.totalFat || 0) -
            (nutrition.fat || 0) * (weight / 100),
          totalSugar:
            (existingMeal.totalSugar || 0) -
            (nutrition.sugar || 0) * (weight / 100),
        },
      });

      await prisma.productWeight.delete({
        where: {
          id: productWeightEntry.id,
        },
      });

      return new NextResponse(JSON.stringify(updatedMeal), { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};

export const POST = async (req: Request, context: { params: any }) => {
  const mealId = parseInt(context.params.id);

  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse("Session not found", { status: 404 });
    }

    const body = await req.json();
    const { productId, weight } = body;

    if (!productId || !weight) {
      return new NextResponse("Product ID and weight are required", {
        status: 400,
      });
    }

    const existingMeal = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                nutrition: true,
              },
            },
          },
        },
      },
    });

    if (!existingMeal) {
      return new NextResponse("Meal not found", { status: 404 });
    }
    if (existingMeal.userId !== parseInt(session.id)) {
      return new NextResponse("Meal not assigned to user", { status: 405 });
    }

    const newProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { nutrition: true },
    });

    if (!newProduct || !newProduct.nutrition) {
      return new NextResponse("Product nutrition not found", { status: 404 });
    }

    let totalCalories = existingMeal.totalCalories || 0;
    let totalProtein = existingMeal.totalProtein || 0;
    let totalCarbs = existingMeal.totalCarbs || 0;
    let totalFat = existingMeal.totalFat || 0;
    let totalSugar = existingMeal.totalSugar || 0;

    totalCalories += (newProduct.nutrition.calories || 0) * (weight / 100);
    totalProtein += (newProduct.nutrition.protein || 0) * (weight / 100);
    totalCarbs += (newProduct.nutrition.carbs || 0) * (weight / 100);
    totalFat += (newProduct.nutrition.fat || 0) * (weight / 100);
    totalSugar += (newProduct.nutrition.sugar || 0) * (weight / 100);

    const newProductWeight = await prisma.productWeight.create({
      data: {
        weight,
        mealId: mealId,
        productId: productId,
      },
    });

    const updatedMeal = await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalSugar,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                nutrition: true,
              },
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(updatedMeal), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error: " + error, { status: 500 });
  }
};
