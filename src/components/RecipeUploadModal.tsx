import React, { useState } from 'react';
import { parseRecipeWithGemini, heuristicParseRecipe } from '../services/geminiService';
import { Recipe } from '../types/mealPlanner';
import { Sparkles, X, Check, ArrowRight, Loader2, UploadCloud } from 'lucide-react';

interface RecipeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipeToPlan: (recipe: Recipe) => void;
}

const PRESET_RECIPES = [
  {
    title: '15-Min Crisp Garlic Chili Oil Noodles',
    cuisine: 'Asian & Stir-Fry',
    text: `15-Min Crisp Garlic Chili Oil Noodles
Ingredients:
200g artisanal ramen or knife-cut wheat noodles
4 cloves garlic, finely minced
2 tbsp Chinese dark soy sauce
1 tbsp toasted sesame oil
2 tbsp roasted chili flakes and Sichuan pepper
1 bunch fresh scallions, thinly sliced
1 free-range egg (for topping)

Instructions:
1. Boil noodles for 3 minutes until al dente, drain and place in heatproof bowl.
2. Top noodles with minced garlic, chopped scallions, and chili flakes.
3. Heat 2 tbsp oil in pan until smoking, carefully pour over aromatics to sizzle.
4. Stir in soy sauce and sesame oil. Top with soft fried egg.`
  },
  {
    title: 'Sheet-Pan Mediterranean Lemon Herb Chicken',
    cuisine: 'Mediterranean',
    text: `Sheet-Pan Mediterranean Lemon Herb Chicken
Ingredients:
450g boneless skinless chicken thighs
1 bunch fresh asparagus spears
200g sweet cherry tomatoes
1 fresh lemon, sliced
2 tbsp extra virgin olive oil
1 bunch fresh oregano
4 cloves garlic, crushed

Instructions:
1. Toss chicken, asparagus, and cherry tomatoes with olive oil, crushed garlic, and dried oregano on a baking sheet.
2. Arrange lemon slices over chicken.
3. Roast at 200°C for 22 minutes until chicken is golden and tomatoes blistered.`
  }
];

export const RecipeUploadModal: React.FC<RecipeUploadModalProps> = ({
  isOpen,
  onClose,
  onAddRecipeToPlan,
}) => {
  const [recipeText, setRecipeText] = useState(PRESET_RECIPES[0].text);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState<Recipe | null>(null);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (!recipeText.trim()) return;
    setIsProcessing(true);
    try {
      const result = await parseRecipeWithGemini(recipeText);
      setParsedResult(result);
    } catch (e) {
      const fallback = heuristicParseRecipe(recipeText);
      setParsedResult(fallback);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmAdd = () => {
    if (parsedResult) {
      onAddRecipeToPlan(parsedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col my-auto">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-wider mb-1">
              <span>Key Proposition 02</span>
              <span aria-hidden="true">·</span>
              <span>AI Recipe & Unit Normalizer</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Upload or Paste Weekly Recipes
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Simply paste any recipe or food creator reel text. AI will parse all ingredients into standardized units for 1-click grocery ordering.
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

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">
              Or Try A Preset Creator Recipe:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_RECIPES.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => {
                    setRecipeText(preset.text);
                    setParsedResult(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Recipe Ingredients & Instructions
            </label>
            <textarea
              rows={8}
              value={recipeText}
              onChange={(e) => setRecipeText(e.target.value)}
              placeholder="Paste recipe ingredients, quantities, and steps here..."
              className="w-full text-xs font-mono p-3 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 leading-relaxed"
            />
          </div>

          {/* Action to Parse */}
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-stone-500 font-mono">
              Outputs standardized g, ml, pcs, bunches & departments
            </span>
            <button
              type="button"
              disabled={isProcessing || !recipeText.trim()}
              onClick={handleParse}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Parsing Units & Ingredients...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Parse Ingredients & Units</span>
                </>
              )}
            </button>
          </div>

          {/* Parsed Result Preview */}
          {parsedResult && (
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {parsedResult.title}
                  </h4>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {parsedResult.prepTimeMinutes + parsedResult.cookTimeMinutes} mins · {parsedResult.calories} kcal · {parsedResult.ingredients.length} standardized items
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono rounded">
                  Parsed Successfully
                </span>
              </div>

              {/* Items Table */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {parsedResult.ingredients.map((ing) => (
                  <div
                    key={ing.id}
                    className="p-2 bg-white rounded border border-emerald-100 text-xs flex items-center justify-between"
                  >
                    <span className="font-medium text-stone-900">{ing.name}</span>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-stone-600">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded font-semibold text-stone-800">
                        {ing.quantity} {ing.unit}
                      </span>
                      <span>${ing.estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Add to Weekly Meal Plan & Cart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
