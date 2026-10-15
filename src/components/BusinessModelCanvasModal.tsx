import React from 'react';
import { PDF_BUSINESS_MODEL_CANVAS } from '../data/mockData';
import { X, CheckCircle, Lightbulb, ExternalLink } from 'lucide-react';

interface BusinessModelCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (section: 'planner' | 'cart' | 'pantry' | 'partners') => void;
}

export const BusinessModelCanvasModal: React.FC<BusinessModelCanvasModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-wider mb-1">
              <span>PDF Strategy Mapping</span>
              <span aria-hidden="true">·</span>
              <span>Business Model Canvas Specification</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              The Mise Business Architecture
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              How the 9 PDF sticky-note sections are operationalized in this web application.
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

        {/* 9 Canvas Blocks in Classic Grid Representation */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Key Partners */}
            <div className="p-5 bg-sky-50/70 rounded-xl border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950">
                    1. Key Partners
                  </h4>
                  <button
                    onClick={() => { onClose(); onNavigateToSection('partners'); }}
                    className="text-[10px] text-sky-700 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    View UI <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-sky-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.keyPartners.subtitle}
                </p>
                <div className="mt-3 space-y-2 text-xs text-sky-900">
                  <div className="p-2 bg-white/80 rounded border border-sky-100">
                    <strong>Instant Delivery:</strong> GrabMart / FoodPanda (20–35 min express for tonight&apos;s dinner)
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-sky-100">
                    <strong>Scheduled Delivery:</strong> RedMart, Amazon Fresh, FairPrice (bulk weekly scheduled slots)
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-200/60 text-[10px] text-sky-800 font-mono">
                Status: Integrated in Smart Cart
              </div>
            </div>

            {/* 2. Key Activities */}
            <div className="p-5 bg-sky-50/70 rounded-xl border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950">
                    2. Key Activities
                  </h4>
                  <button
                    onClick={() => { onClose(); onNavigateToSection('planner'); }}
                    className="text-[10px] text-sky-700 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    View UI <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-sky-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.keyActivities.subtitle}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-sky-900 list-disc list-inside">
                  <li>Customer inputs meal preferences (cuisine, dietary restrictions)</li>
                  <li>Customer inputs household budget limits</li>
                  <li>Profile settings: Number of pax, days to cook, and automated cart targets</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-200/60 text-[10px] text-sky-800 font-mono">
                Status: Implemented in Hero Configurator
              </div>
            </div>

            {/* 3. Key Propositions */}
            <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    3. Key Value Propositions
                  </h4>
                  <button
                    onClick={() => { onClose(); onNavigateToSection('cart'); }}
                    className="text-[10px] text-amber-800 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    View UI <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-amber-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.valuePropositions.subtitle}
                </p>
                <div className="mt-3 space-y-2 text-xs text-amber-950">
                  <div className="p-2 bg-white/80 rounded border border-amber-100">
                    <strong>Mental Load Relief:</strong> Takes the weekly cooking dilemma off busy adults
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-amber-100">
                    <strong>Time Saving:</strong> Upload weekly recipes and AI lists all items with standard units
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-amber-100">
                    <strong>Automate Add to Cart:</strong> 1-click cart creation directly on preferred grocer
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-amber-100">
                    <strong>Zero Food Wastage:</strong> Purchase strictly needed amounts, shared across meals
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-200/60 text-[10px] text-amber-800 font-mono">
                Status: Core App Value Engine
              </div>
            </div>

            {/* 4. Customer Relationships */}
            <div className="p-5 bg-orange-50/70 rounded-xl border border-orange-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950">
                  4. Customer Relationships
                </h4>
                <p className="text-[11px] text-orange-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.customerRelationships.subtitle}
                </p>
                <div className="mt-3 space-y-2 text-xs text-orange-950">
                  <div className="p-2 bg-white/80 rounded border border-orange-100">
                    <strong>Weekly:</strong> Routine scheduled delivery & automated 5-day meal plan sync
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-orange-100">
                    <strong>Ad hoc:</strong> Express tonight fulfillment via GrabMart / FoodPanda
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-orange-200/60 text-[10px] text-orange-800 font-mono">
                Status: Dual Scheduled & Instant Modes
              </div>
            </div>

            {/* 5. Channels */}
            <div className="p-5 bg-orange-50/70 rounded-xl border border-orange-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950">
                  5. Channels
                </h4>
                <p className="text-[11px] text-orange-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.channels.subtitle}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-orange-950 list-disc list-inside">
                  <li><strong>Social Media:</strong> Creator recipe links (TikTok / IG Reels 1-click import)</li>
                  <li><strong>Grocery Chains:</strong> Co-branded plugins & integrations with FairPrice, RedMart, Amazon</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-orange-200/60 text-[10px] text-orange-800 font-mono">
                Status: Social Importer & Grocer Hub
              </div>
            </div>

            {/* 6. Customer Segments */}
            <div className="p-5 bg-rose-50/70 rounded-xl border border-rose-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-950">
                  6. Customer Segments
                </h4>
                <p className="text-[11px] text-rose-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.customerSegments.subtitle}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-rose-950 list-disc list-inside">
                  <li>Customers who cook at home</li>
                  <li>Time-starved customers looking for fuss-free recipes that maximize ingredients</li>
                  <li>Customers comfortable with digital tools</li>
                  <li>Health-conscious individuals choosing to cook over takeout</li>
                  <li>Working adults who hate spending mental energy deciding what to cook</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-rose-200/60 text-[10px] text-rose-800 font-mono">
                Status: Addressed by Simple 1-Click UX
              </div>
            </div>

            {/* 7. Cost Structure */}
            <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                  7. Cost Structure
                </h4>
                <p className="text-[11px] text-emerald-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.costStructure.subtitle}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-emerald-950 list-disc list-inside">
                  <li>Product development & AI ingredient normalization algorithms</li>
                  <li>Grocery partner API connector maintenance</li>
                  <li>Marketing & creator acquisition across social media</li>
                  <li>Nutritional database licensing (calories, macros, allergens)</li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[10px] text-emerald-800 font-mono">
                Status: Lean SaaS + API Unit Economics
              </div>
            </div>

            {/* 8. Revenue Streams */}
            <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                  8. Revenue Streams
                </h4>
                <p className="text-[11px] text-emerald-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.revenueStreams.subtitle}
                </p>
                <div className="mt-3 space-y-2 text-xs text-emerald-950">
                  <div className="p-2 bg-white/80 rounded border border-emerald-100">
                    <strong>Subscription Based:</strong> Mise Pro ($9.99/mo) for automated grocer carts, unlimited AI imports, and zero-waste analytics
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-emerald-100">
                    <strong>Commission Based:</strong> 3%–6% affiliate affiliate referral commission on checkouts with RedMart, FairPrice, GrabMart
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[10px] text-emerald-800 font-mono">
                Status: Monetization Model Live
              </div>
            </div>

            {/* 9. Key Resources */}
            <div className="p-5 bg-sky-50/70 rounded-xl border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950">
                    9. Key Resources
                  </h4>
                  <button
                    onClick={() => { onClose(); onNavigateToSection('pantry'); }}
                    className="text-[10px] text-sky-700 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    View UI <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-sky-800 mt-1 italic">
                  {PDF_BUSINESS_MODEL_CANVAS.keyResources.subtitle}
                </p>
                <ol className="mt-3 space-y-1 text-xs text-sky-900 list-decimal list-inside font-medium">
                  <li>Nutritional database (calories, macros, allergens)</li>
                  <li>Recipe licensing / curated fuss-free partnerships</li>
                  <li>User preference data system (pax, budget, days)</li>
                  <li>Inventory tracking system (pantry deduplication)</li>
                  <li>Grocery partners (RedMart, FairPrice, Amazon)</li>
                  <li>Delivery service partners (GrabMart, FoodPanda)</li>
                </ol>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-200/60 text-[10px] text-sky-800 font-mono">
                Status: Fully Functional in App Engine
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            Generated directly from uploaded PDF Canvas sticky notes
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Canvas
          </button>
        </div>
      </div>
    </div>
  );
};
