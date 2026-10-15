import { GrocerPartner, PantryItem, Recipe, UserProfile } from '../types/mealPlanner';

export const INITIAL_USER_PROFILE: UserProfile = {
  pax: 2,
  daysToCook: 5,
  weeklyBudget: 120,
  dietaryRestrictions: ['High-Protein'],
  preferredCuisines: ['All Cuisines', 'Asian & Stir-Fry', 'Mediterranean'],
  defaultGrocer: 'RedMart',
  deliveryMode: 'Scheduled',
};

export const GROCER_PARTNERS: GrocerPartner[] = [
  {
    id: 'redmart',
    name: 'RedMart (Lazada)',
    type: 'Scheduled',
    deliveryEstimate: 'Next-Day Slot (6 PM - 8 PM)',
    freeDeliveryThreshold: 60,
    deliveryFee: 4.99,
    badgeText: 'Top Scheduled Saver',
    logoColor: '#E22D42',
    affiliatePerk: '5% member rebate on fresh organics',
  },
  {
    id: 'fairprice',
    name: 'FairPrice Online',
    type: 'Scheduled',
    deliveryEstimate: 'Same-Day / Tomorrow Slots',
    freeDeliveryThreshold: 59,
    deliveryFee: 3.99,
    badgeText: 'Local Grocery Staple',
    logoColor: '#005EA6',
    affiliatePerk: 'LinkPoints earnable on every basket',
  },
  {
    id: 'amazon',
    name: 'Amazon Fresh',
    type: 'Scheduled',
    deliveryEstimate: '2-Hour Delivery Slots',
    freeDeliveryThreshold: 75,
    deliveryFee: 5.99,
    badgeText: 'Prime Free Delivery',
    logoColor: '#146EB4',
    affiliatePerk: 'Free 2-hr delivery for Prime members',
  },
  {
    id: 'grabmart',
    name: 'GrabMart',
    type: 'Instant',
    deliveryEstimate: '25 – 35 Mins Express',
    freeDeliveryThreshold: 80,
    deliveryFee: 6.50,
    badgeText: 'Tonight Cook Express',
    logoColor: '#00B14F',
    affiliatePerk: 'GrabRewards points + instant rider',
  },
  {
    id: 'foodpanda',
    name: 'FoodPanda Shops',
    type: 'Instant',
    deliveryEstimate: '20 – 30 Mins Express',
    freeDeliveryThreshold: 80,
    deliveryFee: 5.90,
    badgeText: 'Pandamart Instant',
    logoColor: '#D70F64',
    affiliatePerk: 'pandapro free delivery voucher',
  },
];

export const INITIAL_PANTRY: PantryItem[] = [
  { id: 'p1', name: 'Extra Virgin Olive Oil', quantity: 250, unit: 'ml', category: 'Condiments', daysUntilExpiry: 90 },
  { id: 'p2', name: 'Kosher Salt & Black Peppercorn', quantity: 1, unit: 'pcs', category: 'Pantry', daysUntilExpiry: 180 },
  { id: 'p3', name: 'Garlic Bulbs', quantity: 4, unit: 'cloves', category: 'Produce', daysUntilExpiry: 14 },
  { id: 'p4', name: 'Soy Sauce', quantity: 150, unit: 'ml', category: 'Condiments', daysUntilExpiry: 120 },
  { id: 'p5', name: 'Jasmine Rice', quantity: 800, unit: 'g', category: 'Pantry', daysUntilExpiry: 150 },
];

