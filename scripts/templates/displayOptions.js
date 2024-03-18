export default (array, optionDiv) => {
    let divOptions = document.querySelector(`#div-option-${optionDiv.dataset.name}`);
    const parentElement = optionDiv.closest('#div-parent');
    const iconChevron = document.querySelector(`#icon-${optionDiv.dataset.name}`);

    if (divOptions) {
        divOptions.remove();
        iconChevron.classList.remove('rotate-180');
    } else {
        iconChevron.classList.add('rotate-180');

        divOptions = document.createElement('div');
        divOptions.setAttribute('id', `div-option-${optionDiv.dataset.name}`);
        divOptions.classList.add('overflow-y-scroll');
        divOptions.classList.add('max-h-52');
        divOptions.classList.add('scrollbar');
        divOptions.classList.add('absolute');
        divOptions.classList.add('left-0');
        divOptions.classList.add('bg-white');
        divOptions.classList.add('z-10');
        divOptions.classList.add('w-48');
        divOptions.classList.add('rounded-bl-xl');
        divOptions.classList.add('rounded-br-xl');

        const inputSearch = document.createElement('input');
        inputSearch.setAttribute('type', 'text');
        inputSearch.setAttribute('id', 'input-option');
        inputSearch.setAttribute('autocomplete', 'off');
        inputSearch.classList.add('border-slate-300');
        inputSearch.classList.add('border-solid');
        inputSearch.classList.add('border');
        inputSearch.classList.add('block');
        inputSearch.classList.add('py-2');
        inputSearch.classList.add('pl-4');
        inputSearch.classList.add('pr-14');
        inputSearch.classList.add('my-3');
        inputSearch.classList.add('mx-auto');
        inputSearch.classList.add('w-44');
        inputSearch.classList.add('cursor-pointer');
        inputSearch.classList.add('focus:outline-none');

        const iconSearch = document.createElement('i');
        iconSearch.setAttribute('class', 'fa-solid fa-magnifying-glass absolute top-6 right-5 text-slate-400');

        const iconClose = document.createElement('i');
        iconClose.setAttribute('class', 'fa-solid fa-xmark text-slate-400 absolute top-6 right-11 opacity-0 cursor-pointer');
        iconClose.setAttribute('id', 'icon-option');

        divOptions.appendChild(iconSearch);
        divOptions.appendChild(iconClose);
        divOptions.appendChild(inputSearch);

        const ulElement = document.createElement('ul');

        array.forEach((element) => {
            const liElement = document.createElement('li');
            liElement.textContent = element;
            liElement.classList.add('hover:bg-yellow');
            liElement.classList.add('cursor-pointer');
            liElement.classList.add('py-3');
            liElement.classList.add('px-4');

            ulElement.appendChild(liElement);
        });

        divOptions.appendChild(ulElement);
        parentElement.appendChild(divOptions);
    }
};
