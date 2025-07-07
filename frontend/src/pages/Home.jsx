import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/api/recipes')
      .then(res => {
        setRecipes(res.data);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Erreur lors du chargement des recettes.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setLoading(true);
      axios.get('http://localhost:3000/api/recipes')
        .then(res => {
          setRecipes(res.data);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Erreur lors du chargement des recettes.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      axios.get(`http://localhost:3000/api/recipes/search?query=${searchQuery}`)
        .then(res => {
          setRecipes(res.data);
          setError('');
        })
        .catch(err => {
          console.error(err);
          setError('Erreur lors de la recherche.');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      {/* Header avec effet glassmorphism */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 2rem' }}>
          <h1 style={{ 
            fontSize: '4em', 
            fontWeight: '700',
            background: 'linear-gradient(45deg, #fff, #f8f9fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: '"Poppins", sans-serif'
          }}>
            🍽️ ChefAI Collection
          </h1>
          <p style={{ 
            fontSize: '1.4em', 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '300',
            margin: '0'
          }}>
            Découvrez et créez de délicieuses recettes avec l'intelligence artificielle
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '3rem 2rem' }}>
        {/* Section de recherche avec glassmorphism */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '2.5rem',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.5rem'
          }}>
            {/* Barre de recherche moderne */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              width: '100%', 
              maxWidth: '700px',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="🔍 Rechercher par nom, ingrédient ou type de plat..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value === '') handleSearch();
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ 
                    width: '100%',
                    padding: '18px 25px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '1.1em',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Inter", sans-serif'
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
              <button 
                onClick={handleSearch}
                style={{ 
                  padding: '18px 35px',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1em',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  fontFamily: '"Inter", sans-serif'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                }}
              >
                Rechercher
              </button>
            </div>
            
            {/* Bouton CTA principal */}
            <Link 
              to="/new" 
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '20px 40px',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '1.3em',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                boxShadow: '0 6px 30px rgba(255, 107, 107, 0.4)',
                fontFamily: '"Inter", sans-serif'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 10px 40px rgba(255, 107, 107, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 30px rgba(255, 107, 107, 0.4)';
              }}
            >
              <span style={{ fontSize: '1.5em' }}>🤖</span>
              Créer une recette avec IA
            </Link>
          </div>
        </div>

        {/* Messages d'erreur stylés */}
        {error && (
          <div style={{ 
            background: 'rgba(255, 99, 99, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 99, 99, 0.3)',
            fontSize: '1.1em'
          }}>
            ❌ {error}
          </div>
        )}

        {/* État de chargement animé */}
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            color: 'white'
          }}>
            <div style={{ 
              fontSize: '4em', 
              marginBottom: '1rem',
              animation: 'spin 2s linear infinite'
            }}>🍳</div>
            <p style={{ fontSize: '1.5em', fontWeight: '300' }}>
              Chargement des recettes...
            </p>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <>
            {/* Compteur de recettes */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '3rem',
              color: 'white'
            }}>
              {recipes.length === 0 ? (
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '3rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ fontSize: '4em', marginBottom: '1rem' }}>🤷‍♂️</div>
                  <h2 style={{ fontSize: '1.8em', marginBottom: '1rem', fontWeight: '300' }}>
                    Aucune recette trouvée
                  </h2>
                  {searchQuery && (
                    <p style={{ fontSize: '1.2em', opacity: '0.8' }}>
                      Essayez avec d'autres mots-clés ou{' '}
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          handleSearch();
                        }}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#fff', 
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: 'inherit',
                          fontWeight: '600'
                        }}
                      >
                        affichez toutes les recettes
                      </button>
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <p style={{ 
                    fontSize: '1.3em', 
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    📚 {recipes.length} recette{recipes.length > 1 ? 's' : ''} trouvée{recipes.length > 1 ? 's' : ''}
                    {searchQuery && ` pour "${searchQuery}"`}
                  </p>
                </div>
              )}
            </div>

            {/* Grille de recettes avec design card moderne */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              {recipes
                .filter((r) => r.Image && r.Image.length > 0)
                .map((r) => (
                  <div key={r.id} style={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    <Link 
                      to={`/recipes/${r.id}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{ position: 'relative' }}>
                        {r.Image?.[0]?.url && (
                          <img 
                            src={r.Image[0].url} 
                            alt={r.Name} 
                            style={{ 
                              width: '100%', 
                              height: '240px', 
                              objectFit: 'cover'
                            }} 
                          />
                        )}
                        {/* Overlay gradient */}
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          height: '50%',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                          pointerEvents: 'none'
                        }}></div>
                      </div>
                      
                      <div style={{ padding: '2rem' }}>
                        <h2 style={{ 
                          margin: '0 0 1rem 0', 
                          color: '#2c3e50',
                          fontSize: '1.6em',
                          fontWeight: '600',
                          fontFamily: '"Poppins", sans-serif',
                          lineHeight: '1.3'
                        }}>
                          {r.Name || 'Sans nom'}
                        </h2>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                          {r.Type && (
                            <span style={{ 
                              display: 'inline-block',
                              background: 'linear-gradient(45deg, #667eea, #764ba2)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '20px',
                              fontSize: '0.9em',
                              fontWeight: '500',
                              marginRight: '0.5rem',
                              marginBottom: '0.5rem'
                            }}>
                              📋 {r.Type}
                            </span>
                          )}
                          
                          {r.QpourNbPers && (
                            <span style={{ 
                              display: 'inline-block',
                              background: 'linear-gradient(45deg, #ffa726, #ff7043)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '20px',
                              fontSize: '0.9em',
                              fontWeight: '500',
                              marginBottom: '0.5rem'
                            }}>
                              👥 {r.QpourNbPers} pers.
                            </span>
                          )}
                        </div>

                        {r.nutrition_calories && (
                          <div style={{ 
                            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '16px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: '1.1em'
                          }}>
                            🔥 {r.nutrition_calories} kcal
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;