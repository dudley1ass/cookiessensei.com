import { useState, useEffect } from 'react';
import { Plus, X, Search, Trash2, AlertCircle } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient, UnitType, EggSize } from '../types/cookie';
import { CustomIngredientDialog } from './CustomIngredientDialog';
import { cn } from './ui/utils';

type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

const EGG_WEIGHTS: Record<EggSize, number> = {
  small: 43,
  medium: 50,
  large: 57,
};

const UNIT_OPTIONS: Record<MeasurementMode, UnitType[]> = {
  metric: ['g', 'kg', 'mg'],
  imperial: ['oz', 'lb'],
  volumetric: ['cups', 'tbsp', 'tsp', 'ml', 'fl oz'],
};

// ── Ingredient Warning Engine ─────────────────────────────────
// Infusion Sensei–aligned bands; thresholds vary by cookie family (bar/brownie/fried/high-butter).

/** Short title + body; row-level warnings only (no duplicate formula banner). */
interface IngredientWarning {
  level: 'yellow' | 'red';
  title: string;
  message: string;
}

export interface RatioBands {
  fatProblem: number;
  fatWarn: number;
  sugarProblem: number;
  sugarWarn: number;
  eggProblem: number;
  eggWarn: number;
  liquidProblem: number;
  liquidWarn: number;
  leavenerProblem: number;
  leavenerWarn: number;
}

const COOKIE_RATIO_STANDARD: RatioBands = {
  fatProblem: 1.0,
  fatWarn: 0.85,
  sugarProblem: 1.55,
  sugarWarn: 1.28,
  eggProblem: 1.8,
  eggWarn: 1.4,
  liquidProblem: 1.1,
  liquidWarn: 0.7,
  leavenerProblem: 0.12,
  leavenerWarn: 0.08,
};

type RatioProfile = 'standard' | 'brownie' | 'bar' | 'fried' | 'no-bake' | 'high-butter' | 'sandwich';

export function ratioProfileForCookieFamily(id: string): RatioProfile {
  switch (id) {
    case 'brownie-cookie':
    case 'bar-cookie':
      // Pan bars / brownies use very little flour on purpose — same bands as brownie cookies.
      return 'brownie';
    case 'sandwich-cookie':
      // Cookie + filling in one list inflates sugar/liquids vs flour for the dough alone.
      return 'sandwich';
    case 'molded':
      // Pecan sandies, snowballs, etc. — high butter vs flour is normal.
      return 'high-butter';
    case 'fried-cookie':
      return 'fried';
    case 'no-bake':
      return 'no-bake';
    case 'shortbread':
    case 'pressed-butter':
      return 'high-butter';
    default:
      return 'standard';
  }
}

const OFF = 1e9;

export function getRatioBands(profile: RatioProfile): RatioBands {
  const b: RatioBands = { ...COOKIE_RATIO_STANDARD };
  switch (profile) {
    case 'brownie':
      // Typical brownie / bar batters are rich in fat & sugar vs flour — allow fudgy ratios.
      b.fatProblem = 2.05;
      b.fatWarn = 1.85;
      b.sugarProblem = 5.0;
      b.sugarWarn = 3.9;
      b.eggProblem = 3.2;
      b.eggWarn = 2.85;
      // Eggs + vanilla read as “liquid” — batters are naturally wetter than drop-cookie dough.
      b.liquidProblem = 4.85;
      b.liquidWarn = 3.45;
      return b;
    case 'sandwich':
      b.sugarProblem = 2.85;
      b.sugarWarn = 2.35;
      b.liquidProblem = 1.45;
      b.liquidWarn = 1.0;
      b.fatProblem = 1.35;
      b.fatWarn = 1.12;
      b.eggProblem = 2.35;
      b.eggWarn = 1.85;
      return b;
    case 'bar':
      // Kept for explicit `'bar'` profile if used later; `bar-cookie` family uses `brownie` profile.
      b.fatProblem = 1.8;
      b.fatWarn = 1.4;
      b.sugarProblem = 2.5;
      b.sugarWarn = 1.85;
      b.liquidProblem = 3.6;
      b.liquidWarn = 3.0;
      return b;
    case 'fried':
      b.fatProblem = OFF;
      b.fatWarn = OFF;
      b.sugarProblem = OFF;
      b.sugarWarn = OFF;
      b.liquidProblem = OFF;
      b.liquidWarn = OFF;
      return b;
    case 'high-butter':
      b.fatProblem = 1.8;
      b.fatWarn = 1.4;
      return b;
    default:
      return b;
  }
}

export function isFlourlessCookieFamily(id: string): boolean {
  return id === 'no-bake' || id === 'macaron-meringue';
}

