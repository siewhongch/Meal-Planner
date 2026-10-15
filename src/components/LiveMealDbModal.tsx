import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types/mealPlanner';
import { X, Sparkles, Loader2, Plus, Check, ExternalLink, Activity, RefreshCw } from 'lucide-react';

interface LiveMealDbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipeToPlan: (recipe: Recipe) => void;
}

interface MealSummary {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export const LiveMealDbModal: React.FC<LiveMealDbModalProps> = ({
  isOpen,
  onClose,
  onAddRecipeToPlan,
}) => {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [ingredientQuery, setIngredientQuery] = useState('chicken_breast');
  const [isLoading, setIsLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Check health check
  useEffect(() => {
    if (isOpen) {
      fetch('/api/health')
        .then(res => res.json())
        .then(data => setHealthStatus(data))
        .catch(err => console.error('Health check failed:', err));

      loadMeals('chicken_breast');
    }
  }, [isOpen]);

  const loadMeals = async (ing: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/meals?i=${encodeURIComponent(ing)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.meals)) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (e) {
      console.error('Failed to load meals from /api/meals:', e);
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportMeal = async (mealSummary: MealSummary) => {
    setLoadingDetailId(mealSummary.idMeal);
    try {
      const res = await fetch(`/api/meals/lookup?id=${mealSummary.idMeal}`);
      const data = await res.json();
      if (data.success && data.meal) {
        const m = data.meal;

        // Transform raw ingredients into our standardized format with units & department
        const ingredients: Ingredient[] = m.ingredients.map((ingItem: { name: string; measure: string }, idx: number) => {
          const lower = ingItem.name.toLowerCase();
          let dept: Ingredient['department'] = 'Pantry & Spices';
          if (lower.includes('chicken') || lower.includes('meat') || lower.includes('beef') || lower.includes('pork') || lower.includes('fish') || lower.includes('bacon')) {
            dept = 'Meat & Seafood';
          } else if (lower.includes('garlic') || lower.includes('onion') || lower.includes('potato') || lower.includes('carrot') || lower.includes('celery') || lower.includes('lemon') || lower.includes('herb') || lower.includes('parsley')) {
            dept = 'Produce';
          } else if (lower.includes('egg') || lower.includes('cream') || lower.includes('butter') || lower.includes('milk') || lower.includes('cheese')) {
            dept = 'Dairy & Eggs';
          } else if (lower.includes('flour') || lower.includes('rice') || lower.includes('bread') || lower.includes('pasta')) {
            dept = 'Bakery & Grains';
          }

          // Parse quantity and unit from measure
          let qty = 1;
          let unit = 'pcs';
          const match = ingItem.measure.match(/^([\d\.\/\s]+)?\s*([a-zA-Z]+)?/);
          if (match && match[1]) {
            qty = parseFloat(match[1]) || 1;
          }
          if (match && match[2]) {
            unit = match[2].toLowerCase();
          }

          return {
            id: `themealdb-${m.id}-${idx}`,
            name: ingItem.name,
            quantity: qty,
            unit: unit || 'pcs',
            department: dept,
            estimatedCost: +(Math.random() * 2.5 + 1.2).toFixed(2),
          };
        });

        const newRecipe: Recipe = {
          id: `recipe-themealdb-${m.id}`,
          title: m.title,
          description: `Live recipe sourced from TheMealDB API. Features fresh ${ingredientQuery.replace('_', ' ')} with balanced pantry seasonings.`,
          prepTimeMinutes: 15,
          cookTimeMinutes: 25,
          servings: 2,
          cuisine: m.area || 'International',
          calories: 540,
          macros: { protein: 42, carbs: 32, fat: 16 },
          allergens: [],
          imageUrl: m.thumbnail,
          fussFreeScore: 5,
          ingredients: ingredients.length ? ingredients : [
            { id: `ing-${m.id}-1`, name: 'Boneless Chicken Breast', quantity: 350, unit: 'g', department: 'Meat & Seafood', estimatedCost: 6.80 }
          ],
          instructions: m.instructions ? m.instructions.split(/\r?\n/).filter((s: string) => s.trim().length > 10) : ['Prepare and serve warm.'],
        };

        onAddRecipeToPlan(newRecipe);
        setAddedIds(prev => new Set(prev).add(mealSummary.idMeal));
      }
    } catch (err) {
      console.error('Failed to lookup full meal:', err);
    } finally {
      setLoadingDetailId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col my-auto">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-wider mb-1">
              <span>Serverless Connection</span>
              <span aria-hidden="true">·</span>
              <span>TheMealDB Live API (/api/meals)</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Live TheMealDB Recipe Explorer
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Live data streamed from <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">/api/meals?i=chicken_breast</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Health & Filter Bar */}
        <div className="p-6 pb-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-stone-900">Server Status:</span>
              <span className="font-mono text-emerald-700 font-medium">
                {healthStatus?.status === 'healthy' ? 'Healthy (/api/health OK)' : 'Connecting...'}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-500 font-mono text-[11px]">
                Endpoint: filter.php?i={ingredientQuery}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium">Ingredient:</span>
              <select
                value={ingredientQuery}
                onChange={(e) => {
                  setIngredientQuery(e.target.value);
                  loadMeals(e.target.value);
                }}
                className="text-xs font-medium py-1 px-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              >
                <option value="chicken_breast">chicken_breast (Default)</option>
                <option value="salmon">salmon</option>
                <option value="beef">beef</option>
                <option value="avocado">avocado</option>
              </select>
              <button
                type="button"
                onClick={() => loadMeals(ingredientQuery)}
                className="p-1.5 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 text-stone-700"
                title="Refresh from server"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="p-6 pt-2">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-stone-900 mx-auto" />
              <p className="text-xs font-mono text-stone-500">
                PULLING LIVE MEALS FROM THEMEALDB SERVERLESS PROXY...
              </p>
            </div>
          ) : meals.length === 0 ? (
            <div className="py-16 text-center text-xs text-stone-500 font-mono">
              No meals returned for this ingredient.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {meals.map((m) => {
                const isAdded = addedIds.has(m.idMeal);
                const isDetailLoading = loadingDetailId === m.idMeal;

                return (
                  <div
                    key={m.idMeal}
                    className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-2.5 relative">
                        <img
                          src={m.strMealThumb}
                          alt={m.strMeal}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 text-[10px] font-mono bg-stone-950/80 text-white px-1.5 py-0.5 rounded">
                          ID: #{m.idMeal}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-stone-900 line-clamp-2 leading-snug">
                        {m.strMeal}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-500">
                        TheMealDB
                      </span>
                      <button
                        type="button"
                        disabled={isDetailLoading || isAdded}
                        onClick={() => handleImportMeal(m)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-900 hover:bg-stone-800 text-white'
                        }`}
                      >
                        {isDetailLoading ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Importing...</span>
                          </>
                        ) : isAdded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>In Meal Plan</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add to Week</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            {meals.length} live recipes fetched from TheMealDB
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
