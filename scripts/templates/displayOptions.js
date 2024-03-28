const displayOptionSelected = (element) => {
    const divOptionsSelected = document.querySelector('#divOptionsSelected');
    const value = element.textContent;

    const spanOptionSelected = document.createElement('span');
    spanOptionSelected.setAttribute('class', 'bg-yellow px-4 py-3 flex justify-between items-center rounded-xl mr-6');
    spanOptionSelected.textContent = value;

    const closeOption = document.createElement('i');
    closeOption.setAttribute('class', 'fa-solid fa-xmark pl-8 cursor-pointer');

    closeOption.addEventListener('click', () => {
        spanOptionSelected.remove();
    });

    spanOptionSelected.appendChild(closeOption);

    divOptionsSelected.appendChild(spanOptionSelected);
};

const forEachList = (array, parentElement) => {
    const ulElement = document.createElement('ul');

    array.sort((a, b) => a.localeCompare(b));

    array.forEach((element) => {
        const liElement = document.createElement('li');
        liElement.textContent = element;
        liElement.classList.add('hover:bg-yellow');
        liElement.classList.add('cursor-pointer');
        liElement.classList.add('py-3');
        liElement.classList.add('px-4');

        liElement.addEventListener('click', () => {
            displayOptionSelected(liElement);
        });

        ulElement.appendChild(liElement);
    });

    parentElement.appendChild(ulElement);
};

const displayOptions = (array, optionDiv) => {
    const parentElement = optionDiv.closest('[data-name=div-parent]');

    // fermeture des autres options ouvertes
    const allDivOptions = document.querySelectorAll('[data-name=div-options]');
    if (allDivOptions.length > 0) {
        allDivOptions.forEach((divOption) => {
            const parentDiv = divOption.closest('[data-name=div-parent]');
            const bracket = parentDiv.querySelector('i');
            bracket.classList.remove('rotate-180');
            divOption.remove();
        });
    }

    const divOptions = document.createElement('div');
    divOptions.setAttribute('id', `div-option-${optionDiv.dataset.name}`);
    divOptions.setAttribute('data-name', 'div-options');
    divOptions.setAttribute('class', 'overflow-y-scroll max-h-52 scrollbar absolute left-0 bg-white z-10 w-48 rounded-bl-xl rounded-br-xl');

    const inputSearch = document.createElement('input');
    inputSearch.setAttribute('type', 'text');
    inputSearch.setAttribute('id', 'input-option');
    inputSearch.setAttribute('autocomplete', 'off');
    inputSearch.setAttribute('class', 'border-slate-300 border-solid border block py-2 pl-4 pr-14 my-3 mx-auto w-44 cursor-pointer focus:outline-none');

    setTimeout(() => {
        inputSearch.focus();
    }, 100);

    const iconSearch = document.createElement('i');
    iconSearch.setAttribute('class', 'fa-solid fa-magnifying-glass absolute top-6 right-5 text-slate-400');

    const iconClose = document.createElement('i');
    iconClose.setAttribute('class', 'fa-solid fa-xmark text-slate-400 absolute top-6 right-11 opacity-0 cursor-pointer');
    iconClose.setAttribute('id', 'icon-option');

    divOptions.appendChild(iconSearch);
    divOptions.appendChild(iconClose);
    divOptions.appendChild(inputSearch);

    forEachList(array, divOptions);

    parentElement.appendChild(divOptions);
};

export { forEachList, displayOptions };