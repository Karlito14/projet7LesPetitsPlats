const optionsFilter = (array) => {
    const appliance = [];
    const ustensils = [];
    const ingredients = [];

    for (let i = 0; i < array.length; i += 1) {
        const recipe = array[i];

        if (!appliance.includes(recipe.appliance)) {
            appliance.push(recipe.appliance);
        }

        recipe.ustensils.forEach((ustensil) => {
            if (!ustensils.includes(ustensil)) {
                ustensils.push(ustensil);
            }
        });

        for (let j = 0; j < recipe.ingredients.length; j += 1) {
            const ingredient = recipe.ingredients[j];
            const ingredientName = ingredient.ingredient;
            if (!ingredients.includes(ingredientName)) {
                ingredients.push(ingredientName);
            }
        }
    }

    return [appliance, ustensils, ingredients];
};

const filterBySearchOption = (array, value) => {
    const updateOptions = array.filter((element) => element.toUpperCase().includes(value));
    return updateOptions;
};

export { optionsFilter, filterBySearchOption };