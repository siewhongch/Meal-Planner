import React, { useState } from 'react';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_WEEKLY_PLAN, 
  RECIPE_CATALOG, 
  GROCER_PARTNERS, 
  INITIAL_PANTRY 
} from './data/mockData';
import { UserProfile, ScheduledMeal, Recipe, PantryItem } from './types/mealPlanner';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MealPlannerView } from './components/MealPlannerView';
import { SmartCartView } from './components/SmartCartView';
import { PantryWasteTracker } from './components/PantryWasteTracker';
import { GrocerPartnersView } from './components/GrocerPartnersView';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { RecipeUploadModal } from './components/RecipeUploadModal';
import { CheckoutDispatchModal } from './components/CheckoutDispatchModal';
import { BusinessModelCanvasModal } from './components/BusinessModelCanvasModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'cart' | 'pantry' | 'partners' | 'canvas'>('planner');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [meals, setMeals] = useState<ScheduledMeal[]>(INITIAL_WEEKLY_PLAN);
  const [catalog, setCatalog] = useState<Recipe[]>(RECIPE_CATALOG);
  const [pantry, setPantry] = useState<PantryItem[]>(INITIAL_PANTRY);
  const [selectedGrocerId, setSelectedGrocerId] = useState<string>('redmart');

  // Modals
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);

  // Profile update handler
  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  // Generate / Regenerate plan based on profile
  const handleGeneratePlan = () => {
    // Filter recipes respecting dietary restrictions if any
    const days: ScheduledMeal['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const activeDays = days.slice(0, profile.daysToCook);

    const filtered = catalog.filter(r => {
      if (profile.dietaryRestrictions.includes('Vegetarian')) {
        return r.allergens.length === 0 || !r.ingredients.some(i => i.department === 'Meat & Seafood');
      }
      if (profile.dietaryRestrictions.includes('Gluten-Free')) {
        return !r.allergens.includes('Gluten');
      }
      return true;
    });

    const pool = filtered.length >= activeDays.length ? filtered : catalog;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    const newMeals: ScheduledMeal[] = activeDays.map((day, idx) => ({
      id: `meal-${day.toLowerCase()}-${Date.now()}-${idx}`,
      day,
      mealType: 'Dinner',
      recipe: shuffled[idx % shuffled.length],
    }));

    setMeals(newMeals);
  };

  // Swap recipe on a specific meal
  const handleSwapMeal = (mealId: string, newRecipe: Recipe) => {
    setMeals(prev => prev.map(m => m.id === mealId ? { ...m, recipe: newRecipe } : m));
  };

  // Add custom or parsed recipe
  const handleAddRecipeToPlan = (newRecipe: Recipe) => {
    setCatalog(prev => [newRecipe, ...prev]);
    // Replace the last meal or append
    setMeals(prev => {
      const copy = [...prev];
      if (copy.length > 0) {
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          recipe: newRecipe,
        };
      }
      return copy;
    });
  };

  // Instant order tonight's recipe via GrabMart / FoodPanda
  const handleInstantOrder = (recipe: Recipe) => {
    setSelectedGrocerId('grabmart');
    setActiveTab('cart');
  };

  // Pantry handlers
  const handleAddPantryItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem: PantryItem = {
      ...item,
      id: `pantry-${Date.now()}`,
    };
    setPantry(prev => [newItem, ...prev]);
  };

  const handleRemovePantryItem = (id: string) => {
    setPantry(prev => prev.filter(p => p.id !== id));
  };

  const handleCookExpiring = () => {
    // Shuffle in a recipe that uses produce
    setActiveTab('planner');
  };

  // Calculate cart metrics
  const activeGrocer = GROCER_PARTNERS.find(g => g.id === selectedGrocerId) || GROCER_PARTNERS[0];
  
  // Total items in cart
  const totalCartItemsCount = meals.reduce((sum, m) => sum + m.recipe.ingredients.length, 0);

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartItemCount={totalCartItemsCount}
        onOpenQuickCart={() => setActiveTab('cart')}
        onOpenCanvas={() => setIsCanvasModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section displayed on planner tab */}
        {activeTab === 'planner' && (
          <HeroBanner
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onGeneratePlan={handleGeneratePlan}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {/* Tab 1: Weekly Planner */}
        {activeTab === 'planner' && (
          <MealPlannerView
            meals={meals}
            recipes={catalog}
            onSwapMeal={handleSwapMeal}
            onOpenRecipeDetail={setSelectedRecipeDetail}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onInstantOrder={handleInstantOrder}
            pax={profile.pax}
          />
        )}

        {/* Tab 2: Smart Cart & Grocer Fulfillment */}
        {activeTab === 'cart' && (
          <SmartCartView
            meals={meals}
            grocers={GROCER_PARTNERS}
            selectedGrocerId={selectedGrocerId}
            onSelectGrocer={setSelectedGrocerId}
            pantryItems={pantry}
            weeklyBudget={profile.weeklyBudget}
            pax={profile.pax}
            onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
          />
        )}

        {/* Tab 3: Pantry & Zero Waste Tracker */}
        {activeTab === 'pantry' && (
          <PantryWasteTracker
            pantryItems={pantry}
            onAddPantryItem={handleAddPantryItem}
            onRemovePantryItem={handleRemovePantryItem}
            onCookExpiring={handleCookExpiring}
          />
        )}

        {/* Tab 4: Grocer Partner Ecosystem */}
        {activeTab === 'partners' && (
          <GrocerPartnersView
            grocers={GROCER_PARTNERS}
            selectedGrocerId={selectedGrocerId}
            onSelectGrocer={setSelectedGrocerId}
            onProceedToCart={() => setActiveTab('cart')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenCanvas={() => setIsCanvasModalOpen(true)}
      />

      {/* Modals */}
      <RecipeDetailModal
        recipe={selectedRecipeDetail}
        onClose={() => setSelectedRecipeDetail(null)}
        pax={profile.pax}
      />

      <RecipeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddRecipeToPlan={handleAddRecipeToPlan}
      />

      <CheckoutDispatchModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        grocer={activeGrocer}
        cartTotal={84.50}
        itemsCount={totalCartItemsCount}
        pantrySavings={18.40}
      />

      <BusinessModelCanvasModal
        isOpen={isCanvasModalOpen}
        onClose={() => setIsCanvasModalOpen(false)}
        onNavigateToSection={(sec) => setActiveTab(sec)}
      />
    </div>
  );
}
