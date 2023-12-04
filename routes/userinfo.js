const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to retrieve the confirm order info based on the user's ID
async function fetchConfirmOrderInfo(req, res, next) {
  try {
    const userId = req.query.id; // Retrieve the user's ID from the query parameter

    // Fetch the confirm order info from the database based on the user's ID
    const confirmOrderInfo = await prisma.confirmOrderInfo.findFirst({ where: { userId } });

    if (!confirmOrderInfo) {
      // Handle the case where confirm order info is not found
      return res.status(404).send('Information not found');
    }

    // Attach the retrieved confirmOrderInfo to the request object for use in subsequent middleware or route handlers
    req.confirmOrderInfo = confirmOrderInfo;
    next();
  } catch (error) {
    console.error('Error retrieving information:', error);
    res.status(500).send('Internal Server Error');
  }
}

router.get('/adminUserTable', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('adminUserTable', { title: 'User Info', users });
});

// Route handler for /view
router.get('/view', fetchConfirmOrderInfo, (req, res) => {
  // Render the "view" page using the retrieved confirmOrderInfo data
  res.render('view', { title: 'Confirm Order Info', confirmOrderInfo: req.confirmOrderInfo });
});

// Route handler for /edit
router.get('/edit', fetchConfirmOrderInfo, (req, res) => {
  // Render the "edit" page using the retrieved confirmOrderInfo data
  res.render('edit', { title: 'Edit Confirm Order Info', confirmOrderInfo: req.confirmOrderInfo });
});

router.post('/edit/:id', (req, res) => {
  // Extract the updated information from the request body
  const updatedConfirmOrderInfo = {
    deliveryAddress: req.body.deliveryAddress,
    foodChoice: req.body.foodChoice,
    specialRequests: req.body.specialRequests
  };

  const userId = req.params.id; // Retrieve the user's ID from the URL parameter

  // Update the confirm order info in the database
  prisma.confirmOrderInfo
    .update({
      where: { userId: userId }, // Make sure the userId field is correct and matches an existing record
      data: updatedConfirmOrderInfo,
    })
    .then(updatedConfirmOrderInfo => {
      // Redirect to a success page 
      res.redirect('/adminUserTable');
    })
    .catch(error => {
      // Handle the error
      console.error('Error updating information:', error);
      res.status(500).json({ error: 'An error occurred while updating the information' });
    });
});



// router.post('/submitDietaryPreferences', async (req, res) => {
//   const {
//       vegetarian,
//       vegan,
//       omnivore,
//       glutenFree,
//       nutAllergy,
//       otherRestrictions,
//       halal,
//       kosher,
//       lactoseFree
//   } = req.body;

//   try {
//     const userId = req.body.userId; // Assuming you're sending it from frontend

//       // Use Prisma to save the data
//       const createdPreference = await prisma.dietaryPreference.create({

//           data: {
//               vegetarian,
//               vegan,
//               omnivore,
//               halal,
//               kosher,
//               glutenFree,
//               lactoseFree,
//               nutAllergy,
//               otherRestrictions
//           }
//       });

//       res.json({ success: true, createdPreference });
//   } catch (error) {
//       console.error("Error saving preferences:", error);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });



module.exports = router;
