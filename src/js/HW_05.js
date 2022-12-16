// 1

const complexFunction = (arg1, arg2) => {
    return arg1 + arg2;
}

const cache = (func) => {
    const cache = {};
    return (...args) => {
        const cached = args;

        if (cache.hasOwnProperty(cached)) {
            console.log('from cache');
            return cache[cached];
        } else {
            cache[cached] = func(...args);
            console.log('new');
            return cache[cached];
        }
    }
}

const cachedFunction = cache(complexFunction);

console.log(cachedFunction('foo', 'bar'));
console.log(cachedFunction('foo', 'bar'));
console.log(cachedFunction('foo', 'baz'));
console.log(cachedFunction('bar', 'foo'));
console.log(cachedFunction(10, 15));
console.log(cachedFunction(15, 10));
console.log(cachedFunction('foo', 10));
console.log(cachedFunction(10, 'foo'));
console.log(cachedFunction('foo', 'baz'));

// 2
const ladder = {
    step: 0,
    up: function() {
        this.step += 1;
        return this;
    },
    down: function() {
        this.step -= 1;
        return this;
    },
    showStep: function() {
        console.log(this.step);
        this.step = 0;
        return this;
    },
}

ladder.up().up().down().up().showStep();
ladder.up().up().down().up().showStep();

// 3.ES6
const applyAll = (func, ...args) => {
    return func(...args);
}

const sum = (...args) => {
    const arr = [...args];
    return arr.reduce((prev, next) => prev + next, 0);
}

const mul = (...args) => {
    const arr = [...args];
    return arr.reduce((prev, next) => prev * next, 1);
}

const div = (...args) => {
    const arr = [...args];
    const initialValue = arr[0];
    arr.shift();
    return arr.reduce((prev, next) => prev / next, initialValue);
}

const dif = (...args) => {
    const arr = [...args];
    const initialValue = arr[0];
    arr.shift();
    return arr.reduce((prev, next) => prev - next, initialValue);
}

console.log(applyAll(sum, 1, 2, 3)); // 6
console.log(applyAll(mul, 2, 3, 4)); // 24
console.log(applyAll(dif, 45, 1, 3, 5)); // 36
console.log(applyAll(div, 81, 9, 3, 3)); // 1

// 3. not ES6

function applyAll(func) {
    const arr = [].slice.call(arguments); // eslint-disable-line
    arr.shift();
    return func(arr);
}

function sum() {
    const args = arguments[0]; // eslint-disable-line
    let result = 0;
    for (let i = 0; i <= args.length - 1; i++) { // eslint-disable-line
      result = result + +args[i]; // eslint-disable-line
    }
    return result;
}

function mul() {
    const args = arguments[0]; // eslint-disable-line
    let result;
    for (let i = 0; i <= args.length - 2; i++) { // eslint-disable-line
        if (result === undefined) {
            result = +args[i] * +args[i + 1]; // eslint-disable-line
        } else {
            result = result * +args[i + 1]; // eslint-disable-line
        }
    }
    return result;
}

function dif() {
    const args = arguments[0]; // eslint-disable-line
    let result;
    for (let i = 0; i <= args.length - 2; i++) { // eslint-disable-line
        if (result === undefined) {
            result = +args[i] - +args[i + 1]; // eslint-disable-line
        } else {
            result = result - +args[i + 1]; // eslint-disable-line
        }
    }
    return result;
}

function div() {
    const args = arguments[0]; // eslint-disable-line
    let result;
    for (let i = 0; i <= args.length - 2; i++) { // eslint-disable-line
        if (result === undefined) {
            result = +args[i] / +args[i + 1]; // eslint-disable-line
        } else {
            result = +result / +args[i + 1]; // eslint-disable-line
        }
    }
    return result;
}

console.log(applyAll(sum, 1, 2, 3, 99)); // 105
console.log(applyAll(mul, 2, 3, 5, 9)); // 270
console.log(applyAll(dif, 45, 1, 3, 5)); // 36
console.log(applyAll(div, 81, 9, 3, 3)); // 1

