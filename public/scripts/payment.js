// Function to open the payment modal

var totalAmountElement=document.getElementById('total-amount');
var totalAmount;
const modalContainer = document.querySelector('.modal-container');
function openPaymentModal() {

    var modal = document.getElementById("payment-mod");

    modal.style.display = "flex";
    
}

// Function to close the payment modal
function closePaymentModal() {
    var modal = document.getElementById("payment-mod");
    modal.style.display = "none";
}

// Function to initialize the PayPal button
function initializePayPalButton() {
    var totalPrice = document.getElementById('total-amounthidden');
    var totalPriceValue = parseFloat(totalPrice.innerText);
    console.log(totalPriceValue);
    paypal.Buttons({
        createOrder: function (data, actions) {
     
            // Use the same currency code as in the script tag
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalPriceValue.toString(),
                        currency_code: 'PHP', // Use the correct currency code
                    },
                }],
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
        
                console.log(data);
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
    var totalAmount = totalAmountElement.getAttribute('data-numeric-value');
    console.log(totalAmount);
    return totalAmount;
}


// document.addEventListener("DOMContentLoaded", function () {

//     var totalPrice = document.getElementById('total-amounthidden');
  
//     console.log(totalPrice.innerText);
   
// console.log(totalAmountElement.innerText);
//     initializePayPalButton();
    

// });

document.getElementById("checkoutButton").addEventListener("click", function () {

    initializePayPalButton();
    openPaymentModal();
  
});
