import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { RecipeIngredient, UnitType } from './types/cookie';
import { cookieTypes, CookieType } from './types/cookieTypes';
import { calculateCookieMetrics } from './utils/cookieCalculations';
import { CookieTypeSelector } from './components/CookieTypeSelector';
import { IngredientSelector } from './components/IngredientSelector';
import { MetricsDisplay } from './components/MetricsDisplay';
import { NutritionFacts } from './components/NutritionFacts';
import { BakingInstructions } from './components/BakingInstructions';
import { ingredientsDatabase } from './data/ingredients';
import { recipePresets, getRecipesForCookieType } from './data/recipePresets';

type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

const UNIT_OPTIONS: Record<MeasurementMode, UnitType[]> = {
  metric: ['g', 'kg', 'mg'],
  imperial: ['oz', 'lb'],
  volumetric: ['cups', 'tbsp', 'tsp', 'ml', 'fl oz'],
};

export default function App() {
  const [selectedCookieType, setSelectedCookieType] = useState<CookieType | null>(null);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('metric');
  const [servingSize, setServingSize] = useState(30);
  const [selectedRecipeName, setSelectedRecipeName] = useState<string | null>(null);

  const handleSelectCookieType = (cookieType: CookieType) => {
    setSelectedCookieType(cookieType);
    setSelectedRecipeName(null);
    const defaultUnit = UNIT_OPTIONS[measurementMode][0];
    const ingredientsWithIds = cookieType.baseFormula.map((ing, index) => {
      const ingredientData = ingredientsDatabase.find(i => i.id === ing.ingredientId);
      const isEgg = ingredientData?.category === 'egg';
      return {
        ...ing,
        id: `${Date.now()}-${index}`,
        displayUnit: defaultUnit,
        eggSize: isEgg ? ('medium' as const) : undefined,
      };
    });
    setIngredients(ingredientsWithIds);
  };

  const handleBackToSelection = () => {
    setSelectedCookieType(null);
    setIngredients([]);
    setSelectedRecipeName(null);
  };

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode);
    const defaultUnit = UNIT_OPTIONS[mode][0];
    setIngredients(ingredients.map(ing => ({ ...ing, displayUnit: defaultUnit })));
  };

  const handleLoadRecipe = (recipeId: string) => {
    if (recipeId === '') return;
    const recipe = recipePresets.find(r => r.id === recipeId);
    if (!recipe) return;
    setSelectedRecipeName(recipe.name);
    const defaultUnit = UNIT_OPTIONS[measurementMode][0];
    const ingredientsWithIds = recipe.ingredients.map((ing, index) => {
      const ingredientData = ingredientsDatabase.find(i => i.id === ing.ingredientId);
      const isEgg = ingredientData?.category === 'egg';
      return {
        ...ing,
        id: `${Date.now()}-${index}`,
        displayUnit: defaultUnit,
        eggSize: ing.eggSize || (isEgg ? ('medium' as const) : undefined),
      };
    });
    setIngredients(ingredientsWithIds);
  };

  if (!selectedCookieType) {
    return (
      <CookieTypeSelector
        cookieTypes={cookieTypes}
        onSelectType={handleSelectCookieType}
      />
    );
  }

  const metrics = calculateCookieMetrics(ingredients);
  const servingsPerRecipe = metrics.totalWeight > 0 ? Math.floor(metrics.totalWeight / servingSize) : 0;
  const availableRecipes = getRecipesForCookieType(selectedCookieType.id);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>

      {/* Header */}
      <header className="text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c, #e67e22)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button onClick={handleBackToSelection} className="text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-2xl">🍪</span>
              <div>
                <h1 className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedCookieType.name}
                </h1>
                <p className="text-red-100 text-xs">
                  {selectedCookieType.texture} · {selectedRecipeName ?? selectedCookieType.examples[0]}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-white/20 rounded-lg p-0.5">
                {(['metric', 'imperial', 'volumetric'] as MeasurementMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleMeasurementModeChange(m)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${measurementMode === m ? 'bg-white text-red-600' : 'text-white hover:bg-white/20'}`}
                  >
                    {m === 'metric' ? 'g' : m === 'imperial' ? 'oz' : 'cups'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
                <span className="text-xs text-white/80">Per cookie:</span>
                <input
                  type="number"
                  value={servingSize}
                  min={1}
                  onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 30))}
                  className="w-12 bg-white/20 rounded text-white text-xs text-center outline-none"
                />
                <span className="text-xs text-white/80">g</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cookie type info banner */}
      <div className="container mx-auto px-4 pt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-1">{selectedCookieType.name}</h3>
              <p className="text-sm text-amber-800 mb-2">{selectedCookieType.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedCookieType.keyTraits.map((trait, index) => (
                  <span key={index} className="text-xs bg-white/60 px-2 py-1 rounded-full text-amber-900 font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-l border-amber-300 pl-4">
              <div className="text-xs text-amber-800 font-semibold mb-1">Ratio:</div>
              <div className="text-sm text-amber-900 font-mono">{selectedCookieType.ratioDescription}</div>
              <div className="text-xs text-amber-700 mt-2">
                Examples: {selectedCookieType.examples.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Ingredients + Metrics */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">🍪 Cookie Ingredients</h2>
              </div>

              {availableRecipes.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">📖 Load a Recipe</div>
                  <select
                    value={selectedRecipeName ?? ''}
                    onChange={(e) => handleLoadRecipe(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="">— Select a recipe —</option>
                    {availableRecipes.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.servings})</option>
                    ))}
                  </select>
                </div>
              )}

              <IngredientSelector
                ingredients={ingredients}
                onIngredientsChange={setIngredients}
                measurementMode={measurementMode}
              />
            </div>

            {ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">🔬 Cookie Science Metrics</h2>
                <MetricsDisplay metrics={metrics} measurementMode={measurementMode} />
              </div>
            )}
          </div>

          {/* RIGHT — Stats + Info + Nutrition */}
          <div className="space-y-6">
            {ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-3">📊 Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ingredients:</span>
                    <span className="font-semibold text-gray-900">{ingredients.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Weight:</span>
                    <span className="font-semibold text-gray-900">{Math.round(metrics.totalWeight)}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servings:</span>
                    <span className="font-semibold text-gray-900">{servingsPerRecipe} cookies</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Cookie:</span>
                    <span className="font-semibold text-gray-900">
                      {((metrics.calories * servingSize) / 100).toFixed(0)} cal
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="font-bold text-gray-900 mb-3">💡 About Cookie Metrics</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-red-700">Water Activity (aw)</div>
                  <p className="text-gray-600">Measures moisture availability. Range: 0.30 (crisp) to 0.75 (soft). Lower values = longer shelf life.</p>
                </div>
                <div>
                  <div className="font-semibold text-red-700">Texture Force (N)</div>
                  <p className="text-gray-600">Hardness in Newtons. Lower = soft/chewy, Higher = crisp/hard.</p>
                </div>
                <div>
                  <div className="font-semibold text-red-700">Spread Ratio</div>
                  <p className="text-gray-600">Diameter ÷ height. Higher = flatter, wider cookies. Typical: 5–8.</p>
                </div>
                <div>
                  <div className="font-semibold text-red-700">Sugar Content</div>
                  <p className="text-gray-600">Total sugar from all sources. Most cookies are 15–35% sugar.</p>
                </div>
              </div>
            </div>

            {ingredients.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-4">📋 FDA Nutrition Facts</h3>
                <NutritionFacts
                  metrics={metrics}
                  servingSize={servingSize}
                  servingsPerRecipe={servingsPerRecipe}
                />
              </div>
            )}
          </div>
        </div>

        {/* Baking Instructions — full width */}
        {ingredients.length > 0 && (
          <div className="max-w-6xl mx-auto mt-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <BakingInstructions
                cookieType={selectedCookieType.id}
                totalWeight={metrics.totalWeight}
                cookieCount={servingsPerRecipe}
                measurementMode={measurementMode}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="container mx-auto px-4 py-8 mt-4">
        <div className="text-center text-sm text-gray-500">
          <p>Professional cookie formulation tool based on food science principles.</p>
          <p className="mt-1">Nutrition values are estimates. Actual values may vary.</p>
        </div>
      </footer>
    </div>
  );
}
