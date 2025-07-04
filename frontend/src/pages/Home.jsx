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
    <div className="home-container" style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '3em', 
          color: '#2c3e50', 
          marginBottom: '0.5rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          🍽️ Collection de Recettes
        </h1>
        <p style={{ fontSize: '1.2em', color: '#7f8c8d' }}>
          Découvrez et créez de délicieuses recettes avec analyse nutritionnelle
        </p>
      </header>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem', 
        marginBottom: '2rem',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '15px'
      }}>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '600px' }}>
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
              flex: 1,
              padding: '15px 20px', 
              borderRadius: '25px', 
              border: '2px solid #ddd', 
              fontSize: '1.1em',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button 
            onClick={handleSearch}
            style={{ 
              padding: '15px 25px', 
              backgroundColor: '#3498db', 
              color: 'white', 
              border: 'none', 
              borderRadius: '25px',
              fontSize: '1.1em',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Rechercher
          </button>
        </div>
        
        <Link 
          to="/new" 
          style={{ 
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#e74c3c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c0392b';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#e74c3c';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ✨ Créer une nouvelle recette avec IA
        </Link>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          textAlign: 'center',
          border: '1px solid #f5c6cb'
        }}>
          ❌ {error}
        </div>
      )}

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          fontSize: '1.5em',
          color: '#7f8c8d'
        }}>
          <div style={{ marginBottom: '1rem' }}>⏳</div>
          Chargement des recettes...
        </div>
      ) : (
        <>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            fontSize: '1.2em', 
            color: '#2c3e50' 
          }}>
            {recipes.length === 0 ? (
              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '3em', marginBottom: '1rem' }}>🤷‍♂️</div>
                <p>Aucune recette trouvée.</p>
                {searchQuery && (
                  <p style={{ color: '#7f8c8d' }}>
                    Essayez avec d'autres mots-clés ou{' '}
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        handleSearch();
                      }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#3498db', 
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: 'inherit'
                      }}
                    >
                      affichez toutes les recettes
                    </button>
                  </p>
                )}
              </div>
            ) : (
              <p>
                📚 {recipes.length} recette{recipes.length > 1 ? 's' : ''} trouvée{recipes.length > 1 ? 's' : ''}
                {searchQuery && ` pour "${searchQuery}"`}
              </p>
            )}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {recipes
              .filter((r) => r.Image && r.Image.length > 0)
              .map((r) => (
                <div key={r.id} style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                >
                  <Link 
                    to={`/recipes/${r.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {r.Image?.[0]?.url && (
                      <img 
                        src={r.Image[0].url} 
                        alt={r.Name} 
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover' 
                        }} 
                      />
                    )}
                    <div style={{ padding: '1.5rem' }}>
                      <h2 style={{ 
                        margin: '0 0 1rem 0', 
                        color: '#2c3e50',
                        fontSize: '1.4em',
                        fontWeight: 'bold'
                      }}>
                        {r.Name || 'Sans nom'}
                      </h2>
                      
                      {r.Type && (
                        <p style={{ 
                          margin: '0.5rem 0', 
                          color: '#7f8c8d',
                          fontSize: '1em'
                        }}>
                          <strong>📋 Type:</strong> {r.Type}
                        </p>
                      )}
                      
                      {r.QpourNbPers && (
                        <p style={{ 
                          margin: '0.5rem 0', 
                          color: '#7f8c8d',
                          fontSize: '1em'
                        }}>
                          <strong>👥 Pour:</strong> {r.QpourNbPers} personne(s)
                        </p>
                      )}

                      {r.nutrition_calories && (
                        <div style={{ 
                          marginTop: '1rem',
                          padding: '0.5rem',
                          backgroundColor: '#e8f5e8',
                          borderRadius: '8px',
                          fontSize: '0.9em'
                        }}>
                          <strong>🔥 {r.nutrition_calories} kcal</strong>
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
  );
}

export default Home;