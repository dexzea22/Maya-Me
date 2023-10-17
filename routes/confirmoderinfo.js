const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET route for rendering the confirm order info form
router.get('/confirmoderinfo', function(req, res) {
  res.render('confirmoderinfo');
});

// POST route for submitting the confirm order info form
router.post('/confirmoderinfo', async function(req, res) {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/');
    }

     // Check if all necessary fields are present
     if (!req.body.deliveryAddress) {
      return res.render('confirmoderinfo', { title: 'Confirm Order Information', error: 'Delivery address is required.' });
    }

    // Create the confirm order info record
    const confirmderinfo = await prisma.confirmOrderInfo.create({
      data: {
        userId: req.session.userId,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birthdate: new Date(req.body.birthdate),
        foodChoice: req.body.foodChoice,
        deliveryAddress: req.body.deliveryAddress,
        specialRequests: req.body.specialRequests,
      }
    });

    res.redirect('/UserDashboard');
  } catch (error) {
    console.error(error);
    res.render('confirmoderinfo', { title: 'Confirm Order Information', error: error.message });
  }
});

// GET route for viewing the confirm order info
router.get('/viewconfirmoderinfo', async function(req, res) {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/');
    }

    // Fetch the confirm order info for the logged-in user
    const confirmOrderInfo = await prisma.confirmOrderInfo.findUnique({
      where: {
        userId: req.session.userId
      }
    });

    res.render('viewconfirmoderinfo', { title: 'View/Edit Confirm Order Information', confirmOrderInfo });
  } catch (error) {
    console.error(error);
    res.render('viewconfirmoderinfo', { title: 'View/Edit Confirm Order Information', error: error.message });
  }
});

// GET route for editing the confirm order info form
router.get('/editconfirmoderinfo', async function(req, res) {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/');
    }

    // Fetch the confirm order info for the logged-in user
    const confirmOrderInfo = await prisma.confirmOrderInfo.findUnique({
      where: {
        userId: req.session.userId
      }
    });

    res.render('editconfirmoderinfo', { title: 'Edit Confirm Order Information', confirmOrderInfo });
  } catch (error) {
    console.error(error);
    res.render('editconfirmoderinfo', { title: 'Edit Confirm Order Information', error: error.message });
  }
});

// POST route for updating the confirm order info form
router.post('/editconfirmoderinfo', async function(req, res) {
  try {
    const userId = req.session.userId;
    const {firstname, middlename, lastname, gender, birthdate, foodChoice, deliveryAddress, specialRequests } = req.body;

    // Update the confirm order info record
    const confirmOrderInfo = await prisma.confirmOrderInfo.update({
      where: { userId },
      data: {
        firstname,
        middlename,
        lastname,
        gender,
        birthdate: new Date(birthdate),
        foodChoice,
        deliveryAddress,
        specialRequests,
      }
    });

    res.redirect('/UserDashboard');
  } catch (error) {
    console.error(error);
    res.render('editconfirmoderinfo', { title: 'Edit Confirm Order Information', error: error.message });
  }
});

module.exports = router;
