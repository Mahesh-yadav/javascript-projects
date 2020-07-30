const transactionsEl = document.querySelector('#transactions');
const balanceEl = document.querySelector('#balance');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');

const dummyTransactions = [
  { id: 1, title: 'Flower', amount: 20, type: 'expense' },
  { id: 2, title: 'Salary', amount: 300, type: 'income' },
  { id: 3, title: 'Book', amount: 10, type: 'expense' },
  { id: 4, title: 'Camera', amount: 150, type: 'income' },
];

let transactions = dummyTransactions;
let totalIncome = 450;
let totalExpenses = 30;

renderTransactions();
showBalIncExpenses();

// display balance, income and expenses
function showBalIncExpenses() {
  balanceEl.innerText = `$${totalIncome - totalExpenses}`;
  incomeEl.innerText = `$${totalIncome}`;
  expenseEl.innerText = `$${totalExpenses}`;
}

// Render transactions
function renderTransactions() {
  if (transactions.length > 0) {
    transactionsEl.innerHTML = `
      ${transactions
        .map(
          (transaction) => `
        <li class="${
          'transaction ' + (transaction.type === 'income' ? 'plus' : 'minus')
        }">
          <button class="btn-delete">X</button>
          <span>${transaction.title}</span>
          <span>${
            (transaction.type === 'income' ? '+' : '-') + transaction.amount
          }</span>
        </li>
      `
        )
        .join('')}
    `;
  }
}
