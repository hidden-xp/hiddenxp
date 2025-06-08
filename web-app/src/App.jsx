import { useState } from 'react';
import { ChefHat, Clock, Users, Star, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const RecipeCard = ({ recipe, isExpanded, onToggle }) => {
return (
<div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl
  hover:scale-105 ${isExpanded ? 'ring-2 ring-indigo-300 shadow-2xl' : '' }`}>
  {/* Card Header with Emoji */}
  <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 p-8 border-b border-indigo-200/50">
    <div className="text-center">
      <div className="text-8xl mb-4 filter drop-shadow-lg">{recipe.emoji}</div>
      <div className="absolute top-4 right-4">
        <button
          className="bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
    </div>

    <div
      className="flex items-center justify-center gap-6 text-gray-700 text-sm bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mx-auto w-fit border border-white/60 shadow-sm">
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{recipe.rating}</span>
      </div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-indigo-600" />
        <span className="font-medium">{recipe.cookTime}</span>
      </div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-indigo-600" />
        <span className="font-medium">{recipe.servings}</span>
      </div>
    </div>
  </div>

  {/* Card Content */}
  <div className="p-8">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
        <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">{recipe.cuisine} •
          {recipe.difficulty}</p>
      </div>
      <div className="flex flex-wrap gap-2 ml-4">
        {recipe.tags.map((tag, index) => (
        <span key={index}
          className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs rounded-full font-medium border border-indigo-200">
          {tag}
        </span>
        ))}
      </div>
    </div>

    <p className="text-gray-700 mb-6 leading-relaxed text-lg">{recipe.description}</p>

    {/* Expand/Collapse Button */}
    <button onClick={onToggle}
      className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
      <span className="mr-3">{isExpanded ? 'Hide Recipe Details' : 'View Full Recipe'}</span>
      {isExpanded ?
      <ChevronUp className="w-5 h-5" /> :
      <ChevronDown className="w-5 h-5" />}
    </button>

    {/* Expanded Content */}
    {isExpanded && (
    <div className="mt-8 space-y-8 animate-in fade-in duration-500">
      {/* Ingredients */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="bg-green-500 rounded-full p-2 mr-3">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          Ingredients
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center bg-white/70 rounded-lg p-3 border border-green-200/50">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-4 flex-shrink-0">
            </div>
            <span className="text-gray-800 font-medium">{ingredient}</span>
          </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="bg-blue-500 rounded-full p-2 mr-3">
            <span className="text-white font-bold text-sm">📝</span>
          </div>
          Instructions
        </h4>
        <div className="space-y-4">
          {recipe.instructions.map((step, index) => (
          <div key={index} className="flex items-start bg-white/70 rounded-xl p-4 border border-blue-200/50">
            <div
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 shadow-lg">
              {index + 1}
            </div>
            <p className="text-gray-800 leading-relaxed font-medium text-base">{step}</p>
          </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {recipe.notes && (
      <div
        className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-r-2xl border border-amber-200">
        <h4 className="text-amber-800 font-bold mb-2 flex items-center text-lg">
          <span className="text-2xl mr-2">💡</span>
          Chef's Notes
        </h4>
        <p className="text-amber-800 leading-relaxed font-medium">{recipe.notes}</p>
      </div>
      )}
    </div>
    )}
  </div>
</div>
);
};

const RecipeApp = () => {
const [expandedCard, setExpandedCard] = useState(null);

const sampleRecipes = [
{
id: 1,
title: "Creamy Tuscan Chicken",
cuisine: "Italian",
difficulty: "Medium",
cookTime: "35 min",
servings: "4 people",
rating: "4.8",
emoji: "🍗",
description: "Tender chicken breast in a rich, creamy sauce with sun-dried tomatoes, spinach, and Italian herbs. Perfect for a cozy dinner that brings the warmth of Tuscany to your table.",
tags: ["Comfort Food", "One-Pan", "Creamy"],
ingredients: [
"4 chicken breasts, sliced thin",
"2 tbsp olive oil",
"3 cloves garlic, minced",
"1 cup heavy cream",
"1⁄2 cup sun-dried tomatoes",
"3 cups fresh spinach",
"1⁄2 cup parmesan cheese",
"Italian seasoning to taste"
],
instructions: [
"Season chicken with salt, pepper, and Italian seasoning. Heat olive oil in a large skillet over medium-high heat.",
"Cook chicken until golden and cooked through, about 6-7 minutes per side. Remove and set aside.",
"In the same skillet, add garlic and cook for 1 minute until fragrant.",
"Pour in heavy cream, add sun-dried tomatoes, and bring to a gentle simmer.",
"Add spinach and cook until wilted. Stir in parmesan cheese until melted.",
"Return chicken to the skillet and simmer for 2-3 minutes to heat through. Serve immediately."
],
notes: "For best results, pound chicken to even thickness before cooking. You can substitute heavy cream with half-and-half for a lighter version."
},
{
id: 2,
title: "Korean BBQ Bowls",
cuisine: "Korean",
difficulty: "Easy",
cookTime: "25 min",
servings: "4 people",
rating: "4.9",
emoji: "🍜",
description: "Fresh and vibrant bowls with marinated beef, crisp vegetables, and spicy gochujang sauce over steamed rice. A perfect balance of flavors and textures that will transport you to Seoul.",
tags: ["Healthy", "Quick", "Spicy"],
ingredients: [
"1 lb thinly sliced ribeye",
"3 tbsp soy sauce",
"2 tbsp brown sugar",
"1 tbsp sesame oil",
"2 cups cooked jasmine rice",
"1 cucumber, julienned",
"2 carrots, julienned",
"2 tbsp gochujang",
"1 tbsp rice vinegar"
],
instructions: [
"Marinate sliced beef in soy sauce, brown sugar, and sesame oil for 15 minutes.",
"Heat a large skillet or wok over high heat. Cook beef in batches until caramelized, about 2-3 minutes per batch.",
"Meanwhile, prepare vegetables and mix gochujang with rice vinegar for sauce.",
"Assemble bowls with rice, beef, and fresh vegetables.",
"Drizzle with gochujang sauce and serve with additional sesame oil if desired."
],
notes: "Freeze the beef for 30 minutes before slicing for easier, thinner cuts. Adjust gochujang to taste preference."
},
{
id: 3,
title: "Lemon Herb Salmon",
cuisine: "Mediterranean",
difficulty: "Easy",
cookTime: "20 min",
servings: "2 people",
rating: "4.7",
emoji: "🐟",
description: "Perfectly flaked salmon with fresh herbs, lemon, and a touch of garlic. Light, healthy, and bursting with Mediterranean flavors that celebrate the bounty of the sea.",
tags: ["Healthy", "Quick", "Keto"],
ingredients: [
"2 salmon fillets (6 oz each)",
"2 lemons, sliced and juiced",
"3 tbsp olive oil",
"2 cloves garlic, minced",
"Fresh dill and parsley",
"Salt and pepper to taste",
"1 tbsp capers (optional)"
],
instructions: [
"Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper.",
"Place salmon fillets on the prepared baking sheet and drizzle with olive oil.",
"Season with salt, pepper, and minced garlic. Top with lemon slices.",
"Bake for 12-15 minutes until salmon flakes easily with a fork.",
"Garnish with fresh herbs, capers, and a squeeze of fresh lemon juice before serving."
],
notes: "Don't overcook the salmon - it should be just opaque and flake easily. Serve with roasted vegetables or a simple salad."
},
{
id: 4,
title: "Classic Margherita Pizza",
cuisine: "Italian",
difficulty: "Medium",
cookTime: "45 min",
servings: "4 people",
rating: "4.9",
emoji: "🍕",
description: "Authentic Neapolitan-style pizza with fresh mozzarella, basil, and San Marzano tomatoes on a perfectly crispy yet chewy crust. Simple ingredients, extraordinary flavor.",
tags: ["Classic", "Vegetarian", "Homemade"],
ingredients: [
"1 pizza dough ball",
"1⁄2 cup San Marzano tomato sauce",
"8 oz fresh mozzarella, torn",
"Fresh basil leaves",
"2 tbsp extra virgin olive oil",
"Sea salt to taste",
"Black pepper to taste"
],
instructions: [
"Preheat oven to 500°F (260°C) with pizza stone if available.",
"Roll out pizza dough on floured surface to 12-inch circle.",
"Spread tomato sauce evenly, leaving 1-inch border for crust.",
"Add torn mozzarella pieces and drizzle with olive oil.",
"Bake for 10-12 minutes until crust is golden and cheese is bubbly.",
"Remove from oven, add fresh basil leaves and season with salt and pepper."
],
notes: "For best results, use a pizza stone preheated for at least 30 minutes. The key is high heat and fresh, quality ingredients."
}
];

const handleCardToggle = (cardId) => {
setExpandedCard(expandedCard === cardId ? null : cardId);
};

return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
  {/* Header */}
  <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-indigo-100 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <ChefHat className="w-10 h-10 text-indigo-500 mr-4" />
            My Recipe Collection
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Discover, create, and save your favorite culinary adventures</p>
        </div>
        <div
          className="text-right bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-indigo-200">
          <p className="text-3xl font-bold text-indigo-600">{sampleRecipes.length}</p>
          <p className="text-sm text-indigo-700 font-medium uppercase tracking-wide">Recipes</p>
        </div>
      </div>
    </div>
  </div>

  {/* Recipe Cards Grid */}
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {sampleRecipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} isExpanded={expandedCard===recipe.id} onToggle={()=>
        handleCardToggle(recipe.id)}
        />
        ))}
    </div>
  </div>
</div>
);
};

export default RecipeApp;