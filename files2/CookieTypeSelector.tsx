import { Cookie, ChefHat, Sparkles, Search } from 'lucide-react';
import { CookieType } from '../types/cookieTypes';
import { useState } from 'react';
import { IngredientMatcher } from './IngredientMatcher';
import { Button } from '@/components/ui/button';

interface CookieTypeSelectorProps {
  cookieTypes: CookieType[];
  onSelectType: (cookieType: CookieType) => void;
}

export function CookieTypeSelector({ cookieTypes, onSelectType }: CookieTypeSelectorProps) {
  const [showMatcher, setShowMatcher] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-none">Cookie Science Calculator</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Choose your cookie type to begin</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChefHat className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-semibold text-foreground">12 Professional Cookie Formulas</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Select a cookie type to load its professional bakery formula. Each formula is based on real science and can be customized to your preferences.
          </p>
          <Button
            onClick={() => setShowMatcher(true)}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Search className="w-4 h-4" />
            What Can I Make With My Ingredients?
          </Button>
        </div>

        {/* Cookie Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cookieTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type)}
              className="bg-card border border-border rounded-xl p-5 text-left hover:border-amber-400 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Cookie className="w-4 h-4 text-amber-600" />
                </div>
                <Sparkles className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{type.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{type.description}</p>
              <div className="mb-3">
                <div className="text-xs font-medium text-amber-600 mb-1">Examples</div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {type.examples.join(', ')}
                </div>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Texture:</span>
                <span className="text-xs font-medium text-amber-600">{type.texture}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Load Formula</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-10 bg-card border border-border rounded-xl p-6 border-l-4 border-l-amber-500">
          <h3 className="font-semibold text-foreground mb-2">💡 How It Works</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Each cookie type comes with a professional base formula developed from real bakery science. After selecting a type, you can:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Adjust ingredient amounts to customize your recipe</li>
            <li>• Add or remove ingredients based on your preferences</li>
            <li>• See real-time predictions of water activity, texture, spread, and sweetness</li>
            <li>• Generate FDA nutrition facts for your final recipe</li>
          </ul>
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
