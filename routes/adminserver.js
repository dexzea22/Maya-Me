const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create the Express app
const app = express();
// Get the current date
const currentDate = new Date();

// Get the start date of the year
const startDate = new Date(currentDate.getFullYear(), 0, 1); // January is 0

// Format the dates as strings in the required format
const startDateString = startDate.toISOString();
const endDateString = currentDate.toISOString();
const clientId = 'AVu3WborcTvCGiCezIWmlpoZl8aV3sREwYVeBrZAWl8Dej6WlLIY9mnfD527IwI4a6UbEIvWhlV4p8_o'; // Replace with your actual PayPal sandbox client ID
const clientSecret = 'EDx9Opa_MXiYn_Gi5ndrNPORMpStswHgSlc4gfCWs87JUSS1HamXSr169xX9Tg-80jkaVXZvyH8IHIob'; // Replace with your actual PayPal sandbox secret
// Create the query string with dynamic dates
const query = new URLSearchParams({
  transaction_id: 'stringstringstrin',
  transaction_type: 'string',
  transaction_status: 'string',
  transaction_amount: 'string',
  transaction_currency: 'string',
  start_date: startDateString,
  end_date: endDateString,
  payment_instrument_type: 'string',
  store_id: 'string',
  terminal_id: 'string',
  fields: 'transaction_info',
  balance_affecting_records_only: 'Y',
  page_size: '100',
  page: '1'
}).toString();

// Use the dynamic query in the fetch request
const response = await fetch('/paypal-proxy', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ clientId, clientSecret, query }),
});

const paypalData = await response.json();


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
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});