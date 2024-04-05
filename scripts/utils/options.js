const optionsFilter = (array) => {
    const appliance = [];
    const ustensils = [];
    const ingredients = [];

    array.forEach((recipe) => {
        if (!appliance.includes(recipe.appliance)) {
            appliance.push(recipe.appliance);
        }

        recipe.ustensils.forEach((ustensil) => {
            if (!ustensils.includes(ustensil)) {
                ustensils.push(ustensil);
            }
        });

        recipe.ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;
            if (!ingredients.includes(ingredientName)) {
                ingredients.push(ingredientName);
            }
        });
    });

    return [appliance, ustensils, ingredients];
};

const filterBySearchOption = (array, value) => {
    const updateOptions = array.filter((element) =>
        element.toUpperCase().includes(value),
    );
    return updateOptions;
};

export { optionsFilter, filterBySearchOption };
