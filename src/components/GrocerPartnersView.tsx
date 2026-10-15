import React from 'react';
import { GrocerPartner } from '../types/mealPlanner';
import { Truck, Zap, CheckCircle2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';

interface GrocerPartnersViewProps {
  grocers: GrocerPartner[];
  selectedGrocerId: string;
  onSelectGrocer: (id: string) => void;
  onProceedToCart: () => void;
}

export const GrocerPartnersView: React.FC<GrocerPartnersViewProps> = ({
  grocers,
  selectedGrocerId,
  onSelectGrocer,
  onProceedToCart,
}) => {
  const scheduledGrocers = grocers.filter(g => g.type === 'Scheduled');
  const instantGrocers = grocers.filter(g => g.type === 'Instant');

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-800 tracking-wider uppercase mb-1">
            <span>Key Partners & Channel Tie-Ups</span>
            <span aria-hidden="true">·</span>
            <span>PDF Business Canvas Specification</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Integrated Grocer & Delivery Network
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Happy Aprons connects directly to leading supermarkets and rapid delivery networks. Choose scheduled delivery for your routine weekly haul, or instant delivery when you need tonight’s ingredients in under 30 minutes.
          </p>
        </div>

        {/* Section 1: Scheduled Delivery Partners */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <Truck className="w-4 h-4 text-stone-700" />
            <span>Scheduled Delivery Partners (Weekly Meal Routine)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scheduledGrocers.map((g) => {
              const isSelected = g.id === selectedGrocerId;
              return (
                <div
                  key={g.id}
                  className={`p-6 rounded-xl border bg-white shadow-xs transition-all flex flex-col justify-between ${
                    isSelected ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                          {g.badgeText}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                          {g.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700">
                        API Connected
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-stone-600">
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Fulfillment Window:</span>
                        <span className="font-mono text-stone-900 font-medium">{g.deliveryEstimate}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Free Delivery Threshold:</span>
                        <span className="font-mono text-stone-900 font-medium">${g.freeDeliveryThreshold}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Standard Delivery Fee:</span>
                        <span className="font-mono text-stone-900 font-medium">${g.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-amber-900 font-medium">
                        <span>Affiliate Perk:</span>
                        <span className="text-right text-[11px]">{g.affiliatePerk}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectGrocer(g.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? 'Active Grocer' : 'Select Grocer'}
                    </button>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Sync
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Instant Rapid Delivery Partners */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Instant Rapid Delivery Partners (Ad-Hoc & Tonight Cravings)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instantGrocers.map((g) => {
              const isSelected = g.id === selectedGrocerId;
              return (
                <div
                  key={g.id}
                  className={`p-6 rounded-xl border bg-white shadow-xs transition-all flex flex-col justify-between ${
                    isSelected ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                          {g.badgeText}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                          {g.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                        25-min Dispatch
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-stone-600">
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Speed to Doorstep:</span>
                        <span className="font-mono text-emerald-800 font-semibold">{g.deliveryEstimate}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Best For:</span>
                        <span className="text-stone-900">Missing tonight ingredients & sudden cravings</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span>Express Rider Fee:</span>
                        <span className="font-mono text-stone-900 font-medium">${g.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-amber-900 font-medium">
                        <span>Affiliate Benefit:</span>
                        <span className="text-right text-[11px]">{g.affiliatePerk}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectGrocer(g.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? 'Active Instant Grocer' : 'Select for Tonight'}
                    </button>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Express Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channel & Revenue Stream Explanation */}
        <div className="mt-12 p-6 bg-stone-100/70 rounded-xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold tracking-wide uppercase text-stone-800">
              Partner Integration & Business Model Alignment
            </h4>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              Mise monetizes via a hybrid model: free tier with partner affiliate commission (3–6% on verified grocery checkouts) plus Mise Pro ($9.99/mo) for automated recurring weekly slot booking and smart zero-waste inventory alerts.
            </p>
          </div>
          <button
            type="button"
            onClick={onProceedToCart}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shrink-0"
          >
            <span>Review Your Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
