const movieSelect = document.querySelector('#movie');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const screenTitle = document.querySelector('#title');

// Application state. The state is reactive, whenever state changes the associated DOM nodes are also updated.
const appState = {
  _price: 10,
  _count: 0,
  _title: 'Avengers Endgame',
  selectedSeats: [],

  get ticketPrice() {
    return this._price;
  },
  set ticketPrice(value) {
    this._price = value;
    total.innerText = this._price * this._count;
  },
  get seatsCount() {
    return this._count;
  },
  set seatsCount(value) {
    this._count = value;
    total.innerText = this._price * this._count;
    count.innerText = this._count;
  },
  get screenTitle() {
    return this._title;
  },
  set screenTitle(value) {
    this._title = value;
    screenTitle.innerText = this._title;
  },
};

// Handle movie selection
movieSelect.addEventListener('input', (e) => {
  const [title, price] = e.target.value.split(':');
  appState.ticketPrice = Number(price);
  appState.screenTitle = title;

  localStorage.setItem('ticketPrice', price);
  localStorage.setItem('screenTitle', title);
  localStorage.setItem('selectedIndex', e.target.selectedIndex);
});

// Handle seat selection
seatsContainer = document.querySelector('.container');
seatsContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    if (e.target.classList.contains('selected')) {
      appState.seatsCount += 1;
      appState.selectedSeats.push(e.target.dataset.index);
      localStorage.setItem(
        'selectedSeats',
        JSON.stringify(appState.selectedSeats)
      );
    } else {
      appState.seatsCount -= 1;
      appState.selectedSeats = appState.selectedSeats.filter(
        (seat) => seat !== e.target.dataset.index
      );
      localStorage.setItem(
        'selectedSeats',
        JSON.stringify(appState.selectedSeats)
      );
    }

    localStorage.setItem('seatCount', appState.seatsCount);
  }
});

// Load data from localStorage and update UI
function populateUI() {
  appState.seatsCount = Number(localStorage.getItem('seatCount')) || 0;
  appState.screenTitle =
    localStorage.getItem('screenTitle') || 'Avengers Endgame';
  appState.ticketPrice = Number(localStorage.getItem('ticketPrice')) || 10;
  appState.selectedSeats =
    JSON.parse(localStorage.getItem('selectedSeats')) || [];

  movieSelect.selectedIndex = localStorage.getItem('selectedIndex') || 0;

  for (let seat of appState.selectedSeats) {
    document.querySelector(`[data-index='${seat}']`).classList.add('selected');
  }
}

populateUI();
