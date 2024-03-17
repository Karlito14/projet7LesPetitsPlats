/* eslint-disable import/extensions */
import recipes from '../data/recipes.js';
import displayRecipes from './script.js';

const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');

displayRecipes(recipes);

searchBar.addEventListener('input', (event) => {
    event.preventDefault();

    let recipesFiltered = [...recipes];

    const valueInput = event.target.value;

    if (valueInput.length > 0) {
        closeIcon.classList.remove('opacity-0');
    } else {
        closeIcon.classList.add('opacity-0');
    }

    if (valueInput.length >= 3) {
        recipesFiltered = recipes.filter((element) => {
            if (element.name.includes(valueInput)) {
                return true;
            }

            if (element.description.includes(valueInput)) {
                return true;
            }

            return element.ingredients.forEach((item) => item.ingredient.includes(valueInput));
        });
    }
    displayRecipes(recipesFiltered);
});

closeIcon.addEventListener('click', () => {
    searchBar.value = '';
    searchBar.focus();
    closeIcon.classList.add('opacity-0');
    displayRecipes(recipes);
});