import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/mealPlanner';
import { X, Clock, Flame, ShieldAlert, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  pax: number;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  pax,
}) => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) return null;

  const startPresetTimer = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const paxScale = pax / (recipe.servings || 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              <span>{recipe.cuisine}</span>
              <span aria-hidden="true">·</span>
              <span>Scaled for {pax} Pax</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {recipe.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Hero Image & Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {recipe.description}
              </p>

              {/* Nutritional Database Metrics (Key Resource 1 from PDF) */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Verified Nutritional Profile (per serving)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2 rounded border border-stone-100">
                    <div className="text-[10px] text-stone-500">Energy</div>
                    <div className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      {recipe.calories} kcal
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-100">
                    <div className="text-[10px] text-stone-500">Protein</div>
                    <div className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      {recipe.macros.protein}g
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-100">
                    <div className="text-[10px] text-stone-500">Carbs</div>
                    <div className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      {recipe.macros.carbs}g
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-100">
                    <div className="text-[10px] text-stone-500">Fat</div>
                    <div className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      {recipe.macros.fat}g
                    </div>
                  </div>
                </div>

                {recipe.allergens.length > 0 && (
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-stone-600">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Allergen Notice: {recipe.allergens.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Active Cooking Timer widget */}
              <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-600" />
                  <span className="font-medium text-stone-800">Kitchen Timer:</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {formatTimer(timerSeconds)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {timerSeconds === 0 ? (
                    <button
                      type="button"
                      onClick={() => startPresetTimer(recipe.cookTimeMinutes)}
                      className="px-2.5 py-1 bg-stone-900 text-white rounded text-[11px] font-medium hover:bg-stone-800"
                    >
                      Start {recipe.cookTimeMinutes}m
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="p-1 bg-stone-200 hover:bg-stone-300 rounded text-stone-800"
                      >
                        {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTimerSeconds(0); setIsTimerRunning(false); }}
                        className="p-1 bg-stone-200 hover:bg-stone-300 rounded text-stone-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients with Scaled Quantities and Standard Units */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Required Ingredients ({recipe.ingredients.length} Items Scaled to {pax} Pax)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing) => {
                const scaled = +(ing.quantity * paxScale).toFixed(1);
                return (
                  <div
                    key={ing.id}
                    className="p-2.5 bg-stone-50 rounded-lg border border-stone-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-stone-800">{ing.name}</span>
                    <span className="font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {scaled} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Preparation & Cooking Steps
            </h4>
            <ol className="space-y-2.5">
              {recipe.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-stone-50/70 rounded-lg border border-stone-200/60 text-xs text-stone-700 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
