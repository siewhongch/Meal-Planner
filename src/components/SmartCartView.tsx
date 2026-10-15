import React, { useState } from 'react';
import { Ingredient, GrocerPartner, ScheduledMeal, PantryItem } from '../types/mealPlanner';
import { 
  ShoppingBag, 
  Check, 
  Trash2, 
  ExternalLink, 
  Truck, 
  Zap, 
  Calendar, 
  DollarSign, 
  Leaf, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface SmartCartViewProps {
  meals: ScheduledMeal[];
  grocers: GrocerPartner[];
  selectedGrocerId: string;
  onSelectGrocer: (id: string) => void;
  pantryItems: PantryItem[];
  weeklyBudget: number;
  pax: number;
  onOpenCheckoutModal: () => void;
}

interface ConsolidatedItem {
  id: string;
  name: string;
  totalQuantity: number;
  unit: string;
  department: Ingredient['department'];
  totalCost: number;
  inPantry: boolean;
  recipesUsedIn: string[];
}

export const SmartCartView: React.FC<SmartCartViewProps> = ({
  meals,
  grocers,
  selectedGrocerId,
  onSelectGrocer,
  pantryItems,
  weeklyBudget,
  pax,
  onOpenCheckoutModal,
}) => {
  // Consolidate ingredients across all scheduled meals
  const [pantryOverrides, setPantryOverrides] = useState<Record<string, boolean>>({});

  const consolidatedItems: ConsolidatedItem[] = React.useMemo(() => {
    const map = new Map<string, ConsolidatedItem>();

    meals.forEach((m) => {
      // Scale quantities by pax ratio (base recipe is for 2 pax)
      const paxScale = pax / (m.recipe.servings || 2);

      m.recipe.ingredients.forEach((ing) => {
        const key = ing.name.toLowerCase().trim();
        const existing = map.get(key);

        const scaledQty = +(ing.quantity * paxScale).toFixed(1);
        const scaledCost = +(ing.estimatedCost * paxScale).toFixed(2);

        // Check if item is already in pantry inventory
        const matchedPantry = pantryItems.some(
          p => p.name.toLowerCase().includes(key) || key.includes(p.name.toLowerCase())
        );

        if (existing) {
          existing.totalQuantity = +(existing.totalQuantity + scaledQty).toFixed(1);
          existing.totalCost = +(existing.totalCost + scaledCost).toFixed(2);
          if (!existing.recipesUsedIn.includes(m.recipe.title)) {
            existing.recipesUsedIn.push(m.recipe.title);
          }
        } else {
          map.set(key, {
            id: ing.id,
            name: ing.name,
            totalQuantity: scaledQty,
            unit: ing.unit,
            department: ing.department,
            totalCost: scaledCost,
            inPantry: ing.inPantry || matchedPantry,
            recipesUsedIn: [m.recipe.title],
          });
        }
      });
    });

    return Array.from(map.values());
  }, [meals, pantryItems, pax]);

  const togglePantryItem = (key: string) => {
    setPantryOverrides(prev => ({
      ...prev,
      [key]: prev[key] !== undefined ? !prev[key] : !consolidatedItems.find(i => i.name === key)?.inPantry,
    }));
  };

  const isItemInPantry = (item: ConsolidatedItem) => {
    if (pantryOverrides[item.name] !== undefined) {
      return pantryOverrides[item.name];
    }
    return item.inPantry;
  };

  const activeGrocer = grocers.find(g => g.id === selectedGrocerId) || grocers[0];

  // Financial calculations
  const totalRawCost = consolidatedItems.reduce((sum, item) => sum + item.totalCost, 0);
  const pantrySavings = consolidatedItems
    .filter(isItemInPantry)
    .reduce((sum, item) => sum + item.totalCost, 0);

  const cartSubtotal = +(totalRawCost - pantrySavings).toFixed(2);
  const isFreeDelivery = cartSubtotal >= activeGrocer.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : activeGrocer.deliveryFee;
  const finalCartTotal = +(cartSubtotal + deliveryFee).toFixed(2);
  const budgetDelta = +(weeklyBudget - finalCartTotal).toFixed(2);
  const isUnderBudget = budgetDelta >= 0;

  // Group by department
  const departments: Ingredient['department'][] = [
    'Produce',
    'Meat & Seafood',
    'Dairy & Eggs',
    'Bakery & Grains',
    'Pantry & Spices',
  ];

  const itemsToBuyCount = consolidatedItems.filter(i => !isItemInPantry(i)).length;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Automated Value Proposition */}
        <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-800 tracking-wider uppercase mb-1">
              <span>Value Proposition 02 & 03</span>
              <span aria-hidden="true">·</span>
              <span>AI Unit Consolidation & Grocer Sync</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Smart Consolidated Grocery Cart
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Ingredients across all {meals.length} recipes aggregated into standardized units. Items already in your pantry are deducted to prevent duplicates and food waste.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-stone-500">
              {consolidatedItems.length} Unique Items · {itemsToBuyCount} To Order
            </span>
          </div>
        </div>

        {/* 2-Column Core Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Consolidated Ingredient List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Grocer Partner Selector (Key Partners & Customer Relationships from PDF) */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Select Preferred Grocer Partner
                </span>
                <span className="text-xs text-stone-500">
                  Instant (Grab/Panda) vs Scheduled (RedMart/Amazon/FairPrice)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {grocers.map((g) => {
                  const isSelected = g.id === selectedGrocerId;
                  const isInstant = g.type === 'Instant';
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => onSelectGrocer(g.id)}
                      className={`p-3 text-left rounded-lg border transition-all relative ${
                        isSelected
                          ? 'border-stone-900 bg-stone-50/70 ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-stone-900">
                          {g.name}
                        </span>
                        {isInstant ? (
                          <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" /> Express
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Truck className="w-2.5 h-2.5" /> Scheduled
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{g.deliveryEstimate}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-1">
                        Free delivery over <span className="font-mono font-medium">${g.freeDeliveryThreshold}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Department-by-Department Consolidated Table */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
              <div className="p-4 bg-stone-50/80 flex items-center justify-between text-xs text-stone-600 font-medium">
                <span>Ingredient & Consolidated Quantity</span>
                <span className="flex items-center gap-6">
                  <span>Pantry Check</span>
                  <span>Estimated Cost</span>
                </span>
              </div>

              {departments.map((dept) => {
                const deptItems = consolidatedItems.filter(i => i.department === dept);
                if (deptItems.length === 0) return null;

                return (
                  <div key={dept} className="p-4 space-y-2">
                    <div className="text-xs font-semibold text-stone-800 tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                      <span>{dept}</span>
                      <span className="text-[11px] font-normal text-stone-500">
                        ({deptItems.length} items)
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {deptItems.map((item) => {
                        const inPantry = isItemInPantry(item);
                        return (
                          <div
                            key={item.name}
                            className={`p-2.5 rounded-lg border transition-all flex items-center justify-between text-xs ${
                              inPantry
                                ? 'bg-emerald-50/40 border-emerald-200 text-stone-500'
                                : 'bg-white border-stone-100 text-stone-900 hover:border-stone-200'
                            }`}
                          >
                            <div className="flex-1 pr-3">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${inPantry ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                                  {item.name}
                                </span>
                                {item.recipesUsedIn.length > 1 && (
                                  <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
                                    Used in {item.recipesUsedIn.length} recipes
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-stone-500 font-mono mt-0.5 flex items-center gap-2">
                                <span>Quantity: <strong className="text-stone-700">{item.totalQuantity} {item.unit}</strong></span>
                                <span aria-hidden="true">·</span>
                                <span className="truncate max-w-[200px]">{item.recipesUsedIn.join(', ')}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-5 shrink-0">
                              {/* Pantry Toggle Button */}
                              <button
                                type="button"
                                onClick={() => togglePantryItem(item.name)}
                                className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors ${
                                  inPantry
                                    ? 'bg-emerald-600 text-white font-medium'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                                title={inPantry ? 'Already in pantry (not ordered)' : 'Mark as in pantry to deduct'}
                              >
                                {inPantry ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>In Pantry</span>
                                  </>
                                ) : (
                                  <span>Have this?</span>
                                )}
                              </button>

                              {/* Price */}
                              <div className="font-mono text-right w-16 tabular-nums">
                                {inPantry ? (
                                  <span className="text-emerald-700 font-medium">-$0.00</span>
                                ) : (
                                  <span className="font-semibold text-stone-900">${item.totalCost.toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Checkout Summary & Budget Health Module */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Purchase Summary Box */}
            <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-stone-700">
                  Order Summary
                </span>
                <div className="flex items-center justify-between mt-2 pb-3 border-b border-stone-100">
                  <span className="text-sm font-semibold text-stone-900">{activeGrocer.name}</span>
                  <span className="text-xs font-mono text-stone-500">{activeGrocer.deliveryEstimate}</span>
                </div>
              </div>

              {/* Cost Rows */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Gross Ingredients ({consolidatedItems.length} items)</span>
                  <span className="font-mono tabular-nums text-stone-900">${totalRawCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-emerald-700">
                  <span className="flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    <span>Pantry Deductions (Waste Saved)</span>
                  </span>
                  <span className="font-mono tabular-nums font-semibold">-${pantrySavings.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-600 items-center">
                  <span>Delivery Fee</span>
                  {isFreeDelivery ? (
                    <span className="font-mono text-emerald-700 font-medium">FREE ($0.00)</span>
                  ) : (
                    <span className="font-mono tabular-nums text-stone-900">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>

                {!isFreeDelivery && (
                  <div className="p-2 bg-amber-50 rounded text-[11px] text-amber-900">
                    Add ${(activeGrocer.freeDeliveryThreshold - cartSubtotal).toFixed(2)} more for free delivery threshold (${activeGrocer.freeDeliveryThreshold}).
                  </div>
                )}
              </div>

              {/* Total & Budget Health Bar */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-stone-900">Total Cart Amount</span>
                  <span className="font-serif text-2xl font-bold text-stone-950 font-mono tabular-nums">
                    ${finalCartTotal.toFixed(2)}
                  </span>
                </div>

                {/* Budget comparison */}
                <div className="p-3 bg-stone-50 rounded-lg space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-600">Household Weekly Budget:</span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">${weeklyBudget.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-600">Budget Status:</span>
                    <span className={`font-mono font-semibold tabular-nums ${isUnderBudget ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {isUnderBudget ? `+$${budgetDelta.toFixed(2)} Under Budget` : `-$${Math.abs(budgetDelta).toFixed(2)} Over Budget`}
                    </span>
                  </div>
                  {/* Visual budget fill bar */}
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isUnderBudget ? 'bg-emerald-600' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, (finalCartTotal / weeklyBudget) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Affiliate Benefit Callout from PDF */}
              <div className="p-2.5 bg-stone-100/70 rounded-lg text-[11px] text-stone-600 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>Partner Commission & Perk: {activeGrocer.affiliatePerk}</span>
              </div>

              {/* Automate Add to Cart Button */}
              <button
                type="button"
                onClick={onOpenCheckoutModal}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Automate &quot;Add to Cart&quot; on {activeGrocer.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
