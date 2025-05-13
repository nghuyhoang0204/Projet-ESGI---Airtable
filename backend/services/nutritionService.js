const axios = require('axios');
const fs = require('fs');
const path = require('path');

// === Chargement du cache local ===
const ingredientCache = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../services/ingredients_nutrition.json'),
    'utf-8'
));

// === Nettoyage des noms d'ingrédients ===
function cleanIngredientName(raw) {
    return raw
        .toLowerCase()
        .replace(/\(.*?\)/g, '')
        .replace(/[0-9]+[a-z]*\s*/g, '')
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s]/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// === Récupération uniquement depuis le cache local ===
async function fetchNutrientData(ingredient) {
    const cleaned = cleanIngredientName(ingredient);

    if (ingredientCache[cleaned]) {
        console.log(`⚡ From cache: ${cleaned}`);
        return ingredientCache[cleaned];
    }

    console.warn(`[MISSING] "${cleaned}" n'existe pas dans le cache.`);
    return null;
}

// === Calcul des valeurs nutritionnelles ===
async function computeNutrition(ingredients = []) {
    const results = [];

    for (const ing of ingredients) {
        const result = await fetchNutrientData(ing);
        results.push(result);
    }

    const nutrition = {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        vitamins: [],
        minerals: []
    };

    results.forEach(data => {
        if (data) {
            nutrition.calories += data.calories;
            nutrition.proteins += data.proteins;
            nutrition.carbs += data.carbs;
            nutrition.fats += data.fats;
        }
    });

    return nutrition;
}

module.exports = { computeNutrition };
