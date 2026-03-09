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
    tempF: 350, tempC: 175, timeMin: 8, timeMax: 10,
    prepSteps: [
      'Butter must be at true room temperature — press a finger in and it should leave an indent easily',
      'Beat butter alone for 2 minutes until smooth and creamy before adding sugar',
      'Add sugar and beat until light and fluffy, about 3 minutes — this aerates the dough',
      'Beat in egg and flavoring until fully combined',
      'Sift flour and salt together, then fold into butter mixture until just combined — do not overmix',
      'Test dough consistency: it should hold a shape when squeezed but not crumble or stick to hands',
      'If dough is too soft: refrigerate 10–15 minutes',
      'If dough is too stiff: let sit at room temp 5 minutes',
      'Load dough into cookie press with your chosen disc firmly attached',
      'Do a test press on parchment to check dough flows cleanly through the disc',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Use BARE, UNGREASED metal baking sheets — this is critical for adhesion',
      'Do NOT use parchment paper, silicone mats, or greased sheets',
      'Hold cookie press perpendicular (90°) to the cold sheet surface',
      'Press firmly and lift straight up — do not drag or twist',
      'Keep sheets cold between batches — run cold water over backs if needed',
      'Decorate with sprinkles or colored sugar BEFORE baking if desired',
      'Bake 8–10 minutes until edges are just barely golden',
      'Cool on pan 3–5 minutes before transferring — they are fragile when hot',
    ],
    doneness: 'Edges very lightly golden, bottoms pale golden, shape fully maintained. They should lift cleanly with a thin spatula.',
    tips: [
      'The #1 rule: NO parchment, NO silicone, NO grease — bare cold metal only',
      'Dough temperature is everything — too warm = spreads and loses shape, too cold = crumbles',
      'Chill sheets between batches if your kitchen is warm',
      'For add-ins like ground nuts or coconut: process very fine so they pass through the die cleanly',
      'Color the dough with gel food coloring for festive varieties — divide and tint before pressing',
      'Dip pressed cookies in melted chocolate after baking for an elegant finish',
      'The spritz press works best with a full load of dough — partially empty presses don\'t press cleanly',
    ],
    storage: 'Excellent keeper — airtight container at room temperature up to 2 weeks. Freeze up to 3 months. These actually improve on day 2 as the butter flavour deepens.',
    commonMistakes: [
      'Using parchment or silicone — cookies slide around and won\'t release from the press cleanly',
      'Butter too cold — dough tears and won\'t extrude smoothly through the die',
      'Butter too warm/melted — dough spreads flat and loses all shape detail',
      'Warm baking sheets — shapes melt and spread before the oven sets them',
      'Dragging or twisting the press — distorts the shape on release',
      'Overbaking — should stay very pale; even slight overbake makes them dry and hard',
    ],
  },
  'slice-bake': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 12,
    prepSteps: [
      'Make dough and bring together until smooth — it should hold together without crumbling',
      'For single-flavor logs: divide dough and shape into cylinders about 2 inches in diameter',
      'For marble logs: divide dough in half, mix cocoa into one half, then twist the two together loosely before forming the log',
      'For checkerboard: divide dough in half, mix cocoa into one half, roll each into square logs, cut into strips, and stack in alternating pattern before wrapping',
      'Wrap log tightly in plastic wrap, twist the ends like a candy wrapper to compress',
      'Roll the wrapped log on the counter to smooth it into a perfectly round cylinder',
      'Refrigerate at least 2 hours — overnight gives the cleanest slices and best flavour',
      'Optional: roll log in sprinkles, sugar, or chopped nuts before chilling for decorative edges',
      'Logs keep refrigerated up to 5 days, or freeze up to 3 months',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Line baking sheets with parchment paper',
      'Remove log from fridge and let sit 5 minutes — slightly less brittle for cleaner slices',
      'Use a sharp, thin knife (not serrated) for cleanest cuts',
      'Slice cookies exactly ¼ inch thick — thinner burns, thicker stays doughy',
      'Rotate the log a quarter turn every few slices to keep a round shape',
      'Place on parchment-lined sheets 1 inch apart — these spread very little',
      'Bake 10–12 minutes until edges are lightly golden',
      'Cool on pan 5 minutes before transferring — they firm up as they cool',
    ],
    doneness: 'Edges lightly golden, centers just set. Bottom should be pale golden. They look slightly underdone but firm up fully as they cool.',
    tips: [
      'Make logs now, bake fresh whenever you want — the whole point of icebox cookies',
      'Freeze unsliced logs up to 3 months — slice straight from frozen, add 1–2 minutes bake time',
      'Rolling log in sprinkles, colored sugar, or finely chopped nuts before chilling creates a beautiful decorative edge',
      'A sharp chef\'s knife (not serrated) gives the cleanest cuts with no dragging',
      'Rotating the log as you slice prevents one flat side from developing',
      'For marble cookies: don\'t over-mix the two doughs — a few twists gives the best marble effect',
      'For checkerboard: chill the assembled log an extra 30 minutes after assembling for cleaner slices',
    ],
    storage: 'Baked cookies: airtight container at room temperature 1 week. Unbaked logs: refrigerator 5 days, freezer 3 months. Label frozen logs with flavor and date.',
    commonMistakes: [
      'Slicing warm dough — squashes into ovals; always chill fully first',
      'Slicing too thin — burns before the center sets',
      'Slicing too thick — cookies look underdone and doughy',
      'Using a serrated knife — tears and drags the dough instead of cutting cleanly',
      'Not rotating the log while slicing — creates one flat side',
      'Over-twisting marble dough — blends into grey instead of a clean swirl',
    ],
  },
  'molded': {
    tempF: 350, tempC: 175, timeMin: 10, timeMax: 15,
    prepSteps: [
      'Make dough according to recipe — most molded cookies use a stiffer dough',
      'Chill dough 30–60 minutes if it feels soft or sticky — easier to shape when cold',
      'Use a kitchen scale to portion identical pieces for even baking',
      'For balls: roll between your palms with light pressure until perfectly smooth',
      'For crescents: roll into a short rope, taper the ends, then curve gently',
      'For fork-press cookies: roll into balls first, then flatten with a fork in crosshatch',
      'For crinkle cookies: chill 1 hour, roll in granulated sugar first, then powdered sugar',
      'For rope/knot cookies: roll on a clean countertop with light pressure into even ropes',
      'For coated cookies (wedding cookies, snowballs): set out powdered sugar before baking so you can roll them warm',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Place shaped cookies on parchment-lined baking sheets, spaced 1.5 inches apart',
      'Bake 10–15 minutes depending on size and shape',
      'Ball-shaped cookies: 12–15 min until lightly golden on the bottom',
      'Pressed/flattened cookies: 9–11 min until edges set',
      'Crinkle cookies: 10–12 min — surface will crack and look done when lifted',
      'For powdered-sugar-coated cookies: roll in powdered sugar while still warm (2 min out of oven), then cool and roll again',
    ],
    doneness: 'Bottom lightly golden, cookie holds its shape and lifts cleanly from parchment. For snowballs/crescents: pale golden, not browned.',
    tips: [
      'A kitchen scale ensures perfectly uniform cookies that all bake at the same rate',
      'Double-roll in powdered sugar: once warm (absorbs into surface), once cooled (white coating stays)',
      'For crinkle cookies: the powdered sugar coat must be thick — if you see dough through the sugar, add more',
      'Chill shaped cookies 10 minutes before baking for cleaner edges',
      'Crescents: taper ends and curve before baking — the shape won\'t change much in the oven',
      'Italian knot dough should be soft but not sticky — add flour by the tablespoon if needed',
    ],
    storage: 'Airtight container at room temperature 1 week. Powdered-sugar-coated cookies can be re-dusted before serving if coating absorbs. Freeze up to 3 months.',
    commonMistakes: [
      'Inconsistent ball sizes — some cookies overbake while others stay raw',
      'One coat of powdered sugar — it absorbs completely; always do two coats',
      'Warm dough when shaping — sticky, loses definition; always chill first',
      'Overbaking crescents and snowballs — they should stay pale, not golden',
      'Skipping the warm rolling for coated cookies — powdered sugar won\'t adhere once cooled',
    ],
  },
  'macaron-meringue': {
    tempF: 210, tempC: 100, timeMin: 75, timeMax: 100,
    prepSteps: [
      'Egg whites MUST be at room temperature — cold whites don\'t whip to full volume',
      'Bowl and whisk must be completely grease-free — even a trace of fat deflates meringue',
      'Wipe bowl and whisk with a paper towel soaked in white vinegar before starting',
      'Separate eggs carefully — a single drop of yolk will prevent whites from whipping',
      'Measure sugar precisely — the ratio to egg whites determines structure',
      'For French macarons: age egg whites in the fridge uncovered 24 hours to reduce moisture',
      'For meringue cookies: fresh room-temp whites work perfectly',
      'Preheat oven to 200–225°F (93–107°C) — this dries the meringue without browning',
      'Line sheets with parchment paper — meringues will stick to greased pans or foil',
      'Prepare piping bag with a star or round tip for uniform cookies',
    ],
    bakingSteps: [
      'Beat egg whites with cream of tartar and salt on medium speed until foamy',
      'Increase to high speed and beat until soft peaks form (tips curl over when beater is lifted)',
      'Add sugar ONE tablespoon at a time — adding all at once deflates the foam',
      'Continue beating until STIFF GLOSSY peaks form (tips stand straight up, meringue is smooth)',
      'Fold in any flavorings or add-ins very gently with a rubber spatula — do not stir',
      'Pipe or spoon onto parchment-lined sheets',
      'Bake at 200–225°F for 75–100 minutes until completely dry and crisp throughout',
      'Turn oven off and leave cookies inside with door closed for 1 more hour',
      'This oven-resting step is what finishes drying the centers — do not skip it',
      'Remove and cool completely on the pan before handling',
    ],
    doneness: 'Completely dry and crisp throughout — no soft or sticky spots. Lifts cleanly from parchment. Inside is hollow or very lightly chewy (never wet). Exterior is matte, not shiny.',
    tips: [
      'Humidity is the enemy — avoid making meringues on rainy or humid days',
      'The cream of tartar stabilizes the foam and helps achieve glossy stiff peaks',
      'Add sugar very slowly — rushing this step causes weeping (liquid pooling at the base)',
      'Stiff peaks mean: when you lift the beater, the peak stands up straight without drooping',
      'For swirled meringues: drizzle melted chocolate down the inside of the piping bag before loading',
      'For peppermint stripe effect: paint red food coloring stripes inside the piping bag',
      'Store in an airtight container immediately — meringues absorb humidity fast and turn sticky',
      'If meringues turn sticky after storing, re-crisp in 200°F oven for 15 minutes',
    ],
    storage: 'Airtight container at room temperature up to 2 weeks — humidity is the enemy. Do NOT refrigerate (too humid). Freeze in airtight containers up to 1 month; thaw at room temp still in container.',
    commonMistakes: [
      'Any fat in the bowl — meringue won\'t whip; wipe bowl with vinegar first',
      'Cold egg whites — won\'t whip to full volume; always use room temperature',
      'Adding sugar too fast — causes weeping and grainy texture',
      'Baking too hot — meringues brown instead of drying; keep oven low (200–225°F)',
      'Opening oven during baking — temperature drop causes cracking',
      'Skipping the oven-rest — centers stay chewy and sticky without it',
      'Storing without airtight container — absorb humidity and turn soft within hours',
    ],
  },
  'sandwich-cookie': {
    tempF: 350, tempC: 175, timeMin: 8, timeMax: 12,
    prepSteps: [
      'Make cookie dough according to recipe — most sandwich cookies use a stiffer, rollable dough',
      'For Oreo-style: roll dough thin (⅛ inch) and cut circles for crispier wafers',
      'For Whoopie Pies: use a soft drop batter scooped with a cookie scoop for uniform rounds',
      'For Linzer cookies: roll ¼ inch thick, cut half with a plain cutter and half with a window cutter',
      'Match up cookies in pairs by size before baking — pair them from the same scoop or cut',
      'Prepare filling while cookies bake or cool: beat butter until fluffy before adding powdered sugar',
      'For ganache filling: heat cream until steaming, pour over chopped chocolate, let sit 2 min then stir smooth',
      'Cool cookies COMPLETELY before filling — warm cookies melt buttercream and slide apart',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Line baking sheets with parchment paper',
      'For drop-style (Whoopie Pies): scoop uniform portions using a cookie scoop',
      'For rolled/cut style: roll chilled dough and cut shapes, chill cut cookies 10 min before baking',
      'Bake 8–12 minutes depending on size and thickness',
      'Thin crisp wafers: 8–9 min; soft cakey rounds: 10–12 min',
      'Cool on pan 5 minutes, then transfer to rack',
      'Cool completely — at least 30 minutes — before filling',
    ],
    doneness: 'Edges just set, bottoms lightly golden. For Whoopie Pies: tops spring back when touched. For wafer-style: crisp when cooled.',
    tips: [
      'Match cookies in pairs before assembling — nothing looks worse than mismatched sandwich sizes',
      'Pipe filling with a piping bag for professional-looking, consistent sandwiches',
      'Use a cookie scoop for drop-style sandwich cookies to get perfectly matched halves',
      'For Linzer cookies: dust the windowed top half with powdered sugar BEFORE assembling',
      'Ganache thickens as it cools — let it set to a spreadable consistency before filling',
      'For Oreo-style: refrigerate assembled cookies 30 min to let filling set firmly',
      'Store assembled sandwiches with parchment between layers to prevent sticking',
    ],
    storage: 'Assembled sandwiches: airtight container at room temperature 3 days, refrigerated 1 week. Unfilled cookies freeze up to 3 months — fill fresh after thawing.',
    commonMistakes: [
      'Filling warm cookies — buttercream melts and cookies slide apart',
      'Mismatched cookie sizes — one half overhangs the other',
      'Too much filling — squirts out the sides when pressed; use about 1 tsp per sandwich',
      'Too little filling — sandwich looks flat and tastes dry',
      'Cutting Linzer windows before chilling — shapes distort; chill then cut',
      'Under-beating buttercream — grainy texture; beat at least 3–4 minutes until fluffy',
    ],
  },
  'rolled-cookie': {
    tempF: 350, tempC: 175, timeMin: 8, timeMax: 12,
    prepSteps: [
      'Cream butter and sugar until smooth and combined — not as fluffy as drop cookies',
      'Add eggs and flavorings and mix until just incorporated',
      'Gradually add dry ingredients until a smooth, non-sticky dough forms',
      'Divide dough into two flat discs, wrap in plastic wrap',
      'Refrigerate at least 1 hour (or overnight) — this is non-negotiable for clean cuts',
      'When ready to roll, work with one disc at a time, keep the rest chilled',
      'Roll between two sheets of parchment to avoid sticking and adding extra flour',
      'Roll to exactly ¼ inch thick — thinner burns, thicker stays raw in the middle',
      'Cut shapes close together to minimize re-rolling scraps',
      'Transfer cut shapes to parchment-lined baking sheets using a thin spatula',
      'Chill cut cookies on sheet 15 minutes before baking for sharpest edges',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C) — 325°F for shortbread-style rolled cookies',
      'Bake one sheet at a time in the center of the oven',
      'Bake 8–12 minutes depending on thickness and desired result',
      'Soft cookies: remove when edges are just set with no color',
      'Crispier cookies: bake until edges are lightly golden',
      'Cool on pan 5 minutes, then transfer to a wire rack',
      'Cool completely before decorating with royal icing or frosting',
    ],
    doneness: 'Edges just set with minimal color for soft. Lightly golden edges for crispier result. Centers may look slightly underdone — they firm up as they cool.',
    tips: [
      'Two rounds of chilling (dough disc + cut shapes) = sharp, clean edges every time',
      'Roll between parchment sheets — no extra flour means consistent texture throughout',
      'A ruler or wooden dowels alongside your rolling pin ensures perfectly even thickness',
      'Use cutters dipped in flour for clean release on sticky doughs',
      'Re-rolled scraps are tougher — use for less important shapes',
      'Royal icing recipe: 2 cups powdered sugar + 1½ tbsp meringue powder + 3 tbsp water',
      'For gingerbread: slightly underbake for soft; fully golden for a crispier snap',
    ],
    storage: 'Undecorated: airtight container up to 1 week. Royal iced (dried): stack with parchment layers, 2 weeks at room temp. Freeze undecorated up to 3 months.',
    commonMistakes: [
      'Skipping the chill — warm dough spreads and shapes blur in the oven',
      'Rolling too thin — cookies burn before edges set',
      'Rolling too thick — cookies look underdone and are doughy in the center',
      'Re-rolling scraps too many times — overworked dough gets tough',
      'Decorating before fully cooled — icing melts and slides',
    ],
  },
  'fried-cookie': {
    tempF: 350, tempC: 175, timeMin: 2, timeMax: 4,
    prepSteps: [
      'Use a deep, heavy-bottomed pot or Dutch oven — at least 4 inches of oil depth',
      'Use a neutral oil with high smoke point: vegetable, canola, or peanut oil',
      'A deep-fry or candy thermometer is essential — do not guess oil temperature',
      'Heat oil to exactly 350°F (175°C) before adding any dough',
      'For batter-based recipes (zeppole, funnel cake): mix batter just until combined — lumps are fine',
      'For dough-based recipes (buñuelos, angel wings, chruściki): knead until smooth, rest 15–30 min',
      'For yeast recipes (beignets): allow full rise time — 1 hour minimum',
      'Set up a draining station: wire rack over a baking sheet, or layers of paper towels',
      'Have toppings ready (powdered sugar, cinnamon sugar, honey) before first batch hits the oil',
      'Work in small batches — overcrowding drops oil temperature and makes greasy cookies',
    ],
    bakingSteps: [
      'Heat oil to 350°F — verify with thermometer, not by eye',
      'Fry in batches of 4–6 pieces maximum to maintain oil temperature',
      'For balls/drops: use two spoons or a cookie scoop to drop portions into hot oil',
      'For flat shapes (buñuelos, angel wings): slide in gently along the oil surface',
      'For funnel cake: pour batter in a slow spiral through a funnel or squeeze bottle',
      'Fry 1–3 minutes per side — golden brown is the target color',
      'Use a spider skimmer or slotted spoon to turn pieces halfway through',
      'Remove when deep golden — they darken slightly after removal',
      'Drain on wire rack or paper towels 1–2 minutes',
      'Top with powdered sugar, cinnamon sugar, or honey while still warm',
    ],
    doneness: 'Deep golden brown on all sides. Internal temp 190°F+ for dough-based. Hollow sound when tapped for crispy varieties.',
    tips: [
      'Temperature control is everything — too cool = greasy and pale, too hot = burnt outside/raw inside',
      'Let oil return to 350°F between each batch — takes about 1–2 minutes',
      'Dust with powdered sugar immediately after draining while still hot — it adheres better',
      'For angel wings: roll the dough as thin as possible — almost translucent',
      'For beignets: don\'t rush the yeast rise — under-risen dough fries up dense',
      'Test one piece first to check oil temp and timing before committing the whole batch',
      'A spider skimmer (flat wire basket on a handle) is the best tool for removing fried cookies',
    ],
    storage: 'Best eaten immediately — fried cookies lose their crispness within hours. If needed, store uncovered at room temp up to 1 day. Re-crisp in a 350°F oven for 5 minutes. Do not refrigerate — steam makes them soggy.',
    commonMistakes: [
      'Oil too cold — cookies absorb oil and turn out greasy and pale',
      'Oil too hot — outside burns before inside cooks through',
      'Overcrowding the pot — drops oil temp, causes uneven cooking and greasy results',
      'Not letting oil recover between batches — second batch always greasier if you rush',
      'Skipping the thermometer — guessing oil temperature is the #1 cause of failure',
      'Topping after cooling — powdered sugar won\'t stick to cold fried dough; do it warm',
    ],
  },
  'bar-cookie': {
    tempF: 350, tempC: 175, timeMin: 20, timeMax: 30,
    prepSteps: [
      'Grease your baking pan or line with parchment paper with overhang for easy lifting',
      'Melt butter fully if the recipe calls for melted butter — don\'t use softened by mistake',
      'For layered bars (lemon bars, magic bars): prepare crust and filling separately',
      'Measure all ingredients before starting — bar batters come together fast',
      'For brownies: whisk eggs and sugar vigorously for at least 1 minute to build structure',
    ],
    bakingSteps: [
      'Preheat oven to 350°F (175°C)',
      'Spread batter evenly in pan — use an offset spatula or wet fingers',
      'Tap pan on counter once to release air bubbles and level the batter',
      'For two-layer bars: bake crust 12–15 min first, then add filling and bake again',
      'Bake 20–30 minutes depending on pan size and recipe',
      'Test doneness with a toothpick in the center',
      'Cool COMPLETELY in pan before cutting — this is non-negotiable',
    ],
    doneness: 'Toothpick comes out with moist crumbs (not wet batter). Edges will pull slightly from sides of pan.',
    tips: [
      'Parchment with overhang = easy lift-out and clean cuts',
      'Cool completely before cutting — warm bars crumble and smear',
      'Refrigerate 30 min after cooling for the cleanest cuts',
      'Use a sharp knife wiped clean between each cut for perfect edges',
      'A 9x13 pan bakes thinner/faster than 8x8 — adjust time accordingly',
      'Brownies are done when the toothpick has moist crumbs, not wet batter',
    ],
    storage: 'Airtight container at room temperature 4 days, or refrigerate up to 1 week. Most bar cookies freeze beautifully — cut, wrap individually, freeze up to 3 months.',
    commonMistakes: [
      'Cutting bars while warm — they fall apart and smear',
      'Overbaking — bars firm up significantly as they cool',
      'Not lining the pan — impossible to remove cleanly without parchment',
      'Uneven spreading — thinner edges overbake while the center stays raw',
    ],
  },
  'no-bake': {
    tempF: 0, tempC: 0, timeMin: 20, timeMax: 45,
    prepSteps: [
      'Measure ALL ingredients before starting — stovetop no-bakes move fast once boiling',
      'Line baking sheets or a 9x13 pan with parchment paper before you begin',
      'For stovetop boil method (classic oatmeal cookies): use a heavy-bottomed saucepan to prevent scorching',
      'For melt-and-mix method (chocolate clusters, cornflake cookies): use microwave in 30-second bursts or a double boiler',
      'For ball method (PB oat balls, energy cookies): all mixing is cold — just stir and roll',
      'For Rice Krispie treats: grease your hands or spatula with butter to prevent sticking when pressing',
      'Have a cookie scoop or tablespoon ready to portion quickly — mixtures set fast',
    ],
    bakingSteps: [
      'STOVETOP BOIL METHOD: Combine butter, sugar, milk, and cocoa in saucepan over medium heat',
      'Stir constantly until mixture comes to a FULL rolling boil',
      'Once at a full boil, cook exactly 60 seconds — no more, no less — then remove from heat',
      'Quickly stir in peanut butter, vanilla, and oats — work fast, mixture thickens rapidly',
      'Drop by spoonfuls onto parchment paper immediately',
      'MELT METHOD: Melt chocolate in microwave (30s bursts) or double boiler until smooth',
      'Stir in mix-ins (coconut, nuts, cereal) and drop onto parchment',
      'BALL METHOD: Mix all ingredients, roll into balls by hand, place on parchment',
      'Refrigerate 20–45 minutes until fully set before serving',
    ],
    doneness: 'Firm to the touch, no longer sticky, holds shape when lifted. Chocolate-based: fully hardened. Oat-based: set but slightly chewy.',
    tips: [
      'The 60-second boil is critical — under-boiling = cookies never set; over-boiling = dry and crumbly',
      'Work FAST after removing from heat — the mixture sets in minutes',
      'If cookies don\'t set after 30 minutes, they were likely under-boiled — refrigerate to help firm them up',
      'If cookies are dry and crumbly, they were over-boiled — nothing to fix, but still taste good',
      'A candy thermometer takes the guesswork out — boil to 234°F (soft ball stage)',
      'For chocolate clusters: tempered chocolate sets shinier and snappier — melt 2/3, stir in remaining 1/3 off heat',
      'Energy ball dough too sticky? Refrigerate 15 minutes before rolling',
      'Add a pinch of flaky salt on top of chocolate clusters before they set for extra flavour',
    ],
    storage: 'Airtight container at room temperature 5 days, or refrigerate up to 2 weeks for firmer texture. Most no-bake cookies freeze well up to 3 months — freeze in a single layer first, then transfer to a bag.',
    commonMistakes: [
      'Not boiling long enough — the #1 cause of cookies that never firm up',
      'Boiling too long — cookies turn dry, grainy, and crumbly',
      'Working too slowly after removing from heat — mixture seizes before you can scoop it',
      'Not measuring time — use a timer for the 60-second boil, not your gut',
      'Melting chocolate too hot — scorches and turns grainy; use low heat and short bursts',
      'Skipping parchment — cookies stick to plates or pans and tear when lifted',
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
