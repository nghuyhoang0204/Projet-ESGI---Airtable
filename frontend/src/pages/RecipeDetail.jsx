import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.Name}</h1>
      <p><strong>Ingrédients:</strong> {recipe.ingredient}</p>
      <h2>Analyse nutritionnelle</h2>
      <p>Calories: {recipe.nutrition.calories}</p>
      <p>Protéines: {recipe.nutrition.proteins}g</p>
      <p>Glucides: {recipe.nutrition.carbs}g</p>
      <p>Lipides: {recipe.nutrition.fats}g</p>
    </div>
  );
}

export default RecipeDetails;