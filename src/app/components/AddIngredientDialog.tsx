import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';

interface AddIngredientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIngredient: (ingredientId: string) => void;
}

export function AddIngredientDialog({
  isOpen,
  onClose,
  onAddIngredient,
}: AddIngredientDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'flour', name: 'Flours' },
    { id: 'sugar', name: 'Sugars' },
    { id: 'fat', name: 'Fats' },
    { id: 'egg', name: 'Eggs' },
    { id: 'leavener', name: 'Leaveners' },
    { id: 'liquid', name: 'Liquids & Extracts' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'nut', name: 'Nuts & Seeds' },
    { id: 'fruit', name: 'Dried Fruits' },
    { id: 'candy', name: 'Candies & Mix-ins' },
    { id: 'spice', name: 'Spices' },
    { id: 'other', name: 'Other' },
  ];

  const filteredIngredients = ingredientsDatabase.filter((ing) => {
    const matchesCategory = selectedCategory === 'all' || ing.category === selectedCategory;
    const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddIngredient = (ingredientId: string) => {
    onAddIngredient(ingredientId);
    onClose();
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Ingredient</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-200">
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
        </div>

        {/* Ingredients List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => handleAddIngredient(ingredient.id)}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 rounded-lg transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{ingredient.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{ingredient.category}</div>
                </div>
              </button>
            ))}
          </div>
          {filteredIngredients.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No ingredients found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
