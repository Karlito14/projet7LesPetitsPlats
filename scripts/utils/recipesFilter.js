export default (inputValue, array) => {
    const recipesFiltering = array.filter((element) => {
        if (element.name.toUpperCase().includes(inputValue)) {
            return true;
        }

        if (element.description.toUpperCase().includes(inputValue)) {
            return true;
        }

        for (let i = 0; i < element.ingredients.length; i += 1) {
            const ingredient = element.ingredients[i].ingredient.toUpperCase();
            if (ingredient.includes(inputValue)) {
                return true;
            }
        }
        return null;
    });
    return recipesFiltering;
};