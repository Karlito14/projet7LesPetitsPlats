// eslint-disable-next-line import/extensions
import createElement from '../utils/createElement.js';

const displayOptionSelected = (value) => {
    const divOptionsSelected = document.querySelector('#divOptionsSelected');

    const spanOptionSelected = createElement(
        'span',
        'bg-yellow px-4 py-3 flex justify-between items-center rounded-xl mr-6',
        value,
    );

    const closeOption = createElement(
        'i',
        'fa-solid fa-xmark pl-8 cursor-pointer',
    );

    spanOptionSelected.appendChild(closeOption);

    divOptionsSelected.appendChild(spanOptionSelected);

    return spanOptionSelected;
};

const forEachList = (array, elParent) => {
    let ulElement = elParent.querySelector('ul');
    ulElement?.remove();

    ulElement = document.createElement('ul');

    array.sort((a, b) => a.localeCompare(b));

    array.forEach((element) => {
        const liElement = createElement(
            'li',
            'hover:bg-yellow cursor-pointer py-3 px-4',
            element,
            undefined,
        );

        ulElement.appendChild(liElement);
    });

    elParent.appendChild(ulElement);
};

const closeDivOptions = () => {
    const allDivOptions = document.querySelectorAll('[data-name=div-options]');
    if (allDivOptions.length > 0) {
        allDivOptions.forEach((divOption) => {
            const parentDiv = divOption.closest('[data-name=div-parent]');
            const bracket = parentDiv.querySelector('i');
            bracket.classList.remove('rotate-180');
            divOption.remove();
        });
    }
};

const displayOptions = (array, optionDiv) => {
    const parentElement = optionDiv.closest('[data-name=div-parent]');

    // fermeture des autres options ouvertes
    closeDivOptions();

    const divOptions = createElement(
        'div',
        'overflow-y-scroll max-h-52 scrollbar absolute left-0 bg-white z-10 md:w-48 rounded-bl-xl rounded-br-xl w-full',
        undefined,
        `div-option-${optionDiv.dataset.name}`,
    );
    divOptions.setAttribute('data-name', 'div-options');

    const inputSearch = createElement(
        'input',
        'border-slate-300 border-solid border block py-2 pl-4 pr-14 my-3 mx-auto md:w-44 cursor-pointer focus:outline-none w-11/12',
        undefined,
        'input-option',
    );
    inputSearch.setAttribute('type', 'text');
    inputSearch.setAttribute('autocomplete', 'off');

    setTimeout(() => {
        inputSearch.focus();
    }, 100);

    const iconSearch = createElement(
        'i',
        'fa-solid fa-magnifying-glass absolute top-6 md:right-5 sm:right-10 right-7 text-slate-400',
    );

    const iconClose = createElement(
        'i',
        'fa-solid fa-xmark text-slate-400 absolute top-6 right-11 opacity-0 cursor-pointer',
        undefined,
        'icon-option',
    );

    divOptions.appendChild(iconSearch);
    divOptions.appendChild(iconClose);
    divOptions.appendChild(inputSearch);

    divOptions.addEventListener('click', (event) => event.stopPropagation());

    forEachList(array, divOptions);

    parentElement.appendChild(divOptions);
};

export { forEachList, displayOptions, closeDivOptions, displayOptionSelected };
