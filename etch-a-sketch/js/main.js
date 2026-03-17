import * as grid from "./grid.js";

grid.createGrid(6);

const btnSetSize = document.querySelector("button");

btnSetSize.addEventListener("click", () => {
	let input = NaN;
	while (isNaN(parseInt(input)))
		input = prompt(`Enter the new size (max 100): `);
	grid.clearGrid();
	grid.createGrid(input);
});
