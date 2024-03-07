const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

const cashRegister = () => {
  if (cash.value < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  if (parseFloat(cash.value) === price) {
    changeDue.textContent = 'No change due - customer paid with exact cash';
    return;
  }
  const result = checkCashRegister(price, cash.value, cid);
  changeDue.textContent = `Status: ${result.status} ${result.change
    .map((value) => {
      return `${value[0]}: $${value[1]}`;
    })
    .join('')
    .split(',')}`;
};

const checkCashRegister = (price, cash, cid) => {
  let difference = cash - price;
  const originalDiff = difference;
  let objectReturn = {
    status: '',
    change: [],
  };
  let arrCurrency = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01],
  ];
  cid.reverse();
  let cidSum = 0;
  for (let i = 0; i < cid.length; i++) {
    cidSum += cid[i][1];
  }
  let result = [...arrCurrency];

  for (let i = 0; i < arrCurrency.length; i++) {
    let returnMoney = 0;
    let bill = cid[i][1] / arrCurrency[i][1];
    bill.toFixed(2);
    while (difference.toFixed(2) >= arrCurrency[i][1] && bill >= 1) {
      difference -= arrCurrency[i][1];
      returnMoney += arrCurrency[i][1];
      bill--;
    }
    if (returnMoney > 0) {
      if (returnMoney - Math.floor(returnMoney) !== 0) {
        result[i][1] = returnMoney.toFixed(2);
        result[i][1] = parseFloat(result[i][1]);
      } else {
        result[i][1] = returnMoney;
      }
    } else {
      result[i][1] = returnMoney;
    }
  }
  let sumResult = 0;

  for (let i = 0; i < cid.length; i++) {
    sumResult += result[i][1];
  }
  sumResult = sumResult.toFixed(2);
  if (cidSum < originalDiff || sumResult < originalDiff) {
    objectReturn.status = 'INSUFFICIENT_FUNDS';
  } else if (cidSum === originalDiff) {
    objectReturn.status = 'CLOSED';
    objectReturn.change = cid.reverse();
  } else {
    let resultFiltered = [];
    for (let a = 0; a < result.length; a++) {
      if (result[a][1] !== 0) {
        resultFiltered.push(result[a]);
      }
    }
    objectReturn.status = 'OPEN';
    objectReturn.change = resultFiltered;
  }
  return objectReturn;
};

purchaseBtn.addEventListener('click', cashRegister);
