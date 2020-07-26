const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// validate each input when user finishes entering value
form.addEventListener('focusout', (e) => {
  const input = e.target;

  switch (input.id) {
    case 'username':
      validateUsername({ min: 3, max: 15 });
      break;
    case 'email':
      validateEmail();
      break;
    case 'password':
      validatePassword({ min: 6 });
      break;
    case 'password2':
      confirmPassword();
      break;
    default:
      break;
  }
});

// validate each input value whenever it changes after first attempt
form.addEventListener('input', (e) => {
  const input = e.target;

  if (input.dataset.error === 'true') {
    switch (input.id) {
      case 'username':
        validateUsername({ min: 3, max: 15 });
        break;
      case 'email':
        validateEmail();
        break;
      case 'password':
        validatePassword({ min: 6 });
        if (password2.dataset.error === 'true') {
          confirmPassword();
        }
        break;
      case 'password2':
        confirmPassword();
        break;
      default:
        break;
    }
  }
});

// validate all inputs when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isUsernameValid = validateUsername({ min: 3, max: 15 });
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword({ min: 6 });
  const isPasswordMatch = confirmPassword();

  if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    console.log('Form submitted');
    resetForm();
  }
});

// reset all input values to their initial state
function resetForm() {
  username.value = '';
  username.dataset.error = false;
  email.value = '';
  email.dataset.error = false;
  password.value = '';
  password.dataset.error = false;
  password2.value = '';
  password2.dataset.error = false;

  const formGroups = form.querySelectorAll('.form-group');
  for (let formGroup of formGroups) {
    formGroup.classList.remove('success');
  }
}

// Adds error styles to input and error message
function showError(input, msg) {
  const formGroup = input.parentElement;
  formGroup.classList.add('error');

  const errorElem = formGroup.querySelector('small');
  errorElem.innerText = msg;
}

// remove error styles if any and add success styles
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  formGroup.classList.add('success');
}

// validation rules for username field
function validateUsername({ min, max }) {
  username.dataset.error = true;

  const value = username.value.trim();

  if (value.length < min) {
    showError(username, `Username must contain atleast ${min} characters.`);
    return false;
  } else if (value.length > max) {
    showError(username, `Username must not be more than ${max} characters.`);
    return false;
  } else {
    showSuccess(username);
    return true;
  }
}

// validation rules for email field
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

// validation rules for password field
function validatePassword({ min }) {
  password.dataset.error = true;

  const value = password.value.trim();
  if (value.length === 0) {
    showError(password, 'Password is required');
    return false;
  } else if (value.length < min) {
    showError(password, `Password length must be atleast ${min} characters.`);
    return false;
  } else {
    showSuccess(password);
    return true;
  }
}

// validation rules for confirm password field
function confirmPassword() {
  password2.dataset.error = true;

  if (password2.value.trim() === '') {
    showError(password2, 'Password2 is required');
    return false;
  } else if (!validator.equals(password.value, password2.value)) {
    showError(password2, 'Passwords do not match');
    return false;
  } else {
    showSuccess(password2);
    return true;
  }
}
