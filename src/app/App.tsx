import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
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
type ActiveTab = 'science' | 'nutrition' | 'baking';

const UNIT_OPTIONS: Record<MeasurementMode, UnitType[]> = {
  metric: ['g', 'kg', 'mg'],
  imperial: ['oz', 'lb'],
  volumetric: ['cups', 'tbsp', 'tsp', 'ml', 'fl oz'],
};

// ── Toppings database ─────────────────────────────────────────
interface Topping {
  id: string;
  name: string;
  emoji: string;
  category: string;
  caloriesPer100g: number;
  fatPer100g: number;
  sugarPer100g: number;
  carbsPer100g: number;
  proteinPer100g: number;
  defaultAmountG: number; // typical amount per batch
}

const TOPPINGS: Topping[] = [
  // Chocolate
  { id: 'hershey-kisses', name: "Hershey's Kisses (large)", emoji: '🍫', category: 'Chocolate', caloriesPer100g: 535, fatPer100g: 30, sugarPer100g: 57, carbsPer100g: 62, proteinPer100g: 7, defaultAmountG: 150 },
  { id: 'reeses-cups-mini', name: "Reese's Mini Cups", emoji: '🥜', category: 'Chocolate', caloriesPer100g: 510, fatPer100g: 30, sugarPer100g: 48, carbsPer100g: 57, proteinPer100g: 10, defaultAmountG: 100 },
  { id: 'choc-chips', name: 'Chocolate Chips', emoji: '🍫', category: 'Chocolate', caloriesPer100g: 490, fatPer100g: 27, sugarPer100g: 55, carbsPer100g: 64, proteinPer100g: 5, defaultAmountG: 85 },
  { id: 'white-choc-chips', name: 'White Chocolate Chips', emoji: '⬜', category: 'Chocolate', caloriesPer100g: 533, fatPer100g: 30, sugarPer100g: 59, carbsPer100g: 63, proteinPer100g: 6, defaultAmountG: 85 },
  { id: 'mini-choc-chips', name: 'Mini Chocolate Chips', emoji: '🍫', category: 'Chocolate', caloriesPer100g: 490, fatPer100g: 27, sugarPer100g: 55, carbsPer100g: 64, proteinPer100g: 5, defaultAmountG: 60 },
  { id: 'm-and-ms', name: 'M&Ms', emoji: '🌈', category: 'Chocolate', caloriesPer100g: 480, fatPer100g: 18, sugarPer100g: 67, carbsPer100g: 73, proteinPer100g: 4, defaultAmountG: 85 },
  // Icing & Frosting
  { id: 'royal-icing', name: 'Royal Icing', emoji: '🎨', category: 'Icing', caloriesPer100g: 390, fatPer100g: 0, sugarPer100g: 95, carbsPer100g: 97, proteinPer100g: 1, defaultAmountG: 60 },
  { id: 'buttercream', name: 'Buttercream Frosting', emoji: '🧁', category: 'Icing', caloriesPer100g: 420, fatPer100g: 20, sugarPer100g: 60, carbsPer100g: 62, proteinPer100g: 0, defaultAmountG: 60 },
  { id: 'cream-cheese-frosting', name: 'Cream Cheese Frosting', emoji: '🧁', category: 'Icing', caloriesPer100g: 380, fatPer100g: 18, sugarPer100g: 52, carbsPer100g: 54, proteinPer100g: 2, defaultAmountG: 60 },
  { id: 'chocolate-ganache', name: 'Chocolate Ganache Drizzle', emoji: '🍫', category: 'Icing', caloriesPer100g: 430, fatPer100g: 30, sugarPer100g: 40, carbsPer100g: 48, proteinPer100g: 4, defaultAmountG: 40 },
  // Sprinkles & Decorations
  { id: 'rainbow-sprinkles', name: 'Rainbow Sprinkles', emoji: '🌈', category: 'Sprinkles', caloriesPer100g: 380, fatPer100g: 3, sugarPer100g: 80, carbsPer100g: 92, proteinPer100g: 0, defaultAmountG: 15 },
  { id: 'nonpareils', name: 'Nonpareils', emoji: '✨', category: 'Sprinkles', caloriesPer100g: 380, fatPer100g: 3, sugarPer100g: 80, carbsPer100g: 92, proteinPer100g: 0, defaultAmountG: 10 },
  { id: 'sanding-sugar', name: 'Sanding Sugar', emoji: '✨', category: 'Sprinkles', caloriesPer100g: 400, fatPer100g: 0, sugarPer100g: 100, carbsPer100g: 100, proteinPer100g: 0, defaultAmountG: 15 },
  { id: 'pearl-sugar', name: 'Pearl Sugar', emoji: '⚪', category: 'Sprinkles', caloriesPer100g: 400, fatPer100g: 0, sugarPer100g: 100, carbsPer100g: 100, proteinPer100g: 0, defaultAmountG: 15 },
  { id: 'flaky-salt', name: 'Flaky Sea Salt', emoji: '🧂', category: 'Sprinkles', caloriesPer100g: 0, fatPer100g: 0, sugarPer100g: 0, carbsPer100g: 0, proteinPer100g: 0, defaultAmountG: 3 },
  // Nuts & Extras
  { id: 'chopped-walnuts', name: 'Chopped Walnuts', emoji: '🥜', category: 'Nuts', caloriesPer100g: 654, fatPer100g: 65, sugarPer100g: 3, carbsPer100g: 14, proteinPer100g: 15, defaultAmountG: 50 },
  { id: 'sliced-almonds', name: 'Sliced Almonds', emoji: '🥜', category: 'Nuts', caloriesPer100g: 579, fatPer100g: 50, sugarPer100g: 5, carbsPer100g: 22, proteinPer100g: 21, defaultAmountG: 30 },
  { id: 'shredded-coconut', name: 'Shredded Coconut', emoji: '🥥', category: 'Nuts', caloriesPer100g: 354, fatPer100g: 33, sugarPer100g: 6, carbsPer100g: 15, proteinPer100g: 3, defaultAmountG: 40 },
  { id: 'caramel-drizzle', name: 'Caramel Drizzle', emoji: '🍯', category: 'Extras', caloriesPer100g: 380, fatPer100g: 4, sugarPer100g: 70, carbsPer100g: 76, proteinPer100g: 1, defaultAmountG: 30 },
  { id: 'powdered-sugar', name: 'Powdered Sugar Dusting', emoji: '⬜', category: 'Extras', caloriesPer100g: 389, fatPer100g: 0, sugarPer100g: 97, carbsPer100g: 100, proteinPer100g: 0, defaultAmountG: 10 },
];

