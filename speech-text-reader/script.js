const main = document.querySelector('main');
const voicesSelect = document.querySelector('#voices');
const textToRead = document.querySelector('#text-read');
const readBtn = document.querySelector('#read');
const showBtn = document.querySelector('#show');
const closeBtn = document.querySelector('#close');
const textBox = document.querySelector('#text-box');

// Voice text boxes data
const data = [
  {
    image: './images/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './images/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './images/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './images/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './images/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './images/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './images/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './images/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './images/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './images/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './images/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './images/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

// render voice boxes
for (const item of data) {
  createBox(item);
}

// Store available voices
let voices = [];
const speechUtter = new SpeechSynthesisUtterance();

function getVoices() {
  voices = speechSynthesis.getVoices();

  for (const voice of voices) {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  }
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

function setTextMessage(text) {
  speechUtter.text = text;
}

function speakText() {
  speechSynthesis.speak(speechUtter);
}

// handle voice change
voicesSelect.addEventListener('change', (e) => {
  speechUtter.voice = voices.find((voice) => voice.name === e.target.value);
});

// speak entered text
readBtn.addEventListener('click', () => {
  setTextMessage(textToRead.value);
  speakText();
});

// Toggle text box
showBtn.addEventListener('click', () => {
  textBox.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  textBox.classList.remove('show');
});

// Create speech box
function createBox({ image, text }) {
  const box = document.createElement('div');
  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active affect
    box.classList.add('active');

    setTimeout(() => {
      box.classList.remove('active');
    }, 800);
  });

  main.appendChild(box);
}

getVoices();
