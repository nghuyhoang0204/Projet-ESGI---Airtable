import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/NewRecipe.css';


function NewRecipe() {
  const [ingredients, setIngredients] = useState('');
  const [servings, setServings] = useState(1);
  const [intolerances, setIntolerances] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedRecipe('');
    try {
      const res = await axios.post('http://localhost:3000/api/recipes/generate', {
        ingredients: ingredients.split(',').map(i => i.trim()).filter(Boolean),
        servings: Number(servings),
        intolerances: intolerances.split(',').map(i => i.trim()).filter(Boolean),
      });
      setGeneratedRecipe(res.data.recipe);
    } catch (err) {
      setGeneratedRecipe('Erreur lors de la génération.');
    }
    setLoading(false);
  };

  return (
    <div className="new-recipe-container">
      <h1>Créer une Nouvelle Recette (IA)</h1>
      <form onSubmit={handleGenerate}>
        <input
          placeholder="Ingrédients (séparés par des virgules)"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        /><br />
        <input
          type="number"
          min="1"
          placeholder="Nombre de personnes"
          value={servings}
          onChange={e => setServings(e.target.value)}
        /><br />
        <input
          placeholder="Intolérances alimentaires (séparées par des virgules)"
          value={intolerances}
          onChange={e => setIntolerances(e.target.value)}
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Génération...' : 'Générer avec IA'}
        </button>
      </form>
      {generatedRecipe && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h2>Recette générée :</h2>
          <p>{generatedRecipe}</p>
        </div>
      )}
    </div>
  );
}


export default NewRecipe;