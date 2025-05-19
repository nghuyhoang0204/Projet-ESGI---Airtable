const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');


router.get('/search', recipesController.searchRecipes);

router.get('/', recipesController.getAllRecipes);

router.get('/:id', recipesController.getRecipeById);

router.post('/generate', recipesController.generateRecipeAI);

module.exports = router;