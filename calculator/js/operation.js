const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export default function operation(leftOperand, rightOperand, operator) {
	switch (operator) {
		case "+":
			return add(leftOperand, rightOperand)
		case "-":
			return substract(leftOperand, rightOperand);
		case "*":
			return multiply(leftOperand, rightOperand);
		case "/":
			return divide(leftOperand, rightOperand);
	}
}
