const recipesSection = document.querySelector('#recipesSection');
const template = document.querySelector('#article');
const recipesNumber = document.querySelector('#recipesNumber');

export default (data, value) => {
    recipesSection.innerHTML = '';
    recipesNumber.textContent = `${data.length} recettes`;

    let error = document.querySelector('#error');
    error?.remove();

    data?.forEach((element) => {
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

        element.ingredients.forEach((item) => {
            const elLi = document.createElement('li');
            const ingredientTitle = document.createElement('h5');
            ingredientTitle.setAttribute('class', 'font-semibold text-sm');
            ingredientTitle.textContent = item.ingredient;

            elLi.appendChild(ingredientTitle);

            if (item.quantity) {
                const spanQuantity = document.createElement('span');
                spanQuantity.setAttribute('aria-label', 'quantité');
                spanQuantity.classList.add('text-neutral-500');
                spanQuantity.textContent = `${item.quantity} ${item.unit ?? ''}`;
                elLi.appendChild(spanQuantity);
            }

            elList.appendChild(elLi);
        });

        recipesSection.appendChild(clone);
    });

    if (data.length === 0) {
        error = document.createElement('p');
        error.setAttribute('id', 'error');
        error.setAttribute('class', 'text-xl font-bold text-center');
        error.textContent = `Aucune recette ne contient ${value} vous pouvez chercher «
        tarte aux pommes », « poisson », etc`;
        recipesSection.after(error);
    }
};