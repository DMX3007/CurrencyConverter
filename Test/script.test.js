const { JSDOM } = require('jsdom');

function removeActiveClass(buttons) {
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
}

describe('removeActiveClass', () => {
    test('removes active class from all buttons', () => {
        const dom = new JSDOM(`<div><button class="active"></button><button class="active"></button></div>`);
        global.document = dom.window.document;
        const buttons = document.querySelectorAll('button');

        removeActiveClass(buttons);

        buttons.forEach(button => {
            expect(button.classList.contains('active')).toBe(false);
        });
    });
});

function createDropdownButtons(dropdownId, groupButtons) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; // Очищаем предыдущие кнопки
    // ... настройка стилей выпадающего списка ...

    // Список валют и их аббревиатур
    const currencyInfo = [
        { name: "Белорусский рубль", code: "BYN" },
        { name: "Датская крона", code: "DKK" },
        { name: "Индийская рупия", code: "INR" },
        { name: "Китайский юань", code: "CNY" },
        { name: "Норвежская крона", code: "NOK" },
        { name: "Польский злотый", code: "PLN" },
        { name: "Турецкая лира", code: "TRY" },
        { name: "Украинская гривна", code: "UAH" },
        { name: "Шведская крона", code: "SEK" },
        { name: "Швейцарский франк", code: "CHF" }
    ];

    // Создаем кнопки в выпадающем списке
    currencyInfo.forEach(function(currency) {
        const button = document.createElement('button');
        button.className = 'dropdown-button';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'currency-name';
        nameSpan.textContent = currency.name;

        const codeSpan = document.createElement('span');
        codeSpan.className = 'currency-code';
        codeSpan.textContent = currency.code;

        button.appendChild(nameSpan);
        button.appendChild(codeSpan);

        // Обработчик события клика для кнопки
        button.addEventListener('click', function() {
            // Находим предпоследнюю кнопку в группе
            const preLastButton = groupButtons[groupButtons.length - 2];
            // Находим элемент span с классом 'text' внутри кнопки
            const spanElement = preLastButton.querySelector('.text');
            // Изменяем текст на аббревиатуру выбранной валюты
            if (spanElement) {
                spanElement.textContent = currency.code;
            }
            // Скрываем выпадающий список
            dropdown.style.display = 'none';
            removeActiveClass(groupButtons); // Удаляем 'active' со всех кнопок
            preLastButton.classList.add('active'); // Добавляем 'active' к измененной кнопке
        });

        dropdown.appendChild(button);
    });
}

describe('createDropdownButtons', () => {
    test('creates dropdown buttons correctly', () => {
        const dom = new JSDOM(`<div id="dropdownId"></div>`);
        global.document = dom.window.document;

        createDropdownButtons('dropdownId', []);
        const dropdown = document.getElementById('dropdownId');

        expect(dropdown.children.length).toBeGreaterThan(0); // Проверяем, что кнопки созданы
    });
});


function handleButtonGroup(buttons, dropdownId) {
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const isLastButton = index === buttons.length - 1;

            if (!isLastButton) {
                removeActiveClass(buttons);
                button.classList.add('active');
                document.getElementById(dropdownId).style.display = 'none';
            } else {
                button.classList.toggle('active');
                const dropdown = document.getElementById(dropdownId);
                dropdown.style.display = button.classList.contains('active') ? 'flex' : 'none';
            }
        });
    });
}

describe('handleButtonGroup', () => {
    test('handles button group correctly', () => {
        const dom = new JSDOM(`<div id="dropdownId"></div><button class="calc__button-first"></button>`);
        global.document = dom.window.document;

        const buttons = document.querySelectorAll('.calc__button-first');
        handleButtonGroup(buttons, 'dropdownId');

    });
});