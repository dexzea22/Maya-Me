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
createStarRating('star-rating26', 2);
createStarRating('star-rating27', 4);
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

var cartItems = [];

function addToCart(itemName, itemPrice) {
  var item = {
    name: itemName,
    price: itemPrice,
  };
  cartItems.push(item);
  updateCart();
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
    li.appendChild(
      document.createTextNode(
        itemNumber + ". " +
        cartItems[i].name + " (Php " + cartItems[i].price + ")"
      )
    );

    cartList.appendChild(li);

    totalPrice += cartItems[i].price;
  }

  totalAmount.textContent = totalPrice;
}

function placeOrder() {
  var modal = document.getElementById("cart-mod");
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
  var closeBtn = document.getElementsByClassName("close")[0];

  if (event.target === modal || event.target === closeBtn) {
    modal.style.display = "none";
  }
});

$('#openDietaryModal').click(function () {
  $('#dietaryPreferencesModal').modal('show');
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

window.onscroll = function () {
  if (window.pageYOffset > 0) {
    document.querySelector('.topnav').classList.add('sticky');
  } else {
    document.querySelector('.topnav').classList.remove('sticky');
  }
};
var cartItems = [];

function addToCart(itemName, itemPrice) {
  var item = {
    name: itemName,
    price: itemPrice,
  };
  cartItems.push(item);
  updateCart();
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
    li.appendChild(
      document.createTextNode(
        itemNumber + ". " +
        cartItems[i].name + " (Php " + cartItems[i].price + ")"
      )
    );

    cartList.appendChild(li);

    totalPrice += cartItems[i].price;
  }

  totalAmount.textContent = totalPrice;
}

function placeOrder() {
  var modal = document.getElementById("cart-mod");
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
  var closeBtn = document.getElementsByClassName("close")[0];

  if (event.target === modal || event.target === closeBtn) {
    modal.style.display = "none";
  }
});

$('#openDietaryModal').click(function () {
  $('#dietaryPreferencesModal').modal('show');
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

window.onscroll = function () {
  if (window.pageYOffset > 0) {
    document.querySelector('.topnav').classList.add('sticky');
  } else {
    document.querySelector('.topnav').classList.remove('sticky');
  }
};

  function placeOrder() {
    var modal = document.getElementById("cart-mod");
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
    var closeBtn = document.getElementsByClassName("clse")[0];

    if (event.target === modal || event.target === closeBtn) {
      modal.style.display = "none";
    }
  });

  




