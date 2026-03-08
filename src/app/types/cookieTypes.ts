import { RecipeIngredient } from './cookie';

export interface CookieType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  texture: string;
  baseFormula: RecipeIngredient[];
  ratioDescription: string;
  keyTraits: string[];
}

export const cookieTypes: CookieType[] = [
  {
    id: 'drop-cookie',
    name: 'Classic Drop Cookie',
    description: 'The most common cookie formula with chewy center and crisp edges.',
    examples: ['Chocolate Chip', 'Oatmeal Raisin', 'M&M Cookies', 'Monster Cookies'],
    texture: 'Chewy center, crisp edges',
    ratioDescription: '1 butter : 1 sugar : 1 egg : 2 flour',
    keyTraits: ['Most versatile formula', 'Perfect for mix-ins', 'Classic texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 }, // 1 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 150 }, // 3/4 cup
      { id: '3', ingredientId: 'sugar-white', amount: 100 }, // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 }, // 1 egg
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 280 }, // 2 cups
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
      { id: '9', ingredientId: 'chocolate-chips-semisweet', amount: 340 }, // 2 cups
    ],
  },
  {
    id: 'soft-cake',
    name: 'Soft Cake Cookie',
    description: 'Higher moisture and leavening creates a soft, fluffy cookie.',
    examples: ['Pumpkin Cookies', 'Whoopie Pie', 'Lofthouse Sugar Cookies'],
    texture: 'Soft, fluffy, cake-like',
    ratioDescription: 'More eggs, baking powder, often sour cream or milk',
    keyTraits: ['Extra moisture', 'Double leavening', 'Pillow-soft texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 }, // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 }, // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 }, // 2 eggs
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'milk-whole', amount: 60 }, // 1/4 cup
      { id: '6', ingredientId: 'flour-ap', amount: 280 }, // 2 cups
      { id: '7', ingredientId: 'baking-powder', amount: 10 },
      { id: '8', ingredientId: 'baking-soda', amount: 3 },
      { id: '9', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'shortbread',
    name: 'Shortbread',
    description: 'Simple, buttery dough with a crumbly, melt-in-mouth texture.',
    examples: ['Scottish Shortbread', 'Danish Butter Cookies', 'Wedding Cookies'],
    texture: 'Crumbly, melt-in-mouth',
    ratioDescription: '1 sugar : 2 butter : 3 flour',
    keyTraits: ['Minimal ingredients', 'High butter content', 'No eggs'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 }, // 1 cup / 2 sticks
      { id: '2', ingredientId: 'sugar-powdered', amount: 65 }, // 1/2 cup
      { id: '3', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '4', ingredientId: 'flour-ap', amount: 280 }, // 2 cups
      { id: '5', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'sugar-cookie',
    name: 'Sugar Cookie',
    description: 'Balanced dough designed for rolling, cutting, and decorating.',
    examples: ['Christmas Cookies', 'Frosted Sugar Cookies', 'Cut-Out Cookies'],
    texture: 'Crisp or soft depending on bake',
    ratioDescription: 'Butter + sugar + eggs + baking powder',
    keyTraits: ['Holds shape well', 'Perfect for decorating', 'Versatile texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 }, // 3/4 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 }, // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 }, // 1 egg
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 }, // 2.5 cups
      { id: '6', ingredientId: 'baking-powder', amount: 8 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'snickerdoodle',
    name: 'Snickerdoodle',
    description: 'Tangy sugar cookie variation with cream of tartar and cinnamon.',
    examples: ['Classic Snickerdoodles', 'Cinnamon Sugar Cookies'],
    texture: 'Puffy interior, tangy flavor',
    ratioDescription: 'Sugar cookie base + cream of tartar',
    keyTraits: ['Cream of tartar tang', 'Cinnamon-sugar coating', 'Soft and puffy'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 }, // 3/4 cup
      { id: '2', ingredientId: 'sugar-white', amount: 300 }, // 1.5 cups (including coating)
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 }, // 1 egg
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 }, // 2 cups
      { id: '6', ingredientId: 'baking-soda', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'brownie-cookie',
    name: 'Brownie Cookie',
    description: 'Chocolate-heavy batter with fudgy texture and crackled tops.',
    examples: ['Crinkle Cookies', 'Flourless Chocolate Cookies', 'Double Chocolate'],
    texture: 'Fudgy, rich, intense chocolate',
    ratioDescription: 'High cocoa/chocolate, lower flour',
    keyTraits: ['Very chocolatey', 'Fudgy center', 'Crackled surface'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 }, // 1/2 cup
      { id: '2', ingredientId: 'sugar-white', amount: 200 }, // 1 cup
      { id: '3', ingredientId: 'sugar-brown', amount: 100 }, // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 }, // 2 eggs
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'cocoa-powder', amount: 75 }, // 3/4 cup
      { id: '7', ingredientId: 'flour-ap', amount: 125 }, // 1 cup (less flour)
      { id: '8', ingredientId: 'baking-powder', amount: 5 },
      { id: '9', ingredientId: 'salt', amount: 3 },
      { id: '10', ingredientId: 'chocolate-chips-dark', amount: 170 }, // 1 cup
    ],
  },
  {
    id: 'biscotti',
    name: 'Biscotti',
    description: 'Twice-baked Italian cookie with dry, crunchy texture.',
    examples: ['Almond Biscotti', 'Chocolate Biscotti', 'Anise Biscotti'],
    texture: 'Hard, crunchy, dry',
    ratioDescription: 'Low fat, dry structure',
    keyTraits: ['Twice-baked', 'Very crunchy', 'Perfect for dipping'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 56 }, // 1/4 cup (low fat)
      { id: '2', ingredientId: 'sugar-white', amount: 200 }, // 1 cup
      { id: '3', ingredientId: 'egg-whole', amount: 100, eggSize: 'medium', eggQuantity: 2 }, // 2 eggs
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 315 }, // 2.5 cups
      { id: '6', ingredientId: 'baking-powder', amount: 8 },
      { id: '7', ingredientId: 'salt', amount: 3 },
      { id: '8', ingredientId: 'almonds', amount: 150 }, // 1 cup
    ],
  },
  {
    id: 'pressed-butter',
    name: 'Pressed Butter Cookie',
    description: 'Very high butter content for smooth, piped dough.',
    examples: ['Spritz Cookies', 'Danish Butter Cookies', 'Piped Rosettes'],
    texture: 'Delicate, buttery, crisp',
    ratioDescription: 'Very high butter, smooth dough',
    keyTraits: ['High butter content', 'Holds piped shapes', 'Delicate texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 227 }, // 1 cup
      { id: '2', ingredientId: 'sugar-white', amount: 100 }, // 1/2 cup
      { id: '3', ingredientId: 'egg-yolk', amount: 20, eggSize: 'medium', eggQuantity: 1 }, // 1 yolk
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 250 }, // 2 cups
      { id: '6', ingredientId: 'salt', amount: 2 },
    ],
  },
  {
    id: 'slice-bake',
    name: 'Slice & Bake',
    description: 'Refrigerator dough that holds shape perfectly when sliced.',
    examples: ['Pinwheel Cookies', 'Checkerboard', 'Icebox Cookies'],
    texture: 'Medium crisp, holds shape',
    ratioDescription: 'Medium fat, holds structure well',
    keyTraits: ['Chills into logs', 'Clean slices', 'Uniform shape'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 170 }, // 3/4 cup
      { id: '2', ingredientId: 'sugar-white', amount: 150 }, // 3/4 cup
      { id: '3', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 }, // 1 egg
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '5', ingredientId: 'flour-ap', amount: 280 }, // 2 cups
      { id: '6', ingredientId: 'baking-powder', amount: 5 },
      { id: '7', ingredientId: 'salt', amount: 3 },
    ],
  },
  {
    id: 'molded',
    name: 'Molded Cookie',
    description: 'Hand-shaped dough that holds structure during baking.',
    examples: ['Peanut Butter Cookies', 'Russian Tea Cakes', 'Amaretti'],
    texture: 'Tender, structured',
    ratioDescription: 'Dough holds hand-shaped forms',
    keyTraits: ['Shapes by hand', 'Maintains structure', 'Dense texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 }, // 1/2 cup
      { id: '2', ingredientId: 'sugar-brown', amount: 100 }, // 1/2 cup
      { id: '3', ingredientId: 'sugar-white', amount: 100 }, // 1/2 cup
      { id: '4', ingredientId: 'egg-whole', amount: 50, eggSize: 'medium', eggQuantity: 1 }, // 1 egg
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'flour-ap', amount: 190 }, // 1.5 cups
      { id: '7', ingredientId: 'baking-soda', amount: 5 },
      { id: '8', ingredientId: 'salt', amount: 5 },
    ],
  },
  {
    id: 'macaron-meringue',
    name: 'Macaron/Meringue',
    description: 'Egg-white based cookies with light, airy texture.',
    examples: ['French Macarons', 'Coconut Macaroons', 'Pavlova Cookies'],
    texture: 'Light, airy, crisp exterior',
    ratioDescription: 'No flour or minimal flour, egg-white based',
    keyTraits: ['Egg-white based', 'Light texture', 'Unique technique'],
    baseFormula: [
      { id: '1', ingredientId: 'egg-white', amount: 100, eggSize: 'medium', eggQuantity: 3 }, // 3 whites
      { id: '2', ingredientId: 'sugar-white', amount: 200 }, // 1 cup
      { id: '3', ingredientId: 'sugar-powdered', amount: 100 }, // ~1 cup
      { id: '4', ingredientId: 'vanilla-extract', amount: 5 },
    ],
  },
  {
    id: 'no-bake',
    name: 'No-Bake Cookie',
    description: 'Structure from sugar crystallization, no oven required.',
    examples: ['Chocolate Oatmeal No-Bake', 'Peanut Butter Haystacks'],
    texture: 'Chewy, fudgy, set firm',
    ratioDescription: 'Sugar cooked to soft ball stage',
    keyTraits: ['No oven needed', 'Quick setting', 'Fudgy texture'],
    baseFormula: [
      { id: '1', ingredientId: 'butter-unsalted', amount: 113 }, // 1/2 cup
      { id: '2', ingredientId: 'milk-whole', amount: 120 }, // 1/2 cup
      { id: '3', ingredientId: 'sugar-white', amount: 400 }, // 2 cups
      { id: '4', ingredientId: 'cocoa-powder', amount: 40 }, // 1/3 cup
      { id: '5', ingredientId: 'vanilla-extract', amount: 5 },
      { id: '6', ingredientId: 'peanut-butter', amount: 120 }, // 1/2 cup
      { id: '7', ingredientId: 'oats-quick', amount: 270 }, // 3 cups (safe to eat raw)
    ],
  },
];