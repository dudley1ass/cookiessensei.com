import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient, UnitType, EggSize } from '../types/cookie';
import { CustomIngredientDialog } from './CustomIngredientDialog';
import { Button } from '@/components/ui/button';

type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

const EGG_WEIGHTS: Record<EggSize, number> = {
  small: 43,
  medium: 50,
  large: 57,
};

const UNIT_OPTIONS: Record<MeasurementMode, UnitType[]> = {
  metric: ['g', 'kg', 'mg'],
  imperial: ['oz', 'lb'],
  volumetric: ['cups', 'tbsp', 'tsp', 'ml', 'fl oz'],
};

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'flour', name: 'Flours' },
  { id: 'sugar', name: 'Sugars' },
  { id: 'fat', name: 'Fats' },
  { id: 'egg', name: 'Eggs' },
  { id: 'leavener', name: 'Leaveners' },
  { id: 'liquid', name: 'Liquids' },
  { id: 'chocolate', name: 'Chocolate' },
  { id: 'nut', name: 'Nuts' },
  { id: 'other', name: 'Other' },
];

interface IngredientSelectorProps {
  ingredients: RecipeIngredient[];
  onIngredientsChange: (ingredients: RecipeIngredient[]) => void;
  measurementMode: MeasurementMode;
}

