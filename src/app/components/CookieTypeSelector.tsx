import { useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { CookieType } from '../types/cookieTypes';
import { IngredientMatcher } from './IngredientMatcher';

interface CookieTypeSelectorProps {
  cookieTypes: CookieType[];
  onSelectType: (cookieType: CookieType) => void;
}

export function CookieTypeSelector({ cookieTypes, onSelectType }: CookieTypeSelectorProps) {
  const [showMatcher, setShowMatcher] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>

      {/* Header */}
      <header className="text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c, #e67e22)' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍪</span>
              <div>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>CookieSensei</h1>
                <p className="text-red-100 text-sm">Choose your cookie type to begin</p>
              </div>
            </div>
            <button
              onClick={() => setShowMatcher(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-xl transition-all border border-white/30 text-sm"
            >
              🍳 What can I make?
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ChefHat className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">12 Professional Cookie Formulas</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a cookie type to load its professional formula. Each formula is based on real
              baking science and can be fully customized.
            </p>
          </div>

          {/* Cookie Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookieTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelectType(type)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-red-400 hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{type.emoji}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-600">
                      {type.texture}
                    </span>
                    <Sparkles className="w-4 h-4 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{type.description}</p>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-red-600 mb-1">Examples:</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{type.examples.join(', ')}</div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Load Formula</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">💡 How It Works</h3>
            <p className="text-sm text-gray-600 mb-3">
              Each cookie type loads a professional base formula grounded in baking science. After selecting, you can:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-5">
              <li>• Use <strong>🍳 What can I make?</strong> to find recipes based on ingredients you already have</li>
              <li>• Load a specific tested recipe with one click</li>
              <li>• Adjust ingredient amounts to customize your recipe</li>
              <li>• Swap any ingredient from a 180+ item database</li>
              <li>• See real-time science predictions for texture, spread, and sweetness</li>
              <li>• Generate FDA nutrition facts for your exact recipe</li>
            </ul>
          </div>
        </div>
      </main>

      {showMatcher && (
        <IngredientMatcher
          isOpen={showMatcher}
          onClose={() => setShowMatcher(false)}
          cookieTypes={cookieTypes}
          onSelectCookieType={onSelectType}
        />
      )}
    </div>
  );
}
