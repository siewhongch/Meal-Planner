export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type DietaryRestriction = 
  | 'None'
  | 'Vegetarian'
  | 'High-Protein'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Low-Carb / Keto'
  | 'Halal Friendly';

export type CuisineType = 
  | 'All Cuisines'
  | 'Asian & Stir-Fry'
  | 'Mediterranean'
  | 'Italian'
  | 'Quick 20-Min'
  | 'Comfort Classics';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string; // 'g', 'ml', 'pcs', 'tbsp', 'cloves', 'bunch', 'cans'
  department: 'Produce' | 'Meat & Seafood' | 'Dairy & Eggs' | 'Pantry & Spices' | 'Bakery & Grains';
  estimatedCost: number; // in USD / SGD
  inPantry?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  cuisine: string;
  calories: number;
  macros: {
    protein: number; // g
    carbs: number;   // g
    fat: number;     // g
  };
  allergens: string[];
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  fussFreeScore: number; // 1-5 rating on simplicity
}

export interface ScheduledMeal {
  id: string;
  day: DayOfWeek;
  mealType: 'Dinner' | 'Lunch' | 'Breakfast';
  recipe: Recipe;
}

export interface UserProfile {
  pax: number;
  daysToCook: number;
  weeklyBudget: number; // in USD/SGD
  dietaryRestrictions: DietaryRestriction[];
  preferredCuisines: CuisineType[];
  defaultGrocer: 'RedMart' | 'FairPrice' | 'Amazon Fresh' | 'GrabMart' | 'FoodPanda';
  deliveryMode: 'Scheduled' | 'Instant';
}

export interface GrocerPartner {
  id: string;
  name: string;
  type: 'Scheduled' | 'Instant';
  deliveryEstimate: string;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  badgeText: string;
  logoColor: string;
  affiliatePerk: string;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'Produce' | 'Dairy' | 'Pantry' | 'Condiments';
  daysUntilExpiry: number;
}
