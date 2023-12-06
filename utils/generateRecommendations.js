const openai = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openaiApi = new openai(OPENAI_API_KEY);

const generateRecommendations = async (dietaryData) => {
    // Convert dietaryData object into a string of dietary preferences
    const dietaryPreferences = Object.entries(dietaryData)
        .filter(([_, value]) => value)
        .map(([key, _]) => key).join(', ');

    const prompt = `Given the dietary restrictions: ${dietaryPreferences}, suggest five healthy meals:`;

    try {
        const gptResponse = await openaiApi.complete({
            engine: 'davinci',
            prompt: prompt,
            maxTokens: 100
        });

        return gptResponse.data.choices[0].text.trim().split('\n').filter(item => item);
    } catch (error) {
        if (error.response && error.response.status === 429) {
            return ["Sorry, we're currently experiencing high demand and can't process your request. Please try again later."];
        } else {
            console.error('Error calling OpenAI API:', error);
            return ["An error occurred while generating recommendations. Please try again later."];
        }
    }
};

module.exports = generateRecommendations;
