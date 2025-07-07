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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 2rem' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.2em',
              fontWeight: '500',
              marginBottom: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateX(-5px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateX(0)'}
          >
            ← Retour à l'accueil
          </Link>
          
          <h1 style={{ 
            fontSize: '3.5em', 
            fontWeight: '700',
            background: 'linear-gradient(45deg, #fff, #f8f9fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0',
            fontFamily: '"Poppins", sans-serif'
          }}>
            🤖 Générateur de Recettes IA
          </h1>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: 'auto', padding: '3rem 2rem' }}>
        {/* Formulaire principal avec glassmorphism */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleGenerate}>
            {/* Ingrédients */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '1rem', 
                fontSize: '1.3em',
                fontWeight: '600', 
                color: 'white',
                fontFamily: '"Inter", sans-serif'
              }}>
                🧄 Ingrédients disponibles
              </label>
              <textarea
                placeholder="Ex: tomates cerises, mozzarella di bufala, basilic frais, huile d'olive extra-vierge, vinaigre balsamique..."
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                rows={4}
                style={{ 
                  width: '100%', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: 'none', 
                  fontSize: '1.1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: '"Inter", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
                required
              />
            </div>

            {/* Nombre de personnes */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '1rem', 
                fontSize: '1.3em',
                fontWeight: '600', 
                color: 'white',
                fontFamily: '"Inter", sans-serif'
              }}>
                👥 Nombre de convives
              </label>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={servings}
                  onChange={e => setServings(e.target.value)}
                  style={{ 
                    flex: 1,
                    height: '8px',
                    borderRadius: '4px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '15px 25px',
                  borderRadius: '50px',
                  fontSize: '1.3em',
                  fontWeight: '600',
                  color: '#2c3e50',
                  minWidth: '80px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                  {servings}
                </div>
              </div>
            </div>

            {/* Intolérances */}
            <div style={{ marginBottom: '3rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '1rem', 
                fontSize: '1.3em',
                fontWeight: '600', 
                color: 'white',
                fontFamily: '"Inter", sans-serif'
              }}>
                ⚠️ Restrictions alimentaires (optionnel)
              </label>
              <input
                type="text"
                placeholder="Ex: sans gluten, végan, sans lactose, sans fruits à coque..."
                value={intolerances}
                onChange={e => setIntolerances(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  border: 'none', 
                  fontSize: '1.1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  fontFamily: '"Inter", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
              />
            </div>

            {/* Bouton de génération */}
            <button 
              type="submit" 
              disabled={loading || !ingredients.trim()}
              style={{ 
                width: '100%',
                padding: '20px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1.4em',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.4s ease',
                fontFamily: '"Inter", sans-serif',
                background: loading 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                color: 'white',
                boxShadow: loading 
                  ? 'none' 
                  : '0 8px 30px rgba(255, 107, 107, 0.4)',
                opacity: loading ? 0.6 : 1
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-3px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? (
                <span>
                  <span style={{ 
                    display: 'inline-block', 
                    animation: 'spin 1s linear infinite',
                    marginRight: '10px'
                  }}>🔄</span>
                  Création en cours...
                </span>
              ) : (
                <span>
                  <span style={{ marginRight: '10px' }}>✨</span>
                  Créer ma recette personnalisée
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Message de succès */}
        {message && (
          <div style={{ 
            background: 'rgba(76, 175, 80, 0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '2rem',
            borderRadius: '20px',
            marginBottom: '2rem',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            fontSize: '1.2em',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            ✅ {message}
          </div>
        )}

        {/* Informations nutritionnelles */}
        {nutrition && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ 
              color: 'white',
              fontSize: '1.8em',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              📊 Analyse nutritionnelle
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '1.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>🔥</div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#e74c3c' }}>
                  {Math.round(nutrition.calories)}
                </div>
                <div style={{ fontSize: '1.1em', color: '#7f8c8d', fontWeight: '600' }}>calories</div>
              </div>
              
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '1.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>💪</div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#3498db' }}>
                  {nutrition.proteins.toFixed(1)}g
                </div>
                <div style={{ fontSize: '1.1em', color: '#7f8c8d', fontWeight: '600' }}>protéines</div>
              </div>
              
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '1.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>🍞</div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#f39c12' }}>
                  {nutrition.carbs.toFixed(1)}g
                </div>
                <div style={{ fontSize: '1.1em', color: '#7f8c8d', fontWeight: '600' }}>glucides</div>
              </div>
              
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '1.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>🥑</div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#27ae60' }}>
                  {nutrition.fats.toFixed(1)}g
                </div>
                <div style={{ fontSize: '1.1em', color: '#7f8c8d', fontWeight: '600' }}>lipides</div>
              </div>
            </div>
            
            {(nutrition.vitamins.length > 0 || nutrition.minerals.length > 0) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {nutrition.vitamins.length > 0 && (
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '1.5rem',
                    borderRadius: '16px'
                  }}>
                    <h4 style={{ fontSize: '1.3em', color: '#8e44ad', marginBottom: '1rem' }}>
                      🍊 Vitamines
                    </h4>
                    <p style={{ margin: '0', color: '#2c3e50', lineHeight: '1.6' }}>
                      {nutrition.vitamins.join(', ')}
                    </p>
                  </div>
                )}
                
                {nutrition.minerals.length > 0 && (
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '1.5rem',
                    borderRadius: '16px'
                  }}>
                    <h4 style={{ fontSize: '1.3em', color: '#34495e', marginBottom: '1rem' }}>
                      ⚡ Minéraux
                    </h4>
                    <p style={{ margin: '0', color: '#2c3e50', lineHeight: '1.6' }}>
                      {nutrition.minerals.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Recette générée */}
        {generatedRecipe && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              color: '#2c3e50',
              fontSize: '2.2em',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600',
              fontFamily: '"Poppins", sans-serif'
            }}>
              📝 Votre recette personnalisée
            </h2>
            
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '1.2em', 
              lineHeight: '1.8',
              color: '#2c3e50',
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #e9ecef',
              fontFamily: '"Inter", sans-serif'
            }}>
              {generatedRecipe}
            </div>
            
            {savedRecipe && (
              <div style={{ 
                marginTop: '3rem', 
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                borderRadius: '20px',
                color: 'white'
              }}>
                <div style={{ fontSize: '3em', marginBottom: '1rem' }}>🎉</div>
                <p style={{ 
                  fontSize: '1.4em', 
                  marginBottom: '2rem',
                  fontWeight: '600'
                }}>
                  Félicitations ! Votre recette a été sauvegardée avec succès !
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => navigate('/')}
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      padding: '15px 30px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '50px',
                      fontSize: '1.2em',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    📚 Voir toutes mes recettes
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
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      padding: '15px 30px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '50px',
                      fontSize: '1.2em',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    🔄 Créer une nouvelle recette
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}


export default NewRecipe;