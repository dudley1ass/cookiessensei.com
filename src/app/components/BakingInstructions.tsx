import { Flame, Clock, Timer, Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface BakingInstructionsProps {
  cookieType: string;
  totalWeight: number;
  cookieCount: number;
  measurementMode: 'metric' | 'imperial' | 'volumetric';
}

interface BakingData {
  tempF: number;
  tempC: number;
  timeMin: number;
  timeMax: number;
  prepSteps: string[];
  bakingSteps: string[];
  doneness: string;
  tips: string[];
  storage: string;
  commonMistakes: string[];
}

const BAKING_DATA: Record<string, BakingData> = {
  'drop-cookie': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 12,
    prepSteps: [
      'Cream butter and sugar until light and fluffy, about 3-4 minutes',
      'Add eggs one at a time, beating well after each addition',
      'Mix in vanilla extract',
      'Whisk together dry ingredients in a separate bowl',
      'Gradually fold dry ingredients into wet — do not overmix',
      'Fold in any mix-ins (chocolate chips, nuts, etc.)',
      'Chill dough 30 min for thicker cookies (optional but recommended)',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Line baking sheets with parchment paper',
      'Scoop dough into balls, space 2 inches apart',
      'Bake 10–12 minutes until edges are golden',
      'Let cool on pan 5 minutes before transferring',
    ],
    doneness: 'Edges golden brown, centers slightly soft and puffy — they firm up as they cool',
    tips: [
      'Room temperature butter is key — too cold = dense, too warm = flat',
      'Don\'t overbake! Pull them when the center still looks slightly underdone',
      'Bang the pan on the counter when they come out for wrinkly, chewy tops',
      'Use bread flour instead of all-purpose for extra chew',
      'Brown your butter first for a deeper, nuttier flavour',
    ],
    storage: 'Store in an airtight container at room temperature for up to 5 days. Freeze baked cookies up to 3 months, or freeze dough balls and bake from frozen (add 2-3 min).',
    commonMistakes: [
      'Overbaking — the #1 mistake. They look underdone but firm up while cooling',
      'Butter too warm — causes cookies to spread flat',
      'Skipping the chill — warm dough spreads too much',
      'Overmixing after adding flour — develops gluten, makes tough cookies',
    ],
  },
  'soft-cake': {
    tempF: 350, tempC: 175, timeMin: 8, timeMax: 10,
    prepSteps: [
      'Cream butter and sugar until very light, 4-5 minutes',
      'Beat in eggs and any sour cream or cream cheese',
      'Sift together flour, baking powder, and salt',
      'Fold dry ingredients in gently — minimal mixing',
      'Add any flavoring extracts or zest',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Scoop onto parchment-lined sheets, space 2 inches apart',
      'Bake 8–10 minutes — do not let them brown',
      'Cool completely before frosting',
    ],
    doneness: 'No browning at all — tops spring back when lightly touched',
    tips: [
      'The more you cream the butter/sugar, the fluffier the cookie',
      'Sour cream or cream cheese keeps these incredibly soft for days',
      'Frost only after fully cooled or frosting will melt',
      'Almond extract alongside vanilla takes these to another level',
    ],
    storage: 'Store frosted cookies in single layers separated by parchment. Room temp 3 days, refrigerated 1 week.',
    commonMistakes: [
      'Overbaking — even a minute too long makes them dry',
      'Frosting warm cookies — frosting will slide off',
      'Not enough leavening — baking powder is what makes these fluffy',
    ],
  },
  'shortbread': {
    tempF: 325, tempC: 165, timeMin: 18, timeMax: 22,
    prepSteps: [
      'Beat butter until smooth and creamy — no need to cream with sugar',
      'Mix in powdered sugar and salt until just combined',
      'Add flour in two additions, mix until dough comes together',
      'Do not overwork — shortbread gets tough if over-mixed',
      'Shape into logs, discs, or press into molds',
      'Chill shaped dough at least 30 minutes before baking',
    ],
    bakingSteps: [
      'Preheat oven to 325°F (165°C) — lower temp is key',
      'Place chilled dough on parchment-lined sheets',
      'Bake 18–22 minutes low and slow',
      'Cool completely on pan — shortbread is fragile when warm',
    ],
    doneness: 'Pale golden on the bottom, still looking almost raw on top — that\'s correct',
    tips: [
      'Use European-style butter (higher fat) for best flavour',
      'The secret is minimal mixing — stop as soon as dough forms',
      'Chilling is non-negotiable — prevents spreading',
      'Score/cut before baking, not after — it crumbles when cut warm',
      'Sprinkle with flaky salt right out of the oven',
    ],
    storage: 'Keeps exceptionally well — airtight container up to 2 weeks. Actually improves after day 2.',
    commonMistakes: [
      'Overmixing — develops gluten, ruins the crumbly texture',
      'Baking too hot — should stay pale, not golden',
      'Skipping the chill — dough spreads and loses shape',
    ],
  },
  'sugar-cookie': {
    tempF: 350, tempC: 175, timeMin: 8, timeMax: 10,
    prepSteps: [
      'Cream butter and sugar until fluffy',
      'Beat in eggs and vanilla',
      'Mix in flour, baking powder, and salt until smooth dough forms',
      'Divide dough, flatten into discs, wrap in plastic',
      'Refrigerate at least 2 hours or overnight',
      'Roll to ¼ inch thickness on lightly floured surface',
      'Cut with cookie cutters, transfer to lined sheets',
      'Re-chill cut cookies 15 min before baking for sharp edges',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Bake 8–10 minutes — edges just barely set',
      'Cool on pan 5 minutes, then transfer to rack',
      'Cool completely before decorating',
    ],
    doneness: 'Barely any color — edges just set. Soft cookies = no browning. Crispier = lightly golden edges.',
    tips: [
      'Two rounds of chilling (dough + cut shapes) = perfect edges',
      'Roll between two sheets of parchment to avoid sticking',
      'Add 1 tsp almond extract for classic bakery flavour',
      'For royal icing: 2 cups powdered sugar, 1½ tbsp meringue powder, 3 tbsp water',
    ],
    storage: 'Undecorated: airtight container 1 week. Royal iced: stack with parchment, 2 weeks.',
    commonMistakes: [
      'Skipping the chill — shapes spread and blur',
      'Rolling too thin — cookies become crispy/fragile',
      'Overbaking — should look slightly underdone coming out',
    ],
  },
  'snickerdoodle': {
    tempF: 375, tempC: 190, timeMin: 8, timeMax: 10,
    prepSteps: [
      'Cream butter and both sugars until light',
      'Beat in eggs and vanilla',
      'Whisk flour, cream of tartar, baking soda, and salt',
      'Fold dry into wet until just combined',
      'Mix cinnamon-sugar coating in a small bowl (3 tbsp sugar + 1 tsp cinnamon)',
      'Chill dough 30 minutes',
    ],
    bakingSteps: [
      'Preheat oven to 375°F (190°C) — slightly hotter than most cookies',
      'Roll dough into balls, coat thoroughly in cinnamon-sugar',
      'Place 2 inches apart on parchment-lined sheets',
      'Bake 8–10 minutes until puffy with crackled tops',
      'Do not flatten — they spread on their own',
    ],
    doneness: 'Puffy with crackled tops, edges lightly golden, centers still soft',
    tips: [
      'Cream of tartar is not optional — it\'s what gives snickerdoodles their tangy flavour and chewy texture',
      'The hotter oven creates that signature puffed, crackled top',
      'Roll generously in cinnamon-sugar — more is more here',
      'Pull them early — they continue cooking on the hot pan',
    ],
    storage: 'Airtight container at room temperature up to 5 days. They stay soft and chewy.',
    commonMistakes: [
      'Substituting baking powder for cream of tartar — changes flavour and texture completely',
      'Flattening before baking — they\'re supposed to be round',
      'Under-coating in cinnamon-sugar — be generous',
    ],
  },
  'brownie-cookie': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 13,
    prepSteps: [
      'Melt chocolate and butter together (double boiler or microwave in 30s bursts)',
      'Whisk eggs and sugar vigorously until thick and ribbon-like, 3-4 minutes',
      'Fold melted chocolate mixture into egg mixture',
      'Sift in flour and cocoa powder, fold gently',
      'Fold in chocolate chips or chunks',
      'Rest batter 15-20 minutes — it will thicken and become scoopable',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Scoop thick batter onto parchment-lined sheets, space 2 inches apart',
      'Bake 10–13 minutes',
      'Cool on pan completely — they firm up as they cool',
    ],
    doneness: 'Crackled shiny tops like brownies, edges set but centers look underdone — that\'s perfect',
    tips: [
      'Whipping the eggs and sugar creates the signature crackled top',
      'Use high-quality dark chocolate for best flavour',
      'Resting the batter is crucial — don\'t skip it',
      'Sprinkle flaky sea salt on top right before baking',
    ],
    storage: 'Airtight container 4 days. These actually taste better on day 2 as the texture sets.',
    commonMistakes: [
      'Skipping the egg/sugar whipping step — no crackled top',
      'Not resting the batter — too runny to scoop',
      'Overbaking — fudgy centers are the point',
    ],
  },
  'biscotti': {
    tempF: 350, tempC: 175, timeMin: 25, timeMax: 30,
    prepSteps: [
      'Whisk eggs and sugar until smooth',
      'Mix in oil or butter and vanilla',
      'Stir in flour, baking powder, and salt until stiff dough forms',
      'Fold in nuts, dried fruit, or chocolate chips',
      'Shape into two flat logs on a parchment-lined sheet (about 12" x 3")',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'First bake: bake logs 25-30 minutes until firm and lightly golden',
      'Cool logs 15 minutes — do not skip, they need to firm up',
      'Slice diagonally into ½-inch slices with a sharp serrated knife',
      'Lay slices cut-side down on sheets',
      'Second bake: 15-20 minutes, flipping halfway, until dry and crisp',
      'Cool completely on a rack — they crisp up further as they cool',
    ],
    doneness: 'First bake: firm, dry-looking, lightly golden. Second bake: fully dry, light golden-brown',
    tips: [
      'Low fat in the dough = longer shelf life and proper crunch',
      'A serrated knife prevents crumbling when slicing',
      'The longer the second bake, the crunchier the result',
      'Dip in melted chocolate after fully cooled for a classic finish',
      'Pairs perfectly with coffee, tea, or dessert wine for dipping',
    ],
    storage: 'Extraordinary shelf life — airtight container at room temperature up to 1 month.',
    commonMistakes: [
      'Slicing too soon after first bake — crumbles badly',
      'Slicing too thick — won\'t dry out properly in second bake',
      'Using a straight knife — serrated only for clean slices',
    ],
  },
  'pressed-butter': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 12,
    prepSteps: [
      'Beat butter until very light and fluffy, at least 5 minutes',
      'Add powdered sugar gradually, beat until smooth',
      'Mix in egg yolk and vanilla',
      'Sift in flour and salt, mix just until combined',
      'Load dough into cookie press with desired disc',
      'Press onto ungreased, unlined (bare metal) baking sheets',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Use bare, ungreased metal sheets — parchment prevents adhesion',
      'Press cookies directly onto cold sheets',
      'Bake 10-12 minutes until edges are lightly golden',
      'Cool on pan 5 minutes before moving',
    ],
    doneness: 'Edges lightly golden, shape maintained, bottom lightly golden',
    tips: [
      'Butter must be at true room temp — not cold, not melted',
      'Do NOT use parchment — cookies won\'t stick and release from press',
      'Keep unbaked sheets cold — warm sheets cause spreading before baking',
      'Add food coloring to dough for festive varieties',
    ],
    storage: 'Excellent keeper — airtight container 2 weeks at room temperature.',
    commonMistakes: [
      'Using parchment — cookies won\'t adhere to press or release cleanly',
      'Butter too cold — dough won\'t press through die cleanly',
      'Warm baking sheets — shapes spread before setting',
    ],
  },
  'slice-bake': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 12,
    prepSteps: [
      'Make dough and divide into portions',
      'Shape each portion into a log, about 2 inches diameter',
      'Wrap tightly in plastic wrap, twisting ends',
      'Refrigerate at least 2 hours, or freeze 30 minutes',
      'For coated logs: roll in sprinkles, nuts, or sugar before chilling',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Slice chilled log into ¼-inch rounds with a sharp knife',
      'Place on parchment-lined sheets, 1 inch apart',
      'Bake 10-12 minutes until edges are lightly golden',
    ],
    doneness: 'Edges golden, centers just set',
    tips: [
      'The colder the log, the cleaner the slices',
      'Rotate the log as you slice to keep a round shape',
      'Logs keep in the freezer for 3 months — slice and bake straight from frozen',
      'Roll logs in colored sugar or sprinkles before chilling for decorative edges',
    ],
    storage: 'Baked: airtight container 1 week. Unbaked logs: refrigerator 5 days, freezer 3 months.',
    commonMistakes: [
      'Not chilling long enough — warm dough squashes when sliced',
      'Slicing too thin — burns before center sets',
      'Uneven log thickness — uneven baking',
    ],
  },
  'molded': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 12,
    prepSteps: [
      'Make dough and chill if needed for workability',
      'Portion dough by weight for uniform cookies',
      'Roll into smooth balls, then shape as desired',
      'For crinkle cookies: roll in powdered sugar generously',
      'For peanut butter: press with fork in crosshatch pattern',
      'For thumbprint: make indent with thumb, fill after baking',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Place shaped cookies on parchment-lined sheets',
      'Bake 10-12 minutes',
      'Add fillings to thumbprints immediately after baking while warm',
    ],
    doneness: 'Surface crackled (crinkles), edges set, centers slightly soft',
    tips: [
      'A kitchen scale ensures every cookie is exactly the same size',
      'Double-coat crinkle cookies in powdered sugar — first coat absorbs, second stays white',
      'Fill thumbprints while warm so jam or chocolate sets into the indent',
    ],
    storage: 'Airtight container at room temperature 5 days.',
    commonMistakes: [
      'Inconsistent sizing — some cookies overbake while others underbake',
      'One layer of powdered sugar on crinkles — it all absorbs, looks bare',
    ],
  },
  'macaron-meringue': {
    tempF: 300, tempC: 150, timeMin: 15, timeMax: 18,
    prepSteps: [
      'Age egg whites in the fridge uncovered overnight (reduces moisture)',
      'Sift almond flour and powdered sugar together twice — no lumps',
      'Whip egg whites to stiff peaks, adding cream of tartar when foamy',
      'Add granulated sugar gradually once soft peaks form',
      'Fold almond mixture into meringue using macaronage technique',
      'Mix until batter flows like lava and ribbon falls back in 10 seconds',
      'Pipe 1.5-inch circles onto parchment, holding bag 90° perpendicular',
      'Bang pan firmly on counter 5 times to release air bubbles',
      'Rest at room temperature 30-60 minutes until skin forms (touch-dry)',
    ],
    bakingSteps: [
      'Preheat oven to 300°F (150°C) — lower and slower than most cookies',
      'Bake one sheet at a time in the center of oven',
      'Bake 15-18 minutes — feet should form within first 5 minutes',
      'Cool completely on pan before attempting to remove',
      'Fill with buttercream, ganache, or jam',
      'Rest filled macarons in fridge 24 hours before serving (maturation)',
    ],
    doneness: 'Feet formed, shells lift cleanly from parchment, smooth tops',
    tips: [
      'Humidity is the enemy of macarons — avoid rainy days',
      'Macaronage is critical: undermixed = lumpy tops, overmixed = flat cookies',
      'Resting to form skin is non-negotiable for feet development',
      'They taste dramatically better after 24 hours of maturation',
      'Weigh every ingredient — volume measurements don\'t work here',
    ],
    storage: 'Filled macarons: airtight container in fridge 5 days, freeze up to 2 months.',
    commonMistakes: [
      'Not aging egg whites — too much moisture prevents proper meringue',
      'Skipping the skin-forming rest — no feet will form',
      'Wrong macaronage — the #1 cause of failure, requires practice',
      'Opening oven during baking — causes collapse',
      'Removing from parchment warm — shells tear',
    ],
  },
  'no-bake': {
    tempF: 0, tempC: 0, timeMin: 15, timeMax: 30,
    prepSteps: [
      'Measure all ingredients before starting — the process moves fast',
      'Prepare parchment-lined sheets or silicone mats',
      'Have oats, peanut butter, and vanilla measured and ready',
    ],
    bakingSteps: [
      'Combine butter, sugar, milk, and cocoa in a saucepan',
      'Bring to a full rolling boil, stirring constantly',
      'Boil exactly 1 minute — timing is critical for set',
      'Remove from heat, quickly stir in oats, peanut butter, and vanilla',
      'Drop by spoonfuls onto prepared parchment immediately',
      'Let cool and set at room temperature 15-30 minutes',
    ],
    doneness: 'Firm to the touch, no longer sticky, holds shape',
    tips: [
      'The 1-minute boil is critical — underboiling = never sets, overboiling = crumbly',
      'Work fast after removing from heat — mixture sets quickly',
      'Add a pinch of salt to balance the sweetness',
      'Old-fashioned oats give better texture than quick oats',
    ],
    storage: 'Airtight container at room temperature 1 week, or refrigerate for firmer texture.',
    commonMistakes: [
      'Not boiling long enough — cookies stay sticky and never firm up',
      'Boiling too long — cookies turn crumbly and dry',
      'Working too slowly after removing from heat — mixture seizes',
    ],
  },
};

