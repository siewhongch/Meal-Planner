import React from 'react';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'planner' | 'cart' | 'pantry' | 'partners' | 'canvas') => void;
  onOpenCanvas: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCanvas }) => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                Happy Aprons
              </span>
              <span className="text-xs uppercase tracking-wider text-amber-800 font-medium">
                Meal & Cart Engine
              </span>
            </div>
            <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
              Designed from the ground up to solve weekly mental load for busy adults who cook at home. Automated ingredient unit extraction, zero-waste pantry inventory cross-referencing, and 1-click cart creation with Singapore & Southeast Asia&apos;s leading grocery networks.
            </p>
            <div className="pt-2 text-[11px] text-stone-500 font-mono">
              Partners: GrabMart · FoodPanda · RedMart · FairPrice · Amazon Fresh
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-900">
              Platform Modules
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onSelectTab('planner')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Weekly Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('cart')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Smart Consolidated Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('pantry')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Pantry & Zero-Waste Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('partners')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Grocery Network Integrations
                </button>
              </li>
            </ul>
          </div>

          {/* Strategy & Business Model */}
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-900">
              Strategy & Canvas
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Operationalizing the 9 business model canvas blocks: Customer Segments, Key Propositions, Channels, and Revenue Streams.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenCanvas}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:text-amber-950 underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Full Business Canvas</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <span>&copy; {new Date().getFullYear()} Happy Aprons. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Household Meal Planning</span>
            <span aria-hidden="true">·</span>
            <span>Zero Food Wastage</span>
            <span aria-hidden="true">·</span>
            <span>Standardized Cart Units</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
