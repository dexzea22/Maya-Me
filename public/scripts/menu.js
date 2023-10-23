
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
createStarRating('star-rating4', 4);
createStarRating('star-rating5', 3);
createStarRating('star-rating6', 4);
createStarRating('star-rating7', 5);
createStarRating('star-rating8', 2);
createStarRating('star-rating9', 4);
createStarRating('star-rating10', 5);

