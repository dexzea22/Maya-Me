const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/submit-dietary-preferences', async (req, res) => {
  console.log('Received request for /submit-dietary-preferences');

  if (!req.session || !req.session.userId) {
    console.log('Unauthorized attempt to access dietary preferences');
    return res.status(401).json({ success: false, message: "Unauthorized access. Please log in." });
  }

  const userId = req.session.userId;
  console.log(`User ID from session: ${userId}`);
  console.log('Request body:', req.body);

  // Directly use the Boolean values from req.body, defaulting to false if any are missing
  const dietaryData = {
    vegetarian: req.body.vegetarian === true,
    vegan: req.body.vegan === true,
    omnivore: req.body.omnivore === true,
    halal: req.body.halal === true,
    kosher: req.body.kosher === true,
    lactoseFree: req.body.lactoseFree === true,
    glutenFree: req.body.glutenFree === true,
    nutAllergy: req.body.nutAllergy === true,
    otherRestrictions: req.body.otherRestrictions || '', // Keep as is because it's a string
  };

  console.log('Dietary data to save:', dietaryData);

  try {
    const existingDietaryPreference = await prisma.dietaryPreference.findUnique({
      where: { userId },
    });

    let dietaryPreference;
    if (existingDietaryPreference) {
      console.log(`Updating dietary preferences for user ID: ${userId}`);
      dietaryPreference = await prisma.dietaryPreference.update({
        where: { userId },
        data: dietaryData,
      });
    } else {
      console.log(`Creating new dietary preferences for user ID: ${userId}`);
      dietaryPreference = await prisma.dietaryPreference.create({
        data: { userId, ...dietaryData },
      });
    }
    
    console.log('Dietary preferences saved:', dietaryPreference);
    res.json({ success: true, data: dietaryPreference });

  } catch (error) {
    console.error('Error saving dietary preferences:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to save dietary preferences. Please try again.' });
  }
});

module.exports = router;
