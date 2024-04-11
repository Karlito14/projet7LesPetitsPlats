const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const recipesFiltering = [];

    for (let i = 0; i < array.length; i += 1) {
        const element = array[i];
        if (element.name.toUpperCase().includes(inputValue)) {
            recipesFiltering.push(element);
        } else if (element.description.toUpperCase().includes(inputValue)) {
            recipesFiltering.push(element);
        } else {
            for (let j = 0; j < element.ingredients.length; j += 1) {
                const ingredient = element.ingredients[j].ingredient.toUpperCase();
                if (ingredient.includes(inputValue)) {
                    recipesFiltering.push(element);
                }
            }
        }
    }

    return recipesFiltering;
};

export default (optionList, array, inputValue) => {
    let arrayFiltered = filterInput(inputValue, array);

    if (optionList.length === 0) {
        return arrayFiltered;
    }

    let inTheArray = [];
    let recipesFiltered = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const option of optionList) {
        recipesFiltered = [];
        inTheArray = [];
        // eslint-disable-next-line no-loop-func
        for (let i = 0; i < arrayFiltered.length; i += 1) {
            const element = arrayFiltered[i];
            const { appliance, ustensils, ingredients } = element;

            if (option.includes(appliance.toUpperCase())) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            } else if (
                ustensils.some((ustensil) => option.includes(ustensil.toUpperCase()))
            ) {
                if (!inTheArray.includes(element.name)) {
                    recipesFiltered.push(element);
                    inTheArray.push(element.name);
                }
            } else {
                for (let j = 0; j < ingredients.length; j += 1) {
                    const ingredientName = ingredients[j].ingredient.toUpperCase();

                    if (option.includes(ingredientName)) {
                        if (!inTheArray.includes(element.name)) {
                            recipesFiltered.push(element);
                            inTheArray.push(element.name);
                        }
                    }
                }
            }
        }
        arrayFiltered = [...recipesFiltered];
    }

    return recipesFiltered;
};
