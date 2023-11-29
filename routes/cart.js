const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set up session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000 // 24 hours
    }
  }));

app.get('/', async (req, res) => {
    console.log('Request received')
  // Check if the user is not logged in

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
      // Render the cart page and pass the user data to the template
      res.render('cart', { title: 'Cart' });
    }
    console.log('Rendering cart page');
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('An error occurred while fetching the profile data');
  }
});

module.exports = app;
