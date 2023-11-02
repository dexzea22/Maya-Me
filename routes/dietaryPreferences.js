const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/submit-dietary-preferences', async (req, res) => {
  // Get the authenticated user's ID from the session (modify this based on your authentication setup).
  const userId = req.session.userId;

  // Check if the user already has dietary preferences in the database.
  const existingDietaryPreference = await prisma.dietaryPreference.findUnique({
    where: {
      userId,
    },
  });

  // Extract the dietary preferences from the request body.
  const {
    vegetarian,
    vegan,
    omnivore,
    halal,
    kosher,
    lactoseFree,
    glutenFree,
    nutAllergy,
    otherRestrictions,
  } = req.body;

  try {
    if (existingDietaryPreference) {
      // If existing dietary preferences are found, update them.
      await prisma.dietaryPreference.update({
        where: {
          userId,
        },
        data: {
          vegetarian,
          vegan,
          omnivore,
          halal,
          kosher,
          lactoseFree,
          glutenFree,
          nutAllergy,
          otherRestrictions,
        },
      });

      res.json({ success: true, message: 'Dietary preferences updated' });
    } else {
      // If no existing dietary preferences are found, create a new record.
      const dietaryPreference = await prisma.dietaryPreference.create({
        data: {
          userId,
          vegetarian,
          vegan,
          omnivore,
          halal,
          kosher,
          lactoseFree,
          glutenFree,
          nutAllergy,
          otherRestrictions,
        },
      });

      res.json({ success: true, data: dietaryPreference });
    }
  } catch (error) {
    console.error('Error saving dietary preferences:', error);
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
