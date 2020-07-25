const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

username.addEventListener('focusout', (e) => {
  validateUsername();
});
username.addEventListener('input', (e) => {
  if (username.dataset.error) {
    validateUsername();
  }
});

email.addEventListener('focusout', (e) => {
  validateEmail();
});
email.addEventListener('input', (e) => {
  if (email.dataset.error) {
    validateEmail();
  }
});

password.addEventListener('focusout', (e) => {
  validatePassword();
});
password.addEventListener('input', (e) => {
  if (password.dataset.error) {
    validatePassword();
    confirmPassword();
  }

  if (password.value === '') {
    password2.disabled = true;
  }

  if (password.value.length > 0 && password2.disabled) {
    password2.disabled = false;
  }
});

password2.addEventListener('focusout', (e) => {
  confirmPassword();
});
password2.addEventListener('input', (e) => {
  if (password2.dataset.error) {
    confirmPassword();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPasswordMatch = confirmPassword();

  if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    console.log('Form submitted');
    username.value = '';
    email.value = '';
    password.value = '';
    password2.value = '';

    const formGroups = form.querySelectorAll('.form-group');
    for (let formGroup of formGroups) {
      formGroup.classList.remove('success');
    }
  }
});

function showError(input, msg) {
  const formGroup = input.parentElement;
  formGroup.classList.add('error');

  const errorElem = formGroup.querySelector('small');
  errorElem.innerText = msg;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  formGroup.classList.add('success');
}

function validateUsername() {
  username.dataset.error = true;

  if (username.value.trim() === '') {
    showError(username, 'Username is required');
    return false;
  } else {
    showSuccess(username);
    return true;
  }
}

function validateEmail() {
  email.dataset.error = true;

  if (email.value.trim() === '') {
    showError(email, 'Email is required');
    return false;
  } else if (!validator.isEmail(email.value)) {
    showError(email, 'Please provide a valid email');
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}

function validatePassword() {
  password.dataset.error = true;

  if (password.value.trim() === '') {
    showError(password, 'Password is required');
    return false;
  } else {
    showSuccess(password);
    return true;
  }
}

function confirmPassword() {
  password2.dataset.error = true;

  if (password2.value.trim() === '') {
    showError(password2, 'Password is required');
    return false;
  } else if (!validator.equals(password.value, password2.value)) {
    showError(password2, 'Passwords do not match');
    return false;
  } else {
    showSuccess(password2);
    return true;
  }
}
