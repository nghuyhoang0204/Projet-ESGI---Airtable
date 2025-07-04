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
        vitamins: new Set(),
        minerals: new Set()
    };

    results.forEach(data => {
        if (data) {
            nutrition.calories += data.calories || 0;
            nutrition.proteins += data.proteins || 0;
            nutrition.carbs += data.carbs || 0;
            nutrition.fats += data.fats || 0;
            
            // Ajouter des vitamines et minéraux basiques selon l'ingrédient
            if (data.vitamins) {
                data.vitamins.forEach(v => nutrition.vitamins.add(v));
            }
            if (data.minerals) {
                data.minerals.forEach(m => nutrition.minerals.add(m));
            }
            
            // Ajouter des estimations par défaut selon le type d'ingrédient
            const ingredientLower = data.name?.toLowerCase() || '';
            if (ingredientLower.includes('carotte') || ingredientLower.includes('épinard')) {
                nutrition.vitamins.add('Vitamine A');
            }
            if (ingredientLower.includes('orange') || ingredientLower.includes('citron')) {
                nutrition.vitamins.add('Vitamine C');
            }
            if (ingredientLower.includes('lait') || ingredientLower.includes('fromage')) {
                nutrition.minerals.add('Calcium');
                nutrition.vitamins.add('Vitamine D');
            }
            if (ingredientLower.includes('viande') || ingredientLower.includes('poisson')) {
                nutrition.minerals.add('Fer');
                nutrition.vitamins.add('Vitamine B12');
            }
        }
    });

    return {
        calories: nutrition.calories,
        proteins: nutrition.proteins,
        carbs: nutrition.carbs,
        fats: nutrition.fats,
        vitamins: Array.from(nutrition.vitamins),
        minerals: Array.from(nutrition.minerals)
    };
}

module.exports = { computeNutrition };
