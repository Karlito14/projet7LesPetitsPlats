const filterByInput = (inputValue, array) => {
    const recipesFiltering = array.filter((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            return true;
        }

        for (let i = 0; i < element.ingredients.length; i += 1) {
            const ingredient = element.ingredients[i].ingredient.toUpperCase();
            if (ingredient.includes(inputValue)) {
                return true;
            }
        }

        return element.description.toUpperCase().includes(inputValue);
    });
    return recipesFiltering;
};

const filterByOption = (optionList, array) => {
    const inTheArray = [];
    const recipesFiltered = [];

    array.forEach((element) => {
        const { appliance, ustensils, ingredients } = element;

        if (optionList.includes(appliance)) {
            if (!inTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                inTheArray.push(element.name);
            }
        } else if (ustensils.some((ustensil) => optionList.includes(ustensil.toUpperCase()))) {
            if (!inTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                inTheArray.push(element.name);
            }
        } else {
            ingredients.forEach((ingredient) => {
                const ingredientName = ingredient.ingredient.toUpperCase();

                if (optionList.includes(ingredientName)) {
                    if (!inTheArray.includes(element.name)) {
                        recipesFiltered.push(element);
                        inTheArray.push(element.name);
                    }
                }
            });
        }
    });

    return recipesFiltered.length > 0 ? recipesFiltered : array;
};

export { filterByInput, filterByOption };
