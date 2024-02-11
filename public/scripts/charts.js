async function fetchPayPalTransactions() {
  try {
    const accessToken = await getAccessToken();

    const currentDate = new Date();

    // Set the start date to 30 days ago from the current date
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 30);

    // Format the dates as strings in the required format
    const startDateString = startDate.toISOString();
    const endDateString = currentDate.toISOString();

    const query = new URLSearchParams({
      start_date: startDateString,
      end_date: endDateString,
      // Add other parameters if needed
    }).toString();

    const url = `https://api-m.sandbox.paypal.com/v1/reporting/transactions?${query}`;

    console.log("Request URL:", url);

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Set content type
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json(); // Attempt to read error response
      throw new Error(`Request failed with status ${resp.status}. PayPal error: ${JSON.stringify(errorData)}`);
    }

    const data = await resp.json();
  
    console.log("PayPal Transaction Data:", data);
    displayTransactions(data);
  } catch (error) {
    console.error("Failed to fetch PayPal transactions:", error);
  }
}

// Function to obtain an access token
async function getAccessToken() {
  const clientId = 'AVu3WborcTvCGiCezIWmlpoZl8aV3sREwYVeBrZAWl8Dej6WlLIY9mnfD527IwI4a6UbEIvWhlV4p8_o'; // Replace with your actual PayPal sandbox client ID
  const clientSecret = 'EDx9Opa_MXiYn_Gi5ndrNPORMpStswHgSlc4gfCWs87JUSS1HamXSr169xX9Tg-80jkaVXZvyH8IHIob'; // Replace with your actual PayPal sandbox secret

  try {
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Failed to obtain access token. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to obtain access token:", error);
    throw error;
  }
}

function displayTransactions(data) {
  const tableBody = document.getElementById('transactionTableBody');

  // Clear existing rows
  tableBody.innerHTML = '';

  // Iterate through the transactions and create rows
  data.transaction_details.forEach(transaction => {
    const row = tableBody.insertRow();
    const dateCell = row.insertCell(0);
    const transactionIdCell = row.insertCell(1);
    const amountCell = row.insertCell(2);
    const transactionDate =transaction.transaction_info.transaction_initiation_date;
    const dateObject = new Date(transactionDate);
   
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = dateObject.getDate().toString().padStart(2, '0');
   
    dateCell.textContent = `${year}-${month}-${day}`; // Replace 'date' with the actual property name
    transactionIdCell.textContent = transaction.transaction_info.transaction_id; // Replace 'transactionId' with the actual property name
    amountCell.textContent = transaction.transaction_info.transaction_amount.value; // Replace 'amount' with the actual property name

    // Add more cells for additional data
  });
}

// Call the function to fetch PayPal transactions when needed
fetchPayPalTransactions();
