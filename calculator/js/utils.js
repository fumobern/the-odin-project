/** Returns a random integer (min and max included). */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/** Returns the number of digits in the integer part of a number. */
export const getIntegerDigitCount = nbr => Math.trunc(Math.abs(nbr)).toString().length;
