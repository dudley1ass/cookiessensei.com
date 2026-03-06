import { Cookie, ChefHat, Sparkles } from 'lucide-react';
import { CookieType } from '../types/cookieTypes';

interface CookieTypeSelectorProps {
  cookieTypes: CookieType[];
  onSelectType: (cookieType: CookieType) => void;
}

export function CookieTypeSelector({ cookieTypes, onSelectType }: CookieTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Cookie className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Cookie Science Calculator</h1>
              <p className="text-amber-100 text-sm">Choose your cookie type to begin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ChefHat className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-800">12 Professional Cookie Formulas</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a cookie type to load its professional bakery formula. Each formula is based on real science
              and can be customized to your preferences.
            </p>
          </div>

          {/* Cookie Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookieTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelectType(type)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-amber-400 hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-3 rounded-lg group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                    <Cookie className="w-6 h-6 text-amber-600" />
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{type.description}</p>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-amber-600 mb-1">Examples:</div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {type.examples.join(', ')}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Texture:</span>
                    <span className="text-xs text-amber-600 font-semibold">{type.texture}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Load Formula</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">💡 How It Works</h3>
            <p className="text-sm text-gray-600 mb-3">
              Each cookie type comes with a professional base formula developed from real bakery science.
              After selecting a type, you can:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-5">
              <li>• Adjust ingredient amounts to customize your recipe</li>
              <li>• Add or remove ingredients based on your preferences</li>
              <li>• See real-time predictions of water activity, texture, spread, and sweetness</li>
              <li>• Generate FDA nutrition facts for your final recipe</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
