// const express = require('express');
// const mongoose = require('mongoose');
// const Chart = require('chart.js');

// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// // Define the schema and model for your data
// const FoodChoiceSchema = new mongoose.Schema({
//   name: String,
//   count: Number,
// });
// const FoodChoiceModel = mongoose.model('FoodChoice', FoodChoiceSchema);

// // Create the Express app
// const app = express();

// // Define a route to fetch data from MongoDB
// app.get('/api/foodchoices', async (req, res) => {
//   try {
//     // Retrieve data from MongoDB
//     const foodChoices = await FoodChoiceModel.find().lean();

//     // Prepare data for the chart
//     const labels = foodChoices.map(choice => choice.name);
//     const counts = foodChoices.map(choice => choice.count);

//     // Create the chart data
//     const chartData = {
//       labels: labels,
//       datasets: [{
//         label: 'Food Choices',
//         data: counts,
//         backgroundColor: 'rgba(54, 162, 235, 0.5)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       }],
//     };

//     // Send the chart data as JSON response

//     res.json(chartData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
