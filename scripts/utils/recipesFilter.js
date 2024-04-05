const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const recipesFiltering = [];

    array.forEach((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            recipesFiltering.push(element);
        } else if (element.description.toUpperCase().includes(inputValue)) {
            recipesFiltering.push(element);
        } else {
            element.ingredients.forEach((item) => {
                const ingredient = item.ingredient.toUpperCase();
                if (ingredient.includes(inputValue)) {
                    recipesFiltering.push(element);
                }
            });
        }
    });

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

    arrayFiltered.forEach((element) => {
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
    });

    return recipesFiltered;
};