export function BakingInstructions({ cookieType, totalWeight, cookieCount, measurementMode }: BakingInstructionsProps) {
  const [showTips, setShowTips] = useState(true);
  const [showMistakes, setShowMistakes] = useState(false);

  const weightPerCookie = cookieCount > 0 ? totalWeight / cookieCount : 30;
  let data = { ...(BAKING_DATA[cookieType] || BAKING_DATA['drop-cookie']) };

  // Adjust time for cookie size
  if (cookieType !== 'biscotti' && cookieType !== 'no-bake' && cookieType !== 'macaron-meringue') {
    if (weightPerCookie > 40) {
      const extra = Math.floor((weightPerCookie - 40) / 10);
      data.timeMin += extra;
      data.timeMax += extra;
    } else if (weightPerCookie < 20) {
      data.timeMin = Math.max(6, data.timeMin - 2);
      data.timeMax = Math.max(8, data.timeMax - 2);
    }
  }

  const formatTemp = (f: number, c: number) => measurementMode === 'imperial' ? `${f}°F` : `${c}°C`;
  const formatTempAlt = (f: number, c: number) => measurementMode === 'imperial' ? `${c}°C` : `${f}°F`;
  const formatWeight = (g: number) => measurementMode === 'imperial' ? `${(g * 0.035274).toFixed(1)}oz` : `${g.toFixed(0)}g`;

  const isNoBake = cookieType === 'no-bake';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        {isNoBake ? <Timer className="w-5 h-5 text-blue-600" /> : <Flame className="w-5 h-5 text-red-600" />}
        {isNoBake ? 'No-Bake Instructions' : 'Baking Instructions'}
      </h3>

      {/* Stats row */}
      {!isNoBake && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <div className="text-xs font-semibold text-red-600 mb-1">Temperature</div>
            <div className="text-xl font-bold text-red-900">{formatTemp(data.tempF, data.tempC)}</div>
            <div className="text-xs text-red-500">{formatTempAlt(data.tempF, data.tempC)}</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
            <div className="text-xs font-semibold text-orange-600 mb-1">Bake Time</div>
            <div className="text-xl font-bold text-orange-900">{data.timeMin}–{data.timeMax} min</div>
            <div className="text-xs text-orange-500">{cookieType === 'biscotti' ? 'first bake' : 'total'}</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <div className="text-xs font-semibold text-amber-600 mb-1">Yield</div>
            <div className="text-xl font-bold text-amber-900">{cookieCount}</div>
            <div className="text-xs text-amber-500">~{formatWeight(weightPerCookie)} each</div>
          </div>
        </div>
      )}

      {/* Prep Steps */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">📋 Prep Steps</div>
        <ol className="space-y-2">
          {data.prepSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold mt-0.5"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}>
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Baking Steps */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-3">
          {isNoBake ? '🍳 Cooking Steps' : '🔥 Baking Steps'}
        </div>
        <ol className="space-y-2">
          {data.bakingSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-orange-800">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Doneness */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">✅ How to Know They're Done</div>
        <p className="text-sm text-green-800">{data.doneness}</p>
      </div>

      {/* Tips */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowTips(v => !v)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="text-sm font-bold text-gray-900">💡 Pro Tips ({data.tips.length})</div>
          {showTips ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {showTips && (
          <div className="px-4 pb-4 space-y-2">
            {data.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-yellow-500 flex-shrink-0">★</span>
                {tip}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Storage */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">📦 Storage</div>
        <p className="text-sm text-blue-800">{data.storage}</p>
      </div>

      {/* Common Mistakes */}
      <div className="border border-red-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowMistakes(v => !v)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors"
        >
          <div className="text-sm font-bold text-red-800">⚠️ Common Mistakes to Avoid ({data.commonMistakes.length})</div>
          {showMistakes ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-red-400" />}
        </button>
        {showMistakes && (
          <div className="px-4 pb-4 space-y-2">
            {data.commonMistakes.map((mistake, i) => (
              <div key={i} className="flex gap-2 text-sm text-red-700">
                <span className="flex-shrink-0">✗</span>
                {mistake}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
