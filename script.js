const display = document.querySelector('div .display');
const clearButton = document.querySelector('.button-clear');
const backspaceButton = document.querySelector('.button-backspace');
const equalsButton = document.querySelector('.button-equal');
const allButtons = document.querySelectorAll('#buttons button');

let currentFirstNumber = "";
let currentSecondNumber = "";
let currentOperator = "";
const allOperators = ['+', '-', 'x', '/'];
const allNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

function add(x, y) {
    return +x + +y;
}

function subtract(x, y) {
    return +x - +y;
}

function multiply(x, y) {
    return +x * +y;
}

function divide(x, y) {
    if (y === 0) {
        alert('DIVIDE BY ZERO ERROR');
    }
    else {
        return +x / +y;
    }
}

function operate(x, operator, y) {
    if (operator == '+') {
        return add(x, y);
    }
    else if (operator == '-') {
        return subtract(x, y);
    }
    else if (operator == 'x') {
        return multiply(x, y);
    }
    else {
        return divide(x, y);
    }
}

equalsButton.addEventListener('click', () => {

    let operatorFound = false;
    let finalSolution;

    for (let i = 0; i < display.textContent.length; i++) {

        if (operatorFound == true && allOperators.includes(display.textContent[i])) {
            currentFirstNumber = operate(currentFirstNumber, currentOperator, currentSecondNumber);
            currentOperator = display.textContent[i];
            currentSecondNumber = "";
        }

        if (allOperators.includes(display.textContent[i])) {
            currentOperator = display.textContent[i];
            operatorFound = true;
        }
        
        if (operatorFound == false) {
            currentFirstNumber += display.textContent[i];
        }
        else if (allNumbers.includes(display.textContent[i])) {
            currentSecondNumber += display.textContent[i];
        }
    }

    finalSolution = operate(currentFirstNumber, currentOperator, currentSecondNumber).toFixed(2);
    display.textContent = finalSolution;
    currentFirstNumber = "";
    currentOperator = "";
    currentSecondNumber = "";
});

clearButton.addEventListener('click', () => {
    display.textContent = "";
    currentFirstNumber = "";
    currentSecondNumber = "";
    currentOperator = "";
});

backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
});


allButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (button.textContent != 'backspace' && 
            button.textContent != '=' &&
            button.textContent != 'clear') 
        {
            
            display.textContent += button.textContent;
            
            if (allOperators.includes(button.textContent)) {
                if (display.textContent[display.textContent.length - 2] == '+' ||
                    display.textContent[display.textContent.length - 2] == '-' ||
                    display.textContent[display.textContent.length - 2] == 'x' ||
                    display.textContent[display.textContent.length - 2] == '/') 
                {
                    display.textContent = display.textContent.substring(0, display.textContent.length - 2);
                    display.textContent += button.textContent;
                }
            }
        }
    });
});