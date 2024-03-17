/* eslint-disable import/extensions */
import recipes from '../data/recipes.js';
import displayRecipes from './script.js';

const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');

displayRecipes(recipes);

const deleteWithIcon = () => {
    searchBar.value = '';
    searchBar.focus();
    closeIcon.classList.add('opacity-0');
    displayRecipes(recipes);
};

const recipesFilter = (inputValue, array) => {
    const recipesFiltering = array.filter((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            return true;
        }

        if (element.description.toUpperCase().includes(inputValue)) {
            return true;
        }

        for (let i = 0; i < element.ingredients.length; i += 1) {
            const ingredient = element.ingredients[i].ingredient.toUpperCase();
            if (ingredient.includes(inputValue)) {
                return true;
            }
        }
        return null;
    });
    return recipesFiltering;
};

searchBar.addEventListener('input', (event) => {
    event.preventDefault();

    let recipesFiltered = [];

    const valueInput = event.target.value.trim().toUpperCase();

    if (valueInput.length > 0) {
        closeIcon.classList.remove('opacity-0');
    } else {
        closeIcon.classList.add('opacity-0');
    }

    if (valueInput.length >= 3) {
        recipesFiltered = recipesFilter(valueInput, recipes);
    } else {
        recipesFiltered = [...recipes];
    }

    displayRecipes(recipesFiltered);
});

searchBar.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
});

closeIcon.addEventListener('click', deleteWithIcon);
