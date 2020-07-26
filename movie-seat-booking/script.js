const movieSelect = document.querySelector('#movie');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const screenTitle = document.querySelector('#title');

// Application state. The state is reactive, whenever state changes the associated DOM nodes are also updated.
const appState = {
  _price: 10,
  _count: 0,
  _title: 'Avengers Endgame',

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
  console.log(movieSelect.selectedIndex);
  appState.ticketPrice = Number(price);
  appState.screenTitle = title;
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
    } else {
      appState.seatsCount -= 1;
    }
  }
});
