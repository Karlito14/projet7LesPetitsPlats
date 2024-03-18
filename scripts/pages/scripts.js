/* eslint-disable import/extensions */
import recipesList from '../../data/recipes.js';
import displayRecipes from '../templates/displayRecipes.js';
import recipesFilter from '../utils/recipesFilter.js';
import { deleteWithIcon, displayCloseIcon } from '../utils/delete.js';
import optionsFilter from '../utils/optionsFilter.js';
import displayOptions from '../templates/displayOptions.js';

const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');
const optionIngredients = document.querySelector('[data-name = ingredients]');
const optionAppliance = document.querySelector('[data-name = appliance]');
const optionUstensils = document.querySelector('[data-name = ustensils]');
const options = [optionIngredients, optionUstensils, optionAppliance];

displayRecipes(recipesList);

let updatedList = recipesList;

searchBar.addEventListener('input', (event) => {
    event.preventDefault();

    let recipesFiltered = [];

    const valueInput = event.target.value.trim().toUpperCase();

    displayCloseIcon(valueInput, closeIcon);

    if (valueInput.length >= 3) {
        recipesFiltered = recipesFilter(valueInput, recipesList);
    } else {
        recipesFiltered = [...recipesList];
    }

    updatedList = recipesFiltered;
    displayRecipes(recipesFiltered);
});

searchBar.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
});

closeIcon.addEventListener('click', () => {
    deleteWithIcon(searchBar, closeIcon);
    displayRecipes(recipesList);
    updatedList = recipesList;
});

options.forEach((option) => {
    option.addEventListener(('click'), (event) => {
        const availableOptions = optionsFilter(updatedList, event.currentTarget.dataset.name);
        displayOptions(availableOptions, event.currentTarget);

        const inputOption = document.querySelector('#input-option');
        const iconOption = document.querySelector('#icon-option');

        inputOption?.addEventListener('input', () => {
            const valueInput = inputOption.value.trim().toUpperCase();

            displayCloseIcon(valueInput, iconOption);
        });

        iconOption?.addEventListener('click', () => {
            deleteWithIcon(inputOption, iconOption);
        });
    });
});