const SENSEI = {
  fatRed: {
    level: 'red' as const,
    title: 'Fat too high',
    message:
      'Too much fat — baked goods will be greasy and spread flat. Reduce butter or add more flour.',
  },
  fatYellow: {
    level: 'yellow' as const,
    title: 'Fat is high',
    message:
      'Fat is on the high side — expect significant spread. Consider chilling the dough before baking.',
  },
  fatLow: {
    level: 'yellow' as const,
    title: 'Fat is low',
    message: 'Low fat for this amount of flour — baked goods may be dry and tough.',
  },
  sugarRed: {
    level: 'red' as const,
    title: 'Sugar too high',
    message:
      'Total sugar is very high — baked goods will be overly sweet, thin, and burn easily.',
  },
  sugarYellow: {
    level: 'yellow' as const,
    title: 'Sugar is high',
    message: 'Total sugar is high — expect more spread and browning. Watch bake time carefully.',
  },
  sugarLow: {
    level: 'yellow' as const,
    title: 'Sugar is low',
    message: 'Low sugar — result may be pale, bland, and dense.',
  },
  eggRed: {
    level: 'red' as const,
    title: 'Eggs too high',
    message:
      'Too many eggs for this flour — result will be very puffy and cakey. Reduce eggs or add more flour.',
  },
  eggYellow: {
    level: 'yellow' as const,
    title: 'Eggs are high',
    message:
      'High egg ratio — will lean soft and fudgy. Great for brownies, but may not suit all recipes.',
  },
  liquidRed: {
    level: 'red' as const,
    title: 'Liquid too high',
    message: "Way too much liquid — batter will not hold shape and won't bake properly.",
  },
  liquidYellow: {
    level: 'yellow' as const,
    title: 'Moisture is high',
    message:
      'High moisture content — dough will be very soft. Chill well before baking or add more flour.',
  },
  leavenerRed: {
    level: 'red' as const,
    title: 'Leavener too high',
    message:
      'Too much leavener — baked goods will taste bitter or soapy. Typical is about 1–2 tsp baking powder per cup of flour (cakes may use a bit more).',
  },
  leavenerYellow: {
    level: 'yellow' as const,
    title: 'Leavener is high',
    message:
      'Leavener is on the high side — may cause excessive puffing. Fine for pancakes; watch it for dense cookies or lean breads.',
  },
} as const;

function sumCategoryTotals(
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
) {
  const totals: Record<string, number> = {};
  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';
    totals[cat] = (totals[cat] ?? 0) + ri.amount;
  }
  return totals;
}

/** BP / soda / cream of tartar / yeast only — matches Infusion `countsTowardLeavenerFlourRatio`. */
function countsTowardLeavenerFlourRatio(ing: { name: string; category: string } | undefined): boolean {
  if (!ing || ing.category !== 'leavener') return false;
  const n = ing.name.toLowerCase();
  if (n.includes('gelatin')) return false;
  return (
    n.includes('baking powder') ||
    n.includes('baking soda') ||
    n.includes('cream of tartar') ||
    n.includes('cream tartar') ||
    n.includes('yeast')
  );
}

function leavenerGramsForFlourRatio(ingredients: RecipeIngredient[], db: typeof ingredientsDatabase): number {
  return ingredients.reduce((sum, ri) => {
    const ing = db.find(i => i.id === ri.ingredientId);
    return countsTowardLeavenerFlourRatio(ing) ? sum + ri.amount : sum;
  }, 0);
}

/** Structural flour excluding cocoa/chocolate “flour” — matches Infusion egg-ratio denominator. */
function structuralFlourGrams(ingredients: RecipeIngredient[], db: typeof ingredientsDatabase): number {
  let sum = 0;
  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    if (!ing || ing.category !== 'flour') continue;
    const n = ing.name.toLowerCase();
    if (n.includes('cocoa') || n.includes('chocolate')) continue;
    sum += ri.amount;
  }
  return sum;
}

/** Subtract frosting powdered sugar when cream cheese + powdered sugar both present (Infusion `sugarForBakingRatio`). */
function sugarGramsForBakingRatio(
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase,
  totalSugar: number
): number {
  const hasCreamCheese = ingredients.some((ri) => {
    const ing = db.find((i) => i.id === ri.ingredientId);
    return ing?.category === 'dairy' && ing.name.toLowerCase().includes('cream cheese');
  });
  const powdered = ingredients.reduce((acc, ri) => {
    const ing = db.find((i) => i.id === ri.ingredientId);
    if (ing?.category === 'sugar' && ing.name.toLowerCase().includes('powdered')) return acc + ri.amount;
    return acc;
  }, 0);
  if (!hasCreamCheese || powdered <= 0) return totalSugar;
  return Math.max(0, totalSugar - powdered);
}

function isLargestSugarContributor(
  ri: RecipeIngredient,
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): boolean {
  const ing = db.find((i) => i.id === ri.ingredientId);
  if (!ing || ing.category !== 'sugar' || ri.amount <= 0) return false;
  return !ingredients.some((other) => {
    if (other.id === ri.id) return false;
    const o = db.find((i) => i.id === other.ingredientId);
    return o?.category === 'sugar' && other.amount > ri.amount;
  });
}

function isLargestFatContributor(
  ri: RecipeIngredient,
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): boolean {
  const ing = db.find((i) => i.id === ri.ingredientId);
  if (!ing || ing.category !== 'fat' || ri.amount <= 0) return false;
  return !ingredients.some((other) => {
    if (other.id === ri.id) return false;
    const o = db.find((i) => i.id === other.ingredientId);
    return o?.category === 'fat' && other.amount > ri.amount;
  });
}

function isLargestEggContributor(
  ri: RecipeIngredient,
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): boolean {
  const ing = db.find((i) => i.id === ri.ingredientId);
  if (!ing || ing.category !== 'egg' || ri.amount <= 0) return false;
  return !ingredients.some((other) => {
    if (other.id === ri.id) return false;
    const o = db.find((i) => i.id === other.ingredientId);
    return o?.category === 'egg' && other.amount > ri.amount;
  });
}

