import type { Request, Response } from 'express';

/**
 * Returns TheMealDB API key from environment variables.
 * Does not hardcode any key; uses process.env.THEMEALDB_API_KEY if defined,
 * or falls back to '1' (the standard public test key for development).
 */
function getMealDbApiKey(): string {
  return process.env.THEMEALDB_API_KEY || '1';
}

const THEMEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1';

/**
 * GET /api/meals or /api/meals/filter
 * Pulls live data from TheMealDB by ingredient.
 * Defaults to 'chicken_breast' as requested:
 * https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
 */
export async function getMealsByIngredientHandler(req: Request, res: Response): Promise<void> {
  try {
    const apiKey = getMealDbApiKey();
    // Default to 'chicken_breast' or allow query param ?i=... or ?ingredient=...
    const ingredient = (req.query.i || req.query.ingredient || 'chicken_breast') as string;
    
    const targetUrl = `${THEMEALDB_BASE_URL}/${apiKey}/filter.php?i=${encodeURIComponent(ingredient)}`;

    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      res.status(response.status).json({
        error: 'Failed to fetch meals from TheMealDB',
        status: response.status,
      });
      return;
    }

    const data = await response.json();

    res.status(200).json({
      success: true,
      ingredient,
      sourceEndpoint: `https://www.themealdb.com/api/json/v1/[KEY]/filter.php?i=${ingredient}`,
      count: data.meals ? data.meals.length : 0,
      meals: data.meals || [],
    });
  } catch (error: any) {
    console.error('Error fetching from TheMealDB:', error);
    res.status(500).json({
      error: 'Internal server error while connecting to TheMealDB',
      message: error?.message || 'Unknown error',
    });
  }
}

/**
 * GET /api/meals/lookup
 * Looks up full meal details and ingredients by ID.
 * e.g. /api/meals/lookup?id=52772
 */
export async function getMealDetailsHandler(req: Request, res: Response): Promise<void> {
  try {
    const apiKey = getMealDbApiKey();
    const id = req.query.id as string;

    if (!id) {
      res.status(400).json({ error: 'Missing meal ID parameter (?id=...)' });
      return;
    }

    const targetUrl = `${THEMEALDB_BASE_URL}/${apiKey}/lookup.php?i=${encodeURIComponent(id)}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      res.status(response.status).json({
        error: 'Failed to fetch meal details from TheMealDB',
        status: response.status,
      });
      return;
    }

    const data = await response.json();
    const rawMeal = data.meals?.[0] || null;

    if (!rawMeal) {
      res.status(404).json({ error: 'Meal not found' });
      return;
    }

    // Extract ingredients and measurements from TheMealDB structure
    const ingredients: Array<{ name: string; measure: string }> = [];
    for (let i = 1; i <= 20; i++) {
      const ing = rawMeal[`strIngredient${i}`];
      const measure = rawMeal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({
          name: ing.trim(),
          measure: (measure || '').trim(),
        });
      }
    }

    res.status(200).json({
      success: true,
      meal: {
        id: rawMeal.idMeal,
        title: rawMeal.strMeal,
        category: rawMeal.strCategory,
        area: rawMeal.strArea,
        instructions: rawMeal.strInstructions,
        thumbnail: rawMeal.strMealThumb,
        tags: rawMeal.strTags ? rawMeal.strTags.split(',') : [],
        youtube: rawMeal.strYoutube,
        ingredients,
      },
    });
  } catch (error: any) {
    console.error('Error looking up meal from TheMealDB:', error);
    res.status(500).json({
      error: 'Internal server error while connecting to TheMealDB',
      message: error?.message || 'Unknown error',
    });
  }
}

/**
 * GET /api/meals/random
 * Fetches a random recipe from TheMealDB
 */
export async function getRandomMealHandler(req: Request, res: Response): Promise<void> {
  try {
    const apiKey = getMealDbApiKey();
    const targetUrl = `${THEMEALDB_BASE_URL}/${apiKey}/random.php`;
    const response = await fetch(targetUrl);
    const data = await response.json();

    res.status(200).json({
      success: true,
      meal: data.meals?.[0] || null,
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to fetch random meal',
      message: error?.message,
    });
  }
}
