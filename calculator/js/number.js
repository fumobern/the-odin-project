import * as Utils from "./utils.js"

export default class StrNumber {
	#value = "0";
	#int = "0";
	#dec = "";

	constructor(n = "0") {
		if (typeof n !== "number" && typeof n !== "string")
			throw new TypeError("StrNumber constructor type error");

		// value initialization
		const parts = String(n).split('.');
		this.#int = parts[0] || "0";
		this.#dec = parts[1] || "";
		this.#updateValue();
	}

	#updateValue = () => {
		if (this.#dec !== "")
			this.#value = `${this.#int}.${this.#dec}`;
		else
			this.#value = this.#int;
	};

	set int(n) {
		if (typeof n !== "number" && typeof n !== "string")
			throw new TypeError("StrNumber constructor type error");
		this.#int = String(n);
		this.#updateValue();
	}

	set dec(n) {
		if (typeof n !== "number" && typeof n !== "string")
			throw new TypeError("StrNumber constructor type error");
		this.#dec = String(n);
		this.#updateValue();
	}

	get int() {
		return this.#int;
	}

	get dec() {
		return this.#dec;
	}

	get value() {
		return this.#value;
	}
}