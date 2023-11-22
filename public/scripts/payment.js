
function openPaymentModal() {
    var modal = document.getElementById("payment-mod");
    modal.style.display = "block";
}

// Function to close the payment modal
function closePaymentModal() {
    var modal = document.getElementById("payment-mod");
    modal.style.display = "none";
}

// Function to initialize the PayPal button
// payment.js

// Function to initialize the PayPal button
// Function to initialize the PayPal button
function initializePayPalButton() {
    var totalPrice = calculateTotalPrice(); // Call the calculateTotalPrice function from meals.js

    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalPrice.toFixed(2),
                        currency_code: 'PHP',
                    },
                }],
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                console.log("Payment successful:", details);
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                closePaymentModal();
            });
        },
    }).render('#paypal-button');
}



// Call the initialization function when the window is loaded
window.onload = function () {
    initializePayPalButton();
};