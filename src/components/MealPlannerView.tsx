import React, { useState } from 'react';
import { Recipe, ScheduledMeal, DayOfWeek } from '../types/mealPlanner';
import { Clock, Flame, RefreshCw, Plus, CheckCircle, ChefHat, Eye, Zap } from 'lucide-react';

interface MealPlannerViewProps {
  meals: ScheduledMeal[];
  recipes: Recipe[];
  onSwapMeal: (mealId: string, newRecipe: Recipe) => void;
  onOpenRecipeDetail: (recipe: Recipe) => void;
  onOpenUploadModal: () => void;
  onInstantOrder: (recipe: Recipe) => void;
  pax: number;
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({
  meals,
  recipes,
  onSwapMeal,
  onOpenRecipeDetail,
  onOpenUploadModal,
  onInstantOrder,
  pax,
}) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'all' | DayOfWeek>('all');
  const [swappingMealId, setSwappingMealId] = useState<string | null>(null);

  // Nutritional summary
  const totalCalories = meals.reduce((sum, m) => sum + m.recipe.calories, 0);
  const avgCalories = meals.length ? Math.round(totalCalories / meals.length) : 0;
  const avgProtein = meals.length ? Math.round(meals.reduce((sum, m) => sum + m.recipe.macros.protein, 0) / meals.length) : 0;
  const totalIngredients = meals.reduce((sum, m) => sum + m.recipe.ingredients.length, 0);

  const filteredMeals = selectedDayFilter === 'all' 
    ? meals 
    : meals.filter(m => m.day === selectedDayFilter);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Macro Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-800 tracking-wider uppercase mb-1">
              <span>Weekly Meal Schedule</span>
              <span aria-hidden="true">·</span>
              <span>Pax: {pax} Adults</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Your Curated Weekly Dinners
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Fuss-free recipes engineered to share common staples, minimize leftovers, and auto-sync to grocer carts.
            </p>
          </div>

          {/* Macro & Resource Strip */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2 pr-4 border-r border-stone-200">
              <Flame className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-[11px] text-stone-500 font-medium">Avg Calories</div>
                <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                  {avgCalories} kcal/pax
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pr-4 border-r border-stone-200">
              <ChefHat className="w-4 h-4 text-stone-600" />
              <div>
                <div className="text-[11px] text-stone-500 font-medium">Avg Daily Protein</div>
                <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                  {avgProtein}g / serving
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenUploadModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Recipe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Day Filter Pills */}
        <div className="flex items-center gap-1 py-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedDayFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedDayFilter === 'all'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Dinners ({meals.length})
          </button>
          {meals.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedDayFilter(meal.day)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedDayFilter === meal.day
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {meal.day}
            </button>
          ))}
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header of card */}
                <div className="p-4 pb-3 flex items-center justify-between border-b border-stone-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                    <span className="font-mono text-amber-800 uppercase tracking-wider">{meal.day}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500 font-normal">{meal.mealType}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {meal.recipe.cuisine}
                  </div>
                </div>

                {/* Recipe Image with Fallback */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden group">
                  <img
                    src={meal.recipe.imageUrl}
                    alt={meal.recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gracefully to subtle placeholder styling
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-stone-950/80 backdrop-blur-sm text-white rounded text-[11px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{meal.recipe.prepTimeMinutes + meal.recipe.cookTimeMinutes} mins</span>
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="p-4 space-y-3">
                  <h3 className="font-serif font-bold text-base text-stone-900 line-clamp-1">
                    {meal.recipe.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {meal.recipe.description}
                  </p>

                  {/* Macros Strip */}
                  <div className="pt-2 border-t border-stone-100 grid grid-cols-4 gap-2 text-center">
                    <div className="p-1.5 bg-stone-50 rounded">
                      <div className="text-[10px] text-stone-500">Calories</div>
                      <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {meal.recipe.calories}
                      </div>
                    </div>
                    <div className="p-1.5 bg-stone-50 rounded">
                      <div className="text-[10px] text-stone-500">Protein</div>
                      <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {meal.recipe.macros.protein}g
                      </div>
                    </div>
                    <div className="p-1.5 bg-stone-50 rounded">
                      <div className="text-[10px] text-stone-500">Carbs</div>
                      <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {meal.recipe.macros.carbs}g
                      </div>
                    </div>
                    <div className="p-1.5 bg-stone-50 rounded">
                      <div className="text-[10px] text-stone-500">Fat</div>
                      <div className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {meal.recipe.macros.fat}g
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="text-xs text-stone-500 pt-1 flex items-center justify-between">
                    <span>{meal.recipe.ingredients.length} items with exact units</span>
                    <span className="font-mono text-stone-700">~${(meal.recipe.ingredients.reduce((s, i) => s + i.estimatedCost, 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 border-t border-stone-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenRecipeDetail(meal.recipe)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  <span>View Steps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSwappingMealId(meal.id)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors title='Swap this meal'"
                  title="Swap meal"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onInstantOrder(meal.recipe)}
                  className="flex items-center gap-1 py-2 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium rounded-lg transition-colors"
                  title="Cook Tonight: Order instant ingredients via GrabMart / FoodPanda"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Tonight</span>
                </button>
              </div>

              {/* In-Card Swap Drawer / Selector if user clicked Swap */}
              {swappingMealId === meal.id && (
                <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                    <span>Pick Alternative Recipe:</span>
                    <button
                      type="button"
                      onClick={() => setSwappingMealId(null)}
                      className="text-stone-400 hover:text-stone-700 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {recipes
                      .filter(r => r.id !== meal.recipe.id)
                      .map(candidate => (
                        <button
                          key={candidate.id}
                          type="button"
                          onClick={() => {
                            onSwapMeal(meal.id, candidate);
                            setSwappingMealId(null);
                          }}
                          className="w-full text-left p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 text-xs flex items-center justify-between transition-colors"
                        >
                          <span className="font-medium text-stone-800 truncate pr-2">
                            {candidate.title}
                          </span>
                          <span className="text-stone-500 font-mono shrink-0">
                            {candidate.prepTimeMinutes + candidate.cookTimeMinutes}m
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
