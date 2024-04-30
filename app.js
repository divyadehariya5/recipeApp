let searchBox = document.querySelector(".searchBox");
let searchBtn = document.querySelector(".searchBtn");
let recipeContainer = document.querySelector(".recipe-container");
let recipeDetails = document.querySelector(".recipe-details");
let recipeDetailsContent = document.querySelector(".recipe-detail-content");
let recipeCloseBtn = document.querySelector(".recipe-close-btn");

let fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    let response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      let recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `<img src="${meal.strMealThumb}"/>
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;

      let button = document.createElement("button");
      button.textContent = "View Recipe";

      recipeDiv.appendChild(button);
      // adding addEventListener to recipe button

      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
  }
};

let fetcIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      let measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

let openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `<h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class"ingredientList">${fetcIngredients(meal)}</ul>
  <div class="recipeInstructions">
  <h3>Instructions:</h3>
  <p >${meal.strInstructions}</p>
  </div> `;

  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = "<h2>Type The meal in the search box. </h2>";
    return;
  }
  fetchRecipes(searchInput);
});
