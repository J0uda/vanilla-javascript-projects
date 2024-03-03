const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const checkUserInput = () => {
  if (userInput.value === '') {
    alert('Please provide a phone number');
    return;
  }
  telephoneCheck(userInput.value);
  userInput.value = '';
};

const clearInput = () => {
  result.innerText = '';
};

const telephoneCheck = (str) => {
  var regex =
    /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

  if (regex.test(str)) {
    result.textContent = 'Valid US number: ' + str;
  } else {
    result.textContent = 'Invalid US number: ' + str;
  }
};

checkBtn.addEventListener('click', checkUserInput);
clearBtn.addEventListener('click', clearInput);
