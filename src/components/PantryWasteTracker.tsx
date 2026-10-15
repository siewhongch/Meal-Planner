import React, { useState } from 'react';
import { PantryItem } from '../types/mealPlanner';
import { Leaf, Plus, Trash2, Clock, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';

interface PantryWasteTrackerProps {
  pantryItems: PantryItem[];
  onAddPantryItem: (item: Omit<PantryItem, 'id'>) => void;
  onRemovePantryItem: (id: string) => void;
  onCookExpiring: () => void;
}

export const PantryWasteTracker: React.FC<PantryWasteTrackerProps> = ({
  pantryItems,
  onAddPantryItem,
  onRemovePantryItem,
  onCookExpiring,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('pcs');
  const [category, setCategory] = useState<PantryItem['category']>('Produce');
  const [daysUntilExpiry, setDaysUntilExpiry] = useState('7');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPantryItem({
      name: name.trim(),
      quantity: parseFloat(quantity) || 1,
      unit,
      category,
      daysUntilExpiry: parseInt(daysUntilExpiry, 10) || 7,
    });
    setName('');
    setShowAddForm(false);
  };

  const expiringSoonCount = pantryItems.filter(p => p.daysUntilExpiry <= 5).length;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-800 tracking-wider uppercase mb-1">
              <span>Key Proposition 04 & Resource 04</span>
              <span aria-hidden="true">·</span>
              <span>Inventory & Zero Food Waste Engine</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Pantry Inventory & Waste Prevention
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Track what is already in your kitchen before shopping. Happy Aprons automatically subtracts these items from your grocery cart, saving you money and eliminating spoiled leftovers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pantry Item</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Food Waste Prevented</span>
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              2.4 kg / week
            </div>
            <p className="text-xs text-stone-500 leading-snug">
              Prevented from spoiling through precise cross-meal ingredient reuse (e.g. sharing kale & herbs).
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Duplicate Cart Savings</span>
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
              $19.80 saved
            </div>
            <p className="text-xs text-stone-500 leading-snug">
              Deducted olive oil, rice, salt, and garlic that you already have in stock.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Expiring Soon (&le; 5 Days)</span>
              <Clock className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums flex items-baseline gap-2">
              <span>{expiringSoonCount} items</span>
              {expiringSoonCount > 0 && (
                <button
                  type="button"
                  onClick={onCookExpiring}
                  className="text-xs font-sans text-amber-800 underline font-medium hover:text-amber-950"
                >
                  Prioritize in planner
                </button>
              )}
            </div>
            <p className="text-xs text-stone-500 leading-snug">
              Prioritized first in your weekly recipes so fresh produce doesn’t go bad.
            </p>
          </div>
        </div>

        {/* Add Form Drawer / Modal */}
        {showAddForm && (
          <form
            onSubmit={handleAdd}
            className="mt-6 p-5 bg-amber-50/60 rounded-xl border border-amber-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Log New Kitchen Staple
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-stone-400 hover:text-stone-700 text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sriracha, Greek Yogurt, Eggs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Quantity</label>
                <input
                  type="number"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="pcs">pcs</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="cloves">cloves</option>
                  <option value="bunch">bunch</option>
                  <option value="cans">cans</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-700 mb-1">Days to Expiry</label>
                <input
                  type="number"
                  value={daysUntilExpiry}
                  onChange={(e) => setDaysUntilExpiry(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                Save to Pantry
              </button>
            </div>
          </form>
        )}

        {/* Pantry Items Table */}
        <div className="mt-8 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-700">
            <span>Staple / In-Stock Ingredient</span>
            <div className="flex items-center gap-8">
              <span className="hidden sm:inline">Category</span>
              <span>Shelf Life</span>
              <span>Action</span>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {pantryItems.map((item) => {
              const isUrgent = item.daysUntilExpiry <= 5;
              return (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-stone-50/50 transition-colors text-xs"
                >
                  <div>
                    <div className="font-semibold text-stone-900">{item.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      {item.quantity} {item.unit} in kitchen stock
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="hidden sm:inline text-stone-500 font-medium text-xs">
                      {item.category}
                    </span>

                    <span className={`font-mono text-xs flex items-center gap-1 ${
                      isUrgent ? 'text-rose-600 font-semibold' : 'text-stone-600'
                    }`}>
                      {isUrgent && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                      <span>{item.daysUntilExpiry} days left</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemovePantryItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100 transition-colors"
                      title="Remove from pantry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
