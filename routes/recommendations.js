const express = require('express');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const router = express.Router();

// Function to call the ML backend and get recommendations
async function getRecommendationsFromMLBackend(userId, dietaryPreferences) {
  try {
    // Ensure that dietaryPreferences are available
    if (!dietaryPreferences) {
      throw new Error('Dietary preferences not found for user.');
    }

    // Call to the ML backend
    const response = await axios.post('http://localhost:5000/recommend', {
      userId,
      preferences: dietaryPreferences // Adjust this according to the expected format of the ML backend
    });

    // Check if the response is valid
    if (response.data && response.data.recommendations) {
      return response.data.recommendations;
    } else {
      throw new Error('Invalid response from ML backend.');
    }
  } catch (error) {
    console.error('Error fetching recommendations from ML backend:', error);
    throw error;
  }
}

router.get('/recommendations', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }

  const userId = req.session.userId;
  try {
    // Fetch dietary preferences
    const dietaryPreferences = await prisma.dietaryPreference.findUnique({
      where: { userId }
    });

    // Get recommendations from the ML backend
    const recommendations = await getRecommendationsFromMLBackend(userId, dietaryPreferences);

    // Render the recommendations page with the data
    res.render('recommendations', { recommendations });
  } catch (error) {
    console.error('Error in getting recommendations:', error);
    res.status(500).send('An error occurred while fetching recommendations');
  }
});

module.exports = router;
