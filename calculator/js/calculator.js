import operation from "./operation.js"
import CalcNumber from "./number.js"
import * as display from "./display.js"

const OperandState = Object.freeze({
	LEFT_OPERAND: 0,
	RIGHT_OPERAND: 1,
});

const NumberState = Object.freeze({
	INT: 0,
	DEC: 1,
});

let ignoreEvents = false;

let operandState = OperandState.LEFT_OPERAND;
let numberState = NumberState.INT;

let n1 = new CalcNumber();
let n2 = new CalcNumber();
let operator = null;

function init() {
	// Attach click event to each buttons
	const buttonNodeList = document.querySelectorAll("button");

	buttonNodeList.forEach(button => {
		button.addEventListener("click", () => {
			if (ignoreEvents)
				return;
			update(button.textContent);
		});
	});

	// Keyboard support
	document.addEventListener("keydown", event => {
		const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", "Backspace", "x"];

		if (validKeys.includes(event.key)) {
			let button = document.getElementById(`btn-${event.key}`);
			if (!button) {
				if (event.key == "Backspace")
					button = document.getElementById("btn-del");
				if (event.key == "x")
					button = document.getElementById("btn-clear");
			}
			button.click();
			document.activeElement.blur();
		}
	});
	display.update(n1.value);
}

function update(inputStr) {
	switch(inputStr) {
			case "+":
			case "-":
			case "*":
			case "/":
				operator = inputStr;
				operandState = OperandState.RIGHT_OPERAND;
				numberState = NumberState.INT;
				display.update(inputStr);
				break;
			case ".":
				if (numberState == NumberState.DEC)
					return;
				if (operandState == OperandState.LEFT_OPERAND)
					display.update(n1.int + ".");
				else
					display.update(n2.int + ".");
				numberState = NumberState.DEC;
				break;
			case "=":
				if (operandState == OperandState.RIGHT_OPERAND) {
					n1 = new CalcNumber(Math.round(operation(Number(n1.value), Number(n2.value), operator) * 1000) / 1000);
					n2 = new CalcNumber();
					operator = null;
					operandState = OperandState.LEFT_OPERAND;
					if (n1.dec == "")
						numberState = NumberState.INT;
					else
						numberState = NumberState.DEC;
					if (n1.value.length <= 9)
						display.update(n1.value);
					else {
						display.update("ERROR");
						n1 = new CalcNumber();
						ignoreEvents = true;
						setTimeout(() => {
							ignoreEvents = false;
							display.update(n1.value);
						}, 1000);
					}
				}
				break;
			case "del":
				if (operandState == OperandState.LEFT_OPERAND)
					handleDelete(n1);
				else
					handleDelete(n2);
				break;
			case "clear":
				n1 = new CalcNumber();
				n2 = new CalcNumber();
				operator = null;
				numberState = NumberState.INT;
				operandState = OperandState.LEFT_OPERAND;
				display.update(n1.value);
				break;
			default:
				if (operandState == OperandState.LEFT_OPERAND)
					addDigit(n1, inputStr);
				else
					addDigit(n2, inputStr);
	}
}

function handleDelete(calcN) {
	if (numberState == NumberState.INT) {
		calcN.int = calcN.int.slice(0, calcN.int.length - 1);
		if (calcN.int == "")
			calcN.int = "0";
	}
	else if (calcN.dec) {
		calcN.dec = calcN.dec.slice(0, calcN.dec.length - 1);
		if (calcN.dec == "") {
			numberState = NumberState.INT;
		}
	}
	else // if last key was '.'
		numberState = NumberState.INT;
	display.update(calcN.value);
}

function addDigit(calcN, digitStr) {
	if (calcN.value.length == 9)
		return;
	if (numberState == NumberState.INT)
		calcN.int = String(Number(calcN.int + "0") + parseInt(digitStr));
	else
		calcN.dec = calcN.dec + digitStr;
	display.update(calcN.value);
}

export { init };