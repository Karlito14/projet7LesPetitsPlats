const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

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

export default (optionList, array, inputValue) => {
    const arrayFiltered = filterInput(inputValue, array);

    const lastOption = optionList.at(-1);

    if (optionList.length === 0) {
        return arrayFiltered;
    }

    const inTheArray = [];
    const recipesFiltered = [];

    arrayFiltered.forEach((element) => {
        const { appliance, ustensils, ingredients } = element;

        if (lastOption.includes(appliance)) {
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