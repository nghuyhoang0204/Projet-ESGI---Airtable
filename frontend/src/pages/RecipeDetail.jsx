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

  if (!recipe) return <div>Chargement...</div>;

  // On vérifie que les champs nutrition sont bien là
  const {
    Name,
    ingredient,
    nutrition_calories,
    nutrition_proteins,
    nutrition_carbs,
    nutrition_fats,
  } = recipe;

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>{Name}</h1>

      {ingredient && (
        <p><strong>🧄 Ingrédients:</strong> {Array.isArray(recipe.ingredient_names) && recipe.ingredient_names.length > 0
          ? recipe.ingredient_names.join(', ')
          : 'Aucun'}
        </p>
      )}

      <h2 style={{ marginTop: '2rem' }}>Analyse nutritionnelle</h2>
      <ul>
        <li><strong>Calories :</strong> {nutrition_calories ?? 'N/A'} kcal</li>
        <li><strong>Protéines :</strong> {nutrition_proteins ?? 'N/A'} g</li>
        <li><strong>Glucides :</strong> {nutrition_carbs ?? 'N/A'} g</li>
        <li><strong>Lipides :</strong> {nutrition_fats ?? 'N/A'} g</li>

      </ul>
    </div>
  );
}

export default RecipeDetails;
