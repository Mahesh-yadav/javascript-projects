const navbar = document.querySelector('#navbar');
const content = document.querySelector('#container');
const toggleBtn = document.querySelector('#toggle');

const signupBtn = document.querySelector('#signup');
const closeModalBtn = document.querySelector('#close-modal');
const modal = document.querySelector('.modal-container');
const signupForm = document.querySelector('.signup-form');

toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('navbar-slider');
  content.classList.toggle('content-slider');
});

signupBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

modal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    modal.classList.remove('show-modal');
  }
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.classList.remove('show-modal');
});
