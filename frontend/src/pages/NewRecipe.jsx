import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/NewRecipe.css';


function NewRecipe() {
  const [ingredients, setIngredients] = useState('');
  const [servings, setServings] = useState(1);
  const [intolerances, setIntolerances] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [savedRecipe, setSavedRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedRecipe('');
    setSavedRecipe(null);
    setNutrition(null);
    setMessage('');
    
    try {
      const res = await axios.post('http://localhost:3000/api/recipes/generate', {
        ingredients: ingredients.split(',').map(i => i.trim()).filter(Boolean),
        servings: Number(servings),
        intolerances: intolerances.split(',').map(i => i.trim()).filter(Boolean),
      });
      
      setGeneratedRecipe(res.data.recipe);
      setSavedRecipe(res.data.savedRecipe);
      setNutrition(res.data.nutrition);
      setMessage(res.data.message);
    } catch (err) {
      console.error('Error generating recipe:', err);
      setGeneratedRecipe('Erreur lors de la génération.');
      setMessage('Erreur lors de la génération de la recette.');
    }
    setLoading(false);
  };

  return (
    <div className="new-recipe-container" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
        🤖 Créer une Nouvelle Recette avec IA
      </h1>
      
      <Link to="/" style={{ 
        display: 'inline-block', 
        marginBottom: '2rem', 
        color: '#3498db', 
        textDecoration: 'none',
        fontSize: '1.1em'
      }}>
        ← Retour à l'accueil
      </Link>

      <form onSubmit={handleGenerate} style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
            🧄 Ingrédients (séparés par des virgules):
          </label>
          <input
            type="text"
            placeholder="Ex: tomates, mozzarella, basilic, huile d'olive"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd', 
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
            👥 Nombre de personnes:
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={servings}
            onChange={e => setServings(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd', 
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
            ⚠️ Intolérances alimentaires (optionnel):
          </label>
          <input
            type="text"
            placeholder="Ex: gluten, lactose, noix"
            value={intolerances}
            onChange={e => setIntolerances(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd', 
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !ingredients.trim()}
          style={{ 
            width: '100%',
            backgroundColor: loading ? '#95a5a6' : '#e74c3c', 
            color: 'white', 
            padding: '15px', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.2em',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#c0392b')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#e74c3c')}
        >
          {loading ? '🔄 Génération en cours...' : '✨ Générer avec IA'}
        </button>
      </form>

      {message && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          border: '1px solid #c3e6cb'
        }}>
          ✅ {message}
        </div>
      )}

      {nutrition && (
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '1.5rem', 
          borderRadius: '10px', 
          marginBottom: '1rem' 
        }}>
          <h3 style={{ color: '#155724', marginBottom: '1rem' }}>📊 Informations nutritionnelles:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>🔥 Calories</strong><br />
              <span style={{ fontSize: '1.5em', color: '#e74c3c' }}>{Math.round(nutrition.calories)}</span> kcal
            </div>
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>💪 Protéines</strong><br />
              <span style={{ fontSize: '1.5em', color: '#3498db' }}>{nutrition.proteins.toFixed(1)}</span> g
            </div>
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>🍞 Glucides</strong><br />
              <span style={{ fontSize: '1.5em', color: '#f39c12' }}>{nutrition.carbs.toFixed(1)}</span> g
            </div>
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>🥑 Lipides</strong><br />
              <span style={{ fontSize: '1.5em', color: '#27ae60' }}>{nutrition.fats.toFixed(1)}</span> g
            </div>
          </div>
          
          {nutrition.vitamins.length > 0 && (
            <div style={{ marginTop: '1rem', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>🍊 Vitamines:</strong> {nutrition.vitamins.join(', ')}
            </div>
          )}
          
          {nutrition.minerals.length > 0 && (
            <div style={{ marginTop: '1rem', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
              <strong>⚡ Minéraux:</strong> {nutrition.minerals.join(', ')}
            </div>
          )}
        </div>
      )}

      {generatedRecipe && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '2rem', 
          borderRadius: '10px', 
          marginBottom: '1rem',
          border: '1px solid #ffeaa7'
        }}>
          <h2 style={{ color: '#856404', marginBottom: '1rem' }}>📝 Recette générée:</h2>
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '1.1em', 
            lineHeight: '1.6',
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            {generatedRecipe}
          </div>
          
          {savedRecipe && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem', color: '#155724' }}>
                ✅ Cette recette a été automatiquement sauvegardée dans votre collection !
              </p>
              <button 
                onClick={() => navigate('/')}
                style={{ 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  padding: '12px 24px', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                📚 Voir toutes les recettes
              </button>
              <button 
                onClick={() => {
                  setIngredients('');
                  setIntolerances('');
                  setGeneratedRecipe('');
                  setSavedRecipe(null);
                  setNutrition(null);
                  setMessage('');
                }}
                style={{ 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  padding: '12px 24px', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '1.1em',
                  cursor: 'pointer'
                }}
              >
                🔄 Créer une nouvelle recette
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default NewRecipe;