const SPACEBAR = 32;
const EXCLAMATION_MARK = 33;
const COLON = 58;
const MINUS = 45;
const QUESTION_MARK = 63;
const POINT = 46;
const COMMA = 44;
const CHARACTERS = [
    SPACEBAR, 
    EXCLAMATION_MARK, 
    COLON,
    MINUS, 
    QUESTION_MARK, 
    POINT, 
    COMMA
];
const FIRST_UPPERCASE_LETTER = 65;
const LAST_UPPERCASE_LETTER = 90;
const FIRST_LOWERCASE_LETTER = 97;
const LAST_LOWERCASE_LETTER = 122;
const DIGIT_ZERO = 48;
const DIGIT_NINE = 57;
const MAX_TITLE_LENGTH = 20;
const MIN_TITLE_LENGTH = 2;

const validateTitle = (value) => {
    if ((typeof value) === 'string') {
        const validationResult = isTitleValid(value) ? 'VALID' : 'INVALID';
        return validationResult;
    };
    return 'Incorrect input data';
};

const isTitleValid = (value) => {
    switch (false) {
        case (value !== ''):
            console.log('Title cannot be empty');
            return false;
        case (isTitleLengthValid(value)):
            console.log('Title must be more than 2 characters and less than 20');
            return false;
        case (isFirstSighValid(value.charAt(0))):
            console.log('First sigh must be a letter in uppercase');
            return false;
        case (isTitleCharsValid(value)):
            console.log(`Title can contain latin letter (in uppercase or lowercase), 
            numbers and special characters: space ! : - ? . ,`);
            return false;
        default: return true;
    };
};

const isFirstSighValid = (sigh) => {
    switch (false) {
        case (sigh.charCodeAt(0) !== SPACEBAR): return false;
        case (sigh.charCodeAt(0) <= LAST_UPPERCASE_LETTER &&
                sigh.charCodeAt(0) >= FIRST_UPPERCASE_LETTER): return false;
        default: return true;
    };
};

const isTitleLengthValid = (value) => {
    const validationResult = value.length >= MIN_TITLE_LENGTH &&
        value.length <= MAX_TITLE_LENGTH ?
        true :
        false;
    return validationResult;
};

const isTitleCharsValid = (title) => {
    for (i = 0; i < title.length; i++) {
        const validLetter = isTitleCharValid(title.charCodeAt(i));
        if (validLetter === false) {
            return false;
        };
    };
    return true;
};

const isTitleCharValid = (char) => {
    switch (true) {
        case (char <= LAST_LOWERCASE_LETTER && char >= FIRST_LOWERCASE_LETTER): return true;
        case (char <= LAST_UPPERCASE_LETTER && char >= FIRST_UPPERCASE_LETTER): return true;
        case (char <= DIGIT_NINE && char >= DIGIT_ZERO): return true;
        case (CHARACTERS.includes(char)): return true;
        default: return false;
    };
};

console.log(validateTitle('Title!'));
console.log(validateTitle('s'));
console.log(validateTitle('12Title'));
console.log(validateTitle('Title?'));
console.log(validateTitle(false));
console.log(validateTitle('Тайтл'));
console.log(validateTitle(' Title?'));
console.log(validateTitle('title'));


const sum = (value1, value2) => {
    const sumResult = getSum(value1, value2);
    return sumResult;
};

const getSum = (...args) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += getOperand(args[i]);
    };
    return sum;
};

const getOperand = (value) => {
    if (typeof value === 'number') {
        return checkOperand(value);
    } else {
        return Number(value);
    };
};

const checkOperand = (num) => {
    const condition = ((num % 3 === 0) || (num % 5 === 0));
    return condition ? num * (-1) : num;
};

console.log(sum('25', 15));
console.log(sum(41, '3'));
console.log(sum('3', 45));
console.log(sum('15', 15));
console.log(sum('15', '10'));