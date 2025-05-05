// filepath: routes/recipesRouter.js
const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getAllRecipes);
router.post('/', recipesController.createRecipe);

module.exports = router;
