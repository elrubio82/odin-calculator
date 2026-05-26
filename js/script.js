function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function sum(array) {
    return array.reduce((total, current) => total + current, 0);
};

function power(a, b) {
    return a ** b;
};

factorial = function factorial(n) {
    let product = 1;
    for (let i = n; i > 0; i--) {
        product *= i;
    }
    return product;
};

function operate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+": return add(firstOperand, secondOperand);
            break;
        case "-": return subtract(firstOperand, secondOperand);
            break;
        case "×": return multiply(firstOperand, secondOperand);
            break;
        case "÷": return divide(firstOperand, secondOperand);
            break;
    }
}
let firstOperand;
let secondOperand;
let operator;
let firstRound = false;
let partialResult;
document.querySelector(".calculator").addEventListener("click",
    function (event) {
        if (event.target.classList.contains('operand')) {
            let displayContent = document.querySelector(".display").textContent;
            if (document.querySelector(".display.input").textContent.trim() === "0") {
                document.querySelector(".display.input").textContent = event.target.textContent.trim();
            } else {
                document.querySelector(".display.input").textContent = document.querySelector(".display.display.input").textContent + event.target.textContent.trim();
            }

        } else if (event.target.classList.contains('operator')) {
            if (event.target.textContent.trim() === "AC") {
                firstOperand = 0;
                secondOperand = 0;
                operator = "";
                firstRound = false;
                partialResult = 0;
                document.querySelector(".display.input").textContent = "0";
                document.querySelector(".display.output").textContent = "0";
            } else {
                if (firstRound === true || event.target.textContent.trim() === "=") {
                    secondOperand = +document.querySelector(".display.input").textContent;
                    partialResult = operate(firstOperand, secondOperand, operator);
                    document.querySelector(".display.output").textContent = firstOperand + " " + operator + " " + secondOperand + " = " + partialResult +
                        (event.target.textContent.trim() !== "=" ? " " + event.target.textContent.trim() : "");
                    document.querySelector(".display.input").textContent = "0";
                    operator = event.target.textContent.trim();
                    firstOperand = partialResult;
                } else {
                    operator = event.target.textContent.trim();
                    firstOperand = +document.querySelector(".display.input").textContent;
                    document.querySelector(".display.input").textContent = "0";
                    document.querySelector(".display.output").textContent = firstOperand + " " + operator;
                    firstRound = true;
                }
            }

        }
        event.stopPropagation;
    });