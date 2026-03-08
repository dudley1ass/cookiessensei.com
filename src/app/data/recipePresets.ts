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
];

// Helper function to get recipes for a specific cookie type
export function getRecipesForCookieType(cookieTypeId: string): RecipePreset[] {
  return recipePresets.filter(recipe => recipe.cookieTypeId === cookieTypeId);
}
