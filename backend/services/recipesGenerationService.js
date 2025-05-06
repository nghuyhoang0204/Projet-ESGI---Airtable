const { OpenAIApi } = require('openai');

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key from the environment variables
});

exports.generateRecipe = async (ingredients, servings, intolerances) => {
  const prompt = `Create a recipe for ${servings} people using the following ingredients: ${ingredients.join(', ')}. 
  Consider the following dietary restrictions: ${intolerances.join(', ')}.`;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    throw new Error('Failed to generate recipe.');
  }
};