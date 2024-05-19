interface Weight {
    id: number;
    weight: number;
    mealId: number;
    productId: number;
    product: {
        id: number;
        name: string;
        nutritionId: number;
        nutrition: {
            id: number;
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
            sugar: number;
        };
    };
}
export function calculateTotalNutrition(weights: Weight[]) {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalSugar = 0;

    for (const weightObj of weights) {
        const weight = weightObj.weight;
        const nutrition = weightObj.product.nutrition;
        const scaledCalories = (nutrition.calories * weight) / 100;
        const scaledProtein = (nutrition.protein * weight) / 100;
        const scaledCarbs = (nutrition.carbs * weight) / 100;
        const scaledFat = (nutrition.fat * weight) / 100;
        const scaledSugar = (nutrition.sugar * weight) / 100;

        totalCalories += scaledCalories;
        totalProtein += scaledProtein;
        totalCarbs += scaledCarbs;
        totalFat += scaledFat;
        totalSugar += scaledSugar;
    }

    return {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalSugar
    };
}

export const weights = [
    {
        "id": 6,
        "weight": 300,
        "mealId": 4,
        "productId": 3,
        "product": {
            "id": 3,
            "name": "Carrot",
            "nutritionId": 3,
            "nutrition": {
                "id": 3,
                "calories": 25,
                "protein": 0.6,
                "carbs": 5.8,
                "fat": 0.1,
                "sugar": 0.2
            }
        }
    },
    {
        "id": 7,
        "weight": 170,
        "mealId": 4,
        "productId": 6,
        "product": {
            "id": 6,
            "name": "Melon",
            "nutritionId": 6,
            "nutrition": {
                "id": 6,
                "calories": 52,
                "protein": 0.3,
                "carbs": 14,
                "fat": 0.2,
                "sugar": 10.4
            }
        }
    }
];

// const totalNutrition = calculateTotalNutrition(weights);
// console.log(totalNutrition);