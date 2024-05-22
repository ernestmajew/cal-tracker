export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  meals: Meal[];
}

export interface Nutrition {
  id: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  sugar?: number;
  Product: Product[];
}

export interface Product {
  id: number;
  name: string;
  nutritionId: number;
  nutrition: Nutrition;
  ProductWeight: ProductWeight[];
}

export interface Meal {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  products: ProductWeight[];
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
  totalSugar?: number;
  userId?: number;
  user?: User;
}

export interface ProductWeight {
  id: number;
  weight: number;
  mealId: number;
  meal: Meal;
  productId: number;
  product: Product;
}
