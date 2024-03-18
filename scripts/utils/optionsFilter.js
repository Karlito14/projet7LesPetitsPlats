export default (array, option) => {
    const appliance = [];
    const ustensils = [];
    const ingredients = [];

    array.forEach((recipe) => {
        if (option === 'appliance') {
            if (!appliance.includes(recipe.appliance)) {
                appliance.push(recipe.appliance);
            }
        }

        if (option === 'ustensils') {
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil)) {
                    ustensils.push(ustensil);
                }
            });
        }

        if (option === 'ingredients') {
            recipe.ingredients.forEach((ingredient) => {
                if (!ingredients.includes(ingredient.ingredient)) {
                    ingredients.push(ingredient.ingredient);
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