export const RECIPE_CATALOG: Recipe[] = [
  {
    id: 'rec-salmon-bowl',
    title: 'Seared Wild Salmon & Quinoa Citrus Bowl',
    description: 'Crisp skin wild salmon over warm quinoa, charred tenderstem broccoli, avocado slices, and fragrant lemon dill herb vinaigrette.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 2,
    cuisine: 'Mediterranean',
    calories: 580,
    macros: { protein: 42, carbs: 36, fat: 28 },
    allergens: ['Fish'],
    imageUrl: '/src/assets/images/recipe_salmon_grain_bowl_1792051425056.jpg',
    fussFreeScore: 5,
    ingredients: [
      { id: 'ing-1', name: 'Fresh Atlantic Salmon Fillet', quantity: 360, unit: 'g', department: 'Meat & Seafood', estimatedCost: 14.50 },
      { id: 'ing-2', name: 'Organic Quinoa', quantity: 160, unit: 'g', department: 'Bakery & Grains', estimatedCost: 3.20 },
      { id: 'ing-3', name: 'Tenderstem Broccoli', quantity: 200, unit: 'g', department: 'Produce', estimatedCost: 3.80 },
      { id: 'ing-4', name: 'Ripe Hass Avocado', quantity: 1, unit: 'pcs', department: 'Produce', estimatedCost: 2.20 },
      { id: 'ing-5', name: 'Fresh Lemon', quantity: 1, unit: 'pcs', department: 'Produce', estimatedCost: 0.90 },
      { id: 'ing-6', name: 'Fresh Dill Sprigs', quantity: 1, unit: 'bunch', department: 'Produce', estimatedCost: 1.80 },
      { id: 'ing-7', name: 'Extra Virgin Olive Oil', quantity: 30, unit: 'ml', department: 'Pantry & Spices', estimatedCost: 0.60, inPantry: true },
    ],
    instructions: [
      'Rinse quinoa and simmer in 320ml salted water for 12 minutes until fluffy.',
      'Pat salmon dry with paper towel, season generously with flaky salt and cracked black pepper.',
      'Heat 1 tbsp olive oil in stainless pan over medium-high heat. Sear salmon skin-side down for 4 minutes until golden and crisp, flip for 2-3 minutes.',
      'Toss tenderstem broccoli in a hot skillet with olive oil and a splash of water for 3 minutes.',
      'Whisk lemon juice with chopped dill, olive oil, and salt. Assemble grain bowls and drizzle dressing over top.',
    ],
  },
  {
    id: 'rec-tuscan-kale-soup',
    title: 'Tuscan White Bean & Lacinato Kale Stew',
    description: 'Hearty slow-simmered cannellini beans, tender lacinato kale, aromatic rosemary, garlic, and shaved pecorino with rustic sourdough crust.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 2,
    cuisine: 'Italian',
    calories: 440,
    macros: { protein: 22, carbs: 54, fat: 14 },
    allergens: ['Dairy (optional)', 'Gluten'],
    imageUrl: '/src/assets/images/recipe_tuscan_white_bean_1792051427055.jpg',
    fussFreeScore: 5,
    ingredients: [
      { id: 'ing-8', name: 'Cannellini White Beans', quantity: 2, unit: 'cans', department: 'Pantry & Spices', estimatedCost: 3.40 },
      { id: 'ing-9', name: 'Lacinato Kale', quantity: 1, unit: 'bunch', department: 'Produce', estimatedCost: 3.20 },
      { id: 'ing-10', name: 'Garlic Bulbs', quantity: 4, unit: 'cloves', department: 'Produce', estimatedCost: 0.80, inPantry: true },
      { id: 'ing-11', name: 'Vegetable Cooking Broth', quantity: 500, unit: 'ml', department: 'Pantry & Spices', estimatedCost: 2.60 },
      { id: 'ing-12', name: 'Pecorino Romano Cheese Wedge', quantity: 60, unit: 'g', department: 'Dairy & Eggs', estimatedCost: 4.50 },
      { id: 'ing-13', name: 'Artisan Sourdough Loaf', quantity: 1, unit: 'pcs', department: 'Bakery & Grains', estimatedCost: 5.50 },
    ],
    instructions: [
      'Thinly slice garlic and gently sizzle in olive oil until aromatic and translucent.',
      'Add rinsed white beans, vegetable stock, and a fresh rosemary sprig. Simmer gently for 10 minutes.',
      'Roughly chop lacinato kale, discard woody stems, and stir into the broth until wilted and vibrant emerald green.',
      'Spoon into warm bowls, top with shaved pecorino, a drizzle of extra virgin olive oil, and thick grilled sourdough slices.',
    ],
  },
  {
    id: 'rec-thai-basil-chicken',
    title: '20-Min Thai Holy Basil Minced Chicken (Pad Krapow)',
    description: 'Savory minced chicken wok-tossed with fragrant holy basil, garlic, and bird’s eye chili, topped with a crispy fried egg over warm jasmine rice.',
    prepTimeMinutes: 8,
    cookTimeMinutes: 10,
    servings: 2,
    cuisine: 'Asian & Stir-Fry',
    calories: 520,
    macros: { protein: 38, carbs: 48, fat: 18 },
    allergens: ['Eggs', 'Soy'],
    imageUrl: '/src/assets/images/recipe_thai_basil_chicken_1792051426098.jpg',
    fussFreeScore: 5,
    ingredients: [
      { id: 'ing-14', name: 'Lean Minced Chicken Thigh', quantity: 350, unit: 'g', department: 'Meat & Seafood', estimatedCost: 6.80 },
      { id: 'ing-15', name: 'Fresh Thai Holy Basil', quantity: 1, unit: 'bunch', department: 'Produce', estimatedCost: 1.60 },
      { id: 'ing-16', name: 'Fresh Red Birdseye Chilies', quantity: 3, unit: 'pcs', department: 'Produce', estimatedCost: 1.20 },
      { id: 'ing-17', name: 'Free-Range Brown Eggs', quantity: 2, unit: 'pcs', department: 'Dairy & Eggs', estimatedCost: 1.40 },
      { id: 'ing-18', name: 'Oyster Sauce & Dark Soy Glaze', quantity: 45, unit: 'ml', department: 'Pantry & Spices', estimatedCost: 2.20 },
      { id: 'ing-19', name: 'Jasmine Rice', quantity: 200, unit: 'g', department: 'Bakery & Grains', estimatedCost: 0.80, inPantry: true },
    ],
    instructions: [
      'Pound garlic and bird’s eye chili together in a mortar or finely chop.',
      'Heat wok with oil over high heat until smoking. Add minced chicken and break up rapidly with spatula until browned.',
      'Swirl in oyster sauce, dark soy sauce, and fish sauce. Stir fry for 1 minute until glazed.',
      'Turn off heat and fold in fresh holy basil leaves until just wilted.',
      'Fry eggs in hot oil until edges are blistered and yolk remains velvety. Serve over jasmine rice.',
    ],
  },
  {
    id: 'rec-lemon-herb-pasta',
    title: 'Silky Lemon Ricotta & Zucchini Ribbon Pasta',
    description: 'Al dente tagliatelle folded with whole milk ricotta, shaved raw zucchini ribbons, toasted pine nuts, and lemon zest.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    servings: 2,
    cuisine: 'Italian',
    calories: 490,
    macros: { protein: 20, carbs: 62, fat: 19 },
    allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
    imageUrl: '/src/assets/images/recipe_salmon_grain_bowl_1792051425056.jpg',
    fussFreeScore: 4,
    ingredients: [
      { id: 'ing-20', name: 'Artisanal Tagliatelle', quantity: 250, unit: 'g', department: 'Bakery & Grains', estimatedCost: 3.80 },
      { id: 'ing-21', name: 'Fresh Ricotta Cheese', quantity: 200, unit: 'g', department: 'Dairy & Eggs', estimatedCost: 4.20 },
      { id: 'ing-22', name: 'Green Zucchini', quantity: 2, unit: 'pcs', department: 'Produce', estimatedCost: 2.40 },
      { id: 'ing-23', name: 'Toasted Pine Nuts', quantity: 30, unit: 'g', department: 'Pantry & Spices', estimatedCost: 3.50 },
      { id: 'ing-24', name: 'Fresh Lemon', quantity: 1, unit: 'pcs', department: 'Produce', estimatedCost: 0.90 },
      { id: 'ing-25', name: 'Fresh Basil', quantity: 1, unit: 'bunch', department: 'Produce', estimatedCost: 1.80 },
    ],
    instructions: [
      'Boil tagliatelle in salted water until al dente, reserving 1/2 cup pasta cooking water.',
      'Use a vegetable peeler to shave zucchini into thin ribbons.',
      'In a wide skillet, whisk ricotta with lemon zest, lemon juice, warm pasta water, and black pepper into a silky sauce.',
      'Toss pasta and raw zucchini ribbons into the warm sauce; zucchini will tenderize in the heat.',
      'Garnish with toasted pine nuts, fresh basil leaves, and flaky sea salt.',
    ],
  },
  {
    id: 'rec-honey-ginger-salmon',
    title: 'Honey Ginger Glazed Salmon with Bok Choy',
    description: 'Tender salmon glazed with ginger and raw honey, paired with garlic baby bok choy and steamed brown rice.',
    prepTimeMinutes: 8,
    cookTimeMinutes: 12,
    servings: 2,
    cuisine: 'Asian & Stir-Fry',
    calories: 540,
    macros: { protein: 40, carbs: 38, fat: 22 },
    allergens: ['Fish', 'Soy'],
    imageUrl: '/src/assets/images/recipe_thai_basil_chicken_1792051426098.jpg',
    fussFreeScore: 5,
    ingredients: [
      { id: 'ing-26', name: 'Fresh Atlantic Salmon Fillet', quantity: 360, unit: 'g', department: 'Meat & Seafood', estimatedCost: 14.50 },
      { id: 'ing-27', name: 'Baby Bok Choy', quantity: 300, unit: 'g', department: 'Produce', estimatedCost: 2.80 },
      { id: 'ing-28', name: 'Fresh Ginger Root', quantity: 1, unit: 'pcs', department: 'Produce', estimatedCost: 1.20 },
      { id: 'ing-29', name: 'Wild Blossom Honey', quantity: 45, unit: 'ml', department: 'Pantry & Spices', estimatedCost: 2.50 },
      { id: 'ing-30', name: 'Soy Sauce', quantity: 30, unit: 'ml', department: 'Pantry & Spices', estimatedCost: 0.50, inPantry: true },
    ],
    instructions: [
      'Grate fresh ginger and whisk with honey, soy sauce, and a dash of rice vinegar.',
      'Sear salmon in a hot pan 3 minutes each side, brushing generously with the honey-ginger reduction until sticky and caramelized.',
      'Flash sauté baby bok choy in sesame oil with crushed garlic for 3 minutes.',
      'Plate glazed salmon over the crisp greens with toasted sesame seeds.',
    ],
  },
];

