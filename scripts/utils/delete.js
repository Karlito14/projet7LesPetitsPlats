const deleteWithIcon = (input, icon) => {
    const inputElement = input;
    inputElement.value = '';
    inputElement.focus();
    icon.classList.add('opacity-0');
};

const displayCloseIcon = (input, icon) => {
    if (input.length > 0) {
        icon.classList.remove('opacity-0');
    } else {
        icon.classList.add('opacity-0');
    }
};

export { displayCloseIcon, deleteWithIcon };
