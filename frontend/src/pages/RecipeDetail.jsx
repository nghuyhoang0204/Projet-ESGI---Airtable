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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header avec navigation */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: '0',
        zIndex: '100'
      }}>
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 2rem' }}>
          <button 
            onClick={() => window.history.back()}
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '12px 24px',
              borderRadius: '50px',
              fontSize: '1.1em',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateX(-5px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            ← Retour
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: 'auto', padding: '3rem 2rem' }}>
        {/* Carte principale de la recette */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          {/* En-tête avec image */}
          <div style={{ position: 'relative' }}>
            {Image && Image[0]?.url && (
              <>
                <img 
                  src={Image[0].url} 
                  alt={Name} 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover'
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '60%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '3rem'
                }}>
                  <h1 style={{ 
                    color: 'white',
                    fontSize: '3.5em',
                    fontWeight: '700',
                    margin: '0',
                    textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    {Name}
                  </h1>
                </div>
              </>
            )}
            
            {(!Image || !Image[0]?.url) && (
              <div style={{ 
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <h1 style={{ 
                  color: 'white',
                  fontSize: '3.5em',
                  fontWeight: '700',
                  margin: '0',
                  textAlign: 'center',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  {Name}
                </h1>
              </div>
            )}
          </div>

          <div style={{ padding: '3rem' }}>
            {/* Informations rapides */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '3rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {Type && (
                <div style={{ 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1.1em',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  <span style={{ fontSize: '1.3em' }}>📋</span>
                  {Type}
                </div>
              )}

              {QpourNbPers && (
                <div style={{ 
                  background: 'linear-gradient(45deg, #ffa726, #ff7043)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1.1em',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(255, 167, 38, 0.3)'
                }}>
                  <span style={{ fontSize: '1.3em' }}>👥</span>
                  {QpourNbPers} personne{QpourNbPers > 1 ? 's' : ''}
                </div>
              )}

              {dietary_restrictions && (
                <div style={{ 
                  background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1.1em',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(231, 76, 60, 0.3)'
                }}>
                  <span style={{ fontSize: '1.3em' }}>⚠️</span>
                  {dietary_restrictions}
                </div>
              )}
            </div>

            {/* Section ingrédients */}
            {ingredient && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                padding: '2.5rem',
                borderRadius: '20px',
                marginBottom: '3rem',
                border: '1px solid #dee2e6'
              }}>
                <h3 style={{ 
                  color: '#2c3e50',
                  fontSize: '2em',
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.5em' }}>🧄</span>
                  Ingrédients
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {(Array.isArray(recipe.ingredient_names) && recipe.ingredient_names.length > 0
                    ? recipe.ingredient_names
                    : ingredient.split(',').map(x => x.trim())
                  ).map((ing, index) => (
                    <div key={index} style={{
                      background: 'white',
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      border: '1px solid #e9ecef',
                      fontSize: '1.1em',
                      fontWeight: '500',
                      color: '#2c3e50'
                    }}>
                      • {ing}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section instructions */}
            {instructions && (
              <div style={{ 
                background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
                padding: '2.5rem',
                borderRadius: '20px',
                marginBottom: '3rem',
                border: '1px solid #ffeaa7'
              }}>
                <h3 style={{ 
                  color: '#856404',
                  fontSize: '2em',
                  marginBottom: '1.5rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '1.5em' }}>📝</span>
                  Instructions
                </h3>
                <div style={{ 
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  fontSize: '1.2em',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-wrap',
                  color: '#2c3e50',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  border: '1px solid #f8f9fa'
                }}>
                  {instructions}
                </div>
              </div>
            )}

            {/* Section analyse nutritionnelle */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e8f5e8, #d4edda)',
              padding: '3rem',
              borderRadius: '20px',
              border: '1px solid #d4edda'
            }}>
              <h2 style={{ 
                color: '#155724',
                fontSize: '2.5em',
                marginBottom: '2rem',
                fontWeight: '600',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
              }}>
                <span style={{ fontSize: '1.2em' }}>📊</span>
                Analyse nutritionnelle
              </h2>
              
              {/* Macronutriments principaux */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '2rem', 
                marginBottom: '2.5rem' 
              }}>
                <div style={{ 
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  border: '1px solid #f8f9fa',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3.5em', marginBottom: '1rem' }}>🔥</div>
                  <div style={{ fontSize: '2.5em', fontWeight: '700', color: '#e74c3c', marginBottom: '0.5rem' }}>
                    {nutrition_calories ?? 'N/A'}
                  </div>
                  <div style={{ fontSize: '1.2em', color: '#7f8c8d', fontWeight: '600' }}>calories</div>
                </div>
                
                <div style={{ 
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  border: '1px solid #f8f9fa',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3.5em', marginBottom: '1rem' }}>💪</div>
                  <div style={{ fontSize: '2.5em', fontWeight: '700', color: '#3498db', marginBottom: '0.5rem' }}>
                    {nutrition_proteins ?? 'N/A'}
                  </div>
                  <div style={{ fontSize: '1.2em', color: '#7f8c8d', fontWeight: '600' }}>g protéines</div>
                </div>
                
                <div style={{ 
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  border: '1px solid #f8f9fa',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3.5em', marginBottom: '1rem' }}>🍞</div>
                  <div style={{ fontSize: '2.5em', fontWeight: '700', color: '#f39c12', marginBottom: '0.5rem' }}>
                    {nutrition_carbs ?? 'N/A'}
                  </div>
                  <div style={{ fontSize: '1.2em', color: '#7f8c8d', fontWeight: '600' }}>g glucides</div>
                </div>
                
                <div style={{ 
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  border: '1px solid #f8f9fa',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3.5em', marginBottom: '1rem' }}>🥑</div>
                  <div style={{ fontSize: '2.5em', fontWeight: '700', color: '#27ae60', marginBottom: '0.5rem' }}>
                    {nutrition_fats ?? 'N/A'}
                  </div>
                  <div style={{ fontSize: '1.2em', color: '#7f8c8d', fontWeight: '600' }}>g lipides</div>
                </div>
              </div>

              {/* Vitamines et minéraux */}
              {(nutrition_vitamins?.trim() || nutrition_minerals?.trim()) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  {nutrition_vitamins && nutrition_vitamins.trim() && (
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '20px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f8f9fa'
                    }}>
                      <h4 style={{ 
                        color: '#8e44ad',
                        fontSize: '1.6em',
                        marginBottom: '1.5rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '1.5em' }}>🍊</span>
                        Vitamines
                      </h4>
                      <div style={{ 
                        fontSize: '1.2em',
                        color: '#2c3e50',
                        lineHeight: '1.6',
                        fontWeight: '500'
                      }}>
                        {nutrition_vitamins.split(',').map((vitamin, index) => (
                          <span key={index} style={{
                            display: 'inline-block',
                            background: '#f8f9fa',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            margin: '0.25rem',
                            fontSize: '1em'
                          }}>
                            {vitamin.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {nutrition_minerals && nutrition_minerals.trim() && (
                    <div style={{ 
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '20px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f8f9fa'
                    }}>
                      <h4 style={{ 
                        color: '#34495e',
                        fontSize: '1.6em',
                        marginBottom: '1.5rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '1.5em' }}>⚡</span>
                        Minéraux
                      </h4>
                      <div style={{ 
                        fontSize: '1.2em',
                        color: '#2c3e50',
                        lineHeight: '1.6',
                        fontWeight: '500'
                      }}>
                        {nutrition_minerals.split(',').map((mineral, index) => (
                          <span key={index} style={{
                            display: 'inline-block',
                            background: '#f8f9fa',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            margin: '0.25rem',
                            fontSize: '1em'
                          }}>
                            {mineral.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
