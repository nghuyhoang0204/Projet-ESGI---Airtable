
const airtableService = require('../services/airtableService');

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
