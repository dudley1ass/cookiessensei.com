export interface Ingredient {
  id: string;
  name: string;
  category: 'flour' | 'sugar' | 'fat' | 'egg' | 'leavener' | 'liquid' | 'chocolate' | 'nut' | 'fruit' | 'candy' | 'spice' | 'other';
  // Nutritional data per 100g
  calories: number;
  protein: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number; // mg
  carbs: number;
  fiber: number;
  sugar: number;
  addedSugar?: number; // Added sugars vs natural sugars
  sodium: number;
  potassium?: number; // mg
  calcium?: number; // mg
  iron?: number; // mg
  vitaminA?: number; // IU
  vitaminC?: number; // mg
  // Cookie science properties
  waterActivity?: number; // aw value
  waterContent?: number; // % water
  sucroseEquivalence?: number; // relative sweetness (sucrose = 1.0)
  fatContent?: number; // % fat
  proteinContent?: number; // % protein
  density?: number; // g/ml for volumetric conversions
}

export type UnitType = 'g' | 'kg' | 'mg' | 'oz' | 'lb' | 'cups' | 'tbsp' | 'tsp' | 'ml' | 'fl oz';

export type EggSize = 'small' | 'medium' | 'large';

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  amount: number; // in grams
  customName?: string; // For custom ingredients not in database
  displayUnit?: UnitType; // User's preferred display unit for this ingredient
  eggSize?: EggSize; // For egg ingredients only
  eggQuantity?: number; // Number of eggs (for egg ingredients only)
}

export interface CookieMetrics {
  waterActivity: number; // 0.30-0.75
  textureForce: number; // Newtons
  spreadRatio: number; // diameter/height
  sucroseEquivalence: number;
  totalWeight: number;
  // Component percentages
  fatPercent: number;
  sugarPercent: number;
  flourPercent: number;
  waterPercent: number;
  // Nutrition per 100g
  calories: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number; // mg
  carbs: number;
  fiber: number;
  sugar: number;
  addedSugar: number;
  sodium: number;
  potassium: number; // mg
  calcium: number; // mg
  iron: number; // mg
  vitaminA: number; // IU
  vitaminC: number; // mg
  // Sugar content metrics
  sugarContentPercent: number; // Actual sugar as % of total weight
  totalActualSugar: number; // Total sugar in grams
  // Additional metrics
  netCarbs: number; // carbs - fiber
  moisturePercent: number; // water content %
}
