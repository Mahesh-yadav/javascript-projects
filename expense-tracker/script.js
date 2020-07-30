const transactionsEl = document.querySelector('#transactions');
const balanceEl = document.querySelector('#balance');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');
const form = document.querySelector('#add-form');
const titleInput = document.querySelector('#title');
const amountInput = document.querySelector('#amount');
const radioBtnIncome = document.querySelector('#income-radio');

const localData = localStorage.getItem('transactions');

let transactions = localData ? JSON.parse(localData) : [];
let idCounter = localData ? transactions[transactions.length - 1].id : 0;

loadTransactions();
showBalIncExpenses();

function saveData(data) {
  localStorage.setItem('transactions', JSON.stringify(data));
}

// render transactions
function loadTransactions() {
  for (let transaction of transactions) {
    renderTransaction(transaction);
  }
}

// Add transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const amount = parseFloat(amountInput.value);
  const type = getTransactionType();

  const transaction = {
    id: idCounter + 1,
    title,
    amount,
    type,
  };

  transactions.push(transaction);
  saveData(transactions);
  renderTransaction(transaction);
  showBalIncExpenses();

  idCounter++;
  titleInput.value = '';
  amountInput.value = 0;
  radioBtnIncome.checked = true;
});

// delete transaction
transactionsEl.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    const id = Number(e.target.dataset.id);

    const liElem = document.getElementById(`${id}`);
    liElem.remove();

    transactions = transactions.filter((t) => t.id !== id);
    saveData(transactions);

    showBalIncExpenses();
  }
});

// get transaction type
function getTransactionType() {
  const radioElems = document.querySelectorAll('input[name="type"]');

  for (let radio of radioElems) {
    if (radio.checked) {
      return radio.value;
    }
  }
}

// display balance, income and expenses
function showBalIncExpenses() {
  const income = transactions.reduce(
    (acc, transaction) =>
      transaction.type === 'income' ? acc + transaction.amount : acc,
    0
  );

  const expense = transactions.reduce(
    (acc, transaction) =>
      transaction.type === 'expense' ? acc + transaction.amount : acc,
    0
  );

  balanceEl.innerText = `$${(income - expense).toFixed(2)}`;
  incomeEl.innerText = `$${income.toFixed(2)}`;
  expenseEl.innerText = `$${expense.toFixed(2)}`;
}

// Render transaction
function renderTransaction(transaction) {
  const liElem = document.createElement('li');
  liElem.classList.add('transaction');
  liElem.classList.add(transaction.type === 'income' ? 'plus' : 'minus');
  liElem.id = transaction.id;

  liElem.innerHTML = `
    <button type="button" class="btn-delete" data-id=${
      transaction.id
    }>X</button>
    <span>${transaction.title}</span>
    <span>${
      (transaction.type === 'income' ? '+' : '-') + transaction.amount
    }</span>
  `;

  transactionsEl.append(liElem);
}
