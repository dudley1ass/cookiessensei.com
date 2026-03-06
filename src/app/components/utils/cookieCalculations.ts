import { Ingredient, RecipeIngredient, CookieMetrics } from '../types/cookie';
import { ingredientsDatabase } from '../data/ingredients';

export function calculateCookieMetrics(
  recipeIngredients: RecipeIngredient[]
): CookieMetrics {
  let totalWeight = 0;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalSaturatedFat = 0;
  let totalTransFat = 0;
  let totalCholesterol = 0;
  let totalCarbs = 0;
  let totalFiber = 0;
  let totalSugar = 0;
  let totalAddedSugar = 0;
  let totalSodium = 0;
  let totalPotassium = 0;
  let totalCalcium = 0;
  let totalIron = 0;
  let totalVitaminA = 0;
  let totalVitaminC = 0;
  let totalWater = 0;
  let totalFatWeight = 0;
  let totalSugarWeight = 0;
  let totalFlourWeight = 0;
  let weightedWaterActivity = 0;
  let weightedSucroseEquivalence = 0;
  let sugarWeightForSE = 0;
  let totalActualSugar = 0; // Track actual sugar weight in grams

  recipeIngredients.forEach((recipeIng) => {
    const ingredient = ingredientsDatabase.find(
      (ing) => ing.id === recipeIng.ingredientId
    );
    if (!ingredient) return;

    const weight = recipeIng.amount;
    totalWeight += weight;

    // Nutrition per 100g * (weight/100)
    const factor = weight / 100;
    totalCalories += ingredient.calories * factor;
    totalProtein += ingredient.protein * factor;
    totalFat += ingredient.fat * factor;
    totalSaturatedFat += (ingredient.saturatedFat || 0) * factor;
    totalTransFat += (ingredient.transFat || 0) * factor;
    totalCholesterol += (ingredient.cholesterol || 0) * factor;
    totalCarbs += ingredient.carbs * factor;
    totalFiber += ingredient.fiber * factor;
    totalSugar += ingredient.sugar * factor;
    totalAddedSugar += (ingredient.addedSugar || 0) * factor;
    totalSodium += ingredient.sodium * factor;
    totalPotassium += (ingredient.potassium || 0) * factor;
    totalCalcium += (ingredient.calcium || 0) * factor;
    totalIron += (ingredient.iron || 0) * factor;
    totalVitaminA += (ingredient.vitaminA || 0) * factor;
    totalVitaminC += (ingredient.vitaminC || 0) * factor;

    // Calculate actual sugar content from nutritional data
    const actualSugar = (weight * ingredient.sugar) / 100;
    totalActualSugar += actualSugar;

    // Water content
    if (ingredient.waterContent) {
      totalWater += (weight * ingredient.waterContent) / 100;
    }

    // Component tracking
    if (ingredient.category === 'fat' && ingredient.fatContent) {
      totalFatWeight += (weight * ingredient.fatContent) / 100;
    } else if (ingredient.fat > 0) {
      totalFatWeight += (weight * ingredient.fat) / 100;
    }

    if (ingredient.category === 'sugar' || ingredient.sugar > 50) {
      totalSugarWeight += weight;
    }

    if (ingredient.category === 'flour') {
      totalFlourWeight += weight;
    }

    // Water activity weighted average
    if (ingredient.waterActivity !== undefined) {
      weightedWaterActivity += ingredient.waterActivity * weight;
    }

    // Sucrose equivalence weighted by sugar content
    if (ingredient.sucroseEquivalence !== undefined && ingredient.sugar > 0) {
      const sugarWeight = (weight * ingredient.sugar) / 100;
      weightedSucroseEquivalence += ingredient.sucroseEquivalence * sugarWeight;
      sugarWeightForSE += sugarWeight;
    }
  });

  // Calculate averages and percentages
  const waterActivity =
    totalWeight > 0 ? weightedWaterActivity / totalWeight : 0.5;
  const sucroseEquivalence =
    sugarWeightForSE > 0 ? weightedSucroseEquivalence / sugarWeightForSE : 1.0;

  const fatPercent = totalWeight > 0 ? (totalFatWeight / totalWeight) * 100 : 0;
  const sugarPercent =
    totalWeight > 0 ? (totalSugarWeight / totalWeight) * 100 : 0;
  const flourPercent =
    totalWeight > 0 ? (totalFlourWeight / totalWeight) * 100 : 0;
  const waterPercent =
    totalWeight > 0 ? (totalWater / totalWeight) * 100 : 0;
  
  // Calculate sugar content percentage (actual sugar from nutritional data)
  const sugarContentPercent = totalWeight > 0 ? (totalActualSugar / totalWeight) * 100 : 0;

  // Estimate texture force based on water activity and fat content
  // Lower aw = harder cookies (higher force)
  // Higher fat = softer cookies (lower force)
  const baseForce = 150; // Newtons
  const awFactor = Math.max(0.3, 1.5 - waterActivity * 1.5); // Higher at low aw
  const fatFactor = Math.max(0.5, 1 - fatPercent / 100); // Lower with high fat
  const textureForce = baseForce * awFactor * fatFactor;

  // Estimate spread ratio
  // Higher fat and sugar = more spread
  // Higher flour and eggs = less spread
  const baseSpread = 5.5;
  const fatSpreadFactor = 1 + fatPercent / 100;
  const sugarSpreadFactor = 1 + sugarPercent / 200;
  const flourSpreadFactor = Math.max(0.7, 1.5 - flourPercent / 100);
  const spreadRatio =
    baseSpread * fatSpreadFactor * sugarSpreadFactor * flourSpreadFactor;

  // Per 100g nutrition
  const per100gFactor = totalWeight > 0 ? 100 / totalWeight : 0;
  
  const calculatedCarbs = totalCarbs * per100gFactor;
  const calculatedFiber = totalFiber * per100gFactor;

  return {
    waterActivity: Math.min(0.75, Math.max(0.3, waterActivity)),
    textureForce: Math.max(10, Math.min(300, textureForce)),
    spreadRatio: Math.max(3, Math.min(10, spreadRatio)),
    sucroseEquivalence: Math.max(0.4, Math.min(1.6, sucroseEquivalence)),
    totalWeight,
    fatPercent: Math.min(100, fatPercent),
    sugarPercent: Math.min(100, sugarPercent),
    flourPercent: Math.min(100, flourPercent),
    waterPercent: Math.min(100, waterPercent),
    calories: totalCalories * per100gFactor,
    protein: totalProtein * per100gFactor,
    fat: totalFat * per100gFactor,
    saturatedFat: totalSaturatedFat * per100gFactor,
    transFat: totalTransFat * per100gFactor,
    cholesterol: totalCholesterol * per100gFactor,
    carbs: calculatedCarbs,
    fiber: calculatedFiber,
    sugar: totalSugar * per100gFactor,
    addedSugar: totalAddedSugar * per100gFactor,
    sodium: totalSodium * per100gFactor,
    potassium: totalPotassium * per100gFactor,
    calcium: totalCalcium * per100gFactor,
    iron: totalIron * per100gFactor,
    vitaminA: totalVitaminA * per100gFactor,
    vitaminC: totalVitaminC * per100gFactor,
    sugarContentPercent: Math.min(100, sugarContentPercent),
    totalActualSugar,
    netCarbs: Math.max(0, calculatedCarbs - calculatedFiber),
    moisturePercent: Math.min(100, waterPercent),
  };
}

export function getTextureDescription(force: number): string {
  if (force < 50) return 'Very Soft';
  if (force < 100) return 'Soft & Chewy';
  if (force < 150) return 'Medium Chewy';
  if (force < 200) return 'Firm';
  if (force < 250) return 'Crisp';
  return 'Hard Biscuit';
}

export function getWaterActivityDescription(aw: number): string {
  if (aw < 0.35) return 'Very Crisp';
  if (aw < 0.45) return 'Crisp';
  if (aw < 0.55) return 'Moderately Crisp';
  if (aw < 0.65) return 'Soft';
  return 'Very Soft';
}
