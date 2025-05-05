const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const TABLE_NAME = 'Recettes'; // Modify this if your table has another name

exports.fetchAllRecipes = async () => {
  const records = await base(TABLE_NAME).select({ view: 'Grid view' }).all();
  return records.map(record => ({ id: record.id, ...record.fields }));
};

exports.createRecipe = async (data) => {
  const created = await base(TABLE_NAME).create([{ fields: data }]);
  return created[0].fields;
};
