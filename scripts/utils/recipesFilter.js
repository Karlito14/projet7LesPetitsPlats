const filterByInput = (inputValue, array) => {
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

const filterByOption = (optionValue, array, option) => {
    const recipesFiltered = [];
    if (option === 'appliance') {
        array.forEach((recipe) => {
            if (recipe.appliance === optionValue) {
                recipesFiltered.push(recipe);
            }
        });
    }

    if (option === 'ustensils') {
        array.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (ustensil === optionValue) {
                    recipesFiltered.push(recipe);
                }
            });
        });
    }

    if (option === 'ingredients') {
        array.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient === optionValue) {
                    recipesFiltered.push(recipe);
                }
            });
        });
    }

    return recipesFiltered;
};

export { filterByInput, filterByOption };