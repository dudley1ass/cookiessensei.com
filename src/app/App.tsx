import { useState } from 'react';
import { Cookie, Beaker, ArrowLeft, ChefHat } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const handleSelectCookieType = (cookieType: CookieType) => {
    setSelectedCookieType(cookieType);
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
  };

  const handleMeasurementModeChange = (mode: MeasurementMode) => {
    setMeasurementMode(mode);
    const defaultUnit = UNIT_OPTIONS[mode][0];
    setIngredients(ingredients.map(ing => ({ ...ing, displayUnit: defaultUnit })));
  };

  const handleLoadRecipe = (recipeId: string) => {
    if (!recipeId) return;
    const recipe = recipePresets.find(r => r.id === recipeId);
    if (!recipe) return;
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground leading-none">Cookie Science Calculator</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {selectedCookieType.name} · {selectedCookieType.texture}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleBackToSelection} className="gap-1.5 shrink-0">
            <ArrowLeft className="w-4 h-4" />
            Change Type
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Cookie Type Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-1">{selectedCookieType.name}</h3>
              <p className="text-sm text-amber-800 mb-2">{selectedCookieType.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCookieType.keyTraits.map((trait, i) => (
                  <span key={i} className="text-xs bg-white/70 border border-amber-200 px-2 py-0.5 rounded-full text-amber-900 font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:border-l border-amber-200 md:pl-4 shrink-0">
              <div className="text-xs text-amber-700 font-semibold mb-1">Ratio</div>
              <div className="text-sm text-amber-900 font-mono">{selectedCookieType.ratioDescription}</div>
              <div className="text-xs text-amber-700 mt-2">
                {selectedCookieType.examples.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between bg-card border border-border rounded-xl p-4">
          {/* Measurement Mode */}
          <div className="flex gap-1.5 bg-muted rounded-lg p-1">
            {(['metric', 'imperial', 'volumetric'] as MeasurementMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleMeasurementModeChange(mode)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  measurementMode === mode
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === 'metric' ? 'Metric (g)' : mode === 'imperial' ? 'Imperial (oz)' : 'Volumetric'}
              </button>
            ))}
          </div>

          {/* Serving Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground font-medium whitespace-nowrap">Serving size:</label>
            <input
              type="number"
              value={servingSize}
              onChange={(e) => setServingSize(Math.max(1, parseInt(e.target.value) || 30))}
              className="w-16 px-2 py-1.5 border border-border rounded-md text-sm text-right bg-input-background"
              min="1"
            />
            <span className="text-sm text-muted-foreground">g</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Preset Selector */}
            {availableRecipes.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <Select onValueChange={handleLoadRecipe}>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Load a recipe preset…" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRecipes.map((recipe) => (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            {recipe.name} ({recipe.servings})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 ml-8">
                  Load a tested recipe to auto-populate ingredients
                </p>
              </div>
            )}

            {/* Ingredients */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Cookie className="w-4 h-4 text-amber-500" />
                Recipe Ingredients
              </h2>
              <IngredientSelector
                ingredients={ingredients}
                onIngredientsChange={setIngredients}
                measurementMode={measurementMode}
              />
            </div>

            {/* Science Metrics */}
            {ingredients.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-blue-500" />
                  Cookie Science Metrics
                </h2>
                <MetricsDisplay metrics={metrics} measurementMode={measurementMode} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            {ingredients.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Ingredients', value: `${ingredients.length}` },
                    { label: 'Servings', value: `${servingsPerRecipe} cookies` },
                    { label: 'Per cookie', value: `${((metrics.calories * servingSize) / 100).toFixed(0)} cal` },
                    { label: 'Total weight', value: `${metrics.totalWeight.toFixed(0)}g` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Metrics */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">About Cookie Metrics</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Water Activity (aw)', color: 'text-amber-600', desc: 'Measures moisture availability. Range: 0.30 (crisp) to 0.75 (soft). Lower = longer shelf life.' },
                  { label: 'Texture Force (N)', color: 'text-blue-600', desc: 'Hardness in Newtons. Lower = soft/chewy, Higher = crisp/hard.' },
                  { label: 'Spread Ratio', color: 'text-purple-600', desc: 'Diameter ÷ height. Higher = flatter, wider cookies. Typical: 5–8.' },
                  { label: 'Sugar Content', color: 'text-pink-600', desc: 'Total sugar from all sources. Most cookies are 15–35%.' },
                ].map(({ label, color, desc }) => (
                  <div key={label}>
                    <div className={`text-xs font-semibold ${color}`}>{label}</div>
                    <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Label */}
        {ingredients.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <Beaker className="w-4 h-4 text-blue-500" />
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
        )}

        {/* Baking Instructions */}
        {ingredients.length > 0 && (
          <BakingInstructions
            cookieType={selectedCookieType.id}
            totalWeight={metrics.totalWeight}
            cookieCount={servingsPerRecipe}
            measurementMode={measurementMode}
          />
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
          <p>Professional cookie formulation tool based on food science principles.</p>
          <p className="mt-1">Nutrition values are estimates. Actual values may vary based on specific ingredients.</p>
        </footer>
      </div>
    </div>
  );
}
