const express = require('express');
const router = express.Router();
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/register', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('register', { title: 'Express', users });
});

router.post('/register', async (req, res) => {
  // Updated to match the names used in the HTML form
  const { firstName, lastName, email, password, confirmPassword, gender, address, dateOfBirth, phoneNumber, usertype } = req.body;

  if (!validator.validate(email)) {
    return res.render('register', { errorMessage: 'Invalid email address' });
  }

  if (password !== confirmPassword) {
    return res.render('register', { errorMessage: 'Passwords do not match.' });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('register', {
      errorMessage: 'Password must meet the required criteria.'
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
      usertype: usertype
    }
  });

  // Redirect to the login page after successful registration
  res.redirect('/login');
});

module.exports = router;