function isLargestMoistureContributor(
  ri: RecipeIngredient,
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): boolean {
  const ing = db.find((i) => i.id === ri.ingredientId);
  if (!ing || (ing.category !== 'liquid' && ing.category !== 'dairy') || ri.amount <= 0) return false;
  return !ingredients.some((other) => {
    if (other.id === ri.id) return false;
    const o = db.find((i) => i.id === other.ingredientId);
    if (!o || (o.category !== 'liquid' && o.category !== 'dairy')) return false;
    return other.amount > ri.amount;
  });
}

function isLargestLeavenerContributor(
  ri: RecipeIngredient,
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): boolean {
  const ing = db.find((i) => i.id === ri.ingredientId);
  if (!ing || !countsTowardLeavenerFlourRatio(ing) || ri.amount <= 0) return false;
  return !ingredients.some((other) => {
    if (other.id === ri.id) return false;
    const o = db.find((i) => i.id === other.ingredientId);
    return !!o && countsTowardLeavenerFlourRatio(o) && other.amount > ri.amount;
  });
}

function computeWarnings(
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase,
  cookieFamilyId: string
): Record<string, IngredientWarning> {
  const warnings: Record<string, IngredientWarning> = {};
  const profile = ratioProfileForCookieFamily(cookieFamilyId);
  const ratios = getRatioBands(profile);
  const totals = sumCategoryTotals(ingredients, db);

  const flour = totals['flour'] ?? 0;
  const fat = totals['fat'] ?? 0;
  const sugar = totals['sugar'] ?? 0;
  const sugarBalanced = sugarGramsForBakingRatio(ingredients, db, sugar);
  const egg = totals['egg'] ?? 0;
  const liquid = totals['liquid'] ?? 0;
  const dairy = totals['dairy'] ?? 0;
  const leavener = leavenerGramsForFlourRatio(ingredients, db);
  const totalMoisture = egg + liquid + dairy;
  const structural = structuralFlourGrams(ingredients, db);

  if (flour === 0) return warnings;

  const flourDen = Math.max(flour, 1);
  const flourForEgg = Math.max(structural || flour, 1);
  const fatToFlour = fat / flourDen;
  const sugarToFlour = sugarBalanced / flourDen;
  const eggToFlour = egg / flourForEgg;
  const liquidToFlour = totalMoisture / flourDen;
  const leavenerToFlour = leavener / flourDen;

  const skipFatSugarLiquid = profile === 'fried';
  /** Twice-baked / meringue styles where low fat is intentional. */
  const skipFatLowWarning =
    cookieFamilyId === 'biscotti' ||
    cookieFamilyId === 'macaron-meringue';

  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';

    if (!skipFatSugarLiquid && cat === 'fat' && isLargestFatContributor(ri, ingredients, db)) {
      if (fatToFlour > ratios.fatProblem) warnings[ri.id] = { ...SENSEI.fatRed };
      else if (fatToFlour > ratios.fatWarn) warnings[ri.id] = { ...SENSEI.fatYellow };
      else if (!skipFatLowWarning && fatToFlour < 0.25 && flour > 100) warnings[ri.id] = { ...SENSEI.fatLow };
    }

    if (!skipFatSugarLiquid && cat === 'sugar' && isLargestSugarContributor(ri, ingredients, db)) {
      if (sugarToFlour > ratios.sugarProblem) warnings[ri.id] = { ...SENSEI.sugarRed };
      else if (sugarToFlour > ratios.sugarWarn) warnings[ri.id] = { ...SENSEI.sugarYellow };
      else if (sugarToFlour < 0.2 && flour > 100) warnings[ri.id] = { ...SENSEI.sugarLow };
    }

    if (cat === 'egg' && isLargestEggContributor(ri, ingredients, db)) {
      if (eggToFlour > ratios.eggProblem) warnings[ri.id] = { ...SENSEI.eggRed };
      else if (eggToFlour > ratios.eggWarn) warnings[ri.id] = { ...SENSEI.eggYellow };
    }

    if (!skipFatSugarLiquid && (cat === 'liquid' || cat === 'dairy') && isLargestMoistureContributor(ri, ingredients, db)) {
      if (liquidToFlour > ratios.liquidProblem) warnings[ri.id] = { ...SENSEI.liquidRed };
      else if (liquidToFlour > ratios.liquidWarn) warnings[ri.id] = { ...SENSEI.liquidYellow };
    }

    if (cat === 'leavener' && countsTowardLeavenerFlourRatio(ing) && isLargestLeavenerContributor(ri, ingredients, db)) {
      if (leavenerToFlour > ratios.leavenerProblem) warnings[ri.id] = { ...SENSEI.leavenerRed };
      else if (leavenerToFlour > ratios.leavenerWarn) warnings[ri.id] = { ...SENSEI.leavenerYellow };
    }
  }

  return warnings;
}

// ── Density map (g per cup) ──────────────────────────────────
const DENSITY: Record<string, number> = {
  flour:     0.507,
  sugar:     0.845,
  fat:       0.960,
  liquid:    1.000,
  egg:       1.030,
  leavener:  0.934,
  dairy:     1.030,
  chocolate: 0.640,
  default:   0.845,
};

// ── Volumetric units ─────────────────────────────────────────
type VolUnit = 'tsp' | 'tbsp' | 'cups';
const VOL_UNITS: { value: VolUnit; toCups: number }[] = [
  { value: 'tsp',  toCups: 1 / 48 },
  { value: 'tbsp', toCups: 1 / 16 },
  { value: 'cups', toCups: 1      },
];

