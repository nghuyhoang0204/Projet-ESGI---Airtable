const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

// Route for searching recipes
router.get('/search', recipesController.searchRecipes);

router.get('/', recipesController.getAllRecipes);

module.exports = router;