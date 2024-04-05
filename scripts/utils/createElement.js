export default (element, className, textContent, id) => {
    const elementCreated = document.createElement(element);

    if (className) {
        elementCreated.setAttribute('class', className);
    }

    if (textContent) {
        elementCreated.textContent = textContent;
    }

    if (id) {
        elementCreated.setAttribute('id', id);
    }

    return elementCreated;
};
