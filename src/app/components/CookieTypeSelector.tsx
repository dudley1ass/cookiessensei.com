import { useEffect, useRef, useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { CookieType } from '../types/cookieTypes';
import { IngredientMatcher } from './IngredientMatcher';
import { CookieHeroBanner } from './CookieHeroBanner';

interface CookieTypeSelectorProps {
  cookieTypes: CookieType[];
  onSelectType: (cookieType: CookieType) => void;
  /** Set when returning from a recipe so the page scrolls to the options grid (below the hero). */
  scrollCookieGridIntoView?: boolean;
  onCookieGridScrollConsumed?: () => void;
}

export function CookieTypeSelector({
  cookieTypes,
  onSelectType,
  scrollCookieGridIntoView = false,
  onCookieGridScrollConsumed,
}: CookieTypeSelectorProps) {
  const [showMatcher, setShowMatcher] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!scrollCookieGridIntoView) return;
    const id = window.requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onCookieGridScrollConsumed?.();
    });
    return () => window.cancelAnimationFrame(id);
  }, [scrollCookieGridIntoView, onCookieGridScrollConsumed]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}>

      {/* Hero Banner */}
      <CookieHeroBanner
        onScrollToGrid={scrollToGrid}
        onOpenMatcher={() => setShowMatcher(true)}
      />

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
                  {cookieTypes.length} professional formulas — pick one to open the builder
                </h2>
                <p className="text-sm text-gray-500">
                  Chewy, crispy, cakey, fudgy, bars, and more. Each loads a science-backed starting recipe you can edit.
                </p>
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
                type="button"
                onClick={() => onSelectType(type)}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-red-400 hover:-translate-y-0.5 flex flex-col h-full"
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
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{type.description}</p>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-red-600 mb-1">Examples:</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{type.examples.join(', ')}</div>
                </div>

                <span
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-white transition-opacity group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}
                >
                  Use this formula
                </span>
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

      {/* Light reminder — primary onboarding moved into hero */}
      <div className="py-8 mt-4 bg-white/60 border-t border-red-100">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm text-gray-600">
          <button
            type="button"
            onClick={() => setShowMatcher(true)}
            className="font-semibold text-red-700 hover:text-red-900 underline underline-offset-4"
          >
            Prefer to start from your pantry instead? Open the ingredient matcher →
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
