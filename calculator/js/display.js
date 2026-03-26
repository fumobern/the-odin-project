const display = document.querySelector("#display");

/** Update the display by text. */
export function update(text) {
	display.textContent = text;
}
