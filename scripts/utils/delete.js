export default (input, icon) => {
    const inputElement = input;
    inputElement.value = '';
    inputElement.focus();
    icon.classList.add('opacity-0');
};