// TASK 3
// Реализовать ф-цию patchObject, которая первым параметром принимает объект который будет разширен
// произвольным числом методов переданных в аргменты ф-ции и возвращает разширенный объект.
// Так же необходимо реализовать ф-ции : greetings, showSuccess, howOldAreYou, таким образом,
// чтобы при их вызове на исходных объектах они работали так как ожидается в блоке консоль логов

const UNAVAILABLE_AGE_TEXT = 'age is unavailable';
const MY_NAME_TEXT = ', my name is ';
const UNKNOWN = 'unknown';

function patchObject() {
    const args = [...args];
    const data = args[0];
    const methods = args.filter((element) => typeof element === 'function');
    const dataObject = !!data ? setKnownDataToObject(data) : {};
    methods.forEach((method) => dataObject[method.name] = method);
    return dataObject;
}

let obj = {
    name: 'Ivan',
    surname: 'Baraban',
    age: 42,
    score: 12,
}

let obj2 = {
    name: 'Petya',
    surname: 'Padawan',
    age: 52,
    score: 28,
}

const greetings = function hello(greeting) {
    return !!this.name ? `${greeting}${MY_NAME_TEXT}${this.name}` : `${greeting}${MY_NAME_TEXT}${UNKNOWN}`;
}

const showSuccess = function showSuccessKoef() {
    return (!!this.age || !!this.score)
        ? (+this.age / +this.score)
        : 0;
}

const howOldAreYou = function myAge() {
    return !!this.age ? this.age : UNAVAILABLE_AGE_TEXT;
}

const setKnownDataToObject = (data) => {
    return {
        name: data.name,
        surname: data.surname,
        age: data.age,
        score: data.score,
    }
}

obj = patchObject(obj, greetings, howOldAreYou, showSuccess);
obj2 = patchObject(obj2, greetings, howOldAreYou);
obj3 = patchObject(null, greetings, howOldAreYou, showSuccess);

console.log(obj.myAge()); // 42
console.log(obj.showSuccessKoef()); // 3.5
console.log(obj.hello('yo')); // yo, my name is Ivan
console.log(obj2.myAge()); // 52
console.log(obj2.hello('Hi sir')); // Hi sir, my name is Petya
console.log(obj3.hello('Good Day')); // Good Day, my name is unknown
console.log(obj3.showSuccessKoef()); // 0
console.log(obj3.myAge()); // age is unavailable

// TASK 5
// Реализовать ф-ции чисел и ф-ции операторов таким образом чтобы они работали в формате число - оператор - число
function zero(func) {
    const number = 0;
    return (func === undefined) ? number : func(number);
}

function one(func) {
    const number = 1;
    return (func === undefined) ? number : func(number);
}

function two(func) {
    const number = 2;
    return (func === undefined) ? number : func(number);
}

function three(func) {
    const number = 3;
    return (func === undefined) ? number : func(number);
}

function four(func) {
    const number = 4;
    return (func === undefined) ? number : func(number);
}

function five(func) {
    const number = 5;
    return (func === undefined) ? number : func(number);
}

function six(func) {
    const number = 6;
    return (func === undefined) ? number : func(number);
}

function seven(func) {
    const number = 7;
    return (func === undefined) ? number : func(number);
}

function eight(func) {
    const number = 8;
    return (func === undefined) ? number : func(number);
}

function nine(func) {
    const number = 9;
    return (func === undefined) ? number : func(number);
}

function plus(next) {
    return function(previous) {
        return previous + next;
    }
}

function minus(next) {
    return function(previous) {
        return previous - next;
    }
}

function multiply(next) {
    return function(previous) {
        return previous * next;
    }
}

function divide(next) {
    return function(previous) {
        return previous / next;
    }
}

console.log(seven(multiply(five()))); // 35
console.log(four(plus(nine()))); // 13
console.log(eight(minus(three()))); // 5
console.log(six(divide(two()))); // 3
