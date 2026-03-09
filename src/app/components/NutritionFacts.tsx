import { CookieMetrics } from '../types/cookie';

interface NutritionFactsProps {
  metrics: CookieMetrics;
  servingSize: number; // in grams
  servingsPerRecipe: number;
}

export function NutritionFacts({
  metrics,
  servingSize,
  servingsPerRecipe,
}: NutritionFactsProps) {
  // Calculate per serving with safeguards
  const factor = servingSize / 100;
  const calories = (metrics.calories || 0) * factor;
  const fat = (metrics.fat || 0) * factor;
  const saturatedFat = (metrics.saturatedFat || 0) * factor;
  const transFat = (metrics.transFat || 0) * factor;
  const cholesterol = (metrics.cholesterol || 0) * factor;
  const carbs = (metrics.carbs || 0) * factor;
  const protein = (metrics.protein || 0) * factor;
  const fiber = (metrics.fiber || 0) * factor;
  const sugar = (metrics.sugar || 0) * factor;
  const addedSugar = (metrics.addedSugar || 0) * factor;
  const sodium = (metrics.sodium || 0) * factor;
  const potassium = (metrics.potassium || 0) * factor;
  const calcium = (metrics.calcium || 0) * factor;
  const iron = (metrics.iron || 0) * factor;
  const vitaminA = (metrics.vitaminA || 0) * factor;
  const vitaminC = (metrics.vitaminC || 0) * factor;

  // Daily Values (based on 2000 calorie diet)
  const fatDV = (fat / 78) * 100;
  const saturatedFatDV = (saturatedFat / 20) * 100;
  const cholesterolDV = (cholesterol / 300) * 100;
  const carbsDV = (carbs / 275) * 100;
  const fiberDV = (fiber / 28) * 100;
  const proteinDV = (protein / 50) * 100;
  const sodiumDV = (sodium / 2300) * 100;
  const potassiumDV = (potassium / 4700) * 100;
  const calciumDV = (calcium / 1300) * 100;
  const ironDV = (iron / 18) * 100;
  const vitaminADV = (vitaminA / 900) * 100;
  const vitaminCDV = (vitaminC / 90) * 100;

  return (
    <div className="bg-white border-2 border-black p-4 max-w-sm">
      <div className="border-b-8 border-black pb-1">
        <h2 className="text-3xl font-black">Nutrition Facts</h2>
      </div>
      
      <div className="border-b-4 border-black py-1 text-sm">
        <div>
          Servings per recipe: <span className="font-bold">{servingsPerRecipe}</span>
        </div>
        <div className="font-bold text-lg">
          Serving size: {servingSize}g ({(servingSize * 0.035274).toFixed(2)}oz)
        </div>
      </div>

      <div className="border-b-8 border-black py-2">
        <div className="flex justify-between items-end">
          <span className="font-bold text-lg">Calories</span>
          <span className="text-4xl font-black">{calories.toFixed(0)}</span>
        </div>
      </div>

      <div className="border-b-4 border-black py-1 text-right">
        <div className="text-sm font-bold">% Daily Value*</div>
      </div>

      <div className="space-y-1 text-sm">
        <NutritionRow
          label="Total Fat"
          amount={`${fat.toFixed(1)}g`}
          dv={fatDV}
        />
        <NutritionSubRow
          label="Saturated Fat"
          amount={`${saturatedFat.toFixed(1)}g`}
          dv={saturatedFatDV}
        />
        <NutritionSubRow
          label="Trans Fat"
          amount={`${transFat.toFixed(1)}g`}
        />
        <NutritionSubRow
          label="Unsaturated Fat"
          amount={`${Math.max(0, fat - saturatedFat - transFat).toFixed(1)}g`}
        />
        <NutritionSubRow
          label="Cholesterol"
          amount={`${cholesterol.toFixed(0)}mg`}
          dv={cholesterolDV}
        />
        <NutritionRow
          label="Total Carbohydrate"
          amount={`${carbs.toFixed(1)}g`}
          dv={carbsDV}
        />
        <NutritionSubRow
          label="Dietary Fiber"
          amount={`${fiber.toFixed(1)}g`}
          dv={fiberDV}
        />
        <NutritionSubRow
          label="Starches & Other Carbs"
          amount={`${(carbs - fiber - sugar).toFixed(1)}g`}
        />
        <NutritionSubRow
          label="Total Sugars"
          amount={`${sugar.toFixed(1)}g`}
        />
        <NutritionSubRow
          label="Added Sugars"
          amount={`${addedSugar.toFixed(1)}g`}
        />
        <NutritionRow
          label="Protein"
          amount={`${protein.toFixed(1)}g`}
          dv={proteinDV}
        />
        <NutritionRow
          label="Sodium"
          amount={`${sodium.toFixed(0)}mg`}
          dv={sodiumDV}
        />
        <NutritionRow
          label="Potassium"
          amount={`${potassium.toFixed(0)}mg`}
          dv={potassiumDV}
        />
        <NutritionRow
          label="Calcium"
          amount={`${calcium.toFixed(0)}mg`}
          dv={calciumDV}
        />
        <NutritionRow
          label="Iron"
          amount={`${iron.toFixed(1)}mg`}
          dv={ironDV}
        />
        <NutritionRow
          label="Vitamin A"
          amount={`${vitaminA.toFixed(0)}IU`}
          dv={vitaminADV}
        />
        <NutritionRow
          label="Vitamin C"
          amount={`${vitaminC.toFixed(0)}mg`}
          dv={vitaminCDV}
        />
      </div>

      <div className="border-t-8 border-black mt-2 pt-2">
        <div className="text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 border-t border-gray-300 pt-2">
        <div className="font-semibold mb-1">Cookie Science Metrics:</div>
        <div>Water Activity (aw): {metrics.waterActivity?.toFixed(3) || 'N/A'}</div>
        <div>Spread Ratio: {metrics.spreadRatio?.toFixed(2) || 'N/A'}</div>
        <div>Texture Force: {metrics.textureForce?.toFixed(0) || 'N/A'}N</div>
        <div>Moisture Content: {metrics.moisturePercent?.toFixed(1) || '0.0'}%</div>
        <div>Net Carbs: {metrics.netCarbs?.toFixed(1) || '0.0'}g/100g (Total Carbs - Fiber)</div>
        <div className="mt-2 pt-2 border-t border-gray-300">
          <div className="font-semibold mb-1">Per 100g Carbohydrate Breakdown:</div>
          <div>Total Carbs: {metrics.carbs?.toFixed(1) || '0.0'}g</div>
          <div className="pl-3">- Fiber: {metrics.fiber?.toFixed(1) || '0.0'}g</div>
          <div className="pl-3">- Sugars: {metrics.sugar?.toFixed(1) || '0.0'}g</div>
          <div className="pl-3">- Starch: {((metrics.carbs || 0) - (metrics.fiber || 0) - (metrics.sugar || 0)).toFixed(1)}g</div>
          <div className="mt-1 text-xs italic text-gray-500">
            ✓ Total Carbs = Fiber + Sugars + Starch
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionRow({
  label,
  amount,
  dv,
}: {
  label: string;
  amount: string;
  dv?: number;
}) {
  return (
    <div className="flex justify-between border-b border-gray-400 py-1 font-bold">
      <span>{label} {amount}</span>
      {dv !== undefined && <span>{dv.toFixed(0)}%</span>}
    </div>
  );
}

function NutritionSubRow({
  label,
  amount,
  dv,
}: {
  label: string;
  amount: string;
  dv?: number;
}) {
  return (
    <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
      <span>{label} {amount}</span>
      {dv !== undefined && <span className="font-bold">{dv.toFixed(0)}%</span>}
    </div>
  );
}