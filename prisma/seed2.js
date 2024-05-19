const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const csv = require('csv-parser');

async function seedData() {
    const productsData = [];

    try {
        await prisma.productWeight.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.nutrition.deleteMany({});
    } catch (error){
        console.error('Error seeding database:', error);
        process.exit(1);
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream('nutrition.csv')
            .pipe(csv())
            .on('data', (row) => {
                const nutritionData = {
                    calories: parseFloat(row.calories) || 0,
                    protein: parseFloat(row.protein) || 0,
                    carbs: parseFloat(row.carbohydrate) || 0,
                    fat: parseFloat(row.total_fat) || 0,
                    sugar: parseFloat(row.sugar) || 0,
                };

                productsData.push({
                    id: parseInt(row.id, 10),
                    name: row.name,
                    nutrition: nutritionData,
                });
            })
            .on('end', async () => {
                try {
                    for (const product of productsData) {
                        const product1 = await prisma.product.create({
                            data: {
                                name: product.name,
                                nutrition: {
                                    create: {
                                        calories: product.nutrition.calories,
                                        protein: product.nutrition.protein,
                                        carbs: product.nutrition.carbs,
                                        fat: product.nutrition.fat,
                                        sugar: product.nutrition.sugar,
                                    },
                                },
                            },
                        });
                    }
                    resolve();
                } catch (error) {
                    console.error('Error seeding products and nutrition:', error);
                    reject(error);
                }
            })
            .on('error', reject);
    });
}

async function main() {
    try {
        await seedData();
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
