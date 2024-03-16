// eslint-disable-next-line import/extensions
import recipes from '../data/recipes.js';

const recipesSection = document.querySelector('#recipesSection');
const template = document.querySelector('#article');
const recipesNumber = document.querySelector('#recipesNumber');

const displayRecipes = (data) => {
    recipesNumber.textContent = `${data.length} recettes`;
    data.forEach((element) => {
        const clone = template.content.cloneNode(true);
        const elTime = clone.querySelector('#recipeTime');
        const elTitle = clone.querySelector('#recipeTitle');
        const elImage = clone.querySelector('#recipeImage');
        const elDescription = clone.querySelector('#recipeDescription');
        const elList = clone.querySelector('#ingredientsList');

        const pathImage = `./assets/recettes/${element.image}`;

        elTime.textContent = `${element.time}min`;
        elTitle.textContent = element.name;
        elImage.setAttribute('src', pathImage);
        elImage.setAttribute('alt', element.name);
        elDescription.textContent = element.description;

        element.ingredients.forEach((ingredient) => {
            const elLi = document.createElement('li');
            const ingredientTitle = document.createElement('h5');
            ingredientTitle.setAttribute('class', 'font-semibold text-sm');
            ingredientTitle.textContent = ingredient.ingredient;

            elLi.appendChild(ingredientTitle);

            const spanQuantity = document.createElement('span');
            spanQuantity.setAttribute('aria-label', 'quantité');
            spanQuantity.classList.add('text-neutral-500');

            spanQuantity.textContent = `${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}`;

            elLi.appendChild(spanQuantity);

            elList.appendChild(elLi);
        });

        recipesSection.appendChild(clone);
    });
};

displayRecipes(recipes);

/*
const displayRecipes2 = (data) => {
    recipesNumber.textContent = `${data.length} recettes`;
    for(const recipe of data) {
        const clone = template.content.cloneNode(true);
        const elTime = clone.querySelector('#recipeTime');
        const elTitle = clone.querySelector('#recipeTitle');
        const elImage = clone.querySelector('#recipeImage');
        const elDescription = clone.querySelector('#recipeDescription');
        const elList = clone.querySelector('#ingredientsList');

        const pathImage = `./assets/recettes/${element.image}`;

        elTime.textContent = `${element.time}min`;
        elTitle.textContent = element.name;
        elImage.setAttribute('src', pathImage);
        elImage.setAttribute('alt', element.name);
        elDescription.textContent = element.description;

        for(const ingredient of element.ingredients) {
            const elLi = document.createElement('li');
            const ingredientTitle = document.createElement('h5');
            ingredientTitle.setAttribute('class', 'font-semibold text-sm');
            ingredientTitle.textContent = ingredient.ingredient;

            elLi.appendChild(ingredientTitle);

            const spanQuantity = document.createElement('span');
            spanQuantity.setAttribute('aria-label', 'quantité');
            spanQuantity.classList.add('text-neutral-500');

            spanQuantity.textContent = `${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}`;

            elLi.appendChild(spanQuantity);

            elList.appendChild(elLi);
        });

        recipesSection.appendChild(clone);
    });
};
*/