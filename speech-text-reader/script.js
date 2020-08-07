const main = document.querySelector('main');
const voicesSelect = document.querySelector('#voices');
const textToRead = document.querySelector('#text-read');
const readBtn = document.querySelector('#read');
const showBtn = document.querySelector('#show');
const closeBtn = document.querySelector('#close');
const textBox = document.querySelector('#text-box');

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

for (const item of data) {
  createBox(item);
}

// Store available voices
let voices = [];

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

  main.appendChild(box);
}

getVoices();
