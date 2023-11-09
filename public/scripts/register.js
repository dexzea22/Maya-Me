const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
// toggle the type attribute
const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
password.setAttribute('type', type);
// toggle the eye slash icon
this.classList.toggle('fa-eye-slash');
  });

const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirmPassword');
const confirmPasswordMessage = document.querySelector('#confirmPasswordMessage');

confirmPasswordField.addEventListener('input', function (e) {
  const password = passwordField.value;
  const confirmPassword = this.value;

  if (password === confirmPassword) {
    confirmPasswordMessage.textContent = 'Passwords match!';
    confirmPasswordMessage.style.color = 'green';
  } else {
    confirmPasswordMessage.textContent = 'Passwords do not match';
    confirmPasswordMessage.style.color = 'red';
  }
});