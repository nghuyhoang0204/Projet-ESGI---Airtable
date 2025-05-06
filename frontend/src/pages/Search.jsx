import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/recipes/search?query=${query}`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(recipe => (
          <li key={recipe.id}>{recipe.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;