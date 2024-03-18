export default (array, optionDiv) => {
    let divOptions = document.querySelector(`#div-option-${optionDiv.dataset.name}`);
    const parentElement = optionDiv.closest('#div-parent');

    if (divOptions) {
        divOptions.remove();
    } else {
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
        inputSearch.classList.add('border-slate-300');
        inputSearch.classList.add('border-solid');
        inputSearch.classList.add('border');
        inputSearch.classList.add('block');
        inputSearch.classList.add('py-2');
        inputSearch.classList.add('px-4');
        inputSearch.classList.add('my-3');
        inputSearch.classList.add('mx-auto');
        inputSearch.classList.add('w-44');

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
