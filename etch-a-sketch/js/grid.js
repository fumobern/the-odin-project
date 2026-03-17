import * as utils from "./utils.js";

const container = document.querySelector(".container");
let size;
let init = 1;

export function createGrid(initSize) {
	if (initSize < 0)
		initSize = 0;
	if (initSize > 100)
		initSize = 100;
	size = initSize;
	for (let i = 0; i < size*size; i++) {
		const newSquare = document.createElement("div");
		newSquare.classList.add("square");
		container.appendChild(newSquare);
	}
	if (init) {
		container.addEventListener("mouseover", (e) => {
			if (e.target == container)
				return;
			if (e.target.classList.contains("hover")) {
				const squareOpacity = window.getComputedStyle(e.target).opacity;
				e.target.style.opacity = parseFloat(squareOpacity) - 0.1;
			}
			else {
				e.target.classList.add("hover");
				const randomRed = utils.getRandomInt(100, 230);
				const randomBlue = utils.getRandomInt(100, 230);
				const randomGreen = utils.getRandomInt(100, 230);
				e.target.style.backgroundColor = `rgb(${randomRed} ${randomGreen} ${randomBlue})`;
			}
		});
		init = 0;
	}
	container.style.setProperty("--size", size);
}

export function clearGrid() {
	while (container.firstElementChild)
		container.removeChild(container.firstElementChild);
}
