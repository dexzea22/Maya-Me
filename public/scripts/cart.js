// Function to open the profile modal
function openProfileModal() {
  document.getElementById('profileModal').style.display = 'block';
}

// Function to close the profile modal
function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
}

// Event listener for opening the modal
document.querySelector('.fa-user-circle').addEventListener('click', function(event) {
  openProfileModal();
  event.stopPropagation(); // Prevent the modal from closing immediately
});

// Event listener for closing the modal when clicking anywhere outside of the modal content
window.addEventListener('click', function(event) {
  var modal = document.getElementById('profileModal');
  if (event.target == modal) {
      closeProfileModal();
  }
});

var cartItems = getCartItemsFromStorage() || [];

function addToCart(itemName, cardId) {
  var selectedSize = document.querySelector(`#${cardId} input[name="size"]:checked`);

  if (selectedSize) {
      var selectedSizeValue = selectedSize.value;
      var [size, price] = selectedSizeValue.split('-');

      var numericPrice = parseFloat(price);

      // Get the image URL based on the cardId
      var imageUrl = document.querySelector(`#${cardId} img[src^="images/"]`).getAttribute('src');

      var item = {
          name: itemName,
          size: size,
          price: numericPrice,
          image: imageUrl,  // Include the image URL
          quantity: 1,  // Default quantity is set to 1
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

function showPaymentSuccessModal(paymentDetails) {
  Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      html: `<p>Payment details:</p><pre>${JSON.stringify(paymentDetails, null, 2)}</pre>`,
      confirmButtonText: 'OK',
      onClose: () => {
          // Redirect or perform additional actions after the user clicks OK
          window.location.href = '/success'; // Redirect to success page
      }
  });
}

function updateCartDisplay() {
  var cartList = document.getElementById("mod-cart-items");
  var totalAmount = document.getElementById("total-amount");
  cartList.innerHTML = "";

  var totalPrice = 0;

  for (var i = 0; i < cartItems.length; i++) {
      var div = document.createElement("div");
      var itemNumber = i + 1;
      var formattedPrice = cartItems[i].price.toLocaleString();

      var itemInfo = document.createElement("span");
      itemInfo.textContent = `${itemNumber}. ${cartItems[i].name} : ${cartItems[i].size} Quantity: ${cartItems[i].quantity || 1} Price: ₱${formattedPrice}`;
      itemInfo.style.textDecoration = "underline";
      itemInfo.style.fontWeight = "Bold";

      var deleteButton = createDeleteButton(i);
      var incrementButton = createIncrementButton(i);
      var decrementButton = createDecrementButton(i);

      div.appendChild(itemInfo);
      div.appendChild(deleteButton);
      div.appendChild(incrementButton);
      div.appendChild(decrementButton);

      cartList.appendChild(div);

      totalPrice += cartItems[i].price * (cartItems[i].quantity || 1);
  }

  totalAmount.innerHTML = "<strong>₱" + totalPrice.toLocaleString() + "</strong>";
  totalAmount.dataset.totalAmount = totalPrice; // Set the data-total-amount attribute
}

function createIncrementButton(index) {
  var incrementButton = document.createElement("button");
  incrementButton.classList.add("inc");

  incrementButton.textContent = "+";
  incrementButton.addEventListener("click", function () {
      incrementItem(index);
  });
  return incrementButton;
}

function createDecrementButton(index) {
  var decrementButton = document.createElement("button");
  decrementButton.classList.add("inc");

  decrementButton.textContent = "-";
  decrementButton.addEventListener("click", function () {
      decrementItem(index);
  });
  return decrementButton;
}

function incrementItem(index) {
  cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
  cartItems[index].totalPrice = cartItems[index].quantity * cartItems[index].price;
  updateCartDisplay();
  saveCartItemsToStorage(cartItems);
}

function decrementItem(index) {
  if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      cartItems[index].totalPrice = cartItems[index].quantity * cartItems[index].price;
  } else {
      deleteCartItem(index);
  }
  updateCartDisplay();
  saveCartItemsToStorage(cartItems);
}

function createDeleteButton(index) {
  var deleteButton = document.createElement("icon");
  var icon = document.createElement("i");
  icon.classList.add("fas", "fa-trash");
  icon.style.color = "red";
  deleteButton.appendChild(icon);

  deleteButton.classList.add("delete-icon");
  deleteButton.style.float = "right";
  deleteButton.style.marginLeft = "15px";
  deleteButton.style.cursor = "pointer";

  deleteButton.addEventListener("click", function () {
      deleteCartItem(index);
  });

  return deleteButton;
}

function deleteCartItem(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
  saveCartItemsToStorage(cartItems);
}

var cartItems = [];

function updateItemCounter() {
  var itemCounter = document.getElementById("item-counter");
  if (itemCounter) {
      itemCounter.textContent = cartItems.length.toString();
  }
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
      cartItems = storedItems;
      updateCartDisplay();
  }
}

window.onload = function () {
  displayStoredItems();
  updateItemCounter();
};
