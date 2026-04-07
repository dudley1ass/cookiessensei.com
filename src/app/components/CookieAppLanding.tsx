import { FlaskConical, LayoutGrid } from 'lucide-react';

/**
 * Entry screen for Cookie Sensei – distinct from the cookie-type grid at `#/browse`
 * so “back” from a recipe clearly returns to the selector, not a parent “home”.
 */
export function CookieAppLanding() {
  const goBrowse = () => {
    window.location.hash = '#/browse';
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fce4ec 50%, #f3e5f5 100%)' }}
    >
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-white shadow-md text-3xl border border-red-100">
            🍪
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Cookie Sensei
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Formulate and analyze cookie recipes with food-science metrics—water activity, spread, nutrition,
            and more. Start by choosing a professional cookie family, then load a recipe or build your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={goBrowse}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e67e22)',
                boxShadow: '0 8px 24px rgba(192,57,43,0.35)',
              }}
            >
              <LayoutGrid className="size-5" />
              Browse cookie types
            </button>
          </div>
          <p className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4">
            <FlaskConical className="size-3.5 shrink-0" />
            Cookie Science Calculator
          </p>
        </div>
      </main>
    </div>
  );
}