export function IngredientSelector({
  ingredients,
  onIngredientsChange,
  measurementMode,
}: IngredientSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const filteredIngredients =
    selectedCategory === 'all'
      ? ingredientsDatabase
      : ingredientsDatabase.filter((ing) => ing.category === selectedCategory);

  const addIngredient = (ingredientId: string) => {
    const defaultUnit = UNIT_OPTIONS[measurementMode][0];
    const ingredient = ingredientsDatabase.find(i => i.id === ingredientId);
    const isEgg = ingredient?.category === 'egg';

    const newIngredient: RecipeIngredient = {
      id: Date.now().toString(),
      ingredientId,
      amount: isEgg ? EGG_WEIGHTS.medium : 100,
      displayUnit: defaultUnit,
      eggSize: isEgg ? 'medium' : undefined,
      eggQuantity: isEgg ? 1 : undefined,
    };
    onIngredientsChange([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    onIngredientsChange(ingredients.filter((ing) => ing.id !== id));
  };

  const updateAmount = (id: string, amount: number) => {
    onIngredientsChange(
      ingredients.map((ing) => (ing.id === id ? { ...ing, amount } : ing))
    );
  };

  const updateDisplayUnit = (id: string, unit: UnitType) => {
    onIngredientsChange(
      ingredients.map((ing) => (ing.id === id ? { ...ing, displayUnit: unit } : ing))
    );
  };

  const updateEggSize = (id: string, eggSize: EggSize) => {
    onIngredientsChange(
      ingredients.map((ing) => {
        if (ing.id === id) {
          const quantity = ing.eggQuantity || 1;
          return { ...ing, eggSize, amount: EGG_WEIGHTS[eggSize] * quantity };
        }
        return ing;
      })
    );
  };

  const updateEggQuantity = (id: string, quantity: number) => {
    onIngredientsChange(
      ingredients.map((ing) => {
        if (ing.id === id) {
          const eggSize = ing.eggSize || 'medium';
          return { ...ing, eggQuantity: quantity, amount: EGG_WEIGHTS[eggSize] * quantity };
        }
        return ing;
      })
    );
  };

  const convertToDisplay = (grams: number, unit: UnitType, ingredient: any): string => {
    const density = ingredient?.density || 1.0;
    switch (unit) {
      case 'g': return grams.toFixed(1);
      case 'kg': return (grams / 1000).toFixed(3);
      case 'mg': return (grams * 1000).toFixed(0);
      case 'oz': return (grams * 0.035274).toFixed(2);
      case 'lb': return (grams * 0.00220462).toFixed(3);
      case 'cups': return formatVolumetric(grams, density, 236.588);
      case 'tbsp': return formatVolumetric(grams, density, 14.7868);
      case 'tsp': return formatVolumetric(grams, density, 4.92892);
      case 'ml': return (grams / density).toFixed(0);
      case 'fl oz': return (grams / (density * 29.5735)).toFixed(1);
      default: return grams.toFixed(1);
    }
  };

  const formatVolumetric = (grams: number, density: number, gramPerUnit: number): string => {
    const total = grams / (density * gramPerUnit);
    if (total < 0.25) return total.toFixed(2);
    const whole = Math.floor(total);
    const fraction = total - whole;
    let displayFraction = '';
    if (fraction >= 0.875) return (whole + 1).toFixed(0);
    else if (fraction >= 0.708) displayFraction = '¾';
    else if (fraction >= 0.58) displayFraction = '⅔';
    else if (fraction >= 0.416) displayFraction = '½';
    else if (fraction >= 0.291) displayFraction = '⅓';
    else if (fraction >= 0.166) displayFraction = '¼';
    if (whole === 0 && displayFraction) return displayFraction;
    if (displayFraction) return `${whole} ${displayFraction}`;
    if (whole > 0) return whole.toFixed(0);
    return total.toFixed(2);
  };

  const convertFromDisplay = (value: number, unit: UnitType, ingredient: any): number => {
    const density = ingredient?.density || 1.0;
    switch (unit) {
      case 'g': return value;
      case 'kg': return value * 1000;
      case 'mg': return value / 1000;
      case 'oz': return value / 0.035274;
      case 'lb': return value / 0.00220462;
      case 'cups': return value * density * 236.588;
      case 'tbsp': return value * density * 14.7868;
      case 'tsp': return value * density * 4.92892;
      case 'ml': return value * density;
      case 'fl oz': return value * density * 29.5735;
      default: return value;
    }
  };

  const getDefaultUnit = (): UnitType => UNIT_OPTIONS[measurementMode][0];

  return (
    <div className="space-y-4">
      {/* Category Filter + Custom Button */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCustomDialog(true)}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom
        </Button>
      </div>

      {/* Current Recipe Ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Recipe Ingredients</h3>
          {ingredients.map((recipeIng) => {
            const ingredient = ingredientsDatabase.find(i => i.id === recipeIng.ingredientId);
            const displayName = ingredient?.name || recipeIng.customName || 'Custom Ingredient';
            const category = ingredient?.category || 'custom';
            const currentUnit = recipeIng.displayUnit || getDefaultUnit();
            const availableUnits = UNIT_OPTIONS[measurementMode];
            const isEgg = ingredient?.category === 'egg';
            const currentEggSize = recipeIng.eggSize || 'medium';

            return (
              <div
                key={recipeIng.id}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{displayName}</div>
                  <div className="text-xs text-muted-foreground capitalize">{category}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isEgg ? (
                    <>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-xs text-muted-foreground">Size</label>
                        <select
                          value={currentEggSize}
                          onChange={(e) => updateEggSize(recipeIng.id, e.target.value as EggSize)}
                          className="px-2 py-1 border border-border rounded-md text-sm bg-input-background"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-xs text-muted-foreground">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={recipeIng.eggQuantity || 1}
                          onChange={(e) => updateEggQuantity(recipeIng.id, parseInt(e.target.value) || 1)}
                          className="w-14 px-2 py-1 border border-border rounded-md text-sm text-center bg-input-background"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type={measurementMode === 'volumetric' ? 'text' : 'number'}
                        value={convertToDisplay(recipeIng.amount, currentUnit, ingredient)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          updateAmount(recipeIng.id, convertFromDisplay(value, currentUnit, ingredient));
                        }}
                        className="w-20 px-2 py-1 border border-border rounded-md text-sm text-right bg-input-background"
                        step="0.1"
                        min="0"
                        readOnly={measurementMode === 'volumetric'}
                        title={measurementMode === 'volumetric' ? 'Switch to Metric or Imperial to edit' : ''}
                      />
                      <select
                        value={currentUnit}
                        onChange={(e) => updateDisplayUnit(recipeIng.id, e.target.value as UnitType)}
                        className="px-2 py-1 border border-border rounded-md text-sm bg-input-background"
                      >
                        {availableUnits.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </>
                  )}
                  <button
                    onClick={() => removeIngredient(recipeIng.id)}
                    className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Ingredients to Add */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Add Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
          {filteredIngredients.map((ingredient) => {
            const alreadyAdded = ingredients.some(i => i.ingredientId === ingredient.id);
            return (
              <button
                key={ingredient.id}
                onClick={() => !alreadyAdded && addIngredient(ingredient.id)}
                disabled={alreadyAdded}
                className={`flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors ${
                  alreadyAdded
                    ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    : 'bg-amber-50 text-foreground hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{ingredient.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Ingredient Dialog */}
      {showCustomDialog && (
        <CustomIngredientDialog
          onClose={() => setShowCustomDialog(false)}
          onAdd={(customIngredient) => {
            onIngredientsChange([...ingredients, customIngredient]);
            setShowCustomDialog(false);
          }}
        />
      )}
    </div>
  );
}
