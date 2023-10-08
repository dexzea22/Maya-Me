
const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

      const imagePaths = [
  'f2.jpg',
  'f1.jpg',
  'f3.jpg',
  'f4.jpg',
  // Add more image file paths as needed
];

const slideshowContainer = document.querySelector('.slideshow-container');
let currentIndex = 0;
slideshowContainer.style.width = '50%'; // Adjust the width as needed
slideshowContainer.style.height = '50%'; // Adjust the height as needed

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
