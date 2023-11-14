const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Handle GET request for the profile page
router.get('/', async (req, res) => { // Removed '/profile' since this is already being used in app.use('/profile', profileRouter);
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }

  try {
    // Fetch user details from database using session userId
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
    if (!user) {
      // If no user found, destroy the session and redirect to login
      req.session.destroy();
      return res.redirect('/login');
    }
    
    // Pass the user data to the profile view
    res.render('profile', { title: 'Profile', userData: user });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while fetching the profile data', error });
  }
});

// Handle POST request for updating user profile
router.post('/', async (req, res) => { // Removed '/profile' for the same reason as above
  const { firstName, lastName, phoneNumber, currentPassword, newPassword } = req.body;
  
  if (!req.session.userId) {
    return res.status(401).send({ message: 'User is not logged in.' });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Check if the current password matches
    if (currentPassword && !await bcrypt.compare(currentPassword, user.password)) {
      return res.status(401).send({ message: 'Current password is incorrect' });
    }

    // Update password if newPassword is provided and currentPassword is correct
    let updateData = {
      firstName: firstName || user.firstName, // Fallback to current name if not provided
      lastName: lastName || user.lastName,
      phoneNumber: phoneNumber || user.phoneNumber,
    };

    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    await prisma.user.update({
      where: { id: req.session.userId },
      data: updateData,
    });

    res.send({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while updating the profile', error: error.message });
  }
});

module.exports = router;
