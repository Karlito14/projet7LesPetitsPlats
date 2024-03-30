/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import recipesList from '../../data/recipes.js';
import displayRecipes from '../templates/displayRecipes.js';
import { filterByInput, filterByOption } from '../utils/recipesFilter.js';
import { deleteWithIcon, displayCloseIcon } from '../utils/delete.js';
import { optionsFilter, filterBySearchOption } from '../utils/options.js';
import {
    displayOptions,
    forEachList,
    closeDivOptions,
    displayOptionSelected,
} from '../templates/displayOptions.js';

const body = document.querySelector('body');
const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');
const optionIngredients = document.querySelector('[data-name = ingredients]');
const optionAppliance = document.querySelector('[data-name = appliance]');
const optionUstensils = document.querySelector('[data-name = ustensils]');
const options = [optionIngredients, optionUstensils, optionAppliance];

let updatedList = [...recipesList];
let valueInputUpdated = '';
const optionSelectedList = [];

body.addEventListener('click', () => {
    closeDivOptions();
});

displayRecipes(updatedList);
let [appliances, ustensils, ingredients] = optionsFilter(updatedList);

searchBar.addEventListener('input', (event) => {
    searchBar.setCustomValidity('');
    searchBar.checkValidity();

    valueInputUpdated = event.target.value.trim().toUpperCase();

    displayCloseIcon(valueInputUpdated, closeIcon);

    if (valueInputUpdated.length >= 3 || valueInputUpdated.length === 0) {
        updatedList = filterByInput(valueInputUpdated, recipesList);
    }

    if (optionSelectedList.length > 0) {
        updatedList = filterByOption(optionSelectedList, updatedList);
    }

    displayRecipes(updatedList, valueInputUpdated);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);
});

searchBar.addEventListener('invalid', () => {
    searchBar.setCustomValidity(
        'Veuillez saisir uniquement des lettres et des espaces',
    );
});

searchBar.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
    }
});

closeIcon.addEventListener('click', () => {
    valueInputUpdated = '';
    deleteWithIcon(searchBar, closeIcon);
    updatedList = filterByInput(valueInputUpdated, recipesList);
    if (optionSelectedList.length > 0) {
        updatedList = filterByOption(optionSelectedList, updatedList);
    }
    displayRecipes(updatedList);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);
});

options.forEach((option) => {
    option.addEventListener('click', (event) => {
        const nameOption = event.currentTarget.dataset.name;
        event.stopPropagation();
        let availableOptions;

        if (nameOption === 'ingredients') {
            availableOptions = ingredients;
        } else if (nameOption === 'appliance') {
            availableOptions = appliances;
        } else {
            availableOptions = ustensils;
        }

        const divOptions = document.querySelector(`#div-option-${option.dataset.name}`);
        const iconChevron = document.querySelector(`#icon-${option.dataset.name}`);
        iconChevron.classList.toggle('rotate-180');

        if (divOptions) {
            divOptions.remove();
        } else {
            displayOptions(availableOptions, option);
        }

        const inputOption = document.querySelector('#input-option');
        const iconOption = document.querySelector('#icon-option');
        const optionClicked = iconOption?.closest('div');

        if (optionClicked) {
            elementLiClick(optionClicked, recipesList);
        }

        inputOption?.addEventListener('input', () => {
            const valueInput = inputOption.value.trim().toUpperCase();

            displayCloseIcon(valueInput, iconOption);

            const updatedOptions = filterBySearchOption([...availableOptions], valueInput);

            forEachList(updatedOptions, optionClicked);

            elementLiClick(optionClicked, recipesList);
        });

        iconOption?.addEventListener('click', () => {
            deleteWithIcon(inputOption, iconOption);
            forEachList(availableOptions, optionClicked);
            elementLiClick(optionClicked, recipesList);
        });
    });
});

// Functions
function elementLiClick(ulElement, array) {
    let list = [];
    const allElementsLi = ulElement.querySelectorAll('li');
    allElementsLi.forEach((item) => {
        item.addEventListener('click', () => {
            const spanOptionSelected = displayOptionSelected(item);
            const iconCloseSpan = spanOptionSelected.querySelector('i');

            if (!optionSelectedList.includes(item.textContent.toUpperCase())) {
                optionSelectedList.push(item.textContent.toUpperCase());
            }

            list = filterByInput(valueInputUpdated.toUpperCase(), array);
            list = filterByOption(optionSelectedList, list);
            updatedList = [...list];

            displayRecipes(list);
            [appliances, ustensils, ingredients] = optionsFilter(list);

            iconCloseSpan.addEventListener('click', () => {
                spanOptionSelected.remove();
                const indexOption = optionSelectedList.indexOf(
                    item.textContent.toUpperCase(),
                );
                optionSelectedList.splice(indexOption, 1);

                list = filterByInput(valueInputUpdated.toUpperCase(), array);
                list = filterByOption(optionSelectedList, list);
                // updatedList = [...list];

                displayRecipes(list);
                [appliances, ustensils, ingredients] = optionsFilter(list);
            });
        });
    });
}
