import { useState, useEffect } from 'react';
import { Plus, X, Search, Trash2 } from 'lucide-react';
import { ingredientsDatabase } from '../data/ingredients';
import { RecipeIngredient, UnitType, EggSize } from '../types/cookie';
import { CustomIngredientDialog } from './CustomIngredientDialog';

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
// All thresholds are ratios relative to flour (the baseline structural ingredient).
// Warnings are suppressed when compensating ingredients bring the recipe back into balance.

interface IngredientWarning {
  level: 'yellow' | 'red';
  message: string;
}

function computeWarnings(
  ingredients: RecipeIngredient[],
  db: typeof ingredientsDatabase
): Record<string, IngredientWarning> {
  const warnings: Record<string, IngredientWarning> = {};

  // Sum grams by category
  const totals: Record<string, number> = {};
  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';
    totals[cat] = (totals[cat] ?? 0) + ri.amount;
  }

  const flour    = totals['flour']    ?? 0;
  const fat      = totals['fat']      ?? 0;
  const sugar    = totals['sugar']    ?? 0;
  const egg      = totals['egg']      ?? 0;
  const liquid   = totals['liquid']   ?? 0;
  const dairy    = totals['dairy']    ?? 0;
  const leavener = totals['leavener'] ?? 0;

  // Total moisture = eggs + liquid + dairy (all contribute moisture)
  const totalMoisture = egg + liquid + dairy;
  // Total structure = flour + egg protein
  const totalStructure = flour + egg * 0.5;
  // Total flow = fat + sugar (drive spread)
  const totalFlow = fat + sugar;

  // Only run checks if flour is present (anchor ingredient)
  if (flour === 0) return warnings;

  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';
    const g = ri.amount;

    if (cat === 'flour') {
      // Flour vs fat ratio — too much flour without enough fat/moisture
      const flourToFat = flour / Math.max(fat, 1);
      if (flourToFat > 3.5 && totalMoisture < flour * 0.4) {
        warnings[ri.id] = { level: 'red', message: 'Way too much flour for this fat & moisture — cookies will be dry and crumbly. Add more butter, eggs, or liquid.' };
      } else if (flourToFat > 2.8 && totalMoisture < flour * 0.5) {
        warnings[ri.id] = { level: 'yellow', message: 'Flour is high relative to fat and moisture — consider adding more butter or eggs for balance.' };
      }
    }

    if (cat === 'fat') {
      const fatToFlour = fat / Math.max(flour, 1);
      if (fatToFlour > 0.85) {
        warnings[ri.id] = { level: 'red', message: 'Too much fat — cookies will be greasy and spread into flat puddles. Reduce butter or add more flour.' };
      } else if (fatToFlour > 0.65) {
        warnings[ri.id] = { level: 'yellow', message: 'Fat is on the high side — expect significant spread. May need chilling before baking.' };
      } else if (fatToFlour < 0.25 && flour > 100) {
        warnings[ri.id] = { level: 'yellow', message: 'Low fat for this amount of flour — cookies may be dry and tough.' };
      }
    }

    if (cat === 'sugar') {
      const sugarToFlour = sugar / Math.max(flour, 1);
      if (sugarToFlour > 1.2) {
        warnings[ri.id] = { level: 'red', message: 'Too much sugar — cookies will be overly sweet, thin, and burn easily. Reduce sugar or add more flour.' };
      } else if (sugarToFlour > 0.95) {
        warnings[ri.id] = { level: 'yellow', message: 'Sugar is high — expect more spread and browning. Watch bake time carefully.' };
      } else if (sugarToFlour < 0.2 && flour > 100) {
        warnings[ri.id] = { level: 'yellow', message: 'Low sugar — cookies may be pale, bland, and dense.' };
      }
    }

    if (cat === 'egg') {
      const eggToFlour = egg / Math.max(flour, 1);
      if (eggToFlour > 0.6) {
        warnings[ri.id] = { level: 'red', message: 'Too many eggs for this flour — cookies will be puffy and cakey, not chewy. Reduce eggs or add more flour.' };
      } else if (eggToFlour > 0.45) {
        warnings[ri.id] = { level: 'yellow', message: 'High egg ratio — cookies will lean cakey. Good for soft cookies, but may not be what you want.' };
      }
    }

    if (cat === 'liquid' || cat === 'dairy') {
      const liquidToFlour = totalMoisture / Math.max(flour, 1);
      if (liquidToFlour > 1.1) {
        warnings[ri.id] = { level: 'red', message: 'Way too much liquid — batter will not hold shape and cookies won\'t bake properly. This will make hot liquid, not cookies.' };
      } else if (liquidToFlour > 0.7) {
        warnings[ri.id] = { level: 'yellow', message: 'High moisture content — dough will be very soft. Chill well before baking or add more flour.' };
      }
    }

    if (cat === 'leavener') {
      // Baking soda/powder ratio to flour (typical: 1 tsp baking soda per 280g flour = ~5g)
      const leavenerToFlour = leavener / Math.max(flour, 1);
      if (leavenerToFlour > 0.04) {
        warnings[ri.id] = { level: 'red', message: 'Too much leavener — cookies will taste bitter and soapy. Typical is 1 tsp per 2.25 cups flour.' };
      } else if (leavenerToFlour > 0.025) {
        warnings[ri.id] = { level: 'yellow', message: 'Leavener is on the high side — may cause excessive puffing and a slightly off taste.' };
      }
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
        <div className={`mb-2 px-3 py-1.5 rounded-lg text-xs flex items-start gap-1.5 ${
          warning.level === 'red'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
        }`}>
          <span className="flex-shrink-0 mt-0.5">{warning.level === 'red' ? '🚨' : '⚠️'}</span>
          <span>{warning.message}</span>
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
  db: typeof ingredientsDatabase
): RecipeSummary | null {
  if (ingredients.length === 0) return null;

  const totals: Record<string, number> = {};
  for (const ri of ingredients) {
    const ing = db.find(i => i.id === ri.ingredientId);
    const cat = ing?.category ?? 'other';
    totals[cat] = (totals[cat] ?? 0) + ri.amount;
  }

  const flour    = totals['flour']    ?? 0;
  const fat      = totals['fat']      ?? 0;
  const sugar    = totals['sugar']    ?? 0;
  const egg      = totals['egg']      ?? 0;
  const liquid   = totals['liquid']   ?? 0;
  const dairy    = totals['dairy']    ?? 0;
  const leavener = totals['leavener'] ?? 0;
  const totalMoisture = egg + liquid + dairy;

  if (flour === 0) {
    return {
      headline: '🌾 No flour detected',
      description: 'Add flour to anchor your recipe. Without flour, there\'s no structure to hold the cookie together.',
      tags: [{ label: 'Missing structure', color: 'red' }],
      severity: 'problem',
    };
  }

  const fatRatio      = fat / flour;
  const sugarRatio    = sugar / flour;
  const eggRatio      = egg / flour;
  const moistureRatio = totalMoisture / flour;
  const leavenerRatio = leavener / flour;

  const issues: string[] = [];
  const tags: { label: string; color: string }[] = [];
  let severity: 'good' | 'warning' | 'problem' = 'good';

  // ── Diagnose each ratio ──
  const tooMuchSugar   = sugarRatio > 0.95;
  const wayTooMuchSugar = sugarRatio > 1.2;
  const tooLittleFlour = fatRatio > 0.65 || sugarRatio > 0.85;
  const tooManyEggs    = eggRatio > 0.45;
  const tooMuchFat     = fatRatio > 0.65;
  const tooLittleFat   = fatRatio < 0.25 && flour > 100;
  const tooMuchLiquid  = moistureRatio > 0.9;
  const wayTooMuchLiquid = moistureRatio > 1.1;
  const tooMuchLeavener = leavenerRatio > 0.025;

  if (wayTooMuchLiquid) {
    return {
      headline: '💧 This will not bake into cookies',
      description: 'The liquid content is far too high relative to flour. This batter will not hold any shape — it will spread into a puddle or just make hot liquid. Dramatically reduce milk/liquid or add much more flour.',
      tags: [{ label: 'Too much liquid', color: 'red' }, { label: 'Won\'t bake', color: 'red' }],
      severity: 'problem',
    };
  }

  if (wayTooMuchSugar && eggRatio > 0.35 && fatRatio < 0.5) {
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
  if (wayTooMuchSugar) { issues.push('sugar is very high — expect thin, sweet, fast-browning cookies'); tags.push({ label: 'Too much sugar', color: 'red' }); severity = 'problem'; }
  else if (tooMuchSugar) { issues.push('sugar is elevated — cookies will spread more and brown faster'); tags.push({ label: 'High sugar', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (fatRatio > 0.85) { issues.push('butter is very high — cookies will be greasy and spread flat'); tags.push({ label: 'Too much fat', color: 'red' }); severity = 'problem'; }
  else if (tooMuchFat) { issues.push('butter is elevated — expect significant spread, chill dough before baking'); tags.push({ label: 'High fat', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }
  else if (tooLittleFat) { issues.push('low butter for this flour — dough may be dry and stiff'); tags.push({ label: 'Low fat', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (eggRatio > 0.6) { issues.push('too many eggs for this flour — cookies will be puffy and cakey'); tags.push({ label: 'Too many eggs', color: 'red' }); severity = 'problem'; }
  else if (tooManyEggs) { issues.push('high egg ratio — cookies will lean soft and cakey'); tags.push({ label: 'High eggs', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (tooMuchLiquid) { issues.push('liquid is high — dough will be very soft, needs chilling or more flour'); tags.push({ label: 'High moisture', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  if (leavenerRatio > 0.04) { issues.push('leavener is very high — cookies may taste bitter or soapy'); tags.push({ label: 'Too much leavener', color: 'red' }); severity = 'problem'; }
  else if (tooMuchLeavener) { issues.push('leavener is slightly high — may cause excessive puffing'); tags.push({ label: 'High leavener', color: 'yellow' }); if (severity === 'good') severity = 'warning'; }

  // ── Positive descriptions when balanced ──
  if (severity === 'good') {
    const chewy   = fatRatio >= 0.35 && fatRatio <= 0.55 && sugarRatio >= 0.4 && sugarRatio <= 0.7 && eggRatio >= 0.15 && eggRatio <= 0.35;
    const crispy  = fatRatio >= 0.3 && sugarRatio >= 0.6 && eggRatio < 0.25 && moistureRatio < 0.3;
    const cakey   = eggRatio > 0.3 && moistureRatio > 0.3 && fatRatio < 0.4;
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

function RecipeSummaryCard({ ingredients }: { ingredients: RecipeIngredient[] }) {
  const summary = computeRecipeSummary(ingredients, ingredientsDatabase);
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
export function IngredientSelector({ ingredients, onIngredientsChange, measurementMode }: IngredientSelectorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const warnings = computeWarnings(ingredients, ingredientsDatabase);

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

      <RecipeSummaryCard ingredients={ingredients} />

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
