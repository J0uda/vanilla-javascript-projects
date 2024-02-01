const toggleTheme1 = <HTMLButtonElement>document.getElementById('theme-1');
const toggleTheme2 = <HTMLButtonElement>document.getElementById('theme-2');
const toggleTheme3 = <HTMLButtonElement>document.getElementById('theme-3');
const calculatorDisplay = <any>document.getElementById('calculator-display');
const inputBtns = <any>document.querySelectorAll('button');
const resetBtn = <HTMLButtonElement>document.getElementById('reset-btn');

let firstValue: number = 0;
let operatorValue: string = '';
let awaitNextValue: boolean = false;

const existingTheme = localStorage.getItem('calculator-theme')
  ? localStorage.getItem('calculator-theme')
  : 'theme1';

const themeToggles = document.querySelectorAll('label');

function toggleTheme(switchToTheme: string) {
  document.documentElement.setAttribute('data-theme', switchToTheme);

  themeToggles.forEach((theme) => theme.classList.remove('toggle-on'));

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

toggleTheme1.addEventListener('click', () => {
  toggleTheme('theme1');
});

toggleTheme2.addEventListener('click', () => {
  toggleTheme('theme2');
});

toggleTheme3.addEventListener('click', () => {
  toggleTheme('theme3');
});

function resetCalculator() {
  firstValue = 0;
  operatorValue = '';
  awaitNextValue = false;
}

const calculate = {
  '/': (firstNumber: number, secondNumber: number) =>
    firstNumber / secondNumber,

  '*': (firstNumber: number, secondNumber: number) =>
    firstNumber * secondNumber,

  '+': (firstNumber: number, secondNumber: number) =>
    firstNumber + secondNumber,

  '-': (firstNumber: number, secondNumber: number) =>
    firstNumber - secondNumber,

  '=': (firstNumber: number, secondNumber: number) => secondNumber,
};

function sendNumberValue(number: any) {
  if (awaitNextValue) {
    calculatorDisplay.textContent = number;

    awaitNextValue = false;
  } else {
    const displayValue: any = calculatorDisplay.textContent;
    if (displayValue.length < 10) {
      calculatorDisplay.textContent =
        displayValue === '0' ? number : displayValue + number;
    }
  }
}

function useOperator(operator: string) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && awaitNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    if (operatorValue === '/' && currentValue === 0) {
      resetCalculator();
      return;
    }

    const calculation = calculate[operatorValue](firstValue, currentValue);
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
  let inputValue = calculatorDisplay.textContent?.split('');
  inputValue?.pop();
  if (inputValue?.length === 0) {
    inputValue.push('0');
  }

  let newInputValue = inputValue?.join('');
  calculatorDisplay.textContent = newInputValue;
}

inputBtns.forEach((inputBtn: any) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal);
  } else if (inputBtn.classList.contains('del-btn')) {
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
