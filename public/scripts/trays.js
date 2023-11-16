const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
  
// JavaScript for the lightbox functionality
const galleries = document.querySelectorAll('.gallery');
const lightboxes = document.querySelectorAll('.lightbox');
const lightboxImages = document.querySelectorAll('.lightbox-image');

galleries.forEach((gallery, index) => {
  gallery.querySelectorAll('img').forEach((img, imgIndex) => {
    img.addEventListener('click', () => {
      lightboxImages[index].src = img.src;
      lightboxes[index].style.display = 'block';
    });
  });

  lightboxes[index].addEventListener('click', (event) => {
    if (event.target === lightboxes[index]) {
      lightboxes[index].style.display = 'none';
    }
  });
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
createStarRating('star', 4);
createStarRating('star1', 4);
createStarRating('star2', 5);
createStarRating('star3', 2);
createStarRating('star4', 5);
createStarRating('starbs', 4);
createStarRating('star5', 3);
createStarRating('star6', 5);
createStarRating('starc', 5);
createStarRating('star7', 4);
createStarRating('starce', 3);
createStarRating('star8', 4);
createStarRating('star9', 5);
createStarRating('star10', 4);
createStarRating('star11', 5);
createStarRating('star12', 5);
createStarRating('star13', 4);
createStarRating('star14', 3);
createStarRating('star15', 4);
createStarRating('star16', 3);
createStarRating('star17', 4);
createStarRating('star18', 3);
createStarRating('star19', 5);
createStarRating('star20', 4);
createStarRating('star21', 4);
createStarRating('star22', 5);
createStarRating('star23', 4);
createStarRating('star24', 3);
createStarRating('star25', 4);
createStarRating('star26', 3);
createStarRating('star27', 5);



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
      showConfirmButton: true,
    });
  } else {
// Replace the alert with SweetAlert
Swal.fire({
  icon: 'warning',
  title: 'Oops...',
  text: 'Please select a size before adding to the cart.',
  showConfirmButton: false,
  timer: 2000,
});
  }
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

    // Add a delete button for each item
    var deleteButton = createDeleteButton(i);
    li.appendChild(deleteButton);

    cartList.appendChild(li);

    totalPrice += cartItems[i].price;
  }

  totalAmount.textContent = "Total: ₱" + totalPrice.toLocaleString();
}

// Function to create a delete button for a specific item
function createDeleteButton(index) {
  var deleteButton = document.createElement("icon");
  var icon = document.createElement("i");

  // Set the icon class
  icon.classList.add("fas", "fa-trash");

  // Style the icon to be red
  icon.style.color = "red";

  // Append the icon to the delete button
  deleteButton.appendChild(icon);

  // Add classes and styles to position the button
  deleteButton.classList.add("delete-icon");
  deleteButton.style.float = "right";  // Float the button to the right

  // Add a click event to delete the item when the delete button is clicked
  deleteButton.addEventListener("click", function () {
    deleteCartItem(index);
  });

  return deleteButton;
}



// Function to delete a specific item from the cart
function deleteCartItem(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
  saveCartItemsToStorage(cartItems);
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
    Swal.fire({
      icon: 'warning',
      title: 'Empty Cart',
      text: 'Add items to your cart before placing an order.',
      showConfirmButton:false,
      timer: 1500,
    });
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
      Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        showConfirmButton: false,
        timer: 1500  // Auto-close the alert after 1.5 seconds
      });
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