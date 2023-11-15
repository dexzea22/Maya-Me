const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

function Login() {
  // You can set the login page URL here
  window.location.href = "/login"; // Replace "login.html" with the actual URL of your login page
}
 // JavaScript function to create a star rating
 function createStarRating(containerId, rating) {
  const container = document.getElementById(containerId);
  
  // Clear any existing content in the container
  container.innerHTML = '';
  
  // Create a loop to generate the stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star', i <= rating ? 'filled' : 'empty');
    star.innerHTML = '★'; // You can use a star icon here if available
    container.appendChild(star);
  }
}

// Call the function with the desired rating (e.g., 4 out of 5 stars)
createStarRating('starmls', 3);
createStarRating('starmls1', 4);
createStarRating('starmls2', 5);
createStarRating('starmls3', 5);
createStarRating('starmls4', 3);

var cartItems = getCartItemsFromStorage() || [];

function addToCart(itemName, cardId) {
  var selectedSize = document.querySelector(`#${cardId} input[name="size"]:checked`);

  if (selectedSize) {
    var selectedSizeValue = selectedSize.value;
    var [size, price] = selectedSizeValue.split('-');

    var numericPrice = parseFloat(price);
    
    var item = {
      name: itemName,
      size: size,
      price: numericPrice, // Keep the numeric value
    };

    cartItems.push(item);
    updateCartDisplay();
    saveCartItemsToStorage(cartItems);

    // Show SweetAlert notification using the unique lightbox ID
    Swal.fire({
      icon: 'success',
      title: 'Item Added to Cart',
      text: `${itemName} ${size} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please select a size before adding to the cart.',
      showConfirmButton: false,
      timer: 2000,
    });  }
}

function updateCartDisplay() {
  var cartList = document.getElementById("mod-cart-items");
  var totalAmount = document.getElementById("total-amount");
  cartList.innerHTML = "";

  var totalPrice = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var li = document.createElement("li");

    // Add numbering to the items
    var itemNumber = i + 1;

    // Format the price when displaying
    var formattedPrice = cartItems[i].price.toLocaleString();

    // Display the item name, size, and formatted price
    li.appendChild(
      document.createTextNode(
        itemNumber + "." +
        cartItems[i].name + " : " + cartItems[i].size + " Price: ₱" + formattedPrice
      )
    );

    cartList.appendChild(li);

    totalPrice += cartItems[i].price;
  }

  totalAmount.textContent = "Total: ₱" + totalPrice.toLocaleString();
}

function saveCartItemsToStorage(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function getCartItemsFromStorage() {
  var storedItems = localStorage.getItem("cartItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

function displayStoredItems() {
  var storedItems = getCartItemsFromStorage();

  if (storedItems.length > 0) {
    cartItems = storedItems; // Update the global cartItems array
    updateCartDisplay();
  }
}

window.onload = function () {
  displayStoredItems();
};

function placeOrder() {
  var modal = document.getElementById("cart-mod");

  // Check if the cart is empty
  if (cartItems.length === 0) {
    alert("Your cart is empty. Add items before placing an order.");
    return;
  }

  modal.style.display = "none";

  // Send a POST request to the server with the cart items
  fetch("/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products: cartItems }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order placed:", data);
      cartItems = []; // Clear the cart after placing the order
      updateCartDisplay();
      saveCartItemsToStorage(cartItems);
      alert("Order placed successfully!");
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    });
}

function openCartModal() {
  var modal = document.getElementById("cart-mod");
  modal.style.display = "block";
}

function closeCartModal() {
  var modal = document.getElementById("cart-mod");
  modal.style.display = "none";
}

window.addEventListener("click", function (event) {
  var modal = document.getElementById("cart-mod");
  var closeBtn = document.getElementById("clse");

  if (event.target === modal || event.target === closeBtn) {
    modal.style.display = "none";
  }
});

$('#openDietaryModal').click(function () {
  $('#dietaryPreferencesModal').modal('show');
});
