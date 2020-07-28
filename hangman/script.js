const words = wordList;
const MAX_WRONG_GUESSES = 6;
let randomWord = getRandomWord();

const correctLetters = new Set();
const wrongLetters = new Set();

// DOM nodes
const wordElem = document.querySelector('#word');
const wrongLettersWrapper = document.querySelector('#wrong-letters');
const resultMsg = document.querySelector('#message');
const resultRevealWord = document.querySelector('#reveal-word');
const popupElem = document.querySelector('#popup');
const notificationElem = document.querySelector('#notification');
const notificationText = document.querySelector('#notification-text');
const playBtn = document.querySelector('#play-btn');
const figureParts = document.querySelectorAll('.figure-part');

displayWord();

// Listen for keyboard events
window.addEventListener('keydown', (e) => {
  if (e.key.match(/^[a-z]$/)) {
    const letter = e.key;
    // if word has the letter
    if (randomWord.includes(letter)) {
      if (correctLetters.has(letter)) {
        showNotification(letter);
      } else {
        correctLetters.add(letter);
        displayWord();
        checkGameStatus();
      }
    } else {
      if (wrongLetters.has(letter)) {
        showNotification(letter);
      } else {
        wrongLetters.add(letter);
        displayWrongLetters();
        updateFigure();
        checkGameStatus();
      }
    }
  }
});

// Update figure UI
function updateFigure() {
  const wrongGuesses = wrongLetters.size;

  for (let i = 0; i < figureParts.length; i++) {
    if (i < wrongGuesses) {
      figureParts[i].style.visibility = 'visible';
    } else {
      figureParts[i].style.visibility = 'hidden';
    }
  }
}

// Play Again - reset game state and styles
playBtn.addEventListener('click', () => {
  popupElem.style.display = 'none';
  randomWord = getRandomWord();
  correctLetters.clear();
  wrongLetters.clear();
  wrongLettersWrapper.innerHTML = '';
  resultMsg.innerText = '';
  resultRevealWord.innerText = '';
  displayWord();
  updateFigure();
});

// Check Game status
function checkGameStatus() {
  const wordGuessed = wordElem.innerText.replace(/\n/g, '');

  if (wordGuessed === randomWord) {
    resultMsg.innerText = 'Congratulations! You won! 😃';
    resultRevealWord.innerText = `You guessed "${randomWord}" correctly`;
    popup.style.display = 'flex';
  }

  if (wrongLetters.size === MAX_WRONG_GUESSES) {
    resultMsg.innerText = 'Unfortunately you lost. 😕';
    resultRevealWord.innerText = `The word was: ${randomWord}`;
    popup.style.display = 'flex';
  }
}

// Show wrong guessed letters
function displayWrongLetters() {
  wrongLettersWrapper.innerHTML = `
    <div class="text">
      <p>Wrong Letters</p>
      <span>${[...wrongLetters].join(', ')}</span>
    </div>
  `;
}

// Show notification
function showNotification(letter) {
  notificationText.innerText = `You have already entered letter: ${letter}`;
  notificationElem.classList.add('show');

  setTimeout(() => {
    notificationElem.classList.remove('show');
  }, 2000);
}

// Show hidden word
function displayWord() {
  wordElem.innerHTML = `
    ${randomWord
      .split('')
      .map(
        (letter) => `
      <div class="letter">
        ${correctLetters.has(letter) ? letter : ''}
      </div>
    `
      )
      .join('')}
  `;
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
