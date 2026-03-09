import { RecipeIngredient } from '../types/cookie';

export interface RecipePreset {
  id: string;
  name: string;
  cookieTypeId: string;
  description: string;
  servings: string;
  ingredients: RecipeIngredient[];
}

export const recipePresets: RecipePreset[] = [
  // DROP COOKIES
  {
    id: 'classic-chocolate-chip',
    name: 'Classic Chocolate Chip Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'The original Toll House recipe - America\'s favorite cookie',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },
      { id: '2', ingredientId: 'sugar-brown', amount: 150 },
      { id: '3', ingredientId: 'sugar-white', amount: 100 },
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 10 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 },
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
      { id: '9', ingredientId: 'chocolate-chips-semisweet', amount: 340 },
    ],
  },
  {
    id: 'oatmeal-raisin',
    name: 'Oatmeal Raisin Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Wholesome oats with sweet raisins and warm cinnamon',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-brown', amount: 165 },
      { id: '3', ingredientId: 'sugar-white', amount: 100 },
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 190 },
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
      { id: '9', ingredientId: 'oats-rolled', amount: 240 },
      { id: '10', ingredientId: 'raisins', amount: 150 },
    ],
  },
  {
    id: 'double-chocolate-chunk',
    name: 'Double Chocolate Chunk',
    cookieTypeId: 'drop-cookie',
    description: 'Rich cocoa dough with dark chocolate chunks',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },
      { id: '2', ingredientId: 'sugar-brown', amount: 200 },
      { id: '3', ingredientId: 'sugar-white', amount: 100 },
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 10 },
      { id: '6', ingredientId: 'flour-ap', amount: 250 },
      { id: '7', ingredientId: 'cocoa-powder', amount: 50 },
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 5 },
      { id: '10', ingredientId: 'chocolate-chips-dark', amount: 340 },
    ],
  },


  // --- NEW DROP COOKIE RECIPES ---
  {
    id: 'peanut-butter-drop',
    name: 'Classic Peanut Butter Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Simple 3-ingredient peanut butter cookies, naturally gluten-free',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },       // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },          // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'white-choc-macadamia',
    name: 'White Chocolate Macadamia',
    cookieTypeId: 'drop-cookie',
    description: 'Buttery cookies loaded with white chocolate and macadamia nuts',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },      // 1 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 150 },           // 3/4 cup
      { id: '3', ingredientId: 'sugar-white', amount: 150 },           // 3/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 },              // 2 1/4 cups
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
      { id: '9', ingredientId: 'macadamia', amount: 130 },             // 1 cup
      { id: '10', ingredientId: 'chocolate-chips-white', amount: 170 }, // 1 cup
    ],
  },
  {
    id: 'snickerdoodle-drop',
    name: 'Snickerdoodle Drop Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Classic cinnamon-sugar cookies with cream of tartar tang',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },      // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 300 },           // 1 1/2 cups
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'flour-ap', amount: 345 },              // 2 3/4 cups
      { id: '5', ingredientId: 'cream-tartar', amount: 8 },            // 2 tsp
      { id: '6', ingredientId: 'baking-soda', amount: 5 },
      { id: '7', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'pumpkin-drop',
    name: 'Pumpkin Spice Drop Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Moist pumpkin cookies with warm fall spices',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'pumpkin-puree', amount: 244 },         // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },           // 1 cup
      { id: '3', ingredientId: 'oil-vegetable', amount: 109 },         // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },              // 2 cups
      { id: '6', ingredientId: 'baking-soda', amount: 5 },
      { id: '7', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '8', ingredientId: 'nutmeg-ground', amount: 2 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'lemon-drop',
    name: 'Lemon Drop Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Bright, tangy lemon cookies with a light glaze',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },      // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },           // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'lemon-extract', amount: 10 },          // 2 tbsp lemon juice equiv
      { id: '5', ingredientId: 'lemon-zest', amount: 6 },              // zest of 1 lemon
      { id: '6', ingredientId: 'flour-ap', amount: 250 },              // 2 cups
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'coconut-drop',
    name: 'Coconut Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Buttery drop cookies loaded with shredded coconut',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },      // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },           // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },              // 2 cups
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
      { id: '8', ingredientId: 'coconut-shredded', amount: 120 },      // 1 1/2 cups
    ],
  },
  {
    id: 'molasses-ginger-drop',
    name: 'Molasses Ginger Cookies',
    cookieTypeId: 'drop-cookie',
    description: 'Spiced molasses cookies rolled in sugar — chewy and aromatic',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },      // 3/4 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },           // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'molasses', amount: 85 },               // 1/4 cup
      { id: '5', ingredientId: 'flour-ap', amount: 250 },              // 2 cups
      { id: '6', ingredientId: 'baking-soda', amount: 5 },
      { id: '7', ingredientId: 'ginger-ground', amount: 5 },
      { id: '8', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },

  // SOFT CAKE COOKIES
  {
    id: 'lofthouse-sugar',
    name: 'Lofthouse-Style Sugar Cookies',
    cookieTypeId: 'soft-cake',
    description: 'Ultra-soft frosted cookies like the bakery style',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 10 },
      { id: '5', ingredientId: 'sour-cream', amount: 60 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 },
      { id: '7', ingredientId: 'baking-powder', amount: 10 },
      { id: '8', ingredientId: 'baking-soda', amount: 3 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'pumpkin-spice',
    name: 'Pumpkin Spice Cookies',
    cookieTypeId: 'soft-cake',
    description: 'Pillowy soft with warm fall spices',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },
      { id: '2', ingredientId: 'sugar-brown', amount: 200 },
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'pumpkin-puree', amount: 120 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 },
      { id: '7', ingredientId: 'baking-powder', amount: 8 },
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },

  // SHORTBREAD
  {
    id: 'scottish-shortbread',
    name: 'Traditional Scottish Shortbread',
    cookieTypeId: 'shortbread',
    description: 'Classic 1-2-3 ratio: sugar, butter, flour',
    servings: '24 wedges',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },
      { id: '2', ingredientId: 'sugar-powdered', amount: 65 },
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 280 },
      { id: '5', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'brown-butter-shortbread',
    name: 'Brown Butter Shortbread',
    cookieTypeId: 'shortbread',
    description: 'Nutty brown butter elevates classic shortbread',
    servings: '32 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },
      { id: '2', ingredientId: 'sugar-brown', amount: 100 },
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },
      { id: '5', ingredientId: 'salt', amount: 3 },
    ],
  },

  // SUGAR COOKIES
  {
    id: 'rollout-sugar',
    name: 'Roll-Out Sugar Cookies',
    cookieTypeId: 'sugar-cookie',
    description: 'Perfect for cookie cutters and royal icing',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 },
      { id: '6', ingredientId: 'baking-powder', amount: 8 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'soft-sugar',
    name: 'Soft Sugar Cookies',
    cookieTypeId: 'sugar-cookie',
    description: 'Thick and soft with a gentle crumb',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-white', amount: 250 },
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 10 },
      { id: '5', ingredientId: 'sour-cream', amount: 60 },
      { id: '6', ingredientId: 'flour-ap', amount: 375 },
      { id: '7', ingredientId: 'baking-powder', amount: 8 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },

  // SNICKERDOODLES
  {
    id: 'classic-snickerdoodle',
    name: 'Classic Snickerdoodles',
    cookieTypeId: 'snickerdoodle',
    description: 'Tangy cream of tartar with cinnamon sugar coating',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-white', amount: 300 },
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },
      { id: '6', ingredientId: 'cream-tartar', amount: 5 },
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },

  // BROWNIE COOKIES
  {
    id: 'chocolate-crinkle',
    name: 'Chocolate Crinkle Cookies',
    cookieTypeId: 'brownie-cookie',
    description: 'Fudgy chocolate cookies with powdered sugar cracks',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'sugar-brown', amount: 100 },
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'cocoa-powder', amount: 75 },
      { id: '7', ingredientId: 'flour-ap', amount: 125 },
      { id: '8', ingredientId: 'baking-powder', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
      { id: '10', ingredientId: 'chocolate-chips-dark', amount: 170 },
    ],
  },

  // BISCOTTI
  {
    id: 'almond-biscotti',
    name: 'Classic Almond Biscotti',
    cookieTypeId: 'biscotti',
    description: 'Twice-baked Italian cookies perfect for coffee',
    servings: '30 biscotti',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 56 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 },
      { id: '6', ingredientId: 'baking-powder', amount: 8 },
      { id: '7', ingredientId: 'salt', amount: 3 },
      { id: '8', ingredientId: 'almonds', amount: 150 },
    ],
  },

  // PRESSED BUTTER COOKIES
  {
    id: 'spritz-cookies',
    name: 'Classic Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Buttery pressed cookies with festive shapes',
    servings: '60 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },
      { id: '2', ingredientId: 'sugar-white', amount: 100 },
      { id: '3', ingredientId: 'egg-yolk', amount: 20, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },
      { id: '6', ingredientId: 'salt', amount: 2 },
    ],
  },

  // SLICE & BAKE
  {
    id: 'vanilla-slice-bake',
    name: 'Vanilla Slice & Bake',
    cookieTypeId: 'slice-bake',
    description: 'Classic refrigerator cookies ready to slice',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 10 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'chocolate-pinwheel',
    name: 'Chocolate Pinwheel Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Swirled vanilla and chocolate dough',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },
      { id: '6', ingredientId: 'cocoa-powder', amount: 30 },
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },

  // MOLDED COOKIES
  {
    id: 'peanut-butter-classic',
    name: 'Classic Peanut Butter Cookies',
    cookieTypeId: 'molded',
    description: 'Fork-pressed peanut butter cookies',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },
      { id: '2', ingredientId: 'peanut-butter', amount: 250 },
      { id: '3', ingredientId: 'sugar-brown', amount: 100 },
      { id: '4', ingredientId: 'sugar-white', amount: 100 },
      { id: '5', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '6', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '7', ingredientId: 'flour-ap', amount: 190 },
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 5 },
    ],
  },

  // MACARON/MERINGUE
  {
    id: 'coconut-macaroons',
    name: 'Coconut Macaroons',
    cookieTypeId: 'macaron-meringue',
    description: 'Chewy coconut cookies with crispy edges',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'medium', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 200 },
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'coconut-shredded', amount: 300 },
      { id: '5', ingredientId: 'salt', amount: 2 },
    ],
  },

  // NO-BAKE
  {
    id: 'no-bake-chocolate',
    name: 'No-Bake Chocolate Oatmeal',
    cookieTypeId: 'no-bake',
    description: 'Quick stovetop cookies that set firm',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },
      { id: '2', ingredientId: 'milk-whole', amount: 120 },
      { id: '3', ingredientId: 'sugar-white', amount: 400 },
      { id: '4', ingredientId: 'cocoa-powder', amount: 40 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'peanut-butter', amount: 120 },
      { id: '7', ingredientId: 'oats-quick', amount: 270 },
    ],
  },









  // ── MERINGUE COOKIES ──────────────────────────────────────────
  {
    id: 'classic-vanilla-meringue',
    name: 'Classic Vanilla Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Light-as-air crisp meringue kisses with pure vanilla — melt in your mouth',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },              // 1/4 tsp
      { id: '5', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'choc-chip-meringue',
    name: 'Chocolate Chip Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Crisp vanilla meringue with mini chocolate chips folded gently throughout',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },
      { id: '5', ingredientId: 'mini-choc-chips', amount: 85 },          // 1/2 cup
    ],
  },
  {
    id: 'lemon-meringue-cookies',
    name: 'Lemon Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Bright citrus meringue with lemon zest and juice folded in at the end',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'lemon-zest', amount: 4 },                // 1 tsp
      { id: '4', ingredientId: 'lemon-extract', amount: 5 },             // 1 tsp lemon juice equiv
      { id: '5', ingredientId: 'cream-tartar', amount: 1 },
    ],
  },
  {
    id: 'coffee-meringue',
    name: 'Coffee Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Espresso-kissed meringues with a subtle bitter coffee note against sweet crisp shell',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'cream-tartar', amount: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 3 },
    ],
  },
  {
    id: 'coconut-meringue',
    name: 'Coconut Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Crisp meringue with finely shredded coconut folded in — tropical and light',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'coconut-shredded', amount: 40 },         // 1/2 cup finely shredded
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'peppermint-meringue',
    name: 'Peppermint Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Cool peppermint meringues — optionally striped red and topped with crushed candy canes',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'peppermint-extract', amount: 3 },        // 1/2 tsp
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },
      { id: '5', ingredientId: 'candy-cane-pieces', amount: 20 },        // crushed, optional topping
    ],
  },
  {
    id: 'raspberry-meringue',
    name: 'Raspberry Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Pink meringues flavoured with freeze-dried raspberry powder — naturally vibrant',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'cream-tartar', amount: 1 },
      { id: '4', ingredientId: 'cranberries-dried', amount: 15 },        // freeze-dried raspberry powder equiv
    ],
  },
  {
    id: 'pistachio-meringue',
    name: 'Pistachio Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Crisp meringue with finely chopped pistachios and almond extract — elegant and nutty',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'pistachios', amount: 65 },               // 1/2 cup finely chopped
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },
      { id: '5', ingredientId: 'almond-extract', amount: 3 },            // 1/2 tsp
    ],
  },
  {
    id: 'chocolate-swirl-meringue',
    name: 'Chocolate Swirl Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Vanilla meringue with melted chocolate swirled in for a dramatic marbled effect',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'cream-tartar', amount: 1 },
      { id: '4', ingredientId: 'chocolate-chips-dark', amount: 35 },     // 2 tbsp melted
    ],
  },
  {
    id: 'hazelnut-meringue',
    name: 'Hazelnut Meringue Cookies',
    cookieTypeId: 'macaron-meringue',
    description: 'Ground hazelnuts folded into vanilla meringue — nutty, crisp, and delicate',
    servings: '36 meringues',
    ingredients: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'large', eggQuantity: 3 },
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'hazelnuts', amount: 65 },                // 1/2 cup ground
      { id: '4', ingredientId: 'cream-tartar', amount: 1 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 3 },
    ],
  },

  // ── FRIED COOKIES ─────────────────────────────────────────────
  {
    id: 'italian-zeppole',
    name: 'Italian Zeppole (Fried Dough Balls)',
    cookieTypeId: 'fried-cookie',
    description: 'Classic Italian fried dough balls — crispy outside, airy inside, dusted with powdered sugar',
    servings: '24 zeppole',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'baking-powder', amount: 8 },             // 2 tsp
      { id: '3', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '4', ingredientId: 'salt', amount: 2 },
      { id: '5', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '6', ingredientId: 'milk-whole', amount: 240 },              // 1 cup
      { id: '7', ingredientId: 'sugar-powdered', amount: 30 },           // for topping
    ],
  },
  {
    id: 'mexican-bunuelos',
    name: 'Mexican Buñuelos',
    cookieTypeId: 'fried-cookie',
    description: 'Thin, crispy fried discs coated in cinnamon sugar — a Mexican holiday staple',
    servings: '16 buñuelos',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'sugar-white', amount: 12 },              // 1 tbsp
      { id: '3', ingredientId: 'baking-powder', amount: 5 },
      { id: '4', ingredientId: 'salt', amount: 2 },
      { id: '5', ingredientId: 'butter-unsalted', amount: 28 },          // 2 tbsp melted
      { id: '6', ingredientId: 'water', amount: 180 },                   // 3/4 cup warm
      { id: '7', ingredientId: 'sugar-white', amount: 100 },             // 1/2 cup cinnamon sugar
      { id: '8', ingredientId: 'cinnamon-ground', amount: 5 },
    ],
  },
  {
    id: 'fried-oreos',
    name: 'Fried Oreos',
    cookieTypeId: 'fried-cookie',
    description: 'Oreos dipped in pancake batter and deep-fried — a carnival classic',
    servings: '24 fried Oreos',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 125 },                // 1 cup pancake mix equiv
      { id: '2', ingredientId: 'milk-whole', amount: 180 },              // 3/4 cup
      { id: '3', ingredientId: 'baking-powder', amount: 5 },
      { id: '4', ingredientId: 'sugar-white', amount: 12 },
      { id: '5', ingredientId: 'sugar-powdered', amount: 30 },           // for topping
    ],
  },
  {
    id: 'funnel-cake-cookies',
    name: 'Funnel Cake Cookies',
    cookieTypeId: 'fried-cookie',
    description: 'Classic fair funnel cake batter poured in spirals into hot oil — crispy and sweet',
    servings: '8 funnel cakes',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'baking-powder', amount: 5 },
      { id: '3', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'milk-whole', amount: 360 },              // 1 1/2 cups
      { id: '6', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '7', ingredientId: 'sugar-powdered', amount: 30 },           // for dusting
    ],
  },
  {
    id: 'polish-chrusciki',
    name: 'Polish Chruściki (Angel Wings)',
    cookieTypeId: 'fried-cookie',
    description: 'Paper-thin twisted pastry strips fried golden and dusted in powdered sugar — Polish holiday tradition',
    servings: '36 angel wings',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'egg-yolk', amount: 60, eggSize: 'medium', eggQuantity: 3 },
      { id: '3', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '4', ingredientId: 'sour-cream', amount: 60 },               // 1/4 cup
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'sugar-powdered', amount: 60 },           // for dusting
    ],
  },
  {
    id: 'apple-fritter-cookies',
    name: 'Apple Fritter Cookies',
    cookieTypeId: 'fried-cookie',
    description: 'Cinnamon batter studded with fresh diced apples, fried until golden',
    servings: '20 fritters',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 190 },                // 1 1/2 cups
      { id: '2', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '3', ingredientId: 'baking-powder', amount: 5 },
      { id: '4', ingredientId: 'cinnamon-ground', amount: 3 },
      { id: '5', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '6', ingredientId: 'milk-whole', amount: 120 },              // 1/2 cup
      { id: '7', ingredientId: 'pumpkin-puree', amount: 150 },           // 1 cup diced apples equiv
    ],
  },
  {
    id: 'honey-fried-cookies',
    name: 'Honey Fried Cookies',
    cookieTypeId: 'fried-cookie',
    description: 'Simple fried dough shapes drizzled with warm honey — rustic and satisfying',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'butter-unsalted', amount: 28 },          // 2 tbsp
      { id: '5', ingredientId: 'honey', amount: 170 },                   // 1/2 cup for drizzle
    ],
  },
  {
    id: 'carnival-cookie-twists',
    name: 'Carnival Fried Cookie Twists',
    cookieTypeId: 'fried-cookie',
    description: 'Twisted dough ropes fried crispy and sprinkled with sugar — carnival fair staple',
    servings: '24 twists',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'milk-whole', amount: 120 },              // 1/2 cup
      { id: '5', ingredientId: 'baking-powder', amount: 5 },
    ],
  },
  {
    id: 'beignet-cookies',
    name: 'Beignet Cookies',
    cookieTypeId: 'fried-cookie',
    description: 'Yeast-risen dough squares fried and buried in powdered sugar — New Orleans style',
    servings: '24 beignets',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '3', ingredientId: 'milk-whole', amount: 180 },              // 3/4 cup warm
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'sugar-powdered', amount: 60 },           // heavy dusting
    ],
  },
  {
    id: 'italian-struffoli',
    name: 'Italian Struffoli',
    cookieTypeId: 'fried-cookie',
    description: 'Tiny fried dough balls tossed in warm honey and topped with sprinkles — Neapolitan Christmas classic',
    servings: '48 pieces',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '2', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '3', ingredientId: 'sugar-white', amount: 25 },              // 2 tbsp
      { id: '4', ingredientId: 'butter-unsalted', amount: 28 },          // 2 tbsp
      { id: '5', ingredientId: 'honey', amount: 170 },                   // 1/2 cup for coating
      { id: '6', ingredientId: 'sprinkles', amount: 20 },                // for topping
    ],
  },

  // ── NO-BAKE COOKIES ───────────────────────────────────────────
  {
    id: 'classic-choc-pb-oatmeal',
    name: 'Classic Chocolate Peanut Butter Oatmeal',
    cookieTypeId: 'no-bake',
    description: 'The original stovetop no-bake — boiled chocolate fudge mixed with oats and peanut butter',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 400 },             // 2 cups
      { id: '3', ingredientId: 'milk-whole', amount: 120 },              // 1/2 cup
      { id: '4', ingredientId: 'cocoa-powder', amount: 25 },             // 1/4 cup
      { id: '5', ingredientId: 'peanut-butter', amount: 129 },           // 1/2 cup
      { id: '6', ingredientId: 'oats-quick', amount: 240 },              // 3 cups
      { id: '7', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'pb-no-bake-balls',
    name: 'Peanut Butter No-Bake Cookies',
    cookieTypeId: 'no-bake',
    description: 'Simple 4-ingredient peanut butter oat balls sweetened with honey',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },           // 1 cup
      { id: '2', ingredientId: 'honey', amount: 170 },                   // 1/2 cup
      { id: '3', ingredientId: 'oats-quick', amount: 160 },              // 2 cups
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'choc-coconut-clusters',
    name: 'Chocolate Coconut Clusters',
    cookieTypeId: 'no-bake',
    description: 'Melted chocolate mixed with coconut and almonds — set in the fridge',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'chocolate-chips-semisweet', amount: 340 }, // 2 cups
      { id: '2', ingredientId: 'coconut-shredded', amount: 160 },          // 2 cups
      { id: '3', ingredientId: 'almonds', amount: 55 },                    // 1/2 cup chopped
    ],
  },
  {
    id: 'nutella-oat-cookies',
    name: 'Nutella Oat Cookies',
    cookieTypeId: 'no-bake',
    description: 'Nutella and oat balls with hazelnuts — no stove required',
    servings: '20 cookies',
    ingredients: [
      { id: '1', ingredientId: 'chocolate-chips-milk', amount: 170 },    // ~1 cup Nutella equiv
      { id: '2', ingredientId: 'oats-quick', amount: 120 },               // 1 1/2 cups
      { id: '3', ingredientId: 'hazelnuts', amount: 55 },                 // 1/2 cup chopped
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'no-bake-coconut-macaroons',
    name: 'No-Bake Coconut Macaroons',
    cookieTypeId: 'no-bake',
    description: 'Three-ingredient coconut mounds set in the fridge — optionally dipped in chocolate',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'coconut-shredded', amount: 240 },        // 3 cups
      { id: '2', ingredientId: 'sweetened-condensed-milk', amount: 396 }, // 1 can (14 oz)
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'rice-krispie-treats',
    name: 'Rice Krispie Cookie Treats',
    cookieTypeId: 'no-bake',
    description: 'Classic marshmallow and cereal treats pressed into a pan and cut into squares',
    servings: '24 bars',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 42 },          // 3 tbsp
      { id: '2', ingredientId: 'marshmallow-fluff', amount: 283 },        // 10 oz bag marshmallows
      { id: '3', ingredientId: 'rice-krispies', amount: 168 },            // 6 cups
    ],
  },
  {
    id: 'almond-butter-energy',
    name: 'Almond Butter Energy Cookies',
    cookieTypeId: 'no-bake',
    description: 'Almond butter and honey oat balls with mini chocolate chips — healthy snack cookie',
    servings: '20 cookies',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },           // 1 cup almond butter
      { id: '2', ingredientId: 'honey', amount: 170 },                   // 1/2 cup
      { id: '3', ingredientId: 'oats-quick', amount: 80 },               // 1 cup
      { id: '4', ingredientId: 'mini-choc-chips', amount: 85 },          // 1/2 cup
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'pb-cornflake-cookies',
    name: 'Chocolate Peanut Butter Cornflake Cookies',
    cookieTypeId: 'no-bake',
    description: 'Melted peanut butter and chocolate with crunchy cornflakes — sets firm in the fridge',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },           // 1 cup
      { id: '2', ingredientId: 'chocolate-chips-semisweet', amount: 170 }, // 1 cup
      { id: '3', ingredientId: 'cornflakes-crushed', amount: 84 },       // 3 cups
    ],
  },
  {
    id: 'honey-oat-energy',
    name: 'Honey Oat Energy Cookies',
    cookieTypeId: 'no-bake',
    description: 'Peanut butter and honey oat balls with raisins and sunflower seeds',
    servings: '20 cookies',
    ingredients: [
      { id: '1', ingredientId: 'honey', amount: 170 },                   // 1/2 cup
      { id: '2', ingredientId: 'peanut-butter', amount: 129 },           // 1/2 cup
      { id: '3', ingredientId: 'oats-quick', amount: 80 },               // 1 cup
      { id: '4', ingredientId: 'raisins', amount: 75 },                  // 1/2 cup
      { id: '5', ingredientId: 'sunflower-seeds', amount: 35 },          // 1/4 cup
    ],
  },
  {
    id: 'chocolate-nut-clusters',
    name: 'Chocolate Nut Clusters',
    cookieTypeId: 'no-bake',
    description: 'Melted chocolate with a trio of peanuts, almonds, and cashews — sets firm',
    servings: '24 clusters',
    ingredients: [
      { id: '1', ingredientId: 'chocolate-chips-semisweet', amount: 340 }, // 2 cups
      { id: '2', ingredientId: 'peanuts', amount: 145 },                   // 1 cup
      { id: '3', ingredientId: 'almonds', amount: 145 },                   // 1 cup
      { id: '4', ingredientId: 'cashews', amount: 130 },                   // 1 cup
    ],
  },

  // ── SANDWICH COOKIES ──────────────────────────────────────────
  {
    id: 'chocolate-cream-sandwich',
    name: 'Chocolate Cream Sandwich Cookies (Oreo-Style)',
    cookieTypeId: 'sandwich-cookie',
    description: 'Crisp chocolate wafers with classic white vanilla cream filling — homemade Oreos',
    servings: '24 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'cocoa-powder', amount: 75 },             // 3/4 cup (cookie)
      { id: '7', ingredientId: 'baking-soda', amount: 3 },
      { id: '8', ingredientId: 'salt', amount: 1 },
      { id: '9', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup (filling)
      { id: '10', ingredientId: 'sugar-powdered', amount: 250 },         // 2 cups (filling)
      { id: '11', ingredientId: 'milk-whole', amount: 30 },              // 2 tbsp (filling)
    ],
  },
  {
    id: 'pb-sandwich-cookies',
    name: 'Peanut Butter Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Peanut butter cookies sandwiched with creamy peanut butter filling',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup (cookie)
      { id: '2', ingredientId: 'peanut-butter', amount: 258 },           // 1 cup (cookie)
      { id: '3', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup (cookie)
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 155 },                // 1 1/4 cups (cookie)
      { id: '7', ingredientId: 'baking-soda', amount: 3 },
      { id: '8', ingredientId: 'peanut-butter', amount: 129 },           // 1/2 cup (filling)
      { id: '9', ingredientId: 'sugar-powdered', amount: 125 },          // 1 cup (filling)
      { id: '10', ingredientId: 'milk-whole', amount: 30 },              // 2 tbsp (filling)
    ],
  },
  {
    id: 'whoopie-pies',
    name: 'Whoopie Pies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Soft chocolate cake-like rounds sandwiched with fluffy marshmallow buttercream',
    servings: '12 whoopie pies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'milk-whole', amount: 240 },              // 1 cup buttermilk equiv
      { id: '6', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '7', ingredientId: 'cocoa-powder', amount: 55 },             // 1/2 cup (cookie)
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
      { id: '10', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup (filling)
      { id: '11', ingredientId: 'marshmallow-fluff', amount: 200 },      // 1 jar (filling)
      { id: '12', ingredientId: 'sugar-powdered', amount: 250 },         // 2 cups (filling)
    ],
  },
  {
    id: 'linzer-cookies',
    name: 'Linzer Cookies (Raspberry Sandwich)',
    cookieTypeId: 'sandwich-cookie',
    description: 'Almond shortbread with a center window filled with raspberry jam — Austrian classic',
    servings: '18 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'almonds', amount: 100 },                 // 1 cup ground
      { id: '7', ingredientId: 'cinnamon-ground', amount: 3 },
    ],
  },
  {
    id: 'lemon-cream-sandwich',
    name: 'Lemon Cream Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Delicate lemon rounds filled with tangy lemon buttercream',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'lemon-zest', amount: 6 },                // 1 tbsp (cookie)
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup (filling)
      { id: '8', ingredientId: 'sugar-powdered', amount: 250 },          // 2 cups (filling)
      { id: '9', ingredientId: 'lemon-extract', amount: 30 },            // 2 tbsp lemon juice equiv (filling)
    ],
  },
  {
    id: 'chocolate-ganache-sandwich',
    name: 'Chocolate Ganache Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Rich chocolate cookies filled with silky chocolate ganache — intensely indulgent',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'cocoa-powder', amount: 55 },             // 1/2 cup (cookie)
      { id: '7', ingredientId: 'chocolate-chips-dark', amount: 170 },    // 1 cup (ganache)
      { id: '8', ingredientId: 'milk-whole', amount: 120 },              // 1/2 cup heavy cream equiv (ganache)
    ],
  },
  {
    id: 'nutella-sandwich',
    name: 'Nutella Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Simple butter cookies sandwiched with Nutella hazelnut spread',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
    ],
  },
  {
    id: 'marshmallow-sandwich',
    name: 'Marshmallow Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Crisp chocolate wafers filled with clouds of marshmallow fluff',
    servings: '24 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'cocoa-powder', amount: 75 },             // 3/4 cup (cookie)
      { id: '7', ingredientId: 'baking-soda', amount: 3 },
      { id: '8', ingredientId: 'marshmallow-fluff', amount: 200 },       // filling
    ],
  },
  {
    id: 'caramel-sandwich',
    name: 'Caramel Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Buttery shortbread rounds filled with thick, rich caramel sauce',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'caramel-bits', amount: 170 },            // filling
    ],
  },
  {
    id: 'vanilla-buttercream-sandwich',
    name: 'Vanilla Buttercream Sandwich Cookies',
    cookieTypeId: 'sandwich-cookie',
    description: 'Classic vanilla rounds sandwiched with fluffy vanilla buttercream',
    servings: '20 sandwich cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup (cookie)
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup (cookie)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups (cookie)
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup (filling)
      { id: '8', ingredientId: 'sugar-powdered', amount: 250 },          // 2 cups (filling)
      { id: '9', ingredientId: 'milk-whole', amount: 30 },               // 2 tbsp (filling)
    ],
  },

  // ── ICEBOX / SLICE & BAKE COOKIES ─────────────────────────────
  {
    id: 'classic-vanilla-icebox',
    name: 'Classic Vanilla Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'The original make-ahead cookie — clean vanilla slices with crisp golden edges',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 8 },           // 1 1/2 tsp
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'chocolate-icebox',
    name: 'Chocolate Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Rich cocoa slice-and-bake with deep chocolate flavour and crisp snap',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'cocoa-powder', amount: 55 },             // 1/2 cup
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'choc-chip-icebox',
    name: 'Chocolate Chip Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Brown sugar dough with mini chips — classic chocolate chip in sliceable form',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 165 },             // 3/4 cup packed
      { id: '3', ingredientId: 'sugar-white', amount: 50 },              // 1/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '7', ingredientId: 'baking-soda', amount: 3 },
      { id: '8', ingredientId: 'mini-choc-chips', amount: 170 },         // 1 cup mini chips
    ],
  },
  {
    id: 'lemon-icebox',
    name: 'Lemon Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Bright lemon zest cookies with a clean citrus snap — no egg version',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'lemon-zest', amount: 6 },                // zest of 1 lemon
      { id: '4', ingredientId: 'lemon-extract', amount: 15 },            // 1 tbsp lemon juice equiv
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'almond-icebox',
    name: 'Almond Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Almond extract dough with sliced almonds throughout — elegant and delicate',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'almond-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
      { id: '7', ingredientId: 'almonds', amount: 55 },                  // 1/2 cup sliced
    ],
  },
  {
    id: 'coconut-icebox',
    name: 'Coconut Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Shredded coconut folded into a buttery slice-and-bake log',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'coconut-shredded', amount: 40 },         // 1/2 cup
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'pistachio-icebox',
    name: 'Pistachio Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Finely chopped pistachios throughout a buttery log — green-speckled and elegant',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'pistachios', amount: 90 },               // 3/4 cup finely chopped
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'marble-icebox',
    name: 'Marble Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Swirled vanilla and chocolate doughs twisted into a stunning marble log',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'cocoa-powder', amount: 15 },             // 2 tbsp (for half the dough)
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'orange-icebox',
    name: 'Orange Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Orange zest and juice in a delicate butter cookie — no egg version',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'lemon-zest', amount: 8 },                // zest of 1 orange
      { id: '4', ingredientId: 'orange-extract', amount: 15 },           // 1 tbsp orange juice equiv
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'checkerboard-icebox',
    name: 'Checkerboard Icebox Cookies',
    cookieTypeId: 'slice-bake',
    description: 'Geometric black-and-white checkerboard pattern — a showstopper slice-and-bake',
    servings: '40 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'cocoa-powder', amount: 15 },             // 2 tbsp (for half the dough)
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },

  // ── PRESSED BUTTER / SPRITZ COOKIES ───────────────────────────
  {
    id: 'classic-butter-spritz',
    name: 'Classic Butter Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'The gold standard spritz — light, buttery, crisp edges with a melt-in-mouth center',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'almond-spritz',
    name: 'Almond Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Classic spritz with almond extract — a delicate, elegant flavour',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'almond-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'chocolate-spritz',
    name: 'Chocolate Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Cocoa-rich spritz with a deep chocolate flavour and crisp texture',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'cocoa-powder', amount: 25 },             // 1/4 cup
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'lemon-spritz',
    name: 'Lemon Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Bright lemon zest and juice in a delicate spritz cookie',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'lemon-zest', amount: 6 },                // 1 tbsp
      { id: '5', ingredientId: 'lemon-extract', amount: 15 },            // 1 tbsp lemon juice equiv
      { id: '6', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'maple-spritz',
    name: 'Maple Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Warmly sweet maple spritz with a subtle caramel note',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 100 },             // 1/2 cup
      { id: '3', ingredientId: 'maple-syrup', amount: 80 },              // 1/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'orange-spritz',
    name: 'Orange Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Orange zest spritz with a fresh citrus aroma — perfect for the holidays',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'lemon-zest', amount: 8 },                // 1 tbsp orange zest (use lemon-zest id)
      { id: '6', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'pistachio-spritz',
    name: 'Pistachio Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Finely ground pistachios add a gorgeous green hue and nutty flavour',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'pistachios', amount: 65 },               // 1/2 cup finely ground
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'coconut-spritz',
    name: 'Coconut Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Finely shredded coconut folded into classic spritz dough for tropical flavour',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'coconut-shredded', amount: 40 },         // 1/2 cup finely shredded
      { id: '7', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'choc-chip-spritz',
    name: 'Chocolate Chip Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Classic spritz with mini chocolate chips folded in — fun and kid-friendly',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
      { id: '7', ingredientId: 'mini-choc-chips', amount: 85 },          // 1/2 cup mini chips
    ],
  },
  {
    id: 'holiday-spritz',
    name: 'Holiday Spritz Cookies',
    cookieTypeId: 'pressed-butter',
    description: 'Classic spritz dough ready to color and decorate for any holiday occasion',
    servings: '48 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'salt', amount: 1 },
      { id: '7', ingredientId: 'sprinkles', amount: 20 },                // optional decoration
    ],
  },

  // ── MOLDED COOKIES ─────────────────────────────────────────────
  {
    id: 'pb-fork-cookies',
    name: 'Classic Peanut Butter Fork Cookies',
    cookieTypeId: 'molded',
    description: 'Classic fork-pressed peanut butter cookies with crisscross pattern',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },          // 1 cup
      { id: '2', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '3', ingredientId: 'sugar-white', amount: 200 },             // 1 cup
      { id: '4', ingredientId: 'sugar-brown', amount: 110 },             // 1/2 cup packed
      { id: '5', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '6', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '7', ingredientId: 'flour-ap', amount: 190 },                // 1 1/2 cups
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'mexican-wedding-cookies',
    name: 'Mexican Wedding Cookies (Snowballs)',
    cookieTypeId: 'molded',
    description: 'Buttery pecan snowballs rolled in powdered sugar — melt in your mouth',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 10 },          // 2 tsp
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'pecans', amount: 110 },                  // 1 cup finely chopped
    ],
  },
  {
    id: 'almond-crescents',
    name: 'Almond Crescent Cookies',
    cookieTypeId: 'molded',
    description: 'Hand-shaped crescents with ground almonds, dusted in powdered sugar',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'almonds', amount: 100 },                 // 1 cup ground
    ],
  },
  {
    id: 'italian-knot-cookies',
    name: 'Italian Knot Cookies',
    cookieTypeId: 'molded',
    description: 'Soft rope-shaped cookies tied into knots with a simple powdered sugar glaze',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup melted
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 150, eggSize: 'medium', eggQuantity: 3 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 375 },                // 3 cups
      { id: '6', ingredientId: 'baking-powder', amount: 12 },            // 1 tbsp
    ],
  },
  {
    id: 'pecan-sandies',
    name: 'Pecan Sandies',
    cookieTypeId: 'molded',
    description: 'Sandy-textured butter cookies loaded with chopped pecans',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'pecans', amount: 110 },                  // 1 cup chopped
      { id: '6', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'chocolate-crinkles',
    name: 'Chocolate Crinkle Cookies',
    cookieTypeId: 'molded',
    description: 'Fudgy cocoa cookies rolled in powdered sugar for a dramatic crinkled look',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'oil-vegetable', amount: 109 },           // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 125 },                // 1 cup
      { id: '6', ingredientId: 'cocoa-powder', amount: 55 },             // 1/2 cup
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'sugar-powdered', amount: 60 },           // for coating
    ],
  },
  {
    id: 'coconut-snowballs',
    name: 'Coconut Snowballs',
    cookieTypeId: 'molded',
    description: 'Soft butter balls rolled in shredded coconut for a snowy finish',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'coconut-shredded', amount: 80 },         // 1 cup
    ],
  },
  {
    id: 'walnut-butter-balls',
    name: 'Walnut Butter Balls',
    cookieTypeId: 'molded',
    description: 'Classic butter balls with walnuts, rolled in powdered sugar while warm',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'walnuts', amount: 110 },                 // 1 cup chopped
    ],
  },
  {
    id: 'honey-nut-cookies',
    name: 'Honey Nut Cookies',
    cookieTypeId: 'molded',
    description: 'Lightly sweet honey cookies with chopped almonds, pressed flat before baking',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '2', ingredientId: 'honey', amount: 170 },                   // 1/2 cup
      { id: '3', ingredientId: 'sugar-white', amount: 100 },             // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '6', ingredientId: 'baking-soda', amount: 3 },
      { id: '7', ingredientId: 'almonds', amount: 55 },                  // 1/2 cup chopped
    ],
  },
  {
    id: 'pistachio-crescents',
    name: 'Pistachio Crescents',
    cookieTypeId: 'molded',
    description: 'Elegant crescent-shaped butter cookies with finely chopped pistachios',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'pistachios', amount: 125 },              // 1 cup finely chopped
    ],
  },

  // ── ROLLED COOKIES ─────────────────────────────────────────────
  {
    id: 'classic-rolled-sugar',
    name: 'Classic Rolled Sugar Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'The go-to holiday cutout cookie — holds shapes beautifully, great for decorating',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },       // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },            // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'almond-extract', amount: 3 },           // 1/2 tsp optional
      { id: '6', ingredientId: 'flour-ap', amount: 375 },               // 3 cups
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'classic-gingerbread',
    name: 'Classic Gingerbread Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Spiced molasses gingerbread — ideal for gingerbread men and holiday shapes',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 },        // 3/4 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 165 },             // 3/4 cup packed
      { id: '3', ingredientId: 'molasses', amount: 255 },                // 3/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 375 },                // 3 cups
      { id: '6', ingredientId: 'baking-soda', amount: 5 },
      { id: '7', ingredientId: 'ginger-ground', amount: 8 },             // 1 tbsp
      { id: '8', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '9', ingredientId: 'allspice-ground', amount: 1 },           // 1/4 tsp cloves equiv
      { id: '10', ingredientId: 'salt', amount: 1 },
    ],
  },
  {
    id: 'chocolate-cutout',
    name: 'Chocolate Cutout Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Rich cocoa cutout cookies that hold their shape perfectly',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '6', ingredientId: 'cocoa-powder', amount: 55 },             // 1/2 cup
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'almond-roll-cookies',
    name: 'Almond Roll Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Delicate almond-scented cutouts with a tender crumb',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'almond-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 },                // 2 1/2 cups
      { id: '6', ingredientId: 'baking-powder', amount: 3 },
      { id: '7', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'honey-spice-rolled',
    name: 'Honey Spice Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Warmly spiced cutouts sweetened with honey — soft and aromatic',
    servings: '36 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'honey', amount: 170 },                   // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 375 },                // 3 cups
      { id: '6', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '7', ingredientId: 'nutmeg-ground', amount: 2 },
      { id: '8', ingredientId: 'baking-soda', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'lemon-zest-cutout',
    name: 'Lemon Zest Cutout Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Bright lemon flavor in a tender, crisp cutout cookie',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },             // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'lemon-zest', amount: 6 },                // zest of 1 lemon
      { id: '5', ingredientId: 'lemon-extract', amount: 15 },            // 1 tbsp lemon juice equiv
      { id: '6', ingredientId: 'flour-ap', amount: 345 },                // 2 3/4 cups
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'maple-roll-cookies',
    name: 'Maple Roll Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Maple-sweetened cutouts with a warm, caramel-like flavour',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 100 },             // 1/2 cup
      { id: '3', ingredientId: 'maple-syrup', amount: 240 },             // 3/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 },                // 2 1/2 cups
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'cinnamon-roll-cookies',
    name: 'Cinnamon Roll Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Cinnamon-spiced cutout cookies with a warm, cozy flavour',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'flour-ap', amount: 345 },                // 2 3/4 cups
      { id: '5', ingredientId: 'cinnamon-ground', amount: 8 },           // 2 tsp
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'orange-cutout',
    name: 'Orange Cutout Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Bright orange zest cutouts — pairs perfectly with chocolate or cream cheese frosting',
    servings: '30 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'orange-extract', amount: 15 },           // 1 tbsp orange juice equiv
      { id: '5', ingredientId: 'lemon-zest', amount: 8 },                // zest of 1 orange (use lemon-zest id)
      { id: '6', ingredientId: 'flour-ap', amount: 345 },                // 2 3/4 cups
      { id: '7', ingredientId: 'baking-powder', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'shortbread-roll',
    name: 'Classic Shortbread Roll Cookies',
    cookieTypeId: 'rolled-cookie',
    description: 'Pure buttery shortbread rolled thin and cut into shapes — delicate and rich',
    servings: '24 cookies',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-powdered', amount: 60 },           // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                // 2 cups
      { id: '5', ingredientId: 'salt', amount: 1 },
    ],
  },

  // ── BAR COOKIES ────────────────────────────────────────────────
  {
    id: 'classic-brownies',
    name: 'Classic Fudgy Brownies',
    cookieTypeId: 'bar-cookie',
    description: 'Dense, fudgy brownies baked in an 8x8 pan',
    servings: '16 bars (8x8 pan)',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },       // 1/2 cup (1 stick)
      { id: '2', ingredientId: 'sugar-white', amount: 200 },            // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'large', eggQuantity: 2 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'cocoa-powder', amount: 40 },            // 1/3 cup
      { id: '6', ingredientId: 'flour-ap', amount: 65 },               // 1/2 cup
      { id: '7', ingredientId: 'salt', amount: 1 },
      { id: '8', ingredientId: 'baking-powder', amount: 1 },
    ],
  },
  {
    id: 'blondies',
    name: 'Blondies (Butterscotch Bars)',
    cookieTypeId: 'bar-cookie',
    description: 'Chewy brown sugar bars with optional butterscotch chips',
    servings: '16 bars (8x8 pan)',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 },       // 1/2 cup melted
      { id: '2', ingredientId: 'sugar-brown', amount: 220 },            // 1 cup packed
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 },
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 125 },               // 1 cup
      { id: '6', ingredientId: 'baking-powder', amount: 3 },
      { id: '7', ingredientId: 'salt', amount: 1 },
      { id: '8', ingredientId: 'butterscotch-chips', amount: 85 },     // 1/2 cup
    ],
  },
  {
    id: 'lemon-bars',
    name: 'Lemon Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Shortbread crust with tangy lemon curd filling, dusted with powdered sugar',
    servings: '16 bars (8x8 pan)',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 125 },               // 1 cup (crust)
      { id: '2', ingredientId: 'butter-unsalted', amount: 113 },        // 1/2 cup (crust)
      { id: '3', ingredientId: 'sugar-powdered', amount: 30 },          // 1/4 cup (crust)
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 }, // filling
      { id: '5', ingredientId: 'sugar-white', amount: 200 },            // 1 cup (filling)
      { id: '6', ingredientId: 'lemon-extract', amount: 45 },           // 3 tbsp lemon juice equiv
      { id: '7', ingredientId: 'lemon-zest', amount: 4 },               // 1 tsp
    ],
  },
  {
    id: 'magic-cookie-bars',
    name: 'Magic Cookie Bars (7-Layer)',
    cookieTypeId: 'bar-cookie',
    description: 'Layered bars with graham cracker crust, condensed milk, coconut, chocolate, and pecans',
    servings: '24 bars (9x13 pan)',
    ingredients: [
      { id: '1', ingredientId: 'graham-cracker-crumbs', amount: 170 },  // 1 1/2 cups
      { id: '2', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup melted
      { id: '3', ingredientId: 'sweetened-condensed-milk', amount: 396 }, // 1 can (14 oz)
      { id: '4', ingredientId: 'chocolate-chips-semisweet', amount: 170 }, // 1 cup
      { id: '5', ingredientId: 'coconut-shredded', amount: 80 },         // 1 cup
      { id: '6', ingredientId: 'pecans', amount: 55 },                    // 1/2 cup
    ],
  },
  {
    id: 'raspberry-crumble-bars',
    name: 'Raspberry Crumble Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Buttery shortbread base and crumble topping with raspberry jam filling',
    servings: '16 bars (9x9 pan)',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },         // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },              // 1 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 250 },                 // 2 cups
      { id: '5', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'oatmeal-jam-bars',
    name: 'Oatmeal Jam Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Oat crumble bars with a layer of strawberry or raspberry jam',
    servings: '16 bars (9x9 pan)',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },         // 1 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 220 },              // 1 cup packed
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 190 },                 // 1 1/2 cups
      { id: '5', ingredientId: 'oats-rolled', amount: 120 },              // 1 1/2 cups
      { id: '6', ingredientId: 'baking-soda', amount: 3 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'pb-chocolate-bars',
    name: 'Peanut Butter Chocolate Bars',
    cookieTypeId: 'bar-cookie',
    description: 'No-bake peanut butter and graham cracker base topped with chocolate',
    servings: '24 bars (9x13 pan)',
    ingredients: [
      { id: '1', ingredientId: 'peanut-butter', amount: 258 },           // 1 cup
      { id: '2', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup melted
      { id: '3', ingredientId: 'graham-cracker-crumbs', amount: 200 },  // 2 cups
      { id: '4', ingredientId: 'sugar-powdered', amount: 250 },          // 2 cups
      { id: '5', ingredientId: 'chocolate-chips-semisweet', amount: 170 }, // 1 cup
    ],
  },
  {
    id: 'pumpkin-spice-bars',
    name: 'Pumpkin Spice Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Moist pumpkin bars with warm spices — great with cream cheese frosting',
    servings: '24 bars (9x13 pan)',
    ingredients: [
      { id: '1', ingredientId: 'pumpkin-puree', amount: 244 },           // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 },              // 1 cup
      { id: '3', ingredientId: 'oil-vegetable', amount: 109 },            // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'flour-ap', amount: 190 },                 // 1 1/2 cups
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'cinnamon-ground', amount: 5 },
      { id: '8', ingredientId: 'nutmeg-ground', amount: 2 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'coconut-lime-bars',
    name: 'Coconut Lime Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Tropical twist on lemon bars — shortbread crust with lime-coconut filling',
    servings: '16 bars (8x8 pan)',
    ingredients: [
      { id: '1', ingredientId: 'flour-ap', amount: 125 },                // 1 cup (crust)
      { id: '2', ingredientId: 'butter-unsalted', amount: 113 },         // 1/2 cup (crust)
      { id: '3', ingredientId: 'sugar-white', amount: 50 },              // 1/4 cup (crust)
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 }, // filling
      { id: '5', ingredientId: 'sugar-white', amount: 200 },             // 1 cup (filling) -- NOTE: combine with above in display
      { id: '6', ingredientId: 'lemon-extract', amount: 30 },            // 2 tbsp lime juice equiv
      { id: '7', ingredientId: 'coconut-shredded', amount: 40 },         // 1/2 cup
    ],
  },
  {
    id: 'choc-chip-cookie-bars',
    name: 'Chocolate Chip Cookie Bars',
    cookieTypeId: 'bar-cookie',
    description: 'Classic chocolate chip cookie dough spread in a 9x13 pan — thick and chewy',
    servings: '24 bars (9x13 pan)',
    ingredients: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 },        // 1 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 150 },             // 3/4 cup
      { id: '3', ingredientId: 'sugar-white', amount: 150 },             // 3/4 cup
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 },
      { id: '5', ingredientId: 'vanilla-extract', amount: 10 },          // 2 tsp
      { id: '6', ingredientId: 'flour-ap', amount: 280 },                // 2 1/4 cups
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
      { id: '9', ingredientId: 'chocolate-chips-semisweet', amount: 340 }, // 2 cups
    ],
  },

];

// Helper function to get recipes for a specific cookie type
export function getRecipesForCookieType(cookieTypeId: string): RecipePreset[] {
  return recipePresets.filter(recipe => recipe.cookieTypeId === cookieTypeId);
}
