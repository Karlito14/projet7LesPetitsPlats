/* eslint-disable import/extensions */
import recipesList from '../../data/recipes.js';
import displayRecipes from '../templates/displayRecipes.js';
import { filterByInput } from '../utils/recipesFilter.js';
import { deleteWithIcon, displayCloseIcon } from '../utils/delete.js';
import { optionsFilter, filterBySearchOption } from '../utils/options.js';
import { displayOptions, forEachList } from '../templates/displayOptions.js';

const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');
const optionIngredients = document.querySelector('[data-name = ingredients]');
const optionAppliance = document.querySelector('[data-name = appliance]');
const optionUstensils = document.querySelector('[data-name = ustensils]');
const options = [optionIngredients, optionUstensils, optionAppliance];

let updatedList = [...recipesList];

displayRecipes(updatedList);

searchBar.addEventListener('input', (event) => {
    const valueInput = event.target.value.trim();

    displayCloseIcon(valueInput, closeIcon);

    if (valueInput.length >= 3) {
        updatedList = filterByInput(valueInput.toUpperCase(), updatedList);
    } else {
        updatedList = [...recipesList];
    }

    displayRecipes(updatedList, valueInput);
});

searchBar.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
});

closeIcon.addEventListener('click', () => {
    deleteWithIcon(searchBar, closeIcon);
    updatedList = [...recipesList];
    displayRecipes(updatedList);
});

options.forEach((option) => {
    option.addEventListener(('click'), (event) => {
        const availableOptions = optionsFilter(updatedList, event.currentTarget.dataset.name);
        const divOptions = document.querySelector(`#div-option-${option.dataset.name}`);
        const iconChevron = document.querySelector(`#icon-${option.dataset.name}`);

        if (divOptions) {
            divOptions.remove();
            iconChevron.classList.remove('rotate-180');
        } else {
            iconChevron.classList.add('rotate-180');
            displayOptions(availableOptions, option);
        }

        const inputOption = document.querySelector('#input-option');
        const iconOption = document.querySelector('#icon-option');

        inputOption?.addEventListener('input', (e) => {
            const valueInput = inputOption.value.trim().toUpperCase();
            const optionClicked = e.target.closest('div');
            const ulElement = optionClicked.querySelector('ul');
            ulElement?.remove();

            displayCloseIcon(valueInput, iconOption);

            const updatedOptions = filterBySearchOption(availableOptions, valueInput);

            forEachList(updatedOptions, optionClicked);
        });

        iconOption?.addEventListener('click', () => {
            deleteWithIcon(inputOption, iconOption);
            displayOptions(availableOptions, option);
        });
    });
});