# Calculator

A responsive, accessible advanced calculator built with **HTML**, **CSS**, and **JavaScript**.
This project demonstrates a practical use of the CSS Grid layout for arranging buttons, event listeners in JavaScript, and a simple state-machine approach to handle arithmetic operations.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Percent, clear (C) and backspace (⌫)
- Decimal numbers with smart precision handling
- Keyboard support (numbers, + - * / Enter Backspace Escape)
- Responsive layout using CSS Grid
- Accessible labels and ARIA attributes

## Files

- `index.html` — markup and structure
- `styles.css` — styling using CSS Grid and modern UI
- `script.js` — calculator logic and event handling
- `README.md` — this file

## How it works (short)
The calculator maintains four state variables:
- `current` (string) — the current number shown
- `previous` (number|null) — stored value when an operator is chosen
- `operator` (string|null) — the chosen operator
- `overwrite` (boolean) — whether the next number input should replace `current`

When an operator is chosen, the current value is stored in `previous` and the next number overwrites the display. On `=` the `compute()` function uses the `operator` to perform the calculation.

## Usage
1. Open `index.html` in a browser.
2. Use mouse or keyboard to type numbers and operations.
3. Press `C` to clear, `⌫` for backspace, `%` for percent, and `=` or Enter to evaluate.

## License
MIT