function gramsToVol(grams: number, category: string, unit: VolUnit): number {
  const d = DENSITY[category] ?? DENSITY.default;
  const u = VOL_UNITS.find(u => u.value === unit)!;
  return grams / (u.toCups * d * 236.588);
}

function volToGrams(val: number, category: string, unit: VolUnit): number {
  const d = DENSITY[category] ?? DENSITY.default;
  const u = VOL_UNITS.find(u => u.value === unit)!;
  return val * u.toCups * d * 236.588;
}

function bestVolUnit(grams: number, category: string): VolUnit {
  const d = DENSITY[category] ?? DENSITY.default;
  const cups = grams / (d * 236.588);
  if (cups >= 0.25) return 'cups';
  if (cups * 16 >= 1) return 'tbsp';
  return 'tsp';
}

// ── Kitchen fractions ────────────────────────────────────────
const FRACS: { val: number; str: string }[] = [
  { val: 0,    str: ''  },
  { val: 1/8,  str: '⅛' },
  { val: 1/4,  str: '¼' },
  { val: 1/3,  str: '⅓' },
  { val: 3/8,  str: '⅜' },
  { val: 1/2,  str: '½' },
  { val: 5/8,  str: '⅝' },
  { val: 2/3,  str: '⅔' },
  { val: 3/4,  str: '¾' },
  { val: 7/8,  str: '⅞' },
  { val: 1,    str: ''  },
];

function snapFrac(decimal: number): { whole: number; fracStr: string } {
  let best = FRACS[0];
  let bestDist = Math.abs(decimal - FRACS[0].val);
  for (const f of FRACS) {
    const d = Math.abs(decimal - f.val);
    if (d < bestDist) { bestDist = d; best = f; }
  }
  if (best.val === 1) return { whole: 1, fracStr: '' };
  return { whole: 0, fracStr: best.str };
}

const SECONDARY: Partial<Record<VolUnit, VolUnit>> = {
  cups: 'tbsp',
  tbsp: 'tsp',
};

function volDecompose(grams: number, category: string, volUnit: VolUnit) {
  const pg = volToGrams(1, category, volUnit);
  const secUnit = SECONDARY[volUnit] ?? null;
  const sg = secUnit ? volToGrams(1, category, secUnit) : null;

  const exact = grams / pg;
  const whole = Math.floor(exact);
  const fracPart = exact - whole;

  if (fracPart > 0.94) {
    return { primaryWhole: whole + 1, primaryFrac: '', primaryGrams: pg, secValue: 0, secUnit, showSec: false };
  }

  let bestFrac = { val: 0, str: '' };
  let bestDist = fracPart;
  for (const f of FRACS.filter(f => f.val > 0 && f.val < 1)) {
    const dist = Math.abs(fracPart - f.val);
    if (dist < bestDist) { bestDist = dist; bestFrac = f; }
  }

  if (bestDist < 0.06) {
    const { whole: fw, fracStr } = snapFrac(fracPart);
    return { primaryWhole: whole + fw, primaryFrac: fracStr, primaryGrams: pg, secValue: 0, secUnit, showSec: false };
  }

  const remainder = grams - whole * pg;
  const secVal = sg ? Math.round((remainder / sg) * 4) / 4 : 0;
  return { primaryWhole: whole, primaryFrac: '', primaryGrams: pg, secValue: secVal, secUnit, showSec: sg !== null && secVal > 0 };
}

// ── Metric units ─────────────────────────────────────────────
type MetricUnit = 'mg' | 'g' | 'kg';
const METRIC_UNITS: { value: MetricUnit; toGrams: number }[] = [
  { value: 'mg', toGrams: 0.001  },
  { value: 'g',  toGrams: 1      },
  { value: 'kg', toGrams: 1000   },
];
function bestMetricUnit(grams: number): MetricUnit {
  if (grams < 1) return 'mg';
  if (grams >= 1000) return 'kg';
  return 'g';
}

// ── Imperial units ────────────────────────────────────────────
type ImperialUnit = 'oz' | 'lb';
const IMPERIAL_UNITS: { value: ImperialUnit; toGrams: number }[] = [
  { value: 'oz', toGrams: 28.3495  },
  { value: 'lb', toGrams: 453.592  },
];
function bestImperialUnit(grams: number): ImperialUnit {
  return grams >= 450 ? 'lb' : 'oz';
}

const CATEGORIES = [
  { id: 'all',       name: 'All',       emoji: '🔍' },
  { id: 'flour',     name: 'Flours',    emoji: '🌾' },
  { id: 'sugar',     name: 'Sugars',    emoji: '🍬' },
  { id: 'fat',       name: 'Fats',      emoji: '🧈' },
  { id: 'egg',       name: 'Eggs',      emoji: '🥚' },
  { id: 'leavener',  name: 'Leaveners', emoji: '⬆️' },
  { id: 'liquid',    name: 'Liquids',   emoji: '💧' },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫' },
  { id: 'nut',       name: 'Nuts',      emoji: '🥜' },
  { id: 'other',     name: 'Other',     emoji: '➕' },
];

const inputCls = 'w-16 text-right text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300';
const selectCls = 'text-xs border border-gray-200 rounded-lg px-1.5 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer';

interface IngredientSelectorProps {
  ingredients: RecipeIngredient[];
  onIngredientsChange: (ingredients: RecipeIngredient[]) => void;
  measurementMode: MeasurementMode;
  /** Cookie type id from `cookieTypes` — selects ratio bands (bar / brownie / fried / etc.). */
  cookieFamilyId: string;
}

