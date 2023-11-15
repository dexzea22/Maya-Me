const express = require('express');
const router = express.Router();
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Render the registration page
router.get('/register', async (req, res) => {
    try {
        // If you want to show existing users or any other information on register page, you can pass it here.
        res.render('register', { title: 'Register' });
    } catch (error) {
        res.status(500).send("Error loading registration page");
    }
});

// Handle registration logic
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, gender, address, dateOfBirth, phoneNumber, usertype } = req.body;

<<<<<<< HEAD
  if (!validator.validate(email)) {
    return res.render('register', { errorMessage: 'Invalid email address' });
  }

  if (password !== confirmPassword) {
    return res.render('register', { errorMessage: 'Passwords do not match.' });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('register', {
      errorMessage: 'Password must be 8 characters, have 1 special character, and atleast 1 uppercase letter'
    });
  }

  // Check if email already exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return res.render('register', { errorMessage: 'Email already exists, please choose a different one' });
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));

  // Create new user
  await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
      address: address,
      dateOfBirth: new Date(dateOfBirth), // Assumed to be in a format that can be directly used to create a Date object
      phoneNumber: phoneNumber,
      usertype: usertype,
      id: String
=======
    // Validate email
    if (!validator.validate(email)) {
        return res.render('register', { errorMessage: 'Invalid email address' });
>>>>>>> 24ea4f57645c2bc91f5b70879dabcc0d036eee29
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.render('register', { errorMessage: 'Passwords do not match.' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('register', {
            errorMessage: 'Password must be at least 8 characters long, include a number, a special character, and an uppercase letter.'
        });
    }

    // Check if email already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.render('register', { errorMessage: 'Email already in use.' });
    }

    try {
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));

        // Create user record
        await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                gender: gender,
                address: address,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                phoneNumber: phoneNumber,
                usertype: usertype || 'USER', // defaulting to 'USER' if not provided
            },
        });

        // Redirect to login on successful registration
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).render('register', { errorMessage: 'There was a problem with your registration.' });
    }
});

module.exports = router;
