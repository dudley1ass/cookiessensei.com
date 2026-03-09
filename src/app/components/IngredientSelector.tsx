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
function IngredientRow({ recipeIng, measurementMode, onAmountChange, onUnitChange, onEggSizeChange, onRemove }: {
  recipeIng: RecipeIngredient;
  measurementMode: MeasurementMode;
  onAmountChange: (id: string, grams: number) => void;
  onUnitChange: (id: string, unit: UnitType) => void;
  onEggSizeChange: (id: string, size: EggSize) => void;
  onRemove: (id: string) => void;
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

  useEffect(() => { setMetricUnit(bestMetricUnit(recipeIng.amount)); }, [recipeIng.id, recipeIng.amount]);
  useEffect(() => { setImperialUnit(bestImperialUnit(recipeIng.amount)); }, [recipeIng.id, recipeIng.amount]);
  useEffect(() => { setVolUnit(bestVolUnit(recipeIng.amount, category)); }, [recipeIng.id, recipeIng.amount, category]);

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
    <div className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
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
          // Volumetric — whole number + fraction label + unit + optional secondary
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
  );
}

// ── Main Component ────────────────────────────────────────────
export function IngredientSelector({ ingredients, onIngredientsChange, measurementMode }: IngredientSelectorProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);

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