// ── Add Modal ────────────────────────────────────────────────
function AddIngredientModal({ existing, onAdd, onClose }: {
  existing: RecipeIngredient[];
  onAdd: (ingredientId: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const existingIds = new Set(existing.map(e => e.ingredientId));

  const filtered = ingredientsDatabase.filter(ing => {
    if (existingIds.has(ing.id)) return false;
    const matchCat = activeCat === 'all' || ing.category === activeCat;
    const matchSearch = ing.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Add Ingredient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ingredients..." className="flex-1 bg-transparent text-sm outline-none text-gray-700" />
            {search && <button onClick={() => setSearch('')}><X className="w-3.5 h-3.5 text-gray-400" /></button>}
          </div>
        </div>
        <div className="flex gap-1.5 p-3 border-b border-gray-100 overflow-x-auto flex-shrink-0">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all'
              ? ingredientsDatabase.filter(i => !existingIds.has(i.id)).length
              : ingredientsDatabase.filter(i => i.category === cat.id && !existingIds.has(i.id)).length;
            if (cat.id !== 'all' && count === 0) return null;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors ${activeCat === cat.id ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={activeCat === cat.id ? { background: 'linear-gradient(135deg, #c0392b, #e67e22)' } : {}}>
                {cat.emoji} {cat.name} ({count})
              </button>
            );
          })}
        </div>
        <div className="overflow-y-auto flex-1 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map(ing => (
              <button key={ing.id} onClick={() => { onAdd(ing.id); onClose(); }}
                className="text-left p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{CATEGORIES.find(c => c.id === ing.category)?.emoji ?? '➕'}</span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-red-700">{ing.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {ing.calories} kcal · {ing.fat?.toFixed(1) ?? 0}g fat · {ing.sugar?.toFixed(1) ?? 0}g sugar
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No ingredients found</div>}
        </div>
      </div>
    </div>
  );
}

