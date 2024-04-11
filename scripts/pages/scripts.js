/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import recipesList from '../../data/recipes.js';
import displayRecipes from '../templates/displayRecipes.js';
import filterRecipes from '../utils/recipesFilter.js';
import { deleteWithIcon, displayCloseIcon } from '../utils/delete.js';
import { optionsFilter, filterBySearchOption } from '../utils/options.js';
import {
    displayOptions,
    forEachList,
    closeDivOptions,
    displayOptionSelected,
} from '../templates/displayOptions.js';

/* ******************** DOM elements ******************** */
const body = document.querySelector('body');
const searchBar = document.querySelector('#searchBar');
const closeIcon = document.querySelector('#closeIcon');
const optionIngredients = document.querySelector('[data-name = ingredients]');
const optionAppliance = document.querySelector('[data-name = appliance]');
const optionUstensils = document.querySelector('[data-name = ustensils]');
const options = [optionIngredients, optionUstensils, optionAppliance];

let valueInputUpdated = '';
const optionSelectedList = JSON.parse(localStorage.getItem("options")) || [];
let updatedList = [...recipesList];
const index = 6;
let recipesNumberToDisplay = index;

if(optionSelectedList.length > 0) {
    updatedList = filterRecipes(
        optionSelectedList,
        recipesList,
        valueInputUpdated,
    );

    optionSelectedList.forEach((element) => {
        const spanOption = displayOptionSelected(element);
        const iconCloseOption = spanOption.querySelector('i');
        iconCloseOption.addEventListener('click', () => {
            closeSpanOption(spanOption);
        })
    })
}

displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
let [appliances, ustensils, ingredients] = optionsFilter(updatedList);

/* ******************** Event Listeners ******************** */
body.addEventListener('click', () => {
    closeDivOptions();
});

searchBar.addEventListener('input', (event) => {
    recipesNumberToDisplay = index;
    eventInputSearchBar(event);
});

window.addEventListener('scroll', () => {
    const pageHeight = window.innerHeight;
    const positionScroll = document.documentElement.scrollTop;
    const pageHeightTotal = document.documentElement.offsetHeight;
    
    if (pageHeight + positionScroll >= pageHeightTotal && recipesNumberToDisplay < updatedList.length) {
        recipesNumberToDisplay += index;
        displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
    }
})

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

closeIcon.addEventListener('click', eventCloseIcon);

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

        const divOptions = document.querySelector(
            `#div-option-${option.dataset.name}`,
        );
        const iconChevron = document.querySelector(
            `#icon-${option.dataset.name}`,
        );
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
            elementLiClick(optionClicked);
        }

        inputOption?.addEventListener('input', () => {
            const valueInput = inputOption.value.trim().toUpperCase();

            displayCloseIcon(valueInput, iconOption);

            const updatedOptions = filterBySearchOption(
                [...availableOptions],
                valueInput,
            );

            forEachList(updatedOptions, optionClicked);

            elementLiClick(optionClicked);
        });

        iconOption?.addEventListener('click', () => {
            deleteWithIcon(inputOption, iconOption);
            forEachList(availableOptions, optionClicked);
            elementLiClick(optionClicked);
        });
    });
});

/* ******************** Functions ******************** */
function elementLiClick(ulElement) {
    const allElementsLi = ulElement.querySelectorAll('li');
    allElementsLi.forEach((item) => {
        item.addEventListener('click', () => {
            const spanOptionSelected = displayOptionSelected(item.textContent);
            const iconCloseSpan = spanOptionSelected.querySelector('i');

            optionSelectedList.push(item.textContent.toUpperCase());
            localStorage.setItem("options", JSON.stringify(optionSelectedList));

            updatedList = filterRecipes(
                optionSelectedList,
                updatedList,
                valueInputUpdated,
            );

            recipesNumberToDisplay = index;

            displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
            [appliances, ustensils, ingredients] = optionsFilter(updatedList);

            closeDivOptions();

            iconCloseSpan.addEventListener('click', () => {
                closeSpanOption(spanOptionSelected);
            });
        });
    });
}

function eventInputSearchBar(event) {
    searchBar.setCustomValidity('');
    searchBar.checkValidity();

    valueInputUpdated = event.target.value.trim().toUpperCase();

    displayCloseIcon(valueInputUpdated, closeIcon);

    if (valueInputUpdated.length >= 3 || valueInputUpdated.length === 0) {
        updatedList = filterRecipes(
            optionSelectedList,
            recipesList,
            valueInputUpdated,
        );
    }

    displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);
}

function eventCloseIcon() {
    valueInputUpdated = '';
    deleteWithIcon(searchBar, closeIcon);
    updatedList = filterRecipes(
        optionSelectedList,
        recipesList,
        valueInputUpdated,
    );

    recipesNumberToDisplay = index;

    displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);
}

function closeSpanOption (spanOption) {
    const indexOption = optionSelectedList.indexOf(
        spanOption.textContent.toUpperCase(),
    );
    optionSelectedList.splice(indexOption, 1);
    localStorage.setItem("options", JSON.stringify(optionSelectedList));

    updatedList = filterRecipes(
        optionSelectedList,
        recipesList,
        valueInputUpdated,
    );

    recipesNumberToDisplay = index;

    displayRecipes(updatedList, valueInputUpdated, recipesNumberToDisplay);
    [appliances, ustensils, ingredients] = optionsFilter(updatedList);

    spanOption.remove();
}
