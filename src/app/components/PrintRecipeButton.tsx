import { Printer } from 'lucide-react';
import { CookieMetrics } from '../types/cookie';
import { CookieType } from '../types/cookieTypes';
import { getBakingDataForPrint } from './BakingInstructions';

interface PrintRecipeButtonProps {
  metrics: CookieMetrics;
  cookieType: CookieType;
  recipeTitle?: string | null;
  ingredients: Array<{ name: string; amount: string }>;
  servingSize: number;
  servingsPerRecipe: number;
  cookieCount: number;
  measurementMode: 'metric' | 'imperial' | 'volumetric';
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function PrintRecipeButton({
  metrics,
  cookieType,
  recipeTitle,
  ingredients,
  servingSize,
  servingsPerRecipe,
  cookieCount,
  measurementMode,
}: PrintRecipeButtonProps) {
  const handlePrint = () => {
    const factor = servingSize / 100;
    const cal = ((metrics.calories || 0) * factor).toFixed(0);
    const fat = ((metrics.fat || 0) * factor).toFixed(1);
    const satFat = ((metrics.saturatedFat || 0) * factor).toFixed(1);
    const transFat = ((metrics.transFat || 0) * factor).toFixed(1);
    const chol = ((metrics.cholesterol || 0) * factor).toFixed(0);
    const carbs = ((metrics.carbs || 0) * factor).toFixed(1);
    const fiber = ((metrics.fiber || 0) * factor).toFixed(1);
    const sugar = ((metrics.sugar || 0) * factor).toFixed(1);
    const addedSugar = ((metrics.addedSugar || 0) * factor).toFixed(1);
    const protein = ((metrics.protein || 0) * factor).toFixed(1);
    const sodium = ((metrics.sodium || 0) * factor).toFixed(0);

    const fatDV = (((metrics.fat || 0) * factor) / 78 * 100).toFixed(0);
    const satFatDV = (((metrics.saturatedFat || 0) * factor) / 20 * 100).toFixed(0);
    const cholDV = (((metrics.cholesterol || 0) * factor) / 300 * 100).toFixed(0);
    const carbsDV = (((metrics.carbs || 0) * factor) / 275 * 100).toFixed(0);
    const fiberDV = (((metrics.fiber || 0) * factor) / 28 * 100).toFixed(0);
    const sodiumDV = (((metrics.sodium || 0) * factor) / 2300 * 100).toFixed(0);

    const formatWeight = (g: number) => {
      if (measurementMode === 'imperial') return `${(g * 0.035274).toFixed(2)} oz`;
      if (measurementMode === 'volumetric') return `${(g / 236.588).toFixed(2)} cups`;
      return `${g.toFixed(0)} g`;
    };

    const articleLink = cookieType.articleUrl
      ? `<p style="margin:4px 0 0;font-size:10px;color:#888;">Learn more: <a href="${esc(cookieType.articleUrl)}" style="color:#c0392b;">${esc(cookieType.articleUrl)}</a></p>`
      : '';

    const ingredientRows = ingredients
      .map(
        ing =>
          `<tr><td style="padding:3px 6px 3px 0;font-size:11px;color:#333;">${esc(ing.name)}</td><td style="padding:3px 0;font-size:11px;color:#555;text-align:right;">${esc(ing.amount)}</td></tr>`
      )
      .join('');

    const bd = getBakingDataForPrint(cookieType.id);
    const prepLen = bd?.prepSteps.length ?? 0;
    const prepLis =
      bd?.prepSteps.map((step, i) => `<li style="margin:0 0 4px 0;">${esc(step)}</li>`).join('') ?? '';
    const bakeLis =
      bd?.bakingSteps.map((step, i) => `<li style="margin:0 0 4px 0;">${esc(step)}</li>`).join('') ?? '';

    const bakeMeta =
      bd && cookieType.id !== 'no-bake'
        ? `<p style="font-size:11px;color:#555;margin:0 0 8px 0;"><strong>Oven:</strong> ${bd.tempF}°F (${bd.tempC}°C) · <strong>Time:</strong> ${bd.timeMin}–${bd.timeMax} min${cookieType.id === 'biscotti' ? ' (first bake)' : ''}</p>`
        : '';

    const donenessBlock =
      bd?.doneness && bd.doneness.length > 0
        ? `<p style="font-size:10px;color:#444;margin:8px 0 0 0;line-height:1.35;"><strong>Doneness:</strong> ${esc(bd.doneness)}</p>`
        : '';

    const displayRecipeName = recipeTitle?.trim() || cookieType.examples[0] || cookieType.name;

    const leaveningBlock =
      metrics.leaveningWarnings && metrics.leaveningWarnings.length > 0
        ? `<div style="margin-bottom:12px;">
            <div class="section-title">Leavening notes</div>
            ${metrics.leaveningWarnings.map(w => `<div style="font-size:10px;color:#5c4810;background:#fef9e7;border:1px solid #f0c040;border-radius:6px;padding:6px 8px;margin-bottom:6px;">${esc(w)}</div>`).join('')}
          </div>`
        : '';

    const sugarG = metrics.totalActualSugar != null ? metrics.totalActualSugar.toFixed(0) : '—';
    const sugarPct =
      metrics.sugarContentPercent != null ? metrics.sugarContentPercent.toFixed(1) : '—';

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${esc(cookieType.name)} — ${esc(displayRecipeName)} — CookieSensei</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Georgia', serif;
      color: #1a1a1a;
      background: #fff;
      padding: 16px 20px;
      max-width: 800px;
      margin: 0 auto;
      font-size: 12px;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #c0392b;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .brand {
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c0392b;
    }
    .cookie-title {
      font-size: 22px;
      font-weight: 900;
      color: #1a1a1a;
      line-height: 1.1;
    }
    .cookie-emoji { font-size: 26px; margin-right: 8px; vertical-align: middle; }
    .recipe-sub {
      font-size: 12px;
      color: #555;
      margin-top: 4px;
      font-weight: 600;
    }
    .cookie-desc { font-size: 10px; color: #666; margin-top: 3px; max-width: 520px; line-height: 1.3; }
    .meta-pills { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
    .pill {
      background: #fef3cd;
      border: 1px solid #f0c040;
      border-radius: 16px;
      padding: 2px 8px;
      font-size: 9px;
      font-weight: bold;
      color: #7a5500;
    }
    .section-title {
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #c0392b;
      margin: 10px 0 6px 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 3px;
    }
    .ingredients-table { width: 100%; border-collapse: collapse; }
    .ingredients-table tr:nth-child(even) td { background: #fafafa; }
    .steps-2col {
      column-count: 2;
      column-gap: 18px;
      margin-top: 4px;
    }
    .steps-2col ol {
      margin: 0 0 8px 0;
      padding-left: 1.15em;
      font-size: 10px;
      line-height: 1.35;
      color: #333;
    }
    .steps-2col li { break-inside: avoid; margin-bottom: 3px; }
    .step-section-label {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      color: #555;
      margin: 6px 0 4px 0;
      column-span: all;
    }
    .page-2 { page-break-before: always; padding-top: 16px; }
    .science-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .science-box {
      background: #f8f8f8;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 8px 10px;
    }
    .science-label { font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: 1px; }
    .science-value { font-size: 17px; font-weight: 900; color: #1a1a1a; }
    .science-sub { font-size: 9px; color: #aaa; }
    .nf {
      border: 2px solid #000;
      padding: 8px 10px;
      max-width: 300px;
      margin-top: 12px;
    }
    .nf-title { font-size: 20px; font-weight: 900; border-bottom: 6px solid #000; padding-bottom: 2px; margin-bottom: 4px; }
    .nf-serving { font-size: 10px; border-bottom: 3px solid #000; padding-bottom: 4px; margin-bottom: 2px; }
    .nf-cal-row { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 6px solid #000; padding: 4px 0; margin-bottom: 2px; }
    .nf-cal-label { font-size: 12px; font-weight: bold; }
    .nf-cal-num { font-size: 28px; font-weight: 900; }
    .nf-dv-header { font-size: 9px; font-weight: bold; text-align: right; border-bottom: 3px solid #000; padding-bottom: 2px; margin-bottom: 2px; }
    .nf-row { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 2px 0; font-size: 10px; font-weight: bold; }
    .nf-subrow { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 2px 0 2px 12px; font-size: 10px; font-weight: normal; }
    .nf-footer { font-size: 9px; border-top: 6px solid #000; margin-top: 4px; padding-top: 4px; }
    .footer {
      margin-top: 14px;
      border-top: 1px solid #ddd;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #aaa;
    }
    @media print {
      body { padding: 10px 14px; font-size: 11px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .recipe-page { page-break-after: always; break-after: page; }
      .page-2 { page-break-before: always; break-before: page; }
      .steps-2col ol { font-size: 9.5px; }
      .ingredients-table td { font-size: 10px !important; padding: 2px 4px !important; }
    }
  </style>
</head>
<body>

  <!-- Page 1: recipe only -->
  <div class="recipe-page">
    <div class="header">
      <div>
        <div class="brand">🍪 CookieSensei</div>
        <div class="cookie-title">
          <span class="cookie-emoji">${cookieType.emoji}</span>${esc(cookieType.name)}
        </div>
        <div class="recipe-sub">${esc(displayRecipeName)}</div>
        <div class="cookie-desc">${esc(cookieType.description)}</div>
        <div class="meta-pills">
          <span class="pill">Yield: ${cookieCount} cookies</span>
          <span class="pill">Batch: ${formatWeight(metrics.totalWeight)}</span>
          <span class="pill">Per cookie: ${servingSize}g</span>
        </div>
        ${articleLink}
      </div>
    </div>

    <div class="section-title">Ingredients</div>
    <table class="ingredients-table">
      ${ingredientRows}
    </table>

    ${bakeMeta}

    <div class="steps-2col">
      ${prepLis ? `<div class="step-section-label">Prep</div><ol>${prepLis}</ol>` : ''}
      ${
        bakeLis
          ? `<div class="step-section-label">${cookieType.id === 'no-bake' ? 'Assembly / chilling' : 'Bake'}</div><ol start="${prepLen + 1}">${bakeLis}</ol>`
          : ''
      }
    </div>
    ${donenessBlock}
  </div>

  <!-- Page 2: science + nutrition -->
  <div class="page-2">
    <div class="header">
      <div>
        <div class="brand">🍪 CookieSensei · Science &amp; nutrition</div>
        <div class="cookie-title" style="font-size:18px;">
          <span class="cookie-emoji">${cookieType.emoji}</span>${esc(cookieType.name)}
        </div>
        <div class="recipe-sub">${esc(displayRecipeName)}</div>
      </div>
    </div>

    ${leaveningBlock}

    <div class="section-title">Cookie science</div>
    <div class="science-grid">
      <div class="science-box">
        <div class="science-label">Water Activity</div>
        <div class="science-value">${metrics.waterActivity != null ? metrics.waterActivity.toFixed(3) : '—'}</div>
        <div class="science-sub">Moisture / shelf stability</div>
      </div>
      <div class="science-box">
        <div class="science-label">Spread ratio</div>
        <div class="science-value">${metrics.spreadRatio != null ? metrics.spreadRatio.toFixed(2) : '—'}</div>
        <div class="science-sub">Diameter ÷ height</div>
      </div>
      <div class="science-box">
        <div class="science-label">Texture force</div>
        <div class="science-value">${metrics.textureForce != null ? metrics.textureForce.toFixed(0) : '—'}<span style="font-size:11px;font-weight:400;"> N</span></div>
        <div class="science-sub">Bite resistance</div>
      </div>
      <div class="science-box">
        <div class="science-label">Moisture</div>
        <div class="science-value">${metrics.moisturePercent != null ? metrics.moisturePercent.toFixed(1) : '—'}<span style="font-size:11px;font-weight:400;">%</span></div>
        <div class="science-sub">Water in formula</div>
      </div>
      <div class="science-box">
        <div class="science-label">Sugar (solids)</div>
        <div class="science-value">${sugarG}<span style="font-size:11px;font-weight:400;"> g</span></div>
        <div class="science-sub">${sugarPct}% of batch weight</div>
      </div>
      <div class="science-box">
        <div class="science-label">Fat</div>
        <div class="science-value">${metrics.fatPercent != null ? metrics.fatPercent.toFixed(1) : '—'}<span style="font-size:11px;font-weight:400;">%</span></div>
        <div class="science-sub">Fat by weight</div>
      </div>
    </div>

    <div class="section-title">Nutrition facts</div>
    <div class="nf">
      <div class="nf-title">Nutrition Facts</div>
      <div class="nf-serving">
        <div>Servings per recipe: <strong>${servingsPerRecipe}</strong></div>
        <div><strong>Serving size: ${servingSize}g (${(servingSize * 0.035274).toFixed(2)}oz)</strong></div>
      </div>
      <div class="nf-cal-row">
        <span class="nf-cal-label">Calories</span>
        <span class="nf-cal-num">${cal}</span>
      </div>
      <div class="nf-dv-header">% Daily Value*</div>
      <div class="nf-row"><span>Total Fat ${fat}g</span><span>${fatDV}%</span></div>
      <div class="nf-subrow"><span>Saturated Fat ${satFat}g</span><span>${satFatDV}%</span></div>
      <div class="nf-subrow"><span>Trans Fat ${transFat}g</span><span></span></div>
      <div class="nf-subrow"><span>Cholesterol ${chol}mg</span><span>${cholDV}%</span></div>
      <div class="nf-row"><span>Sodium ${sodium}mg</span><span>${sodiumDV}%</span></div>
      <div class="nf-row"><span>Total Carbohydrate ${carbs}g</span><span>${carbsDV}%</span></div>
      <div class="nf-subrow"><span>Dietary Fiber ${fiber}g</span><span>${fiberDV}%</span></div>
      <div class="nf-subrow"><span>Total Sugars ${sugar}g</span><span></span></div>
      <div class="nf-subrow"><span>Added Sugars ${addedSugar}g</span><span></span></div>
      <div class="nf-row"><span>Protein ${protein}g</span><span></span></div>
      <div class="nf-footer">* % Daily Values based on a 2,000 calorie diet.</div>
    </div>
  </div>

  <div class="footer">
    <span>Generated by CookieSensei</span>
    <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
  </div>
</body>
</html>`;

    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'style',
      'position:fixed;right:0;bottom:0;width:0;height:0;border:0;pointer-events:none;visibility:hidden'
    );
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const win = iframe.contentWindow;
    const doc = iframe.contentDocument ?? win?.document;
    if (!win || !doc) {
      iframe.remove();
      return;
    }

    doc.open();
    doc.write(html);
    doc.close();

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      iframe.remove();
    };

    const runPrint = () => {
      try {
        win.focus();
        win.print();
      } finally {
        win.addEventListener('afterprint', cleanup, { once: true });
        window.setTimeout(cleanup, 2_000);
      }
    };

    const schedulePrint = () => window.setTimeout(runPrint, 0);
    if (doc.readyState === 'complete') {
      schedulePrint();
    } else {
      iframe.onload = () => schedulePrint();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm active:scale-95"
      title="Print or save recipe as PDF"
    >
      <Printer className="w-4 h-4" />
      Print / Save PDF
    </button>
  );
}
