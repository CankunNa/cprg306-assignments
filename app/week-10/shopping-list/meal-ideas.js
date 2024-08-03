"use client";
import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  };

  const fetchMealDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
  };

  const loadMealIdeas = async () => {
    setLoading(true);
    if (ingredient) {
      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas || []);
    }
    setLoading(false);
  };

  const handleMealClick = async (mealId) => {
    const mealDetails = await fetchMealDetails(mealId);
    setSelectedMeal(mealDetails);
  };

  useEffect(() => {
    setSelectedMeal(null);  // Reset selected meal when ingredient changes
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="meal-ideas p-4 bg-slate-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Meal Ideas</h2>
      {loading ? (
        <p>Loading...</p>
      ) : meals.length > 0 ? (
        <div>
          <p>Here are some meal ideas using {ingredient}:</p>
          <ul className="space-y-4">
            {meals.map(meal => (
              <li 
                key={meal.idMeal} 
                className={`p-2 m-4 bg-slate-900 max-w-sm hover:bg-orange-800 cursor-pointer ${selectedMeal && selectedMeal.idMeal === meal.idMeal ? 'bg-orange-800' : ''}`} 
                onClick={() => handleMealClick(meal.idMeal)}
              >
                <h3 className="text-lg font-bold">{meal.strMeal}</h3>
                {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
                  <div>
                    <h4 className="mt-2">Ingredients needed:</h4>
                    <ul className="list-disc list-inside">
                      {Array.from({ length: 20 }, (_, i) => i + 1)
                        .map(i => selectedMeal[`strIngredient${i}`] && (
                          <li key={i}>{selectedMeal[`strIngredient${i}`]} ({selectedMeal[`strMeasure${i}`]})</li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No meal ideas found for {ingredient}.</p>
      )}
    </div>
  );
};

export default MealIdeas;
