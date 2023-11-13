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

    // Validate email
    if (!validator.validate(email)) {
        return res.render('register', { errorMessage: 'Invalid email address' });
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
