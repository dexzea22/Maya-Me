const express = require('express');
const router = express.Router();
const openai = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openaiApi = new openai(OPENAI_API_KEY);

// Endpoint to display the recommendations page
router.get('/', (req, res) => {
    // This will render a page called 'recommendations.ejs' from your views directory
    // You need to pass an empty array or actual recommendations if you have them
    res.render('recommendations', { recommendations: [] });
});

// Endpoint to handle generating recommendations based on dietary preferences
router.post('/generate-recommendations', async (req, res) => {
    try {
        // Extract dietary preferences from the request body
        const dietaryPreferences = req.body;

        // Generate recommendations
        const recommendations = await generateRecommendations(dietaryPreferences);
        
        // Send the recommendations in the response
        res.json({ success: true, recommendations });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Utility function to generate recommendations
const generateRecommendations = async (preferences) => {
    // Construct a prompt based on the user's dietary preferences
    const dietaryRestrictions = Object.entries(preferences)
        .filter(([_, value]) => value)
        .map(([key, _]) => key).join(', ');
    
    const prompt = `Given the dietary restrictions: ${dietaryRestrictions}, suggest five healthy meals:`;

    try {
        const gptResponse = await openaiApi.complete({
            engine: 'davinci',
            prompt: prompt,
            maxTokens: 100
        });

        const recommendations = gptResponse.data.choices[0].text.trim().split('\n').filter(item => item);
        // Ensure we return an empty array if there are no recommendations
        return recommendations.length > 0 ? recommendations : [];
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error; // Make sure to handle this error properly
    }
};

module.exports = router;
