const Airtable = require('airtable');
const { computeNutrition } = require('../services/nutritionService');
require('dotenv').config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_BASE_ID);

async function updateNutritionForAllRecipes() {
    try {
        const records = await base('Plat').select().all();

        for (const record of records) {
            const id = record.id;
            const fields = record.fields;


            const rawIngredients = fields['noms'];

            if (!rawIngredients || !Array.isArray(rawIngredients) || rawIngredients.length === 0) {
                console.log(`Skipping "${fields.Name}" : aucun ingrédient`);
                continue;
            }


            const ingredients = rawIngredients.map(str => str.trim()).filter(Boolean);

            console.log(`Calcul nutrition pour : ${fields.Name}`);

            const nutrition = await computeNutrition(ingredients);

            await base('Plat').update(id, {
                nutrition_calories: Math.round(nutrition.calories),
                nutrition_proteins: Math.round(nutrition.proteins),
                nutrition_carbs: Math.round(nutrition.carbs),
                nutrition_fats: Math.round(nutrition.fats),
            });

            console.log(`Mis à jour : ${fields.Name}`);
        }

        console.log('Tous les plats ont été mis à jour avec succès !');
    } catch (error) {
        console.error('Erreur globale pendant la mise à jour nutritionnelle :', error.message);
    }
}

updateNutritionForAllRecipes();
