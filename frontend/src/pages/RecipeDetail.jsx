import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/RecipeDetail.css';
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
    instructions,
    Type,
    QpourNbPers,
    dietary_restrictions,
    nutrition_calories,
    nutrition_proteins,
    nutrition_carbs,
    nutrition_fats,
    nutrition_vitamins,
    nutrition_minerals,
    Image
  } = recipe;

  return (
    <div className="recipe-detail-container" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #e74c3c', paddingBottom: '10px' }}>
        🍽️ {Name}
      </h1>

      {Type && (
        <p style={{ fontSize: '1.1em', color: '#7f8c8d', marginBottom: '1rem' }}>
          <strong>📋 Type:</strong> {Type}
        </p>
      )}

      {QpourNbPers && (
        <p style={{ fontSize: '1.1em', color: '#7f8c8d', marginBottom: '1rem' }}>
          <strong>👥 Portions:</strong> {QpourNbPers} personne(s)
        </p>
      )}

      {Image && Image[0]?.url && (
        <img 
          src={Image[0].url} 
          alt={Name} 
          style={{ 
            width: '100%', 
            maxWidth: '400px', 
            height: 'auto', 
            borderRadius: '10px',
            margin: '1rem 0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }} 
        />
      )}

      {ingredient && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>🧄 Ingrédients:</h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            {Array.isArray(recipe.ingredient_names) && recipe.ingredient_names.length > 0
              ? recipe.ingredient_names.join(', ')
              : ingredient}
          </p>
        </div>
      )}

      {instructions && (
        <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>📝 Instructions:</h3>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {instructions}
          </p>
        </div>
      )}

      {dietary_restrictions && (
        <div style={{ backgroundColor: '#d1ecf1', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#0c5460', marginBottom: '10px' }}>⚠️ Restrictions alimentaires:</h3>
          <p style={{ fontSize: '1.1em' }}>{dietary_restrictions}</p>
        </div>
      )}

      <div style={{ backgroundColor: '#e8f5e8', padding: '1.5rem', borderRadius: '10px', marginTop: '2rem' }}>
        <h2 style={{ color: '#155724', marginBottom: '1rem' }}>📊 Analyse nutritionnelle</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '1rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>🔥</div>
            <strong>Calories</strong><br />
            <span style={{ fontSize: '1.5em', color: '#e74c3c' }}>{nutrition_calories ?? 'N/A'}</span> kcal
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>💪</div>
            <strong>Protéines</strong><br />
            <span style={{ fontSize: '1.5em', color: '#3498db' }}>{nutrition_proteins ?? 'N/A'}</span> g
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>🍞</div>
            <strong>Glucides</strong><br />
            <span style={{ fontSize: '1.5em', color: '#f39c12' }}>{nutrition_carbs ?? 'N/A'}</span> g
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>🥑</div>
            <strong>Lipides</strong><br />
            <span style={{ fontSize: '1.5em', color: '#27ae60' }}>{nutrition_fats ?? 'N/A'}</span> g
          </div>
        </div>

        {nutrition_vitamines && nutrition_vitamines.trim() && (
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#8e44ad', marginBottom: '10px' }}>🍊 Vitamines:</h4>
            <p style={{ fontSize: '1.1em' }}>{nutrition_vitamines}</p>
          </div>
        )}

        {nutrition_minerals && nutrition_minerals.trim() && (
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>⚡ Minéraux:</h4>
            <p style={{ fontSize: '1.1em' }}>{nutrition_minerals}</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            backgroundColor: '#3498db', 
            color: 'white', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          ← Retour
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
