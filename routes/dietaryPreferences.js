const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Placeholder for TensorFlow recommendation logic
async function generateRecommendations(userId, dietaryData) {
  // Implement TensorFlow logic here to generate recommendations
  // This is a mock-up for demonstration purposes
  return ['Recommended Food 1', 'Recommended Food 2', 'Recommended Food 3'];
}

router.post('/submit-dietary-preferences', async (req, res) => {
  if (!req.session || !req.session.userId) {
    console.log('Unauthorized attempt to access dietary preferences');
    return res.status(401).json({ success: false, message: "Unauthorized access. Please log in." });
  }

  const userId = req.session.userId;
  const dietaryData = {
    vegetarian: req.body.vegetarian || false,
    vegan: req.body.vegan || false,
    omnivore: req.body.omnivore || false,
    halal: req.body.halal || false,
    kosher: req.body.kosher || false,
    lactoseFree: req.body.lactoseFree || false,
    glutenFree: req.body.glutenFree || false,
    nutAllergy: req.body.nutAllergy || false,
    otherRestrictions: req.body.otherRestrictions || ''
  };

  try {
    let dietaryPreference;
    const existingPreference = await prisma.dietaryPreference.findUnique({ where: { userId } });

    if (existingPreference) {
      dietaryPreference = await prisma.dietaryPreference.update({ where: { userId }, data: dietaryData });
    } else {
      dietaryPreference = await prisma.dietaryPreference.create({ data: { userId, ...dietaryData } });
    }

    const recommendations = await generateRecommendations(userId, dietaryData);

    res.json({ success: true, dietaryPreference, recommendations });
  } catch (error) {
    console.error('Error in submitting dietary preferences:', error);
    res.status(500).json({ success: false, message: error.message || 'An error occurred.' });
  }
});

module.exports = router;
