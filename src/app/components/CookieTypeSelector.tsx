import { useRef, useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { CookieType } from '../types/cookieTypes';
import { IngredientMatcher } from './IngredientMatcher';
import { CookieHeroBanner } from './CookieHeroBanner';

interface CookieTypeSelectorProps {
  cookieTypes: CookieType[];
  onSelectType: (cookieType: CookieType) => void;
}

export function CookieTypeSelector({ cookieTypes, onSelectType }: CookieTypeSelectorProps) {
  const [showMatcher, setShowMatcher] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>

      {/* Hero Banner */}
      <CookieHeroBanner onScrollToGrid={scrollToGrid} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div ref={gridRef} className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-full bg-red-600 text-white">
                <ChefHat className="size-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800 leading-tight">
                  {cookieTypes.length} Professional Cookie Formulas
                </h2>
                <p className="text-sm text-gray-500">Select a type to load its science-based formula</p>
              </div>
            </div>
            <button
              onClick={() => setShowMatcher(true)}
              className="hidden sm:flex items-center gap-2 text-white font-medium px-4 py-2 rounded-xl transition-all text-sm hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)', boxShadow: '0 4px 16px rgba(192,57,43,0.35)' }}
            >
              🍳 What can I make?
            </button>
          </div>

          {/* Mobile "what can I make" */}
          <button
            onClick={() => setShowMatcher(true)}
            className="sm:hidden w-full flex items-center justify-center gap-2 text-white font-medium px-4 py-3 rounded-xl transition-all text-sm mb-6 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}
          >
            🍳 What can I make with my ingredients?
          </button>

          {/* Cookie Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <span>Load Formula →</span>
                </div>
              </button>
            ))}
          </div>

          {/* How it works */}
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

      {/* Bottom CTA */}
      <div
        className="py-10 mt-4"
        style={{ background: 'linear-gradient(135deg, #7B1F14 0%, #a93226 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-3xl mb-2">🍳</div>
          <h3 className="text-2xl font-black text-white mb-2">Not sure where to start?</h3>
          <p className="text-red-100/70 text-sm mb-5">
            Tell us what ingredients you have on hand — we'll match you to the perfect cookie formula.
          </p>
          <button
            onClick={() => setShowMatcher(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #e67e22, #F0A500)',
              boxShadow: '0 6px 24px rgba(230,126,34,0.4)',
            }}
          >
            🍳 Find My Cookie Formula
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-950 py-6 text-center">
        <p className="text-xs text-red-300/50">
          CookieSensei — Science-based cookie formula builder • 16 professional types • Free forever
        </p>
      </footer>

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
