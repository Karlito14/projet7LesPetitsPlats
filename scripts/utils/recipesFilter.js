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
    const arrayFiltered = filterInput(inputValue, array);

    if (optionList.length === 0) {
        return arrayFiltered;
    }

    const lastOption = optionList.at(-1);

    const inTheArray = [];
    const recipesFiltered = [];

    for (let i = 0; i < arrayFiltered.length; i += 1) {
        const element = arrayFiltered[i];
        const { appliance, ustensils, ingredients } = element;

        if (lastOption.includes(appliance.toUpperCase())) {
            if (!inTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                inTheArray.push(element.name);
            }
        } else if (ustensils.some((ustensil) => lastOption.includes(ustensil.toUpperCase()))) {
            if (!inTheArray.includes(element.name)) {
                recipesFiltered.push(element);
                inTheArray.push(element.name);
            }
        } else {
            ingredients.forEach((ingredient) => {
                const ingredientName = ingredient.ingredient.toUpperCase();

                if (lastOption.includes(ingredientName)) {
                    if (!inTheArray.includes(element.name)) {
                        recipesFiltered.push(element);
                        inTheArray.push(element.name);
                    }
                }
            });
        }
    }

    return recipesFiltered;
};