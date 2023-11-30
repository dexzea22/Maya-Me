// Function to open the payment modal
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
function initializePayPalButton() {
    var totalPrice = getTotalPriceFromCart();

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

function getTotalPriceFromCart() {
    var totalAmountElement = document.getElementById("total-amount");
    var totalAmount = parseFloat(totalAmountElement.dataset.totalAmount);
    return totalAmount;
}

document.addEventListener("DOMContentLoaded", function () {
    initializePayPalButton();
});

document.getElementById("checkoutButton").addEventListener("click", function () {
    openPaymentModal();
});
