const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
  const imagePaths = [
    'mong.jpg',
    'bpm.jpg',
    'bs.jpg',
    'cream.jpeg',
    'emb.jpg',
    'fishveg.jpg',
    // Add more image file paths as needed
  ];
  
  const slideshowContainer = document.querySelector('.slideshow-container');
  let currentIndex = 0;
  
  
  function updateBackgroundImage() {
    if (currentIndex >= imagePaths.length) {
      currentIndex = 0;
    }
    const imagePath = imagePaths[currentIndex];
    const imageUrl = `url('images/${imagePath}')`;
    document.querySelector('.jumbotron').style.backgroundImage = imageUrl;
    document.querySelector('.jumbotron').style.backgroundSize = '100% 100%'; // or 'contain' or custom size
    document.querySelector('.jumbotron').style.backgroundRepeat = 'no-repeat';
    document.querySelector('.jumbotron').style.backgroundPosition =  'center';
  
    currentIndex++;
  }
  
  // Update the background image every 3 seconds (3000 milliseconds)
  setInterval(updateBackgroundImage, 3000);
// JavaScript for the lightbox functionality
const galleries = document.querySelectorAll('.gallery');
const lightboxes = document.querySelectorAll('.lightbox');
const lightboxImages = document.querySelectorAll('.lightbox-image');

galleries.forEach((gallery, index) => {
  gallery.querySelectorAll('img').forEach((img) => {
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
  window.location.href = "/login"; // Replace "login.ejs" with the actual URL of your login page
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
createStarRating('star-rating4', 4);
createStarRating('star-rating5', 3);
createStarRating('star-rating6', 4);
createStarRating('star-rating7', 5);
createStarRating('star-rating8', 2);
createStarRating('star-rating9', 4);
createStarRating('star-rating10', 5);
createStarRating('star-rating11', 4);
createStarRating('star-rating12', 3);
createStarRating('star-rating13', 5);
createStarRating('star-rating14', 4);
createStarRating('star-rating15', 5);
createStarRating('star-rating16', 4);
createStarRating('star-rating17', 4);
createStarRating('star-rating18', 3);
createStarRating('star-rating19', 5);
createStarRating('star-rating20', 4);
createStarRating('star-rating21', 5);
createStarRating('star-rating22', 4);
createStarRating('star-rating23', 5);
createStarRating('star-rating24', 5);
createStarRating('star-rating25', 4);
createStarRating('star-rating26', 4);
createStarRating('star-rating27', 3);
createStarRating('star-rating28', 3);
createStarRating('star-rating29', 5);
createStarRating('star-rating30', 4);
createStarRating('star-rating31', 2);
createStarRating('star-rating32', 3);
createStarRating('star-rating33', 5);
createStarRating('star-rating34', 4);
createStarRating('star-rating35', 4);
createStarRating('star-rating36', 5);
createStarRating('star-rating37', 2);
createStarRating('star-rating38', 3);
createStarRating('star-rating39', 4);
createStarRating('star-rating40', 3);
createStarRating('star-rating41', 5);
createStarRating('star-rating42', 4);
createStarRating('star-rating43', 5);

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
  var closeBtn = document.getElementsByClassName("clse")[0];

  if (event.target === modal || event.target === closeBtn) {
    modal.style.display = "none";
  }
});

$('#openDietaryModal').click(function () {
  $('#dietaryPreferencesModal').modal('show');
});










  




