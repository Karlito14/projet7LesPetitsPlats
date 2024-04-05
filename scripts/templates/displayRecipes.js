/* eslint-disable import/extensions */
import createElement from '../utils/createElement.js';

const recipesSection = document.querySelector('#recipesSection');
const template = document.querySelector('#article');
const recipesNumber = document.querySelector('#recipesNumber');

const renderRecipe = (recipe) => {
    const clone = template.content.cloneNode(true);
    const elTime = clone.querySelector('#recipeTime');
    const elTitle = clone.querySelector('#recipeTitle');
    const elImage = clone.querySelector('#recipeImage');
    const elDescription = clone.querySelector('#recipeDescription');
    const elList = clone.querySelector('#ingredientsList');

    const pathImage = `./assets/recettes/${recipe.image}`;

    elTime.textContent = `${recipe.time}min`;
    elTitle.textContent = recipe.name;
    elImage.setAttribute('src', pathImage);
    elImage.setAttribute('alt', recipe.name);
    elDescription.textContent = recipe.description;

    recipe.ingredients.forEach((item) => {
        const elLi = document.createElement('li');
        const ingredientTitle = createElement(
            'h5',
            'font-semibold text-sm',
            item.ingredient,
            undefined,
        );

        elLi.appendChild(ingredientTitle);

        if (item.quantity) {
            const spanQuantity = createElement(
                'span',
                'text-neutral-500',
                `${item.quantity} ${item.unit ?? ''}`,
                undefined,
            );
            spanQuantity.setAttribute('aria-label', 'quantité');
            elLi.appendChild(spanQuantity);
        }

        elList.appendChild(elLi);
    });

    return clone;
};

export default (data, value) => {
    recipesSection.innerHTML = '';
    recipesNumber.textContent = `${data.length} recette${data.length > 1 ? 's' : ''}`;

    let error = document.querySelector('#error');
    error?.remove();

    if (data.length === 0) {
        error = createElement(
            'p',
            'text-xl font-bold text-center',
            `Aucune recette ne contient ${value} vous pouvez chercher «
        tarte aux pommes », « poisson », etc`,
            'error',
        );
        recipesSection.after(error);
    } else {
        data.forEach((element) => {
            const recipeElement = renderRecipe(element);
            recipesSection.appendChild(recipeElement);
        });
    }
};
