import React, { useState } from 'react';
import { GrocerPartner } from '../types/mealPlanner';
import { ShoppingBag, CheckCircle, Truck, Zap, Clock, ShieldCheck, ArrowRight, Loader2, X, ExternalLink } from 'lucide-react';

interface CheckoutDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  grocer: GrocerPartner;
  cartTotal: number;
  itemsCount: number;
  pantrySavings: number;
}

export const CheckoutDispatchModal: React.FC<CheckoutDispatchModalProps> = ({
  isOpen,
  onClose,
  grocer,
  cartTotal,
  itemsCount,
  pantrySavings,
}) => {
  const [step, setStep] = useState<'syncing' | 'review' | 'confirmed'>('syncing');
  const [selectedSlot, setSelectedSlot] = useState(
    grocer.type === 'Instant' ? 'Immediate Express (25-35 mins)' : 'Tomorrow Evening (6:00 PM – 8:00 PM)'
  );
  const [contactless, setContactless] = useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setStep('syncing');
      const timer = setTimeout(() => {
        setStep('review');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col my-auto">
        {/* Modal Top */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            {grocer.type === 'Instant' ? (
              <Zap className="w-4 h-4 text-amber-600" />
            ) : (
              <Truck className="w-4 h-4 text-stone-700" />
            )}
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              {grocer.name} · Cart Automation Dispatch
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State 1: Simulating SKU Matching & API Synchronization */}
        {step === 'syncing' && (
          <div className="p-8 text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-stone-900 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Synchronizing with {grocer.name} API
            </h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
              Matching your recipes&apos; standardized weights (720g Atlantic Salmon, organic kale, fresh lemons) to {grocer.name} catalog inventory...
            </p>
            <div className="text-[11px] font-mono text-emerald-700 font-medium">
              100% Units & SKUs Verified
            </div>
          </div>
        )}

        {/* State 2: Slot Selection & Delivery Confirmation */}
        {step === 'review' && (
          <div className="p-6 space-y-5">
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Confirm Grocery Dispatch
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Cart successfully built. All {itemsCount} items are in stock at {grocer.name}.
              </p>
            </div>

            {/* Delivery Slot Choice */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Select Delivery Window:
              </label>
              <div className="space-y-1.5">
                {grocer.type === 'Instant' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('Immediate Express (25-35 mins)')}
                      className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                        selectedSlot === 'Immediate Express (25-35 mins)'
                          ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Immediate Express (25-35 mins)</span>
                      </span>
                      <span className="font-mono text-emerald-700">Rider On Standby</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('Tonight Dinner Slot (7:30 PM)')}
                      className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                        selectedSlot === 'Tonight Dinner Slot (7:30 PM)'
                          ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <span>Tonight Dinner Slot (7:30 PM)</span>
                      <span className="font-mono text-stone-500">Reserved</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('Tomorrow Evening (6:00 PM – 8:00 PM)')}
                      className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                        selectedSlot === 'Tomorrow Evening (6:00 PM – 8:00 PM)'
                          ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-600" />
                        <span>Tomorrow Evening (6:00 PM – 8:00 PM)</span>
                      </span>
                      <span className="font-mono text-emerald-700 font-semibold">Recommended</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('Saturday Morning (10:00 AM – 12:00 PM)')}
                      className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                        selectedSlot === 'Saturday Morning (10:00 AM – 12:00 PM)'
                          ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <span>Saturday Morning (10:00 AM – 12:00 PM)</span>
                      <span className="font-mono text-stone-500">Weekend Meal Prep</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Address & Preferences */}
            <div className="p-3 bg-stone-50 rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-stone-800">42 Highmont Boulevard, #08-14</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-stone-200/60">
                <span className="text-stone-500">Contactless Drop-off:</span>
                <button
                  type="button"
                  onClick={() => setContactless(!contactless)}
                  className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded transition-colors ${
                    contactless ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {contactless ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>

            {/* Price review */}
            <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-stone-600">Total Billed to {grocer.name}:</span>
                <div className="text-[10px] text-emerald-700">Pantry saved: ${pantrySavings.toFixed(2)}</div>
              </div>
              <span className="text-base font-bold text-stone-900">${cartTotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handleConfirmOrder}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Dispatch Order via {grocer.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* State 3: Order Dispatched Successfully */}
        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Order Dispatched & Synced!
              </h4>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Your ingredients have been automatically pushed to <strong className="text-stone-900">{grocer.name}</strong>. The fulfillment center is packing your items.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-bold text-stone-900">#MISE-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Selected Slot:</span>
                <span className="text-stone-800">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Items Ordered:</span>
                <span className="text-stone-800">{itemsCount} Items</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Waste Savings Prevented:</span>
                <span>${pantrySavings.toFixed(2)} saved</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Back to Weekly Meal Planner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
