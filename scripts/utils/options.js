const optionsFilter = (array, option, value) => {
    const appliance = [];
    const ustensils = [];
    const ingredients = [];

    array.forEach((recipe) => {
        if (option === 'appliance') {
            if (!appliance.includes(recipe.appliance) && recipe.appliance.includes(value)) {
                appliance.push(recipe.appliance);
            }
        }

        if (option === 'ustensils') {
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil) && ustensil.includes(value)) {
                    ustensils.push(ustensil);
                }
            });
        }

        if (option === 'ingredients') {
            recipe.ingredients.forEach((ingredient) => {
                const ingredientName = ingredient.ingredient;
                if (!ingredients.includes(ingredientName) && ingredientName.includes(value)) {
                    ingredients.push(ingredientName);
                }
            });
        }

        return null;
    });

    switch (option) {
        case 'appliance':
            return appliance;
        case 'ustensils':
            return ustensils;
        case 'ingredients':
            return ingredients;
        default:
            return null;
    }
};

const filterBySearchOption = (array, value) => {
    const updateOptions = array.filter((element) => element.toUpperCase().includes(value));
    return updateOptions;
};

export { optionsFilter, filterBySearchOption };