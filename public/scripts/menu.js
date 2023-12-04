const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
  document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.querySelector(".menu-toggle");
    var sideMenu = document.querySelector(".side-menu");
  
    if (menuToggle) {
      menuToggle.addEventListener("click", function() {
        sideMenu.classList.toggle("show");
      });
    }
  
    // Check screen size on initial load and hide the menu if the screen is big
    checkScreenSize();
    
    // Check screen size when the window is resized
    window.addEventListener('resize', checkScreenSize);
  
    function checkScreenSize() {
      if (window.innerWidth > 768) {
        sideMenu.classList.remove("show");
      }
    }
  });
  
  
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

function openCart() {
  window.location.href = '/cart';
}


$('#openDietaryModal').click(function () {
  $('#dietaryPreferencesModal').modal('show');
});
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



