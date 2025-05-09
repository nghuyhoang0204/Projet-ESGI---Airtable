// filepath: backend/services/airtableService.js
const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);
  console.log('Trying to fetch from table:', process.env.AIRTABLE_BASE_ID, 'with token:', process.env.AIRTABLE_API_KEY.slice(0, 4));


  exports.fetchAllRecipes = async () => {
    try {
      const records = await base('Plat').select().all();
      return records.map(record => ({
        id: record.id, 
        ...record.fields
      }));
    } catch (error) {
      console.error('Error fetching recipes from Airtable:', error.message);
      throw new Error('Failed to fetch recipes from Airtable.');
    }
  };
  

exports.createRecipe = async (data) => {
  try {
    const createdRecords = await base('Plat').create([{ fields: data }]);
    return createdRecords[0].fields;
  } catch (error) {
    console.error('Error creating recipe in Airtable:', error.message);
    throw new Error('Failed to create recipe in Airtable.');
  }
};

exports.fetchRecipesByName = async (name) => {
  try {
    const safeQuery = name.toLowerCase().replace(/"/g, '\\"'); 

    const formula = `OR(
      SEARCH("${safeQuery}", LOWER({Name})),
      SEARCH("${safeQuery}", LOWER({ingredient})),
      SEARCH("${safeQuery}", LOWER({Type}))
    )`;

    console.log(`🔍 Using Airtable formula: ${formula}`);

    const records = await base('Plat').select({
      filterByFormula: formula,
    }).all();

    if (records.length === 0) {
      console.log(`No recipes found for query: ${name}`);
      return [];
    }

    return records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('🛑 Airtable search formula error:', error.message);
    throw new Error('Failed to fetch recipes by criteria.');
  }
};




