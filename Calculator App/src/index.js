var toggleTheme1 = document.getElementById('theme-1');
var toggleTheme2 = document.getElementById('theme-2');
var toggleTheme3 = document.getElementById('theme-3');
var calculatorDisplay = document.getElementById('calculator-display');
var inputBtns = document.querySelectorAll('button');
var resetBtn = document.getElementById('reset-btn');
var firstValue = 0;
var operatorValue = '';
var awaitNextValue = false;
var existingTheme = localStorage.getItem('calculator-theme')
    ? localStorage.getItem('calculator-theme')
    : 'theme1';
var themeToggles = document.querySelectorAll('label');
function toggleTheme(switchToTheme) {
    document.documentElement.setAttribute('data-theme', switchToTheme);
    themeToggles.forEach(function (theme) { return theme.classList.remove('toggle-on'); });
    switchToTheme === 'theme1'
        ? themeToggles[0].classList.add('toggle-on')
        : switchToTheme === 'theme2'
            ? themeToggles[1].classList.toggle('toggled-on')
            : themeToggles[2].classList.add('toggled-on');
    localStorage.setItem('calculator-theme', switchToTheme);
}
if (existingTheme) {
    toggleTheme(existingTheme);
}
toggleTheme1.addEventListener('click', function () {
    toggleTheme('theme1');
});
toggleTheme2.addEventListener('click', function () {
    toggleTheme('theme2');
});
toggleTheme3.addEventListener('click', function () {
    toggleTheme('theme3');
});
function resetCalculator() {
    firstValue = 0;
    operatorValue = '';
    awaitNextValue = false;
}
var calculate = {
    '/': function (firstNumber, secondNumber) {
        return firstNumber / secondNumber;
    },
    '*': function (firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    },
    '+': function (firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    },
    '-': function (firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    },
    '=': function (firstNumber, secondNumber) { return secondNumber; },
};
function sendNumberValue(number) {
    if (awaitNextValue) {
        calculatorDisplay.textContent = number;
        awaitNextValue = false;
    }
    else {
        var displayValue = calculatorDisplay.textContent;
        if (displayValue.length < 10) {
            calculatorDisplay.textContent =
                displayValue === '0' ? number : displayValue + number;
        }
    }
}
function useOperator(operator) {
    var currentValue = Number(calculatorDisplay.textContent);
    if (operatorValue && awaitNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        if (operatorValue === '/' && currentValue === 0) {
            resetCalculator();
            return;
        }
        var calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitNextValue = true;
    operatorValue = operator;
}
function addDecimal() {
    console.log('decimal');
    return 'test';
}
function del() {
    var _a;
    var inputValue = (_a = calculatorDisplay.textContent) === null || _a === void 0 ? void 0 : _a.split('');
    inputValue === null || inputValue === void 0 ? void 0 : inputValue.pop();
    if ((inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) === 0) {
        inputValue.push('0');
    }
    var newInputValue = inputValue === null || inputValue === void 0 ? void 0 : inputValue.join('');
    calculatorDisplay.textContent = newInputValue;
}
inputBtns.forEach(function (inputBtn) {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', function () { return sendNumberValue(inputBtn.value); });
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', function () { return useOperator(inputBtn.value); });
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    }
    else if (inputBtn.classList.contains('del-btn')) {
        inputBtn.addEventListener('click', del);
    }
});
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitNextValue = false;
    calculatorDisplay.textContent = '0';
}
resetBtn.addEventListener('click', resetAll);
