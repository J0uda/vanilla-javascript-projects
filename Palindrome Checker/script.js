const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');
let isError = false;

const test = () => {
  if (textInput.value.length === 0) {
    alert('Please input a value');
  }
  if (textInput.value.length === 1) {
    result.textContent = `${textInput.value} is a palindrome`;
  }
  if (plaindrome(textInput.value)) {
    result.textContent = `${textInput.value} is a palindrome`;
  } else {
    result.textContent = `${textInput.value} is not a palindrome`;
  }
};

const plaindrome = (str) => {
  let filteredStr = str.replace(/[^a-z0-9]/gi, '');
  let createArray = filteredStr.toLowerCase().split(' ');
  let newArr = [];
  let reverseAndJoin;
  for (let i = 0; i < createArray.length; i++) {
    let splitLetters = createArray[i].split('');
    let reverseAndJoinLater = splitLetters.reverse().join('');
    newArr.push(reverseAndJoinLater);
    reverseAndJoin = newArr.reverse().join('');
  }
  str = filteredStr.split(' ').join('');
  if (reverseAndJoin === filteredStr.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};

checkButton.addEventListener('click', test);
