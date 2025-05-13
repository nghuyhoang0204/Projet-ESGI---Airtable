import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      axios.get('http://localhost:3000/api/recipes')
        .then(res => setRecipes(res.data))
        .catch(err => console.error(err));
    } else {
      axios.get(`http://localhost:3000/api/recipes/search?query=${searchQuery}`)
        .then(res => setRecipes(res.data))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🍽️ Liste des Recettes</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par nom, ingrédient ou type de plat..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch();
          }}
        />
      </div>

      <Link to="/new" className="home-link">➕ Créer une nouvelle recette</Link>

      <ul className="recipe-list">
        {recipes
          .filter((r) => r.Image && r.Image.length > 0)
          .map((r) => (
            <li key={r.id} className="recipe-card">
              <Link to={`/recipes/${r.id}`} className="recipe-link">
                <h2>{r.Name || 'Sans nom'}</h2>
                {r.Type && <p><strong>Type :</strong> {r.Type}</p>}
                {r.QpourNbPers && <p><strong>Pour :</strong> {r.QpourNbPers} personne(s)</p>}
                {r.Image?.[0]?.url && (
                  <img className="recipe-image" src={r.Image[0].url} alt={r.Name} />
                )}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;