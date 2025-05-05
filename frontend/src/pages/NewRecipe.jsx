import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewRecipe() {
  const [form, setForm] = useState({ Nom: '', Ingrédients: '', 'Type de plat': '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/recipes', form);
    navigate('/');
  };

  return (
    <div>
      <h1>Créer une nouvelle recette</h1>
      <form onSubmit={handleSubmit}>
        <input name="Nom" placeholder="Nom" onChange={handleChange} /><br />
        <input name="Ingrédients" placeholder="Ingrédients" onChange={handleChange} /><br />
        <input name="Type de plat" placeholder="Type de plat" onChange={handleChange} /><br />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default NewRecipe;
