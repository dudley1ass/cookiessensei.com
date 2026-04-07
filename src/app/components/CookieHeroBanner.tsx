import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Star, FlaskConical, BookOpen, Printer, ArrowRight, ExternalLink } from 'lucide-react';
import { CookieToolPreviewMockup } from './CookieToolPreviewMockup';

const COOKIE_SCIENCE_ARTICLES = 'https://senseifood.com/cookie-science/';

const STAT_ITEMS = [
  { icon: '🍪', value: '16', label: 'Cookie Types' },
  { icon: '🧪', value: '180+', label: 'Ingredients' },
  { icon: '📖', value: '115', label: 'Tested Recipes' },
  { icon: '📋', value: 'FDA', label: 'Nutrition Facts' },
];

const FEATURE_PILLS = [
  { emoji: '🔬', text: 'Baking Science Engine' },
  { emoji: '💧', text: 'Water Activity Analysis' },
  { emoji: '📐', text: 'Spread Ratio Predictor' },
  { emoji: '🧁', text: 'Toppings & Decorations' },
  { emoji: '📋', text: 'FDA Nutrition Label' },
  { emoji: '🖨️', text: 'Print Recipe Card' },
  { emoji: '🍳', text: 'Ingredient Matcher' },
  { emoji: '⚖️', text: 'Metric / Imperial / Cups' },
];

