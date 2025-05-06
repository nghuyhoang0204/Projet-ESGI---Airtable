import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">🍽️ Liste des Recettes</h1>
  
      <Link to="/new" className="home-link">➕ Créer une nouvelle recette</Link>

      <ul className="recipe-list">
        {recipes
          .filter((r) => r.Image && r.Image.length > 0)
          .map((r) => (
            <li key={r.id} className="recipe-card">
              <h2>{r.Name || 'Sans nom'}</h2>
              {r.Type && <p><strong>Type :</strong> {r.Type}</p>}
              {r.QpourNbPers && <p><strong>Pour :</strong> {r.QpourNbPers} personne(s)</p>}
              {r.url && (
                <p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    Voir la recette originale
                  </a>
                </p>
              )}
              {r.Image?.[0]?.url && (
                <img className="recipe-image" src={r.Image[0].url} alt={r.Name} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
