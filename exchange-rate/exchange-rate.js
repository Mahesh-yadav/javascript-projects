const currency_one = document.querySelector('#currency-one');
const currency_two = document.querySelector('#currency-two');
const amount_one = document.querySelector('#amount-one');
const amount_two = document.querySelector('#amount-two');
const swap_btn = document.querySelector('#swap');
const rate_text = document.querySelector('#rate');

let exchange_rates = null;

// Fetch data on initial load
fetchExchangeRates();

// Event Listners
amount_one.addEventListener('input', updateUI);
currency_two.addEventListener('change', updateUI);
currency_one.addEventListener('change', (e) => {
  fetchExchangeRates(e.target.value);
});
swap_btn.addEventListener('click', () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  fetchExchangeRates(currency_one.value);
});

async function fetchExchangeRates(currency_code = 'USD') {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency_code}`
    );
    const data = await response.json();

    exchange_rates = data.rates;
    updateUI();
  } catch (error) {
    exchange_rates = null;
  }
}

function updateUI() {
  if (!exchange_rates) {
    rate_text.innerText = 'Exchange Rate Data Not Available';
    rate_text.classList.add('rate-error');
    amount_two.innerText = '---';
  } else {
    rate_text.innerText = `1 ${currency_one.value} = ${
      exchange_rates[currency_two.value]
    } ${currency_two.value}`;
    amount_two.innerText = `${(
      amount_one.value * exchange_rates[currency_two.value]
    ).toFixed(2)}`;
    rate_text.classList.remove('rate-error');
  }
}