// ── Ingredient Row ────────────────────────────────────────────
function IngredientRow({ recipeIng, measurementMode, onAmountChange, onUnitChange, onEggSizeChange, onRemove, warning }: {
  recipeIng: RecipeIngredient;
  measurementMode: MeasurementMode;
  onAmountChange: (id: string, grams: number) => void;
  onUnitChange: (id: string, unit: UnitType) => void;
  onEggSizeChange: (id: string, size: EggSize) => void;
  onRemove: (id: string) => void;
  warning?: IngredientWarning;
}) {
  const ingredient = ingredientsDatabase.find(i => i.id === recipeIng.ingredientId);
  const displayName = ingredient?.name || recipeIng.customName || 'Custom Ingredient';
  const category = ingredient?.category || 'default';
  const catEmoji = CATEGORIES.find(c => c.id === category)?.emoji ?? '➕';
  const isEgg = ingredient?.category === 'egg';
  const currentEggSize = recipeIng.eggSize || 'medium';

  const [metricUnit, setMetricUnit] = useState<MetricUnit>(() => bestMetricUnit(recipeIng.amount));
  const [imperialUnit, setImperialUnit] = useState<ImperialUnit>(() => bestImperialUnit(recipeIng.amount));
  const [volUnit, setVolUnit] = useState<VolUnit>(() => bestVolUnit(recipeIng.amount, category));

  useEffect(() => { setMetricUnit(bestMetricUnit(recipeIng.amount)); }, [recipeIng.id]);
  useEffect(() => { setImperialUnit(bestImperialUnit(recipeIng.amount)); }, [recipeIng.id]);
  useEffect(() => { setVolUnit(bestVolUnit(recipeIng.amount, category)); }, [recipeIng.id]);

  const vol = volDecompose(recipeIng.amount, category, volUnit);

  const handlePrimaryVolChange = (val: number) => {
    const fracG = vol.primaryFrac
      ? (FRACS.find(f => f.str === vol.primaryFrac)?.val ?? 0) * vol.primaryGrams : 0;
    const secG = vol.showSec && vol.secUnit ? vol.secValue * volToGrams(1, category, vol.secUnit) : 0;
    onAmountChange(recipeIng.id, Math.max(0, val) * vol.primaryGrams + fracG + secG);
  };

  const handleSecVolChange = (val: number) => {
    const fracG = vol.primaryFrac
      ? (FRACS.find(f => f.str === vol.primaryFrac)?.val ?? 0) * vol.primaryGrams : 0;
    onAmountChange(recipeIng.id, vol.primaryWhole * vol.primaryGrams + fracG + Math.max(0, val) * volToGrams(1, category, vol.secUnit!));
  };

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 py-2">
      <span className="text-base flex-shrink-0">{catEmoji}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 truncate">{displayName}</div>
        <div className="text-xs text-gray-400 capitalize">{category}</div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
        {isEgg ? (
          <>
            <input type="number" value={Math.max(1, Math.round(recipeIng.amount / EGG_WEIGHTS[currentEggSize]))}
              min={1} step={1} onChange={e => onAmountChange(recipeIng.id, (parseInt(e.target.value) || 1) * EGG_WEIGHTS[currentEggSize])}
              className={inputCls} />
            <select value={currentEggSize} onChange={e => onEggSizeChange(recipeIng.id, e.target.value as EggSize)} className={selectCls}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </>
        ) : measurementMode === 'metric' ? (
          <>
            <input type="number"
              value={parseFloat((recipeIng.amount / (METRIC_UNITS.find(u => u.value === metricUnit)!.toGrams)).toFixed(metricUnit === 'mg' ? 0 : metricUnit === 'kg' ? 4 : 2))}
              min={0} onChange={e => onAmountChange(recipeIng.id, (parseFloat(e.target.value) || 0) * METRIC_UNITS.find(u => u.value === metricUnit)!.toGrams)}
              className={inputCls} />
            <select value={metricUnit} onChange={e => setMetricUnit(e.target.value as MetricUnit)} className={selectCls}>
              {METRIC_UNITS.map(u => <option key={u.value} value={u.value}>{u.value}</option>)}
            </select>
          </>
        ) : measurementMode === 'imperial' ? (
          <>
            <input type="number"
              value={parseFloat((recipeIng.amount / IMPERIAL_UNITS.find(u => u.value === imperialUnit)!.toGrams).toFixed(imperialUnit === 'lb' ? 3 : 2))}
              min={0} onChange={e => onAmountChange(recipeIng.id, (parseFloat(e.target.value) || 0) * IMPERIAL_UNITS.find(u => u.value === imperialUnit)!.toGrams)}
              className={inputCls} />
            <select value={imperialUnit} onChange={e => setImperialUnit(e.target.value as ImperialUnit)} className={selectCls}>
              {IMPERIAL_UNITS.map(u => <option key={u.value} value={u.value}>{u.value}</option>)}
            </select>
          </>
        ) : (
          <>
            <input type="number" value={vol.primaryWhole} min={0} step={1}
              onChange={e => handlePrimaryVolChange(parseFloat(e.target.value) || 0)}
              className={inputCls} />
            {vol.primaryFrac && (
              <span className="text-sm font-bold text-gray-700">{vol.primaryFrac}</span>
            )}
            <select value={volUnit} onChange={e => setVolUnit(e.target.value as VolUnit)} className={selectCls}>
              {VOL_UNITS.map(u => <option key={u.value} value={u.value}>{u.value}</option>)}
            </select>
            {vol.showSec && vol.secUnit && (
              <>
                <span className="text-gray-400 text-xs">+</span>
                <input type="number" value={vol.secValue} min={0} step={0.25}
                  onChange={e => handleSecVolChange(parseFloat(e.target.value) || 0)}
                  className={inputCls} />
                <span className="text-xs text-gray-500 font-medium">{vol.secUnit}</span>
              </>
            )}
          </>
        )}

        <button onClick={() => onRemove(recipeIng.id)} className="text-gray-300 hover:text-red-500 transition-colors ml-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      </div>
      {warning && (
        <div
          className={cn(
            'mb-2 px-3 py-2 rounded-lg text-xs border flex gap-2 items-start',
            warning.level === 'red'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-amber-50/90 text-amber-950 border-amber-500/35',
          )}
        >
          <AlertCircle
            className={cn(
              'w-4 h-4 flex-shrink-0 mt-0.5',
              warning.level === 'red' ? 'text-red-600' : 'text-amber-600',
            )}
            aria-hidden
          />
          <div className="min-w-0 space-y-0.5">
            <div className="font-semibold leading-tight">{warning.title}</div>
            <p className="text-[11px] leading-snug opacity-95 m-0">{warning.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Recipe Summary Engine ─────────────────────────────────────
interface RecipeSummary {
  headline: string;
  description: string;
  tags: { label: string; color: string }[];
  severity: 'good' | 'warning' | 'problem';
}

function computeRecipeSummary(
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase,
  cookieFamilyId: string
): RecipeSummary | null {
  if (ingredients.length === 0) return null;

  const profile = ratioProfileForCookieFamily(cookieFamilyId);
  const ratios = getRatioBands(profile);
  const skipFatSugarLiquid = profile === 'fried';

  const totals: Record<string, number> = {};
  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';
    totals[cat] = (totals[cat] ?? 0) + ri.amount;
  }

  const flour    = totals['flour']    ?? 0;
  const fat      = totals['fat']      ?? 0;
  const sugar    = totals['sugar']    ?? 0;
  const sugarBalanced = sugarGramsForBakingRatio(ingredients, db, sugar);
  const egg      = totals['egg']      ?? 0;
  const liquid   = totals['liquid']   ?? 0;
  const dairy    = totals['dairy']    ?? 0;
  const leavenerChem = leavenerGramsForFlourRatio(ingredients, db);
  const totalMoisture = egg + liquid + dairy;
  const structural = structuralFlourGrams(ingredients, db);
  const flourDen = Math.max(flour, 1);
  const flourForEgg = Math.max(structural || flour, 1);

  if (flour === 0 && isFlourlessCookieFamily(cookieFamilyId)) {
    return {
      headline: '✅ No-bake or flourless style',
      description:
        'This cookie type sets from sugar, oats, nut butter, or egg foam—not from wheat flour. Flour-based ratio warnings for drop cookies do not apply here.',
      tags: [{ label: 'No wheat flour', color: 'green' }],
      severity: 'good',
    };
  }

  if (flour === 0) {
    return {
      headline: '🌾 No flour detected',
      description: 'Add flour to anchor your recipe. Without flour, there\'s no structure to hold the cookie together.',
      tags: [{ label: 'Missing structure', color: 'red' }],
      severity: 'problem',
    };
  }

  const fatRatio      = fat / flourDen;
  const sugarRatio    = sugarBalanced / flourDen;
  const eggRatio      = egg / flourForEgg;
  /** Same denominator as classic chewy heuristics (total flour weight). */
  const eggRatioByTotalFlour = egg / flourDen;
  const moistureRatio = totalMoisture / flourDen;
  const leavenerRatio = leavenerChem / flourDen;

  const issues: string[] = [];
  const tags: { label: string; color: string }[] = [];
  let severity: 'good' | 'warning' | 'problem' = 'good';

  // ── Diagnose each ratio (family-specific bands) ──
  const tooMuchSugar   = sugarRatio > ratios.sugarWarn;
  const wayTooMuchSugar = sugarRatio > ratios.sugarProblem;
  const tooManyEggs    = eggRatio > ratios.eggWarn;
  const tooMuchFat     = fatRatio > ratios.fatWarn;
  const tooLittleFat   = fatRatio < 0.25 && flour > 100;
  const tooMuchLiquid  = moistureRatio > ratios.liquidWarn;
  const wayTooMuchLiquid = moistureRatio > ratios.liquidProblem;
  const tooMuchLeavener = leavenerRatio > ratios.leavenerWarn;

  if (!skipFatSugarLiquid && wayTooMuchLiquid) {
    return {
      headline: '💧 This will not bake into cookies',
      description: 'The liquid content is far too high relative to flour. This batter will not hold any shape — it will spread into a puddle or just make hot liquid. Dramatically reduce milk/liquid or add much more flour.',
      tags: [{ label: 'Too much liquid', color: 'red' }, { label: 'Won\'t bake', color: 'red' }],
      severity: 'problem',
    };
  }

  if (!skipFatSugarLiquid && wayTooMuchSugar && eggRatio > ratios.eggWarn && fatRatio < ratios.fatWarn) {
    return {
      headline: '🍬 Thin, crispy edges — puffy cakey center',
      description: 'These cookies will spread excessively due to high sugar and low flour, creating thin crispy edges with a soft, cakey center from the high egg ratio. Expect very sweet flavor and potential over-browning on the edges.',
      tags: [
        { label: 'Overly sweet', color: 'red' },
        { label: 'Excessive spread', color: 'red' },
        { label: 'Cakey center', color: 'yellow' },
        { label: 'Dark edges', color: 'yellow' },
      ],
      severity: 'problem',
    };
  }

  // Build issues list
  if (!skipFatSugarLiquid && wayTooMuchSugar) { issues.push('sugar is very high — expect thin, sweet, fast-browning cookies'); tags.push({ label: 'Too much sugar', color: 'red' }); severity = 'problem'; }
  else if (!skipFatSugarLiquid && tooMuchSugar) { issues.push('sugar is elevated — cookies will spread more and brown faster'); tags.push({ label: 'High sugar', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (!skipFatSugarLiquid && fatRatio > ratios.fatProblem) { issues.push('butter is very high — cookies will be greasy and spread flat'); tags.push({ label: 'Too much fat', color: 'red' }); severity = 'problem'; }
  else if (!skipFatSugarLiquid && tooMuchFat) { issues.push('butter is elevated — expect significant spread, chill dough before baking'); tags.push({ label: 'High fat', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }
  else if (!skipFatSugarLiquid && tooLittleFat) { issues.push('low butter for this flour — dough may be dry and stiff'); tags.push({ label: 'Low fat', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (eggRatio > ratios.eggProblem) { issues.push('too many eggs for this flour — cookies will be puffy and cakey'); tags.push({ label: 'Too many eggs', color: 'red' }); severity = 'problem'; }
  else if (tooManyEggs) { issues.push('high egg ratio — cookies will lean soft and cakey'); tags.push({ label: 'High eggs', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (!skipFatSugarLiquid && tooMuchLiquid) { issues.push('liquid is high — dough will be very soft, needs chilling or more flour'); tags.push({ label: 'High moisture', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (leavenerRatio > ratios.leavenerProblem) { issues.push('leavener is very high — cookies may taste bitter or soapy'); tags.push({ label: 'Too much leavener', color: 'red' }); severity = 'problem'; }
  else if (tooMuchLeavener) { issues.push('leavener is slightly high — may cause excessive puffing'); tags.push({ label: 'High leavener', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  // ── Positive descriptions when balanced ──
  if (severity === 'good') {
    const chewy   = fatRatio >= 0.35 && fatRatio <= 0.55 && sugarRatio >= 0.4 && sugarRatio <= 0.7 && eggRatioByTotalFlour >= 0.15 && eggRatioByTotalFlour <= 0.35;
    const crispy  = fatRatio >= 0.3 && sugarRatio >= 0.6 && eggRatioByTotalFlour < 0.25 && moistureRatio < 0.3;
    const cakey   = eggRatioByTotalFlour > 0.3 && moistureRatio > 0.3 && fatRatio < 0.4;
    const buttery = fatRatio > 0.55 && sugarRatio < 0.5;

    if (chewy) {
      return { headline: '✅ Well-balanced — Classic Chewy Cookie', description: 'Your ratios are dialed in for a classic chewy cookie with a soft center and slightly crisp edges. The fat, sugar, and egg balance looks great.', tags: [{ label: 'Chewy', color: 'green' }, { label: 'Balanced', color: 'green' }], severity: 'good' };
    }
    if (crispy) {
      return { headline: '✅ Balanced — Crispy Cookie Profile', description: 'Higher sugar and moderate fat with low moisture points toward a crispy, snappy cookie. Expect good browning and thin, crunchy texture.', tags: [{ label: 'Crispy', color: 'green' }, { label: 'Good spread', color: 'green' }], severity: 'good' };
    }
    if (cakey) {
      return { headline: '✅ Balanced — Soft Cake-Style Cookie', description: 'High eggs and moisture with moderate fat gives a pillowy, cake-like cookie. Great for frosted sugar cookies or pumpkin cookies.', tags: [{ label: 'Soft & cakey', color: 'green' }, { label: 'Balanced', color: 'green' }], severity: 'good' };
    }
    if (buttery) {
      return { headline: '✅ Balanced — Buttery Shortbread Style', description: 'High fat and low sugar/egg points to a rich, crumbly, shortbread-style cookie. Minimal spread, melt-in-mouth texture.', tags: [{ label: 'Shortbread style', color: 'green' }, { label: 'Rich', color: 'green' }], severity: 'good' };
    }
    return { headline: '✅ Recipe looks balanced', description: 'Your ingredient ratios are within normal baking ranges. Add more ingredients to refine the profile.', tags: [{ label: 'Balanced', color: 'green' }], severity: 'good' };
  }

  // Build summary from issues
  const headline = severity === 'problem'
    ? `⚠️ Recipe has ${issues.length > 1 ? 'multiple issues' : 'an issue'} to fix`
    : `💡 Recipe has ${issues.length} thing${issues.length > 1 ? 's' : ''} to watch`;

  const description = issues.length === 1
    ? `${issues[0].charAt(0).toUpperCase()}${issues[0].slice(1)}.`
    : `${issues.map((s, i) => `${i + 1}. ${s.charAt(0).toUpperCase()}${s.slice(1)}`).join('. ')}.`;

  return { headline, description, tags, severity };
}

function RecipeSummaryCard({ ingredients, cookieFamilyId }: { ingredients: RecipeIngredient[]; cookieFamilyId: string }) {
  const summary = computeRecipeSummary(ingredients, ingredientsDatabase, cookieFamilyId);
  if (!summary) return null;

  const bgClass = summary.severity === 'good'
    ? 'bg-green-50 border-green-200'
    : summary.severity === 'problem'
    ? 'bg-red-50 border-red-200'
    : 'bg-yellow-50 border-yellow-200';

  const headlineClass = summary.severity === 'good'
    ? 'text-green-800'
    : summary.severity === 'problem'
    ? 'text-red-800'
    : 'text-yellow-800';

  const descClass = summary.severity === 'good'
    ? 'text-green-700'
    : summary.severity === 'problem'
    ? 'text-red-700'
    : 'text-yellow-700';

  const tagColors: Record<string, string> = {
    red:    'bg-red-100 text-red-700 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    green:  'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className={`rounded-xl border p-3 ${bgClass}`}>
      <div className={`text-sm font-bold mb-1 ${headlineClass}`}>{summary.headline}</div>
      <p className={`text-xs leading-relaxed mb-2 ${descClass}`}>{summary.description}</p>
      {summary.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {summary.tags.map((tag, i) => (
            <span key={i} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tagColors[tag.color] ?? tagColors.yellow}`}>
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export function IngredientSelector({ ingredients, onIngredientsChange, measurementMode, cookieFamilyId }: IngredientSelectorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const warnings = computeWarnings(ingredients, ingredientsDatabase, cookieFamilyId);

  const addIngredient = (ingredientId: string) => {
    const ingredient = ingredientsDatabase.find(i => i.id === ingredientId);
    const isEgg = ingredient?.category === 'egg';
    onIngredientsChange([...ingredients, {
      id: Date.now().toString(),
      ingredientId,
      amount: isEgg ? EGG_WEIGHTS.medium : 100,
      displayUnit: 'g',
      eggSize: isEgg ? 'medium' : undefined,
    }]);
  };

  return (
    <div className="space-y-3">
      {ingredients.length > 0 ? (
        <div>
          {ingredients.map(recipeIng => (
            <IngredientRow
              key={recipeIng.id}
              recipeIng={recipeIng}
              measurementMode={measurementMode}
              warning={warnings[recipeIng.id]}
              onAmountChange={(id, grams) => onIngredientsChange(ingredients.map(i => i.id === id ? { ...i, amount: grams } : i))}
              onUnitChange={(id, unit) => onIngredientsChange(ingredients.map(i => i.id === id ? { ...i, displayUnit: unit } : i))}
              onEggSizeChange={(id, size) => onIngredientsChange(ingredients.map(i => i.id === id ? { ...i, eggSize: size, amount: EGG_WEIGHTS[size] } : i))}
              onRemove={id => onIngredientsChange(ingredients.filter(i => i.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400 text-sm">
          No ingredients yet. Click Add Ingredient to start.
        </div>
      )}

      <RecipeSummaryCard ingredients={ingredients} cookieFamilyId={cookieFamilyId} />

      <div className="flex gap-2 pt-1">
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}>
          <Plus className="w-4 h-4" /> Add Ingredient
        </button>
        <button onClick={() => setShowCustomDialog(true)}
          className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Custom
        </button>
      </div>

      {showAddModal && (
        <AddIngredientModal existing={ingredients} onAdd={addIngredient} onClose={() => setShowAddModal(false)} />
      )}
      {showCustomDialog && (
        <CustomIngredientDialog
          onClose={() => setShowCustomDialog(false)}
          onAdd={customIngredient => { onIngredientsChange([...ingredients, customIngredient]); setShowCustomDialog(false); }}
        />
      )}
    </div>
  );
}
