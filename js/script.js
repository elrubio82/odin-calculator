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

function preciseRound(num, decimals) {
    const scale = 10 ** decimals;
    return Math.round((num + Number.EPSILON) * scale) / scale;
}

function roundAndTrim(num, decimals) {
    // Step 1: Round to `decimals` places (using preciseRound from earlier)
    const rounded = preciseRound(num, decimals);
    // Step 2: Convert to string and trim trailing zeros
    return rounded.toString().replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
}

function operate(firstOperand, secondOperand, operator) {
    let toReturn;
    switch (operator) {
        case "+": toReturn = add(firstOperand, secondOperand);
            break;
        case "-": toReturn = subtract(firstOperand, secondOperand);
            break;
        case "×": toReturn = multiply(firstOperand, secondOperand);
            break;
        case "÷": toReturn = divide(firstOperand, secondOperand);
            break;
    }
    return Number.isInteger(toReturn) ? toReturn : +roundAndTrim(toReturn, 16);
}
let firstOperand;
let secondOperand;
let operator;
let partialResult = undefined;
let newInput = true;
let equalClicked = false;
let dotClicked = false;
document.querySelector(".calculator").addEventListener("click",
    function (event) {
        if (event.target.classList.contains('operand')) {
            let displayContent = document.querySelector(".display").textContent;
            if (newInput && event.target.textContent.trim() !== ".") {
                document.querySelector(".display").textContent = event.target.textContent.trim();
                newInput = false;
            } else {
                if (event.target.textContent.trim() !== "." ||
                    (event.target.textContent.trim() === "." && dotClicked === false && newInput === false)) {
                    document.querySelector(".display").textContent = document.querySelector(".display").textContent + event.target.textContent.trim();
                    if (event.target.textContent.trim() === ".") {
                        dotClicked = true;
                    }
                }
            }
        } else if (event.target.classList.contains('operator')) {
            if (!(event.target.textContent.trim() === "=" &&
                ((partialResult === undefined) || (partialResult !== undefined && equalClicked === true)))) {
                newInput = true;
                dotClicked = false;
                if (event.target.textContent.trim() === "AC") {
                    firstOperand = 0;
                    secondOperand = 0;
                    operator = "";
                    partialResult = undefined;
                    newInput = true;
                    equalClicked = false;
                    dotClicked = false;
                    document.querySelector(".display").textContent = "0";
                } else {
                    if (partialResult !== undefined) {
                        if (event.target.textContent.trim() === "=") {
                            if (equalClicked === false) {
                                secondOperand = +document.querySelector(".display").textContent;
                                partialResult = operate(firstOperand, secondOperand, operator);
                                document.querySelector(".display").textContent = partialResult;
                                operator = event.target.textContent.trim();
                                firstOperand = partialResult;
                                equalClicked = true;
                            } else {
                                operator = event.target.textContent.trim();
                                firstOperand = +document.querySelector(".display").textContent;
                                partialResult = firstOperand;
                            }
                        } else {
                            if (equalClicked === true) {
                                operator = event.target.textContent.trim();
                                firstOperand = +document.querySelector(".display").textContent;
                                partialResult = firstOperand;
                                equalClicked = false;
                            } else {
                                secondOperand = +document.querySelector(".display").textContent;
                                partialResult = operate(firstOperand, secondOperand, operator);
                                document.querySelector(".display").textContent = partialResult;
                                operator = event.target.textContent.trim();
                                firstOperand = partialResult;
                            }
                        }
                    } else {
                        operator = event.target.textContent.trim();
                        firstOperand = +document.querySelector(".display").textContent;
                        partialResult = firstOperand;
                    }
                }
            }
        }
        event.stopPropagation;
    });