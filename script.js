// script.js - Advanced Calculator logic
// Uses a simple state machine to handle input, operators, and computation.
// Supports keyboard input and percent/backspace/clear operations.

const displayEl = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let current = '0';        // current input shown on screen (string)
let previous = null;      // previous value (number)
let operator = null;      // current operator ('+', '-', '×', '÷')
let overwrite = false;    // whether next number should overwrite current

function updateDisplay() {
  displayEl.textContent = current;
}

function inputNumber(num) {
  if (overwrite) {
    current = num === '.' ? '0.' : num;
    overwrite = false;
    return;
  }
  if (num === '.' && current.includes('.')) return;
  if (current === '0' && num !== '.') {
    current = num;
  } else {
    current = current + num;
  }
}

function chooseOperator(op) {
  if (operator && !overwrite) {
    compute();
  }
  previous = parseFloat(current);
  operator = op;
  overwrite = true;
}

function compute() {
  if (operator == null || previous == null) return;
  const a = previous;
  const b = parseFloat(current);
  let result = 0;
  switch (operator) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷':
      if (b === 0) {
        current = 'Error';
        operator = null;
        previous = null;
        overwrite = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
    default: return;
  }
  // trim floating precision smartly
  result = parseFloat(result.toPrecision(12));
  current = String(result);
  operator = null;
  previous = null;
  overwrite = true;
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  overwrite = false;
}

function backspace() {
  if (overwrite || current === 'Error') {
    current = '0';
    overwrite = false;
    return;
  }
  if (current.length === 1 || (current.length === 2 && current.startsWith('-'))) {
    current = '0';
  } else {
    current = current.slice(0, -1);
  }
}

function percent() {
  const val = parseFloat(current);
  if (isNaN(val)) return;
  current = String(val / 100);
  overwrite = true;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.number !== undefined) {
      inputNumber(btn.dataset.number);
      updateDisplay();
      return;
    }
    if (btn.dataset.operator !== undefined) {
      chooseOperator(btn.dataset.operator);
      return;
    }
    if (btn.dataset.action) {
      const act = btn.dataset.action;
      if (act === 'clear') {
        clearAll();
        updateDisplay();
      } else if (act === 'back') {
        backspace();
        updateDisplay();
      } else if (act === 'percent') {
        percent();
        updateDisplay();
      } else if (act === 'equals') {
        compute();
        updateDisplay();
      }
    }
  });
});

// keyboard support
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    inputNumber(e.key);
    updateDisplay();
    return;
  }
  if (e.key === 'Enter' || e.key === '=') {
    compute();
    updateDisplay();
    return;
  }
  if (e.key === 'Backspace') {
    backspace();
    updateDisplay();
    return;
  }
  if (e.key === 'Escape') {
    clearAll();
    updateDisplay();
    return;
  }
  const map = {
    '/': '÷',
    '*': '×',
    '-': '−',
    '+': '+'
  };
  if (map[e.key]) {
    chooseOperator(map[e.key]);
    return;
  }
});

// initialize
updateDisplay();
