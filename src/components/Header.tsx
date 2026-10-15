import React from 'react';
import { ShoppingBag, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'planner' | 'cart' | 'pantry' | 'partners' | 'canvas';
  onSelectTab: (tab: 'planner' | 'cart' | 'pantry' | 'partners' | 'canvas') => void;
  cartItemCount: number;
  onOpenQuickCart: () => void;
  onOpenCanvas: () => void;
  onOpenLiveMealDb: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartItemCount,
  onOpenQuickCart,
  onOpenCanvas,
  onOpenLiveMealDb,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onSelectTab('planner')}
            className="group flex items-baseline gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap">
              Happy Aprons
            </span>
            <span className="hidden sm:inline text-xs font-medium tracking-wider uppercase text-amber-800/80">
              Meal & Grocer Engine
            </span>
          </button>
        </div>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('planner')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'planner'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-950'
            }`}
          >
            Weekly Planner
          </button>
          <button
            onClick={() => onSelectTab('cart')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'cart'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-950'
            }`}
          >
            Smart Cart ({cartItemCount})
          </button>
          <button
            onClick={() => onSelectTab('pantry')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'pantry'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-950'
            }`}
          >
            Pantry & Waste Zero
          </button>
          <button
            onClick={() => onSelectTab('partners')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'partners'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-950'
            }`}
          >
            Grocer Network
          </button>
          <button
            onClick={onOpenLiveMealDb}
            className="whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 transition-colors flex items-center gap-1.5 py-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>TheMealDB Live API</span>
          </button>
          <button
            onClick={onOpenCanvas}
            className="whitespace-nowrap shrink-0 text-stone-600 hover:text-amber-800 transition-colors flex items-center gap-1.5 py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Business Canvas</span>
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuickCart}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="whitespace-nowrap">Sync to Grocer Cart</span>
            <span className="bg-stone-800 text-stone-200 text-[11px] font-mono px-1.5 py-0.5 rounded">
              {cartItemCount} items
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
