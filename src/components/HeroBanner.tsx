import React from 'react';
import { UserProfile, DietaryRestriction } from '../types/mealPlanner';
import { Sparkles, Users, Calendar, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  profile: UserProfile;
  onUpdateProfile: (newProfile: Partial<UserProfile>) => void;
  onGeneratePlan: () => void;
  onOpenUploadModal: () => void;
}

const DIETARY_OPTIONS: DietaryRestriction[] = [
  'None',
  'High-Protein',
  'Vegetarian',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb / Keto',
  'Halal Friendly',
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  profile,
  onUpdateProfile,
  onGeneratePlan,
  onOpenUploadModal,
}) => {
  const toggleDiet = (diet: DietaryRestriction) => {
    if (diet === 'None') {
      onUpdateProfile({ dietaryRestrictions: ['None'] });
      return;
    }
    const current = profile.dietaryRestrictions.filter(d => d !== 'None');
    if (current.includes(diet)) {
      const next = current.filter(d => d !== diet);
      onUpdateProfile({ dietaryRestrictions: next.length ? next : ['None'] });
    } else {
      onUpdateProfile({ dietaryRestrictions: [...current, diet] });
    }
  };

  return (
    <section className="relative pt-6 pb-12 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Hero: 2-column balanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Value Proposition & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-800 tracking-wider uppercase mb-3">
                <span>Business Model Solution</span>
                <span aria-hidden="true">·</span>
                <span>Meal Plan & Cart Automation</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
                Take the mental load off weekly home cooking.
              </h1>

              <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Simply pick your household preferences and weekly recipes. Mise calculates exact ingredients with standardized purchase units, verifies what’s already in your pantry to stop food waste, and automates your grocery cart with GrabMart, FoodPanda, RedMart, or FairPrice.
              </p>
            </div>

            {/* Profile Configurator Box */}
            <div className="mt-8 p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-semibold tracking-wide uppercase text-stone-700">
                  Step 1: Configure Household Profile
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  Weekly Plan Parameters
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pax Selector */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 mb-2">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    <span>Household Size</span>
                  </label>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => onUpdateProfile({ pax: num })}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          profile.pax === num
                            ? 'bg-white text-stone-900 shadow-sm font-semibold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {num} {num === 1 ? 'Pax' : 'Pax'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days to cook */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>Days to Cook</span>
                  </label>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                    {[3, 5, 7].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => onUpdateProfile({ daysToCook: days })}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          profile.daysToCook === days
                            ? 'bg-white text-stone-900 shadow-sm font-semibold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weekly Budget */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-stone-600 mb-2">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                      <span>Weekly Budget</span>
                    </span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      ${profile.weeklyBudget}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="250"
                    step="10"
                    value={profile.weeklyBudget}
                    onChange={(e) => onUpdateProfile({ weeklyBudget: Number(e.target.value) })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                    <span>$50</span>
                    <span>$150</span>
                    <span>$250</span>
                  </div>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Dietary Goals & Restrictions
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DIETARY_OPTIONS.map((diet) => {
                    const isSelected = profile.dietaryRestrictions.includes(diet);
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => toggleDiet(diet)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onGeneratePlan}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm active:scale-[0.99] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate AI Weekly Plan & Cart</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
                <button
                  type="button"
                  onClick={onOpenUploadModal}
                  className="py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Upload / Paste Custom Recipes
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase with Real Context */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full min-h-[380px] rounded-2xl overflow-hidden border border-stone-200 shadow-md group">
              <img
                src="/src/assets/images/hero_culinary_prep_1792051424987.jpg"
                alt="Fresh artisanal ingredients arranged cleanly on kitchen island"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              {/* Overlay card in bottom corner */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/50 text-stone-900 shadow-lg">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-stone-800">Weekly Engine Automation</span>
                  <span className="font-mono text-emerald-700 font-medium">94% Zero-Waste Match</span>
                </div>
                <p className="text-xs text-stone-700 leading-snug">
                  Consolidating overlapping produce across 5 dinners. 8 cloves garlic & 1 olive oil shared between recipes, saving <span className="font-semibold text-stone-900 font-mono">$18.40</span> in duplicate purchases.
                </p>
                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Grocers: RedMart · FairPrice · GrabMart</span>
                  <span className="font-mono text-stone-800 font-medium">1-Click Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Quantitative Rigor Proof Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
              4.5 hrs/wk
            </div>
            <div className="text-xs text-stone-500 leading-snug">
              Average mental load & meal planning time saved for working adults
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
              34% Saved
            </div>
            <div className="text-xs text-stone-500 leading-snug">
              Food waste reduction via pantry inventory cross-referencing
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
              5 Partners
            </div>
            <div className="text-xs text-stone-500 leading-snug">
              GrabMart, FoodPanda (Instant) + RedMart, Amazon, FairPrice (Scheduled)
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
              100% Units
            </div>
            <div className="text-xs text-stone-500 leading-snug">
              Exact purchase conversions (grams, ml, bunches, cans) for error-free carts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
