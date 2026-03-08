import { useState, useMemo } from 'react';
import { X, ChefHat, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { CookieType } from '../types/cookieTypes';

interface IngredientMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  cookieTypes: CookieType[];
  onSelectCookieType: (cookieType: CookieType) => void;
}

interface MatchResult {
  cookieType: CookieType;
  matchPercentage: number;
  hasIngredients: string[];
  missingIngredients: string[];
}

export function IngredientMatcher({ 
  isOpen, 
  onClose, 
  cookieTypes,
  onSelectCookieType 
}: IngredientMatcherProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!isOpen) return null;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(ingredientsDatabase.map(ing => ing.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter ingredients based on search and category
  const filteredIngredients = useMemo(() => {
    return ingredientsDatabase.filter(ing => {
      const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || ing.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Calculate matches
  const matches = useMemo((): MatchResult[] => {
    if (selectedIngredients.size === 0) return [];

    return cookieTypes.map(cookieType => {
      const requiredIngredients = cookieType.baseFormula.map(ing => ing.ingredientId);
      const hasIngredients: string[] = [];
      const missingIngredients: string[] = [];

      requiredIngredients.forEach(reqId => {
        if (selectedIngredients.has(reqId)) {
          hasIngredients.push(reqId);
        } else {
          missingIngredients.push(reqId);
        }
      });

      const matchPercentage = (hasIngredients.length / requiredIngredients.length) * 100;

      return {
        cookieType,
        matchPercentage,
        hasIngredients,
        missingIngredients
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [selectedIngredients, cookieTypes]);

  const toggleIngredient = (ingredientId: string) => {
    const newSelected = new Set(selectedIngredients);
    if (newSelected.has(ingredientId)) {
      newSelected.delete(ingredientId);
    } else {
      newSelected.add(ingredientId);
    }
    setSelectedIngredients(newSelected);
  };

  const getIngredientName = (id: string) => {
    return ingredientsDatabase.find(ing => ing.id === id)?.name || id;
  };

  const handleSelectMatch = (cookieType: CookieType) => {
    onSelectCookieType(cookieType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">What Can I Make?</h2>
              <p className="text-amber-100 text-sm">Select ingredients you have on hand</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Side - Ingredient Selection */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Select Your Ingredients</h3>
                <div className="bg-amber-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-amber-900">
                    Selected: <span className="font-bold">{selectedIngredients.size}</span> ingredients
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Ingredient Checkboxes */}
              <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                <div className="divide-y divide-gray-200">
                  {filteredIngredients.map(ingredient => (
                    <label
                      key={ingredient.id}
                      className="flex items-center gap-3 p-3 hover:bg-amber-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIngredients.has(ingredient.id)}
                        onChange={() => toggleIngredient(ingredient.id)}
                        className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{ingredient.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{ingredient.category}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Matching Results */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Cookie Matches</h3>

              {selectedIngredients.size === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ChefHat className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Select ingredients to see what you can make!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {matches.map(match => {
                    const isFullMatch = match.matchPercentage === 100;
                    const isGoodMatch = match.matchPercentage >= 75;

                    return (
                      <div
                        key={match.cookieType.id}
                        className={`border rounded-lg p-4 transition-all ${
                          isFullMatch
                            ? 'border-green-300 bg-green-50'
                            : isGoodMatch
                            ? 'border-amber-300 bg-amber-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {isFullMatch ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                              )}
                              <h4 className="font-bold text-gray-900">{match.cookieType.name}</h4>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{match.cookieType.description}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              isFullMatch ? 'text-green-600' : isGoodMatch ? 'text-amber-600' : 'text-gray-600'
                            }`}>
                              {Math.round(match.matchPercentage)}%
                            </div>
                            <div className="text-xs text-gray-500">match</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isFullMatch ? 'bg-green-500' : isGoodMatch ? 'bg-amber-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${match.matchPercentage}%` }}
                          />
                        </div>

                        {/* Missing Ingredients */}
                        {match.missingIngredients.length > 0 && (
                          <div className="text-xs">
                            <span className="font-semibold text-gray-700">Missing:</span>
                            <span className="text-gray-600 ml-1">
                              {match.missingIngredients.map(getIngredientName).join(', ')}
                            </span>
                          </div>
                        )}

                        {/* Action Button */}
                        {isFullMatch && (
                          <button
                            onClick={() => handleSelectMatch(match.cookieType)}
                            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Make This Cookie! 🍪
                          </button>
                        )}
                        {isGoodMatch && !isFullMatch && (
                          <button
                            onClick={() => handleSelectMatch(match.cookieType)}
                            className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Try Anyway
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {matches.filter(m => m.matchPercentage === 100).length} perfect matches found
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
