const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; // for bcrypt password hashing

// Middleware to ensure user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

router.get('/profile', ensureAuthenticated, async (req, res) => {
  // Fetch the user's profile using their session userId
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  res.render('profile', { user });
});

router.post('/profile', ensureAuthenticated, async (req, res) => {
  // Process the profile update here
  // ... (profile update logic)
});

router.post('/change-password', ensureAuthenticated, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Fetch the current user from the database
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  // Check if the old password is correct
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (isMatch) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password
    await prisma.user.update({
      where: { id: req.session.userId },
      data: { password: hashedPassword },
    });
    res.send("Password updated successfully.");
  } else {
    res.status(400).send("Incorrect current password.");
  }
});

router.get('/logout', (req, res) => {
  // Destroy the session and logout the user
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login'); // Redirect to login page after logout
  });
});

module.exports = router;
