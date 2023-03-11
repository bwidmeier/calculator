const Operation = {
    Equals: 'equals',
    Add: 'add',
    Subtract: 'subtract',
    Multiply: 'multiply',
    Divide: 'divide'
};

const functionsByOperation = {}
functionsByOperation[Operation.Add] = (x, y) => x + y;
functionsByOperation[Operation.Subtract] = (x, y) => x - y;
functionsByOperation[Operation.Multiply] = (x, y) => x * y;
functionsByOperation[Operation.Divide] = (x, y) => x / y;

let state = null;

function setToInitialState() {
    state = {
        storedNum: null,
        operation: null,
        currNum: null
    };
}

function draw() {
    const display = document.querySelector('#display');

    if (state.currNum !== null) {
        display.textContent = formatDisplayString(state.currNum);
    } else {
        display.textContent = formatDisplayString(state.storedNum || '0');
    }
}

function formatDisplayString(source) {
    // TODO: implement rounding
    // TODO: implement max number length
    const firstNonZeroIndex = source.search(/[^0]/);
    return source.slice(firstNonZeroIndex)
}

function numberPress(number) {
    if (state.operation === null)
        state.storedNum = null;

    state.currNum = state.currNum === null ? number : state.currNum + number;
}

function operationPress(operation) {
    if (operation === Operation.Equals) {
        performOperation();
        return;
    }

    if (state.storedNum === null) {
        if (state.currNum !== null) {
            state.operation = operation;
            state.storedNum = state.currNum;
            state.currNum = null;
        }
        return;
    }

    if (state.currNum === null) {
        state.operation = operation;
        return;
    }

    performOperation();
    state.operation = operation;
}

function performOperation() {
    if (state.storedNum === null || state.operation === null || state.currNum === null)
        return;

    const operand1 = parseFloat(state.storedNum);
    const operand2 = parseFloat(state.currNum);
    const func = functionsByOperation[state.operation];

    const result = func(operand1, operand2);

    if (result === Infinity) {
        alert('Finger waggle!')
        return;
    }

    state.storedNum = result.toString();
    state.operation = null;
    state.currNum = null;
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    setToInitialState();
    draw();
});

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        numberPress(button.dataset.value);
        draw();
    });
});

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        operationPress(button.dataset.operation);
        draw();
    });
});

setToInitialState();