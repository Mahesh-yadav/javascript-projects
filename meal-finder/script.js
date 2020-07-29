const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const searchResultInfo = document.querySelector('#search-result-info');
const mealsWrapper = document.querySelector('#meal-list');
const mealDetailsWrapper = document.querySelector('#meal-details');
const btnRandom = document.querySelector('#btn-random');

const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
let selectedMeal = null;
let meals;

// get random meal and display
btnRandom.addEventListener('click', async () => {
  const randomMeals = await fetchMeals(`${baseUrl}random.php`);
  searchResultInfo.innerText = '';
  meals = null;
  displayMeals();
  selectedMeal = randomMeals[0];
  displayMealDetails();
});

// handle click for dispaly meal details
mealsWrapper.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-position')) {
    selectedMeal = meals[Number(e.target.dataset.position)];
    displayMealDetails();
  }
});

// Handle search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchValue = searchInput.value.trim();

  meals = await fetchMeals(`${baseUrl}search.php?s=${searchValue}`);

  if (!meals) {
    searchResultInfo.innerText = 'There are no search results. Try again!';
  } else {
    searchResultInfo.innerText = `Search results for "${searchValue}":`;
    displayMeals();
    selectedMeal = null;
    displayMealDetails();
  }
  searchInput.value = '';
});

// display meal details
function displayMealDetails() {
  if (selectedMeal) {
    const ingredients = getIngredients(selectedMeal);
    mealDetailsWrapper.style.visibility = 'visible';
    mealDetailsWrapper.innerHTML = `
    <div class="meal-header">
      <img src=${selectedMeal.strMealThumb} />
      <div class="meal-info">
        <div>
          <h2>${selectedMeal.strMeal}</h2>
        </div>
        <div>
          <p>${selectedMeal.strCategory}</p>
          <p>${selectedMeal.strArea}</p>
        </div>
        <a class="youtube" href=${selectedMeal.strYoutube}>
          <i class="fab fa-youtube"></i>
        </a>
      </div>
    </div>
    <div class="ingredients">
      <h2>Ingredients</h2>
      <div class="ingredients-wrapper">
        <div class="ingredient-icons">
          ${ingredients
            .map(
              (ingredient) => `
              <img src=${`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                ingredient.name
              )}-Small.png`}>
            `
            )
            .join('')}
        </div>
        <ul>
          ${ingredients
            .map(
              (ingredient) => `
                <li>
                  ${ingredient.name} - <span>${ingredient.quantity}</span>
                </li>
                `
            )
            .join('')}
        </ul>
      </div>
    </div>
    <div class="instructions">
      <h2>Instructions</h2>
      <ol>
            ${selectedMeal.strInstructions
              .split('\r\n')
              .map((instruction) => {
                if (instruction) {
                  return `
                    <li>${instruction}</li>
                  `;
                }
              })
              .join('')}
      </ol>
    </div>
  `;
  } else {
    mealDetailsWrapper.style.visibility = 'hidden';
    mealDetailsWrapper.innerHTML = '';
  }
}

// parse ingredients
function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        name: meal[`strIngredient${i}`],
        quantity: meal[`strMeasure${i}`],
      });
    }
  }

  return ingredients;
}

// list meals thumbnail and title
function displayMeals() {
  if (meals) {
    mealsWrapper.innerHTML = `
    ${meals
      .map(
        (meal, index) => `
      <div class="meal">
        <img src=${meal.strMealThumb + '/preview'} />
        <h3 class="name" data-position=${index}>${meal.strMeal}</h3>
      </div>
    `
      )
      .join('')}
  `;
  } else {
    mealsWrapper.innerHTML = '';
  }
}

// Fetch meals
async function fetchMeals(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.meals;
  } catch (error) {
    return null;
  }
}
