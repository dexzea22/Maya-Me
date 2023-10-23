
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
    const gallery = document.querySelector('.gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    // Add click event listeners to each image
    gallery.querySelectorAll('img').forEach((img, index) => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightbox.style.display = 'block';
      });
    });

    // Close the lightbox when clicking outside the image
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
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