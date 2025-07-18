require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

exports.generateRecipe = async (ingredients, servings, intolerances) => {
  const prompt = `Create a recipe for ${servings} people using the following ingredients: ${ingredients.join(', ')}.
  Consider the following dietary restrictions: ${intolerances.join(', ')}.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'system', content: 'You are a helpful chef assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    throw new Error('Failed to generate recipe.');
  }
};