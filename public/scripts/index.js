
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
createStarRating('star-rating', 4);
createStarRating('star-rating2', 4);
createStarRating('star-rating3', 5);

var cartItems = getCartItemsFromStorage() || [];

function addToCart(itemName) {
  var selectedSize = document.querySelector('input[name="size"]:checked');

  if (selectedSize) {
    var selectedSizeValue = selectedSize.value;
    var [size, price] = selectedSizeValue.split('-');

    var item = {
      name: itemName,
      size: size,
      price: parseFloat(price), // Parse the price as a float or integer
    };

    cartItems.push(item);
    updateCart();
    saveCartItemsToStorage(cartItems);

    // Show SweetAlert notification
    Swal.fire({
      icon: 'success',
      title: 'Item Added to Cart',
      text: `${itemName} ${size} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500  // Auto-close the alert after 1.5 seconds
    });
  } else {
    alert('Please select a size before adding to the cart.');
  }
}

function updateCart() {
  var cartList = document.getElementById("mod-cart-items");
  var totalAmount = document.getElementById("total-amount");
  cartList.innerHTML = "";

  var totalPrice = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var li = document.createElement("li");

    // Add numbering to the items
    var itemNumber = i + 1;

    // Display the item name, size, and price separately
    li.appendChild(
      document.createTextNode(
        itemNumber + "." +
        cartItems[i].name + " : " + cartItems[i].size + " Price: ₱" + cartItems[i].price
      )
    );

    cartList.appendChild(li);

    totalPrice += cartItems[i].price;
  }

  totalAmount.textContent = "Total: ₱" + totalPrice;
}


function saveCartItemsToStorage(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function getCartItemsFromStorage() {
  var storedItems = localStorage.getItem("cartItems");
  return storedItems ? JSON.parse(storedItems) : null;
}

function displayStoredItems() {
  var storedItems = getCartItemsFromStorage();

  if (storedItems) {
    cartItems = storedItems; // Update the global cartItems array

    // Now you can use the updated cartItems array to display the items
    updateCart();
  }
}

// Call the displayStoredItems function when the page loads
displayStoredItems();

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
      updateCart();
      saveCartItemsToStorage(cartItems);
      alert("Order placed successfully!");
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
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

function Login() {
  // You can set the login page URL here
  window.location.href = "/login"; // Replace "login.ejs" with the actual URL of your login page
}