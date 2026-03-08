import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient, UnitType, EggSize } from '../types/cookie';
import { CustomIngredientDialog } from './CustomIngredientDialog';
import { AddIngredientDialog } from './AddIngredientDialog';

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
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [showAddIngredientDialog, setShowAddIngredientDialog] = useState(false);

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
    console.log('Updating egg size:', id, eggSize, 'to weight:', EGG_WEIGHTS[eggSize]);
    onIngredientsChange(
      ingredients.map((ing) => {
        if (ing.id === id) {
          const quantity = ing.eggQuantity || 1;
          const updated = { ...ing, eggSize, amount: EGG_WEIGHTS[eggSize] * quantity };
          console.log('Updated ingredient:', updated);
          return updated;
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

  const updateIngredient = (id: string, newIngredientId: string) => {
    const newIngredient = ingredientsDatabase.find(i => i.id === newIngredientId);
    const isEgg = newIngredient?.category === 'egg';
    
    onIngredientsChange(
      ingredients.map((ing) => {
        if (ing.id === id) {
          return {
            ...ing,
            ingredientId: newIngredientId,
            amount: isEgg ? EGG_WEIGHTS.medium : ing.amount,
            eggSize: isEgg ? 'medium' : undefined,
            eggQuantity: isEgg ? 1 : undefined,
          };
        }
        return ing;
      })
    );
  };

  const convertToDisplay = (grams: number, unit: UnitType, ingredient: any): string => {
    const density = ingredient?.density || 1.0;
    
    switch (unit) {
      // Metric (keep precise decimals - people have scales)
      case 'g':
        return grams.toFixed(1);
      case 'kg':
        return (grams / 1000).toFixed(3);
      case 'mg':
        return (grams * 1000).toFixed(0);
      
      // Imperial (keep precise decimals - people have scales)
      case 'oz':
        return (grams * 0.035274).toFixed(2);
      case 'lb':
        return (grams * 0.00220462).toFixed(3);
      
      // Volumetric (round to practical measurements)
      case 'cups':
        return formatVolumetricDisplay(grams, density, 236.588, 'cup');
      case 'tbsp':
        return formatVolumetricDisplay(grams, density, 14.7868, 'tbsp');
      case 'tsp':
        return formatVolumetricDisplay(grams, density, 4.92892, 'tsp');
      case 'ml':
        return (grams / density).toFixed(0); // Round to whole ml
      case 'fl oz':
        return (grams / (density * 29.5735)).toFixed(1);
      
      default:
        return grams.toFixed(1);
    }
  };

  // Helper function to format volumetric measurements into practical portions
  const formatVolumetricDisplay = (grams: number, density: number, gramPerUnit: number, unitName: string): string => {
    const totalInUnit = grams / (density * gramPerUnit);
    
    // For very small amounts, show decimals
    if (totalInUnit < 0.25) {
      return totalInUnit.toFixed(2);
    }
    
    // Round to common fractions: 0.25, 0.33, 0.5, 0.67, 0.75
    const whole = Math.floor(totalInUnit);
    const fraction = totalInUnit - whole;
    
    let displayFraction = '';
    if (fraction >= 0.875) {
      return (whole + 1).toFixed(0); // Round up
    } else if (fraction >= 0.708) {
      displayFraction = '¾';
    } else if (fraction >= 0.58) {
      displayFraction = '⅔';
    } else if (fraction >= 0.416) {
      displayFraction = '½';
    } else if (fraction >= 0.291) {
      displayFraction = '⅓';
    } else if (fraction >= 0.166) {
      displayFraction = '¼';
    }
    
    if (whole === 0 && displayFraction) {
      return displayFraction;
    } else if (displayFraction) {
      return `${whole} ${displayFraction}`;
    } else if (whole > 0) {
      return whole.toFixed(0);
    }
    
    return totalInUnit.toFixed(2);
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
      {/* Add Ingredient Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowAddIngredientDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Ingredient
        </button>
        <button
          onClick={() => setShowCustomDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium text-sm"
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
                {/* Ingredient Selector Dropdown */}
                <div className="flex-1">
                  {!recipeIng.customName ? (
                    <select
                      value={recipeIng.ingredientId}
                      onChange={(e) => updateIngredient(recipeIng.id, e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white font-medium hover:border-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      {ingredientsDatabase.map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.name} ({ing.category})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div>
                      <div className="font-medium text-gray-900">{displayName}</div>
                      <div className="text-xs text-gray-500">Custom</div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isEgg && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600">Size</label>
                        <select
                          value={currentEggSize}
                          onChange={(e) => updateEggSize(recipeIng.id, e.target.value as EggSize)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm bg-white font-medium"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600">Qty (eggs)</label>
                        <input
                          type="number"
                          min="1"
                          value={recipeIng.eggQuantity || 1}
                          onChange={(e) => updateEggQuantity(recipeIng.id, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center bg-white font-medium"
                        />
                      </div>
                    </>
                  )}
                  {!isEgg && (
                    <>
                      <input
                        type={measurementMode === 'volumetric' ? 'text' : 'number'}
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
                        readOnly={measurementMode === 'volumetric'}
                        title={measurementMode === 'volumetric' ? 'Switch to Metric or Imperial to edit' : ''}
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
                    </>
                  )}
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

      {/* Add Ingredient Dialog */}
      <AddIngredientDialog
        isOpen={showAddIngredientDialog}
        onClose={() => setShowAddIngredientDialog(false)}
        onAddIngredient={addIngredient}
      />

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