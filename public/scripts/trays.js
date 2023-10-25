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



