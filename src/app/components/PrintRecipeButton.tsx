import { Printer } from 'lucide-react';
import { CookieMetrics } from '../types/cookie';
import { CookieType } from '../types/cookieTypes';

interface PrintRecipeButtonProps {
  metrics: CookieMetrics;
  cookieType: CookieType;
  ingredients: Array<{ name: string; amount: string }>;
  servingSize: number;
  servingsPerRecipe: number;
  cookieCount: number;
  measurementMode: 'metric' | 'imperial' | 'volumetric';
}

export function PrintRecipeButton({
  metrics,
  cookieType,
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
      ? `<p style="margin:4px 0 0;font-size:11px;color:#888;">Learn more: <a href="${cookieType.articleUrl}" style="color:#c0392b;">${cookieType.articleUrl}</a></p>`
      : '';

    const ingredientRows = ingredients
      .map(ing => `<tr><td style="padding:4px 8px 4px 0;font-size:13px;color:#333;">${ing.name}</td><td style="padding:4px 0;font-size:13px;color:#555;text-align:right;">${ing.amount}</td></tr>`)
      .join('');

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${cookieType.name} Recipe — CookieSensei</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Georgia', serif;
      color: #1a1a1a;
      background: #fff;
      padding: 32px 40px;
      max-width: 780px;
      margin: 0 auto;
      font-size: 13px;
    }
    /* ---- Header ---- */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 3px solid #c0392b;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .brand {
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c0392b;
    }
    .cookie-title {
      font-size: 26px;
      font-weight: 900;
      color: #1a1a1a;
      line-height: 1.1;
    }
    .cookie-emoji { font-size: 32px; margin-right: 10px; vertical-align: middle; }
    .cookie-desc {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
      max-width: 480px;
    }
    .meta-pills {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .pill {
      background: #fef3cd;
      border: 1px solid #f0c040;
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 10px;
      font-weight: bold;
      color: #7a5500;
    }
    /* ---- Two-col layout ---- */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    /* ---- Section headings ---- */
    .section-title {
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #c0392b;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 4px;
    }
    /* ---- Ingredients ---- */
    .ingredients-table { width: 100%; border-collapse: collapse; }
    .ingredients-table tr:nth-child(even) td { background: #fafafa; }
    /* ---- Science metrics ---- */
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
    .science-value { font-size: 18px; font-weight: 900; color: #1a1a1a; }
    .science-sub { font-size: 9px; color: #aaa; }
    /* ---- Nutrition Facts ---- */
    .nf {
      border: 2px solid #000;
      padding: 8px 10px;
      max-width: 280px;
    }
    .nf-title { font-size: 22px; font-weight: 900; border-bottom: 6px solid #000; padding-bottom: 2px; margin-bottom: 4px; }
    .nf-serving { font-size: 11px; border-bottom: 3px solid #000; padding-bottom: 4px; margin-bottom: 2px; }
    .nf-cal-row { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 6px solid #000; padding: 4px 0; margin-bottom: 2px; }
    .nf-cal-label { font-size: 13px; font-weight: bold; }
    .nf-cal-num { font-size: 30px; font-weight: 900; }
    .nf-dv-header { font-size: 10px; font-weight: bold; text-align: right; border-bottom: 3px solid #000; padding-bottom: 2px; margin-bottom: 2px; }
    .nf-row { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 2px 0; font-size: 11px; font-weight: bold; }
    .nf-subrow { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 2px 0 2px 12px; font-size: 11px; font-weight: normal; }
    .nf-footer { font-size: 9px; border-top: 6px solid #000; margin-top: 4px; padding-top: 4px; }
    /* ---- Instructions ---- */
    .steps-list { list-style: none; counter-reset: step-counter; }
    .steps-list li {
      counter-increment: step-counter;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 12px;
      color: #333;
    }
    .steps-list li::before {
      content: counter(step-counter);
      background: #c0392b;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
    }
    /* ---- Footer ---- */
    .footer {
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #aaa;
    }
    @media print {
      body { padding: 20px 24px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">🍪 CookieSensei</div>
      <div class="cookie-title">
        <span class="cookie-emoji">${cookieType.emoji}</span>${cookieType.name}
      </div>
      <div class="cookie-desc">${cookieType.description}</div>
      <div class="meta-pills">
        <span class="pill">Yield: ${cookieCount} cookies</span>
        <span class="pill">Total: ${formatWeight(metrics.totalWeight)}</span>
        <span class="pill">Spread Ratio: ${metrics.spreadRatio?.toFixed(2)}</span>
        <span class="pill">Water Activity: ${metrics.waterActivity?.toFixed(3)}</span>
      </div>
      ${articleLink}
    </div>
  </div>

  <div class="two-col">
    <!-- LEFT: Ingredients + Science -->
    <div>
      <div class="section-title">Ingredients</div>
      <table class="ingredients-table">
        ${ingredientRows}
      </table>

      <div style="margin-top:16px;">
        <div class="section-title">Cookie Science</div>
        <div class="science-grid">
          <div class="science-box">
            <div class="science-label">Water Activity</div>
            <div class="science-value">${metrics.waterActivity?.toFixed(3)}</div>
            <div class="science-sub">Shelf stability</div>
          </div>
          <div class="science-box">
            <div class="science-label">Spread Ratio</div>
            <div class="science-value">${metrics.spreadRatio?.toFixed(2)}</div>
            <div class="science-sub">Diameter ÷ Height</div>
          </div>
          <div class="science-box">
            <div class="science-label">Texture Force</div>
            <div class="science-value">${metrics.textureForce?.toFixed(0)}<span style="font-size:12px;font-weight:400;"> N</span></div>
            <div class="science-sub">Bite resistance</div>
          </div>
          <div class="science-box">
            <div class="science-label">Moisture</div>
            <div class="science-value">${metrics.moisturePercent?.toFixed(1)}<span style="font-size:12px;font-weight:400;">%</span></div>
            <div class="science-sub">Water content</div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Nutrition Facts -->
    <div>
      <div class="section-title">Nutrition Facts</div>
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
  </div>

  <div class="footer">
    <span>Generated by CookieSensei · cookiessensei.com</span>
    <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
  </div>

  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>`);

    printWindow.document.close();
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
