// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the seeding function
async function seed() {
    try {
        // Drop existing data
        await prisma.nutrition.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.meal.deleteMany({});
        await prisma.day.deleteMany({});
        await prisma.category.deleteMany({});
        await prisma.user.deleteMany({});

        // Create categories
        const category1 = await prisma.category.create({
            data: {
                name: 'Vegetables',
            },
        });

        const category2 = await prisma.category.create({
            data: {
                name: 'Fruits',
            },
        });

        // Create foods
        const product1 = await prisma.product.create({
            data: {
                name: 'Carrot',
                categoryId: category1.id,
            },
        });

        const productd2 = await prisma.product.create({
            data: {
                name: 'Apple',
                categoryId: category2.id,
            },
        });

        const user1 = await prisma.user.create({
            data: {
                username: 'user1',
                email: 'user1@example.com',
                password: 'password123',
            },
        });

        // Create days
        const day1 = await prisma.day.create({
            data: {
                userId: 1, // Replace with the actual user ID
                date: new Date(), // Assuming 'date' is another required field
            },
        });

        // Create meals with dayId correctly assigned
        const meal1 = await prisma.meal.create({
            data: {
                name: 'Breakfast',
                dayId: day1.id,
            },
        });

        const meal2 = await prisma.meal.create({
            data: {
                name: 'Lunch',
                dayId: day1.id,
            },
        });

        const meal3 = await prisma.meal.create({
            data: {
                name: 'Dinner',
                dayId: day1.id,
            },
        });

        // Create nutrition
        const nutrition1 = await prisma.nutrition.create({
            data: {
                calories: 100,
                protein: 5,
                carbohydrates: 20,
                fat: 2,
                productId: product1.id,
            },
        });

        const nutrition2 = await prisma.nutrition.create({
            data: {
                calories: 50,
                protein: 1,
                carbohydrates: 10,
                fat: 0.5,
                productId: productd2.id,
            },
        });

        // Create users


        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        // Disconnect PrismaClient after seeding
        await prisma.$disconnect();
    }
}

// Call the seeding function
seed();
