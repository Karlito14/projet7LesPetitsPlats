const filterInput = (inputValue, array) => {
    if (inputValue === '') {
        return array;
    }

    const recipesFiltering = array.filter((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            return true;
        }

        if (element.description.toUpperCase().includes(inputValue)) {
            return true;
        }

        return element.ingredients.some((ingredient) => {
            const ingredientName = ingredient.ingredient.toUpperCase();
            return ingredientName.includes(inputValue);
        });
    });
    return recipesFiltering;
};

export default (optionList, array, inputValue) => {
    let arrayFiltered = filterInput(inputValue, array);

    if (optionList.length === 0) {
        return arrayFiltered;
    }

    let inTheArray = [];
    let recipesFiltered = []; 

    for (const option of optionList) {
        recipesFiltered = [];
        inTheArray = [];
        // eslint-disable-next-line no-loop-func
        arrayFiltered.forEach((element) => {
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
                ingredients.forEach((ingredient) => {
                    const ingredientName = ingredient.ingredient.toUpperCase();

                    if (option.includes(ingredientName)) {
                        if (!inTheArray.includes(element.name)) {
                            recipesFiltered.push(element);
                            inTheArray.push(element.name);
                        }
                    }
                });
            }
            arrayFiltered = [...recipesFiltered];
        }); 
        
    }
    return recipesFiltered;
};
