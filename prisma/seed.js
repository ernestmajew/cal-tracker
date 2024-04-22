// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the seeding function
async function seed() {
  try {
    // Drop existing data
    await prisma.productWeight.deleteMany({});
    await prisma.meal.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.nutrition.deleteMany({});
    const password = await bcrypt.hash("password123", 10);

    // Create users
    const user1 = await prisma.user.create({
      data: {
        username: "user1",
        email: "user1@example.com",
        password: password,
      },
    });

    // Create products and their nutrition
    const product1 = await prisma.product.create({
      data: {
        name: "Carrot",
        nutrition: {
          create: {
            calories: 25,
            protein: 0.6,
            carbs: 5.8,
            fat: 0.1,
          },
        },
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: "Apple",
        nutrition: {
          create: {
            calories: 52,
            protein: 0.3,
            carbs: 14,
            fat: 0.2,
          },
        },
      },
    });

    // Create meals
    const meal1 = await prisma.meal.create({
      data: {
        name: "Breakfast",
        date: new Date(),
        userId: user1.id,
        products: {
          create: [
            {
              weight: 200,
              productId: product1.id,
            },
            {
              weight: 150,
              productId: product2.id,
            },
          ],
        },
      },
    });

    const meal2 = await prisma.meal.create({
      data: {
        name: "Lunch",
        date: new Date(),
        userId: user1.id,
        products: {
          create: [
            {
              weight: 300,
              productId: product1.id,
            },
          ],
        },
      },
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    // Disconnect PrismaClient after seeding
    await prisma.$disconnect();
  }
}

// Call the seeding function
seed();
