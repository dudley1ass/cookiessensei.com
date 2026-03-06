import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient, UnitType, EggSize } from '../types/cookie';
import { CustomIngredientDialog } from './CustomIngredientDialog';

type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

// Standard egg weights in grams
const EGG_WEIGHTS: Record<EggSize, number> = {
  small: 43,
  medium: 50,
  large: 57,
};

// Unit options for each measurement mode
const UNIT_OPTIONS: Record<MeasurementMode, UnitType[]> = {
  metric: ['g', 'kg', 'mg'],
  imperial: ['oz', 'lb'],
  volumetric: ['cups', 'tbsp', 'tsp', 'ml', 'fl oz'],
};

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

  const categories = [
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
      amount: isEgg ? EGG_WEIGHTS.medium : 100, // Default to medium egg (50g) or 100g
      displayUnit: defaultUnit,
      eggSize: isEgg ? 'medium' : undefined,
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
          // Update both the egg size and the amount
          return { ...ing, eggSize, amount: EGG_WEIGHTS[eggSize] };
        }
        return ing;
      })
    );
  };

  const convertToDisplay = (grams: number, unit: UnitType, ingredient: any): string => {
    const density = ingredient?.density || 1.0;
    
    switch (unit) {
      // Metric
      case 'g':
        return grams.toFixed(1);
      case 'kg':
        return (grams / 1000).toFixed(3);
      case 'mg':
        return (grams * 1000).toFixed(0);
      
      // Imperial
      case 'oz':
        return (grams * 0.035274).toFixed(2);
      case 'lb':
        return (grams * 0.00220462).toFixed(3);
      
      // Volumetric
      case 'cups':
        return (grams / (density * 236.588)).toFixed(2);
      case 'tbsp':
        return (grams / (density * 14.7868)).toFixed(1);
      case 'tsp':
        return (grams / (density * 4.92892)).toFixed(1);
      case 'ml':
        return (grams / density).toFixed(1);
      case 'fl oz':
        return (grams / (density * 29.5735)).toFixed(2);
      
      default:
        return grams.toFixed(1);
    }
  };

  const convertFromDisplay = (value: number, unit: UnitType, ingredient: any): number => {
    const density = ingredient?.density || 1.0;
    
    switch (unit) {
      // Metric
      case 'g':
        return value;
      case 'kg':
        return value * 1000;
      case 'mg':
        return value / 1000;
      
      // Imperial
      case 'oz':
        return value / 0.035274;
      case 'lb':
        return value / 0.00220462;
      
      // Volumetric
      case 'cups':
        return value * density * 236.588;
      case 'tbsp':
        return value * density * 14.7868;
      case 'tsp':
        return value * density * 4.92892;
      case 'ml':
        return value * density;
      case 'fl oz':
        return value * density * 29.5735;
      
      default:
        return value;
    }
  };

  const getDefaultUnit = (): UnitType => {
    return UNIT_OPTIONS[measurementMode][0];
  };

  return (
    <div className="space-y-4">
      {/* Category Filter & Custom Button */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowCustomDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Custom
        </button>
      </div>

      {/* Current Ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Recipe Ingredients</h3>
          {ingredients.map((recipeIng) => {
            const ingredient = ingredientsDatabase.find(
              (ing) => ing.id === recipeIng.ingredientId
            );
            
            // Handle custom ingredients
            const displayName = ingredient?.name || recipeIng.customName || 'Custom Ingredient';
            const category = ingredient?.category || 'custom';

            const currentUnit = recipeIng.displayUnit || getDefaultUnit();
            const availableUnits = UNIT_OPTIONS[measurementMode];
            const isEgg = ingredient?.category === 'egg';
            const currentEggSize = recipeIng.eggSize || 'medium';

            return (
              <div
                key={recipeIng.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isEgg && (
                    <select
                      value={currentEggSize}
                      onChange={(e) => updateEggSize(recipeIng.id, e.target.value as EggSize)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  )}
                  <input
                    type="number"
                    value={convertToDisplay(recipeIng.amount, currentUnit, ingredient)}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      updateAmount(
                        recipeIng.id,
                        convertFromDisplay(value, currentUnit, ingredient)
                      );
                    }}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    step="0.1"
                    min="0"
                  />
                  <select
                    value={currentUnit}
                    onChange={(e) => updateDisplayUnit(recipeIng.id, e.target.value as UnitType)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                  >
                    {availableUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeIngredient(recipeIng.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Ingredients */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">Add Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
          {filteredIngredients.map((ingredient) => {
            const alreadyAdded = ingredients.some(
              (ing) => ing.ingredientId === ingredient.id
            );
            return (
              <button
                key={ingredient.id}
                onClick={() => !alreadyAdded && addIngredient(ingredient.id)}
                disabled={alreadyAdded}
                className={`flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors ${
                  alreadyAdded
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-amber-50 text-gray-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Plus className="w-4 h-4 flex-shrink-0" />
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
