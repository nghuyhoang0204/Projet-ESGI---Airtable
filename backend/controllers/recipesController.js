const airtableService = require('../services/airtableService');
const { generateRecipe } = require('../services/recipesGenerationService');
const { computeNutrition } = require('../services/nutritionService');
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

  console.log('Search query:', query); 

  try {
    const recipes = await airtableService.fetchRecipesByName(query);
    console.log('Search results:', recipes); 
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
    
    // Calculer la nutrition si elle n'existe pas
    if (recipe.ingredient_names && (!recipe.nutrition_calories || recipe.nutrition_calories === null)) {
      console.log('Computing nutrition for recipe:', recipe.Name);
      const nutrition = await computeNutrition(recipe.ingredient_names);
      
      // Mettre à jour la recette avec les valeurs nutritionnelles
      const updatedRecipe = {
        ...recipe,
        nutrition_calories: Math.round(nutrition.calories),
        nutrition_proteins: Math.round(nutrition.proteins * 10) / 10,
        nutrition_carbs: Math.round(nutrition.carbs * 10) / 10,
        nutrition_fats: Math.round(nutrition.fats * 10) / 10,
        nutrition_vitamins: nutrition.vitamins.join(', ') || '',
        nutrition_minerals: nutrition.minerals.join(', ') || ''
      };
      
      // Optionnel : sauvegarder en base
      try {
        await airtableService.updateRecipe(id, {
          nutrition_calories: updatedRecipe.nutrition_calories,
          nutrition_proteins: updatedRecipe.nutrition_proteins,
          nutrition_carbs: updatedRecipe.nutrition_carbs,
          nutrition_fats: updatedRecipe.nutrition_fats,
          nutrition_vitamins: updatedRecipe.nutrition_vitamins,
          nutrition_minerals: updatedRecipe.nutrition_minerals
        });
      } catch (updateError) {
        console.warn('Could not update nutrition in database:', updateError.message);
      }
      
      res.json(updatedRecipe);
    } else {
      res.json(recipe);
    }
  } catch (error) {
    console.error('Error in getRecipeById:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe details.' });
  }
};


exports.generateRecipeAI = async (req, res) => {
  const { ingredients, servings, intolerances } = req.body;
  if (!ingredients || !servings) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  
  try {
    // Générer la recette avec l'IA
    const recipeText = await generateRecipe(ingredients, servings, intolerances || []);
    
    // Calculer les valeurs nutritionnelles
    const nutrition = await computeNutrition(ingredients);
    
    // Créer l'objet recette pour la base de données
    const recipeData = {
      Name: `Recette IA - ${ingredients.slice(0, 2).join(', ')}`,
      ingredient: ingredients.join(', '),
      noms: ingredients,
      QpourNbPers: servings,
      Type: 'Généré par IA',
      instructions: recipeText,
      nutrition_calories: Math.round(nutrition.calories),
      nutrition_proteins: Math.round(nutrition.proteins * 10) / 10,
      nutrition_carbs: Math.round(nutrition.carbs * 10) / 10,
      nutrition_fats: Math.round(nutrition.fats * 10) / 10,
      nutrition_vitamins: nutrition.vitamins.join(', ') || '',
      nutrition_minerals: nutrition.minerals.join(', ') || '',
      dietary_restrictions: intolerances.join(', ') || ''
    };
    
    // Sauvegarder en base de données
    const savedRecipe = await airtableService.createRecipe(recipeData);
    
    res.json({ 
      recipe: recipeText,
      savedRecipe: savedRecipe,
      nutrition: nutrition,
      message: 'Recette générée et sauvegardée avec succès!'
    });
  } catch (error) {
    console.error('Error in generateRecipeAI:', error.message);
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
};