import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Recettes</h1>
      <Link to="/new">Créer une recette</Link>
      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <strong>{r.Nom || 'Sans nom'}</strong> - {r['Type de plat'] || ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