const TOPPING_CATEGORIES = ['Chocolate', 'Icing', 'Sprinkles', 'Nuts', 'Extras'];

interface SelectedTopping {
  id: string;
  toppingId: string;
  amountG: number;
}

export default function App() {
  const [selectedCookieType, setSelectedCookieType] = useState<CookieType | null>(null);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('metric');
  const [servingSize, setServingSize] = useState(30);
  const [selectedRecipeName, setSelectedRecipeName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('science');
  const [toppings, setToppings] = useState<SelectedTopping[]>([]);
  const [showToppingModal, setShowToppingModal] = useState(false);
  const [toppingCat, setToppingCat] = useState('all');

  const handleSelectCookieType = (cookieType: CookieType) => {
    setSelectedCookieType(cookieType);
    setSelectedRecipeName(null);
    const defaultUnit = UNIT_OPTIONS[measurementMode][0];
    const ingredientsWithIds = cookieType.baseFormula.map((ing, index) => {
      const ingredientData = ingredientsDatabase.find(i => i.id === ing.ingredientId);
      const isEgg = ingredientData?.category === 'egg';
      return { ...ing, id: `${Date.now()}-${index}`, displayUnit: defaultUnit, eggSize: isEgg ? ('medium' as const) : undefined };
    });
    setIngredients(ingredientsWithIds);
    setToppings([]);
  };

  const handleBackToSelection = () => {
    setSelectedCookieType(null);
    setIngredients([]);
    setSelectedRecipeName(null);
    setToppings([]);
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
      return { ...ing, id: `${Date.now()}-${index}`, displayUnit: defaultUnit, eggSize: ing.eggSize || (isEgg ? ('medium' as const) : undefined) };
    });
    setIngredients(ingredientsWithIds);
  };

  const addTopping = (toppingId: string) => {
    const t = TOPPINGS.find(t => t.id === toppingId);
    if (!t) return;
    setToppings(prev => [...prev, { id: Date.now().toString(), toppingId, amountG: t.defaultAmountG }]);
  };

  const removeTopping = (id: string) => setToppings(prev => prev.filter(t => t.id !== id));

  const updateToppingAmount = (id: string, amount: number) =>
    setToppings(prev => prev.map(t => t.id === id ? { ...t, amountG: amount } : t));

  if (!selectedCookieType) {
    return <CookieTypeSelector cookieTypes={cookieTypes} onSelectType={handleSelectCookieType} />;
  }

  const metrics = calculateCookieMetrics(ingredients);
  const servingsPerRecipe = metrics.totalWeight > 0 ? Math.floor(metrics.totalWeight / servingSize) : 0;
  const availableRecipes = getRecipesForCookieType(selectedCookieType.id);

  // Add toppings nutrition to metrics
  const toppingNutrition = toppings.reduce((acc, st) => {
    const t = TOPPINGS.find(t => t.id === st.toppingId);
    if (!t) return acc;
    const factor = st.amountG / 100;
    return {
      calories: acc.calories + t.caloriesPer100g * factor,
      fat: acc.fat + t.fatPer100g * factor,
      sugar: acc.sugar + t.sugarPer100g * factor,
      carbs: acc.carbs + t.carbsPer100g * factor,
      protein: acc.protein + t.proteinPer100g * factor,
      weight: acc.weight + st.amountG,
    };
  }, { calories: 0, fat: 0, sugar: 0, carbs: 0, protein: 0, weight: 0 });

  const totalWeight = metrics.totalWeight + toppingNutrition.weight;

  // Merge toppings into metrics for nutrition display
  const metricsWithToppings = {
    ...metrics,
    totalWeight,
    calories: metrics.calories + (toppingNutrition.calories / (totalWeight || 1)) * 100,
    fat: metrics.fat + (toppingNutrition.fat / (totalWeight || 1)) * 100,
    sugar: metrics.sugar + (toppingNutrition.sugar / (totalWeight || 1)) * 100,
    carbs: metrics.carbs + (toppingNutrition.carbs / (totalWeight || 1)) * 100,
    protein: metrics.protein + (toppingNutrition.protein / (totalWeight || 1)) * 100,
  };
  const totalServings = totalWeight > 0 ? Math.floor(totalWeight / servingSize) : 0;

  const filteredToppings = toppingCat === 'all' ? TOPPINGS : TOPPINGS.filter(t => t.category === toppingCat);
  const addedToppingIds = new Set(toppings.map(t => t.toppingId));

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
                <h1 className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>{selectedCookieType.name}</h1>
                <p className="text-red-100 text-xs">{selectedCookieType.texture} · {selectedRecipeName ?? selectedCookieType.examples[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-white/20 rounded-lg p-0.5">
                {(['metric', 'imperial', 'volumetric'] as MeasurementMode[]).map((m) => (
                  <button key={m} onClick={() => handleMeasurementModeChange(m)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${measurementMode === m ? 'bg-white text-red-600' : 'text-white hover:bg-white/20'}`}>
                    {m === 'metric' ? 'g' : m === 'imperial' ? 'oz' : 'cups'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
                <span className="text-xs text-white/80">Per cookie:</span>
                <input type="number" value={servingSize} min={1}
                  onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 30))}
                  className="w-12 bg-white/20 rounded text-white text-xs text-center outline-none" />
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
                {selectedCookieType.keyTraits.map((trait, i) => (
                  <span key={i} className="text-xs bg-white/60 px-2 py-1 rounded-full text-amber-900 font-medium">{trait}</span>
                ))}
              </div>
            </div>
            <div className="border-l border-amber-300 pl-4">
              <div className="text-xs text-amber-800 font-semibold mb-1">Ratio:</div>
              <div className="text-sm text-amber-900 font-mono">{selectedCookieType.ratioDescription}</div>
              <div className="text-xs text-amber-700 mt-2">Examples: {selectedCookieType.examples.slice(0, 2).join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Ingredients card */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">🍪 Cookie Ingredients</h2>
              </div>

              {/* Selected recipe name */}
              {selectedRecipeName && (
                <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl">
                  <span className="text-sm">📖</span>
                  <span className="text-sm font-semibold text-red-800">{selectedRecipeName}</span>
                </div>
              )}

              {availableRecipes.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">📖 Load a Recipe</div>
                  <select value={selectedRecipeName ?? ''}
                    onChange={(e) => handleLoadRecipe(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white text-gray-700 cursor-pointer">
                    <option value="">— Select a recipe —</option>
                    {availableRecipes.map(r => <option key={r.id} value={r.id}>{r.name} ({r.servings})</option>)}
                  </select>
                </div>
              )}

              <IngredientSelector ingredients={ingredients} onIngredientsChange={setIngredients} measurementMode={measurementMode} />
            </div>

            {/* Toppings card */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">🎨 Toppings & Decorations</h2>
                <button onClick={() => setShowToppingModal(true)}
                  className="flex items-center gap-1.5 text-white text-sm font-medium px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}>
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {toppings.length > 0 ? (
                <div>
                  {toppings.map(st => {
                    const t = TOPPINGS.find(t => t.id === st.toppingId)!;
                    return (
                      <div key={st.id} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                        <span className="text-base flex-shrink-0">{t.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">{t.name}</div>
                          <div className="text-xs text-gray-400">{t.category}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <input type="number" value={st.amountG} min={0}
                            onChange={e => updateToppingAmount(st.id, parseFloat(e.target.value) || 0)}
                            className="w-16 text-right text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300" />
                          <span className="text-xs text-gray-500">g</span>
                          <button onClick={() => removeTopping(st.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Toppings Weight:</span>
                    <span className="font-bold text-gray-900">{Math.round(toppingNutrition.weight)}g</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">
                  No toppings yet. Click Add to decorate your cookies!
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Tabs */}
          <div>
            <div className="flex bg-white rounded-2xl shadow-sm p-1 mb-4">
              {([
                { id: 'science', label: '🔬 Science' },
                { id: 'nutrition', label: '📋 Nutrition' },
                { id: 'baking', label: '🔥 Baking' },
              ] as { id: ActiveTab; label: string }[]).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
                  style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #c0392b, #e67e22)' } : {}}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'science' && (
              <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
                {ingredients.length > 0 ? (
                  <>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">📊 Quick Stats</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">Ingredients:</span><span className="font-semibold">{ingredients.length}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Total Weight:</span><span className="font-semibold">{Math.round(totalWeight)}g</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Servings:</span><span className="font-semibold">{totalServings} cookies</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Per Cookie:</span><span className="font-semibold">{((metricsWithToppings.calories * servingSize) / 100).toFixed(0)} cal</span></div>
                        {toppings.length > 0 && <div className="flex justify-between"><span className="text-gray-600">Toppings Added:</span><span className="font-semibold">{toppings.length}</span></div>}
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <MetricsDisplay metrics={metricsWithToppings} measurementMode={measurementMode} />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-sm">Add ingredients to see science metrics</div>
                )}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-bold text-gray-900 mb-3">💡 About Cookie Metrics</h3>
                  <div className="space-y-3 text-sm">
                    <div><div className="font-semibold text-red-700">Water Activity (aw)</div><p className="text-gray-600">Measures moisture availability. Range: 0.30 (crisp) to 0.75 (soft).</p></div>
                    <div><div className="font-semibold text-red-700">Texture Force (N)</div><p className="text-gray-600">Hardness in Newtons. Lower = soft/chewy, Higher = crisp/hard.</p></div>
                    <div><div className="font-semibold text-red-700">Spread Ratio</div><p className="text-gray-600">Diameter ÷ height. Higher = flatter, wider cookies. Typical: 5–8.</p></div>
                    <div><div className="font-semibold text-red-700">Sugar Content</div><p className="text-gray-600">Total sugar from all sources. Most cookies are 15–35% sugar.</p></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                {ingredients.length > 0 ? (
                  <NutritionFacts metrics={metricsWithToppings} servingSize={servingSize} servingsPerRecipe={Math.floor(totalWeight / servingSize)} />
                ) : (
                  <div className="text-center py-12 text-gray-400 text-sm">Add ingredients to see nutrition facts</div>
                )}
              </div>
            )}

            {activeTab === 'baking' && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                {ingredients.length > 0 ? (
                  <BakingInstructions cookieType={selectedCookieType.id} totalWeight={metrics.totalWeight} cookieCount={servingsPerRecipe} measurementMode={measurementMode} />
                ) : (
                  <div className="text-center py-12 text-gray-400 text-sm">Add ingredients to see baking instructions</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toppings Modal */}
      {showToppingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add Topping or Decoration</h3>
              <button onClick={() => setShowToppingModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex gap-1.5 p-3 border-b border-gray-100 overflow-x-auto flex-shrink-0">
              {['all', ...TOPPING_CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setToppingCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors ${toppingCat === cat ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  style={toppingCat === cat ? { background: 'linear-gradient(135deg, #c0392b, #e67e22)' } : {}}>
                  {cat === 'all' ? '🔍 All' : cat}
                </button>
              ))}
            </div>
            <div className="overflow-y-auto flex-1 p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredToppings.map(t => (
                  <button key={t.id}
                    onClick={() => { if (!addedToppingIds.has(t.id)) { addTopping(t.id); setShowToppingModal(false); } }}
                    disabled={addedToppingIds.has(t.id)}
                    className={`text-left p-3 rounded-xl border transition-all group ${addedToppingIds.has(t.id) ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-200 hover:border-red-300 hover:bg-red-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{t.emoji}</span>
                      <span className={`text-sm font-medium ${addedToppingIds.has(t.id) ? 'text-gray-400' : 'text-gray-800 group-hover:text-red-700'}`}>{t.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {t.caloriesPer100g} kcal/100g · {t.category} · default {t.defaultAmountG}g
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="container mx-auto px-4 py-8 mt-4">
        <div className="text-center text-sm text-gray-500">
          <p>Professional cookie formulation tool based on food science principles.</p>
          <p className="mt-1">Nutrition values are estimates. Actual values may vary.</p>
        </div>
      </footer>
    </div>
  );
}
