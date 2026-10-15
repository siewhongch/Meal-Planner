import { GoogleGenAI } from '@google/genai';
import { Recipe, Ingredient } from '../types/mealPlanner';

// Initialize Gemini SDK if API key is provided
const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY 
  ? process.env.GEMINI_API_KEY 
  : (import.meta.env?.VITE_GEMINI_API_KEY || '');

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Heuristic fallback parser when offline or without active API key
 */
export function heuristicParseRecipe(rawText: string, title?: string): Recipe {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const detectedTitle = title || (lines[0]?.replace(/^#+\s*/, '') || 'Custom Home Recipe');
  
  const sampleIngredients: Ingredient[] = [];
  const sampleInstructions: string[] = [];
  let isInstruction = false;

  lines.forEach((line, index) => {
    if (index === 0 && !title) return;
    
    if (line.toLowerCase().includes('instruction') || line.toLowerCase().includes('step') || line.toLowerCase().includes('method') || line.toLowerCase().includes('direction')) {
      isInstruction = true;
      return;
    }

    if (isInstruction || /^\d+[\.\)]/.test(line)) {
      sampleInstructions.push(line.replace(/^\d+[\.\)]\s*/, ''));
    } else {
      // Parse ingredient line like: "300g chicken breast", "2 tbsp olive oil", "1 bunch scallions"
      const match = line.match(/^([0-9\.\/]+)?\s*([a-zA-Z]+)?\s+(.+)$/);
      let qty = 1;
      let unit = 'pcs';
      let name = line;

      if (match) {
        qty = parseFloat(match[1]) || 1;
        const potentialUnit = match[2]?.toLowerCase();
        if (['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'pcs', 'cloves', 'bunch', 'cans'].includes(potentialUnit || '')) {
          unit = potentialUnit!;
          name = match[3];
        } else {
          name = `${match[2] || ''} ${match[3]}`.trim();
        }
      }

      // Department heuristic
      const lower = name.toLowerCase();
      let department: Ingredient['department'] = 'Pantry & Spices';
      if (lower.includes('chicken') || lower.includes('beef') || lower.includes('salmon') || lower.includes('fish') || lower.includes('prawn') || lower.includes('pork') || lower.includes('tofu')) {
        department = 'Meat & Seafood';
      } else if (lower.includes('garlic') || lower.includes('onion') || lower.includes('kale') || lower.includes('lemon') || lower.includes('broccoli') || lower.includes('spinach') || lower.includes('herb') || lower.includes('basil') || lower.includes('tomato')) {
        department = 'Produce';
      } else if (lower.includes('egg') || lower.includes('cheese') || lower.includes('milk') || lower.includes('ricotta') || lower.includes('butter') || lower.includes('yogurt')) {
        department = 'Dairy & Eggs';
      } else if (lower.includes('pasta') || lower.includes('rice') || lower.includes('bread') || lower.includes('quinoa') || lower.includes('noodle')) {
        department = 'Bakery & Grains';
      }

      sampleIngredients.push({
        id: `custom-ing-${Date.now()}-${sampleIngredients.length}`,
        name: name.replace(/^[-*•]\s*/, ''),
        quantity: qty,
        unit,
        department,
        estimatedCost: +(Math.random() * 3 + 1.2).toFixed(2),
      });
    }
  });

  // If no ingredients detected, supply intelligent defaults
  if (sampleIngredients.length === 0) {
    sampleIngredients.push(
      { id: `ing-${Date.now()}-1`, name: 'Fresh Protein of Choice', quantity: 300, unit: 'g', department: 'Meat & Seafood', estimatedCost: 7.50 },
      { id: `ing-${Date.now()}-2`, name: 'Seasonal Green Vegetables', quantity: 250, unit: 'g', department: 'Produce', estimatedCost: 3.20 },
      { id: `ing-${Date.now()}-3`, name: 'Aromatic Garlic & Herbs', quantity: 3, unit: 'cloves', department: 'Produce', estimatedCost: 0.90 },
      { id: `ing-${Date.now()}-4`, name: 'Complex Carbohydrate (Rice/Pasta)', quantity: 200, unit: 'g', department: 'Bakery & Grains', estimatedCost: 1.50 }
    );
  }

  if (sampleInstructions.length === 0) {
    sampleInstructions.push(
      'Prep and wash all fresh produce and aromatics.',
      'Sear protein in a medium-hot skillet with olive oil until golden and fully cooked through.',
      'Sauté vegetables and combine with seasonings.',
      'Plate warm with carbohydrates and garnish with fresh herbs.'
    );
  }

  return {
    id: `recipe-uploaded-${Date.now()}`,
    title: detectedTitle,
    description: 'Custom recipe automatically parsed with standard weights and units for 1-click grocery ordering.',
    prepTimeMinutes: 12,
    cookTimeMinutes: 15,
    servings: 2,
    cuisine: 'Custom',
    calories: 510,
    macros: { protein: 34, carbs: 42, fat: 18 },
    allergens: [],
    imageUrl: '/src/assets/images/recipe_tuscan_white_bean_1792051427055.jpg',
    fussFreeScore: 5,
    ingredients: sampleIngredients,
    instructions: sampleInstructions,
  };
}

/**
 * AI-powered recipe parser using Gemini 2.5 Flash
 */
export async function parseRecipeWithGemini(rawText: string, cuisineHint?: string): Promise<Recipe> {
  if (!ai) {
    return heuristicParseRecipe(rawText);
  }

  try {
    const prompt = `You are a culinary AI parsing engine for a meal planner and grocery delivery app.
Parse the following recipe text or query into a clean, structured JSON recipe object:

Recipe input:
${rawText}

Cuisine hint: ${cuisineHint || 'Any'}

Return strictly JSON matching this structure:
{
  "title": "string",
  "description": "string (1-2 sentences)",
  "prepTimeMinutes": number,
  "cookTimeMinutes": number,
  "servings": number,
  "cuisine": "string",
  "calories": number,
  "macros": { "protein": number, "carbs": number, "fat": number },
  "allergens": ["string"],
  "ingredients": [
    {
      "name": "string (standard grocery name)",
      "quantity": number,
      "unit": "g" | "ml" | "pcs" | "tbsp" | "cloves" | "bunch" | "cans",
      "department": "Produce" | "Meat & Seafood" | "Dairy & Eggs" | "Pantry & Spices" | "Bakery & Grains",
      "estimatedCost": number
    }
  ],
  "instructions": ["step 1", "step 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      id: `recipe-ai-${Date.now()}`,
      title: parsed.title || 'AI Curated Weekly Meal',
      description: parsed.description || 'Optimized for minimal food waste and fast grocery fulfillment.',
      prepTimeMinutes: parsed.prepTimeMinutes || 10,
      cookTimeMinutes: parsed.cookTimeMinutes || 15,
      servings: parsed.servings || 2,
      cuisine: parsed.cuisine || 'Modern Home Cook',
      calories: parsed.calories || 520,
      macros: parsed.macros || { protein: 35, carbs: 40, fat: 20 },
      allergens: parsed.allergens || [],
      imageUrl: '/src/assets/images/recipe_salmon_grain_bowl_1792051425056.jpg',
      fussFreeScore: 5,
      ingredients: (parsed.ingredients || []).map((ing: any, idx: number) => ({
        id: `ai-ing-${Date.now()}-${idx}`,
        name: ing.name,
        quantity: Number(ing.quantity) || 1,
        unit: ing.unit || 'pcs',
        department: ing.department || 'Produce',
        estimatedCost: Number(ing.estimatedCost) || 2.50,
      })),
      instructions: parsed.instructions || ['Cook ingredients and serve warm.'],
    };
  } catch (err) {
    console.warn('Gemini parse failed, falling back to heuristic engine:', err);
    return heuristicParseRecipe(rawText);
  }
}
