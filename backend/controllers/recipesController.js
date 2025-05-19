const airtableService = require('../services/airtableService');
const { generateRecipe } = require('../services/recipesGenerationService');
const axios = require('axios');
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await airtableService.fetchAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await airtableService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe.' });
  }
};


exports.searchRecipes = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  console.log('Search query:', query); // Log the query for debugging

  try {
    const recipes = await airtableService.fetchRecipesByName(query);
    console.log('Search results:', recipes); // Log the results
    res.json(recipes);
  } catch (error) {
    console.error('Error in searchRecipes:', error.message);
    res.status(500).json({ error: 'Failed to search recipes by name.' });
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await airtableService.fetchRecipeById(id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe details.' });
  }
};


exports.generateRecipeAI = async (req, res) => {
  const { ingredients, servings, intolerances } = req.body;
  if (!ingredients || !servings) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const recipe = await generateRecipe(ingredients, servings, intolerances || []);
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
};