export function CookieHeroBanner({
  onScrollToGrid,
  onOpenMatcher,
}: {
  onScrollToGrid: () => void;
  onOpenMatcher: () => void;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const particles = [
    { w: 10, h: 10, top: '20%', left: '7%',  bg: 'rgba(192,57,43,0.25)', anim: 'cookieFloat1 7s ease-in-out infinite', delay: '0s' },
    { w: 6,  h: 6,  top: '60%', left: '4%',  bg: 'rgba(230,126,34,0.3)', anim: 'cookieFloat2 5s ease-in-out infinite', delay: '1s' },
    { w: 14, h: 14, top: '25%', right: '8%', bg: 'rgba(192,57,43,0.18)', anim: 'cookieFloat1 8s ease-in-out infinite', delay: '0.5s' },
    { w: 7,  h: 7,  top: '68%', right: '10%',bg: 'rgba(230,126,34,0.25)',anim: 'cookieFloat2 6s ease-in-out infinite', delay: '2s' },
    { w: 5,  h: 5,  top: '45%', left: '14%', bg: 'rgba(192,57,43,0.2)', anim: 'cookieFloat1 9s ease-in-out infinite', delay: '1.5s' },
    { w: 9,  h: 9,  top: '18%', right: '22%',bg: 'rgba(230,126,34,0.2)', anim: 'cookieFloat2 7s ease-in-out infinite', delay: '3s' },
  ];

  return (
    <>
      <style>{`
        @keyframes cookieFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(10deg); }
        }
        @keyframes cookieFloat2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-8deg); }
        }
        @keyframes cookieFadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cookieFadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cookiePillScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cookie-fadeup { animation: cookieFadeUp 0.7s cubic-bezier(.22,.68,0,1.2) forwards; }
        .cookie-pill-track { animation: cookiePillScroll 28s linear infinite; }
        .cookie-pill-track:hover { animation-play-state: paused; }
        .cookie-cta-ring { position: relative; }
        .cookie-cta-ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid rgba(230,126,34,0.6);
          animation: cookieRingPulse 1.8s ease-out infinite;
        }
        @keyframes cookieRingPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>

      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7B1F14 0%, #a93226 35%, #c0392b 60%, #8B2500 100%)',
          minHeight: '520px',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(230,126,34,0.5) 0%, transparent 70%)',
            transform: `translate(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px)`,
            transition: 'transform 0.3s ease',
          }}
        />

        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.w, height: p.h,
              top: p.top, left: p.left, right: p.right,
              background: p.bg,
              animation: p.anim,
              animationDelay: p.delay,
            } as React.CSSProperties}
          />
        ))}

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-8">

          <div
            className="flex justify-center mb-4"
            style={{ opacity: visible ? 1 : 0, animation: visible ? 'cookieFadeDown 0.5s ease forwards' : 'none' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-300/30 bg-orange-300/10 text-orange-200 text-xs font-semibold tracking-wider uppercase">
              <Star className="size-3 fill-orange-300 text-orange-300" />
              Baking science · real ratios · instant feedback
              <Star className="size-3 fill-orange-300 text-orange-300" />
            </div>
          </div>

          <p
            className="text-center text-orange-200/90 text-sm sm:text-base font-medium max-w-xl mx-auto mb-4 leading-snug"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.6s 0.05s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
            }}
          >
            Most cookie recipes fail because ratios are wrong—this fixes that. Stop guessing: see exactly how ingredients change texture and spread.
          </p>

          <div className="text-center mb-4">
            <h1
              className="font-black text-white leading-tight tracking-tight mb-3"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
                fontFamily: 'Georgia, serif',
                opacity: visible ? 1 : 0,
                animation: visible ? 'cookieFadeUp 0.65s 0.1s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
                textShadow: '0 2px 20px rgba(0,0,0,0.35)',
              }}
            >
              Fix Your Cookie Recipe
              <span
                className="block mt-1"
                style={{
                  background: 'linear-gradient(90deg, #F0A500, #e67e22, #F6C840)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                in Under a Minute
              </span>
            </h1>
            <p
              className="text-red-100/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? 'cookieFadeUp 0.65s 0.2s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
              }}
            >
              Get exact adjustments for texture, spread, and sweetness—grounded in real baking science, not vibes.
            </p>
          </div>

          <p
            className="text-center text-orange-100/95 text-sm font-semibold max-w-xl mx-auto mb-5"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.65s 0.26s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
            }}
          >
            Start with <span className="text-white">16 proven cookie types</span>—chewy, crispy, cakey, fudgy, bars, and more.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start justify-center mb-5 max-w-3xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.65s 0.32s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
            }}
          >
            <div className="flex-1 min-w-0 flex flex-col items-center sm:items-stretch">
              <button
                type="button"
                onClick={onScrollToGrid}
                className="cookie-cta-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #e67e22, #F0A500)',
                  boxShadow: '0 8px 32px rgba(230,126,34,0.5), 0 2px 8px rgba(0,0,0,0.25)',
                }}
              >
                Start My Cookie Recipe
                <ArrowRight className="size-5" />
              </button>
              <ul className="mt-4 space-y-2 text-left text-sm text-red-100/90 max-w-md mx-auto sm:mx-0">
                {[
                  'Pick a base formula (or match from your pantry)',
                  'Adjust ingredients in grams, cups, or oz',
                  'See instant texture, spread & water-activity readouts',
                ].map(line => (
                  <li key={line} className="flex gap-2 items-start">
                    <span className="text-emerald-300 mt-0.5">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                <button
                  type="button"
                  onClick={onOpenMatcher}
                  className="text-sm text-orange-200/90 hover:text-white underline underline-offset-4 decoration-orange-300/50 font-medium"
                >
                  What can I make with my ingredients?
                </button>
                <a
                  href={COOKIE_SCIENCE_ARTICLES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-orange-200/90 hover:text-white font-medium transition-colors"
                >
                  <BookOpen className="size-4 shrink-0" />
                  Learn the science → try it here
                  <ExternalLink className="size-3.5 opacity-70" />
                </a>
              </div>
            </div>
            <div className="flex-1 min-w-0 max-w-md mx-auto w-full">
              <p className="text-[11px] text-center text-orange-200/70 uppercase tracking-wider font-bold mb-2">
                Inside the tool
              </p>
              <CookieToolPreviewMockup />
            </div>
          </div>

          {/* Early onboarding: was buried at page bottom */}
          <div
            className="max-w-xl mx-auto mb-8 rounded-xl border border-orange-300/25 bg-orange-950/30 px-5 py-4 text-center"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.65s 0.4s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
            }}
          >
            <p className="text-white font-bold text-sm mb-1">Not sure where to start?</p>
            <p className="text-red-100/75 text-xs mb-3">
              Tell us what’s in your kitchen—we’ll match you to a formula that fits.
            </p>
            <button
              type="button"
              onClick={onOpenMatcher}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-white text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #a93226)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              }}
            >
              🍳 Match ingredients to a cookie type
            </button>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-2xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.65s 0.46s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
            }}
          >
            {STAT_ITEMS.map(stat => (
              <div
                key={stat.label}
                className="text-center px-3 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-xl mb-0.5">{stat.icon}</div>
                <div className="text-xl font-black text-orange-300 leading-none">{stat.value}</div>
                <div className="text-xs text-red-100/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div
            className="overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? 'cookieFadeUp 0.65s 0.52s cubic-bezier(.22,.68,0,1.2) forwards' : 'none',
              maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <div className="flex gap-2 cookie-pill-track w-max">
              {[...FEATURE_PILLS, ...FEATURE_PILLS].map((pill, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-300/20 bg-orange-300/10 text-orange-200 text-xs font-medium whitespace-nowrap"
                >
                  <span>{pill.emoji}</span>
                  <span>{pill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={onScrollToGrid}
            className="text-orange-300/50 hover:text-orange-300 transition-colors animate-bounce"
            aria-label="Scroll to formulas"
          >
            <ChevronDown className="size-6" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '40px' }}>
            <path d="M0 40 L0 22 Q200 2 400 22 Q600 40 800 20 Q1000 2 1200 22 Q1320 34 1440 20 L1440 40 Z" fill="#fdf6e3" />
          </svg>
        </div>
      </div>

      <div style={{ background: '#fdf6e3' }} className="border-b border-orange-100 py-3">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-red-800/60 font-medium">
            <span className="flex items-center gap-1.5"><FlaskConical className="size-3.5 text-red-500" /> Real Baking Science</span>
            <span className="flex items-center gap-1.5"><BookOpen className="size-3.5 text-red-500" /> 115 Tested Recipes</span>
            <span className="flex items-center gap-1.5"><Printer className="size-3.5 text-red-500" /> Print-Ready Recipe Cards</span>
            <span className="flex items-center gap-1.5">⭐ 100% Free — No Account Needed</span>
          </div>
        </div>
      </div>
    </>
  );
}
