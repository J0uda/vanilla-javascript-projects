const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('output');

const numberToRoman = (input) => {
  let romanNumber = '';
  let numberLookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  for (let romanLetters of Object.keys(numberLookup)) {
    let numbers = Math.floor(input / numberLookup[romanLetters]);
    input -= numbers * numberLookup[romanLetters];
    romanNumber += romanLetters.repeat(numbers);
  }
  return romanNumber;
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInt)) {
    result.textContent = 'Please enter a valid number';
    return;
  } else if (inputInt <= -1) {
    result.textContent = 'Please enter a number greater than or equal to 1';
    return;
  } else if (inputInt >= 4000) {
    result.textContent = 'Please enter a number less than or equal to 3999';
    return;
  }

  result.textContent = numberToRoman(inputInt);
  numberInput.value = '';
};

convertBtn.addEventListener('click', checkUserInput);

numberInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkUserInput();
  }
});
