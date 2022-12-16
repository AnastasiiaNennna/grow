const tickets = (person) => {
    const change = isChangePossible(person);
    if (change === 'Invalid data') {
        return 'Invalid data';
    }

    if (change) {
        return 'YES';
    }
    return 'NO';
}

const isChangePossible = (arr) => {
    if (typeof arr !== 'object') {
        return 'Invalid data';
    }

    let twentyFiveBills = 0;
    let fiftyBills = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            return 'Invalid data';
        }
        switch (+arr[i]) {
        case 25:
            twentyFiveBills++;
            break;
        case 50:
            fiftyBills++;
            twentyFiveBills--;
            break;
        case 100:
            if (fiftyBills > 0) {
                fiftyBills--;
                twentyFiveBills--;
            } else {
                fiftyBills -= 3;
            }
            break;
        }

        if (twentyFiveBills < 0 || fiftyBills < 0) {
            return false;
        }
    }
    return true;
}

console.log(tickets([25, 25, 50])); // +
console.log(tickets([25, 100])); // -
console.log(tickets([25, 25, 50, 100])); // +
console.log(tickets([25, 50, 100])); // -
console.log(tickets(['25', '25', '50', '100'])); // +
console.log(tickets(['25', '50', '100'])); // -
console.log(tickets('34')); // invalid data
console.log(tickets(['25', '-50', '100'])); // invalid data
console.log(tickets([25, 25, 50, -100])); // invalid data


const getSum = (str1, str2) => {
    let numOne = str1;
    let numTwo = str2;

    if (numTwo.length > numOne.length) {
        numOne = '0'.repeat(numTwo.length - numOne.length) + numOne;
    } else if (numOne.length > numTwo.length) {
        numTwo = '0'.repeat(numOne.length - numTwo.length) + numTwo;
    }

    return calculateSum(numOne, numTwo);
}

const calculateSum = (numOne, numTwo) => {
    let result = '';
    let resultInMind = '';
    let sum = 0;
    let newSum = 0;
    let mind = 0;
    const resultLength = numOne.length;
    for (let i = resultLength - 1; i >= 0; i--) {
        const firstStrChar = numOne.charAt(i);
        const secondStrChar = numTwo.charAt(i);
        sum = +firstStrChar + +secondStrChar;

        if (mind > 0) {
            sum = +sum + +mind;
        }
        if (sum <= 9) {
            newSum = sum;
            mind = 0;
        }

        if (sum > 9) {
            sum = String(sum);
            mind = Number(sum.charAt(0));
            newSum = Number(sum.charAt(1));
        }
        resultInMind += String(newSum);
    }

    if (mind > 0) {
        resultInMind += String(mind);
    }

    for (let i = resultInMind.length - 1; i >= 0; i--) {
        result += resultInMind[i];
    }
    return result;
}

console.log(getSum('111111111111111111111111111111111111111111111111111',
    '23333333333333333333333333333333333333333333333333'));
console.log(getSum('123', '324')); // 447
console.log(getSum('9999', '450')); // 10449
console.log(getSum('99', '1')); // 100
console.log(getSum('1', '99')); // 100
console.log(getSum('99', '11')); // 110
console.log(getSum('199', '99')); // 298
