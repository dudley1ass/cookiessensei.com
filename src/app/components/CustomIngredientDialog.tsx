import { useState } from 'react';
import { X } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient } from '../types/cookie';

interface CustomIngredientDialogProps {
  onClose: () => void;
  onAdd: (ingredient: RecipeIngredient) => void;
}

export function CustomIngredientDialog({ onClose, onAdd }: CustomIngredientDialogProps) {
  const [ingredientName, setIngredientName] = useState('');
  const [amount, setAmount] = useState(100);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSuggestions = ingredientsDatabase.filter((ing) =>
    ing.name.toLowerCase().includes(ingredientName.toLowerCase())
  );

  const handleSelectSuggestion = (ingredientId: string) => {
    const ingredient = ingredientsDatabase.find((ing) => ing.id === ingredientId);
    if (ingredient) {
      setIngredientName(ingredient.name);
      setShowDropdown(false);
    }
  };

  const handleAdd = () => {
    // Check if it matches an existing ingredient
    const existingIngredient = ingredientsDatabase.find(
      (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase()
    );

    const newIngredient: RecipeIngredient = {
      id: Date.now().toString(),
      ingredientId: existingIngredient?.id || 'custom',
      amount: amount,
      customName: existingIngredient ? undefined : ingredientName,
    };

    onAdd(newIngredient);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Add Custom Ingredient</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Ingredient Name with Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredient Name
            </label>
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => {
                setIngredientName(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Type or select an ingredient..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />

            {/* Dropdown Suggestions */}
            {showDropdown && ingredientName && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredSuggestions.slice(0, 10).map((ingredient) => (
                  <button
                    key={ingredient.id}
                    onClick={() => handleSelectSuggestion(ingredient.id)}
                    className="w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{ingredient.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{ingredient.category}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (grams)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              min="0"
              step="1"
            />
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            💡 <strong>Tip:</strong> Start typing to see matching ingredients from our database, or enter your own custom ingredient name.
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!ingredientName || amount <= 0}
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Ingredient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
