document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
  
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting through the browser
  
      const formData = {
        firstName: profileForm['firstName'].value,
        lastName: profileForm['lastName'].value,
        phoneNumber: profileForm['phoneNumber'].value,
        currentPassword: profileForm['currentPassword'].value,
        newPassword: profileForm['newPassword'].value,
      };
  
      // Send POST request to server to update user profile
      fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message); // Alert with the response message
        if (data.message === 'Profile updated successfully') {
          closeProfileModal(); // Close the modal if update is successful
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });
  