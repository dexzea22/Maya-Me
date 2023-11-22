const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// GET request handler for the Profile page
router.get('/', async (req, res) => {
  // Check if the user is not logged in
  if (!req.session.userId) {
    // Redirect to the login page if not logged in
    return res.redirect('/login');
  }

  try {
    // Find the user by the ID stored in the session
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });

    // If no user is found, destroy the session and redirect to login
    if (!user) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); // The name 'connect.sid' is the default session cookie name. Change if different.
        res.redirect('/login');
      });
    } else {
      // Render the profile page and pass the user data to the template
      res.render('profile', { title: 'Profile', userData: user });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('An error occurred while fetching the profile data');
  }
});

// POST request handler for updating the user profile
router.post('/', async (req, res) => {
  const { firstName, lastName,address, phoneNumber, currentPassword, newPassword } = req.body;

  if (!req.session.userId) {
    return res.status(401).send('User is not logged in.');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    let updateData = { firstName, lastName,address, phoneNumber };

    // Check if the current password is provided for password update
    if (currentPassword && newPassword) {
      const passwordValid = await bcrypt.compare(currentPassword, user.password);
      if (!passwordValid) {
        return res.status(401).send('Current password is incorrect.');
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // Update the user profile
    await prisma.user.update({
      where: { id: req.session.userId },
      data: updateData,
    });

    res.send('Profile updated successfully.');
  } catch (error) {
    res.status(500).send('An error occurred while updating the profile.');
  }
});

module.exports = router;
