# Mise — Weekly Meal Planner & Grocer Cart Engine

> **Take the mental load off weekly home cooking.**
> An intelligent weekly meal planning and grocery cart automation platform that consolidates recipe ingredients into standardized units, checks active kitchen pantry inventory to prevent duplicate buying and food waste, and automates 1-click checkout with leading grocery partners.

---

## 🌟 Key Features

### 1. Household Profile & Mental Load Relief
- **Customizable Household Setup**: Tailor meal plans by household size (1 to 6+ pax), days to cook (3, 5, or 7 days), and weekly budget ($50–$250).
- **Dietary Precision**: Support for High-Protein, Vegetarian, Gluten-Free, Dairy-Free, Low-Carb/Keto, and Halal-friendly diets.

### 2. Standardized AI Recipe Parsing
- **Instant Ingredient Normalization**: Upload or paste recipe text or food creator recipes; AI parses ingredients into standardized units (`g`, `ml`, `pcs`, `bunches`, `cans`).
- **Shared Staples Engine**: Identifies overlapping ingredients across the week (e.g. herbs, aromatics, cooking fats) to buy only what's needed.

### 3. Integrated Grocer & Delivery Network
- **Scheduled Delivery (Weekly Routine)**: Direct cart integration with **RedMart (Lazada)**, **FairPrice Online**, and **Amazon Fresh**.
- **Instant Express Delivery (Tonight Cravings / Ad-Hoc)**: Rapid 20–35 min fulfillment via **GrabMart** and **FoodPanda (Pandamart)**.
- **1-Click Cart Automation**: Synchronizes aggregated ingredients directly to partner grocery carts with automated delivery slot reservation.

### 4. Zero Food Waste & Pantry Inventory Tracker
- **Pantry Deduplication**: Checks active kitchen inventory to deduct items you already own (olive oil, soy sauce, rice, garlic) from the final buy list.
- **Waste Metrics**: Real-time tracking of food waste prevented (kg) and duplicate cart savings ($).
- **Expiry Alerts**: Flags items expiring within 5 days and prioritizes them in weekly dinner plans.

### 5. Interactive Business Model Canvas
- Built directly from the 9-block Business Model Canvas covering Key Partners, Key Activities, Key Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, Revenue Streams, and Key Resources.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons & Motion**: Lucide React + Motion
- **AI Integration**: Google Gen AI SDK (`@google/genai`)

---

## 💻 Getting Started

### Prerequisites
- Node.js 20+
- npm or bun

### Installation
```bash
git clone https://github.com/siewhongch/Meal-Planner.git
cd Meal-Planner
npm install
npm run dev
```

Visit `http://localhost:3000` to run the application.

---

## 📄 License
Apache-2.0
