const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRecipe = async (ingredients, servings, intolerances) => {
  const intoleranceText = intolerances.length > 0 
    ? `en évitant les allergènes suivants: ${intolerances.join(', ')}` 
    : '';
  
  const prompt = `Créez une recette détaillée pour ${servings} personne(s) en utilisant principalement ces ingrédients: ${ingredients.join(', ')}.
  ${intoleranceText}
  
  Structurez votre réponse ainsi:
  
  TITRE: [Nom de la recette]
  
  TEMPS DE PRÉPARATION: [durée]
  TEMPS DE CUISSON: [durée]
  
  INGRÉDIENTS:
  - [liste détaillée avec quantités]
  
  INSTRUCTIONS:
  1. [étape par étape]
  
  CONSEILS:
  - [conseils de préparation et de présentation]
  
  Faites en sorte que la recette soit savoureuse, équilibrée et facile à réaliser.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [
        { 
          role: 'system', 
          content: 'Vous êtes un chef cuisinier expert qui crée des recettes délicieuses, équilibrées et bien structurées. Vous donnez des instructions claires et précises.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    throw new Error('Failed to generate recipe.');
  }
};