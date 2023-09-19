const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create the Express app
const app = express();

// Define a route to fetch data from MongoDB
app.get('/api/foodchoices', async (req, res) => {
  try {
    // Retrieve data from MongoDB
    const foodChoices = await prisma.confirmOrderInfo.findMany();

    // Prepare data for the chart
    let foodCount = {};
    foodChoices.forEach(choice => {
      choice.foodChoice.forEach(food => {
        if (!foodCount[food]) {
          foodCount[food] = 1;
        } else {
          foodCount[food]++;
        }
      });
    });

    const labels = Object.keys(foodCount);
    const counts = Object.values(foodCount);

    // Create the chart data
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Food Choices',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    };

    // Send the chart data as JSON response
    res.json(chartData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
