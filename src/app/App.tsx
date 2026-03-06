import { useState } from 'react';
import { Cookie, Scale, Beaker, ArrowLeft } from 'lucide-react';
import { RecipeIngredient, UnitType } from './types/cookie';
import { cookieTypes, CookieType } from './types/cookieTypes';
import { calculateCookieMetrics } from './utils/cookieCalculations';
import { CookieTypeSelector } from './components/CookieTypeSelector';
import { IngredientSelector } from './components/IngredientSelector';
import { MetricsDisplay } from './components/MetricsDisplay';
import { NutritionFacts } from './components/NutritionFacts';
import { ingredientsDatabase } from './data/ingredients';

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
  const [servingSize, setServingSize] = useState(30); // grams per cookie
  const [showNutrition, setShowNutrition] = useState(false);

  const handleSelectCookieType = (cookieType: CookieType) => {
    setSelectedCookieType(cookieType);
    // Add unique IDs and default display units to each ingredient
    const defaultUnit = UNIT_OPTIONS[measurementMode][0];
    const ingredientsWithIds = cookieType.baseFormula.map((ing, index) => {
      const ingredientData = ingredientsDatabase.find(i => i.id === ing.ingredientId);
      const isEgg = ingredientData?.category === 'egg';
      
      return {
        ...ing,
        id: `${Date.now()}-${index}`,
        displayUnit: defaultUnit,
        // Set default egg size to medium if it's an egg
        eggSize: isEgg ? ('medium' as const) : undefined,
      };
    });
    setIngredients(ingredientsWithIds);
    setShowNutrition(false);
  };

  const handleBackToSelection = () => {
    setSelectedCookieType(null);
    setIngredients([]);
    setShowNutrition(false);
  };

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode);
    // Update all ingredients to use the default unit for the new mode
    const defaultUnit = UNIT_OPTIONS[mode][0];
    setIngredients(ingredients.map(ing => ({
      ...ing,
      displayUnit: defaultUnit
    })));
  };

  // Show cookie type selector if no type is selected
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Cookie Science Calculator</h1>
                <p className="text-amber-100 text-sm">
                  {selectedCookieType.name} - {selectedCookieType.texture}
                </p>
              </div>
            </div>
            <button
              onClick={handleBackToSelection}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Change Type</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cookie Type Info Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border-2 border-amber-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-1">{selectedCookieType.name}</h3>
              <p className="text-sm text-amber-800 mb-2">{selectedCookieType.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedCookieType.keyTraits.map((trait, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white/60 px-2 py-1 rounded-full text-amber-900 font-medium"
                  >
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

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleMeasurementModeChange('metric')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                measurementMode === 'metric'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Metric (g)
            </button>
            <button
              onClick={() => handleMeasurementModeChange('imperial')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                measurementMode === 'imperial'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Imperial (oz)
            </button>
            <button
              onClick={() => handleMeasurementModeChange('volumetric')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                measurementMode === 'volumetric'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Volumetric (cups)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 font-medium">
              Serving Size:
            </label>
            <input
              type="number"
              value={servingSize}
              onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 30))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-right"
              min="1"
            />
            <span className="text-sm text-gray-600">g</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-xl shadow-lg border border-amber-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-amber-600" />
                Recipe Ingredients
              </h2>
              <IngredientSelector
                ingredients={ingredients}
                onIngredientsChange={setIngredients}
                measurementMode={measurementMode}
              />
            </div>

            {ingredients.length > 0 && (
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-blue-600" />
                  Cookie Science Metrics
                </h2>
                <MetricsDisplay metrics={metrics} measurementMode={measurementMode} />
              </div>
            )}
          </div>

          {/* Right Column - Info & Nutrition */}
          <div className="space-y-6">
            {/* Quick Stats */}
            {ingredients.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg border border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ingredients:</span>
                    <span className="font-semibold text-gray-900">
                      {ingredients.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servings:</span>
                    <span className="font-semibold text-gray-900">
                      {servingsPerRecipe} cookies
                    </span>
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

            {/* Info Panel */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">About Cookie Metrics</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <div className="font-semibold text-amber-700">Water Activity (aw)</div>
                  <p className="text-gray-600">
                    Measures moisture availability. Range: 0.30 (crisp) to 0.75 (soft).
                    Lower values = longer shelf life.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-blue-700">Texture Force (N)</div>
                  <p className="text-gray-600">
                    Hardness measured in Newtons. Lower = soft/chewy, Higher = crisp/hard biscuit.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-purple-700">Spread Ratio</div>
                  <p className="text-gray-600">
                    Diameter ÷ height. Higher ratios = flatter, wider cookies.
                    Typical range: 5-8.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-pink-700">Sugar Content</div>
                  <p className="text-gray-600">
                    Total sugar in recipe (from all sources). Most cookies are 15-35% sugar.
                    Higher percentages create sweeter, chewier cookies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Label Section */}
      {ingredients.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
              <Beaker className="w-6 h-6 text-blue-600" />
              FDA Nutrition Facts Label
            </h2>
            <div className="flex justify-center">
              <NutritionFacts
                metrics={metrics}
                servingSize={servingSize}
                servingsPerRecipe={servingsPerRecipe}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-sm text-gray-600">
          <p>
            Professional cookie formulation tool based on food science principles.
          </p>
          <p className="mt-1">
            Nutrition values are estimates. Actual values may vary based on specific ingredients.
          </p>
        </div>
      </footer>
    </div>
  );
}