// Functions in Javascript
// Q1 - What is Function Declaration ?

function square(num) {
  return num * num;
}

// Q2 - What is function Expression ?
// this is function which has no name and this anonymous function can be assigned to variable or can be passed as a callback
const square = function (num) {
  return num * num;
};

// Q3 - What are Fiest Class Functions ?

function square(num) {
  return num * num;
}

function displaySquare(fn) {
  console.log('Square is ' + fn(5));
}

displaySquare(square);

// Q4 - What is IIFE (immediately invoked function expression) ?

(function square(num) {
  return num * num;
})(5);

(function (x) {
  return (function (y) {
    console.log(x); // 1
  })(2);
})(1);

// Q5 - Functions Scope

var num = 20,
  num2 = 3,
  name = 'Amine Jaoued';

function multiply() {
  return num1 * num2;
}

multiply(); // Return 60

// A nested function example

function getScore() {
  var num1 = 2,
    num3 = 3;

  function add() {
    return name + ' scored ' + (num1 + num2);
  }

  return add();
}

getScore(); // Return "Amine Jaoued scored 5"

// Q7 - Functions Scope - O/P Based Question

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}

// return 0 1 2 3 4

// Q8 - Functions Hoisting - O/P Based Question

var x = 21;

var fun = function () {
  console.log(x);
  var x = 20;
};

fun(); // return undefined

// Q9 - Params vs Arguments

function square(num /** Parms */) {
  console.log(num * num);
}

square(5); // arguments

function square(num1, num2) {
  console.log(num1 * num2);
}

var arr = [5, 6];

square(...arr);

function square(...num) {
  console.log(num[0] * num[1]);
}

var arr = [5, 6];

square(...arr);

// Q10 - Params vs Arguments - O/P Bases Question

const fn = (a, x, y, ...numbers) => {
  console.log(x, y);
};

fn(5, 6, 7, 8); // return Error Rest parameter must be last formal parameter

// Q11 - Callback Functions

function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);

// Q12 - Arrow Functtions

// 1 - Syntax
function square(num) {
  return num * num;
}

const square = (num) => {
  return num * num;
};

// 2 - Implicit "return" keyword
const square = (num) => num * num;

// 3 - arguments
function fn() {
  console.log(arguments);
}

fn(5, 7, 2, 6);

const square = () => {
  console.log(arguments);
}; // will be return an error because arguments not be defined

// 4 - "this" keyword
let user = {
  username: 'Amine Jaoued',
  rc1: () => {
    console.log('Subscribe to ' + this.username);
  },
  rc2() {
    console.log('subscribe to ' + this.username);
  },
};

user.rc1(); // return undefined
user.rc2(); // return subscribe to amine jaoued

// Closures in Javascript
// Lexical Scope

var username = 'Amine Jaoued';

// Global Scope
function local() {
  // Local Scope
  console.log(username);
}

local(); // return Amine Jaoued

// global scope
function subscribe() {
  var name = 'Amine Jaoued';
  // inner Scope 2
  function displayName() {
    // inner scope
    alert(name);
  }
  displayName();
}

subscribe();

// Closure Scope Chain

// Global Scope
var e = 10;
function sum(e) {
  return function (b) {
    return function (c) {
      // outer funcrions scope
      return function (d) {
        // local Scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // return log 20

// Q1: What will be logged to console ?

let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1; // shadowing
    console.log(count); // 1
  }
  // count is still 0
  console.log(count); // 0
})();

// Q2 - Write a function that would allow you to do this

function createBase(num) {
  return function (innerNum) {
    return innerNum + num;
  };
}

var addSix = createBase(6);
addSix(10); // return 16
addSix(21); // Return 27

// Q3 - Time Optimization

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}
const closure = find();
console.log('6');
closure(6);
console.timeEnd('6');
console.time('12');
closure(12);
console.timeEnd('12');

// Q4 - Block Scope and setTmeout

function a() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, 1000);
  }
}

a(); // Return 3 3 3

// Q5 - How Would you use a closure to create a private counter

function counter() {
  var _counter = 0;

  function add(increment) {
    _counter += increment;
  }

  function retrive() {
    return 'Counter = ' + _counter;
  }

  return {
    add,
    retrive,
  };
}

const c = counter();
c.add(5);
c.add(10);
console.log(c.retrive());

// Q6 - What is Module Pattern ?

var Module = (function () {
  function privateMethod() {
    // Do Something
    console.log('private');
  }

  return {
    publicMethod: function () {
      // can call privateMethod()
      console.log('public');
    },
  };
})();

Module.publicMethod(); // return error
Module.publicMethod(); // return public

// Q7 - MAke this run only once

let view;
function likeTheVideo() {
  let called = 0;
  return function () {
    if (called > 0) {
      console.log('Already Subscribed to Amine Jaoued');
    } else {
      view = 'Amine Jaoued';
      console.log('subscribe to', view);
      called++;
    }
  };
}

let isSubscribed = likeTheVideo();
isSubscribed();
isSubscribed();
isSubscribed();
isSubscribed();
isSubscribed();
isSubscribed();

// Q8 - Once Polyfill

function once(func, context) {
  let run;

  return function () {
    if (func) {
      run = func.apply(context || this, arguments);
      func = null;
    }

    return run;
  };
}

const hello = once((a, b) => console.log('hello', a, b));

hello(1, 2);
hello(1, 2);
hello(1, 2);
hello(1, 2);
hello(1, 2);

// Q9 - Implement Caching/Memoize Function

function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const clumsysquare = (num1, num2) => {
  for (let i = 0; i <= 100000; i++) {}
  return num1 * num2;
};

const memoizeClum = myMemoize(clumsysquare);

console.time('First Call');
console.log(memoizeClum(9485, 7658));
console.timeEnd('First Call');

console.time('Second Call');
console.log(clumsysquare(9485, 7658));
console.timeEnd('Second Call');