export const INITIAL_WEEKLY_PLAN = [
  { id: 'meal-1', day: 'Monday' as const, mealType: 'Dinner' as const, recipe: RECIPE_CATALOG[0] },
  { id: 'meal-2', day: 'Tuesday' as const, mealType: 'Dinner' as const, recipe: RECIPE_CATALOG[1] },
  { id: 'meal-3', day: 'Wednesday' as const, mealType: 'Dinner' as const, recipe: RECIPE_CATALOG[2] },
  { id: 'meal-4', day: 'Thursday' as const, mealType: 'Dinner' as const, recipe: RECIPE_CATALOG[3] },
  { id: 'meal-5', day: 'Friday' as const, mealType: 'Dinner' as const, recipe: RECIPE_CATALOG[4] },
];

export const PDF_BUSINESS_MODEL_CANVAS = {
  keyPartners: {
    title: 'Key Partners',
    subtitle: 'What are your key partners to get competitive advantage?',
    items: [
      { name: 'Instant Delivery', partners: 'GrabMart, FoodPanda (Pandamart)', desc: '20–35 min ad-hoc dinner top-ups & urgent missing pantry ingredients' },
      { name: 'Scheduled Delivery', partners: 'RedMart (Lazada), Amazon Fresh, FairPrice Online', desc: 'Bulk weekly scheduled delivery slots, automated recurring pantry restock' }
    ]
  },
  keyActivities: {
    title: 'Key Activities',
    subtitle: 'What are the key steps to move ahead to your customers?',
    items: [
      'Customer to input meal preference (e.g. cuisine, dietary restrictions)',
      'Customer to input their weekly budget',
      'Profile settings includes number of pax, days to cook, and budget limits'
    ]
  },
  valuePropositions: {
    title: 'Key Propositions',
    subtitle: 'How will you make your customers’ life happier?',
    items: [
      { highlight: 'Mental Load Relief', text: 'Take the mental load off a busy working adult on what to cook for the week' },
      { highlight: 'Time Saving', text: 'Simply upload all the recipes for the week and AI will list down all the needed items for purchase including units' },
      { highlight: 'Automated "Add to Cart"', text: 'Provide recommendations on ingredients required to prepare meals and automate "add to cart" to enable user to order directly from preferred grocer' },
      { highlight: 'Zero Food Wastage', text: 'Reduce food wastage by consolidating ingredients across meals and purchasing strictly based on needed amounts' }
    ]
  },
  customerRelationships: {
    title: 'Customer Relationships',
    subtitle: 'How often will you interact with your customers?',
    items: [
      { type: 'Weekly', desc: 'Routine Sunday meal planning, recipe swaps, and consolidated weekly delivery booking' },
      { type: 'Ad Hoc', desc: 'Tonight’s dinner cravings, spontaneous recipe uploads, and instant 30-min express grocery top-up' }
    ]
  },
  channels: {
    title: 'Channels',
    subtitle: 'How are you going to reach your customers?',
    items: [
      { name: 'Social Media', desc: 'TikTok / Instagram food creator recipe sync, viral meal prep reels, and 1-click cart links' },
      { name: 'Tie up with Grocery Chains', desc: 'Integrated retail partner checkout plugins (FairPrice, RedMart, Amazon Fresh) with co-marketing' }
    ]
  },
  customerSegments: {
    title: 'Customer Segments',
    subtitle: 'Who are your customers? Describe your target audience in a couple of words.',
    items: [
      'Customers who cook at home',
      'Time-starved customers who are looking for fuss-free cooking recipes that can maximize ingredients',
      'Customers who are comfortable with digital tools',
      'Health-conscious individuals who choose to cook rather than order takeout',
      'Customers who are working and do not want to spend too much time to think what they want to cook'
    ]
  },
  costStructure: {
    title: 'Cost Structure',
    subtitle: 'How much are you planning to spend on product development and marketing?',
    items: [
      'Product engineering (AI recipe parsing engine, automated grocer API integrations)',
      'Nutritional & allergen database licensing',
      'Customer acquisition & performance marketing across social channels',
      'Grocery partner API maintenance & data synchronization'
    ]
  },
  revenueStreams: {
    title: 'Revenue Streams',
    subtitle: 'How much are you planning to earn in a certain period? Compare costs and revenues.',
    items: [
      'Subscription-based: Mise Pro ($9.99/mo) for automated grocer carts, unlimited AI recipe parsing, and pantry waste intelligence',
      'Commission-based from partners: 3% - 6% affiliate checkout fee on completed baskets from RedMart, FairPrice, Amazon, GrabMart'
    ]
  },
  keyResources: {
    title: 'Key Resources',
    subtitle: 'What resources do you need to make your idea work?',
    items: [
      '1. Nutritional database (calories, macros, allergens)',
      '2. Recipe licensing / partnerships',
      '3. User preference data system',
      '4. Inventory tracking system (pantry check to prevent duplicate buying)',
      '5. Grocery partners (RedMart, FairPrice, Amazon Fresh)',
      '6. Delivery service partners (GrabMart, FoodPanda)'
    ]
  }
};
